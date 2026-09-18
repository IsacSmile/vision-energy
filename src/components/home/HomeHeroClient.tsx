'use client';

import React from 'react';
import Link from 'next/link';
import { useEnquiryModal } from '@/components/modals/EnquiryModalProvider';
import { dictionary } from '@/lib/dictionary';
import { ArrowRight, ShieldCheck, Zap, Phone, CheckCircle2 } from 'lucide-react';

export default function HomeHeroClient() {
  const { openServiceModal } = useEnquiryModal();

  return (
    <section className="relative pt-12 pb-16 overflow-hidden bg-gradient-to-b from-[#0B65B3]/10 via-[#050608] to-[#050608] border-b border-[#1F2937]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        {/* Top Highlight Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0D1117] border border-[#8DC63F]/40 text-xs font-bold text-[#8DC63F] pill-glow">
          <ShieldCheck className="w-4 h-4 text-[#8DC63F]" />
          <span>UAE Authorised Trading Distributor • Lightning Protection & Earthing Focus</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
          Redefined, Innovative & Quality Assured{' '}
          <span className="text-gradient-blue-lime">Engineering Product Solutions</span>
        </h1>

        {/* Subline */}
        <p className="text-base sm:text-lg text-[#A9B4C0] max-w-2xl mx-auto leading-relaxed">
          {dictionary.hero.subline}
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            href="/products"
            className="px-8 py-4 bg-gradient-brand text-white font-bold text-sm rounded-full hover:opacity-90 transition-opacity flex items-center gap-2 pill-glow"
          >
            <span>{dictionary.hero.ctaProducts}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <button
            onClick={() =>
              openServiceModal({
                serviceSlug: 'general-service',
                serviceTitle: 'General Technical Service Booking',
              })
            }
            className="px-8 py-4 bg-[#0D1117] border border-[#1F2937] hover:border-[#8DC63F] text-white font-bold text-sm rounded-full transition-colors flex items-center gap-2"
          >
            <Zap className="w-4 h-4 text-[#8DC63F]" />
            <span>{dictionary.hero.ctaServices}</span>
          </button>
        </div>

        {/* Regional Locations Badge Bar */}
        <div className="pt-8 border-t border-[#1F2937]/50 max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-6 text-xs text-[#A9B4C0]">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#8DC63F]" />
            <span className="font-semibold text-white">Abu Dhabi</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#8DC63F]" />
            <span className="font-semibold text-white">Dubai</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#8DC63F]" />
            <span className="font-semibold text-white">Ras Al Khaimah</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-400">
            <span>Direct Tel: {dictionary.company.primaryPhone}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
