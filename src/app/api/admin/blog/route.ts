import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";
import { blogPostSchema } from "@/lib/schemas/admin";
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
  const category = searchParams.get("category") || "";
  const sortBy = searchParams.get("sortBy") || "updatedAt";
  const order = searchParams.get("order") === "asc" ? "asc" : "desc";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "25", 10);

  try {
    const where: any = {
      deletedAt: null,
    };

    if (status) {
      where.status = status;
    }

    if (category) {
      where.category = category;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { slug: { contains: search, mode: "insensitive" } },
        { excerpt: { contains: search, mode: "insensitive" } },
        { content: { contains: search, mode: "insensitive" } },
      ];
    }

    const orderBy: any = {};
    if (sortBy === "title") orderBy.title = order;
    else if (sortBy === "publishedAt") orderBy.publishedAt = order;
    else orderBy.updatedAt = order;

    const [total, items, categoriesRaw] = await Promise.all([
      db.blogPost.count({ where }),
      db.blogPost.findMany({
        where,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
      }),
      db.blogPost.findMany({
        where: { deletedAt: null },
        select: { category: true },
        distinct: ["category"],
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
      categories: categoriesRaw.map((c) => c.category).filter(Boolean),
    });
  } catch (error) {
    console.error("Blog GET API error:", error);
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = blogPostSchema.parse(body);

    const existingSlug = await db.blogPost.findUnique({ where: { slug: parsed.slug } });
    if (existingSlug) {
      return NextResponse.json({ error: `Slug "${parsed.slug}" is already in use` }, { status: 400 });
    }

    const words = parsed.content.trim().split(/\s+/).length;
    const readingMinutes = Math.max(1, Math.ceil(words / 200));

    const autoExcerpt = parsed.excerpt || parsed.content.replace(/[#*`>_-]/g, "").substring(0, 155).trim();

    const created = await db.blogPost.create({
      data: {
        title: parsed.title,
        slug: parsed.slug,
        excerpt: autoExcerpt,
        content: parsed.content,
        coverImage: parsed.coverImage || null,
        coverAlt: parsed.coverAlt || null,
        category: parsed.category || "Technical Insights",
        tags: parsed.tags,
        status: parsed.status,
        publishedAt: parsed.publishedAt ? new Date(parsed.publishedAt) : new Date(),
        isPlaceholder: parsed.isPlaceholder || false,
        readingMinutes,
        seoTitle: parsed.seoTitle || null,
        seoDescription: parsed.seoDescription || null,
      },
    });

    await recordAuditLog({
      actor: session.email,
      action: parsed.status === "PUBLISHED" ? "PUBLISH" : "CREATE",
      entity: "BLOG_POST",
      entityId: created.id,
      summary: `${parsed.status === "PUBLISHED" ? "Created & published" : "Created draft"} blog post "${created.title}"`,
    });

    triggerCmsRevalidation("blog", created.slug);

    return NextResponse.json({ item: created }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Failed to create blog post" }, { status: 500 });
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
      await db.blogPost.updateMany({
        where: { id: { in: ids } },
        data: { status: "PUBLISHED", publishedAt: new Date() },
      });
    } else if (action === "bulk_unpublish") {
      await db.blogPost.updateMany({
        where: { id: { in: ids } },
        data: { status: "DRAFT" },
      });
    } else if (action === "bulk_trash") {
      await db.blogPost.updateMany({
        where: { id: { in: ids } },
        data: { status: "DRAFT", deletedAt: new Date() },
      });
    }

    await recordAuditLog({
      actor: session.email,
      action: action === "bulk_trash" ? "DELETE" : action === "bulk_publish" ? "PUBLISH" : "UNPUBLISH",
      entity: "BLOG_POST",
      summary: `Bulk action ${action} on ${ids.length} blog posts`,
    });

    triggerCmsRevalidation("blog");
    return NextResponse.json({ success: true, count: ids.length });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Bulk operation failed" }, { status: 500 });
  }
}
