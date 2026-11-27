import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  ChevronRight,
  HelpCircle,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import FinalCTA from '@/components/home/FinalCTA';
import { getPublishedProductCategories } from '@/lib/data/products';
import { COMPANY_FACTS } from '@/lib/seo/company';
import {
  ALL_WAVE1_PAGES,
  buildWave1JsonLd,
  type LocationServiceContent,
} from '@/lib/data/locations';

export default async function LocationServicePageView({
  page,
}: {
  page: LocationServiceContent;
}) {
  const allCategories = await getPublishedProductCategories();
  const matchedCategories = allCategories
    .filter((cat: { groupPrefix?: string; code?: string }) => {
      const prefix = cat.groupPrefix || (cat.code ? cat.code.split('-')[0] : '');
      return page.catalogGroupPrefixes.includes(prefix);
    })
    .slice(0, 6);

  const siblingPages = ALL_WAVE1_PAGES.filter(
    (item) => item.canonicalPath !== page.canonicalPath
  );

  const jsonLd = buildWave1JsonLd(page);

  return (
    <div data-preserve-contrast="true" className="bg-[#050608] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. HERO SECTION */}
      <section
        id="location-hero"
        data-preserve-contrast="true"
        className="relative overflow-hidden border-b border-white/10 min-h-[380px] sm:min-h-[430px] flex items-center"
      >
        <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
          <Image
            src={page.heroImage}
            alt={page.heroImageAlt}
            fill
            priority
            quality={70}
            sizes="(max-width: 640px) 640px, 100vw"
            className="object-cover object-center brightness-[0.8] contrast-[1.05]"
          />
          <div
            className="absolute inset-0 hidden sm:block"
            style={{
              background:
                'linear-gradient(90deg, rgba(5, 6, 8, 0.94) 0%, rgba(5, 6, 8, 0.8) 44%, rgba(5, 6, 8, 0.34) 100%)',
            }}
          />
          <div
            className="absolute inset-0 sm:hidden"
            style={{
              background:
                'linear-gradient(180deg, rgba(5, 6, 8, 0.92) 0%, rgba(5, 6, 8, 0.74) 55%, rgba(5, 6, 8, 0.94) 100%)',
            }}
          />
        </div>

        <div className="max-w-[80rem] w-full mx-auto px-4 sm:px-6 lg:px-8 pt-[calc(var(--header-offset,80px)+32px)] lg:pt-[calc(var(--header-offset,80px)+48px)] pb-12 relative z-10 space-y-5">
          <nav aria-label="Breadcrumb" className="text-[13px] text-white/90 font-medium flex flex-wrap items-center gap-2">
            <Link href="/" className="hover:text-[#8DC63F] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/50" aria-hidden="true" />
            <Link href="/expertise" className="hover:text-[#8DC63F] transition-colors">
              Expertise
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/50" aria-hidden="true" />
            <span className="text-[#8DC63F] font-semibold" aria-current="page">
              {page.locationName} · {page.serviceTitle}
            </span>
          </nav>

          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#8DC63F]">
              <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{page.eyebrow}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-white/80 bg-white/10 border border-white/15 px-2.5 py-0.5 rounded-full">
              <Calendar className="w-3 h-3 text-[#8DC63F]" aria-hidden="true" />
              <span>Last updated: {COMPANY_FACTS.lastUpdatedDisplay}</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-bold text-white tracking-tight leading-[1.12] max-w-4xl">
            {page.h1}
          </h1>

          <div className="pt-1 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0B65B3] hover:bg-[#095292] text-white text-sm font-bold border border-[#8DC63F]/60 hover:border-[#8DC63F] shadow-lg transition-all"
              style={{ color: '#FFFFFF' }}
            >
              <span>Request {page.locationName} Submittal</span>
              <ArrowRight className="w-4 h-4 text-[#8DC63F]" aria-hidden="true" />
            </Link>
            <a
              href={COMPANY_FACTS.phones.landlineHref}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-bold border border-white/25 backdrop-blur-md transition-all"
              style={{ color: '#FFFFFF' }}
            >
              <Phone className="w-4 h-4 text-[#8DC63F]" aria-hidden="true" />
              <span>{COMPANY_FACTS.phones.landline}</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. QUICK ANSWER SUMMARY */}
      <section className="py-8 border-b border-white/10 bg-[#080C12]">
        <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div
            id="location-quick-answer"
            className="rounded-2xl border border-[#8DC63F]/25 bg-[#0D1117] p-5 sm:p-6 flex flex-col sm:flex-row items-start gap-4"
          >
            <div className="w-10 h-10 rounded-xl bg-[#0B65B3]/20 border border-[#0B65B3]/40 flex items-center justify-center shrink-0 text-[#8DC63F]">
              <Sparkles className="w-5 h-5" aria-hidden="true" />
            </div>
            <div className="space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#8DC63F] block">
                Quick Answer · {page.locationName} Project Overview
              </span>
              <p className="text-sm sm:text-[15.5px] text-[#E2E8F0] leading-relaxed">
                {page.quickAnswer}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LOCAL ENGINEERING CONTEXT & DELIVERABLES */}
      <section className="py-12 sm:py-16 border-b border-white/10 bg-[#050608]">
        <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-7 space-y-5">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              {page.localContextHeading}
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-[#CBD5E1] leading-relaxed">
              {page.localContextParagraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            <div className="p-5 rounded-2xl bg-[#0D1117] border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[#8DC63F]">
                <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                <span>Standards &amp; Compliance Context</span>
              </div>
              <p className="text-xs sm:text-sm text-[#A9B4C0] leading-relaxed">
                {page.authoritiesOrStandardsNote}
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {page.applicableStandards.map((std) => (
                  <span
                    key={std}
                    className="px-2.5 py-1 rounded-lg bg-[#050608] border border-white/10 text-xs font-mono text-white"
                  >
                    {std}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-5">
            <div className="p-6 rounded-2xl bg-[#0D1117] border border-white/10 space-y-4">
              <h2 className="text-xl font-bold text-white">{page.technicalScopeHeading}</h2>
              <ul className="space-y-3 text-xs sm:text-sm text-[#CBD5E1]">
                {page.technicalScopeItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#8DC63F] shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4 border-t border-white/10 space-y-2.5 text-xs font-bold">
                <Link
                  href={page.parentExpertiseHref}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#050608] border border-white/10 hover:border-[#8DC63F] text-[#8DC63F] transition-colors"
                >
                  <span>{page.parentExpertiseLabel}</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
                <Link
                  href={page.parentServiceHref}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#050608] border border-white/10 hover:border-[#8DC63F] text-white transition-colors"
                >
                  <span>{page.parentServiceLabel}</span>
                  <ArrowRight className="w-4 h-4 text-[#8DC63F]" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#0D1117] border border-white/10 space-y-2 text-xs text-[#A9B4C0]">
              <p className="font-bold text-white uppercase tracking-wider">Verified Company Coordinates</p>
              <p>
                Head Office: {COMPANY_FACTS.headOffice.fullAddress}
              </p>
              <p>
                Branches: Dubai &amp; Abu Dhabi · Est. {COMPANY_FACTS.established} · {COMPANY_FACTS.projectsCompletedSummary}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CATALOG PRODUCT CATEGORIES */}
      {matchedCategories.length > 0 && (
        <section className="py-12 sm:py-16 border-b border-white/10 bg-[#080C12]">
          <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#8DC63F]">
                  Ex-Stock &amp; Project Hardware
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  Related Product Categories for {page.locationName}
                </h2>
              </div>
              <Link
                href="/products"
                className="text-sm font-bold text-[#8DC63F] hover:underline inline-flex items-center gap-1.5"
              >
                <span>Explore Full Catalog</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {matchedCategories.map((cat: { slug: string; code: string; title: string; description: string }) => (
                <Link
                  key={cat.slug}
                  href={`/products/${cat.slug}`}
                  className="p-5 rounded-2xl bg-[#0D1117] border border-white/10 hover:border-[#8DC63F]/60 flex flex-col justify-between gap-3 transition-colors group"
                >
                  <div className="space-y-2">
                    <span className="font-mono text-xs font-bold text-[#8DC63F]">{cat.code}</span>
                    <h3 className="text-base font-bold text-white group-hover:text-[#8DC63F] transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-[#A9B4C0] line-clamp-2 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-[#8DC63F] inline-flex items-center gap-1">
                    <span>Datasheet &amp; Inquiry</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. LOCATION FAQ */}
      <section
        id="location-faq"
        className="py-12 sm:py-16 border-b border-white/10 bg-[#050608]"
      >
        <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#8DC63F]">
              <HelpCircle className="w-4 h-4" aria-hidden="true" />
              <span>Frequently Asked Questions</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              {page.locationName} {page.serviceTitle} FAQ
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {page.faqs.map((faq) => (
              <article
                key={faq.id}
                id={faq.id}
                className="p-6 rounded-2xl bg-[#0D1117] border border-white/10 space-y-3"
              >
                <h3 className="text-base font-bold text-white leading-snug">{faq.question}</h3>
                <p data-aeo-answer="true" className="text-sm text-[#CBD5E1] leading-relaxed">
                  {faq.answer}
                </p>
              </article>
            ))}
          </div>

          {/* Regional Sibling Pages Navigation */}
          <nav
            aria-label="Other UAE and Qatar engineering service locations"
            className="pt-8 border-t border-white/10 flex flex-wrap items-center gap-2.5 text-xs"
          >
            <span className="font-bold uppercase tracking-wider text-[#A9B4C0] mr-2">
              UAE &amp; Qatar Regions:
            </span>
            {siblingPages.map((sib) => (
              <Link
                key={sib.canonicalPath}
                href={sib.canonicalPath}
                className="px-3 py-1.5 rounded-full bg-[#0D1117] border border-white/10 hover:border-[#8DC63F] text-slate-300 hover:text-[#8DC63F] transition-colors"
              >
                {sib.locationName} · {sib.serviceSlug === 'lightning-protection' ? 'Lightning' : 'Earthing'}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <FinalCTA bgClass="bg-[#050608]" />
    </div>
  );
}

