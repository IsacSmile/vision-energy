import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { ProductCategory } from "@prisma/client";
import { getAdminSession } from "@/lib/auth";
import { productCategorySchema } from "@/lib/schemas/admin";
import { recordAuditLog } from "@/lib/audit";
import { triggerCmsRevalidation } from "@/lib/revalidate";


export async function GET(request: Request, { params }: { params: { id: string } }) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const item = await db.productCategory.findUnique({
      where: { id: params.id },
    });

    if (!item) {
      return NextResponse.json({ error: "Product category not found" }, { status: 404 });
    }

    return NextResponse.json({ item });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch product category" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = productCategorySchema.parse(body);

    const existing: ProductCategory | null = await db.productCategory.findUnique({ where: { id: params.id } });
    if (!existing) {
      return NextResponse.json({ error: "Product category not found" }, { status: 404 });
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
        where: { fromPath: `/products/${existing.slug}` },
        update: { toPath: `/products/${parsed.slug}` },
        create: {
          entity: "PRODUCT",
          fromPath: `/products/${existing.slug}`,
          toPath: `/products/${parsed.slug}`,
        },
      });
    }

    const updated = await db.productCategory.update({
      where: { id: params.id },
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

    const action =
      existing.status !== parsed.status
        ? parsed.status === "PUBLISHED"
          ? "PUBLISH"
          : "UNPUBLISH"
        : "UPDATE";

    await recordAuditLog({
      actor: session.email,
      action,
      entity: "PRODUCT_CATEGORY",
      entityId: updated.id,
      summary: `${action} product category ${updated.code} (${updated.title})`,
    });

    triggerCmsRevalidation("product", updated.slug);

    return NextResponse.json({ item: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Failed to update product category" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const existing: ProductCategory | null = await db.productCategory.findUnique({ where: { id: params.id } });
    if (!existing) {
      return NextResponse.json({ error: "Product category not found" }, { status: 404 });
    }

    // Move to trash
    const trashed = await db.productCategory.update({
      where: { id: params.id },
      data: {
        status: "DRAFT",
        deletedAt: new Date(),
      },
    });

    await recordAuditLog({
      actor: session.email,
      action: "DELETE",
      entity: "PRODUCT_CATEGORY",
      entityId: trashed.id,
      summary: `Moved product category ${trashed.code} (${trashed.title}) to trash`,
    });

    triggerCmsRevalidation("product", trashed.slug);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to trash product category" }, { status: 500 });
  }
}
