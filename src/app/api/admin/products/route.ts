import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";
import { productSchema } from "@/lib/schemas/product";
import { recordAuditLog } from "@/lib/audit";
import { triggerCmsRevalidation } from "@/lib/revalidate";
import { getCategoryPlaceholder } from "@/lib/utils/placeholders";

export async function GET(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "";
  const category = searchParams.get("category") || "";
  const subcategoryGroup = searchParams.get("subcategoryGroup") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "15", 10);

  try {
    const where: any = {};

    if (status && (status === "PUBLISHED" || status === "ARCHIVED")) {
      where.status = status;
    }

    if (category) {
      where.category = category;
    }

    if (subcategoryGroup) {
      where.subcategoryGroup = subcategoryGroup;
    }

    if (search) {
      where.OR = [
        { code: { contains: search, mode: "insensitive" } },
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { subcategoryGroup: { contains: search, mode: "insensitive" } },
      ];
    }

    const [total, items, categoriesRaw, subcategoriesRaw] = await Promise.all([
      (db as any).product.count({ where }),
      (db as any).product.findMany({
        where,
        orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
        skip: (page - 1) * limit,
        take: limit,
      }),
      (db as any).product.findMany({
        select: { category: true },
        distinct: ["category"],
      }),
      (db as any).product.findMany({
        select: { subcategoryGroup: true },
        distinct: ["subcategoryGroup"],
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
      categories: categoriesRaw.map((c: any) => c.category).filter(Boolean),
      subcategories: subcategoriesRaw.map((s: any) => s.subcategoryGroup).filter(Boolean),
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
    const parsed = productSchema.parse(body.product);

    // Explicit code uniqueness recheck
    const existingProduct = await (db as any).product.findUnique({
      where: { code: parsed.code },
    });

    if (existingProduct) {
      return NextResponse.json(
        { error: `Product code "${parsed.code}" already exists` },
        { status: 400 }
      );
    }

    // Determine photo & placeholder state
    let imageUrl = parsed.imageUrl || null;
    let imageAlt = parsed.imageAlt || null;
    let isPlaceholder = false;

    if (!imageUrl || imageUrl.trim() === "") {
      const fallback = getCategoryPlaceholder(
        parsed.category,
        parsed.subcategoryGroup,
        parsed.title
      );
      imageUrl = fallback.imageUrl;
      imageAlt = fallback.imageAlt;
      isPlaceholder = true;
    }

    const created = await (db as any).product.create({
      data: {
        code: parsed.code,
        title: parsed.title,
        description: parsed.description,
        includes: parsed.includes,
        category: parsed.category,
        subcategoryGroup: parsed.subcategoryGroup,
        sortOrder: parsed.sortOrder || 0,
        status: "PUBLISHED",
        imageUrl,
        imageAlt,
        isPlaceholder,
      },
    });

    await recordAuditLog({
      actor: session.email,
      action: "CREATE",
      entity: "PRODUCT",
      entityId: created.id,
      summary: `Created product "${created.title}" (${created.code})`,
    });

    triggerCmsRevalidation("product", created.code);

    return NextResponse.json({ item: created }, { status: 201 });
  } catch (error: any) {
    if (error?.name === "ZodError") {
      const issue = error.issues?.[0]?.message || "Validation error";
      return NextResponse.json({ error: issue }, { status: 400 });
    }
    return NextResponse.json(
      { error: error?.message || "Failed to create product" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { action, ids, newCategory } = body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: "No product IDs provided" }, { status: 400 });
    }

    if (action === "bulk_archive") {
      await (db as any).product.updateMany({
        where: { id: { in: ids } },
        data: { status: "ARCHIVED" },
      });
    } else if (action === "bulk_restore") {
      await (db as any).product.updateMany({
        where: { id: { in: ids } },
        data: { status: "PUBLISHED" },
      });
    } else if (action === "bulk_reassign_category" && newCategory) {
      await (db as any).product.updateMany({
        where: { id: { in: ids } },
        data: { category: newCategory },
      });
    } else {
      return NextResponse.json({ error: "Invalid bulk action" }, { status: 400 });
    }

    await recordAuditLog({
      actor: session.email,
      action: action === "bulk_archive" ? "UNPUBLISH" : "UPDATE",
      entity: "PRODUCT",
      summary: `Bulk operation ${action} performed on ${ids.length} products`,
    });

    triggerCmsRevalidation("product");

    return NextResponse.json({ success: true, count: ids.length });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Bulk operation failed" },
      { status: 500 }
    );
  }
}
