import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Wrench, ShieldCheck, FileCheck, Headset } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import Reveal from '@/components/ui/Reveal';
import { getPublishedServices } from '@/lib/data/services';

const SERVICE_ICONS = [ShieldCheck, Wrench, FileCheck, Headset];

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

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => {
            const IconComponent = SERVICE_ICONS[index % SERVICE_ICONS.length];

            return (
              <Reveal key={service.id} staggerIndex={index}>
                <Link
                  href={`/services#${service.slug}`}
                  className="group block h-full p-6 lg:p-8 rounded-[24px] bg-[#050608] border border-white/[0.08] hover:border-[#8DC63F]/40 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F]"
                >
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#8DC63F]/10 text-[#8DC63F] border border-[#8DC63F]/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <IconComponent className="w-6 h-6 stroke-[1.5]" />
                    </div>

                    <ArrowUpRight className="w-5 h-5 text-[#A9B4C0] group-hover:text-[#8DC63F] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>

                  <h3 className="text-xl lg:text-2xl font-semibold text-white group-hover:text-[#8DC63F] transition-colors mb-3">
                    {service.title}
                  </h3>

                  <p className="text-sm lg:text-base text-[#A9B4C0] leading-[1.6] line-clamp-3">
                    {service.summary}
                  </p>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
