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
  Truck,
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
}

const CAROUSEL_SERVICES: ServiceCardItem[] = [
  {
    id: 'lightning-protection',
    number: '01',
    title: 'Lightning Protection',
    eyebrow: 'Specialist Protection',
    summary:
      'Certified structural Faraday mesh, air interception terminals, and ESE systems compliant with IEC 62305.',
    icon: Zap,
    metaChip: 'IEC 62305 • ESE',
    href: '/services/external-lightning-protection-installation',
  },
  {
    id: 'custom-engraving',
    number: '02',
    title: 'Custom Engraving',
    eyebrow: 'Industrial Tagging',
    summary:
      'Laser-engraved 316 stainless steel, brass, and acrylic asset tags, caution labels, and schematic mimic panels.',
    icon: Tag,
    metaChip: 'Laser Engraved • 316 SS',
    href: '/services/custom-engraving-and-identification',
  },
  {
    id: 'manpower-supply',
    number: '03',
    title: 'Manpower Supply',
    eyebrow: 'Certified Workforce',
    summary:
      'Vetted electrical engineers, QA/QC inspectors, and site technicians for MEP, solar, and industrial execution.',
    icon: Users,
    metaChip: 'Certified Technicians',
    href: '/services/manpower-supply',
  },
  {
    id: 'turnkey-installation',
    number: '04',
    title: 'Turnkey Installation',
    eyebrow: 'Site Execution',
    summary:
      'Low-impedance earth grounding grids, deep well ground electrodes, exothermic welding, and cable containment.',
    icon: Layers,
    metaChip: 'DEWA & SEWA Compliant',
    href: '/services/earthing-and-grounding',
  },
  {
    id: 'equipment-maintenance',
    number: '05',
    title: 'Equipment Maintenance',
    eyebrow: 'Preventive Care',
    summary:
      'Preventive and corrective maintenance for commercial gym machinery, electromechanical systems, and AMC.',
    icon: Wrench,
    metaChip: 'Preventive AMC Contracts',
    href: '/services',
  },
  {
    id: 'surge-protection',
    number: '06',
    title: 'Surge Protection & Bonding',
    eyebrow: 'Transient Defense',
    summary:
      'Type 1, 2, and 3 SPD panel integration, equipotential bonding, and transient voltage suppression for sensitive electrical networks.',
    icon: ShieldCheck,
    metaChip: 'IEC 61643 • IEEE C62.41',
    href: '/services',
  },
  {
    id: 'soil-testing',
    number: '07',
    title: 'Testing & Commissioning',
    eyebrow: 'Geological Survey',
    summary:
      'Wenner 4-pin soil resistivity modeling, earth pit loop impedance testing, and consultant authority NOC submittals.',
    icon: Activity,
    metaChip: 'IEEE 81 • Third-Party NOC',
    href: '/services',
  },
  {
    id: 'equipment-rentals',
    number: '08',
    title: 'Heavy Equipment Rentals',
    eyebrow: 'Fleet & Logistics',
    summary:
      'Heavy mobile cranes, boom trucks, industrial diesel generator units, and cable-pulling equipment rentals across all UAE Emirates.',
    icon: Truck,
    metaChip: 'Heavy Fleet Rental',
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

    // Calculate approximate active card index
    const cardEl = scrollRef.current.firstElementChild as HTMLElement | null;
    const cardWidth = cardEl ? cardEl.offsetWidth + 16 : 320;
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
    const cardWidth = cardEl ? cardEl.offsetWidth + 16 : 340;
    const offset = direction === 'left' ? -cardWidth : cardWidth;
    container.scrollBy({ left: offset, behavior: 'smooth' });
  };

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const cardEl = container.firstElementChild as HTMLElement | null;
    const cardWidth = cardEl ? cardEl.offsetWidth + 16 : 340;
    container.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
  };

  // Mouse Drag Events
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
    const walk = (x - startX.current) * 1.5; // Drag sensitivity
    if (Math.abs(walk) > 5) {
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
    // If the user dragged more than 5px, don't trigger the link navigation
    if (hasMoved.current) {
      e.preventDefault();
    }
  };

  return (
    <section
      aria-labelledby="services-preview-heading"
      className="py-16 md:py-24 lg:py-28 bg-[#0D1117] relative border-t border-b border-white/[0.08] overflow-hidden"
    >
      {/* Background Radial Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-[#8DC63F]/[0.02] blur-[150px] pointer-events-none rounded-full"
        aria-hidden="true"
      />

      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8 sm:space-y-10">
        
        {/* ============================================================ */}
        {/* HEADER BLOCK: Title, Description & Carousel Controls */}
        {/* ============================================================ */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <SectionHeader
            id="services-preview-heading"
            eyebrow="Specialised Services"
            title="Engineered Turnkey Solutions"
            description="From consultation and risk evaluation to site installation guidance and after-sales support."
          />

          {/* Right Action: All Services Link + Next/Prev Arrows */}
          <div className="flex items-center gap-4 shrink-0 self-start lg:self-end">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#8DC63F] hover:text-white transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] rounded px-1 py-0.5"
            >
              <span>View all services ({totalServicesCount})</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>

            {/* Carousel Arrow Controls */}
            <div className="flex items-center gap-1.5 pl-3 border-l border-white/15">
              <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all ${
                  canScrollLeft
                    ? 'bg-[#050608]/90 border-white/20 text-[#8DC63F] hover:bg-[#8DC63F] hover:text-[#050608] hover:border-[#8DC63F] shadow-lg active:scale-95'
                    : 'bg-[#050608]/40 border-white/5 text-white/20 cursor-not-allowed'
                }`}
                aria-label="Previous service"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all ${
                  canScrollRight
                    ? 'bg-[#050608]/90 border-white/20 text-[#8DC63F] hover:bg-[#8DC63F] hover:text-[#050608] hover:border-[#8DC63F] shadow-lg active:scale-95'
                    : 'bg-[#050608]/40 border-white/5 text-white/20 cursor-not-allowed'
                }`}
                aria-label="Next service"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* ONE COMMON MAIN IMAGE SHOWCASE BANNER */}
        {/* ============================================================ */}
        <div className="relative w-full h-[180px] sm:h-[230px] lg:h-[280px] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
          <Image
            src="/images/turnkey-solutions-main.webp"
            alt="Vision Energy Turnkey Engineering Solutions & Operations UAE"
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          />

          {/* Cinematic Scrim Overlays for Depth and Contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E17]/95 via-[#0A0E17]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0E17]/90 via-[#0A0E17]/35 to-transparent" />

          {/* Floating Badges inside Banner */}
          <div className="absolute top-3 left-3 sm:top-5 sm:left-6 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#050608]/85 backdrop-blur-md border border-white/15 text-[11px] sm:text-xs font-semibold text-white shadow-lg">
              <span className="w-2 h-2 rounded-full bg-[#8DC63F] animate-pulse" />
              <span>Turnkey Engineering Operations • UAE & GCC</span>
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B65B3]/30 backdrop-blur-md border border-[#0B65B3]/40 text-xs font-semibold text-[#8DC63F]">
              DEWA • SEWA • Civil Defense Compliant
            </span>
          </div>

          {/* Bottom Content inside Banner */}
          <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2 sm:gap-4">
            <div>
              <p className="text-[10px] sm:text-xs uppercase tracking-widest text-[#8DC63F] font-bold mb-1">
                Integrated Capabilities
              </p>
              <h3 className="text-base sm:text-2xl font-bold text-white tracking-tight leading-tight">
                Single-Source Accountability for Engineering Infrastructure
              </h3>
            </div>
            <div className="flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-white/80 shrink-0">
              <span className="px-2.5 py-1 rounded-lg bg-white/10 backdrop-blur-md border border-white/15">
                {CAROUSEL_SERVICES.length} Core Disciplines
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-[#8DC63F]/20 text-[#8DC63F] border border-[#8DC63F]/30">
                Swipe to Explore →
              </span>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* HORIZONTAL SLIDING CAROUSEL OF SERVICE CARDS */}
        {/* ============================================================ */}
        <div className="relative">
          {/* Edge Fade Gradients for Desktop */}
          <div
            className={`hidden lg:block absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#0D1117] to-transparent z-10 pointer-events-none transition-opacity duration-300 ${
              canScrollLeft ? 'opacity-100' : 'opacity-0'
            }`}
          />
          <div
            className={`hidden lg:block absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#0D1117] to-transparent z-10 pointer-events-none transition-opacity duration-300 ${
              canScrollRight ? 'opacity-100' : 'opacity-0'
            }`}
          />

          <div
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            className="flex gap-4 sm:gap-5 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-2 cursor-grab active:cursor-grabbing select-none"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {CAROUSEL_SERVICES.map((service, idx) => {
              const IconComponent = service.icon;

              return (
                <div
                  key={service.id}
                  className="w-[82vw] min-w-[260px] max-w-[320px] sm:w-[320px] lg:w-[360px] shrink-0 snap-start"
                >
                  <Link
                    href={service.href}
                    onClick={handleCardClick}
                    className="group relative flex flex-col justify-between h-full p-5 sm:p-6 lg:p-7 rounded-2xl bg-[#0A0E17]/90 hover:bg-[#0A0E17] backdrop-blur-xl border border-white/[0.1] hover:border-[#8DC63F]/60 transition-all duration-300 shadow-xl hover:shadow-[0_12px_35px_rgba(141,198,63,0.15)] hover:-translate-y-1"
                  >
                    <div>
                      {/* Top Row: Index Badge & Icon */}
                      <div className="flex items-center justify-between mb-5">
                        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#050608] border border-white/10 text-xs font-semibold text-white">
                          <span className="font-mono text-[#8DC63F] font-bold text-[11px]">
                            {service.number}
                          </span>
                          <span className="text-white/20">•</span>
                          <span className="text-white/60 text-[11px] uppercase tracking-wider">
                            Services
                          </span>
                        </div>

                        <div className="w-10 h-10 rounded-xl bg-[#050608] border border-white/10 flex items-center justify-center text-[#8DC63F] group-hover:border-[#8DC63F]/60 group-hover:scale-105 transition-all shadow-md">
                          <IconComponent className="w-5 h-5" />
                        </div>
                      </div>

                      {/* Eyebrow */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8DC63F]" />
                        <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#8DC63F]">
                          {service.eyebrow}
                        </span>
                      </div>

                      {/* Service Title */}
                      <h4 className="text-lg sm:text-xl lg:text-[22px] font-bold text-white group-hover:text-[#8DC63F] transition-colors leading-[1.3] mb-3">
                        {service.title}
                      </h4>

                      {/* Concise Description */}
                      <p className="text-[13px] sm:text-sm text-[#E2E8F0] font-normal leading-relaxed line-clamp-3 mb-4">
                        {service.summary}
                      </p>
                    </div>

                    {/* Bottom Meta & Read More */}
                    <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                      {/* Standard Pill Tag */}
                      <span className="text-[11px] font-semibold text-white/70 bg-white/[0.06] border border-white/10 px-2.5 py-1 rounded-full truncate max-w-[170px]">
                        {service.metaChip}
                      </span>

                      {/* Action Arrow */}
                      <div className="flex items-center gap-1 text-xs font-bold text-[#8DC63F] group-hover:text-white transition-colors shrink-0">
                        <span>Details</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* ============================================================ */}
        {/* CAROUSEL PAGINATION DOTS (Interactive for Mobile & Desktop) */}
        {/* ============================================================ */}
        <div className="flex items-center justify-center gap-1.5 pt-2">
          {CAROUSEL_SERVICES.map((_, i) => (
            <button
              key={i}
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

