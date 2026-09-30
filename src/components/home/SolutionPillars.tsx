import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Zap,
  Wrench,
  Sun,
  ShieldCheck,
  ClipboardCheck,
  ArrowRight,
  ArrowUpRight,
} from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import Reveal from '@/components/ui/Reveal';
import { PILLARS_CONFIG } from '@/config/pillars';

const ICON_MAP = {
  Zap,
  Wrench,
  Sun,
  ShieldCheck,
  ClipboardCheck,
};

interface SolutionPillarsProps {
  countsByPillarId?: Record<string, number>;
}

export default function SolutionPillars({ countsByPillarId = {} }: SolutionPillarsProps) {
  return (
    <section
      aria-labelledby="solution-pillars-heading"
      className="py-16 md:py-24 lg:py-32 bg-[#0D1117] relative border-t border-white/[0.08]"
    >
      <div className="max-w-[80rem] mx-auto px-5 sm:px-6 lg:px-8 space-y-12 lg:space-y-16">
        <SectionHeader
          id="solution-pillars-heading"
          eyebrow="What we deliver"
          title="Solutions Built Around Your Project"
        />

        {/* 6-column Grid layout: Top 3 take 2 cols each, Bottom 2 take 3 cols each */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          {PILLARS_CONFIG.map((pillar, i) => {
            const IconComponent = ICON_MAP[pillar.iconName];
            const categoryCount = countsByPillarId[pillar.id];

            const metaText =
              pillar.metaOverride ||
              (categoryCount !== undefined
                ? `${categoryCount} product ${categoryCount === 1 ? 'category' : 'categories'}`
                : 'Explore categories');

            const lgColSpan = i < 3 ? 'lg:col-span-2' : 'lg:col-span-3';

            const borderClass = pillar.highlightBorder
              ? 'border-[#8DC63F]/50 shadow-[0_0_25px_rgba(141,198,63,0.1)]'
              : 'border-white/[0.08] hover:border-[#8DC63F]/50';

            return (
              <Reveal
                key={pillar.id}
                staggerIndex={i}
                className={`h-full flex flex-col flex-1 ${lgColSpan}`}
              >
                <Link
                  href={pillar.href}
                  className={`group block h-full rounded-[22px] bg-[#050608] border ${borderClass} overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#8DC63F]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] flex flex-col justify-between`}
                >
                  {/* Top Image Banner with Badges */}
                  <div className="relative w-full h-44 sm:h-48 overflow-hidden bg-[#0D1117]">
                    <Image
                      src={pillar.imageUrl}
                      alt={pillar.imageAlt}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    {/* Gradient overlay for seamless blending into card body */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-[#050608]/45 to-transparent" />

                    {/* Top Left: Pillar Index Number */}
                    <div className="absolute top-3.5 left-3.5 px-2.5 py-1 rounded-md bg-[#0D1117]/85 backdrop-blur-md border border-white/10 text-[11px] font-bold text-white tracking-widest uppercase">
                      {pillar.index}
                    </div>

                    {/* Top Right: Icon Square Badge */}
                    <div className="absolute top-3.5 right-3.5 w-10 h-10 rounded-xl bg-[#0D1117]/85 backdrop-blur-md text-[#8DC63F] border border-white/15 flex items-center justify-center shadow-lg group-hover:border-[#8DC63F]/50 group-hover:bg-[#8DC63F]/15 transition-all">
                      <IconComponent className="w-5 h-5 stroke-[1.5]" />
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Title */}
                      <h3 className="text-lg sm:text-xl font-semibold text-white leading-[1.3] group-hover:text-[#8DC63F] transition-colors">
                        {pillar.title}
                      </h3>

                      {/* Description */}
                      <p className="mt-2.5 text-xs sm:text-sm text-[#A9B4C0] leading-[1.6]">
                        {pillar.description}
                      </p>
                    </div>

                    {/* Bottom Row: Meta count & Explore link */}
                    <div className="mt-5 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs">
                      <span className="text-[#A9B4C0] font-medium">{metaText}</span>
                      <span className="inline-flex items-center gap-1 font-semibold text-[#8DC63F] group-hover:underline">
                        <span>Explore</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#8DC63F] transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
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
