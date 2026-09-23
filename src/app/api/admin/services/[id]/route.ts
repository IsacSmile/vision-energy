import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";
import { serviceFormSchema } from "@/lib/schemas/admin";
import { serviceContentSchema } from "@/lib/schemas/service";
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
    return NextResponse.json({ error: "Missing service ID" }, { status: 400 });
  }

  try {
    const item = await db.service.findUnique({
      where: { id },
    });

    if (!item) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    return NextResponse.json({ item });
  } catch (error) {
    console.error("GET service error:", error);
    return NextResponse.json({ error: "Failed to fetch service" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } | Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await resolveParams(params);
  if (!id) {
    return NextResponse.json({ error: "Missing service ID" }, { status: 400 });
  }

  try {
    const body = await request.json();
    const parsedBasics = serviceFormSchema.parse(body);
    const parsedContent = serviceContentSchema.parse(body.content || {});

    const existing = await db.service.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    // Optimistic concurrency check
    if (body.updatedAt && new Date(body.updatedAt).getTime() !== new Date(existing.updatedAt).getTime()) {
      return NextResponse.json(
        { error: "This item was changed elsewhere. Reload to see the latest version." },
        { status: 409 }
      );
    }

    // Slug redirect check
    if (existing.status === "PUBLISHED" && existing.slug !== parsedBasics.slug) {
      await db.slugRedirect.upsert({
        where: { fromPath: `/services/${existing.slug}` },
        update: { toPath: `/services/${parsedBasics.slug}` },
        create: {
          entity: "SERVICE",
          fromPath: `/services/${existing.slug}`,
          toPath: `/services/${parsedBasics.slug}`,
        },
      });
    }

    const updated = await db.service.update({
      where: { id },
      data: {
        slug: parsedBasics.slug,
        title: parsedBasics.title,
        summary: parsedBasics.summary,
        icon: parsedBasics.icon,
        metaChips: parsedBasics.metaChips,
        sortOrder: parsedBasics.sortOrder,
        status: parsedBasics.status,
        publishedAt:
          parsedBasics.status === "PUBLISHED"
            ? existing.publishedAt || new Date()
            : null,
        seoTitle: parsedBasics.seoTitle || null,
        seoDescription: parsedBasics.seoDescription || null,
        content: parsedContent as any,
      },
    });

    const action =
      existing.status !== parsedBasics.status
        ? parsedBasics.status === "PUBLISHED"
          ? "PUBLISH"
          : "UNPUBLISH"
        : "UPDATE";

    await recordAuditLog({
      actor: session.email,
      action,
      entity: "SERVICE",
      entityId: updated.id,
      summary: `${action} service scope "${updated.title}"`,
    });

    triggerCmsRevalidation("service", updated.slug);

    return NextResponse.json({ item: updated });
  } catch (error: any) {
    console.error("PUT service error:", error);
    if (error?.name === "ZodError" || error?.errors) {
      const messages = error.errors?.map((e: any) => e.message).join(", ");
      return NextResponse.json({ error: messages || "Validation error" }, { status: 400 });
    }
    return NextResponse.json({ error: error?.message || "Failed to update service" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } | Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await resolveParams(params);
  if (!id) {
    return NextResponse.json({ error: "Missing service ID" }, { status: 400 });
  }

  try {
    const existing = await db.service.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    const trashed = await db.service.update({
      where: { id },
      data: {
        status: "DRAFT",
        deletedAt: new Date(),
      },
    });

    await recordAuditLog({
      actor: session.email,
      action: "DELETE",
      entity: "SERVICE",
      entityId: trashed.id,
      summary: `Moved service scope "${trashed.title}" to trash`,
    });

    triggerCmsRevalidation("service", trashed.slug);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE service error:", error);
    return NextResponse.json({ error: "Failed to trash service" }, { status: 500 });
  }
}
