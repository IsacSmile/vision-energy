import React from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import { dictionary } from '@/lib/dictionary';
import {
  Zap,
  ShieldAlert,
  Sun,
  Wrench,
  Phone,
  ArrowRight,
  Building2,
  Factory,
  CheckCircle2,
  Send,
} from 'lucide-react';
import HomeHeroClient from '@/components/home/HomeHeroClient';
import HomeSolutionsCarousel from '@/components/home/HomeSolutionsCarousel';
import HomeWhyChooseUsAccordion from '@/components/home/HomeWhyChooseUsAccordion';

export const metadata = {
  title: 'Vision Energy International | Lightning Protection, Earthing and Electrical Solutions UAE',
  description:
    'Lightning protection, earthing, surge protection, electrical, mechanical and solar solutions for buildings and infrastructure across the UAE.',
};

export const revalidate = 60; // ISR revalidation

export default async function HomePage() {
  const latestPosts = await db.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: 'desc' },
    take: 3,
  });

  const productCategoryCount = await db.productCategory.count();

  return (
    <div className="space-y-12 sm:space-y-20 pb-16">
      {/* SECTION 1: HERO SECTION */}
      <HomeHeroClient productCategoryCount={productCategoryCount} />

      {/* SECTION 2: FIVE SOLUTION BLOCKS (Mobile Swipe Carousel / Desktop Grid) */}
      <HomeSolutionsCarousel />

      {/* SECTION 3: FEATURED HIGHLIGHT BAND (H2 with "Lightning Protection and Earthing Solutions" + Lime subline) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden bg-linear-to-r from-[#0B65B3]/20 via-[#0D1117] to-[#8DC63F]/20 border border-white/10 p-6 sm:p-12 rounded-2xl sm:rounded-3xl shadow-2xl space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8DC63F]/20 border border-[#8DC63F]/50 text-xs font-bold text-[#8DC63F]">
                <ShieldAlert className="w-4 h-4" />
                <span>Priority Focus Area</span>
              </div>

              {/* H2 Heading containing Lightning Protection and Earthing */}
              <h2 className="text-[clamp(1.5rem,6vw,2.5rem)] font-extrabold text-white tracking-tight leading-tight">
                Lightning Protection and Earthing Solutions
              </h2>

              {/* Lime subline relocated from Hero */}
              <p className="text-base sm:text-xl font-bold text-[#8DC63F]">
                essential safety for your assets
              </p>

              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-2xl">
                Protecting UAE critical infrastructure, commercial towers, and industrial plants against direct lightning strikes and transient ground faults. Full compliance with IEC 62305 and NF C 17-102 standards.
              </p>

              {/* 2 Benefit Lines */}
              <ul className="space-y-2 text-xs text-gray-200 pt-1">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8DC63F] shrink-0" />
                  <span>Full Compliance with International IEC 62305 & NF C 17-102 Standards</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8DC63F] shrink-0" />
                  <span>Complete Inventory: ESE Rods, Chemical Earth Electrodes & Exothermic Welding</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <Link
                href="/services/external-lightning-protection-installation"
                className="w-full py-3.5 px-6 bg-[#8DC63F] hover:bg-[#8DC63F]/90 text-[#050608] font-bold text-sm rounded-full text-center transition-all flex items-center justify-center gap-2 pill-glow active-press min-h-[48px]"
              >
                <span>View Lightning Installation Service</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/products/lp-01-conventional-lightning-protection-systems"
                className="w-full py-3.5 px-6 bg-[#0B65B3] hover:bg-[#0B65B3]/90 text-white font-bold text-sm rounded-full text-center transition-all flex items-center justify-center gap-2 blue-glow active-press min-h-[48px]"
              >
                <span>Browse Protection Catalogue (LP-01)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: WHY CHOOSE US (2-Col Compact Accordion Grid) */}
      <HomeWhyChooseUsAccordion />

      {/* SECTION 5: INDUSTRIES SERVED (Horizontally Scrollable Chips) */}
      <section className="bg-[#0D1117] border-y border-[#1F2937] py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-center">
          <span className="text-xs font-bold text-[#A9B4C0] uppercase tracking-widest block">
            Target Industries & Sector Expertise
          </span>
          <div className="flex overflow-x-auto no-scrollbar scroll-snap-x gap-3 py-2 sm:grid sm:grid-cols-3 lg:grid-cols-6 sm:overflow-visible">
            {[
              { label: 'Commercial High-Rises', icon: Building2, color: '#0B65B3' },
              { label: 'Oil & Gas / Chemical', icon: Factory, color: '#8DC63F' },
              { label: 'Power Substations', icon: Zap, color: '#F2C230' },
              { label: 'Solar PV Farms', icon: Sun, color: '#8DC63F' },
              { label: 'Water Infrastructure', icon: Wrench, color: '#0B65B3' },
              { label: 'Defense & Security', icon: ShieldAlert, color: '#8DC63F' },
            ].map((ind, i) => {
              const Icon = ind.icon;
              return (
                <div
                  key={i}
                  className="shrink-0 scroll-snap-align-start w-36 sm:w-auto p-3.5 bg-[#050608] border border-white/10 rounded-xl text-center space-y-2"
                >
                  <Icon className="w-5 h-5 mx-auto" style={{ color: ind.color }} />
                  <span className="text-xs font-semibold text-white block leading-tight truncate">
                    {ind.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 6: LATEST BLOG POSTS (Swipe Row on Mobile) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#8DC63F] uppercase tracking-widest bg-[#8DC63F]/10 border border-[#8DC63F]/30 px-3.5 py-1 rounded-full inline-block mb-1">
              Technical Insights
            </span>
            <h2 className="text-[clamp(1.25rem,5vw,2rem)] font-bold text-white tracking-tight">
              Latest Articles & Guides
            </h2>
          </div>
          <Link
            href="/blog"
            className="text-xs font-bold text-[#8DC63F] hover:underline flex items-center gap-1 shrink-0 active-press"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="flex overflow-x-auto no-scrollbar scroll-snap-x gap-4 pb-2 sm:grid sm:grid-cols-3 sm:overflow-visible">
          {latestPosts.map((post) => (
            <div
              key={post.id}
              className="w-[85vw] max-w-[300px] shrink-0 scroll-snap-align-center sm:w-auto bg-[#0D1117] border border-white/10 rounded-2xl p-5 flex flex-col justify-between hover:border-[#0B65B3] transition-colors group"
            >
              <div className="space-y-3">
                <span className="text-[10px] font-bold text-[#8DC63F] uppercase tracking-wider bg-[#8DC63F]/10 px-2.5 py-1 rounded-full inline-block">
                  {post.category}
                </span>
                <h3 className="text-base font-bold text-white group-hover:text-[#0B65B3] transition-colors line-clamp-2">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="text-xs text-[#A9B4C0] line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 mt-4 flex items-center justify-between text-xs text-gray-400">
                <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="font-bold text-[#0B65B3] group-hover:text-[#8DC63F] flex items-center gap-1 transition-colors active-press"
                >
                  <span>Read</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
