'use client';

import React from 'react';
import Link from 'next/link';
import HeroLightning from '@/components/HeroLightning';
import { useEnquiryModal } from '@/components/modals/EnquiryModalProvider';
import { ArrowRight, ShieldCheck } from 'lucide-react';

interface HomeHeroClientProps {
  productCategoryCount?: number;
}

export default function HomeHeroClient({ productCategoryCount }: HomeHeroClientProps) {
  const { openServiceModal } = useEnquiryModal();

  const chipLinks = [
    { label: 'Lightning Protection', href: '/products/lp-01-conventional-lightning-protection-systems', isPrimary: true },
    { label: 'Earthing', href: '/products/es-01-earth-rods-couplers-accessories', isPrimary: false },
    { label: 'Surge Protection', href: '/products/sp-01-surge-protection-devices-spd', isPrimary: false },
    { label: 'Electrical', href: '/products', isPrimary: false },
    { label: 'Mechanical', href: '/products', isPrimary: false },
    { label: 'Solar', href: '/products', isPrimary: false },
  ];

  return (
    <section
      className="relative w-full h-[100svh] min-h-[100svh] flex flex-col justify-between overflow-hidden bg-[#050608] pt-[var(--mobile-header-h,56px)] lg:pt-[var(--header-h,80px)]"
      style={{ minHeight: '100svh', height: '100svh' }}
    >
      {/* Layer 1: Solid #050608 background */}
      <div className="absolute inset-0 bg-[#050608] pointer-events-none" />

      {/* Layer 2: WebGL Lightning Canvas Wrapper */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-10" aria-hidden="true">
        <HeroLightning />
      </div>

      {/* Layer 3: Text scrim layer (near-black, behind text only) */}
      <div
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          background: 'radial-gradient(ellipse 90% 42% at 50% 45%, rgba(5,6,8,0.8) 0%, rgba(5,6,8,0.55) 55%, rgba(5,6,8,0) 100%)',
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

      {/* Layer 5: Main Content (Vertically Centered between Header & Bottom Strip on mobile) */}
      <div className="relative z-30 w-full max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 my-auto flex-1 flex flex-col justify-center py-2 sm:py-8">
        <div className="max-w-[720px] text-center lg:text-left lg:mx-0 space-y-4 sm:space-y-6">
          {/* Badge Pill (Hidden below sm, shortened on sm/md, full on lg+) */}
          <div className="hidden sm:inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0D1117] border border-[#1F2937] text-xs font-semibold text-white tracking-wide shadow-lg">
            <ShieldCheck className="w-4 h-4 text-[#8DC63F]" />
            <span className="sm:inline lg:hidden">Lightning Protection • Earthing</span>
            <span className="hidden lg:inline">Lightning Protection • Earthing • Surge Protection</span>
          </div>

          {/* H1 Heading - Mobile (2 block spans, nowrap, auto fluid size) */}
          <h1
            className="block lg:hidden font-semibold text-white tracking-[-0.02em] text-center leading-[1.15]"
            style={{
              fontSize: 'min(calc((100vw - 32px) / 12.8), 2.5rem)',
              textShadow: '0 0 18px rgba(5,6,8,0.9), 0 2px 6px rgba(5,6,8,0.8)',
            }}
          >
            <span className="block whitespace-nowrap">Innovation Engineered</span>
            <span className="block whitespace-nowrap">for Performance</span>
          </h1>

          {/* H1 Heading - Desktop */}
          <h1
            className="hidden lg:block font-semibold text-white leading-[1.1] tracking-[-0.02em]"
            style={{
              fontSize: 'clamp(2.25rem, 3.6vw, 5.5rem)',
              textShadow: '0 0 18px rgba(5,6,8,0.9), 0 2px 6px rgba(5,6,8,0.8)',
            }}
          >
            <span className="block">Innovation Engineered</span>
            <span className="block">for Performance</span>
          </h1>

          {/* Paragraph */}
          <p
            className="mt-4 sm:mt-6 text-white/95 font-normal leading-[1.6] lg:leading-[1.7] max-w-[52ch] mx-auto lg:mx-0 text-center lg:text-left"
            style={{
              fontSize: 'clamp(1.125rem, 1.25vw, 1.75rem)',
              color: 'rgba(255,255,255,0.95)',
              textShadow: '0 0 18px rgba(5,6,8,0.9), 0 2px 6px rgba(5,6,8,0.8)',
            }}
          >
            We deliver reliable, sustainable solutions through engineering expertise, advanced technology, and technical excellence.
          </p>

          {/* Action Buttons (32px padding-top on mobile, 16px gap between buttons) */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 w-full max-w-[360px] sm:max-w-none mx-auto lg:mx-0">
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
              className="sm:hidden min-h-[48px] min-w-[48px] px-4 py-3 text-[#8DC63F] flex items-center justify-center gap-1.5 font-semibold text-sm hover:underline active-press mx-auto"
              style={{
                textShadow: '0 0 18px rgba(5,6,8,0.9), 0 2px 6px rgba(5,6,8,0.8)',
              }}
            >
              <span>Book a Service</span>
              <ArrowRight className="w-4 h-4 text-[#8DC63F]" />
            </button>
          </div>
        </div>
      </div>

      {/* Layer 6: Mobile Quick Facts & Category Chips Strip (Mobile only below 1024px) */}
      <div className="relative z-30 w-full max-w-[80rem] mx-auto px-5 pb-[max(20px,env(safe-area-inset-bottom))] lg:hidden animate-fade-up-strip">
        {/* Quick Fact Tiles (3 equal tiles in a row) */}
        <div className={`grid ${productCategoryCount && productCategoryCount > 0 ? 'grid-cols-3' : 'grid-cols-2'} gap-3 w-full mb-3`}>
          {/* Tile A: 2018 Established */}
          <div className="h-[88px] max-h-[88px] [media(max-height:640px)]:h-[72px] bg-[#0D1117]/85 border border-white/[0.08] rounded-xl flex flex-col items-center justify-center text-center p-2">
            <span className="text-[20px] [media(max-height:640px)]:text-[16px] font-semibold text-white leading-tight">2018</span>
            <span className="text-[12px] [media(max-height:640px)]:text-[10px] text-[#A9B4C0] uppercase tracking-[0.04em] font-medium leading-tight mt-0.5">Established</span>
          </div>

          {/* Tile B: 3 UAE Locations */}
          <div className="h-[88px] max-h-[88px] [media(max-height:640px)]:h-[72px] bg-[#0D1117]/85 border border-white/[0.08] rounded-xl flex flex-col items-center justify-center text-center p-2">
            <span className="text-[20px] [media(max-height:640px)]:text-[16px] font-semibold text-white leading-tight">3</span>
            <span className="text-[12px] [media(max-height:640px)]:text-[10px] text-[#A9B4C0] uppercase tracking-[0.04em] font-medium leading-tight mt-0.5">UAE Locations</span>
          </div>

          {/* Tile C: Product Categories (only if database count is available) */}
          {Boolean(productCategoryCount && productCategoryCount > 0) && (
            <div className="h-[88px] max-h-[88px] [media(max-height:640px)]:h-[72px] bg-[#0D1117]/85 border border-white/[0.08] rounded-xl flex flex-col items-center justify-center text-center p-2 overflow-hidden">
              <span className="text-[20px] [media(max-height:640px)]:text-[16px] font-semibold text-white leading-tight">{productCategoryCount}</span>
              <span className="text-[12px] [media(max-height:640px)]:text-[10px] text-[#A9B4C0] uppercase tracking-[0.04em] font-medium leading-tight mt-0.5 truncate w-full">Product Categories</span>
            </div>
          )}
        </div>

        {/* Explore Label & Scrollable Chips Row */}
        <div className="w-full [media(max-height:640px)]:hidden">
          <span className="text-[12px] uppercase text-[#A9B4C0] font-medium tracking-[0.04em] block mb-1 text-left">
            Explore
          </span>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar snap-x snap-mandatory py-1 w-full">
            {chipLinks.map((chip) => (
              <Link
                key={chip.label}
                href={chip.href}
                className={`h-[40px] px-4 rounded-full text-[14px] font-medium shrink-0 flex items-center justify-center border transition-colors snap-start active-press ${
                  chip.isPrimary
                    ? 'text-[#8DC63F] border-[#8DC63F] bg-transparent'
                    : 'text-white border-white/15 bg-transparent hover:border-white/30'
                }`}
              >
                {chip.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
