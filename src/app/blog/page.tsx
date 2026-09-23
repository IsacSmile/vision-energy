import React from "react";
import Link from "next/link";
import { getPublishedBlogPosts } from "@/lib/data/posts";
import { ArrowRight, BookOpen } from "lucide-react";

export const metadata = {
  title: "Technical Blog & Engineering Insights | Lightning Protection & Earthing",
  description:
    "Read technical articles and standards guides on IEC 62305 lightning protection, low resistance earthing networks, ESE vs conventional air terminals, and UAE safety regulations.",
};

export const revalidate = 300;

export default async function BlogPage() {
  const posts = await getPublishedBlogPosts();

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => {
          const readTime = post.readingMinutes || 3;

          return (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="bg-[#0D1117] border border-white/10 hover:border-[#0B65B3] rounded-xl overflow-hidden flex flex-col justify-between transition-all active:scale-[0.98] group shadow-xl"
            >
              <div>
                {/* Aspect Ratio Container */}
                <div className="aspect-video w-full relative border-b border-white/10 overflow-hidden flex flex-col justify-between p-4">
                  {post.coverImage ? (
                    <img
                      src={post.coverImage}
                      alt={post.coverAlt || post.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0B65B3]/20 via-[#0D1117] to-[#8DC63F]/10">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(11,101,179,0.15),transparent_70%)]" />
                    </div>
                  )}

                  {/* Dark Gradient Overlay for Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] via-black/40 to-black/60 pointer-events-none" />

                  <div className="relative z-10 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#8DC63F] uppercase tracking-wider bg-[#8DC63F]/20 border border-[#8DC63F]/40 px-2.5 py-0.5 rounded-full backdrop-blur-md">
                      {post.category || "Technical Insights"}
                    </span>
                    <span className="text-[11px] font-medium text-gray-200 bg-black/60 border border-white/20 px-2 py-0.5 rounded-full backdrop-blur-md flex items-center gap-1">
                      <BookOpen className="w-3 h-3 text-[#0B65B3]" />
                      {readTime} min read
                    </span>
                  </div>

                  <div className="relative z-10 flex items-center gap-2 text-white">
                    <div className="w-7 h-7 rounded-lg bg-[#050608]/80 border border-white/20 flex items-center justify-center shrink-0 backdrop-blur-sm">
                      <BookOpen className="w-3.5 h-3.5 text-[#8DC63F]" />
                    </div>
                    <span className="text-xs font-semibold text-gray-200 line-clamp-1">
                      Vision Energy Engineering
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="text-[11px] text-gray-400">
                    {post.publishedAt
                      ? new Date(post.publishedAt).toLocaleDateString("en-GB", { year: "numeric", month: "short", day: "numeric" })
                      : ""}
                  </div>

                  <h2 className="text-lg font-bold text-white group-hover:text-[#8DC63F] transition-colors leading-snug line-clamp-2">
                    {post.title}
                  </h2>

                  <p className="text-xs text-[#A9B4C0] line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center justify-between text-xs text-gray-400 border-t border-white/5 mt-4">
                <span className="font-semibold text-gray-300 text-[11px]">Vision Energy Engineering Team</span>
                <span className="font-bold text-[#0B65B3] group-hover:text-[#8DC63F] flex items-center gap-1 transition-colors">
                  <span>Read Post</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
