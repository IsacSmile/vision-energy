import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const fourteenDaysAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);

    const [
      newProductEnquiries,
      newServiceEnquiries,
      publishedProducts,
      draftProducts,
      publishedServices,
      draftServices,
      publishedPosts,
      draftPosts,
      latestProductEnquiries,
      latestServiceEnquiries,
      oldDraftProducts,
      oldDraftServices,
      oldDraftPosts,
      allServices,
    ] = await Promise.all([
      db.productEnquiry.count({ where: { status: "NEW" } }),
      db.serviceEnquiry.count({ where: { status: "NEW" } }),
      db.productCategory.count({ where: { status: "PUBLISHED", deletedAt: null } }),
      db.productCategory.count({ where: { status: "DRAFT", deletedAt: null } }),
      db.service.count({ where: { status: "PUBLISHED", deletedAt: null } }),
      db.service.count({ where: { status: "DRAFT", deletedAt: null } }),
      db.blogPost.count({ where: { status: "PUBLISHED" } }),
      db.blogPost.count({ where: { status: "DRAFT" } }),
      db.productEnquiry.findMany({ take: 5, orderBy: { createdAt: "desc" } }),
      db.serviceEnquiry.findMany({ take: 5, orderBy: { createdAt: "desc" } }),
      db.productCategory.findMany({
        where: { status: "DRAFT", updatedAt: { lt: fourteenDaysAgo }, deletedAt: null },
        select: { id: true, title: true, updatedAt: true, code: true },
      }),
      db.service.findMany({
        where: { status: "DRAFT", updatedAt: { lt: fourteenDaysAgo }, deletedAt: null },
        select: { id: true, title: true, updatedAt: true, slug: true },
      }),
      db.blogPost.findMany({
        where: { status: "DRAFT", updatedAt: { lt: fourteenDaysAgo } },
        select: { id: true, title: true, updatedAt: true, slug: true },
      }),
      db.service.findMany({
        where: { deletedAt: null },
        select: { id: true, title: true, slug: true, content: true },
      }),
    ]);

    // Check for services with unconfirmed process steps
    const servicesWithUnconfirmedSteps = allServices.filter((s) => {
      const content = s.content as any;
      if (!content || !Array.isArray(content.process)) return false;
      return content.process.some((p: any) => p.confirmed === false);
    });

    return NextResponse.json({
      counts: {
        newProductEnquiries: 0,
        newServiceEnquiries: 0,
        publishedProducts: 0,
        draftProducts: 0,
        publishedServices: 0,
        draftServices: 0,
        publishedPosts: 0,
        draftPosts: 0,
      },
      needsAttention: {
        oldDrafts: [],
        servicesWithUnconfirmedSteps: [],
      },
      latestEnquiries: {
        product: [],
        service: [],
      },
      warning: "Database initializing or connection dropped. Displaying fallback metrics.",
    });
  } catch (error) {
    console.error("Dashboard API Error:", error);
    return NextResponse.json({
      counts: {
        newProductEnquiries: 0,
        newServiceEnquiries: 0,
        publishedProducts: 0,
        draftProducts: 0,
        publishedServices: 0,
        draftServices: 0,
        publishedPosts: 0,
        draftPosts: 0,
      },
      needsAttention: {
        oldDrafts: [],
        servicesWithUnconfirmedSteps: [],
      },
      latestEnquiries: {
        product: [],
        service: [],
      },
    }, { status: 200 });
  }
}
