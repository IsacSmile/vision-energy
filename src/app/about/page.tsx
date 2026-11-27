import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ArrowRight,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Globe2,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from 'lucide-react';
import FinalCTA from '@/components/home/FinalCTA';
import {
  COMPANY_FACTS,
  ORGANIZATION_ID,
  SITE_URL,
  WEBSITE_ID,
} from '@/lib/seo/company';

export const metadata: Metadata = {
  title: 'About Vision Energy International | UAE & Qatar Est. 2018',
  description:
    'Established 2018 with 160+ projects completed. RAK head office, Dubai & Abu Dhabi branches serving UAE & Qatar in LPS, earthing, gym & lab gear.',
  keywords: [
    'About Vision Energy International',
    'Vision Energy Ras Al Khaimah',
    'Lightning Protection Contractor UAE',
    'Earthing Engineering UAE Qatar',
    'Engineering Product Supplier Dubai Abu Dhabi',
  ],
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    title: 'About Vision Energy International | UAE & Qatar Est. 2018',
    description:
      'Established 2018 with 160+ projects completed across Dubai, Abu Dhabi, Ras Al Khaimah, the UAE & Qatar.',
    url: `${SITE_URL}/about`,
    siteName: 'Vision Energy International',
    locale: 'en_AE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Vision Energy International | UAE & Qatar Est. 2018',
    description:
      'Established 2018 with 160+ completed projects. RAK head office, Dubai & Abu Dhabi branches.',
  },
};

export const dynamic = 'force-static';
export const revalidate = 3600;

const LAST_UPDATED_LABEL = 'November 27, 2026';
const LAST_UPDATED_ISO = '2026-11-27';

const aboutJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AboutPage',
      '@id': `${SITE_URL}/about#webpage`,
      url: `${SITE_URL}/about`,
      name: 'About Vision Energy International | UAE & Qatar Est. 2018',
      headline: 'About Vision Energy International',
      description:
        'Company profile, Ras Al Khaimah head office details, Dubai and Abu Dhabi branch operations, applicable standards, and engineering disciplines across the UAE and Qatar.',
      inLanguage: 'en-AE',
      datePublished: '2026-11-26',
      dateModified: LAST_UPDATED_ISO,
      isPartOf: { '@id': WEBSITE_ID },
      about: { '@id': ORGANIZATION_ID },
      publisher: { '@id': ORGANIZATION_ID },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}/about#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'About', item: `${SITE_URL}/about` },
      ],
    },
  ],
};

export default function AboutPage() {
  return (
    <div className="bg-[#050608] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />

      {/* 1. HERO / EXECUTIVE SUMMARY */}
      <section className="relative border-b border-white/10 pt-[calc(var(--header-offset,80px)+32px)] lg:pt-[calc(var(--header-offset,80px)+52px)] pb-14 sm:pb-16">
        <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <nav aria-label="Breadcrumb" className="text-[13px] text-white/80 font-medium flex items-center gap-2">
            <Link href="/" className="hover:text-[#8DC63F] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/50" aria-hidden="true" />
            <span className="text-[#8DC63F] font-semibold" aria-current="page">
              About
            </span>
          </nav>

          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#8DC63F]">
              <span className="w-5 h-[2px] bg-[#8DC63F] rounded-full" aria-hidden="true" />
              <span>Company Profile &amp; Credentials</span>
            </span>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-white/75 bg-white/[0.06] border border-white/10 px-2.5 py-0.5 rounded-full">
              <Calendar className="w-3 h-3 text-[#8DC63F]" aria-hidden="true" />
              <span>Last updated: {LAST_UPDATED_LABEL}</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.12] max-w-4xl">
            About Vision Energy International
          </h1>

          <p className="text-base sm:text-lg text-[#A9B4C0] max-w-3xl leading-relaxed">
            Established in <strong className="text-white">2018</strong> with more than{' '}
            <strong className="text-white">160 projects completed</strong>, Vision Energy International is a UAE engineering specialist and project equipment supplier headquartered in Ras Al Khaimah with branches in Dubai and Abu Dhabi—supporting infrastructure, industrial, commercial, and institutional clients across the{' '}
            <strong className="text-white">UAE</strong> and <strong className="text-white">Qatar</strong>.
          </p>

          {/* 40-60 Word Verified Quick Facts Box */}
          <div className="rounded-2xl border border-[#8DC63F]/25 bg-[#0D1117] p-6 max-w-4xl space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-[#8DC63F]">
              Verified Entity Summary
            </h2>
            <p className="text-sm sm:text-[15px] text-slate-200 leading-relaxed">
              Vision Energy International operates from RAK Business Centre BC4, RAK FTZ Business Park, Al Nakheel, Ras Al Khaimah, with branches in Dubai and Abu Dhabi. Core practice spans IEC 62305 / NF C 17-102 lightning protection, BS 7430 earthing, and Type 1/2/3 SPDs, alongside commercial gym equipment, laboratory equipment, electrical, mechanical, and renewable solutions across UAE and Qatar.
            </p>
          </div>
        </div>
      </section>

      {/* 2. VERIFIED COMPANY FACTS + LOCATIONS */}
      <section className="py-12 sm:py-16 border-b border-white/10 bg-[#080C12]">
        <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Head Office, Branches &amp; Markets Served
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-[#0D1117] border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-[#8DC63F] text-xs font-bold uppercase tracking-wider">
                  <MapPin className="w-4 h-4" aria-hidden="true" />
                  <span>Head Office (UAE)</span>
                </div>
                <p className="text-sm font-semibold text-white">Ras Al Khaimah HQ</p>
                <p className="text-xs sm:text-[13px] text-[#A9B4C0] leading-relaxed">
                  {COMPANY_FACTS.headOffice.fullAddress}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#0D1117] border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-[#0B65B3] text-xs font-bold uppercase tracking-wider">
                  <Building2 className="w-4 h-4 text-[#8DC63F]" aria-hidden="true" />
                  <span>Regional Branches</span>
                </div>
                <p className="text-sm font-semibold text-white">Dubai &amp; Abu Dhabi</p>
                <p className="text-xs sm:text-[13px] text-[#A9B4C0] leading-relaxed">
                  Active technical engineering coordination and client project support across Dubai, Abu Dhabi, and Ras Al Khaimah.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#0D1117] border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-[#8DC63F] text-xs font-bold uppercase tracking-wider">
                  <Globe2 className="w-4 h-4" aria-hidden="true" />
                  <span>Geographic Markets</span>
                </div>
                <p className="text-sm font-semibold text-white">UAE &amp; Qatar</p>
                <p className="text-xs sm:text-[13px] text-[#A9B4C0] leading-relaxed">
                  Primary focus: Dubai, Abu Dhabi, Ras Al Khaimah &amp; wider UAE. Secondary project market: Qatar (project supply &amp; engineering support; no local Qatar office).
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#0D1117] border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-[#8DC63F] text-xs font-bold uppercase tracking-wider">
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  <span>Direct Desk</span>
                </div>
                <div className="text-xs sm:text-[13px] text-[#A9B4C0] space-y-1">
                  <p>
                    Landline:{' '}
                    <a href={COMPANY_FACTS.phones.landlineHref} className="text-white font-semibold hover:text-[#8DC63F]">
                      {COMPANY_FACTS.phones.landline}
                    </a>
                  </p>
                  <p>
                    WhatsApp / Mobile:{' '}
                    <a href={COMPANY_FACTS.phones.mobileHref} className="text-white font-semibold hover:text-[#8DC63F]">
                      {COMPANY_FACTS.phones.mobile}
                    </a>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#8DC63F]" aria-hidden="true" />
                    <a href={COMPANY_FACTS.emailHref} className="text-white hover:text-[#8DC63F]">
                      {COMPANY_FACTS.email}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Standards &amp; Authority Alignment
            </h2>
            <div className="p-6 rounded-2xl bg-[#0D1117] border border-white/10 space-y-4">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-[#8DC63F] mb-2">
                  International Technical Standards Referenced
                </h3>
                <div className="flex flex-wrap gap-2">
                  {COMPANY_FACTS.standards.map((std) => (
                    <span
                      key={std}
                      className="px-2.5 py-1 rounded-lg bg-[#050608] border border-white/10 text-xs font-mono text-white"
                    >
                      {std}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-white/10">
                <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-[#8DC63F] mb-2">
                  UAE Authorities Referenced
                </h3>
                <div className="flex flex-wrap gap-2">
                  {COMPANY_FACTS.uaeAuthorities.map((auth) => (
                    <span
                      key={auth}
                      className="px-2.5 py-1 rounded-lg bg-[#0B65B3]/15 border border-[#0B65B3]/35 text-xs font-semibold text-white"
                    >
                      {auth}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-xs text-[#A9B4C0] leading-relaxed pt-2 border-t border-white/10">
                Safety-critical electrical and lightning protection submittals are prepared strictly for consultant engineering review and applicable authority requirements in the target project jurisdiction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DISCIPLINE PILLARS & INTERNAL NAVIGATION */}
      <section className="py-12 sm:py-16 border-b border-white/10 bg-[#050608]">
        <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#8DC63F]">
              Engineering &amp; Supply Pillars
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              What Vision Energy Delivers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <article className="p-6 rounded-2xl bg-[#0D1117] border border-white/10 flex flex-col justify-between gap-4">
              <div className="space-y-3">
                <ShieldCheck className="w-6 h-6 text-[#8DC63F]" aria-hidden="true" />
                <h3 className="text-xl font-bold">Lightning, Earthing &amp; Surge Protection</h3>
                <ul className="space-y-2 text-sm text-[#A9B4C0]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#8DC63F] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Conventional Rolling Sphere, Protection Angle &amp; Faraday Mesh</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#8DC63F] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Early Streamer Emission (ESE) terminals to NF C 17-102</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#8DC63F] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>BS 7430 earthing grids, exothermic joints &amp; Type 1/2/3 SPDs</span>
                  </li>
                </ul>
              </div>
              <div className="pt-2 flex flex-wrap gap-3 text-xs font-bold">
                <Link href="/expertise/lightning" className="text-[#8DC63F] hover:underline inline-flex items-center gap-1">
                  <span>Lightning Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
                <Link href="/expertise/earthing" className="text-white/90 hover:text-[#8DC63F] hover:underline inline-flex items-center gap-1">
                  <span>Earthing Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>
            </article>

            <article className="p-6 rounded-2xl bg-[#0D1117] border border-white/10 flex flex-col justify-between gap-4">
              <div className="space-y-3">
                <Building2 className="w-6 h-6 text-[#8DC63F]" aria-hidden="true" />
                <h3 className="text-xl font-bold">Commercial Gym &amp; Laboratory Supply</h3>
                <ul className="space-y-2 text-sm text-[#A9B4C0]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#8DC63F] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Sports &amp; gym fitness accessories (SP-01, SP-02)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#8DC63F] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Analytical instruments, balances, fume cupboards &amp; glassware</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#8DC63F] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Concrete, cement &amp; soil testing equipment (AT-05, AT-06)</span>
                  </li>
                </ul>
              </div>
              <div className="pt-2 flex flex-wrap gap-3 text-xs font-bold">
                <Link href="/expertise/gym" className="text-[#8DC63F] hover:underline inline-flex items-center gap-1">
                  <span>Gym Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
                <Link href="/expertise/laboratory" className="text-white/90 hover:text-[#8DC63F] hover:underline inline-flex items-center gap-1">
                  <span>Laboratory Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>
            </article>

            <article className="p-6 rounded-2xl bg-[#0D1117] border border-white/10 flex flex-col justify-between gap-4">
              <div className="space-y-3">
                <Globe2 className="w-6 h-6 text-[#8DC63F]" aria-hidden="true" />
                <h3 className="text-xl font-bold">Full Technical Catalog &amp; Services</h3>
                <ul className="space-y-2 text-sm text-[#A9B4C0]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#8DC63F] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>115 indexed product categories (electrical, mechanical, solar &amp; safety)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#8DC63F] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Installation supervision, Wenner soil testing &amp; MEP manpower</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#8DC63F] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Technical engineering glossary &amp; knowledge base articles</span>
                  </li>
                </ul>
              </div>
              <div className="pt-2 flex flex-wrap gap-3 text-xs font-bold">
                <Link href="/products" className="text-[#8DC63F] hover:underline inline-flex items-center gap-1">
                  <span>Product Catalog</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
                <Link href="/glossary" className="text-white/90 hover:text-[#8DC63F] hover:underline inline-flex items-center gap-1">
                  <span>Glossary</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      <FinalCTA bgClass="bg-[#050608]" />
    </div>
  );
}
