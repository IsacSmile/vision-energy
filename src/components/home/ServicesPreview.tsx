import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Wrench, ShieldCheck, FileCheck, Headset } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import Reveal from '@/components/ui/Reveal';
import { getPublishedServices } from '@/lib/data/services';

const SERVICE_ICONS = [ShieldCheck, Wrench, FileCheck, Headset];

const SERVICE_IMAGES: Record<string, { url: string; alt: string }> = {
  'external-lightning-protection-installation': {
    url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=85',
    alt: 'External lightning protection installation and engineering testing',
  },
  'manpower-supply': {
    url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=85',
    alt: 'Specialist engineering manpower and certified technicians on site',
  },
};

const DEFAULT_SERVICE_IMAGE = {
  url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=85',
  alt: 'Technical engineering services and industrial support',
};

export default async function ServicesPreview() {
  const servicesAll = await getPublishedServices();
  const services = servicesAll.slice(0, 4);

  return (
    <section
      aria-labelledby="services-preview-heading"
      className="py-16 md:py-24 lg:py-32 bg-[#0D1117] relative border-t border-b border-white/[0.08]"
    >
      <div className="max-w-[80rem] mx-auto px-5 sm:px-6 lg:px-8 space-y-12 lg:space-y-16">
        {/* Header Block */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <SectionHeader
            id="services-preview-heading"
            eyebrow="Services"
            title="Specialised Technical Support"
            description="From consultation and risk evaluation to site installation guidance and after-sales support."
          />

          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#8DC63F] hover:text-white transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] rounded px-1 py-0.5 shrink-0"
          >
            <span>View all services</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Services Grid with Rich Media Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const IconComponent = SERVICE_ICONS[index % SERVICE_ICONS.length];
            const imageData =
              (service.content as any)?.hero?.imageUrl
                ? {
                    url: (service.content as any).hero.imageUrl,
                    alt: service.title,
                  }
                : SERVICE_IMAGES[service.slug] || DEFAULT_SERVICE_IMAGE;

            return (
              <Reveal key={service.id} staggerIndex={index}>
                <Link
                  href={`/services#${service.slug}`}
                  className="group h-full rounded-[24px] bg-[#050608] border border-white/[0.08] hover:border-[#8DC63F]/50 overflow-hidden transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-[#8DC63F]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] flex flex-col justify-between"
                >
                  {/* Top Image Banner */}
                  <div className="relative w-full h-48 sm:h-56 overflow-hidden bg-[#0D1117]">
                    <Image
                      src={imageData.url}
                      alt={imageData.alt}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    
                    {/* Gradient Overlay for seamless blend into card */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-[#050608]/40 to-transparent" />

                    {/* Floating Icon Badge */}
                    <div className="absolute top-4 left-4 w-11 h-11 rounded-xl bg-[#0D1117]/85 backdrop-blur-md text-[#8DC63F] border border-white/15 flex items-center justify-center shadow-lg group-hover:border-[#8DC63F]/50 group-hover:bg-[#8DC63F]/15 transition-all">
                      <IconComponent className="w-5 h-5 stroke-[1.5]" />
                    </div>

                    {/* Arrow Action Indicator */}
                    <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#0D1117]/80 backdrop-blur-md text-[#A9B4C0] border border-white/10 flex items-center justify-center group-hover:text-[#8DC63F] group-hover:border-[#8DC63F]/40 transition-all">
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 lg:p-7 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl lg:text-2xl font-semibold text-white group-hover:text-[#8DC63F] transition-colors mb-2.5">
                        {service.title}
                      </h3>

                      <p className="text-sm lg:text-[15px] text-[#A9B4C0] leading-[1.6] line-clamp-3">
                        {service.summary}
                      </p>
                    </div>

                    <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-semibold text-[#8DC63F] group-hover:underline">
                      <span>Explore Service Details</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
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
