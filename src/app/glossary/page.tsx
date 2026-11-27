import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, BookOpen, Calendar, ChevronRight } from 'lucide-react';
import FinalCTA from '@/components/home/FinalCTA';
import {
  GLOSSARY_LAST_UPDATED_ISO,
  GLOSSARY_LAST_UPDATED_LABEL,
  GLOSSARY_TERMS,
} from '@/lib/data/glossary';
import { ORGANIZATION_ID, SITE_URL, WEBSITE_ID } from '@/lib/seo/company';

export const metadata: Metadata = {
  title: 'Lightning & Earthing Engineering Glossary | Vision Energy',
  description:
    'Verified definitions for IEC 62305 LPS, ESE NF C 17-102, rolling sphere, BS 7430 earthing, soil resistivity & Type 1/2/3 SPDs for UAE & Qatar.',
  keywords: [
    'Lightning Protection Glossary IEC 62305',
    'Earthing and Grounding Terms BS 7430',
    'ESE NF C 17-102 Definition',
    'Rolling Sphere Method Explained',
    'Type 1 Type 2 Type 3 SPD Glossary',
  ],
  alternates: {
    canonical: `${SITE_URL}/glossary`,
  },
  openGraph: {
    title: 'Lightning & Earthing Engineering Glossary | Vision Energy',
    description:
      'Verified technical glossary covering IEC 62305 lightning protection, NF C 17-102 ESE, BS 7430 earthing, exothermic welding, and SPDs.',
    url: `${SITE_URL}/glossary`,
    siteName: 'Vision Energy International',
    locale: 'en_AE',
    type: 'website',
  },
};

export const dynamic = 'force-static';
export const revalidate = 3600;

const glossaryJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/glossary#webpage`,
      url: `${SITE_URL}/glossary`,
      name: 'Lightning & Earthing Engineering Glossary | Vision Energy',
      headline: 'Lightning Protection, Earthing & Surge Protection Technical Glossary',
      description:
        'Concise engineering definitions aligned with IEC 62305, BS EN 62305, NF C 17-102, IEC 62561, BS 7430, and BS 7671 for UAE & Qatar projects.',
      inLanguage: 'en-AE',
      datePublished: '2026-11-26',
      dateModified: GLOSSARY_LAST_UPDATED_ISO,
      isPartOf: { '@id': WEBSITE_ID },
      publisher: { '@id': ORGANIZATION_ID },
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['#glossary-hero h1', '#glossary-list [data-glossary-def]'],
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}/glossary#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Glossary', item: `${SITE_URL}/glossary` },
      ],
    },
    {
      '@type': 'DefinedTermSet',
      '@id': `${SITE_URL}/glossary#termset`,
      name: 'Vision Energy Electrical, Lightning Protection & Earthing Glossary',
      url: `${SITE_URL}/glossary`,
      hasDefinedTerm: GLOSSARY_TERMS.map((item) => ({
        '@type': 'DefinedTerm',
        name: item.term,
        description: item.definition,
        termCode: item.standardRef,
        url: `${SITE_URL}/glossary#${item.id}`,
      })),
    },
  ],
};

export default function GlossaryPage() {
  return (
    <div className="bg-[#050608] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(glossaryJsonLd) }}
      />

      {/* HERO */}
      <section
        id="glossary-hero"
        className="border-b border-white/10 pt-[calc(var(--header-offset,80px)+32px)] lg:pt-[calc(var(--header-offset,80px)+48px)] pb-12"
      >
        <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          <nav aria-label="Breadcrumb" className="text-[13px] text-white/80 font-medium flex items-center gap-2">
            <Link href="/" className="hover:text-[#8DC63F] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/50" aria-hidden="true" />
            <span className="text-[#8DC63F] font-semibold" aria-current="page">
              Glossary
            </span>
          </nav>

          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#8DC63F]">
              <BookOpen className="w-4 h-4" aria-hidden="true" />
              <span>Technical Terminology Reference</span>
            </span>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-white/75 bg-white/[0.06] border border-white/10 px-2.5 py-0.5 rounded-full">
              <Calendar className="w-3 h-3 text-[#8DC63F]" aria-hidden="true" />
              <span>Last updated: {GLOSSARY_LAST_UPDATED_LABEL}</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.12] max-w-4xl">
            Lightning Protection, Earthing &amp; Surge Glossary
          </h1>

          <p className="text-base sm:text-lg text-[#A9B4C0] max-w-3xl leading-relaxed">
            Standardized definitions used across MEP submittals, consultant design reviews, and site inspections in{' '}
            <strong className="text-white">Dubai, Abu Dhabi, Ras Al Khaimah, the UAE, and Qatar</strong>.
          </p>

          {/* Jump Links */}
          <div className="pt-2 flex flex-wrap gap-2">
            {GLOSSARY_TERMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-xs font-medium px-3 py-1 rounded-full bg-[#0D1117] border border-white/10 text-slate-300 hover:text-[#8DC63F] hover:border-[#8DC63F]/50 transition-colors"
              >
                {item.term.split('(')[0].trim()}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* TERMS GRID */}
      <section id="glossary-list" className="py-12 sm:py-16 bg-[#080C12] border-b border-white/10">
        <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-5">
          {GLOSSARY_TERMS.map((item) => (
            <article
              key={item.id}
              id={item.id}
              className="scroll-mt-28 p-6 rounded-2xl bg-[#0D1117] border border-white/10 flex flex-col justify-between gap-4"
            >
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#0B65B3]/20 border border-[#0B65B3]/40 text-[#60A5FA]">
                    {item.discipline}
                  </span>
                  <span className="text-[11px] font-mono text-[#8DC63F] font-semibold">
                    {item.standardRef}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-white leading-snug">{item.term}</h2>

                <p data-glossary-def="true" className="text-sm text-[#CBD5E1] leading-relaxed">
                  {item.definition}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-bold">
                <Link
                  href={item.relatedHref}
                  className="text-[#8DC63F] hover:underline inline-flex items-center gap-1"
                >
                  <span>{item.relatedLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
                <Link href="/contact" className="text-slate-300 hover:text-white transition-colors">
                  Request Specs
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <FinalCTA bgClass="bg-[#050608]" />
    </div>
  );
}

