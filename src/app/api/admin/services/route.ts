import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";
import { serviceFormSchema } from "@/lib/schemas/admin";
import { serviceContentSchema } from "@/lib/schemas/service";
import { recordAuditLog } from "@/lib/audit";
import { triggerCmsRevalidation } from "@/lib/revalidate";

export async function GET(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "";
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

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { slug: { contains: search, mode: "insensitive" } },
        { summary: { contains: search, mode: "insensitive" } },
      ];
    }

    const orderBy: any = {};
    if (sortBy === "title") orderBy.title = order;
    else if (sortBy === "updatedAt") orderBy.updatedAt = order;
    else orderBy.sortOrder = order;

    const [total, items] = await Promise.all([
      db.service.count({ where }),
      db.service.findMany({
        where,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
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
    });
  } catch (error) {
    console.error("Services GET API error:", error);
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsedBasics = serviceFormSchema.parse(body);
    const parsedContent = serviceContentSchema.parse(body.content || {});

    const existingSlug = await db.service.findUnique({ where: { slug: parsedBasics.slug } });
    if (existingSlug) {
      return NextResponse.json({ error: `Slug "${parsedBasics.slug}" is already in use` }, { status: 400 });
    }

    const created = await db.service.create({
      data: {
        slug: parsedBasics.slug,
        title: parsedBasics.title,
        summary: parsedBasics.summary,
        icon: parsedBasics.icon,
        metaChips: parsedBasics.metaChips,
        sortOrder: parsedBasics.sortOrder,
        status: parsedBasics.status,
        publishedAt: parsedBasics.status === "PUBLISHED" ? new Date() : null,
        seoTitle: parsedBasics.seoTitle || null,
        seoDescription: parsedBasics.seoDescription || null,
        content: parsedContent as any,
      },
    });

    await recordAuditLog({
      actor: session.email,
      action: parsedBasics.status === "PUBLISHED" ? "PUBLISH" : "CREATE",
      entity: "SERVICE",
      entityId: created.id,
      summary: `${parsedBasics.status === "PUBLISHED" ? "Created & published" : "Created draft"} service scope "${created.title}"`,
    });

    triggerCmsRevalidation("service", created.slug);

    return NextResponse.json({ item: created }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Failed to create service" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { action, ids } = body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: "No IDs provided" }, { status: 400 });
    }

    if (action === "bulk_publish") {
      await db.service.updateMany({
        where: { id: { in: ids } },
        data: { status: "PUBLISHED", publishedAt: new Date() },
      });
    } else if (action === "bulk_unpublish") {
      await db.service.updateMany({
        where: { id: { in: ids } },
        data: { status: "DRAFT" },
      });
    } else if (action === "bulk_trash") {
      await db.service.updateMany({
        where: { id: { in: ids } },
        data: { status: "DRAFT", deletedAt: new Date() },
      });
    }

    await recordAuditLog({
      actor: session.email,
      action: action === "bulk_trash" ? "DELETE" : action === "bulk_publish" ? "PUBLISH" : "UNPUBLISH",
      entity: "SERVICE",
      summary: `Bulk action ${action} on ${ids.length} services`,
    });

    triggerCmsRevalidation("service");
    return NextResponse.json({ success: true, count: ids.length });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Bulk operation failed" }, { status: 500 });
  }
}
