'use client';

import React, { useState, useEffect } from 'react';
import {
  BadgeCheck,
  Layers,
  ClipboardCheck,
  ScrollText,
  SlidersHorizontal,
  ShieldCheck,
  ChevronDown,
  LucideIcon,
} from 'lucide-react';

const ACCORDION_ICON_MAP: Record<string, LucideIcon> = {
  BadgeCheck,
  Layers,
  ClipboardCheck,
  ScrollText,
  SlidersHorizontal,
  ShieldCheck,
};

export interface AccordionItemData {
  id: string;
  number?: string;
  iconName?: string;
  title: string;
  description: string;
}

interface AccordionProps {
  items: AccordionItemData[];
  defaultOpenIndex?: number;
  className?: string;
}

export default function Accordion({
  items,
  defaultOpenIndex = 0,
  className = '',
}: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className={`w-full divide-y divide-white/[0.08] border-y border-white/[0.08] ${className}`}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const IconComponent = item.iconName ? ACCORDION_ICON_MAP[item.iconName] : null;
        const buttonId = `accordion-button-${item.id}`;
        const regionId = `accordion-region-${item.id}`;

        return (
          <div key={item.id} className="w-full">
            {/* Accordion Row Header / Button */}
            <button
              id={buttonId}
              type="button"
              onClick={() => toggleItem(index)}
              aria-expanded={isOpen}
              aria-controls={regionId}
              className="w-full min-h-[64px] py-4 flex items-center justify-between gap-4 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] rounded-lg px-2 transition-colors hover:bg-white/[0.02]"
            >
              <div className="flex items-center gap-3.5 sm:gap-4 flex-1">
                {/* Number */}
                {item.number && (
                  <span className="text-xs sm:text-sm font-semibold text-[#A9B4C0] uppercase tracking-widest shrink-0 w-6">
                    {item.number}
                  </span>
                )}

                {/* Icon */}
                {IconComponent && (
                  <div className="w-9 h-9 rounded-lg bg-[#0B65B3]/10 text-[#0B65B3] group-hover:text-[#8DC63F] group-hover:bg-[#8DC63F]/10 flex items-center justify-center border border-[#0B65B3]/20 group-hover:border-[#8DC63F]/30 transition-colors shrink-0">
                    <IconComponent className="w-5 h-5 stroke-[1.5]" />
                  </div>
                )}

                {/* Title */}
                <span className={`text-base sm:text-lg font-semibold transition-colors leading-snug ${
                  isOpen ? 'text-[#8DC63F]' : 'text-white group-hover:text-[#8DC63F]'
                }`}>
                  {item.title}
                </span>
              </div>

              {/* Chevron Icon */}
              <ChevronDown
                className={`w-5 h-5 text-[#A9B4C0] shrink-0 transition-transform duration-300 ${
                  isOpen ? 'rotate-180 text-[#8DC63F]' : 'group-hover:text-white'
                }`}
              />
            </button>

            {/* Accordion Region / Collapsible Description */}
            <div
              id={regionId}
              role="region"
              aria-labelledby={buttonId}
              className={`grid ${
                prefersReducedMotion
                  ? isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  : `transition-all duration-300 ease-in-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100 pb-4' : 'grid-rows-[0fr] opacity-0 pb-0'
                    }`
              }`}
            >
              <div className="overflow-hidden pl-10 sm:pl-14 pr-4">
                <p className="text-sm sm:text-base text-[#A9B4C0] leading-[1.7]">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
