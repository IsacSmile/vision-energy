import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { db } from '@/lib/db';
import { ArrowLeft, Calendar, User, Tag, Clock, ArrowRight } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await db.blogPost.findUnique({ where: { slug } });
  if (!post) return { title: 'Article Not Found' };

  return {
    title: `${post.title} | Vision Energy Technical Blog`,
    description: post.excerpt,
  };
}

export const revalidate = 60;

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await db.blogPost.findUnique({ where: { slug } });

  if (!post || !post.published) {
    notFound();
  }

  const relatedPosts = await db.blogPost.findMany({
    where: {
      published: true,
      NOT: { id: post.id },
    },
    take: 3,
  });

  // Calculate read time (~200 words/min)
  const wordCount = post.content.split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

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

      {/* Article Container (Optimal 65ch measure for reading) */}
      <article className="bg-[#0D1117] border border-[#1F2937] rounded-2xl sm:rounded-3xl p-6 sm:p-12 space-y-8 shadow-2xl">
        <div className="space-y-4 max-w-[65ch] mx-auto">
          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400">
            <span className="font-bold text-[#8DC63F] bg-[#8DC63F]/10 border border-[#8DC63F]/40 px-3 py-1 rounded-full flex items-center gap-1">
              <Tag className="w-3 h-3" />
              {post.category}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#0B65B3]" />
              {readTime} min read
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-gray-500" />
              {new Date(post.publishedAt).toLocaleDateString()}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="text-sm sm:text-base text-gray-300 leading-relaxed italic border-l-4 border-[#0B65B3] pl-4">
            {post.excerpt}
          </p>
        </div>

        {/* Body Text with 18px measure */}
        <div className="border-t border-[#1F2937] pt-8 max-w-[65ch] mx-auto text-gray-200 space-y-6 leading-relaxed text-[18px] whitespace-pre-wrap font-sans">
          {post.content}
        </div>
      </article>

      {/* Related Posts Swipe Row */}
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
