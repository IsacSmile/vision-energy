import React from "react";
import Link from "next/link";
import BrandImage, { BrandLogoPlaceholder } from "@/components/ui/BrandImage";
import { getPublishedBlogPosts } from "@/lib/data/posts";
import { ArrowRight, ChevronRight } from "lucide-react";

export const metadata = {
  title: 'Engineering Blog & Technical Guides UAE | Vision Energy',
  description:
    'Technical guides on IEC 62305 lightning protection, BS 7430 earthing in UAE soil, SPD surge coordination & approvals for UAE and Qatar projects.',
  keywords: [
    'Lightning Protection Guide UAE',
    'Earthing Soil Resistivity Dubai',
    'IEC 62305 Compliance UAE',
    'ESE vs Conventional Lightning Protection',
    'Vision Energy Blog Qatar UAE',
  ],
  alternates: {
    canonical: 'https://www.visionenergyme.com/blog',
  },
  openGraph: {
    title: 'Engineering Blog & Technical Guides UAE | Vision Energy',
    description:
      'Technical guides on IEC 62305 lightning protection, BS 7430 earthing, and electrical codes across UAE & Qatar.',
    url: 'https://www.visionenergyme.com/blog',
    type: 'website',
  },
};

export const revalidate = 300;

export default async function BlogPage() {
  const posts = await getPublishedBlogPosts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Hero Section - Left-Aligned matching Products Page */}
      <div className="space-y-4 max-w-4xl text-left border-b border-[#1F2937]/80 pb-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-[13px] text-[#A9B4C0] font-medium flex items-center gap-2">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#A9B4C0]/60" />
          <span className="text-white" aria-current="page">
            Blog
          </span>
        </nav>

        {/* H1 Title */}
        <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold text-white leading-[1.1] tracking-[-0.02em]">
          Engineering Insights & Standards
        </h1>

        {/* Description */}
        <p className="text-base lg:text-[18px] text-[#A9B4C0] leading-[1.65] max-w-[60ch]">
          Knowledge base articles on international electrical codes, lightning risk mitigation, and earthing system design for UAE and Qatar projects.
        </p>

        {/* Cross-links & Count Meta Line */}
        <div className="flex flex-wrap items-center gap-4 text-[13px] text-[#A9B4C0] font-medium pt-1">
          <span>{posts.length} technical articles</span>
          <span aria-hidden="true">·</span>
          <Link href="/expertise" className="text-[#8DC63F] hover:underline">
            Engineering Expertise Hub
          </Link>
          <span aria-hidden="true">·</span>
          <Link href="/glossary" className="text-[#8DC63F] hover:underline">
            Technical Glossary
          </Link>
        </div>
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
                  <BrandImage
                    src={post.coverImage}
                    alt={post.coverAlt || post.title}
                    fill
                    unoptimized
                    surface="auto"
                    logoSize="md"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <BrandLogoPlaceholder surface="auto" logoSize="md" animate={false} className="w-full h-full" />
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
