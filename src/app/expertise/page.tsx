import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, ArrowRight } from 'lucide-react';
import WhyVisionEnergy from '@/components/home/WhyVisionEnergy';
import IndustriesWeServe from '@/components/home/IndustriesWeServe';
import StandardsCompliance from '@/components/products/StandardsCompliance';
import FinalCTA from '@/components/home/FinalCTA';
import ExpertiseClient from '@/components/expertise/ExpertiseClient';

export const metadata = {
  title: 'Lightning & Earthing Engineering Expertise UAE | Vision Energy',
  description:
    'Authority-compliant lightning protection and earthing systems engineered for UAE & GCC infrastructure, alongside specialized gym and laboratory technical solutions by Vision Energy.',
  keywords: [
    'Lightning Protection Expertise UAE',
    'Earthing Engineering Solutions',
    'DEWA Authority Approval UAE',
    'SEWA Compliance Support',
    'Gym Equipment Engineering UAE',
    'Laboratory Solutions GCC',
    'Lightning Protection Design UAE',
    'Earthing Systems Expertise Dubai',
    'Vision Energy Expertise',
  ],
  alternates: {
    canonical: 'https://www.visionenergyme.com/expertise',
  },
  openGraph: {
    title: 'Lightning & Earthing Engineering Expertise | Vision Energy UAE',
    description:
      'Authority-compliant lightning protection and earthing systems across the UAE and GCC, alongside specialized gym and laboratory technical solutions.',
    url: 'https://www.visionenergyme.com/expertise',
    type: 'website',
    images: [
      {
        url: 'https://www.visionenergyme.com/images/products-collage-banner.jpg',
        width: 1200,
        height: 630,
        alt: 'Vision Energy Technical & Engineering Expertise Dubai UAE',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lightning & Earthing Engineering Expertise | Vision Energy UAE',
    description:
      'Authority-compliant lightning protection and earthing systems across the UAE and GCC, alongside specialized gym and laboratory technical solutions.',
    images: ['https://www.visionenergyme.com/images/products-collage-banner.jpg'],
  },
};

export const dynamic = 'force-static';
export const revalidate = 3600;

export default function ExpertisePage() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.visionenergyme.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Expertise',
        item: 'https://www.visionenergyme.com/expertise',
      },
    ],
  };

  const webPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Technical Expertise & Engineering Solutions | Vision Energy International',
    description:
      'Specialist product selection, authority approval compliance, and turnkey engineering support across the UAE and GCC.',
    url: 'https://www.visionenergyme.com/expertise',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />

      <div className="w-full bg-[#050608] text-white overflow-x-clip">
        {/* SECTION A: HERO HEADER */}
        <section
          id="expertise-hero"
          data-dark-hero="true"
          data-hero-section="true"
          data-preserve-contrast="true"
          className="expertise-hero relative overflow-hidden bg-[#050608] border-b border-[#1F2937]/80 min-h-[420px] sm:min-h-[460px] lg:min-h-[520px] flex flex-col justify-end text-white"
        >
          {/* Full Background Hero Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/expertise-hero-bg.webp"
              alt="Vision Energy electrical engineer testing earthing resistance beneath rooftop copper lightning protection rods"
              fill
              priority
              unoptimized
              sizes="100vw"
              className="object-cover object-[72%_44%] lg:object-[right_42%]"
            />
            {/* Mobile & tablet scrim: balanced readability across full width while keeping upper subject vivid */}
            <div
              className="lg:hidden absolute inset-0 z-[1]"
              style={{
                background:
                  'linear-gradient(0deg, rgba(5, 6, 8, 0.92) 0%, rgba(5, 6, 8, 0.72) 52%, rgba(5, 6, 8, 0.28) 100%)',
              }}
            />
            {/* Desktop targeted left-side scrim: high contrast under copy without muddying the right-side photograph */}
            <div
              className="hidden lg:block absolute inset-0 z-[1]"
              style={{
                background:
                  'linear-gradient(90deg, rgba(5, 6, 8, 0.88) 0%, rgba(5, 6, 8, 0.70) 36%, rgba(5, 6, 8, 0.20) 56%, rgba(5, 6, 8, 0) 72%)',
              }}
            />
            <div
              className="absolute inset-x-0 top-0 h-24 z-[1]"
              style={{
                background:
                  'linear-gradient(180deg, rgba(5, 6, 8, 0.55) 0%, rgba(5, 6, 8, 0) 100%)',
              }}
            />
            <div
              className="absolute inset-x-0 bottom-0 h-20 z-[1]"
              style={{
                background:
                  'linear-gradient(0deg, rgba(5, 6, 8, 0.82) 0%, rgba(5, 6, 8, 0) 100%)',
              }}
            />
          </div>

          <div className="max-w-[80rem] w-full mx-auto px-4 sm:px-6 lg:px-8 pt-[calc(var(--header-offset,80px)+44px)] lg:pt-[calc(var(--header-offset,80px)+64px)] pb-11 sm:pb-14 relative z-10">
            <div className="space-y-4 max-w-[630px] lg:max-w-[660px]">
              <nav
                aria-label="Breadcrumb"
                data-preserve-contrast="true"
                className="text-[13px] text-white/90 font-medium flex items-center gap-2 drop-shadow-sm"
                style={{ color: 'rgba(255, 255, 255, 0.9)', textShadow: '0 1px 4px rgba(0, 0, 0, 0.85)' }}
              >
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-white/60" />
                <span className="text-[#8DC63F] font-semibold" style={{ color: '#8DC63F', textShadow: '0 1px 6px rgba(0,0,0,0.8)' }}>
                  Expertise
                </span>
              </nav>

              <div
                data-preserve-contrast="true"
                className="inline-flex items-center gap-2 text-xs sm:text-[13px] font-bold text-[#8DC63F] uppercase tracking-[0.14em]"
                style={{ color: '#8DC63F', textShadow: '0 1px 6px rgba(0,0,0,0.8)' }}
              >
                <span className="w-6 h-[2px] bg-[#8DC63F] rounded-full shrink-0" aria-hidden="true" />
                <span>Technical Expertise &amp; Engineering Capabilities</span>
              </div>

              <h1
                data-preserve-contrast="true"
                className="text-3xl sm:text-4xl lg:text-[46px] font-bold !text-white tracking-tight leading-[1.13]"
                style={{
                  color: '#FFFFFF',
                  textShadow: '0 3px 18px rgba(0, 0, 0, 0.92), 0 1px 4px rgba(0, 0, 0, 0.9)',
                }}
              >
                Lightning &amp; Earthing Engineering Expertise
              </h1>

              <p
                data-preserve-contrast="true"
                className="text-base sm:text-lg !text-white/95 max-w-[600px] leading-relaxed"
                style={{
                  color: 'rgba(255, 255, 255, 0.95)',
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.92), 0 1px 3px rgba(0, 0, 0, 0.88)',
                }}
              >
                Authority-compliant lightning protection and earthing systems engineered for UAE and GCC critical infrastructure—alongside specialized technical solutions for commercial gym and laboratory facilities.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0B65B3] hover:bg-[#095292] text-white text-sm font-bold border border-[#8DC63F]/60 hover:border-[#8DC63F] shadow-[0_0_20px_rgba(11,101,179,0.4)] transition-all active:scale-[0.98]"
                >
                  <span>Explore Products</span>
                  <ArrowRight className="w-4 h-4 text-[#8DC63F]" />
                </Link>

                <Link
                  href="/services"
                  data-preserve-contrast="true"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900/70 hover:bg-slate-900/90 text-white text-sm font-semibold border border-white/30 hover:border-white/60 backdrop-blur-md transition-all active:scale-[0.98] shadow-sm"
                  style={{
                    backgroundColor: 'rgba(15, 23, 42, 0.72)',
                    color: '#FFFFFF',
                    textShadow: '0 1px 3px rgba(0, 0, 0, 0.8)',
                  }}
                >
                  <span>View Services</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION B: STANDARDS & AUTHORITY COMPLIANCE (Shared, Top Credentials) */}
        <StandardsCompliance />

        {/* SECTION C: WHY VISION ENERGY (Shared, Top Capability Pillars) */}
        <WhyVisionEnergy />

        {/* SECTION D: INDUSTRIES WE SERVE (Shared, Top Sector Matrix) */}
        <IndustriesWeServe />

        {/* SECTION E: INTERACTIVE EXPERTISE TABS */}
        <ExpertiseClient />

        {/* SECTION F: FINAL CTA (Shared) */}
        <FinalCTA variant="minimal" />
      </div>
    </>
  );
}

