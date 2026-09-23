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

    const updated = await db.blogPost.update({
      where: { id: params.id },
      data: {
        title: parsed.title,
        slug: parsed.slug,
        subheading: parsed.subheading,
        content: parsed.content,
        coverImage: parsed.coverImage || null,
        coverAlt: parsed.coverAlt || null,
        bodyImage: parsed.bodyImage || null,
        bodyAlt: parsed.bodyAlt || null,
        category: parsed.category,
        status: parsed.status,
        publishedAt: parsed.publishedAt ? new Date(parsed.publishedAt) : existing.publishedAt || new Date(),
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

    const trashed = await db.blogPost.delete({
      where: { id: params.id },
    });

    await recordAuditLog({
      actor: session.email,
      action: "DELETE",
      entity: "BLOG_POST",
      entityId: trashed.id,
      summary: `Deleted blog post "${trashed.title}"`,
    });

    triggerCmsRevalidation("blog", trashed.slug);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete blog post" }, { status: 500 });
  }
}
