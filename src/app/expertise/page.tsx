import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, ArrowRight } from 'lucide-react';
import WhyVisionEnergy from '@/components/home/WhyVisionEnergy';
import StandardsCompliance from '@/components/products/StandardsCompliance';
import FinalCTA from '@/components/home/FinalCTA';
import ExpertiseClient from '@/components/expertise/ExpertiseClient';

export const metadata = {
  title: 'Technical Expertise & Engineering Solutions UAE | Vision Energy',
  description:
    'Discover Vision Energy’s technical expertise across the UAE & GCC: specialist product selection, authority submittals, DEWA/SEWA compliance, project coordination, and lifetime performance support.',
  keywords: [
    'Technical Expertise UAE',
    'Engineering Support Dubai',
    'DEWA Authority Approval UAE',
    'SEWA Compliance Support',
    'Specialist Product Selection UAE',
    'Lightning Protection Design UAE',
    'Earthing Systems Expertise Dubai',
    'MEP Project Coordination Dubai',
    'Vision Energy Expertise',
  ],
  alternates: {
    canonical: 'https://www.visionenergyme.com/expertise',
  },
  openGraph: {
    title: 'Technical Expertise & Engineering Solutions UAE | Vision Energy',
    description:
      'Specialist product selection, authority approval compliance, and turnkey engineering support across the UAE and GCC.',
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
    title: 'Technical Expertise & Engineering Solutions UAE | Vision Energy',
    description:
      'Specialist product selection, authority compliance, and turnkey engineering support across the UAE and GCC.',
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
          className="expertise-hero relative overflow-hidden bg-[#050608] border-b border-[#1F2937]/80 min-h-[380px] sm:min-h-[420px] lg:min-h-[460px] flex flex-col justify-end text-white"
        >
          {/* Full Background Hero Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/specialist-engineering-approach.webp"
              alt="Vision Energy Technical Expertise & Engineering Support UAE"
              fill
              priority
              sizes="100vw"
              quality={80}
              className="object-cover object-center lg:object-right"
            />
            {/* Clean directional scrim: high contrast behind text on left, 100% clean and transparent over the engineer on right */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#050608]/90 via-[#050608]/50 to-transparent z-[1]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-transparent to-transparent z-[1]" />
          </div>

          <div className="max-w-[80rem] w-full mx-auto px-4 sm:px-6 lg:px-8 pt-[calc(var(--header-offset,80px)+36px)] lg:pt-[calc(var(--header-offset,80px)+52px)] pb-10 sm:pb-14 relative z-10">
            <div className="space-y-4 max-w-4xl">
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
                <span>Engineering & Technical Capabilities</span>
              </div>

              <h1
                data-preserve-contrast="true"
                className="text-3xl sm:text-4xl lg:text-[48px] font-bold !text-white tracking-tight leading-[1.15]"
                style={{
                  color: '#FFFFFF',
                  textShadow: '0 3px 18px rgba(0, 0, 0, 0.95), 0 1px 4px rgba(0, 0, 0, 0.95)',
                }}
              >
                Technical Expertise & Engineering Support
              </h1>

              <p
                data-preserve-contrast="true"
                className="text-base sm:text-lg !text-white/95 max-w-3xl leading-relaxed"
                style={{
                  color: 'rgba(255, 255, 255, 0.95)',
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.95), 0 1px 3px rgba(0, 0, 0, 0.9)',
                }}
              >
                Vision Energy combines deep domain technical knowledge, rigorous standards adherence, and local authority insight to deliver dependable engineering product solutions across the UAE and GCC.
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

        {/* SECTION C: INTERACTIVE EXPERTISE TABS */}
        <ExpertiseClient />

        {/* SECTION D: WHY VISION ENERGY & INDUSTRIES WE SERVE (Shared) */}
        <WhyVisionEnergy />

        {/* SECTION E: FINAL CTA (Shared) */}
        <FinalCTA variant="minimal" />
      </div>
    </>
  );
}

