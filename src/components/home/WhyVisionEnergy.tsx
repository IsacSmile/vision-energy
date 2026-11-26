'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Reveal from '@/components/ui/Reveal';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';

// Decent, authentic industrial engineering icons (designed specifically for UAE engineering & infrastructure sectors, avoiding generic AI template cliches)
function CommercialIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M3 21h18" />
      <path d="M5 21V6a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v15" />
      <path d="M14 11h5a1 1 0 0 1 1 1v9" />
      <path d="M8 9h3M8 13h3M8 17h3" />
      <path d="M17 14.5h.01M17 17.5h.01" />
    </svg>
  );
}

function HighRiseIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M4 21h16" />
      <path d="M7 21V8.5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1V21" />
      <path d="M13 21V4.5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1V21" />
      <path d="M15.5 3.5V1.5" />
      <path d="M10 11h.01M10 14h.01M10 17h.01" />
      <path d="M15.5 8h.01M15.5 12h.01M15.5 16h.01" />
    </svg>
  );
}

function WarehouseLogisticsIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M3 20h18" />
      <path d="M4 20V9l8-4 8 4v11" />
      <path d="M8 20v-5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v5" />
      <path d="M10.5 14v6M13.5 14v6" />
      <path d="M8 9.5l4-2 4 2" />
    </svg>
  );
}

function IndustrialPlantIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M3 21h18" />
      <path d="M4 21V7a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v14" />
      <path d="M11 12h8a1 1 0 0 1 1 1v8" />
      <path d="M7 3v3M9 3v3" />
      <circle cx="7.5" cy="11.5" r="1.5" />
      <circle cx="7.5" cy="16.5" r="1.5" />
      <path d="M14 16h3M14 18.5h3" />
    </svg>
  );
}

function OilGasIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M3 21h18" />
      <path d="M7 21L11 4h2l4 17" />
      <path d="M8.5 15h7" />
      <path d="M10 10h4" />
      <path d="M11 4V2h2v2" />
      <path d="M8.8 15L13.8 10" />
      <path d="M15.2 15L10.2 10" />
    </svg>
  );
}

function SubstationUtilityIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M4 22h16" />
      <path d="M7.5 22L11 3h2l3.5 19" />
      <path d="M5 8h14" />
      <path d="M3.5 13.5h17" />
      <path d="M7 18h10" />
      <path d="M12 3V1.5" />
      <path d="M8.5 8l7 5.5" />
      <path d="M15.5 8l-7 5.5" />
    </svg>
  );
}

function HealthcareInstitutionalIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M3 21h18" />
      <path d="M5 21V5a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v16" />
      <path d="M12 7.5v5M9.5 10h5" />
      <path d="M9.5 21v-4a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v4" />
      <path d="M7.5 17h.01M16.5 17h.01" />
    </svg>
  );
}

function ModernVillaIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M2 20h20" />
      <path d="M4 20V10l4-3h10a1 1 0 0 1 1 1v12" />
      <path d="M8 7v13" />
      <path d="M2 10.5h6" />
      <path d="M12 11h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4z" />
      <path d="M5.5 14h.01M5.5 17h.01" />
    </svg>
  );
}

function DefenceMilitaryIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 2l7 3.5v5.5c0 5-3.5 8.8-7 10.5-3.5-1.7-7-5.5-7-10.5V5.5L12 2z" />
      <path d="M9 10l3-3 3 3" />
      <path d="M9 14l3-3 3 3" />
    </svg>
  );
}

function CriticalDataSecurityIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 2l7 3.5v5.5c0 5-3.5 8.8-7 10.5-3.5-1.7-7-5.5-7-10.5V5.5L12 2z" />
      <path d="M8.5 8h7M8.5 11.5h7M8.5 15h7" />
      <circle cx="10" cy="8" r=".5" fill="currentColor" />
      <circle cx="10" cy="11.5" r=".5" fill="currentColor" />
      <circle cx="10" cy="15" r=".5" fill="currentColor" />
    </svg>
  );
}

const SECTORS = [
  { name: 'Commercial & Residential Developments', shortName: 'Commercial & Residential', icon: CommercialIcon },
  { name: 'High-Rise & Mixed-Use Buildings', shortName: 'High-Rise & Mixed-Use', icon: HighRiseIcon },
  { name: 'Warehouses & Logistics Facilities', shortName: 'Warehouses & Logistics', icon: WarehouseLogisticsIcon },
  { name: 'Industrial Plants & Manufacturing Facilities', shortName: 'Industrial & Manufacturing', icon: IndustrialPlantIcon },
  { name: 'Oil & Gas Support Facilities', shortName: 'Oil & Gas Facilities', icon: OilGasIcon },
  { name: 'Substations, Utility & Telecom Sites', shortName: 'Substations & Telecom', icon: SubstationUtilityIcon },
  { name: 'Hotels, Schools & Healthcare Facilities', shortName: 'Hotels & Healthcare', icon: HealthcareInstitutionalIcon },
  { name: 'Villas, Compounds & Community Facilities', shortName: 'Villas & Compounds', icon: ModernVillaIcon },
  { name: 'Defence & Military Facilities', shortName: 'Defence & Military', icon: DefenceMilitaryIcon },
  { name: 'Data, Security & Critical Installations', shortName: 'Data & Critical Sites', icon: CriticalDataSecurityIcon },
];

const WHY_FEATURE_CARDS = [
  {
    step: '1. Technical Expertise',
    title: 'Product Selection for Your Project',
    points: [
      {
        strong: 'Broad Portfolio:',
        text: 'Electrical, mechanical and renewable energy solutions, laboratory and gym equipment, and specialist lightning protection and earthing systems.',
      },
      {
        strong: 'Specification Review:',
        text: 'We review ratings, materials, dimensions and compatibility against project requirements.',
      },
      {
        strong: 'Practical Alternatives:',
        text: 'Where suitable, we propose options based on performance, availability and budget.',
      },
      {
        strong: 'Technical Submittals:',
        text: 'We provide manufacturer datasheets and supporting documentation for consultant review.',
      },
    ],
  },
  {
    step: '2. Standards & Regulations',
    title: 'Aligned with Project and Authority Requirements',
    points: [
      {
        strong: 'Applicable Standards:',
        text: 'We reference the relevant project and product-specific standards for each scope where permitted by the relevant authority and project specifications.',
      },
      {
        strong: 'Local Authority Requirements:',
        text: 'We account for applicable regulations, technical circulars and notices issued by municipalities and Civil Defence authorities.',
      },
      {
        strong: 'Utility and Energy Requirements:',
        text: 'Where relevant, we support documentation for projects subject to requirements from TAQA, DEWA, DoE, EtihadWE, Sharjah Electricity, Water and Gas Authority, and the ADCDA Civil Defence Authorities.',
      },
    ],
  },
  {
    step: '3. Project Coordination',
    title: 'Support from Enquiry to Handover',
    points: [
      {
        strong: 'Single Point of Contact:',
        text: 'One team coordinates technical queries, quotations, submittals and delivery.',
      },
      {
        strong: 'Site and Design Coordination:',
        text: 'We work with clients, consultants and contractors to address site constraints and installation requirements.',
      },
      {
        strong: 'Installation Support:',
        text: 'We coordinate specialist installation through qualified partners where included in the project scope.',
      },
      {
        strong: 'Testing and Handover:',
        text: 'Where included, we coordinate testing, commissioning and handover documentation.',
      },
    ],
  },
  {
    step: '4. Quality & Sourcing',
    title: 'Products Suited to the Application',
    points: [
      {
        strong: 'Authorised Distribution:',
        text: 'We represent specialist manufacturers in the UAE across selected product lines.',
      },
      {
        strong: 'Application-Specific Selection:',
        text: 'We consider operating conditions such as heat, dust, humidity and corrosion exposure.',
      },
      {
        strong: 'Product Documentation:',
        text: 'We provide available certificates, test reports and manufacturer warranty details as required.',
      },
      {
        strong: 'Supply Planning:',
        text: 'We confirm stock status, lead times and delivery requirements during procurement.',
      },
    ],
  },
  {
    step: '5. Long-Term Performance',
    title: 'Equipment That’s Easier to Maintain',
    points: [
      {
        strong: 'Serviceability:',
        text: 'We consider access for inspection, maintenance and replacement when recommending equipment.',
      },
      {
        strong: 'Spares and Accessories:',
        text: 'We assist with compatible consumables, accessories and replacement parts.',
      },
      {
        strong: 'Operating Documentation:',
        text: 'We provide available manufacturer operation and maintenance manuals.',
      },
      {
        strong: 'After-Sales Support:',
        text: 'We assist with technical queries, warranty coordination and replacement sourcing.',
      },
    ],
  },
];

export default function WhyVisionEnergy() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  // Mouse Drag to Scroll variables
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);
  const hasMoved = useRef(false);

  const checkScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    const cardEl = scrollRef.current.firstElementChild as HTMLElement | null;
    const cardStep = cardEl ? cardEl.offsetWidth + 24 : 380;
    const currentIdx = Math.round(scrollLeft / cardStep);
    setActiveIndex(Math.min(Math.max(currentIdx, 0), WHY_FEATURE_CARDS.length - 1));
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let ticking = false;
    const throttledCheckScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          checkScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    const rafId = requestAnimationFrame(() => {
      checkScroll();
    });

    el.addEventListener('scroll', throttledCheckScroll, { passive: true });
    window.addEventListener('resize', throttledCheckScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      el.removeEventListener('scroll', throttledCheckScroll);
      window.removeEventListener('resize', throttledCheckScroll);
    };
  }, [checkScroll]);

  const getCardStep = () => {
    if (!scrollRef.current) return 380;
    const cardEl = scrollRef.current.firstElementChild as HTMLElement | null;
    return cardEl ? cardEl.offsetWidth + 24 : 380;
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const offset = direction === 'left' ? -getCardStep() : getCardStep();
    scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTo({ left: index * getCardStep(), behavior: 'smooth' });
  };

  // Mouse Drag Events for Desktop Swipe
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    isDragging.current = true;
    hasMoved.current = false;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollStart.current = scrollRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.4;
    if (Math.abs(walk) > 6) {
      hasMoved.current = true;
    }
    scrollRef.current.scrollLeft = scrollStart.current - walk;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
  };

  return (
    <section
      aria-labelledby="why-vision-energy-heading"
      className="py-12 md:py-20 lg:py-24 bg-[#F8FAFC] dark:bg-[#06080D] relative border-b border-slate-200 dark:border-white/[0.08] overflow-hidden"
    >
      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12 relative z-10">
        {/* Section Header with Carousel Navigation Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-3">
            <Reveal staggerIndex={0}>
              <div className="inline-flex items-center gap-2 text-xs sm:text-[13px] font-bold text-[#8DC63F] uppercase tracking-[0.14em]">
                <span className="w-6 h-[2px] bg-[#8DC63F] rounded-full shrink-0" aria-hidden="true" />
                <span>Why Vision Energy</span>
              </div>
            </Reveal>

            <Reveal staggerIndex={1}>
              <h2
                id="why-vision-energy-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-900 dark:text-white leading-[1.2] tracking-[-0.02em] text-balance"
              >
                Specialist Products and Technical Support Across the UAE and GCC
              </h2>
            </Reveal>
          </div>

          {/* Carousel Previous & Next Arrow Controls */}
          <div className="flex items-center gap-2 shrink-0 self-start sm:self-end">
            <button
              type="button"
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              aria-label="Previous feature"
              className={`carousel-nav-btn w-10 h-10 rounded-xl border flex items-center justify-center transition-colors duration-150 ${
                canScrollLeft
                  ? 'bg-white border-slate-300 text-[#0B65B3] hover:bg-[#8DC63F] hover:text-[#050608] hover:border-[#8DC63F] dark:bg-[#0A0E17] dark:border-white/20 dark:text-[#8DC63F] dark:hover:bg-[#8DC63F] dark:hover:text-[#050608] dark:hover:border-[#8DC63F] shadow-sm cursor-pointer'
                  : 'bg-slate-100 border-slate-200 text-slate-400 dark:bg-[#0A0E17]/40 dark:border-white/10 dark:text-white/30 cursor-not-allowed opacity-60'
              }`}
            >
              <ChevronLeft className="w-5 h-5 stroke-[2]" />
            </button>

            <button
              type="button"
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              aria-label="Next feature"
              className={`carousel-nav-btn w-10 h-10 rounded-xl border flex items-center justify-center transition-colors duration-150 ${
                canScrollRight
                  ? 'bg-white border-slate-300 text-[#0B65B3] hover:bg-[#8DC63F] hover:text-[#050608] hover:border-[#8DC63F] dark:bg-[#0A0E17] dark:border-white/20 dark:text-[#8DC63F] dark:hover:bg-[#8DC63F] dark:hover:text-[#050608] dark:hover:border-[#8DC63F] shadow-sm cursor-pointer'
                  : 'bg-slate-100 border-slate-200 text-slate-400 dark:bg-[#0A0E17]/40 dark:border-white/10 dark:text-white/30 cursor-not-allowed opacity-60'
              }`}
            >
              <ChevronRight className="w-5 h-5 stroke-[2]" />
            </button>
          </div>
        </div>

        {/* Feature Cards: Responsive Horizontal Swipeable Carousel */}
        <Reveal staggerIndex={2}>
          <div className="relative">
            <div
              ref={scrollRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              aria-roledescription="carousel"
              aria-label="Why Vision Energy Features Carousel"
              className="flex gap-5 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pt-2 pb-4 cursor-grab active:cursor-grabbing select-none items-stretch px-1"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              {WHY_FEATURE_CARDS.map((card, idx) => (
                <div
                  key={idx}
                  className="w-[86vw] min-w-[280px] max-w-[360px] sm:w-[350px] md:w-[calc((100%-24px)/2)] lg:w-[calc((100%-48px)/3)] shrink-0 snap-start flex flex-col"
                >
                  <div className="group h-full flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#0D1117] border border-slate-200/90 dark:border-white/[0.1] hover:border-slate-300 dark:hover:border-white/25 hover:-translate-y-[3px] motion-reduce:hover:translate-y-0 transition-all duration-200 ease-out shadow-sm hover:shadow-md">
                    <div className="space-y-4">
                      <div>
                        <span className="text-xs uppercase tracking-wider text-[#8DC63F] font-semibold block mb-1.5">
                          {card.step}
                        </span>
                        <h3 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-white leading-snug">
                          {card.title}
                        </h3>
                      </div>

                      <ul className="space-y-2.5 pt-1">
                        {card.points.map((pt, pIdx) => (
                          <li
                            key={pIdx}
                            className="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-[#CBD5E1]"
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full bg-[#8DC63F] mt-2 shrink-0"
                              aria-hidden="true"
                            />
                            <span>
                              <strong className="text-slate-900 dark:text-white font-semibold">{pt.strong} </strong>
                              {pt.text}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel Pagination Dots */}
            <div className="flex items-center justify-center gap-2 pt-2">
              {WHY_FEATURE_CARDS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => scrollToIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-200 ${
                    activeIndex === i
                      ? 'w-7 bg-[#8DC63F]'
                      : 'w-2 bg-slate-300 hover:bg-slate-400 dark:bg-white/20 dark:hover:bg-white/40'
                  }`}
                  aria-label={`Scroll to feature card ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </Reveal>

        {/* Industries We Serve */}
        <div className="space-y-6 pt-4">
          <Reveal staggerIndex={4}>
            <div className="text-left">
              <h3 className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white tracking-tight">
                Industries We Serve
              </h3>
            </div>
          </Reveal>

          {/* Interactive Sectors Grid: Balanced 2-Column Grid spanning full width */}
          <Reveal staggerIndex={5}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 w-full">
              {SECTORS.map((sector, i) => {
                const IconComponent = sector.icon;
                return (
                  <div
                    key={i}
                    className="group w-full flex items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0D1117] border border-slate-200/90 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/25 hover:-translate-y-[3px] motion-reduce:hover:translate-y-0 hover:shadow-md transition-all duration-200 ease-out shadow-sm cursor-default"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 flex items-center justify-center shrink-0 transition-colors duration-150">
                        <IconComponent className="w-5 h-5 text-[#0B65B3] dark:text-[#8DC63F]" />
                      </div>
                      <span className="text-sm sm:text-[15px] font-semibold text-slate-900 dark:text-white leading-snug">
                        {sector.name}
                      </span>
                    </div>

                    <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] flex items-center justify-center shrink-0 transition-colors duration-150">
                      <ArrowUpRight className="w-4 h-4 text-slate-500 dark:text-[#A9B4C0] group-hover:text-[#0B65B3] dark:group-hover:text-[#8DC63F]" />
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
