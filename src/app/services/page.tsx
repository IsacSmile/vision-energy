import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getPublishedServices } from '@/lib/services/get-services';
import ServicesListRow from '@/components/services/ServicesListRow';
import HowWeWorkStepper from '@/components/services/HowWeWorkStepper';
import FinalCTA from '@/components/home/FinalCTA';
import Reveal from '@/components/ui/Reveal';

export const metadata = {
  title: 'Services | Lightning Protection Installation & Support | Vision Energy International',
  description:
    'Installation and support services from Vision Energy International: external lightning protection installation and manpower services across the UAE.',
  alternates: {
    canonical: 'https://www.visionenergyme.com/services',
  },
  openGraph: {
    title: 'Services | Lightning Protection Installation & Support | Vision Energy International',
    description:
      'Installation and support services from Vision Energy International: external lightning protection installation and manpower services across the UAE.',
    url: 'https://www.visionenergyme.com/services',
    type: 'website',
  },
};

export const revalidate = 300;

export default async function ServicesListingPage() {
  const publishedServices = await getPublishedServices();

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
    ],
  };

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Vision Energy Installation and Support Services',
    itemListElement: publishedServices.map((service, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: service.title,
      url: `https://www.visionenergyme.com/services/${service.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <div className="w-full bg-[#050608] text-white">
        {/* SECTION A: HEADER (#050608) */}
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
                <ol className="flex items-center gap-2 text-[13px] text-[#A9B4C0]">
                  <li>
                    <Link href="/" className="hover:text-white transition-colors">
                      Home
                    </Link>
                  </li>
                  <li aria-hidden="true" className="opacity-40">/</li>
                  <li className="text-white font-medium" aria-current="page">
                    Services
                  </li>
                </ol>
              </nav>
            </Reveal>

            <Reveal delay={70}>
              <span className="text-[13px] font-semibold text-[#8DC63F] uppercase tracking-widest block">
                Services
              </span>
            </Reveal>

            <Reveal delay={140}>
              <h1 className="text-[clamp(2.25rem,6vw,4.5rem)] font-semibold text-white leading-[1.08] tracking-[-0.02em] text-balance max-w-[12em]">
                Installation and Support Services
              </h1>
            </Reveal>

            <Reveal delay={210}>
              <p className="text-base sm:text-lg lg:text-xl text-[#A9B4C0] leading-relaxed max-w-[56ch]">
                Beyond supply, we help deliver results. From product selection and technical coordination to installation guidance and after-sales support, our team keeps your project moving with confidence.
              </p>
            </Reveal>
          </div>
        </section>

        {/* SECTION B: SERVICES INDEX (#0D1117) */}
        <section className="bg-[#0D1117] py-16 lg:py-24 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="sr-only">Services Index</h2>
            </Reveal>

            <ol className="w-full">
              {publishedServices.map((service, idx) => (
                <ServicesListRow key={service.id} service={service} index={idx} />
              ))}
            </ol>
          </div>
        </section>

        {/* SECTION C: HOW WE WORK WITH YOU (#050608) */}
        <section className="bg-[#050608] py-16 lg:py-24 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <Reveal>
              <div className="space-y-2">
                <span className="text-[13px] font-semibold text-[#8DC63F] uppercase tracking-widest block">
                  Working with us
                </span>
                <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-semibold text-white tracking-tight leading-tight">
                  How We Support Your Project
                </h2>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <HowWeWorkStepper />
            </Reveal>
          </div>
        </section>

        {/* SECTION D: CROSS-LINK (#0D1117) */}
        <section className="bg-[#0D1117] py-12 lg:py-16 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-white max-w-[36ch]">
              Looking for lightning protection or earthing products?
            </h2>

            <Link
              href="/products?group=LP"
              className="text-base font-semibold text-[#8DC63F] hover:text-white inline-flex items-center gap-2 group transition-colors shrink-0"
            >
              <span>Browse lightning protection products</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </section>

        {/* SECTION E: FINAL CTA (#050608) */}
        <FinalCTA bgClass="bg-[#050608]" />
      </div>
    </>
  );
}
