import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  ArrowUpRight,
  Zap,
  Layers,
  Users,
  ShieldCheck,
  Wrench,
} from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import Reveal from '@/components/ui/Reveal';
import { getPublishedServices } from '@/lib/data/services';

const SERVICE_META: Record<
  string,
  {
    eyebrow: string;
    icon: React.ElementType;
    image: { url: string; alt: string };
  }
> = {
  'external-lightning-protection-installation': {
    eyebrow: 'Specialist Protection',
    icon: Zap,
    image: {
      url: '/images/external-lightning-protection-installation.png',
      alt: 'External structural lightning protection and earthing building installation UAE',
    },
  },
  'earthing-and-grounding': {
    eyebrow: 'Core Infrastructure',
    icon: Layers,
    image: {
      url: '/images/earthing-grounding-hero.webp',
      alt: 'Earthing and grounding system design, copper grid and installation',
    },
  },
  'manpower-supply': {
    eyebrow: 'Certified Manpower',
    icon: Users,
    image: {
      url: '/images/specialist-engineering-manpower-supply.jpg',
      alt: 'Specialist engineering manpower and certified technicians on site in UAE',
    },
  },
  'surge-protection-and-bonding': {
    eyebrow: 'Transient Defense',
    icon: ShieldCheck,
    image: {
      url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=85',
      alt: 'Surge protection device installation and equipotential bonding',
    },
  },
};

const DEFAULT_META = {
  eyebrow: 'Engineering Services',
  icon: Wrench,
  image: {
    url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=85',
    alt: 'Technical engineering services and industrial support',
  },
};

export default async function ServicesPreview() {
  const servicesAll = await getPublishedServices();
  const services = servicesAll.slice(0, 3);

  return (
    <section
      aria-labelledby="services-preview-heading"
      className="py-16 md:py-24 lg:py-32 bg-[#0D1117] relative border-t border-b border-white/[0.08] overflow-hidden"
    >
      {/* Subtle Background Radial Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#8DC63F]/[0.025] blur-[140px] pointer-events-none rounded-full"
        aria-hidden="true"
      />

      <div className="max-w-[80rem] mx-auto px-5 sm:px-6 lg:px-8 space-y-12 lg:space-y-16 relative z-10">
        {/* Header Block */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <SectionHeader
            id="services-preview-heading"
            eyebrow="Specialised Services"
            title="Engineered Turnkey Solutions"
            description="From consultation and risk evaluation to site installation guidance and after-sales support."
          />

          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#8DC63F] hover:text-white transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] rounded px-1 py-0.5 shrink-0"
          >
            <span>View all services ({servicesAll.length})</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* 3-Column Architectural Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-8 items-stretch">
          {services.map((service, index) => {
            const meta = SERVICE_META[service.slug] || DEFAULT_META;
            const IconComponent = meta.icon;

            const imageData =
              (service.content as any)?.hero?.imageUrl
                ? {
                    url: (service.content as any).hero.imageUrl,
                    alt: service.title,
                  }
                : meta.image;

            const formattedIndex = String(index + 1).padStart(2, '0');

            return (
              <Reveal key={service.id} staggerIndex={index} className="h-full">
                <Link
                  href={`/services/${service.slug}`}
                  className="group relative flex flex-col h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] rounded-[24px]"
                >
                  {/* Top Image Container with High-Res Photography */}
                  <div className="relative w-full h-[260px] sm:h-[280px] lg:h-[300px] rounded-[20px] overflow-hidden bg-[#050608] border border-white/[0.08] shadow-xl group-hover:border-[#8DC63F]/40 transition-all duration-500">
                    <Image
                      src={imageData.url}
                      alt={imageData.alt}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    {/* Gradient Overlay for Depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/40 pointer-events-none" />

                    {/* Top Floating Badge: Index & Icon */}
                    <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#050608]/85 backdrop-blur-md border border-white/15 text-xs font-semibold text-white shadow-lg">
                      <span className="font-mono text-[#8DC63F] font-bold text-[11px]">
                        {formattedIndex}
                      </span>
                      <span className="text-white/20">•</span>
                      <IconComponent className="w-3.5 h-3.5 text-white/90" />
                    </div>

                    {/* Top Right Quick Action Indicator */}
                    <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#050608]/80 backdrop-blur-md border border-white/15 flex items-center justify-center text-white/70 group-hover:text-[#8DC63F] group-hover:border-[#8DC63F]/50 group-hover:scale-110 transition-all duration-300 shadow-lg">
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>

                  {/* Overlapping Elevated Architectural Card */}
                  <div className="-mt-16 sm:-mt-20 relative z-10 mx-2.5 sm:mx-4 flex-1 flex flex-col justify-between p-6 sm:p-8 rounded-[20px] bg-[#0A0E17]/95 backdrop-blur-xl border border-white/[0.1] shadow-[0_20px_50px_rgba(0,0,0,0.85)] group-hover:border-[#8DC63F]/50 group-hover:shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_35px_rgba(141,198,63,0.12)] group-hover:-translate-y-1 transition-all duration-500">
                    <div>
                      {/* Eyebrow Category */}
                      <div className="flex items-center gap-2.5 mb-3.5">
                        <span className="w-2 h-2 rounded-full bg-[#8DC63F] animate-pulse" />
                        <span className="text-[13px] sm:text-[13px] font-bold uppercase tracking-wider text-[#8DC63F]">
                          {meta.eyebrow}
                        </span>
                      </div>

                      {/* Service Title */}
                      <h3 className="text-[22px] sm:text-2xl lg:text-[26px] font-bold text-white group-hover:text-[#8DC63F] transition-colors leading-[1.28] mb-3.5">
                        {service.title}
                      </h3>

                      {/* Service Summary */}
                      <p className="text-[15px] sm:text-[15px] lg:text-base text-[#E2E8F0] font-normal leading-[1.6]">
                        {service.summary}
                      </p>
                    </div>

                    {/* Bottom Action Area: Read More with Animated Underline */}
                    <div className="mt-6 pt-5 border-t border-white/[0.08] flex items-center justify-between">
                      <div className="relative inline-flex items-center gap-2.5 text-base font-bold text-white group-hover:text-[#8DC63F] transition-colors">
                        <span>Read More</span>
                        <ArrowRight className="w-5 h-5 text-[#8DC63F] group-hover:translate-x-1.5 transition-transform duration-300" />
                        <span className="absolute -bottom-1 left-0 w-8 h-[2.5px] bg-[#8DC63F] group-hover:w-full transition-all duration-300 rounded-full" />
                      </div>

                      {/* Subtle Meta Chip / Standards Indicator */}
                      {service.metaChips && service.metaChips.length > 0 && (
                        <span className="text-xs sm:text-[13px] font-semibold text-white/70 bg-white/[0.08] border border-white/10 px-3 py-1 rounded-full transition-colors truncate max-w-[140px]">
                          {service.metaChips[0]}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
