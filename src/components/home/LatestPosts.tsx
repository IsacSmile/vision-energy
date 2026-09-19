import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FileText, ArrowUpRight } from 'lucide-react';
import { db } from '@/lib/db';
import Reveal from '@/components/ui/Reveal';
import Chip from '@/components/ui/Chip';

function calculateReadTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

function formatDateGB(date: Date): string {
  return new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default async function LatestPosts() {
  const isProd = process.env.NODE_ENV === 'production';

  // Fetch newest published blog posts
  const posts = await db.blogPost.findMany({
    where: {
      published: true,
      ...(isProd ? { isPlaceholder: false } : {}),
    },
    orderBy: {
      publishedAt: 'desc',
    },
    take: 3,
  });

  // Guard: If fewer than 3 posts, do not render section at all
  if (posts.length < 3) {
    return null;
  }

  const [featuredPost, ...rowPosts] = posts;

  return (
    <section
      aria-labelledby="latest-posts-heading"
      className="py-16 md:py-24 lg:py-32 bg-[#050608] relative border-t border-b border-white/[0.08]"
    >
      <div className="max-w-[80rem] mx-auto px-5 sm:px-6 lg:px-8 space-y-12 lg:space-y-16">
        {/* HEADER BLOCK */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-6 h-[1.5px] bg-[#8DC63F]" />
              <span className="text-xs uppercase tracking-widest text-[#8DC63F] font-semibold">
                Insights
              </span>
            </div>
            <h2
              id="latest-posts-heading"
              className="text-[clamp(1.75rem,4.2vw,3rem)] font-semibold text-white leading-[1.15] tracking-[-0.02em] [text-wrap:balance]"
            >
              Latest from Vision Energy
            </h2>
          </div>

          {/* DESKTOP VIEW ALL LINK */}
          <Link
            href="/blog"
            className="hidden lg:inline-flex items-center gap-2 text-sm font-semibold text-[#8DC63F] hover:text-white transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] rounded px-1 py-0.5"
          >
            <span>View all articles</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* MAIN POSTS GRID: Featured Post (7 cols) + Row Posts (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* FEATURED POST (lg:col-span-7) */}
          <Reveal staggerIndex={0} className="lg:col-span-7">
            <Link
              href={`/blog/${featuredPost.slug}`}
              aria-label={featuredPost.title}
              className="group block space-y-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] rounded-2xl p-2 transition-colors hover:bg-white/[0.01]"
            >
              {/* Cover Image Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[20px] bg-gradient-to-br from-[#0B65B3]/20 via-[#0D1117] to-[#050608] border border-white/[0.08]">
                {featuredPost.coverImage ? (
                  <Image
                    src={featuredPost.coverImage}
                    alt={featuredPost.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#0B65B3]/15 via-[#0D1117] to-[#050608]">
                    <FileText className="w-16 h-16 text-[#0B65B3]/40 stroke-[1.5]" />
                  </div>
                )}

                {/* Dev Placeholder Badge */}
                {featuredPost.isPlaceholder && !isProd && (
                  <div className="absolute top-4 left-4 z-10">
                    <Chip variant="muted">Placeholder</Chip>
                  </div>
                )}
              </div>

              {/* Meta Row & Content */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2 text-[13px] text-[#A9B4C0] uppercase tracking-[0.08em]">
                  <span className="font-medium text-[#8DC63F]">{featuredPost.category}</span>
                  <span>•</span>
                  <span>{formatDateGB(featuredPost.publishedAt)}</span>
                  <span>•</span>
                  <span>{calculateReadTime(featuredPost.content)}</span>
                </div>

                <h3 className="relative inline-block text-[clamp(1.375rem,2.4vw,2rem)] font-semibold text-white leading-[1.25] [text-wrap:balance] group-hover:text-[#8DC63F] transition-colors">
                  {featuredPost.title}
                </h3>

                <p className="text-base text-[#A9B4C0] leading-[1.7] line-clamp-2">
                  {featuredPost.excerpt}
                </p>
              </div>
            </Link>
          </Reveal>

          {/* ROW POSTS (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col justify-between divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {rowPosts.map((post, index) => (
              <Reveal key={post.id} staggerIndex={index + 1} className="py-6 lg:py-8 flex-1 flex flex-col justify-center">
                <Link
                  href={`/blog/${post.slug}`}
                  aria-label={post.title}
                  className="group block space-y-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] rounded-lg p-2 hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-2 text-[13px] text-[#A9B4C0] uppercase tracking-[0.08em]">
                      <span className="font-medium text-[#8DC63F]">{post.category}</span>
                      <span>•</span>
                      <span>{formatDateGB(post.publishedAt)}</span>
                      <span>•</span>
                      <span>{calculateReadTime(post.content)}</span>
                    </div>

                    {post.isPlaceholder && !isProd && (
                      <Chip variant="muted">Placeholder</Chip>
                    )}
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-[clamp(1.125rem,1.6vw,1.375rem)] font-medium text-white leading-[1.3] group-hover:text-[#8DC63F] lg:group-hover:translate-x-[6px] transition-all duration-300">
                      {post.title}
                    </h3>
                    <ArrowUpRight className="w-5 h-5 text-[#8DC63F] shrink-0 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300 mt-0.5" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>

        {/* MOBILE VIEW ALL LINK (Below list on mobile) */}
        <div className="block lg:hidden text-center pt-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-base font-semibold text-[#8DC63F] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] rounded px-3 py-2 border border-[#8DC63F]/30 bg-[#8DC63F]/5"
          >
            <span>View all articles</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
