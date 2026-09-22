import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";
import { productCategorySchema } from "@/lib/schemas/admin";
import { recordAuditLog } from "@/lib/audit";
import { triggerCmsRevalidation } from "@/lib/revalidate";
import { z } from "zod";

export async function GET(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "";
  const group = searchParams.get("group") || "";
  const sortBy = searchParams.get("sortBy") || "sortOrder";
  const order = searchParams.get("order") === "desc" ? "desc" : "asc";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "25", 10);

  try {
    const where: any = {
      deletedAt: null,
    };

    if (status) {
      where.status = status;
    }

    if (group) {
      where.group = group;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { code: { contains: search, mode: "insensitive" } },
        { slug: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    const orderBy: any = {};
    if (sortBy === "title") orderBy.title = order;
    else if (sortBy === "updatedAt") orderBy.updatedAt = order;
    else orderBy.sortOrder = order;

    const [total, items, groupsRaw] = await Promise.all([
      db.productCategory.count({ where }),
      db.productCategory.findMany({
        where,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
      }),
      db.productCategory.findMany({
        where: { deletedAt: null },
        select: { group: true, groupLabel: true },
        distinct: ["group"],
      }),
    ]);

    return NextResponse.json({
      items,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      groups: groupsRaw,
    });
  } catch (error) {
    console.error("Products GET API error:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = productCategorySchema.parse(body);

    const existingCode = await db.productCategory.findUnique({ where: { code: parsed.code } });
    if (existingCode) {
      return NextResponse.json({ error: `Category code "${parsed.code}" is already in use` }, { status: 400 });
    }

    const existingSlug = await db.productCategory.findUnique({ where: { slug: parsed.slug } });
    if (existingSlug) {
      return NextResponse.json({ error: `Slug "${parsed.slug}" is already in use` }, { status: 400 });
    }

    const created = await db.productCategory.create({
      data: {
        code: parsed.code,
        slug: parsed.slug,
        group: parsed.group,
        groupLabel: parsed.groupLabel,
        sortOrder: parsed.sortOrder,
        priority: parsed.priority,
        title: parsed.title,
        description: parsed.description,
        productFamilies: parsed.productFamilies,
        image: parsed.image || null,
        imageAlt: parsed.imageAlt || null,
        status: parsed.status,
        reviewNote: parsed.reviewNote || null,
        seoTitle: parsed.seoTitle || null,
        seoDescription: parsed.seoDescription || null,
      },
    });

    await recordAuditLog({
      actor: session.email,
      action: parsed.status === "PUBLISHED" ? "PUBLISH" : "CREATE",
      entity: "PRODUCT_CATEGORY",
      entityId: created.id,
      summary: `${parsed.status === "PUBLISHED" ? "Created & published" : "Created draft"} product category ${created.code} (${created.title})`,
    });

    triggerCmsRevalidation("product", created.slug);

    return NextResponse.json({ item: created }, { status: 201 });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: error?.message || "Failed to create product category" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { action, ids, items, importCategories } = body;

    // Bulk actions: publish | unpublish | trash
    if (action === "bulk_publish" || action === "bulk_unpublish" || action === "bulk_trash") {
      if (!Array.isArray(ids) || ids.length === 0) {
        return NextResponse.json({ error: "No IDs provided" }, { status: 400 });
      }

      if (action === "bulk_publish") {
        await db.productCategory.updateMany({
          where: { id: { in: ids } },
          data: { status: "PUBLISHED" },
        });
      } else if (action === "bulk_unpublish") {
        await db.productCategory.updateMany({
          where: { id: { in: ids } },
          data: { status: "DRAFT" },
        });
      } else if (action === "bulk_trash") {
        await db.productCategory.updateMany({
          where: { id: { in: ids } },
          data: { status: "DRAFT", deletedAt: new Date() },
        });
      }

      await recordAuditLog({
        actor: session.email,
        action: action === "bulk_trash" ? "DELETE" : action === "bulk_publish" ? "PUBLISH" : "UNPUBLISH",
        entity: "PRODUCT_CATEGORY",
        summary: `Bulk action ${action} on ${ids.length} product categories`,
      });

      triggerCmsRevalidation("product");
      return NextResponse.json({ success: true, count: ids.length });
    }

    // Reorder mode
    if (action === "reorder" && Array.isArray(items)) {
      for (const item of items) {
        await db.productCategory.update({
          where: { id: item.id },
          data: { sortOrder: item.sortOrder },
        });
      }

      triggerCmsRevalidation("product");
      return NextResponse.json({ success: true });
    }

    // Import JSON mode
    if (action === "import_json" && Array.isArray(importCategories)) {
      let upsertedCount = 0;
      for (const cat of importCategories) {
        const groupPrefix = cat.code.split("-")[0];
        const groupLabel = cat.groupLabel || groupPrefix;
        const familiesArr = Array.isArray(cat.families)
          ? cat.families
          : typeof cat.families === "string"
          ? cat.families.split(";").map((s: string) => s.trim())
          : [];

        await db.productCategory.upsert({
          where: { code: cat.code },
          update: {
            slug: cat.slug,
            group: groupPrefix,
            groupLabel,
            sortOrder: cat.sortOrder || 0,
            title: cat.title,
            description: cat.description,
            productFamilies: familiesArr,
            status: cat.status || "PUBLISHED",
          },
          create: {
            code: cat.code,
            slug: cat.slug,
            group: groupPrefix,
            groupLabel,
            sortOrder: cat.sortOrder || 0,
            title: cat.title,
            description: cat.description,
            productFamilies: familiesArr,
            status: cat.status || "PUBLISHED",
          },
        });
        upsertedCount++;
      }

      await recordAuditLog({
        actor: session.email,
        action: "UPDATE",
        entity: "PRODUCT_CATEGORY",
        summary: `Imported JSON: upserted ${upsertedCount} categories`,
      });

      triggerCmsRevalidation("product");
      return NextResponse.json({ success: true, count: upsertedCount });
    }

    return NextResponse.json({ error: "Invalid action type" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Bulk operation failed" }, { status: 500 });
  }
}
