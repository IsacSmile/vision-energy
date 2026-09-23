import React from "react";
import { notFound, redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { db } from "@/lib/db";
import CategoryDetailClient from "@/components/products/CategoryDetailClient";

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPreviewPage({
  params,
}: {
  params: { type: string; id: string };
}) {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const { type, id } = params;

  if (type === "service") {
    const service = await db.service.findUnique({ where: { id } });
    if (!service) notFound();

    const content = service.content as any;

    return (
      <div className="min-h-screen bg-[#050608] text-white">
        {/* Admin Preview Header Banner */}
        <div className="sticky top-0 z-50 bg-amber-500 text-[#050608] px-4 py-2 text-xs font-bold font-mono flex items-center justify-between shadow-xl">
          <span>ADMIN DRAFT PREVIEW MODE • UNPUBLISHED SERVICE SCOPE</span>
          <span>Status: {service.status}</span>
        </div>
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
          <div>
            <span className="text-xs font-mono font-bold text-[#A3E635] uppercase tracking-wider block">Service Preview</span>
            <h1 className="text-3xl sm:text-4xl font-bold mt-2">{service.title}</h1>
            <p className="text-gray-400 text-sm mt-3 leading-relaxed">{service.summary}</p>
          </div>

          {content?.heroLead && (
            <div className="p-5 bg-[#0D1117] border border-[#1F2937] rounded-xl text-sm leading-relaxed">
              <h3 className="font-bold text-white mb-1">Hero Lead</h3>
              <p className="text-gray-300">{content.heroLead}</p>
            </div>
          )}

          {content?.overview && (
            <div className="p-5 bg-[#0D1117] border border-[#1F2937] rounded-xl text-sm leading-relaxed">
              <h3 className="font-bold text-white mb-1">Overview</h3>
              <p className="text-gray-300">{content.overview}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (type === "product") {
    const category = await db.productCategory.findUnique({ where: { id } });
    if (!category) notFound();

    const formattedCat = {
      id: category.id,
      code: category.code,
      slug: category.slug,
      groupPrefix: category.group,
      title: category.title,
      description: category.description,
      families: Array.isArray(category.productFamilies) ? category.productFamilies.join("; ") : category.productFamilies,
      image: category.image,
    };

    return (
      <div className="min-h-screen bg-[#050608]">
        <div className="sticky top-0 z-50 bg-amber-500 text-[#050608] px-4 py-2 text-xs font-bold font-mono flex items-center justify-between shadow-xl">
          <span>ADMIN DRAFT PREVIEW MODE • UNPUBLISHED CATEGORY</span>
          <span>Status: {category.status}</span>
        </div>
        <CategoryDetailClient category={formattedCat as any} />
      </div>
    );
  }

  if (type === "blog") {
    const post = await db.blogPost.findUnique({ where: { id } });
    if (!post) notFound();

    return (
      <div className="min-h-screen bg-[#050608] text-white p-8">
        <div className="sticky top-0 z-50 bg-amber-500 text-[#050608] px-4 py-2 text-xs font-bold font-mono flex items-center justify-between shadow-xl mb-8">
          <span>ADMIN DRAFT PREVIEW MODE • UNPUBLISHED BLOG POST</span>
          <span>Status: {post.status}</span>
        </div>
        <div className="max-w-3xl mx-auto space-y-6">
          <span className="px-3 py-1 bg-[#A3E635]/10 text-[#A3E635] text-xs font-mono font-bold rounded-full border border-[#A3E635]/30">
            {post.category}
          </span>
          <h1 className="text-3xl font-bold">{post.title}</h1>
          <p className="text-gray-400 text-sm leading-relaxed">{post.subheading}</p>
          <div className="prose prose-invert max-w-none border-t border-[#1F2937] pt-6">{post.content}</div>
        </div>
      </div>
    );
  }

  notFound();
}
