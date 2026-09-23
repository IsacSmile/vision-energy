import React from "react";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { getPublishedBlogPostBySlug, getPublishedBlogPosts } from "@/lib/data/posts";
import { renderSanitizedMarkdown } from "@/lib/sanitizer";
import { db } from "@/lib/db";
import { ArrowLeft, Calendar } from "lucide-react";

interface BlogPostPageProps {
  params?: Promise<{ slug: string }> | { slug: string };
}

async function resolveParams(params: BlogPostPageProps["params"]) {
  if (!params) return { slug: "" };
  try {
    if (typeof (params as any).then === "function") {
      return (await params) || { slug: "" };
    }
    return (params as any) || { slug: "" };
  } catch (e) {
    return { slug: "" };
  }
}

export async function generateStaticParams() {
  try {
    const posts = await getPublishedBlogPosts();
    return posts.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export const dynamicParams = true;
export const revalidate = 300;

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await resolveParams(params);
  if (!slug) return { title: "Article Not Found" };

  const post = await getPublishedBlogPostBySlug(slug);
  if (!post) return { title: "Article Not Found" };

  return {
    title: `${post.title} | Vision Energy`,
    description: post.subheading,
    openGraph: {
      title: post.title,
      description: post.subheading,
      images: post.coverImage ? [{ url: post.coverImage }] : [],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await resolveParams(params);
  if (!slug) {
    notFound();
  }

  const post = await getPublishedBlogPostBySlug(slug);

  if (!post) {
    const fromPath = `/blog/${slug}`;
    try {
      const redirectRow = await db.slugRedirect.findUnique({ where: { fromPath } });
      if (redirectRow) {
        redirect(redirectRow.toPath);
      }
    } catch (err) {
      console.error("Slug redirect query error:", err);
    }
    notFound();
  }

  const sanitizedBodyHtml = await renderSanitizedMarkdown(post.content);

  // Split HTML at second paragraph to insert bodyImage inline if provided
  let firstPartHtml = sanitizedBodyHtml;
  let secondPartHtml = "";
  if (post.bodyImage) {
    const pTagSplit = sanitizedBodyHtml.split("</p>");
    if (pTagSplit.length > 2) {
      firstPartHtml = pTagSplit.slice(0, 2).join("</p>") + "</p>";
      secondPartHtml = pTagSplit.slice(2).join("</p>");
    }
  }

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.subheading,
    "image": post.coverImage ? [post.coverImage] : [],
    "datePublished": post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined,
    "dateModified": post.updatedAt ? new Date(post.updatedAt).toISOString() : undefined,
    "publisher": {
      "@type": "Organization",
      "name": "Vision Energy International UAE",
      "url": "https://visionenergyme.com",
    },
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 space-y-6 sm:space-y-8">
      {/* JSON-LD Article Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Back Link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-xs font-bold text-[#8DC63F] hover:underline transition-colors min-h-[40px] active-press"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Blog</span>
      </Link>

      {/* Article Container */}
      <article className="bg-[#0D1117] border border-[#1F2937] rounded-2xl sm:rounded-3xl p-6 sm:p-12 space-y-8 shadow-2xl">
        {/* Header */}
        <div className="space-y-4 max-w-[65ch] mx-auto">
          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400">
            <span className="font-bold text-[#8DC63F] bg-[#8DC63F]/10 border border-[#8DC63F]/30 px-3 py-1 rounded-full">
              {post.category}
            </span>
            {formattedDate && (
              <span className="flex items-center gap-1.5 text-gray-400">
                <Calendar className="w-3.5 h-3.5 text-gray-500" />
                {formattedDate}
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="text-sm sm:text-base text-gray-300 leading-relaxed italic border-l-4 border-[#0B65B3] pl-4">
            {post.subheading}
          </p>
        </div>

        {/* Cover Image Directly Below Header */}
        {post.coverImage && (
          <div className="max-w-[65ch] mx-auto overflow-hidden rounded-2xl border border-[#1F2937] bg-[#050608] aspect-video">
            <img
              src={post.coverImage}
              alt={post.coverAlt || post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Article Body Content */}
        <div className="border-t border-[#1F2937] pt-8 max-w-[65ch] mx-auto text-gray-200 space-y-6 leading-relaxed text-[17px] sm:text-[18px]">
          {post.bodyImage && secondPartHtml ? (
            <>
              <div dangerouslySetInnerHTML={{ __html: firstPartHtml }} />
              <div className="my-8 overflow-hidden rounded-2xl border border-[#1F2937] bg-[#050608]">
                <img
                  src={post.bodyImage}
                  alt={post.bodyAlt || "Article body illustration"}
                  className="w-full max-h-[420px] object-cover"
                />
              </div>
              <div dangerouslySetInnerHTML={{ __html: secondPartHtml }} />
            </>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: sanitizedBodyHtml }} />
          )}
        </div>
      </article>

      {/* Back to Blog Bottom Link */}
      <div className="pt-4 border-t border-[#1F2937]">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#8DC63F] hover:underline transition-colors min-h-[40px] active-press"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Blog</span>
        </Link>
      </div>
    </div>
  );
}
