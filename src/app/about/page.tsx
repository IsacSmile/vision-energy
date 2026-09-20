import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import { db } from '@/lib/db';
import { dictionary } from '@/lib/dictionary';
import { INDUSTRIES } from '@/config/industries';
import { PILLARS_CONFIG } from '@/config/pillars';
import { ChevronRight, FileDown, ArrowRight, Zap, Wrench, Sun } from 'lucide-react';
import LightningButton from '@/components/ui/LightningButton';
import Reveal from '@/components/ui/Reveal';
import SectionHeader from '@/components/ui/SectionHeader';
import FinalCTA from '@/components/home/FinalCTA';
import FactsStrip from '@/components/about/FactsStrip';
import ValuesGrid from '@/components/about/ValuesGrid';
import { FALLBACK_CATEGORIES } from '@/lib/fallback-categories';

export const metadata: Metadata = {
  title: 'About Us | Vision Energy International | Electrical, Mechanical & Solar Solutions UAE',
  description:
    'Vision Energy International is a UAE-based supplier of electrical, mechanical and solar products, founded in 2018, supporting construction, MEP, oil and gas, utility and renewable-energy projects.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Us | Vision Energy International | Electrical, Mechanical & Solar Solutions UAE',
    description:
      'Vision Energy International is a UAE-based supplier of electrical, mechanical and solar products, founded in 2018, supporting construction, MEP, oil and gas, utility and renewable-energy projects.',
    url: 'https://www.visionenergyme.com/about',
    siteName: 'Vision Energy International',
    locale: 'en_AE',
    type: 'website',
  },
};

export const revalidate = 60;

export default async function AboutPage() {
  // Database live product categories count
  let totalCategoriesCount = FALLBACK_CATEGORIES.length;
  let electricalCount = 26;
  let mechanicalCount = 12;
  let renewableCount = 3;

  const electricalPillar = PILLARS_CONFIG.find((p) => p.id === 'electrical');
  const mechanicalPillar = PILLARS_CONFIG.find((p) => p.id === 'mechanical');
  const renewablePillar = PILLARS_CONFIG.find((p) => p.id === 'renewable');

  try {
    const count = await db.productCategory.count();
    if (count > 0) totalCategoriesCount = count;

    if (electricalPillar?.categoryCodes?.length) {
      electricalCount = await db.productCategory.count({
        where: { code: { in: electricalPillar.categoryCodes } },
      });
    }

    if (mechanicalPillar?.categoryCodes?.length) {
      mechanicalCount = await db.productCategory.count({
        where: { code: { in: mechanicalPillar.categoryCodes } },
      });
    }

    if (renewablePillar?.categoryCodes?.length) {
      renewableCount = await db.productCategory.count({
        where: { code: { in: renewablePillar.categoryCodes } },
      });
    }
  } catch (e) {
    console.error('Database query fallback triggered for AboutPage:', e);
  }

  // Check on server at build/request time if company profile PDF exists
  const pdfFilePath = path.join(process.cwd(), 'public', 'company-profile.pdf');
  const pdfExists = fs.existsSync(pdfFilePath);

  // Structured Data (JSON-LD)
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.visionenergyme.com/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'About Us',
        item: 'https://www.visionenergyme.com/about',
      },
    ],
  };

  const aboutPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Vision Energy International',
    description:
      'Vision Energy International is a UAE-based supplier of electrical, mechanical and solar products, founded and registered in 2018.',
    url: 'https://www.visionenergyme.com/about',
    mainEntity: {
      '@type': 'Organization',
      name: dictionary.company.name,
      foundingDate: dictionary.company.founded,
      areaServed: 'AE',
      telephone: dictionary.company.phones,
      email: dictionary.company.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'RAK Business Centre BC4, RAK Business Park, P.O Box 17111',
        addressLocality: 'Al Nakheel',
        addressRegion: 'Ras Al Khaimah',
        addressCountry: 'AE',
      },
    },
  };

  return (
    <div className="min-h-screen bg-[#050608] text-white">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageJsonLd) }}
      />

      {/* ==================================================================== */}
      {/* SECTION A: PAGE HEADER (bg #050608) */}
      {/* ==================================================================== */}
      <header className="relative bg-[#050608] overflow-hidden">
        {/* Static Engineering Grid SVG background masked with radial fade */}
        <div
          className="pointer-events-none absolute inset-0 opacity-100"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 30%, rgba(5,6,8,0) 0%, #050608 85%),
              linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)`,
            backgroundSize: '100% 100%, 56px 56px, 56px 56px',
          }}
          aria-hidden="true"
        />

        {/* Soft Blue Radial Glow at Top Right drifting 24s */}
        <div
          className="pointer-events-none absolute top-0 right-0 w-[600px] h-[600px] opacity-80 animate-[glowDrift_24s_ease-in-out_infinite_alternate]"
          style={{
            background:
              'radial-gradient(600px circle at 100% 0%, rgba(11, 101, 179, 0.16), transparent 70%)',
          }}
          aria-hidden="true"
        />

        <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 pt-[calc(var(--header-offset,80px)+40px)] lg:pt-[calc(var(--header-offset,80px)+72px)] pb-16 lg:pb-24 relative z-10">
          <div className="space-y-6 max-w-4xl">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="text-[13px] text-[#A9B4C0] font-medium flex items-center gap-2">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-[#A9B4C0]/60" />
              <span className="text-white" aria-current="page">
                About Us
              </span>
            </nav>

            {/* Eyebrow */}
            <span className="text-xs font-bold text-[#8DC63F] uppercase tracking-[0.14em] block">
              About us
            </span>

            {/* H1 Title (The single H1 on page) */}
            <h1 className="text-[clamp(2.25rem,6vw,4.5rem)] font-semibold text-white leading-[1.08] tracking-[-0.02em] [text-wrap:balance] max-w-[12em]">
              About Vision Energy International
            </h1>

            {/* Lead Paragraph */}
            <p className="text-base sm:text-lg lg:text-[1.25rem] text-[#A9B4C0] leading-[1.65] max-w-[56ch] [text-wrap:pretty]">
              Vision Energy International is a UAE-based supplier of electrical, mechanical and solar products, founded and registered in 2018. We pair a carefully selected product range with technical support for construction, MEP, oil and gas, utility and renewable-energy projects.
            </p>

            {/* Lime Tagline */}
            <p className="text-[#8DC63F] text-lg font-medium tracking-tight pt-1">
              Redefined, Innovative And Quality Assured Engineering Product Solutions
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4 max-w-[360px] sm:max-w-none">
              <LightningButton variant="primary" size="lg" href="/products">
                Explore Products
              </LightningButton>
              <LightningButton variant="secondary" size="lg" href="/contact">
                Contact Us
              </LightningButton>
            </div>

            {/* Optional PDF Download Link */}
            {pdfExists && (
              <div className="pt-2">
                {/* TODO: Client must approve company-profile.pdf before it is published. */}
                <a
                  href="/company-profile.pdf"
                  download
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#8DC63F] hover:underline"
                >
                  <FileDown className="w-4 h-4" />
                  <span>Download company profile (PDF)</span>
                </a>
              </div>
            )}
          </div>

          {/* Section A Facts Strip */}
          <FactsStrip
            establishedYear="2018"
            locationsCount={3}
            categoriesCount={totalCategoriesCount}
            sectorsCount={INDUSTRIES.length}
          />
        </div>
      </header>

      {/* ==================================================================== */}
      {/* SECTION B: WHO WE ARE (bg #0D1117) */}
      {/* ==================================================================== */}
      <section
        aria-labelledby="who-we-are-heading"
        className="relative bg-[#0D1117] py-20 lg:py-32 border-t border-[#1F2937]"
      >
        {/* Blue-to-Lime Hairline Top */}
        <div
          className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#0B65B3] to-[#8DC63F]"
          aria-hidden="true"
        />

        <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
            {/* LEFT COLUMN (lg:col-span-5, sticky) */}
            <div className="lg:col-span-5 lg:sticky lg:top-[calc(var(--header-offset,0px)+96px)] self-start space-y-3">
              <span className="text-xs font-bold text-[#8DC63F] uppercase tracking-[0.14em] block">
                Who we are
              </span>
              <h2
                id="who-we-are-heading"
                className="text-[clamp(1.75rem,3.6vw,3rem)] font-semibold text-white leading-[1.15] tracking-[-0.01em] [text-wrap:balance]"
              >
                Engineering Product Solutions for the UAE
              </h2>
            </div>

            {/* RIGHT COLUMN (lg:col-span-7, paragraphs) */}
            <div className="lg:col-span-7 space-y-6 max-w-[60ch]">
              <Reveal>
                <p className="text-base lg:text-[19px] text-white/85 leading-[1.75]">
                  VISION ENERGY INTERNATIONAL was founded and officially registered in 2018 in the United Arab Emirates. We supply electrical, mechanical and solar products, and we back them with technical assistance so that customers can select the right solution for their project.
                </p>
              </Reveal>

              <Reveal delay={70}>
                <p className="text-base lg:text-[19px] text-[#A9B4C0] leading-[1.75]">
                  Our work is focused on construction, MEP, oil and gas, utility providers and the renewable industry. We are the authorised agent and distributor for a number of specialised products in the UAE.
                </p>
              </Reveal>

              <Reveal delay={140}>
                <p className="text-base lg:text-[19px] text-[#A9B4C0] leading-[1.75]">
                  We follow emerging trends and customer demands, and we offer on-site technical assistance to streamline product selection and finalisation.
                </p>
              </Reveal>

              {/* TODO: Client to provide list of brands and manufacturers represented. */}
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* SECTION C: OBJECTIVE, MISSION, VISION (bg #050608) */}
      {/* ==================================================================== */}
      <section
        aria-labelledby="direction-heading"
        className="relative bg-[#050608] py-20 lg:py-32 border-t border-[#1F2937]"
      >
        {/* Blue-to-Lime Hairline Top */}
        <div
          className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#0B65B3] to-[#8DC63F]"
          aria-hidden="true"
        />

        <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 space-y-12 lg:space-y-16">
          {/* Section Header */}
          <SectionHeader
            eyebrow="Our direction"
            title="What Drives Us"
            id="direction-heading"
          />

          {/* Three full-width rows (ordered list <ol>) */}
          <ol className="divide-y divide-[#1F2937] border-y border-[#1F2937]">
            {/* Row 1: Objective */}
            <Reveal as="li">
              <div className="group py-10 lg:py-16 grid grid-cols-1 md:grid-cols-[200px_1fr] lg:grid-cols-[280px_1fr] gap-4 md:gap-8 items-start cursor-default">
                <span
                  className="text-[clamp(2.5rem,6vw,5rem)] font-light leading-none [webkit-text-stroke:1px_rgba(255,255,255,0.25)] text-transparent group-hover:[webkit-text-stroke:1px_#8DC63F] transition-colors duration-300 tabular-nums select-none"
                  aria-hidden="true"
                >
                  01
                </span>
                <div className="space-y-2 group-hover:translate-x-2 transition-transform duration-300">
                  <span className="text-[13px] font-bold text-[#8DC63F] uppercase tracking-[0.14em] block">
                    OBJECTIVE
                  </span>
                  <p className="text-[clamp(1.25rem,2.4vw,2rem)] font-medium text-white leading-[1.4] max-w-[32ch] [text-wrap:balance]">
                    Our primary focus is on customer satisfaction, delivered through innovative product solutions and expert technical support.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Row 2: Mission */}
            <Reveal as="li" delay={70}>
              <div className="group py-10 lg:py-16 grid grid-cols-1 md:grid-cols-[200px_1fr] lg:grid-cols-[280px_1fr] gap-4 md:gap-8 items-start cursor-default">
                <span
                  className="text-[clamp(2.5rem,6vw,5rem)] font-light leading-none [webkit-text-stroke:1px_rgba(255,255,255,0.25)] text-transparent group-hover:[webkit-text-stroke:1px_#8DC63F] transition-colors duration-300 tabular-nums select-none"
                  aria-hidden="true"
                >
                  02
                </span>
                <div className="space-y-2 group-hover:translate-x-2 transition-transform duration-300">
                  <span className="text-[13px] font-bold text-[#8DC63F] uppercase tracking-[0.14em] block">
                    MISSION
                  </span>
                  <p className="text-[clamp(1.25rem,2.4vw,2rem)] font-medium text-white leading-[1.4] max-w-[32ch] [text-wrap:balance]">
                    Our commitment is to provide quality mechanical, electrical and solar products with dependable service.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Row 3: Vision */}
            <Reveal as="li" delay={140}>
              <div className="group py-10 lg:py-16 grid grid-cols-1 md:grid-cols-[200px_1fr] lg:grid-cols-[280px_1fr] gap-4 md:gap-8 items-start cursor-default">
                <span
                  className="text-[clamp(2.5rem,6vw,5rem)] font-light leading-none [webkit-text-stroke:1px_rgba(255,255,255,0.25)] text-transparent group-hover:[webkit-text-stroke:1px_#8DC63F] transition-colors duration-300 tabular-nums select-none"
                  aria-hidden="true"
                >
                  03
                </span>
                <div className="space-y-2 group-hover:translate-x-2 transition-transform duration-300">
                  <span className="text-[13px] font-bold text-[#8DC63F] uppercase tracking-[0.14em] block">
                    VISION
                  </span>
                  <p className="text-[clamp(1.25rem,2.4vw,2rem)] font-medium text-white leading-[1.4] max-w-[32ch] [text-wrap:balance]">
                    Our aim is to deliver environmentally sustainable innovations to society, and to be a brand known for quality within our industry.
                  </p>
                </div>
              </div>
            </Reveal>
          </ol>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* SECTION D: WHAT WE SUPPLY (bg #0D1117) */}
      {/* ==================================================================== */}
      <section
        aria-labelledby="what-we-supply-heading"
        className="relative bg-[#0D1117] py-20 lg:py-32 border-t border-[#1F2937]"
      >
        {/* Blue-to-Lime Hairline Top */}
        <div
          className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#0B65B3] to-[#8DC63F]"
          aria-hidden="true"
        />

        <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 space-y-12 lg:space-y-16">
          {/* Section Header */}
          <SectionHeader
            eyebrow="What we supply"
            title="Electrical, Mechanical and Solar"
            id="what-we-supply-heading"
          />

          {/* Three Columns separated by hairlines (no boxes) */}
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#1F2937] border-y md:border-y-0 border-[#1F2937]">
            {/* Column 1: Electrical */}
            <div className="py-8 md:py-0 md:px-8 first:pl-0 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-[#0B65B3]/15 border border-[#0B65B3]/30 text-[#0B65B3] flex items-center justify-center">
                  <Zap className="w-7 h-7 text-[#0B65B3]" />
                </div>
                <h3 className="text-[clamp(1.375rem,2vw,1.75rem)] font-semibold text-white leading-snug">
                  Electrical
                </h3>
                <p className="text-base text-[#A9B4C0] leading-relaxed">
                  Cables, conduits, lighting, switchgear, control panels, enclosures and protection equipment.
                </p>
              </div>
              <div className="space-y-2 pt-2">
                <p className="text-[13px] text-[#A9B4C0] font-medium tabular-nums">
                  {electricalCount} product categories
                </p>
                <Link
                  href={electricalPillar?.href || '/products'}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#8DC63F] hover:underline"
                >
                  <span>Browse Electrical</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Column 2: Mechanical */}
            <div className="py-8 md:py-0 md:px-8 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-[#0B65B3]/15 border border-[#0B65B3]/30 text-[#0B65B3] flex items-center justify-center">
                  <Wrench className="w-7 h-7 text-[#0B65B3]" />
                </div>
                <h3 className="text-[clamp(1.375rem,2vw,1.75rem)] font-semibold text-white leading-snug">
                  Mechanical
                </h3>
                <p className="text-base text-[#A9B4C0] leading-relaxed">
                  HVAC, ventilation, pumps, valves, compressors, hardware and tools.
                </p>
              </div>
              <div className="space-y-2 pt-2">
                <p className="text-[13px] text-[#A9B4C0] font-medium tabular-nums">
                  {mechanicalCount} product categories
                </p>
                <Link
                  href={mechanicalPillar?.href || '/products'}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#8DC63F] hover:underline"
                >
                  <span>Browse Mechanical</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Column 3: Solar */}
            <div className="py-8 md:py-0 md:px-8 last:pr-0 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-[#0B65B3]/15 border border-[#0B65B3]/30 text-[#0B65B3] flex items-center justify-center">
                  <Sun className="w-7 h-7 text-[#0B65B3]" />
                </div>
                <h3 className="text-[clamp(1.375rem,2vw,1.75rem)] font-semibold text-white leading-snug">
                  Solar
                </h3>
                <p className="text-base text-[#A9B4C0] leading-relaxed">
                  Solar PV components, solar lighting and solar water heating.
                </p>
              </div>
              <div className="space-y-2 pt-2">
                <p className="text-[13px] text-[#A9B4C0] font-medium tabular-nums">
                  {renewableCount} product categories
                </p>
                <Link
                  href={renewablePillar?.href || '/products'}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#8DC63F] hover:underline"
                >
                  <span>Browse Solar</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Full-width Specialism Footer Row */}
          <div className="pt-8 border-t border-[#1F2937] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-base sm:text-lg font-semibold text-white">
              Lightning protection and earthing are our specialism.
            </p>
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#8DC63F] hover:underline shrink-0"
            >
              <span>See our services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* SECTION E: VALUES (bg #050608) */}
      {/* ==================================================================== */}
      <section
        aria-labelledby="values-heading"
        className="relative bg-[#050608] py-20 lg:py-32 border-t border-[#1F2937]"
      >
        {/* Blue-to-Lime Hairline Top */}
        <div
          className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#0B65B3] to-[#8DC63F]"
          aria-hidden="true"
        />

        <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 space-y-12 lg:space-y-16">
          {/* Section Header */}
          <SectionHeader
            eyebrow="Our values"
            title="What We Stand For"
            id="values-heading"
          />

          {/* Values Grid Component */}
          <ValuesGrid />
        </div>
      </section>

      {/* ==================================================================== */}
      {/* SECTION F: RESPONSIBILITY STATEMENT (bg #0D1117) */}
      {/* ==================================================================== */}
      <section
        aria-labelledby="sustainability-heading"
        className="relative bg-[#0D1117] py-24 lg:py-40 border-t border-[#1F2937]"
      >
        {/* Blue-to-Lime Hairline Top */}
        <div
          className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#0B65B3] to-[#8DC63F]"
          aria-hidden="true"
        />

        <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6 max-w-[22em]">
            <span
              id="sustainability-heading"
              className="text-xs font-bold text-[#8DC63F] uppercase tracking-[0.14em] block"
            >
              Sustainability
            </span>

            {/* 2px lime vertical rule on left with statement */}
            <div className="border-l-2 border-[#8DC63F] pl-6 lg:pl-8">
              <p className="text-[clamp(1.5rem,3.6vw,3rem)] font-medium text-white leading-[1.3] tracking-[-0.01em] [text-wrap:balance]">
                We prioritise{' '}
                <span className="text-[#8DC63F]">environmental sustainability</span>,
                and we oppose the use of any products that could disrupt the balance of our ecosystems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* SECTION G: CONTACT (bg #050608) */}
      {/* ==================================================================== */}
      <FinalCTA bgClass="bg-[#050608]" />
    </div>
  );
}
