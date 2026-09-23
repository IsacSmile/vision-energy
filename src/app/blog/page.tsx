import React from "react";
import Link from "next/link";
import { getPublishedBlogPosts } from "@/lib/data/posts";
import { ArrowRight } from "lucide-react";

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
      {/* Hero Section - untouched per specification */}
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
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="bg-[#0D1117] border border-[#1F2937] hover:border-[#8DC63F]/50 rounded-xl overflow-hidden flex flex-col justify-between transition-all active:scale-[0.98] group shadow-xl"
          >
            <div>
              {/* Cover Image Container */}
              <div className="aspect-video w-full relative border-b border-[#1F2937] overflow-hidden bg-[#050608]">
                {post.coverImage ? (
                  <img
                    src={post.coverImage}
                    alt={post.coverAlt || post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#0B65B3]/20 via-[#0D1117] to-[#8DC63F]/10" />
                )}
              </div>

              <div className="p-5 space-y-3">
                {/* Category Pill */}
                <div>
                  <span className="text-[10px] font-bold text-[#8DC63F] uppercase tracking-wider bg-[#8DC63F]/10 border border-[#8DC63F]/30 px-2.5 py-0.5 rounded-full inline-block">
                    {post.category}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-lg font-bold text-white group-hover:text-[#8DC63F] transition-colors leading-snug">
                  {post.title}
                </h2>

                {/* Subheading */}
                <p className="text-xs text-[#A9B4C0] leading-relaxed">
                  {post.subheading}
                </p>
              </div>
            </div>

            {/* Read Article Link */}
            <div className="px-5 pb-5 mt-4 border-t border-[#1F2937]/50 pt-4 flex items-center justify-between">
              <span className="text-xs font-bold text-[#8DC63F] group-hover:underline flex items-center gap-1.5 transition-all">
                <span>Read article</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
