import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";
import { blogPostSchema } from "@/lib/schemas/admin";
import { recordAuditLog } from "@/lib/audit";
import { triggerCmsRevalidation } from "@/lib/revalidate";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const item = await db.blogPost.findUnique({
      where: { id: params.id },
    });

    if (!item) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }

    return NextResponse.json({ item });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch blog post" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = blogPostSchema.parse(body);

    const existing = await db.blogPost.findUnique({ where: { id: params.id } });
    if (!existing) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }

    // Optimistic concurrency check
    if (body.updatedAt && new Date(body.updatedAt).getTime() !== new Date(existing.updatedAt).getTime()) {
      return NextResponse.json(
        { error: "This item was changed elsewhere. Reload to see the latest version." },
        { status: 409 }
      );
    }

    // Slug redirect check
    if (existing.status === "PUBLISHED" && existing.slug !== parsed.slug) {
      await db.slugRedirect.upsert({
        where: { fromPath: `/blog/${existing.slug}` },
        update: { toPath: `/blog/${parsed.slug}` },
        create: {
          entity: "POST",
          fromPath: `/blog/${existing.slug}`,
          toPath: `/blog/${parsed.slug}`,
        },
      });
    }

    const words = parsed.content.trim().split(/\s+/).length;
    const readingMinutes = Math.max(1, Math.ceil(words / 200));
    const autoExcerpt = parsed.excerpt || parsed.content.replace(/[#*`>_-]/g, "").substring(0, 155).trim();

    const updated = await db.blogPost.update({
      where: { id: params.id },
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
        publishedAt: parsed.publishedAt ? new Date(parsed.publishedAt) : existing.publishedAt || new Date(),
        isPlaceholder: parsed.isPlaceholder || false,
        readingMinutes,
        seoTitle: parsed.seoTitle || null,
        seoDescription: parsed.seoDescription || null,
      },
    });

    const action =
      existing.status !== parsed.status
        ? parsed.status === "PUBLISHED"
          ? "PUBLISH"
          : "UNPUBLISH"
        : "UPDATE";

    await recordAuditLog({
      actor: session.email,
      action,
      entity: "BLOG_POST",
      entityId: updated.id,
      summary: `${action} blog post "${updated.title}"`,
    });

    triggerCmsRevalidation("blog", updated.slug);

    return NextResponse.json({ item: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Failed to update blog post" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const existing = await db.blogPost.findUnique({ where: { id: params.id } });
    if (!existing) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }

    const trashed = await db.blogPost.update({
      where: { id: params.id },
      data: {
        status: "DRAFT",
        deletedAt: new Date(),
      },
    });

    await recordAuditLog({
      actor: session.email,
      action: "DELETE",
      entity: "BLOG_POST",
      entityId: trashed.id,
      summary: `Moved blog post "${trashed.title}" to trash`,
    });

    triggerCmsRevalidation("blog", trashed.slug);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to trash blog post" }, { status: 500 });
  }
}
