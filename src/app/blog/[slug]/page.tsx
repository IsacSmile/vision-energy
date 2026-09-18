import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { db } from '@/lib/db';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';

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

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Back Link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Technical Articles</span>
      </Link>

      {/* Article Container */}
      <article className="bg-[#0D1117] border border-[#1F2937] rounded-3xl p-8 sm:p-12 space-y-8 shadow-2xl">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400">
            <span className="font-bold text-[#8DC63F] bg-[#8DC63F]/10 border border-[#8DC63F]/40 px-3 py-1 rounded-full flex items-center gap-1">
              <Tag className="w-3 h-3" />
              {post.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-gray-500" />
              {new Date(post.publishedAt).toLocaleDateString()}
            </span>
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-gray-500" />
              {post.author}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="text-base text-gray-300 leading-relaxed font-sans italic border-l-4 border-[#0B65B3] pl-4">
            {post.excerpt}
          </p>
        </div>

        <div className="border-t border-[#1F2937] pt-8 text-gray-300 space-y-6 leading-relaxed text-sm sm:text-base whitespace-pre-wrap">
          {post.content}
        </div>
      </article>
    </div>
  );
}
