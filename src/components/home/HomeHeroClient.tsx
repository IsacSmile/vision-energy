'use client';

import React from 'react';
import Link from 'next/link';
import HeroLightning from '@/components/HeroLightning';
import { useEnquiryModal } from '@/components/modals/EnquiryModalProvider';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export default function HomeHeroClient() {
  const { openServiceModal } = useEnquiryModal();

  return (
    <section
      className="relative w-full min-h-screen flex flex-col items-center justify-between pt-[var(--mobile-header-h,56px)] lg:pt-[var(--header-h,80px)] pb-6 overflow-hidden bg-[#050608]"
      style={{ minHeight: '100svh' }}
    >
      {/* Layer 1: Solid #050608 background */}
      <div className="absolute inset-0 bg-[#050608] pointer-events-none" />

      {/* Layer 2: WebGL Lightning Canvas Wrapper */}
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
      <div className="relative z-30 w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 my-auto py-6 sm:py-8">
        <div className="max-w-[720px] text-center lg:text-left lg:mx-0 space-y-6">
          {/* Badge Pill (Hidden below sm, shortened on sm/md, full on lg+) */}
          <div className="hidden sm:inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0D1117] border border-[#1F2937] text-xs font-semibold text-white tracking-wide shadow-lg">
            <ShieldCheck className="w-4 h-4 text-[#8DC63F]" />
            <span className="sm:inline lg:hidden">Lightning Protection • Earthing</span>
            <span className="hidden lg:inline">Lightning Protection • Earthing • Surge Protection</span>
          </div>

          {/* H1 Heading (Only H1 on page) */}
          <h1 className="text-[clamp(2rem,6vw,2.5rem)] lg:text-[clamp(2.25rem,4.2vw,4rem)] font-semibold text-white leading-tight lg:leading-[1.1] tracking-[-0.02em] text-balance max-w-[13em]">
            Innovation Engineered for Performance
          </h1>

          {/* Paragraph (24px gap mt-6 on desktop, 52ch max-width) */}
          <p className="mt-6 text-base lg:text-lg text-white/85 font-normal leading-[1.7] max-w-[52ch] mx-auto lg:mx-0">
            We deliver reliable, sustainable solutions through engineering expertise, advanced technology, and technical excellence.
          </p>

          {/* Action Buttons (Mobile: ONE primary full-width 52px button + text link below; Desktop: side-by-side pills) */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 w-full max-w-[360px] sm:max-w-none mx-auto lg:mx-0">
            <Link
              href="/products"
              className="w-full sm:w-auto h-[52px] px-8 bg-white text-[#050608] font-bold text-base sm:text-sm rounded-full hover:bg-gray-100 transition-all flex items-center justify-center gap-2 pill-glow shadow-xl active-press"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4 text-[#0B65B3]" />
            </Link>

            {/* Desktop second button (dark glass pill) */}
            <button
              onClick={() =>
                openServiceModal({
                  serviceSlug: 'general-service',
                  serviceTitle: 'General Technical Service Booking',
                })
              }
              className="hidden sm:flex h-[52px] px-8 bg-[#0D1117] border border-[#1F2937] hover:border-[#8DC63F] text-white font-bold text-sm rounded-full transition-all items-center justify-center gap-2 blue-glow shadow-xl active-press"
            >
              <span>Book a Service</span>
            </button>

            {/* Mobile secondary CTA text link with arrow */}
            <button
              onClick={() =>
                openServiceModal({
                  serviceSlug: 'general-service',
                  serviceTitle: 'General Technical Service Booking',
                })
              }
              className="sm:hidden text-[#8DC63F] flex items-center justify-center gap-1.5 font-semibold text-sm hover:underline py-2 active-press"
            >
              <span>Book a Service</span>
              <ArrowRight className="w-4 h-4 text-[#8DC63F]" />
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator (hidden on mobile below md, centered exactly horizontally at left-1/2 -translate-x-1/2) */}
      <div className="hidden md:block absolute bottom-6 left-1/2 -translate-x-1/2 z-30 motion-safe:animate-bounce pointer-events-none opacity-80" aria-hidden="true">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-2.5 bg-[#8DC63F] rounded-full motion-safe:animate-pulse" />
        </div>
      </div>
    </section>
  );
}
