'use client';

import React, { useState, useEffect, useRef } from 'react';

interface FactsStripProps {
  establishedYear: string;
  locationsCount: number;
  categoriesCount: number;
  sectorsCount: number;
}

export default function FactsStrip({
  establishedYear,
  locationsCount,
  categoriesCount,
  sectorsCount,
}: FactsStripProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [locationsDisplay, setLocationsDisplay] = useState(locationsCount);
  const [categoriesDisplay, setCategoriesDisplay] = useState(categoriesCount);
  const [sectorsDisplay, setSectorsDisplay] = useState(sectorsCount);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const media = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(media.matches);
      const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      media.addEventListener('change', handler);
      return () => media.removeEventListener('change', handler);
    }
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const duration = 1200; // 1.2 seconds
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out quad formula
            const easeOut = 1 - (1 - progress) * (1 - progress);

            setLocationsDisplay(Math.round(easeOut * locationsCount));
            setCategoriesDisplay(Math.round(easeOut * categoriesCount));
            setSectorsDisplay(Math.round(easeOut * sectorsCount));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasAnimated, locationsCount, categoriesCount, sectorsCount, prefersReducedMotion]);

  const facts = [
    {
      value: establishedYear,
      label: 'ESTABLISHED',
      isStatic: true,
    },
    {
      value: locationsDisplay.toString(),
      label: 'UAE LOCATIONS',
      isStatic: false,
    },
    {
      value: categoriesDisplay.toString(),
      label: 'PRODUCT CATEGORIES',
      isStatic: false,
    },
    {
      value: sectorsDisplay.toString(),
      label: 'SECTORS SERVED',
      isStatic: false,
    },
  ];

  return (
    <div
      ref={containerRef}
      className="pt-8 lg:pt-12 mt-12 lg:mt-16 border-t border-[#1F2937]"
      aria-label="Key facts"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4 md:gap-x-0">
        {facts.map((fact, idx) => (
          <div
            key={fact.label}
            className="md:border-r md:border-[#1F2937] md:last:border-r-0 md:px-8 first:pl-0 last:pr-0 space-y-1"
          >
            <div className="text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-tight text-white tabular-nums">
              {fact.value}
            </div>
            <div className="text-[12px] font-semibold text-[#A9B4C0] uppercase tracking-[0.14em]">
              {fact.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
