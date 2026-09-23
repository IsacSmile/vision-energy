import { NextResponse } from "next/server";
import { del } from "@vercel/blob";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";
import { productSchema } from "@/lib/schemas/product";
import { recordAuditLog } from "@/lib/audit";
import { triggerCmsRevalidation } from "@/lib/revalidate";
import { getCategoryPlaceholder } from "@/lib/utils/placeholders";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const product = await (db as any).product.findUnique({
      where: { id: params.id },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ item: product });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const existing = await (db as any).product.findUnique({
      where: { id: params.id },
    });

    if (!existing) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const body = await request.json();

    // Check for status-only update (Archive / Restore)
    if (body.action === "archive") {
      const updated = await (db as any).product.update({
        where: { id: params.id },
        data: { status: "ARCHIVED" },
      });
      await (db as any).productCategory.updateMany({
        where: { code: existing.code },
        data: { status: "DRAFT" },
      });
      await recordAuditLog({
        actor: session.email,
        action: "UNPUBLISH",
        entity: "PRODUCT",
        entityId: params.id,
        summary: `Archived product "${existing.title}" (${existing.code})`,
      });
      triggerCmsRevalidation("product", existing.code);
      return NextResponse.json({ item: updated });
    }

    if (body.action === "restore") {
      const updated = await (db as any).product.update({
        where: { id: params.id },
        data: { status: "PUBLISHED" },
      });
      await (db as any).productCategory.updateMany({
        where: { code: existing.code },
        data: { status: "PUBLISHED" },
      });
      await recordAuditLog({
        actor: session.email,
        action: "PUBLISH",
        entity: "PRODUCT",
        entityId: params.id,
        summary: `Restored product "${existing.title}" (${existing.code})`,
      });
      triggerCmsRevalidation("product", existing.code);
      return NextResponse.json({ item: updated });
    }

    // Explicit "remove_image" action (reverts to local category placeholder)
    if (body.action === "remove_image") {
      if (!existing.isPlaceholder && existing.imageUrl && existing.imageUrl.includes("public.blob.vercel-storage.com")) {
        try {
          await del(existing.imageUrl);
        } catch (blobErr) {
          console.error("Failed to delete Vercel Blob file on remove:", blobErr);
        }
      }

      const fallback = getCategoryPlaceholder(
        existing.category,
        existing.subcategoryGroup,
        existing.title
      );

      const updated = await (db as any).product.update({
        where: { id: params.id },
        data: {
          imageUrl: fallback.imageUrl,
          imageAlt: fallback.imageAlt,
          isPlaceholder: true,
        },
      });

      await (db as any).productCategory.updateMany({
        where: { code: existing.code },
        data: {
          image: fallback.imageUrl,
          imageAlt: fallback.imageAlt,
        },
      });

      await recordAuditLog({
        actor: session.email,
        action: "UPDATE",
        entity: "PRODUCT",
        entityId: params.id,
        summary: `Reverted image for product "${existing.title}" to local category placeholder`,
      });

      triggerCmsRevalidation("product", existing.code);
      return NextResponse.json({ item: updated });
    }

    // Full form update
    const parsed = productSchema.parse(body.product);

    // Code uniqueness check if code changed
    if (parsed.code !== existing.code) {
      const codeCheck = await (db as any).product.findUnique({
        where: { code: parsed.code },
      });
      if (codeCheck && codeCheck.id !== params.id) {
        return NextResponse.json(
          { error: `Product code "${parsed.code}" already exists` },
          { status: 400 }
        );
      }
    }

    let imageUrl = parsed.imageUrl;
    let imageAlt = parsed.imageAlt;
    let isPlaceholder = existing.isPlaceholder;

    const isNewImageProvided = Boolean(imageUrl && imageUrl.trim().length > 0);
    const isRealUploadedBlob = isNewImageProvided && imageUrl?.includes("public.blob.vercel-storage.com");

    if (isRealUploadedBlob) {
      // If previous image was a real Blob photo and URL changed, clean up old Blob
      if (!existing.isPlaceholder && existing.imageUrl && existing.imageUrl !== imageUrl && existing.imageUrl.includes("public.blob.vercel-storage.com")) {
        try {
          await del(existing.imageUrl);
        } catch (blobErr) {
          console.error("Failed to delete old Vercel Blob image on update:", blobErr);
        }
      }
      isPlaceholder = false;
    } else if (!isNewImageProvided) {
      // If image cleared, revert to local category placeholder
      if (!existing.isPlaceholder && existing.imageUrl && existing.imageUrl.includes("public.blob.vercel-storage.com")) {
        try {
          await del(existing.imageUrl);
        } catch (blobErr) {
          console.error("Failed to delete Vercel Blob image on clearing image:", blobErr);
        }
      }
      const fallback = getCategoryPlaceholder(
        parsed.category,
        parsed.subcategoryGroup,
        parsed.title
      );
      imageUrl = fallback.imageUrl;
      imageAlt = fallback.imageAlt;
      isPlaceholder = true;
    }

    const updated = await (db as any).product.update({
      where: { id: params.id },
      data: {
        code: parsed.code,
        title: parsed.title,
        description: parsed.description,
        includes: parsed.includes,
        category: parsed.category,
        subcategoryGroup: parsed.subcategoryGroup,
        sortOrder: parsed.sortOrder || 0,
        status: body.product.status === "ARCHIVED" ? "ARCHIVED" : "PUBLISHED",
        imageUrl,
        imageAlt,
        isPlaceholder,
      },
    });

    // Sync to ProductCategory table
    try {
      const groupPrefix = parsed.code.split("-")[0] || "EL";
      const slug = parsed.code.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      await (db as any).productCategory.upsert({
        where: { code: existing.code },
        update: {
          code: parsed.code,
          title: parsed.title,
          description: parsed.description,
          productFamilies: parsed.includes,
          image: imageUrl,
          imageAlt: imageAlt,
          status: body.product.status === "ARCHIVED" ? "DRAFT" : "PUBLISHED",
        },
        create: {
          code: parsed.code,
          slug,
          group: groupPrefix,
          groupLabel: parsed.subcategoryGroup || parsed.category,
          sortOrder: parsed.sortOrder || 0,
          title: parsed.title,
          description: parsed.description,
          productFamilies: parsed.includes,
          image: imageUrl,
          imageAlt: imageAlt,
          status: body.product.status === "ARCHIVED" ? "DRAFT" : "PUBLISHED",
        },
      });
    } catch (catErr) {
      console.error("Failed to sync updated product to ProductCategory:", catErr);
    }

    await recordAuditLog({
      actor: session.email,
      action: "UPDATE",
      entity: "PRODUCT",
      entityId: params.id,
      summary: `Updated product "${parsed.title}" (${parsed.code})`,
    });

    triggerCmsRevalidation("product", parsed.code);
    if (existing.code !== parsed.code) {
      triggerCmsRevalidation("product", existing.code);
    }

    return NextResponse.json({ item: updated });
  } catch (error: any) {
    if (error?.name === "ZodError") {
      const issue = error.issues?.[0]?.message || "Validation error";
      return NextResponse.json({ error: issue }, { status: 400 });
    }
    return NextResponse.json(
      { error: error?.message || "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const confirmCode = searchParams.get("confirmCode");

    const product = await (db as any).product.findUnique({
      where: { id: params.id },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    if (!confirmCode || confirmCode.trim().toUpperCase() !== product.code.toUpperCase()) {
      return NextResponse.json(
        { error: `Permanent deletion requires typing exact product code "${product.code}" to confirm.` },
        { status: 400 }
      );
    }

    // Delete Blob file if real uploaded photo (skip local /placeholders/... paths)
    if (!product.isPlaceholder && product.imageUrl && product.imageUrl.includes("public.blob.vercel-storage.com")) {
      try {
        await del(product.imageUrl);
      } catch (blobErr) {
        console.error("Failed to delete Vercel Blob file on product deletion:", blobErr);
      }
    }

    // Delete product row from DB
    await (db as any).product.delete({
      where: { id: params.id },
    });

    // Sync deletion to ProductCategory
    try {
      await (db as any).productCategory.deleteMany({
        where: { code: product.code },
      });
    } catch (catErr) {
      console.error("Failed to delete matching ProductCategory row:", catErr);
    }

    await recordAuditLog({
      actor: session.email,
      action: "DELETE",
      entity: "PRODUCT",
      entityId: params.id,
      summary: `Permanently deleted product "${product.title}" (${product.code})`,
    });

    triggerCmsRevalidation("product", product.code);

    return NextResponse.json({ success: true, deletedCode: product.code });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to permanently delete product" },
      { status: 500 }
    );
  }
}
