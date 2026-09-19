import React from 'react';
import {
  BadgeCheck,
  Layers,
  ClipboardCheck,
  ScrollText,
  SlidersHorizontal,
  ShieldCheck,
  LucideIcon,
} from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import Card from '@/components/ui/Card';
import Reveal from '@/components/ui/Reveal';
import Accordion, { AccordionItemData } from '@/components/ui/Accordion';
import { WHY_CHOOSE_US_ITEMS } from '@/config/why-choose-us';

const ICON_MAP: Record<string, LucideIcon> = {
  BadgeCheck,
  Layers,
  ClipboardCheck,
  ScrollText,
  SlidersHorizontal,
  ShieldCheck,
};

export default function WhyChooseUs() {
  // Convert config items to AccordionItemData for mobile accordion
  const accordionItems: AccordionItemData[] = WHY_CHOOSE_US_ITEMS.map((item) => ({
    id: item.id,
    number: item.number,
    iconName: item.iconName,
    title: item.title,
    description: item.description,
  }));

  return (
    <section
      aria-labelledby="why-choose-us-heading"
      className="py-16 md:py-24 lg:py-32 bg-[#050608] relative"
    >
      <div className="max-w-[80rem] mx-auto px-5 sm:px-6 lg:px-8 space-y-12 lg:space-y-16">
        {/* Section Header */}
        <SectionHeader
          id="why-choose-us-heading"
          eyebrow="Why Vision Energy"
          title="A Partner You Can Rely On"
          description="We combine specialist knowledge, quality-assured products and responsive support to keep your project on track."
        />

        {/* MOBILE (below md): Single-column Accordion list */}
        <div className="block md:hidden">
          <Reveal staggerIndex={0}>
            <Accordion items={accordionItems} defaultOpenIndex={0} />
          </Reveal>
        </div>

        {/* DESKTOP (md and up): 3 x 2 Grid of static Cards */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE_US_ITEMS.map((item, i) => {
            const IconComponent = ICON_MAP[item.iconName];

            return (
              <Reveal key={item.id} staggerIndex={i} className="h-full flex flex-col flex-1">
                <Card className="h-full">
                  <div className="h-full flex flex-col flex-1">
                    {/* Top Row: Index number & 48px Icon Square */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#A9B4C0] uppercase tracking-widest">
                        {item.number}
                      </span>
                      <div className="w-12 h-12 rounded-xl bg-[#0B65B3]/10 text-[#0B65B3] flex items-center justify-center border border-[#0B65B3]/20 group-hover:scale-105 group-hover:text-[#8DC63F] group-hover:bg-[#8DC63F]/10 group-hover:border-[#8DC63F]/30 transition-all duration-300 shrink-0">
                        <IconComponent className="w-6 h-6 stroke-[1.5]" />
                      </div>
                    </div>

                    {/* Title with 32px top margin */}
                    <h3 className="mt-8 text-[clamp(1.25rem,1.6vw,1.625rem)] font-semibold text-white leading-[1.25] group-hover:text-[#8DC63F] transition-colors [text-wrap:balance]">
                      {item.title}
                    </h3>

                    {/* Description with 12px top margin */}
                    <p className="mt-3 text-base text-[#A9B4C0] leading-[1.7] max-w-[60ch]">
                      {item.description}
                    </p>
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </div>

        {/* COMMITMENT STRIP BELOW ITEMS */}
        <Reveal staggerIndex={7}>
          <div className="p-[1px] rounded-[24px] bg-gradient-to-r from-[#0B65B3]/40 via-[#8DC63F]/40 to-[#0B65B3]/40">
            <div className="bg-[#0D1117] rounded-[23px] p-6 lg:p-10 flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
              {/* ShieldCheck Icon in Lime-tinted Circle */}
              <div className="w-10 h-10 rounded-full bg-[#8DC63F]/10 text-[#8DC63F] border border-[#8DC63F]/20 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 stroke-[1.5]" />
              </div>

              {/* Exact Commitment Text */}
              <p className="text-base text-white/90 leading-[1.7] max-w-[70ch]">
                We do not supply, support, or promote dangerous, harmful, or non-compliant products
                that fail to meet recognised international standards. Instead, we provide
                responsible, certified, and eco-conscious alternatives that protect people, assets,
                and the environment.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
