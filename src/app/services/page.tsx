import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import BrandImage from '@/components/ui/BrandImage';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { getPublishedServices } from '@/lib/services/get-services';
import ServicesListRow from '@/components/services/ServicesListRow';
import HowWeWork from '@/components/services/HowWeWork';
import FinalCTA from '@/components/home/FinalCTA';
import Reveal from '@/components/ui/Reveal';

export const metadata = {
  title: 'Engineering & MEP Services UAE & Qatar | Vision Energy',
  description:
    'Lightning protection installation, earthing & grounding design, soil resistivity testing, and certified MEP manpower in UAE & Qatar.',
  keywords: [
    'Lightning Protection Installation UAE',
    'Earthing System Design Dubai',
    'Earthing Contractor Abu Dhabi',
    'Soil Resistivity Testing UAE',
    'Engineering Manpower Supply UAE & Qatar',
    'Surge Protection Installation UAE',
  ],
  alternates: {
    canonical: 'https://www.visionenergyme.com/services',
  },
  openGraph: {
    title: 'Engineering & MEP Services UAE & Qatar | Vision Energy',
    description:
      'Lightning protection installation, earthing design, soil resistivity testing, and certified MEP manpower across Dubai, Abu Dhabi, RAK & Qatar.',
    url: 'https://www.visionenergyme.com/services',
    type: 'website',
    images: [
      {
        url: 'https://www.visionenergyme.com/images/products-collage-banner.jpg',
        width: 1200,
        height: 630,
        alt: 'Vision Energy Engineering Services UAE & Qatar',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Engineering & MEP Services UAE & Qatar | Vision Energy',
    description:
      'Lightning protection, earthing networks, soil testing & certified MEP manpower across UAE & Qatar.',
    images: ['https://www.visionenergyme.com/images/products-collage-banner.jpg'],
  },
};

export const revalidate = 300;

export default async function ServicesListingPage() {
  const rawServices = await getPublishedServices();
  const publishedServices = rawServices.map((service) => ({
    ...service,
    content: service.content
      ? {
          metaChips: service.content.metaChips,
          image: service.content.image,
          imageAlt: service.content.imageAlt,
          hero: service.content.hero
            ? {
                imageUrl: service.content.hero.imageUrl,
                imageAlt: service.content.hero.imageAlt,
              }
            : undefined,
          systems: service.content.systems?.[0]
            ? [{ points: service.content.systems[0].points }]
            : undefined,
        }
      : null,
  }));

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
        <section
          id="services-hero"
          data-dark-hero="true"
          data-hero-section="true"
          className="services-hero relative overflow-hidden bg-[#050608] border-b border-[#1F2937]/80 min-h-[360px] sm:min-h-[400px] lg:min-h-[440px] flex flex-col justify-end"
        >
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

          <div className="max-w-[80rem] w-full mx-auto px-4 sm:px-6 lg:px-8 pt-[calc(var(--header-offset,80px)+36px)] lg:pt-[calc(var(--header-offset,80px)+52px)] pb-10 sm:pb-14 relative z-10">
            <div className="space-y-4 max-w-4xl">
              <nav aria-label="Breadcrumb" className="text-[13px] text-white/80 font-medium flex items-center gap-2 drop-shadow-sm">
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-white/50" />
                <span className="text-[#8DC63F] font-semibold">Services</span>
              </nav>

              <span className="text-[13px] font-semibold text-[#8DC63F] uppercase tracking-widest block drop-shadow-sm">
                Services
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-white tracking-tight leading-[1.15] drop-shadow-md">
                Installation and Support Services
              </h1>

              <p className="text-base sm:text-lg text-white/90 max-w-2xl leading-relaxed drop-shadow">
                Beyond supply, we help deliver results. From product selection and technical coordination to installation guidance and after-sales support, our team keeps your project moving across the UAE &amp; Qatar.
              </p>
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

            {/* Regional Delivery Coverage Links (UAE Primary & Qatar Secondary) */}
            <nav
              aria-label="Regional engineering service coverage"
              className="mt-12 p-6 rounded-2xl bg-[#0D1117] border border-white/10 space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="text-sm sm:text-base font-bold text-white">
                  Regional Engineering Coverage: UAE &amp; Qatar
                </h3>
                <span className="text-xs text-[#A9B4C0]">
                  Ras Al Khaimah HQ · Dubai &amp; Abu Dhabi Branches · Qatar Supply
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-semibold">
                <Link href="/uae/dubai/lightning-protection" className="px-3.5 py-2.5 rounded-xl bg-[#050608] border border-white/10 hover:border-[#8DC63F] text-white transition-colors">
                  Dubai Lightning Protection →
                </Link>
                <Link href="/uae/dubai/earthing-grounding" className="px-3.5 py-2.5 rounded-xl bg-[#050608] border border-white/10 hover:border-[#8DC63F] text-white transition-colors">
                  Dubai Earthing &amp; Grounding →
                </Link>
                <Link href="/uae/abu-dhabi/lightning-protection" className="px-3.5 py-2.5 rounded-xl bg-[#050608] border border-white/10 hover:border-[#8DC63F] text-white transition-colors">
                  Abu Dhabi Lightning Protection →
                </Link>
                <Link href="/uae/abu-dhabi/earthing-grounding" className="px-3.5 py-2.5 rounded-xl bg-[#050608] border border-white/10 hover:border-[#8DC63F] text-white transition-colors">
                  Abu Dhabi Earthing &amp; Grounding →
                </Link>
                <Link href="/uae/ras-al-khaimah/lightning-protection" className="px-3.5 py-2.5 rounded-xl bg-[#050608] border border-white/10 hover:border-[#8DC63F] text-white transition-colors">
                  Ras Al Khaimah LPS (HQ) →
                </Link>
                <Link href="/uae/ras-al-khaimah/earthing-grounding" className="px-3.5 py-2.5 rounded-xl bg-[#050608] border border-white/10 hover:border-[#8DC63F] text-white transition-colors">
                  Ras Al Khaimah Earthing →
                </Link>
                <Link href="/qatar/lightning-protection" className="px-3.5 py-2.5 rounded-xl bg-[#050608] border border-white/10 hover:border-[#8DC63F] text-[#8DC63F] transition-colors">
                  Qatar Lightning Supply →
                </Link>
                <Link href="/qatar/earthing-grounding" className="px-3.5 py-2.5 rounded-xl bg-[#050608] border border-white/10 hover:border-[#8DC63F] text-[#8DC63F] transition-colors">
                  Qatar Earthing &amp; SPDs →
                </Link>
              </div>
            </nav>
          </div>
        </section>

        {/* SECTION C: HOW WE WORK (#050608) */}
        <HowWeWork />

        {/* SECTION D: CROSS-LINK (CLEAN WHITE CARD - NO BADGES) */}
        <section className="bg-white py-12 lg:py-16 border-t border-b border-gray-200 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white border border-gray-200/90 p-6 sm:p-8 lg:p-10 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row items-center justify-between gap-8 group">
                {/* Left: Content Block */}
                <div className="relative z-10 flex-1 space-y-3 sm:space-y-4 text-left">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
                    Looking for lightning protection or earthing products?
                  </h2>

                  <p className="text-base sm:text-lg text-gray-600 max-w-2xl leading-relaxed">
                    Explore our DEWA, SEWA & Civil Defense compliant catalogue of air terminals, copper conductors, earthing enhancement compounds, and surge protection devices.
                  </p>

                  <div className="pt-2">
                    <Link
                      href="/products?group=LP"
                      className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#0B65B3] hover:bg-[#0c72ca] text-white font-semibold text-sm sm:text-base transition-all duration-300 shadow-md hover:shadow-lg group/btn"
                    >
                      <span>Browse lightning protection products</span>
                      <ArrowRight className="w-4.5 h-4.5 text-[#8DC63F] transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </div>

                {/* Right: Short Size Showcase Image (Clean, No Badges) */}
                <div className="relative z-10 w-full sm:w-80 md:w-80 lg:w-96 shrink-0">
                  <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full rounded-2xl overflow-hidden border border-gray-200 shadow-md group/img">
                    <BrandImage
                      src="/images/products-collage-banner.webp"
                      alt="Vision Energy Certified Lightning Protection and Earthing Products"
                      fill
                      surface="light"
                      logoSize="md"
                      sizes="(max-width: 768px) 100vw, 384px"
                      className="object-cover object-center group-hover/img:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* SECTION E: FINAL CTA (#050608) */}
        <FinalCTA bgClass="bg-[#050608]" />
      </div>
    </>
  );
}
