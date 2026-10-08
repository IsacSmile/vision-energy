import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { getPublishedServices } from '@/lib/services/get-services';
import ServicesListRow from '@/components/services/ServicesListRow';
import HowWeWorkStepper from '@/components/services/HowWeWorkStepper';
import FinalCTA from '@/components/home/FinalCTA';
import Reveal from '@/components/ui/Reveal';
import HeroLightning from '@/components/HeroLightning';

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
        {/* SECTION A: HEADER (Full Background Hero Image) */}
        <section className="relative overflow-hidden bg-[#050608] border-b border-[#1F2937]/80 min-h-[360px] sm:min-h-[400px] lg:min-h-[440px] flex flex-col justify-end">
          {/* Full Background Hero Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/services-page-hero-new-bg.webp"
              alt="Vision Energy Installation and Field Engineering Services UAE"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center lg:object-right"
            />
            {/* Light gradient overlays so the background image is vibrant and clearly visible */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#050608]/85 via-[#050608]/45 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-transparent to-[#050608]/30" />
          </div>

          {/* Thunder Lightning Animation in Services Hero */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden z-[1]" aria-hidden="true">
            <HeroLightning
              hue={210}
              speed={0.7}
              intensity={0.6}
              boltPosition={0.8}
              opacityClass="opacity-25 lg:opacity-40"
            />
          </div>

          <div className="max-w-[80rem] w-full mx-auto px-4 sm:px-6 lg:px-8 pt-[calc(var(--header-offset,80px)+36px)] lg:pt-[calc(var(--header-offset,80px)+52px)] pb-10 sm:pb-14 relative z-10">
            <div className="space-y-4 max-w-4xl">
              <Reveal>
                <nav aria-label="Breadcrumb" className="text-[13px] text-white/80 font-medium flex items-center gap-2 drop-shadow-sm">
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                  <ChevronRight className="w-3.5 h-3.5 text-white/50" />
                  <span className="text-[#8DC63F] font-semibold">Services</span>
                </nav>
              </Reveal>

              <Reveal delay={70}>
                <span className="text-[13px] font-semibold text-[#8DC63F] uppercase tracking-widest block drop-shadow-sm">
                  Services
                </span>
              </Reveal>

              <Reveal delay={140}>
                <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-white tracking-tight leading-[1.15] drop-shadow-md">
                  Installation and Support Services
                </h1>
              </Reveal>

              <Reveal delay={210}>
                <p className="text-base sm:text-lg text-white/90 max-w-2xl leading-relaxed drop-shadow">
                  Beyond supply, we help deliver results. From product selection and technical coordination to installation guidance and after-sales support, our team keeps your project moving with confidence.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* SECTION B: SERVICES INDEX (#0D1117) */}
        <section className="bg-[#050608] py-16 lg:py-24 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="sr-only">Services Index</h2>
            </Reveal>

            <ol className="w-full space-y-6 sm:space-y-8">
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
