import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Check } from 'lucide-react';
import { getPublishedServices, getServiceBySlug } from '@/lib/services/get-services';
import { SERVICES_CONTENT, ServiceContentConfig } from '@/lib/services/content';
import { FALLBACK_CATEGORIES } from '@/lib/fallback-categories';

import ServiceCTAGroup from '@/components/services/ServiceCTAGroup';
import ServiceScrollspy, { NavSection } from '@/components/services/ServiceScrollspy';
import ProcessStepper from '@/components/services/ProcessStepper';
import FAQAccordion from '@/components/services/FAQAccordion';
import ProtectionDiagram from '@/components/home/ProtectionDiagram';
import FinalCTA from '@/components/home/FinalCTA';
import Reveal from '@/components/ui/Reveal';

interface ServiceDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const publishedServices = await getPublishedServices();
  return publishedServices.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    return { title: 'Service Not Found' };
  }

  const content = SERVICES_CONTENT[slug] || {};
  let pageTitle = `${service.title} | Vision Energy International`;
  let pageDesc = service.summary;

  if (slug === 'external-lightning-protection-installation') {
    pageTitle = 'External Lightning Protection Installation UAE | Vision Energy International';
    if (content.hero?.lead) {
      pageDesc = content.hero.lead;
    }
  } else if (slug === 'manpower-supply') {
    pageTitle = 'Manpower Services UAE | Vision Energy International';
    pageDesc = 'Manpower services from Vision Energy International for engineering and installation projects across the UAE.';
  }

  return {
    title: pageTitle,
    description: pageDesc,
    alternates: {
      canonical: `https://www.visionenergyme.com/services/${slug}`,
    },
    openGraph: {
      title: pageTitle,
      description: pageDesc,
      url: `https://www.visionenergyme.com/services/${slug}`,
      type: 'article',
    },
  };
}

export const revalidate = 300;

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  // STRICT RULE: Unknown or unpublished services must return 404
  if (!service) {
    notFound();
  }

  const content: ServiceContentConfig = SERVICES_CONTENT[slug] || {};
  const metaChips = content.metaChips || [];

  // Determine page title for Header
  const headerH1 =
    slug === 'external-lightning-protection-installation'
      ? 'External Lightning Protection Installation in the UAE'
      : service.title;

  const leadText = content.hero?.lead || service.summary;

  // Resolve related products from FALLBACK_CATEGORIES
  const relatedCategories = (content.relatedCategoryCodes || [])
    .map((code) => FALLBACK_CATEGORIES.find((cat) => cat.code === code))
    .filter((cat): cat is NonNullable<typeof cat> => Boolean(cat));

  // Filter confirmed process steps
  const confirmedProcessSteps = (content.process || []).filter((s) => s.confirmed !== false);

  // Check how many content sections exist to decide FinalCTA placement
  const contentSectionCount = [
    Boolean(content.overview),
    Boolean(content.systems && content.systems.length > 0),
    slug === 'external-lightning-protection-installation', // visual diagram
    Boolean(content.whereWeInstall && content.whereWeInstall.length > 0),
    Boolean(confirmedProcessSteps.length > 0),
    Boolean(content.standards && content.standards.length > 0),
    Boolean(relatedCategories.length > 0),
    Boolean(content.faq && content.faq.length > 0),
  ].filter(Boolean).length;

  const showStandaloneFinalCTA = contentSectionCount < 3;

  // Build Table of Contents Sections for Scrollspy
  const navSections: NavSection[] = [];
  if (content.overview) navSections.push({ id: 'overview', label: 'Overview' });
  if (content.systems && content.systems.length > 0) navSections.push({ id: 'systems', label: 'Systems We Install' });
  if (slug === 'external-lightning-protection-installation') navSections.push({ id: 'visual', label: 'Protection Path' });
  if (content.whereWeInstall && content.whereWeInstall.length > 0) navSections.push({ id: 'where-we-install', label: 'Where We Install' });
  if (confirmedProcessSteps.length > 0) navSections.push({ id: 'process', label: 'Process' });
  if (content.standards && content.standards.length > 0) navSections.push({ id: 'standards', label: 'Standards' });
  if (relatedCategories.length > 0) navSections.push({ id: 'related-products', label: 'Related Products' });
  if (content.faq && content.faq.length > 0) navSections.push({ id: 'faq', label: 'FAQ' });

  // JSON-LD Schemas
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
        name: 'Services',
        item: 'https://www.visionenergyme.com/services',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: service.title,
        item: `https://www.visionenergyme.com/services/${slug}`,
      },
    ],
  };

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: leadText,
    provider: {
      '@type': 'Organization',
      name: 'Vision Energy International',
      url: 'https://www.visionenergyme.com',
    },
    areaServed: {
      '@type': 'Country',
      name: 'AE',
    },
    serviceType: service.title,
  };

  const faqJsonLd =
    content.faq && content.faq.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: content.faq.map((item) => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.a,
            },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <div className="w-full bg-[#050608] text-white overflow-x-clip">
        {/* SECTION 1: HEADER (#050608) */}
        <section className="relative overflow-hidden bg-[#050608] pt-[calc(var(--header-offset,0px)+40px)] lg:pt-[calc(var(--header-offset,0px)+72px)] pb-16 lg:pb-24 border-b border-white/10">
          {/* Static Engineering Grid SVG Background */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#8DC63F_1px,transparent_1px)] [background-size:24px_24px]"
            aria-hidden="true"
          />

          {/* Drifting Soft Blue Glow */}
          <div
            className="absolute top-1/4 right-1/4 w-[480px] h-[480px] bg-[#0B65B3]/15 rounded-full filter blur-[128px] pointer-events-none animate-pulse duration-10000"
            aria-hidden="true"
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
            <Reveal>
              <nav aria-label="Breadcrumb" className="mb-4">
                <ol className="flex flex-wrap items-center gap-2 text-[13px] text-[#A9B4C0]">
                  <li>
                    <Link href="/" className="hover:text-white transition-colors">
                      Home
                    </Link>
                  </li>
                  <li aria-hidden="true" className="opacity-40">/</li>
                  <li>
                    <Link href="/services" className="hover:text-white transition-colors">
                      Services
                    </Link>
                  </li>
                  <li aria-hidden="true" className="opacity-40">/</li>
                  <li className="text-white font-medium" aria-current="page">
                    {service.title}
                  </li>
                </ol>
              </nav>
            </Reveal>

            <Reveal delay={70}>
              <span className="text-[13px] font-semibold text-[#8DC63F] uppercase tracking-widest block">
                Service
              </span>
            </Reveal>

            <Reveal delay={140}>
              <h1 className="text-[clamp(2rem,5vw,4rem)] font-semibold text-white leading-[1.1] tracking-[-0.02em] text-balance max-w-[16em]">
                {headerH1}
              </h1>
            </Reveal>

            <Reveal delay={210}>
              <p className="text-base sm:text-lg lg:text-xl text-[#A9B4C0] leading-relaxed max-w-[62ch]">
                {leadText}
              </p>
            </Reveal>

            {/* TWO CTA OPTIONS */}
            <Reveal delay={280}>
              <div className="pt-2">
                <ServiceCTAGroup serviceSlug={service.slug} serviceTitle={service.title} />
              </div>
            </Reveal>

            {/* Meta Chips */}
            {metaChips.length > 0 && (
              <Reveal delay={350}>
                <div className="flex flex-wrap gap-2 pt-2">
                  {metaChips.map((chip, idx) => (
                    <span
                      key={idx}
                      className="text-[13px] font-medium text-[#8DC63F] bg-[#8DC63F]/10 border border-[#8DC63F]/30 px-3 py-1 rounded-full"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </Reveal>
            )}
          </div>
        </section>

        {/* SPECIAL MINIMAL MANPOWER PAGE SECTION */}
        {slug === 'manpower-supply' ? (
          <section className="bg-[#0D1117] py-16 lg:py-24 border-b border-white/10">
            {/* TODO: Client to provide manpower service details (trades, engagement terms, coverage). */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <Reveal>
                <div className="space-y-2">
                  <span className="text-[13px] font-semibold text-[#8DC63F] uppercase tracking-widest block">
                    Manpower services
                  </span>
                  <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-semibold text-white tracking-tight leading-tight">
                    Tell Us What You Need
                  </h2>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <p className="text-base sm:text-lg text-[#A9B4C0] leading-relaxed max-w-[62ch]">
                  Send us your requirements and our team will get back to you.
                </p>
              </Reveal>

              <Reveal delay={200}>
                <ServiceCTAGroup serviceSlug={service.slug} serviceTitle={service.title} />
              </Reveal>
            </div>
          </section>
        ) : (
          /* STANDARD DETAILED SERVICE BODY (#0D1117) */
          <section className="bg-[#0D1117] py-12 lg:py-20 border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-[96px] items-start">
                {/* MAIN CONTENT COLUMN (lg:col-span-8) */}
                <div className="lg:col-span-8 space-y-0 divide-y divide-white/10">
                  {/* a) Overview */}
                  {content.overview && (
                    <section
                      id="overview"
                      tabIndex={-1}
                      aria-labelledby="overview-heading"
                      className="py-14 lg:py-20 first:pt-0 scroll-mt-[calc(var(--header-offset,0px)+40px)] focus:outline-none"
                    >
                      <Reveal>
                        <h2
                          id="overview-heading"
                          className="text-[clamp(1.5rem,3vw,2.25rem)] font-semibold text-white tracking-tight mb-6"
                        >
                          Overview
                        </h2>
                      </Reveal>
                      <Reveal delay={100}>
                        <p className="text-base lg:text-lg text-[#A9B4C0] leading-[1.75] max-w-[62ch]">
                          {content.overview}
                        </p>
                      </Reveal>
                    </section>
                  )}

                  {/* b) System types ("Systems We Install") */}
                  {content.systems && content.systems.length > 0 && (
                    <section
                      id="systems"
                      tabIndex={-1}
                      aria-labelledby="systems-heading"
                      className="py-14 lg:py-20 scroll-mt-[calc(var(--header-offset,0px)+40px)] focus:outline-none"
                    >
                      <Reveal>
                        <h2
                          id="systems-heading"
                          className="text-[clamp(1.5rem,3vw,2.25rem)] font-semibold text-white tracking-tight mb-10"
                        >
                          Systems We Install
                        </h2>
                      </Reveal>

                      <div
                        className={`grid grid-cols-1 ${
                          content.systems.length === 2
                            ? 'lg:grid-cols-2 gap-8 lg:gap-12 lg:divide-x lg:divide-y-0 divide-y divide-white/10'
                            : 'gap-12 divide-y divide-white/10'
                        }`}
                      >
                        {content.systems.map((system, idx) => (
                          <div
                            key={idx}
                            className={`space-y-6 ${
                              idx > 0 && content.systems?.length === 2
                                ? 'pt-8 lg:pt-0 lg:pl-12'
                                : ''
                            }`}
                          >
                            <Reveal delay={idx * 100}>
                              <span className="tabular-nums text-[13px] font-mono font-semibold text-[#8DC63F]">
                                {String(idx + 1).padStart(2, '0')}
                              </span>
                              <h3 className="text-[clamp(1.25rem,2.2vw,1.75rem)] font-semibold text-white tracking-tight mt-1">
                                {system.title}
                              </h3>
                            </Reveal>

                            <Reveal delay={idx * 100 + 50}>
                              <p className="text-sm sm:text-base text-[#A9B4C0] leading-relaxed max-w-[60ch]">
                                {system.body}
                              </p>
                            </Reveal>

                            <Reveal delay={idx * 100 + 100}>
                              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                                {system.points.map((pt, pIdx) => (
                                  <li key={pIdx} className="flex items-center gap-2.5 text-sm text-white/90">
                                    <Check className="w-4 h-4 text-[#8DC63F] shrink-0" />
                                    <span>{pt}</span>
                                  </li>
                                ))}
                              </ul>
                            </Reveal>
                          </div>
                        ))}
                      </div>

                      {/* Mobile Only Repeat CTA after Systems Section */}
                      <div className="lg:hidden pt-8 mt-8 border-t border-white/10">
                        <ServiceCTAGroup
                          serviceSlug={service.slug}
                          serviceTitle={service.title}
                          compact
                        />
                      </div>
                    </section>
                  )}

                  {/* c) Visual ("How the Protection Path Works", external service only) */}
                  {slug === 'external-lightning-protection-installation' && (
                    <section
                      id="visual"
                      tabIndex={-1}
                      aria-labelledby="visual-heading"
                      className="py-14 lg:py-20 scroll-mt-[calc(var(--header-offset,0px)+40px)] focus:outline-none"
                    >
                      <Reveal>
                        <h2
                          id="visual-heading"
                          className="text-[clamp(1.5rem,3vw,2.25rem)] font-semibold text-white tracking-tight mb-8"
                        >
                          How the Protection Path Works
                        </h2>
                      </Reveal>

                      <Reveal delay={100}>
                        <ProtectionDiagram
                          visibleSteps={[1, 2, 3]}
                          eyebrow="External Protection Path"
                          title="Interception, Conduction and Dissipation"
                          caption="External lightning protection: air terminals, down conductors and earth pits working as one path."
                        />
                      </Reveal>
                    </section>
                  )}

                  {/* d) Where we install */}
                  {content.whereWeInstall && content.whereWeInstall.length > 0 && (
                    <section
                      id="where-we-install"
                      tabIndex={-1}
                      aria-labelledby="where-heading"
                      className="py-14 lg:py-20 scroll-mt-[calc(var(--header-offset,0px)+40px)] focus:outline-none"
                    >
                      <Reveal>
                        <h2
                          id="where-heading"
                          className="text-[clamp(1.5rem,3vw,2.25rem)] font-semibold text-white tracking-tight mb-8"
                        >
                          Where We Install
                        </h2>
                      </Reveal>

                      <Reveal delay={100}>
                        <ul className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 border-y border-white/10">
                          {content.whereWeInstall.map((item, idx) => (
                            <li
                              key={idx}
                              className="min-h-[48px] py-3 flex items-center gap-3 border-b border-white/10 text-sm sm:text-base text-white/90"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-[#8DC63F] shrink-0" aria-hidden="true" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </Reveal>
                    </section>
                  )}

                  {/* e) Process */}
                  {confirmedProcessSteps.length > 0 && (
                    <section
                      id="process"
                      tabIndex={-1}
                      aria-labelledby="process-heading"
                      className="py-14 lg:py-20 scroll-mt-[calc(var(--header-offset,0px)+40px)] focus:outline-none"
                    >
                      <Reveal>
                        <h2
                          id="process-heading"
                          className="text-[clamp(1.5rem,3vw,2.25rem)] font-semibold text-white tracking-tight mb-8"
                        >
                          Execution Process
                        </h2>
                      </Reveal>

                      <Reveal delay={100}>
                        <ProcessStepper steps={content.process || []} />
                      </Reveal>
                    </section>
                  )}

                  {/* f) Standards */}
                  {content.standards && content.standards.length > 0 && (
                    <section
                      id="standards"
                      tabIndex={-1}
                      aria-labelledby="standards-heading"
                      className="py-14 lg:py-20 scroll-mt-[calc(var(--header-offset,0px)+40px)] focus:outline-none"
                    >
                      <Reveal>
                        <h2
                          id="standards-heading"
                          className="text-[clamp(1.5rem,3vw,2.25rem)] font-semibold text-white tracking-tight mb-6"
                        >
                          Standards & Compliance
                        </h2>
                      </Reveal>

                      <Reveal delay={100}>
                        <div className="space-y-4">
                          <span className="block text-[12px] font-bold text-[#8DC63F] uppercase tracking-[0.14em]">
                            Standards we work to
                          </span>

                          <div className="flex flex-wrap gap-3">
                            {content.standards.map((std, idx) => (
                              <span
                                key={idx}
                                className="text-sm font-mono text-white/90 bg-white/[0.04] border border-white/10 px-4 py-2 rounded-full"
                              >
                                {std}
                              </span>
                            ))}
                          </div>

                          {content.complianceNote && (
                            <p className="text-xs sm:text-sm text-[#A9B4C0] leading-relaxed pt-2">
                              {content.complianceNote}
                            </p>
                          )}
                        </div>
                      </Reveal>
                    </section>
                  )}

                  {/* g) Related products */}
                  {relatedCategories.length > 0 && (
                    <section
                      id="related-products"
                      tabIndex={-1}
                      aria-labelledby="related-heading"
                      className="py-14 lg:py-20 scroll-mt-[calc(var(--header-offset,0px)+40px)] focus:outline-none"
                    >
                      <Reveal>
                        <h2
                          id="related-heading"
                          className="text-[clamp(1.5rem,3vw,2.25rem)] font-semibold text-white tracking-tight mb-8"
                        >
                          Related Products
                        </h2>
                      </Reveal>

                      <Reveal delay={100}>
                        <div className="divide-y divide-white/10 border-y border-white/10 mb-8">
                          {relatedCategories.map((cat) => (
                            <Link
                              key={cat.code}
                              href={`/products/${cat.slug}`}
                              className="min-h-[56px] py-4 flex items-center justify-between gap-4 group hover:bg-white/[0.02] transition-colors px-2 rounded-lg"
                            >
                              <div className="flex items-center gap-4">
                                <span className="tabular-nums font-mono text-sm text-[#A9B4C0]">
                                  {cat.code}
                                </span>
                                <span className="text-base font-medium text-white group-hover:text-[#8DC63F] transition-colors">
                                  {cat.title}
                                </span>
                              </div>
                              <ArrowRight className="w-5 h-5 text-[#8DC63F] transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                          ))}
                        </div>

                        <Link
                          href="/products?group=LP"
                          className="inline-flex items-center gap-2 text-sm font-semibold text-[#8DC63F] hover:text-white transition-colors group"
                        >
                          <span>View all lightning protection products</span>
                          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                      </Reveal>
                    </section>
                  )}

                  {/* h) FAQ */}
                  {content.faq && content.faq.length > 0 && (
                    <section
                      id="faq"
                      tabIndex={-1}
                      aria-labelledby="faq-heading"
                      className="py-14 lg:py-20 scroll-mt-[calc(var(--header-offset,0px)+40px)] focus:outline-none"
                    >
                      <Reveal>
                        <h2
                          id="faq-heading"
                          className="text-[clamp(1.5rem,3vw,2.25rem)] font-semibold text-white tracking-tight mb-6"
                        >
                          Frequently Asked Questions
                        </h2>
                      </Reveal>

                      <Reveal delay={100}>
                        <FAQAccordion items={content.faq} />
                      </Reveal>
                    </section>
                  )}

                  {/* i) End-of-page CTA in MAIN (all viewports) */}
                  <section className="pt-12 lg:pt-16 border-t border-white/10 space-y-6">
                    <Reveal>
                      <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold text-white tracking-tight">
                        Ready to Start?
                      </h2>
                    </Reveal>

                    <Reveal delay={100}>
                      <ServiceCTAGroup
                        serviceSlug={service.slug}
                        serviceTitle={service.title}
                      />
                    </Reveal>
                  </section>
                </div>

                {/* ASIDE COLUMN (lg:col-span-4, desktop only) */}
                <ServiceScrollspy
                  sections={navSections}
                  serviceSlug={service.slug}
                  serviceTitle={service.title}
                />
              </div>
            </div>
          </section>
        )}

        {/* STANDALONE FINAL CTA SECTION (rendered only if fewer than 3 content sections) */}
        {showStandaloneFinalCTA && <FinalCTA bgClass="bg-[#050608]" />}
      </div>
    </>
  );
}
