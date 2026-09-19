import React from 'react';
import {
  Zap,
  Wrench,
  Sun,
  ShieldCheck,
  ClipboardCheck,
  ArrowRight,
} from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import Card from '@/components/ui/Card';
import Reveal from '@/components/ui/Reveal';
import SwipeCarousel from '@/components/ui/SwipeCarousel';
import { PILLARS_CONFIG } from '@/config/pillars';

const ICON_MAP = {
  Zap,
  Wrench,
  Sun,
  ShieldCheck,
  ClipboardCheck,
};

const ITEM_CLASSES = [
  'lg:col-span-2',
  'lg:col-span-2',
  'lg:col-span-2',
  'lg:col-span-3',
  'lg:col-span-3',
];

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

        {/* Swipe Carousel on mobile (< lg), 6-column Grid on lg+ */}
        <SwipeCarousel
          ariaLabel="Five Core Engineering Solution Pillars"
          lgGridClass="lg:grid lg:grid-cols-6 lg:gap-6"
          itemClasses={ITEM_CLASSES}
        >
          {PILLARS_CONFIG.map((pillar, i) => {
            const IconComponent = ICON_MAP[pillar.iconName];
            const categoryCount = countsByPillarId[pillar.id];

            const metaText =
              pillar.metaOverride ||
              (categoryCount !== undefined
                ? `${categoryCount} product ${categoryCount === 1 ? 'category' : 'categories'}`
                : 'Explore categories');

            return (
              <Reveal key={pillar.id} staggerIndex={i} className="h-full flex flex-col flex-1">
                <Card
                  href={pillar.href}
                  highlightBorder={pillar.highlightBorder}
                  className="h-full"
                >
                  <div className="h-full flex flex-col flex-1">
                    {/* Top Row: Index number & 48px Icon Square */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#A9B4C0] uppercase tracking-widest">
                        {pillar.index}
                      </span>
                      <div className="w-12 h-12 rounded-xl bg-[#0B65B3]/10 text-[#0B65B3] flex items-center justify-center border border-[#0B65B3]/20 group-hover:scale-105 transition-transform duration-300 shrink-0">
                        <IconComponent className="w-6 h-6 stroke-[1.5]" />
                      </div>
                    </div>

                    {/* Title with 32px top margin */}
                    <h3 className="mt-8 text-[clamp(1.25rem,1.6vw,1.625rem)] font-semibold text-white leading-[1.25] group-hover:text-[#8DC63F] transition-colors [text-wrap:balance]">
                      {pillar.title}
                    </h3>

                    {/* Description with 12px top margin */}
                    <p className="mt-3 text-base text-[#A9B4C0] leading-[1.7] max-w-[60ch]">
                      {pillar.description}
                    </p>

                    {/* Bottom Row: Meta count & Explore link */}
                    <div className="mt-auto pt-6 border-t border-white/[0.08] flex items-center justify-between text-xs">
                      <span className="text-[#A9B4C0] font-medium">{metaText}</span>
                      <span className="inline-flex items-center gap-1.5 font-semibold text-[#8DC63F] group-hover:underline">
                        <span>Explore</span>
                        <ArrowRight className="w-4 h-4 text-[#8DC63F] transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </SwipeCarousel>
      </div>
    </section>
  );
}
