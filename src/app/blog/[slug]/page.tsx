import React from "react";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import BrandImage from "@/components/ui/BrandImage";
import { getPublishedBlogPostBySlug, getPublishedBlogPosts } from "@/lib/data/posts";
import { renderSanitizedMarkdown } from "@/lib/sanitizer";
import { db } from "@/lib/db";
import { ArrowLeft, Calendar } from "lucide-react";

interface BlogPostPageProps {
  params?: Promise<{ slug: string }> | { slug: string };
}

async function resolveParams(params: BlogPostPageProps["params"]): Promise<{ slug: string }> {
  if (!params) return { slug: "" };
  try {
    const resolved = await Promise.resolve(params);
    return resolved || { slug: "" };
  } catch {
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

function fitBlogMeta(text: string, max: number): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const sliced = clean.slice(0, Math.max(0, max - 1));
  const lastSpace = sliced.lastIndexOf(" ");
  const base = lastSpace > Math.floor(max * 0.55) ? sliced.slice(0, lastSpace) : sliced;
  return `${base.replace(/[,.;:\-—|]+$/, "").trim()}…`;
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await resolveParams(params);
  if (!slug) return { title: "Article Not Found" };

  const post = await getPublishedBlogPostBySlug(slug);
  if (!post) return { title: "Article Not Found" };

  const rawTitle = `${post.title} | Vision Energy`;
  const title = rawTitle.length <= 60 ? rawTitle : fitBlogMeta(post.title, 60);
  const description = fitBlogMeta(post.subheading || post.title, 155);

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.visionenergyme.com/blog/${post.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.visionenergyme.com/blog/${post.slug}`,
      type: "article",
      images: post.coverImage ? [{ url: post.coverImage }] : ["https://www.visionenergyme.com/images/products-collage-banner.jpg"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: post.coverImage ? [post.coverImage] : ["https://www.visionenergyme.com/images/products-collage-banner.jpg"],
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

  const formattedUpdatedDate = post.updatedAt
    ? new Date(post.updatedAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : formattedDate;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `https://www.visionenergyme.com/blog/${post.slug}#article`,
        "headline": post.title,
        "description": post.subheading,
        "image": post.coverImage ? [post.coverImage] : ["https://www.visionenergyme.com/images/products-collage-banner.jpg"],
        "datePublished": post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined,
        "dateModified": post.updatedAt ? new Date(post.updatedAt).toISOString() : undefined,
        "author": {
          "@type": "Organization",
          "@id": "https://www.visionenergyme.com/#organization",
          "name": "Vision Energy International",
        },
        "publisher": {
          "@id": "https://www.visionenergyme.com/#organization",
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://www.visionenergyme.com/blog/${post.slug}`,
        },
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.visionenergyme.com" },
          { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.visionenergyme.com/blog" },
          { "@type": "ListItem", "position": 3, "name": post.title, "item": `https://www.visionenergyme.com/blog/${post.slug}` },
        ],
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-8 sm:space-y-12">
      {/* JSON-LD BlogPosting & Breadcrumb Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb + Back Link */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <nav aria-label="Breadcrumb" className="text-xs text-[#A9B4C0] font-medium flex items-center gap-2">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
          <span aria-hidden="true">/</span>
          <span className="text-[#8DC63F] truncate max-w-[220px] sm:max-w-sm" aria-current="page">
            {post.title}
          </span>
        </nav>

        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#A9B4C0] hover:text-[#8DC63F] transition-colors min-h-[40px] active-press"
        >
          <ArrowLeft className="w-4 h-4 text-[#8DC63F]" />
          <span>Back to Blog</span>
        </Link>
      </div>

      {/* Article Header */}
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="font-bold text-[#8DC63F] uppercase tracking-wider bg-[#8DC63F]/10 border border-[#8DC63F]/30 px-3 py-1 rounded-full">
            {post.category}
          </span>
          {formattedDate && (
            <span className="flex items-center gap-1.5 text-[#A9B4C0] font-medium">
              <Calendar className="w-3.5 h-3.5 text-gray-500" />
              Published: {formattedDate}
            </span>
          )}
          {formattedUpdatedDate && (
            <span className="text-[#A9B4C0] font-medium">
              · Updated: {formattedUpdatedDate}
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
          {post.title}
        </h1>

        <p className="text-base sm:text-xl text-[#A9B4C0] leading-relaxed font-normal pt-1">
          {post.subheading}
        </p>
      </header>

      {/* Hero Cover Image */}
      {post.coverImage && (
        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] overflow-hidden rounded-2xl border border-[#1F2937] bg-[#0D1117] shadow-2xl">
          <BrandImage
            src={post.coverImage}
            alt={post.coverAlt || post.title}
            fill
            unoptimized
            surface="auto"
            logoSize="lg"
            sizes="(max-width: 1024px) 100vw, 896px"
            priority
            className="object-cover"
          />
        </div>
      )}

      {/* Article Body Content */}
      <article className="border-t border-[#1F2937]/80 pt-8 text-[#D1D5DB] text-base sm:text-[18px] leading-[1.85] space-y-6">
        <section aria-labelledby="article-technical-context" className="p-5 rounded-xl bg-[#0D1117] border border-white/10 space-y-2">
          <h2 id="article-technical-context" className="text-lg sm:text-xl font-bold text-white">
            Technical Engineering Overview
          </h2>
          <p className="text-sm sm:text-base text-[#A9B4C0] leading-relaxed">
            {post.subheading}
          </p>
        </section>

        {post.bodyImage && secondPartHtml ? (
          <>
            <div dangerouslySetInnerHTML={{ __html: firstPartHtml }} />
            <div className="relative my-10 w-full aspect-[16/9] max-h-[460px] overflow-hidden rounded-2xl border border-[#1F2937] bg-[#0D1117] shadow-xl">
              <BrandImage
                src={post.bodyImage}
                alt={post.bodyAlt || "Article illustration"}
                fill
                unoptimized
                surface="auto"
                logoSize="lg"
                sizes="(max-width: 1024px) 100vw, 896px"
                className="object-cover"
              />
            </div>
            <div dangerouslySetInnerHTML={{ __html: secondPartHtml }} />
          </>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: sanitizedBodyHtml }} />
        )}

        <section aria-labelledby="article-related-guides" className="mt-10 p-6 rounded-2xl bg-[#0D1117] border border-white/10 space-y-4">
          <h2 id="article-related-guides" className="text-xl font-bold text-white">
            Related Engineering Guides &amp; Product Systems
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-semibold">
            <Link href="/expertise/lightning" className="p-3 rounded-xl bg-[#050608] border border-white/10 hover:border-[#8DC63F] text-[#8DC63F] transition-colors">
              Lightning Protection Engineering Guide →
            </Link>
            <Link href="/expertise/earthing" className="p-3 rounded-xl bg-[#050608] border border-white/10 hover:border-[#8DC63F] text-[#8DC63F] transition-colors">
              Earthing &amp; Surge Protection Guide →
            </Link>
            <Link href="/glossary" className="p-3 rounded-xl bg-[#050608] border border-white/10 hover:border-[#8DC63F] text-white transition-colors">
              Engineering Terminology Glossary →
            </Link>
            <Link href="/contact" className="p-3 rounded-xl bg-[#050608] border border-white/10 hover:border-[#8DC63F] text-white transition-colors">
              Request UAE / Qatar Submittal →
            </Link>
          </div>
        </section>
      </article>

      {/* Bottom Footer Link */}
      <footer className="pt-8 border-t border-[#1F2937]/80">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#A9B4C0] hover:text-[#8DC63F] transition-colors min-h-[40px] active-press"
        >
          <ArrowLeft className="w-4 h-4 text-[#8DC63F]" />
          <span>Back to Blog</span>
        </Link>
      </footer>
    </div>
  );
}
