'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Zap,
  Tag,
  Users,
  Layers,
  Wrench,
  ShieldCheck,
  Activity,
  Cog,
} from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';

interface ServiceCardItem {
  id: string;
  number: string;
  title: string;
  eyebrow: string;
  summary: string;
  icon: React.ElementType;
  metaChip: string;
  href: string;
  image: {
    url: string;
    alt: string;
  };
}

const CAROUSEL_SERVICES: ServiceCardItem[] = [
  {
    id: 'lightning-protection',
    number: '01',
    title: 'Lightning Protection Installation',
    eyebrow: 'Specialist Protection',
    summary:
      'Certified external structural lightning protection, Faraday mesh grids, air terminals, and early streamer emission (ESE) systems compliant with IEC 62305.',
    icon: Zap,
    image: {
      url: '/images/external-lightning-protection-installation.png',
      alt: 'External structural lightning protection and earthing building installation UAE',
    },
    metaChip: 'IEC 62305 • ESE',
    href: '/services/external-lightning-protection-installation',
  },
  {
    id: 'custom-engraving',
    number: '02',
    title: 'Engraving & Equipment Identification',
    eyebrow: 'Industrial Tagging',
    summary:
      'Laser-engraved 316 stainless steel plates, aluminium tags, warning signs, cable identification, and schematic mimic panels for UAE infrastructure.',
    icon: Tag,
    image: {
      url: '/images/custom-engraved-plates-identification.webp',
      alt: 'Custom engraved stainless steel plates, cable tags, caution and earthing system plates',
    },
    metaChip: 'Laser Engraved • 316 SS',
    href: '/services/custom-engraving-and-identification',
  },
  {
    id: 'manpower-supply',
    number: '03',
    title: 'Specialist Manpower Supply',
    eyebrow: 'Certified Workforce',
    summary:
      'Skilled and certified electrical engineers, QA/QC inspectors, cable jointers, and site supervisors deployed across commercial, MEP, and industrial projects.',
    icon: Users,
    image: {
      url: '/images/specialist-engineering-manpower-supply.jpg',
      alt: 'Specialist engineering manpower and certified technicians on site in UAE',
    },
    metaChip: 'Certified Technicians',
    href: '/services/manpower-supply',
  },
  {
    id: 'turnkey-installation',
    number: '04',
    title: 'Earthing & Grounding Solutions',
    eyebrow: 'Ground Potential Control',
    summary:
      'Engineered low-resistance earth grids (<1Ω / <2Ω), deep well ground electrodes, exothermic welding, and equipotential bonding compliant with DEWA and BS 7430.',
    icon: Layers,
    image: {
      url: '/images/earthing-grounding-hero.webp',
      alt: 'Engineered earthing and grounding system installation UAE',
    },
    metaChip: 'DEWA & SEWA Compliant',
    href: '/services/earthing-and-grounding',
  },
  {
    id: 'surge-protection',
    number: '05',
    title: 'Surge Protection & Bonding',
    eyebrow: 'Transient Defense',
    summary:
      'Type 1, Type 2, and Type 3 SPD panel integration, equipotential bonding bars, and transient voltage suppression protecting sensitive automation equipment.',
    icon: ShieldCheck,
    image: {
      url: '/images/surge-protection-bonding.webp',
      alt: 'Surge protection device SPD switchboard installation and copper bonding',
    },
    metaChip: 'IEC 61643 • IEEE C62.41',
    href: '/services',
  },
  {
    id: 'soil-testing',
    number: '06',
    title: 'Testing & Commissioning',
    eyebrow: 'Geological Survey & NOC',
    summary:
      'Wenner 4-pin soil resistivity modeling, earth pit loop impedance testing, continuity verification, and certified third-party NOC submittals for UAE authorities.',
    icon: Activity,
    image: {
      url: '/images/testing-commissioning-survey.webp',
      alt: 'Wenner 4-pin soil resistivity testing and earth pit inspection verification UAE',
    },
    metaChip: 'IEEE 81 • Third-Party NOC',
    href: '/services',
  },
  {
    id: 'equipment-maintenance',
    number: '07',
    title: 'Equipment Maintenance & AMC',
    eyebrow: 'Preventive Lifecycle Care',
    summary:
      'Preventive and corrective electromechanical maintenance, fitness and commercial machinery upkeep, periodic safety audits, and guaranteed SLA response times.',
    icon: Wrench,
    image: {
      url: '/images/gym-equipment-maintenance-hero.webp',
      alt: 'Commercial electromechanical equipment maintenance and AMC',
    },
    metaChip: 'Preventive AMC Contracts',
    href: '/services',
  },
  {
    id: 'electrical-mechanical-solutions',
    number: '08',
    title: 'Electrical & Mechanical Solutions',
    eyebrow: 'Turnkey MEP Integration',
    summary:
      'End-to-end electrical containment, cable management, switchgear installation, distribution boards, and heavy industrial utility infrastructure delivery.',
    icon: Cog,
    image: {
      url: '/images/electrical-mechanical-solutions-hero.webp',
      alt: 'Electrical and mechanical turnkey solutions engineering UAE',
    },
    metaChip: 'Full Turnkey MEP',
    href: '/services',
  },
];

interface ServicesCarouselClientProps {
  totalServicesCount?: number;
}

export default function ServicesCarouselClient({
  totalServicesCount = CAROUSEL_SERVICES.length,
}: ServicesCarouselClientProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [flippedCardId, setFlippedCardId] = useState<string | null>(null);

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
    const cardWidth = cardEl ? cardEl.offsetWidth + 24 : 380;
    const currentIdx = Math.round(scrollLeft / cardWidth);
    setActiveIndex(Math.min(Math.max(currentIdx, 0), CAROUSEL_SERVICES.length - 1));
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

    // Defer initial measurement after paint to avoid forced reflow
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

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const cardEl = container.firstElementChild as HTMLElement | null;
    const cardWidth = cardEl ? cardEl.offsetWidth + 24 : 380;
    const offset = direction === 'left' ? -cardWidth : cardWidth;
    container.scrollBy({ left: offset, behavior: 'smooth' });
  };

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const cardEl = container.firstElementChild as HTMLElement | null;
    const cardWidth = cardEl ? cardEl.offsetWidth + 24 : 380;
    container.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
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

  const handleCardClick = (e: React.MouseEvent, serviceId: string) => {
    // If the user dragged, don't trigger link navigation
    if (hasMoved.current) {
      e.preventDefault();
      return;
    }

    // On touch/non-hover devices, first tap flips the card to reveal content; second tap navigates
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(hover: none)').matches &&
      flippedCardId !== serviceId
    ) {
      e.preventDefault();
      setFlippedCardId(serviceId);
    }
  };

  return (
    <section
      aria-labelledby="services-preview-heading"
      className="py-16 md:py-24 lg:py-32 bg-[#0D1117] relative border-t border-b border-white/[0.08] overflow-hidden"
    >
      {/* Background Radial Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-[#8DC63F]/[0.025] blur-[140px] pointer-events-none rounded-full"
        aria-hidden="true"
      />

      <div className="max-w-[84rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10 sm:space-y-12">
        {/* ============================================================ */}
        {/* HEADER BLOCK: Title, Description & Carousel Arrow Controls  */}
        {/* ============================================================ */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <SectionHeader
            id="services-preview-heading"
            eyebrow="Specialised Services"
            title="Engineered Turnkey Solutions"
            description="From consultation and risk evaluation to site installation guidance and after-sales support."
          />

          {/* Right Action: All Services Link + Prev/Next Controls */}
          <div className="flex items-center gap-4 shrink-0 self-start lg:self-end">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#8DC63F] hover:text-white transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] rounded px-1 py-0.5"
            >
              <span>View all services ({totalServicesCount})</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>

            {/* Carousel Previous & Next Arrow Controls (Mobile Carousel Only) */}
            <div className="flex md:hidden items-center gap-2 pl-3 border-l border-white/15">
              <button
                type="button"
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                aria-label="Previous service"
                className={`carousel-nav-btn w-10 h-10 rounded-xl border flex items-center justify-center transition-all ${
                  canScrollLeft
                    ? 'bg-white border-slate-300 text-[#8DC63F] hover:bg-[#8DC63F] hover:text-[#050608] hover:border-[#8DC63F] dark:bg-[#0A0E17] dark:border-white/20 dark:text-[#8DC63F] dark:hover:bg-[#8DC63F] dark:hover:text-[#050608] dark:hover:border-[#8DC63F] shadow-sm hover:shadow-md active:scale-95 cursor-pointer'
                    : 'bg-slate-100 border-slate-200 text-slate-400 dark:bg-[#0A0E17]/40 dark:border-white/10 dark:text-white/30 cursor-not-allowed opacity-60'
                }`}
              >
                <ChevronLeft className="w-5 h-5 stroke-[2.2]" />
              </button>

              <button
                type="button"
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                aria-label="Next service"
                className={`carousel-nav-btn w-10 h-10 rounded-xl border flex items-center justify-center transition-all ${
                  canScrollRight
                    ? 'bg-white border-slate-300 text-[#8DC63F] hover:bg-[#8DC63F] hover:text-[#050608] hover:border-[#8DC63F] dark:bg-[#0A0E17] dark:border-white/20 dark:text-[#8DC63F] dark:hover:bg-[#8DC63F] dark:hover:text-[#050608] dark:hover:border-[#8DC63F] shadow-sm hover:shadow-md active:scale-95 cursor-pointer'
                    : 'bg-slate-100 border-slate-200 text-slate-400 dark:bg-[#0A0E17]/40 dark:border-white/10 dark:text-white/30 cursor-not-allowed opacity-60'
                }`}
              >
                <ChevronRight className="w-5 h-5 stroke-[2.2]" />
              </button>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* MOBILE HORIZONTAL CAROUSEL / DESKTOP 4-COLUMN STATIC GRID    */}
        {/* ============================================================ */}
        <div className="relative">
          <div
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            className="flex gap-5 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pt-2 pb-4 cursor-grab active:cursor-grabbing select-none items-stretch px-1 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-5 xl:gap-6 md:overflow-visible md:scroll-auto md:snap-none md:cursor-default md:p-0"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {CAROUSEL_SERVICES.map((service) => {
              const IconComponent = service.icon;
              const isFlipped = flippedCardId === service.id;

              return (
                <div
                  key={service.id}
                  className="w-[84vw] min-w-[280px] max-w-[340px] sm:w-[340px] md:w-full md:min-w-0 md:max-w-none shrink-0 snap-start h-[340px] sm:h-[360px] lg:h-[350px] xl:h-[370px]"
                >
                  <Link
                    href={service.href}
                    onClick={(e) => handleCardClick(e, service.id)}
                    onBlur={() => {
                      if (isFlipped) setFlippedCardId(null);
                    }}
                    className="flip-card-scene group block relative w-full h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] rounded-[22px]"
                  >
                    <div className={`flip-card-inner ${isFlipped ? 'is-flipped' : ''}`}>
                      {/* FRONT FACE: Clean Full-Card Image Only */}
                      <div className="flip-card-face flip-card-front rounded-[22px] overflow-hidden bg-[#050608] border border-white/[0.1] shadow-[0_12px_32px_rgba(0,0,0,0.14)]">
                        <Image
                          src={service.image.url}
                          alt={service.image.alt}
                          fill
                          className="object-cover object-center"
                          sizes="(max-width: 767px) 85vw, (max-width: 1023px) 48vw, 24vw"
                        />

                        {/* Subtle Edge Gradient for Depth */}
                        <div
                          className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/35 pointer-events-none"
                          aria-hidden="true"
                        />

                        {/* Top Floating Badge: Index & Icon */}
                        <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#050608]/85 backdrop-blur-md border border-white/15 text-xs font-semibold text-white shadow-lg">
                          <span className="font-mono text-[#8DC63F] font-bold text-[11px]">
                            {service.number}
                          </span>
                          <span className="text-white/20">•</span>
                          <IconComponent className="w-3.5 h-3.5 text-white/90" />
                        </div>

                        {/* Top Right Indicator */}
                        <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#050608]/80 backdrop-blur-md border border-white/15 flex items-center justify-center text-white/70 shadow-lg">
                          <ArrowUpRight className="w-4 h-4" />
                        </div>
                      </div>

                      {/* BACK FACE: Text Content Revealed Smoothly on Hover / Focus / Tap */}
                      <div className="flip-card-face flip-card-back service-flip-back rounded-[22px] overflow-hidden border p-5 sm:p-6 lg:p-4 xl:p-5 flex flex-col justify-between">
                        <div>
                          {/* Top Row: Eyebrow & Number */}
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <div className="flex items-center gap-1.5 min-w-0">
                              <span className="w-2 h-2 rounded-full bg-[#8DC63F] shrink-0" />
                              <span className="text-[11px] lg:text-[10.5px] xl:text-[11px] font-bold uppercase tracking-wider text-[#8DC63F] truncate">
                                {service.eyebrow}
                              </span>
                            </div>
                            <span className="font-mono text-xs font-bold text-[#8DC63F] shrink-0">
                              {service.number}
                            </span>
                          </div>

                          {/* Service Title */}
                          <h3 className="text-xl sm:text-[21px] lg:text-[17px] xl:text-[19px] font-bold text-white leading-[1.28] mb-2.5">
                            {service.title}
                          </h3>

                          {/* Service Summary */}
                          <p className="text-[13.5px] lg:text-[12.5px] xl:text-[13.5px] text-[#E2E8F0] font-normal leading-[1.55] line-clamp-5">
                            {service.summary}
                          </p>
                        </div>

                        {/* Bottom Action Area: Read More + Meta Chip */}
                        <div className="mt-3 pt-3.5 border-t border-white/[0.08] flex items-center justify-between gap-2">
                          <div className="relative inline-flex items-center gap-1.5 text-sm lg:text-xs xl:text-sm font-bold text-white whitespace-nowrap shrink-0">
                            <span>Read More</span>
                            <ArrowRight className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-[#8DC63F]" />
                            <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#8DC63F] rounded-full" />
                          </div>

                          {service.metaChip && (
                            <span className="text-[10.5px] xl:text-[11px] font-semibold text-white/70 bg-white/[0.08] border border-white/10 px-2 py-0.5 xl:px-2.5 xl:py-1 rounded-full truncate">
                              {service.metaChip}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* ============================================================ */}
        {/* CAROUSEL PAGINATION DOTS (Mobile Carousel Only)              */}
        {/* ============================================================ */}
        <div className="flex md:hidden items-center justify-center gap-1.5 pt-1">
          {CAROUSEL_SERVICES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollToIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === i
                  ? 'w-7 bg-[#8DC63F]'
                  : 'w-2 bg-slate-300 hover:bg-slate-400 dark:bg-white/20 dark:hover:bg-white/40'
              }`}
              aria-label={`Scroll to service card ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
