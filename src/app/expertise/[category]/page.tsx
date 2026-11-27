import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Calendar, ChevronRight, Layers, ShieldCheck, Sparkles, HelpCircle } from 'lucide-react';
import type { Metadata } from 'next';
import {
  EXPERTISE_TABS,
  EXPERTISE_TAB_IDS,
  buildExpertiseSubpageJsonLd,
  getExpertiseSubpage,
  getExpertiseTab,
  type ExpertiseTabId,
} from '@/lib/data/expertise';
import { getPublishedProductCategories } from '@/lib/data/products';
import Tabs from '@/components/expertise/Tabs';
import ExpertisePanel from '@/components/expertise/ExpertisePanel';
import FinalCTA from '@/components/home/FinalCTA';
import '@/app/expertise/expertise.css';

interface ExpertiseSubpageProps {
  params: Promise<{ category: string }> | { category: string };
}

async function resolveCategoryParam(params: ExpertiseSubpageProps['params']): Promise<string> {
  if (!params) return '';
  if (typeof (params as Promise<{ category: string }>).then === 'function') {
    const resolved = await params;
    return resolved?.category || '';
  }
  return (params as { category: string })?.category || '';
}

export async function generateStaticParams() {
  return EXPERTISE_TAB_IDS.map((category) => ({ category }));
}

export const dynamicParams = false;
export const dynamic = 'force-static';
export const revalidate = 3600;

export async function generateMetadata({ params }: ExpertiseSubpageProps): Promise<Metadata> {
  const category = await resolveCategoryParam(params);
  const config = getExpertiseSubpage(category);
  if (!config) {
    return { title: 'Expertise Discipline Not Found | Vision Energy' };
  }

  const canonicalUrl = `https://www.visionenergyme.com/expertise/${config.id}`;
  const ogImageUrl = `https://www.visionenergyme.com${config.heroImage}`;

  return {
    title: config.seoTitle,
    description: config.seoDescription,
    keywords: config.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: config.seoTitle,
      description: config.seoDescription,
      url: canonicalUrl,
      siteName: 'Vision Energy International',
      locale: 'en_AE',
      type: 'article',
      images: [
        {
          url: ogImageUrl,
          width: 1920,
          height: 1080,
          alt: config.heroImageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: config.seoTitle,
      description: config.seoDescription,
      images: [ogImageUrl],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ExpertiseCategoryPage({ params }: ExpertiseSubpageProps) {
  const categorySlug = await resolveCategoryParam(params);
  const subpageConfig = getExpertiseSubpage(categorySlug);
  if (!subpageConfig) {
    notFound();
  }

  const tabData = getExpertiseTab(subpageConfig.id as ExpertiseTabId);
  const allCategories = await getPublishedProductCategories();
  const matchedCategories = allCategories
    .filter((cat: { groupPrefix?: string; code?: string }) => {
      const prefix = cat.groupPrefix || (cat.code ? cat.code.split('-')[0] : '');
      return subpageConfig.categoryPrefixes.includes(prefix);
    })
    .slice(0, 12);

  const jsonLd = buildExpertiseSubpageJsonLd(subpageConfig);
  const isPrimary = subpageConfig.id === 'lightning' || subpageConfig.id === 'earthing';

  return (
    <div className="bg-white dark:bg-[#050608] text-[#0A192F] dark:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. DEDICATED DISCIPLINE HERO */}
      <section
        id="subpage-hero"
        data-preserve-contrast="true"
        className="relative overflow-hidden border-b border-white/10 bg-[#050608] min-h-[380px] sm:min-h-[420px] flex items-center"
      >
        <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
          <Image
            src={subpageConfig.heroImage}
            alt={subpageConfig.heroImageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-[0.82] contrast-[1.06]"
          />
          <div
            className="absolute inset-0 hidden sm:block"
            style={{
              background:
                'linear-gradient(90deg, rgba(5, 6, 8, 0.94) 0%, rgba(5, 6, 8, 0.8) 42%, rgba(5, 6, 8, 0.3) 100%)',
            }}
          />
          <div
            className="absolute inset-0 sm:hidden"
            style={{
              background:
                'linear-gradient(180deg, rgba(5, 6, 8, 0.9) 0%, rgba(5, 6, 8, 0.72) 55%, rgba(5, 6, 8, 0.92) 100%)',
            }}
          />
        </div>

        <div className="max-w-[80rem] w-full mx-auto px-4 sm:px-6 lg:px-8 pt-[calc(var(--header-offset,80px)+32px)] lg:pt-[calc(var(--header-offset,80px)+48px)] pb-10 sm:pb-14 relative z-10">
          <div className="space-y-4 max-w-3xl">
            <nav aria-label="Breadcrumb" className="text-[13px] !text-white/90 font-medium flex flex-wrap items-center gap-2">
              <Link href="/" className="!text-white/90 hover:!text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-white/50" aria-hidden="true" />
              <Link href="/expertise" className="!text-white/90 hover:!text-white transition-colors">
                Expertise
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-white/50" aria-hidden="true" />
              <span className="font-semibold text-[#8DC63F]" aria-current="page">
                {tabData.label}
              </span>
            </nav>

            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#8DC63F]">
                <span className="w-5 h-[2px] bg-[#8DC63F] rounded-full" aria-hidden="true" />
                <span>{subpageConfig.eyebrow}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-white/80 bg-white/10 border border-white/15 px-2.5 py-0.5 rounded-full">
                <Calendar className="w-3 h-3 text-[#8DC63F]" aria-hidden="true" />
                <span>Last updated: {subpageConfig.lastUpdated}</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-bold !text-white leading-[1.12] tracking-[-0.025em]">
              {subpageConfig.h1}
            </h1>

            <p className="text-base sm:text-lg !text-white/90 max-w-2xl leading-relaxed">
              {subpageConfig.heroLead}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0B65B3] hover:bg-[#095292] text-white text-sm font-bold border border-[#8DC63F]/60 hover:border-[#8DC63F] shadow-lg transition-all"
                style={{ color: '#FFFFFF' }}
              >
                <span>Explore Catalog</span>
                <ArrowRight className="w-4 h-4 text-[#8DC63F]" aria-hidden="true" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-bold border border-white/25 backdrop-blur-md transition-all"
                style={{ color: '#FFFFFF' }}
              >
                <span>Request Technical Submittal</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INTER-DISCIPLINE ROUTE SWITCHER */}
      <Tabs
        tabs={EXPERTISE_TABS}
        activeTab={subpageConfig.id}
        routeBasePath="/expertise"
      />

      {/* 3. AEO QUICK ANSWER BOX (40-60 Words Direct Summary) */}
      <section className="bg-[#F4F8FC] dark:bg-[#080D16] border-b border-slate-200/80 dark:border-white/[0.08] py-7">
        <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div
            id="quick-answer-box"
            className="rounded-2xl border border-[#0B65B3]/25 dark:border-[#8DC63F]/30 bg-white dark:bg-[#0D1117] p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row items-start gap-4"
          >
            <div className="w-10 h-10 rounded-xl bg-[#0B65B3]/10 dark:bg-[#0B65B3]/25 border border-[#0B65B3]/20 flex items-center justify-center shrink-0 text-[#0B65B3] dark:text-[#8DC63F]">
              <Sparkles className="w-5 h-5" aria-hidden="true" />
            </div>
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#0B65B3] dark:text-[#8DC63F]">
                  Quick Answer · Verified Summary
                </span>
                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  Est. 2018 · 160+ Projects · Dubai, Abu Dhabi, RAK &amp; Qatar
                </span>
              </div>
              <p className="text-[14.5px] sm:text-[15.5px] text-[#1E293B] dark:text-[#E2E8F0] leading-relaxed font-normal">
                {subpageConfig.quickAnswer}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FULL SERVER-RENDERED STEPPER CONTENT */}
      <ExpertisePanel tab={tabData} isActive={true} />

      {/* 5. RELATED CATALOG CATEGORIES */}
      {matchedCategories.length > 0 && (
        <section className="py-12 sm:py-16 bg-white dark:bg-[#050608] border-t border-slate-200/80 dark:border-white/[0.08]">
          <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#5B8C1E] dark:text-[#8DC63F]">
                  <Layers className="w-4 h-4" aria-hidden="true" />
                  <span>Indexed Supply Catalog</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0A192F] dark:text-white tracking-[-0.02em]">
                  Related {tabData.label} Product Categories
                </h2>
              </div>
              <Link
                href="/products"
                className="text-sm font-bold text-[#0B65B3] dark:text-[#8DC63F] hover:underline inline-flex items-center gap-1.5"
              >
                <span>View All 115 Categories</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {matchedCategories.map((cat: { slug: string; code: string; title: string; description: string }) => (
                <Link
                  key={cat.slug}
                  href={`/products/${cat.slug}`}
                  className="expertise-card p-5 flex flex-col justify-between gap-3 hover:border-[#0B65B3] dark:hover:border-[#8DC63F] transition-colors group"
                >
                  <div className="space-y-2">
                    <span className="inline-block font-mono text-xs font-bold text-[#0B65B3] dark:text-[#8DC63F]">
                      {cat.code}
                    </span>
                    <h3 className="text-base font-bold text-[#0A192F] dark:text-white group-hover:text-[#0B65B3] dark:group-hover:text-[#8DC63F] transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-[#475569] dark:text-[#A9B4C0] line-clamp-2 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-[#0B65B3] dark:text-[#8DC63F] inline-flex items-center gap-1">
                    <span>View Category Specs</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. RELATED SERVICES & REGIONAL COVERAGE LINKS */}
      <section className="py-12 bg-[#F8FAFC] dark:bg-[#090E17] border-t border-slate-200/80 dark:border-white/[0.08]">
        <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0A192F] dark:text-white">
              Related Engineering &amp; Project Services
            </h2>
            <div className="space-y-3">
              {subpageConfig.relatedServices.map((srv) => (
                <Link
                  key={srv.slug}
                  href={`/services/${srv.slug}`}
                  className="expertise-card p-4 flex items-center justify-between gap-4 hover:border-[#0B65B3] dark:hover:border-[#8DC63F] transition-colors"
                >
                  <div className="space-y-1">
                    <h3 className="text-sm sm:text-base font-bold text-[#0A192F] dark:text-white">
                      {srv.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-[#475569] dark:text-[#A9B4C0]">
                      {srv.summary}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#0B65B3] dark:text-[#8DC63F] shrink-0" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0A192F] dark:text-white">
              UAE &amp; Qatar Coverage Pages
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {subpageConfig.localLinks.map((lnk) => (
                <Link
                  key={lnk.href}
                  href={lnk.href}
                  className="expertise-card p-4 flex items-center justify-between gap-2 text-sm font-semibold text-[#0A192F] dark:text-white hover:text-[#0B65B3] dark:hover:text-[#8DC63F] transition-colors"
                >
                  <span>{lnk.label}</span>
                  <ArrowRight className="w-4 h-4 shrink-0 text-[#8DC63F]" aria-hidden="true" />
                </Link>
              ))}
            </div>
            <div className="pt-1 flex items-center gap-2 text-xs text-[#475569] dark:text-[#A9B4C0]">
              <ShieldCheck className="w-4 h-4 text-[#8DC63F] shrink-0" aria-hidden="true" />
              <span>
                Ras Al Khaimah Head Office · Branches in Dubai &amp; Abu Dhabi · Project Supply in Qatar.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. DISCIPLINE FAQ MATCHING JSON-LD */}
      {subpageConfig.faqItems.length > 0 && (
        <section
          id="subpage-faq"
          aria-labelledby="subpage-faq-heading"
          className="py-12 sm:py-16 bg-white dark:bg-[#050608] border-t border-slate-200/80 dark:border-white/[0.08]"
        >
          <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#5B8C1E] dark:text-[#8DC63F]">
                <HelpCircle className="w-4 h-4" aria-hidden="true" />
                <span>Discipline FAQ</span>
              </div>
              <h2
                id="subpage-faq-heading"
                className="text-2xl sm:text-3xl font-bold text-[#0A192F] dark:text-white tracking-[-0.02em]"
              >
                Frequently Asked Questions on {tabData.label} Solutions
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
              {subpageConfig.faqItems.map((item) => (
                <article
                  key={item.id}
                  id={item.id}
                  className="expertise-card p-6 flex flex-col gap-3"
                >
                  <span
                    className={`self-start inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-[0.08em] ${
                      isPrimary
                        ? 'bg-[#0B65B3]/10 dark:bg-[#0B65B3]/25 text-[#0B65B3] dark:text-[#60A5FA]'
                        : 'bg-[#8DC63F]/15 dark:bg-[#8DC63F]/20 text-[#3F6E0C] dark:text-[#8DC63F]'
                    }`}
                  >
                    {item.topic}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-[#0A192F] dark:text-white leading-snug">
                    {item.question}
                  </h3>
                  <p
                    data-aeo-answer="true"
                    className="text-[14.5px] sm:text-[15px] text-[#475569] dark:text-[#CBD5E1] leading-[1.6]"
                  >
                    {item.answer}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <FinalCTA bgClass="bg-[#050608]" />
    </div>
  );
}
