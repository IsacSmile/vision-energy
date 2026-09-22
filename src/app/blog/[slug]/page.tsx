import React from "react";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { getPublishedBlogPostBySlug, getPublishedBlogPosts } from "@/lib/data/posts";
import { renderSanitizedMarkdown } from "@/lib/sanitizer";
import { db } from "@/lib/db";
import { ArrowLeft, Calendar, Tag, Clock, ArrowRight } from "lucide-react";

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
    title: post.seoTitle || `${post.title} | Vision Energy Technical Blog`,
    description: post.seoDescription || post.excerpt,
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
    const redirectRow = await db.slugRedirect.findUnique({ where: { fromPath } });
    if (redirectRow) {
      redirect(redirectRow.toPath);
    }
    notFound();
  }

  const allPosts = await getPublishedBlogPosts();
  const relatedPosts = allPosts.filter((p) => p.id !== post.id).slice(0, 3);

  const readTime = post.readingMinutes || 3;
  const sanitizedBodyHtml = await renderSanitizedMarkdown(post.content);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 space-y-6 sm:space-y-8">
      {/* Back Link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white transition-colors min-h-[40px] active-press"
      >
        <ArrowLeft className="w-4 h-4 text-[#8DC63F]" />
        <span>Back to All Articles</span>
      </Link>

      {/* Article Container */}
      <article className="bg-[#0D1117] border border-[#1F2937] rounded-2xl sm:rounded-3xl p-6 sm:p-12 space-y-8 shadow-2xl">
        <div className="space-y-4 max-w-[65ch] mx-auto">
          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400">
            <span className="font-bold text-[#8DC63F] bg-[#8DC63F]/10 border border-[#8DC63F]/40 px-3 py-1 rounded-full flex items-center gap-1">
              <Tag className="w-3 h-3" />
              {post.category || "Technical Insights"}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#0B65B3]" />
              {readTime} min read
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-gray-500" />
              {post.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString("en-GB")
                : ""}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="text-sm sm:text-base text-gray-300 leading-relaxed italic border-l-4 border-[#0B65B3] pl-4">
            {post.excerpt}
          </p>
        </div>

        {/* Body Text rendered with Markdown Sanitizer */}
        <div className="border-t border-[#1F2937] pt-8 max-w-[65ch] mx-auto text-gray-200 space-y-6 leading-relaxed text-[18px] prose prose-invert">
          <div dangerouslySetInnerHTML={{ __html: sanitizedBodyHtml }} />
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="space-y-4 pt-6">
          <h2 className="text-lg font-bold text-white">Related Technical Articles</h2>
          <div className="flex overflow-x-auto no-scrollbar scroll-snap-x gap-4 pb-2 sm:grid sm:grid-cols-3">
            {relatedPosts.map((rel) => (
              <div
                key={rel.id}
                className="w-[80vw] max-w-[280px] shrink-0 scroll-snap-align-start sm:w-auto bg-[#0D1117] border border-[#1F2937] rounded-2xl p-4 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-[#8DC63F] uppercase bg-[#8DC63F]/10 px-2 py-0.5 rounded-full">
                    {rel.category}
                  </span>
                  <h3 className="text-sm font-bold text-white line-clamp-2">{rel.title}</h3>
                </div>
                <Link
                  href={`/blog/${rel.slug}`}
                  className="text-xs font-bold text-[#0B65B3] flex items-center gap-1 hover:underline active-press pt-2 border-t border-[#1F2937]"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
