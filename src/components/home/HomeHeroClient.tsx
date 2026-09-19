'use client';

import React from 'react';
import Link from 'next/link';
import HeroLightning from '@/components/HeroLightning';
import { useEnquiryModal } from '@/components/modals/EnquiryModalProvider';
import { ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export default function HomeHeroClient() {
  const { openServiceModal } = useEnquiryModal();

  return (
    <section
      className="relative w-full min-h-screen flex flex-col items-center justify-between pt-[var(--header-h,80px)] pb-6 overflow-hidden bg-[#050608]"
      style={{ minHeight: '100svh' }}
    >
      {/* Layer 1: Solid #050608 background */}
      <div className="absolute inset-0 bg-[#050608] pointer-events-none" />

      {/* Layer 2: WebGL Lightning Canvas Wrapper (100% width & height) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-10" aria-hidden="true">
        <HeroLightning />
      </div>

      {/* Layer 3: Small subtle text-contrast layer */}
      <div
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(5,6,8,0.55) 0%, rgba(5,6,8,0) 60%)',
        }}
      />

      {/* Layer 4: Bottom fade to #050608 over 120px */}
      <div
        className="absolute bottom-0 inset-x-0 pointer-events-none z-20"
        style={{
          height: '120px',
          background: 'linear-gradient(to bottom, rgba(5,6,8,0) 0%, #050608 100%)',
        }}
      />

      {/* Layer 5: Content */}
      <div className="relative z-30 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-auto py-6 sm:py-8">
        <div className="max-w-2xl text-center lg:text-left lg:mx-0 lg:max-w-[640px] space-y-5 sm:space-y-8">
          {/* Pill Badge (hidden below md to preserve vertical space on mobile) */}
          <div className="hidden md:inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0D1117] border border-[#1F2937] text-xs font-semibold text-white tracking-wide shadow-lg">
            <ShieldCheck className="w-4 h-4 text-[#8DC63F]" />
            <span>Lightning Protection • Earthing • Surge Protection</span>
          </div>

          {/* H1 Heading with fluid clamp & text balance */}
          <h1 className="text-[clamp(2.25rem,6vw,4.5rem)] font-extrabold text-white tracking-tight leading-tight text-balance">
            Lightning Protection
            <span className="block text-[#8DC63F] text-[clamp(1.35rem,4vw,3.25rem)] font-bold mt-2 sm:mt-3">
              essential safety for your assets
            </span>
          </h1>

          {/* Supporting Paragraph (max 3 lines on mobile) */}
          <p className="text-base sm:text-lg text-gray-200 leading-relaxed line-clamp-3 sm:line-clamp-none max-w-xl mx-auto lg:mx-0">
            Lightning protection, earthing and surge protection solutions for buildings and infrastructure across the UAE.
          </p>

          {/* Action Buttons (stacked full width on mobile, side-by-side from sm+) */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2 w-full max-w-[360px] sm:max-w-none mx-auto lg:mx-0">
            <Link
              href="/products"
              className="w-full sm:w-auto h-12 px-8 bg-white text-[#050608] font-bold text-sm rounded-full hover:bg-gray-100 transition-all flex items-center justify-center gap-2 pill-glow shadow-xl"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4 text-[#0B65B3]" />
            </Link>

            <button
              onClick={() =>
                openServiceModal({
                  serviceSlug: 'general-service',
                  serviceTitle: 'General Technical Service Booking',
                })
              }
              className="w-full sm:w-auto h-12 px-8 bg-[#0D1117] border border-[#1F2937] hover:border-[#8DC63F] text-white font-bold text-sm rounded-full transition-all flex items-center justify-center gap-2 blue-glow shadow-xl"
            >
              <Zap className="w-4 h-4 text-[#8DC63F]" />
              <span>Book a Service</span>
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator (hidden below md) */}
      <div className="hidden md:block relative z-30 pb-4 motion-safe:animate-bounce pointer-events-none opacity-80" aria-hidden="true">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2 mx-auto">
          <div className="w-1.5 h-2.5 bg-[#8DC63F] rounded-full motion-safe:animate-pulse" />
        </div>
      </div>
    </section>
  );
}
