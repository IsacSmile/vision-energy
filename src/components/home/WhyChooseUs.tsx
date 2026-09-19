'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import {
  WHY_CHOOSE_US_HEADER,
  WHY_CHOOSE_US_ITEMS,
  OUR_COMMITMENT_PULL_QUOTE,
} from '@/config/why-choose-us';

export default function WhyChooseUs() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const rowRefs = useRef<(HTMLLIElement | null)[]>([]);

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // IntersectionObserver for active row tracking at vertical center of viewport (-45% top, -45% bottom)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const indexStr = entry.target.getAttribute('data-index');
            if (indexStr !== null) {
              setActiveIndex(parseInt(indexStr, 10));
            }
          }
        });
      },
      {
        root: null,
        rootMargin: '-45% 0px -45% 0px',
        threshold: 0,
      }
    );

    const currentRefs = rowRefs.current;
    currentRefs.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      currentRefs.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  // Calculate progress fill ratio (01 to 06)
  const progressRatio = (activeIndex + 1) / WHY_CHOOSE_US_ITEMS.length;

  return (
    <section
      aria-labelledby="why-choose-us-heading"
      className="py-16 md:py-24 lg:py-32 bg-[#050608] relative border-t border-b border-white/[0.08]"
    >
      <div className="max-w-[80rem] mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-24 gap-y-12">
          {/* LEFT COLUMN: Sticky on Desktop (lg:col-span-5) */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start space-y-8">
            {/* Header: Eyebrow, H2, Description */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-6 h-[1.5px] bg-[#8DC63F]" />
                <span className="text-xs uppercase tracking-widest text-[#8DC63F] font-semibold">
                  {WHY_CHOOSE_US_HEADER.eyebrow}
                </span>
              </div>
              <h2
                id="why-choose-us-heading"
                className="text-[clamp(1.75rem,4.2vw,3rem)] font-semibold text-white leading-[1.15] tracking-[-0.02em] [text-wrap:balance]"
              >
                {WHY_CHOOSE_US_HEADER.title}
              </h2>
              <p className="text-base md:text-[1.0625rem] text-[#A9B4C0] leading-[1.7]">
                {WHY_CHOOSE_US_HEADER.description}
              </p>
            </div>

            {/* DESKTOP-ONLY PULL-QUOTE & COMMITMENT */}
            <div className="hidden lg:block pt-8 space-y-6">
              {/* 40px Lime Hairline */}
              <div className="w-10 h-[1px] bg-[#8DC63F]" />

              {/* Eyebrow */}
              <span className="text-xs uppercase tracking-widest text-[#8DC63F] font-semibold block">
                Our commitment
              </span>

              {/* Bare ShieldCheck Icon & Blockquote */}
              <blockquote className="border-l-2 border-[#8DC63F] pl-6 space-y-4">
                <ShieldCheck className="w-5 h-5 text-[#8DC63F] stroke-[1.5]" />
                <p className="text-[clamp(1.125rem,1.7vw,1.5rem)] font-normal leading-[1.6] text-white/95 max-w-[34ch]">
                  {OUR_COMMITMENT_PULL_QUOTE}
                </p>
              </blockquote>
            </div>
          </div>

          {/* RIGHT COLUMN: The List (lg:col-span-7) */}
          <div className="lg:col-span-7 relative">
            {/* PROGRESS LINE */}
            <div
              className="absolute -left-3 sm:-left-4 top-0 bottom-0 w-[2px] bg-white/[0.08]"
              aria-hidden="true"
            >
              <div
                className={`w-full bg-[#8DC63F] origin-top ${
                  prefersReducedMotion ? '' : 'transition-transform duration-400 ease-out'
                }`}
                style={{
                  height: '100%',
                  transform: `scaleY(${progressRatio})`,
                }}
              />
            </div>

            {/* SEMANTIC OL LIST */}
            <ol className="relative divide-y divide-white/[0.08] border-y border-white/[0.08]">
              {WHY_CHOOSE_US_ITEMS.map((item, index) => {
                const isActive = activeIndex === index;

                return (
                  <Reveal key={item.id} staggerIndex={index}>
                    <li
                      ref={(el) => {
                        rowRefs.current[index] = el;
                      }}
                      data-index={index}
                      className="group relative py-6 lg:py-9 transition-colors duration-300"
                    >
                      {/* Hover bottom hairline gradient effect (Desktop hover devices only) */}
                      <div
                        className="pointer-events-none absolute bottom-0 left-0 right-0 h-[1px] bg-transparent lg:group-hover:bg-[linear-gradient(90deg,#0B65B3,#8DC63F)] transition-colors duration-300"
                        aria-hidden="true"
                      />

                      {/* Content wrapper with translateX on hover */}
                      <div
                        className={`grid grid-cols-1 md:grid-cols-[56px_1fr] gap-2 md:gap-x-0 ${
                          prefersReducedMotion
                            ? ''
                            : 'lg:group-hover:translate-x-2 transition-transform duration-300'
                        }`}
                      >
                        {/* Number (Monospace, 13px, tracking 0.08em) */}
                        <div className="pt-0.5">
                          <span
                            className={`font-mono text-[13px] tracking-[0.08em] tabular-nums transition-colors duration-300 ${
                              isActive ? 'text-[#8DC63F] font-semibold' : 'text-[#A9B4C0]'
                            }`}
                          >
                            {item.number}
                          </span>
                        </div>

                        {/* Title & Description Stack */}
                        <div className="space-y-3">
                          {/* Title */}
                          <h3
                            className={`text-[clamp(1.25rem,2.2vw,1.875rem)] font-medium tracking-[-0.01em] leading-[1.2] transition-colors duration-300 ${
                              isActive
                                ? 'text-white'
                                : 'text-white/60 lg:group-hover:text-white'
                            }`}
                          >
                            {item.title}
                          </h3>

                          {/* Description */}
                          <p className="text-base lg:text-[1.0625rem] text-[#A9B4C0] leading-[1.7] max-w-[52ch]">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </li>
                  </Reveal>
                );
              })}
            </ol>

            {/* MOBILE-ONLY PULL-QUOTE & COMMITMENT (Below list) */}
            <div className="block lg:hidden mt-12 pt-8 space-y-6">
              {/* 40px Lime Hairline */}
              <div className="w-10 h-[1px] bg-[#8DC63F]" />

              {/* Eyebrow */}
              <span className="text-xs uppercase tracking-widest text-[#8DC63F] font-semibold block">
                Our commitment
              </span>

              {/* Bare ShieldCheck Icon & Blockquote */}
              <blockquote className="border-l-2 border-[#8DC63F] pl-6 space-y-4">
                <ShieldCheck className="w-5 h-5 text-[#8DC63F] stroke-[1.5]" />
                <p className="text-[clamp(1.125rem,1.7vw,1.5rem)] font-normal leading-[1.6] text-white/95">
                  {OUR_COMMITMENT_PULL_QUOTE}
                </p>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
