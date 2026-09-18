import React from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import { ArrowRight, BookOpen } from 'lucide-react';

export const metadata = {
  title: 'Technical Blog & Engineering Insights | Lightning Protection & Earthing',
  description:
    'Read technical articles and standards guides on IEC 62305 lightning protection, low resistance earthing networks, ESE vs conventional air terminals, and UAE safety regulations.',
};

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await db.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: 'desc' },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold text-[#8DC63F] uppercase tracking-widest bg-[#8DC63F]/10 border border-[#8DC63F]/30 px-3.5 py-1 rounded-full inline-block">
          Technical Publication & Articles
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Engineering Insights & Standards
        </h1>
        <p className="text-sm text-[#A9B4C0] leading-relaxed">
          Knowledge base articles on international electrical codes, lightning risk mitigation, and earthing system design for UAE projects.
        </p>
      </div>

      {/* Grid of Blog Posts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-[#0D1117] border border-[#1F2937] hover:border-[#0B65B3] rounded-3xl p-6 flex flex-col justify-between space-y-6 transition-all group hover:bg-[#161B22] shadow-xl"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between text-[11px] text-gray-400">
                <span className="font-bold text-[#8DC63F] uppercase bg-[#8DC63F]/10 border border-[#8DC63F]/30 px-2.5 py-0.5 rounded-full">
                  {post.category}
                </span>
                <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
              </div>

              <h2 className="text-xl font-bold text-white group-hover:text-[#0B65B3] transition-colors leading-snug">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>

              <p className="text-xs text-[#A9B4C0] line-clamp-3 leading-relaxed">
                {post.excerpt}
              </p>
            </div>

            <div className="pt-6 border-t border-[#1F2937] flex items-center justify-between text-xs">
              <span className="text-gray-400 font-semibold">{post.author}</span>
              <Link
                href={`/blog/${post.slug}`}
                className="font-bold text-[#0B65B3] group-hover:text-[#8DC63F] flex items-center gap-1 transition-colors"
              >
                <span>Read Full Article</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
