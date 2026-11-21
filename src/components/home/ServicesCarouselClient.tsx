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

    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll, { passive: true });

    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
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

  const handleCardClick = (e: React.MouseEvent) => {
    // If the user dragged, don't trigger link navigation
    if (hasMoved.current) {
      e.preventDefault();
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

            {/* Carousel Previous & Next Arrow Controls */}
            <div className="flex items-center gap-2 pl-3 border-l border-white/15">
              <button
                type="button"
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                aria-label="Previous service"
                className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all ${
                  canScrollLeft
                    ? 'bg-[#050608]/90 border-white/20 text-[#8DC63F] hover:bg-[#8DC63F] hover:text-[#050608] hover:border-[#8DC63F] shadow-lg active:scale-95 cursor-pointer'
                    : 'bg-[#050608]/40 border-white/5 text-white/20 cursor-not-allowed'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                aria-label="Next service"
                className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all ${
                  canScrollRight
                    ? 'bg-[#050608]/90 border-white/20 text-[#8DC63F] hover:bg-[#8DC63F] hover:text-[#050608] hover:border-[#8DC63F] shadow-lg active:scale-95 cursor-pointer'
                    : 'bg-[#050608]/40 border-white/5 text-white/20 cursor-not-allowed'
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* HORIZONTAL CAROUSEL WITH PREVIOUS ARCHITECTURAL CARD DESIGN  */}
        {/* ============================================================ */}
        <div className="relative">
          {/* Edge Fade Gradients for Desktop */}
          <div
            className={`hidden lg:block absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#0D1117] to-transparent z-20 pointer-events-none transition-opacity duration-300 ${
              canScrollLeft ? 'opacity-100' : 'opacity-0'
            }`}
          />
          <div
            className={`hidden lg:block absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#0D1117] to-transparent z-20 pointer-events-none transition-opacity duration-300 ${
              canScrollRight ? 'opacity-100' : 'opacity-0'
            }`}
          />

          <div
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            className="flex gap-6 sm:gap-7 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pt-2 pb-8 cursor-grab active:cursor-grabbing select-none items-stretch"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {CAROUSEL_SERVICES.map((service) => {
              const IconComponent = service.icon;

              return (
                <div
                  key={service.id}
                  className="w-[84vw] min-w-[280px] max-w-[340px] sm:w-[350px] md:w-[370px] lg:w-[380px] shrink-0 snap-start flex flex-col"
                >
                  <Link
                    href={service.href}
                    onClick={handleCardClick}
                    className="group relative flex flex-col h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] rounded-[24px]"
                  >
                    {/* Top Image Container with High-Res Photography */}
                    <div className="relative w-full h-[240px] sm:h-[260px] lg:h-[280px] rounded-[20px] overflow-hidden bg-[#050608] border border-white/[0.08] shadow-xl group-hover:border-[#8DC63F]/40 transition-all duration-500">
                      <Image
                        src={service.image.url}
                        alt={service.image.alt}
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                        sizes="(max-width: 640px) 85vw, (max-width: 1024px) 370px, 380px"
                      />

                      {/* Gradient Overlay for Depth */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/40 pointer-events-none" />

                      {/* Top Floating Badge: Index & Icon */}
                      <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#050608]/85 backdrop-blur-md border border-white/15 text-xs font-semibold text-white shadow-lg">
                        <span className="font-mono text-[#8DC63F] font-bold text-[11px]">
                          {service.number}
                        </span>
                        <span className="text-white/20">•</span>
                        <IconComponent className="w-3.5 h-3.5 text-white/90" />
                      </div>

                      {/* Top Right Quick Action Indicator */}
                      <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#050608]/80 backdrop-blur-md border border-white/15 flex items-center justify-center text-white/70 group-hover:text-[#8DC63F] group-hover:border-[#8DC63F]/50 group-hover:scale-110 transition-all duration-300 shadow-lg">
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>

                    {/* Overlapping Elevated Architectural Card */}
                    <div className="-mt-16 sm:-mt-18 relative z-10 mx-2.5 sm:mx-3.5 flex-1 flex flex-col justify-between p-5 sm:p-6 lg:p-7 rounded-[20px] bg-[#0A0E17]/95 backdrop-blur-xl border border-white/[0.1] shadow-[0_20px_50px_rgba(0,0,0,0.85)] group-hover:border-[#8DC63F]/50 group-hover:shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_35px_rgba(141,198,63,0.12)] group-hover:-translate-y-1 transition-all duration-500">
                      <div>
                        {/* Eyebrow Category */}
                        <div className="flex items-center gap-2 mb-3">
                          <span className="w-2 h-2 rounded-full bg-[#8DC63F] animate-pulse" />
                          <span className="text-[12px] sm:text-[13px] font-bold uppercase tracking-wider text-[#8DC63F]">
                            {service.eyebrow}
                          </span>
                        </div>

                        {/* Service Title */}
                        <h3 className="text-xl sm:text-[22px] lg:text-[23px] font-bold text-white group-hover:text-[#8DC63F] transition-colors leading-[1.3] mb-3">
                          {service.title}
                        </h3>

                        {/* Service Summary */}
                        <p className="text-[14px] sm:text-[14px] lg:text-[15px] text-[#E2E8F0] font-normal leading-[1.6] line-clamp-3">
                          {service.summary}
                        </p>
                      </div>

                      {/* Bottom Action Area: Read More with Animated Underline */}
                      <div className="mt-5 pt-4 border-t border-white/[0.08] flex items-center justify-between">
                        <div className="relative inline-flex items-center gap-2 text-sm sm:text-base font-bold text-white group-hover:text-[#8DC63F] transition-colors">
                          <span>Read More</span>
                          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#8DC63F] group-hover:translate-x-1.5 transition-transform duration-300" />
                          <span className="absolute -bottom-1 left-0 w-8 h-[2px] bg-[#8DC63F] group-hover:w-full transition-all duration-300 rounded-full" />
                        </div>

                        {/* Subtle Meta Chip / Standards Indicator */}
                        {service.metaChip && (
                          <span className="text-[11px] sm:text-xs font-semibold text-white/70 bg-white/[0.08] border border-white/10 px-2.5 py-1 rounded-full transition-colors truncate max-w-[130px] sm:max-w-[150px]">
                            {service.metaChip}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* ============================================================ */}
        {/* CAROUSEL PAGINATION DOTS (Interactive) */}
        {/* ============================================================ */}
        <div className="flex items-center justify-center gap-1.5 pt-1">
          {CAROUSEL_SERVICES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollToIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === i
                  ? 'w-7 bg-[#8DC63F]'
                  : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Scroll to service card ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
