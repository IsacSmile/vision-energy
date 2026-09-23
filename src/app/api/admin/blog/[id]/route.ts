import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";
import { blogPostSchema } from "@/lib/schemas/admin";
import { recordAuditLog } from "@/lib/audit";
import { triggerCmsRevalidation } from "@/lib/revalidate";

async function resolveParams(params: { id: string } | Promise<{ id: string }>) {
  if (!params) return { id: "" };
  try {
    if (typeof (params as any).then === "function") {
      return (await params) || { id: "" };
    }
    return (params as any) || { id: "" };
  } catch (e) {
    return { id: "" };
  }
}

export async function GET(request: Request, { params }: { params: { id: string } | Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await resolveParams(params);
  if (!id) {
    return NextResponse.json({ error: "Missing article ID" }, { status: 400 });
  }

  try {
    const item = await db.blogPost.findUnique({
      where: { id },
    });

    if (!item) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }

    return NextResponse.json({ item });
  } catch (error) {
    console.error("GET blog post error:", error);
    return NextResponse.json({ error: "Failed to fetch blog post" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } | Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await resolveParams(params);
  if (!id) {
    return NextResponse.json({ error: "Missing article ID" }, { status: 400 });
  }

  try {
    const body = await request.json();
    const parsed = blogPostSchema.parse(body);

    const existing = await db.blogPost.findUnique({ where: { id } });
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
      where: { id },
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
    console.error("PUT blog post error:", error);
    if (error?.name === "ZodError" || error?.errors) {
      const messages = error.errors?.map((e: any) => e.message).join(", ");
      return NextResponse.json({ error: messages || "Validation error" }, { status: 400 });
    }
    return NextResponse.json({ error: error?.message || "Failed to update blog post" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } | Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await resolveParams(params);
  if (!id) {
    return NextResponse.json({ error: "Missing article ID" }, { status: 400 });
  }

  try {
    const existing = await db.blogPost.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }

    const trashed = await db.blogPost.delete({
      where: { id },
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
    console.error("DELETE blog post error:", error);
    return NextResponse.json({ error: "Failed to delete blog post" }, { status: 500 });
  }
}
