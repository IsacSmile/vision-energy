import React from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import { ShieldAlert, ArrowRight, CheckCircle2 } from 'lucide-react';
import HomeHeroClient from '@/components/home/HomeHeroClient';
import HomeSolutionsCarousel from '@/components/home/HomeSolutionsCarousel';

export const metadata = {
  title: 'Vision Energy International | Lightning Protection, Earthing and Electrical Solutions UAE',
  description:
    'Lightning protection, earthing, surge protection, electrical, mechanical and solar solutions for buildings and infrastructure across the UAE.',
};

export const revalidate = 60; // ISR revalidation

export default async function HomePage() {
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
    </div>
  );
}
