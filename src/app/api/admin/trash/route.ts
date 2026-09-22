import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";
import { recordAuditLog } from "@/lib/audit";
import { triggerCmsRevalidation } from "@/lib/revalidate";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [products, services, posts] = await Promise.all([
      db.productCategory.findMany({
        where: { deletedAt: { not: null } },
        select: { id: true, title: true, code: true, slug: true, deletedAt: true },
        orderBy: { deletedAt: "desc" },
      }),
      db.service.findMany({
        where: { deletedAt: { not: null } },
        select: { id: true, title: true, slug: true, deletedAt: true },
        orderBy: { deletedAt: "desc" },
      }),
      db.blogPost.findMany({
        where: { deletedAt: { not: null } },
        select: { id: true, title: true, slug: true, deletedAt: true },
        orderBy: { deletedAt: "desc" },
      }),
    ]);

    const items = [
      ...products.map((p) => ({ ...p, type: "PRODUCT" as const })),
      ...services.map((s) => ({ ...s, type: "SERVICE" as const })),
      ...posts.map((b) => ({ ...b, type: "BLOG" as const })),
    ].sort((a, b) => new Date(b.deletedAt!).getTime() - new Date(a.deletedAt!).getTime());

    return NextResponse.json({ items });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch trash items" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { action, type, id } = await request.json();

    if (!type || !id || !["restore", "permanent_delete"].includes(action)) {
      return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
    }

    if (action === "restore") {
      if (type === "PRODUCT") {
        const item = await db.productCategory.update({
          where: { id },
          data: { deletedAt: null, status: "DRAFT" },
        });
        await recordAuditLog({
          actor: session.email,
          action: "RESTORE",
          entity: "PRODUCT_CATEGORY",
          entityId: item.id,
          summary: `Restored product category ${item.code} (${item.title}) as DRAFT`,
        });
        triggerCmsRevalidation("product", item.slug);
      } else if (type === "SERVICE") {
        const item = await db.service.update({
          where: { id },
          data: { deletedAt: null, status: "DRAFT" },
        });
        await recordAuditLog({
          actor: session.email,
          action: "RESTORE",
          entity: "SERVICE",
          entityId: item.id,
          summary: `Restored service scope "${item.title}" as DRAFT`,
        });
        triggerCmsRevalidation("service", item.slug);
      } else if (type === "BLOG") {
        const item = await db.blogPost.update({
          where: { id },
          data: { deletedAt: null, status: "DRAFT" },
        });
        await recordAuditLog({
          actor: session.email,
          action: "RESTORE",
          entity: "BLOG_POST",
          entityId: item.id,
          summary: `Restored blog post "${item.title}" as DRAFT`,
        });
        triggerCmsRevalidation("blog", item.slug);
      }

      return NextResponse.json({ success: true, message: "Item restored as DRAFT" });
    }

    if (action === "permanent_delete") {
      if (type === "PRODUCT") {
        const item = await db.productCategory.delete({ where: { id } });
        await recordAuditLog({
          actor: session.email,
          action: "DELETE",
          entity: "PRODUCT_CATEGORY",
          entityId: item.id,
          summary: `Permanently deleted product category ${item.code}`,
        });
      } else if (type === "SERVICE") {
        const item = await db.service.delete({ where: { id } });
        await recordAuditLog({
          actor: session.email,
          action: "DELETE",
          entity: "SERVICE",
          entityId: item.id,
          summary: `Permanently deleted service scope "${item.title}"`,
        });
      } else if (type === "BLOG") {
        const item = await db.blogPost.delete({ where: { id } });
        await recordAuditLog({
          actor: session.email,
          action: "DELETE",
          entity: "BLOG_POST",
          entityId: item.id,
          summary: `Permanently deleted blog post "${item.title}"`,
        });
      }

      return NextResponse.json({ success: true, message: "Item permanently deleted" });
    }

    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Trash operation failed" }, { status: 500 });
  }
}
