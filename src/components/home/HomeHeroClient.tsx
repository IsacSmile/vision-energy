'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useEnquiryModal } from '@/components/modals/EnquiryModalProvider';
import {
  ArrowRight,
  ArrowUpRight,
  Zap,
  Layers,
  PhoneCall,
  ShieldCheck,
  Wrench,
  Microscope,
  Dumbbell,
  HardHat,
  Boxes,
  Trophy,
  Globe,
  Plug,
} from 'lucide-react';

interface SlideData {
  id: string;
  category: string;
  shortName: string;
  badge: string;
  badgeIcon: React.ElementType;
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  imageUrl: string;
  imageAlt: string;
}

const HERO_SLIDES: SlideData[] = [
  {
    id: 'lightning-protection',
    category: 'Lightning Protection',
    shortName: 'Lightning',
    badge: 'The Lightning Protection Experts',
    badgeIcon: Zap,
    titleLine1: 'Advanced Lightning',
    titleLine2: 'Protection Systems',
    subtitle: 'Essential Safety for Your Assets',
    description:
      'Comprehensive structural lightning protection, ESE air terminals, and surge suppression engineered to protect lives, towers, and critical facilities across the UAE.',
    ctaText: 'Explore Lightning',
    ctaLink: '/products?group=LP',
    imageUrl:
      'https://res.cloudinary.com/m6fi2bs5/image/upload/f_auto,q_auto/v1795361171/06_Earthing_1920x1080.jpg.webp',
    imageAlt:
      'Advanced lightning protection systems - Early Streamer Emission ESE air terminals, conventional copper rods, and surge protection devices SPDs',
  },
  {
    id: 'earthing',
    category: 'Earthing & Grounding',
    shortName: 'Earthing',
    badge: 'Low-Impedance Grids',
    badgeIcon: Layers,
    titleLine1: 'Earthing &',
    titleLine2: 'Grounding Solutions',
    subtitle: 'Low-Impedance Foundation & Deep Earth Grids',
    description:
      'Engineered copper earthing grids, exothermic welding, and low-impedance grounding built for maximum safety across challenging UAE soil conditions.',
    ctaText: 'Explore Earthing',
    ctaLink: '/products?group=ER',
    imageUrl:
      'https://res.cloudinary.com/m6fi2bs5/image/upload/f_auto,q_auto/v1795361171/06_Earthing_1920x1080.jpg.webp',
    imageAlt:
      'Earthing and grounding solutions - Copper earth rods, exothermic welding, earth pit, and copper tape conductors',
  },
  {
    id: 'electrical-solutions',
    category: 'Electrical',
    shortName: 'Electrical',
    badge: 'Industrial Electrical Systems',
    badgeIcon: Plug,
    titleLine1: 'Advanced Electrical',
    titleLine2: 'Equipment & Solutions',
    subtitle: 'Engineered for Industrial & Infrastructure Applications',
    description:
      'High-performance electrical distribution, switchgear accessories, cable containment, and industrial power systems delivered UAE-wide.',
    ctaText: 'Explore Electrical',
    ctaLink: '/products?group=EL',
    imageUrl:
      'https://res.cloudinary.com/m6fi2bs5/image/upload/f_auto,q_auto/v1795361169/09_Electrical_1920x1080-optimized.webp',
    imageAlt:
      'Advanced electrical equipment and solutions UAE - Distribution panels, switchgear, cable trays, conduits, and power systems',
  },
  {
    id: 'mechanical-solutions',
    category: 'Mechanical',
    shortName: 'Mechanical',
    badge: 'Industrial & Infrastructure',
    badgeIcon: Wrench,
    titleLine1: 'Advanced Mechanical &',
    titleLine2: 'Pumping Solutions',
    subtitle: 'Engineered for Industrial & Infrastructure Applications',
    description:
      'Industrial centrifugal water pumps, booster stations, heavy-duty valves, and HVAC equipment engineered for demanding UAE MEP sites.',
    ctaText: 'Explore Mechanical',
    ctaLink: '/products?group=ME',
    imageUrl:
      'https://res.cloudinary.com/m6fi2bs5/image/upload/f_auto,q_auto/v1795361169/07_Mechanical_1920x1080.jpg.webp',
    imageAlt:
      'Advanced mechanical solutions UAE - Industrial centrifugal water pumps, booster pumps, gate valves, check valves, and pipe fittings',
  },
  {
    id: 'laboratory-equipment',
    category: 'Laboratory Equipment',
    shortName: 'Laboratory',
    badge: 'Research & Diagnostics',
    badgeIcon: Microscope,
    titleLine1: 'Complete Laboratory',
    titleLine2: 'Equipment & Instrumentation',
    subtitle: 'Quality Laboratory Equipment, Consumables & Accessories',
    description:
      'Precision analytical balances, optical instruments, lab glassware, and certified consumables supporting UAE testing & research facilities.',
    ctaText: 'Explore Equipment',
    ctaLink: '/products?group=LE',
    imageUrl:
      'https://res.cloudinary.com/m6fi2bs5/image/upload/f_auto,q_auto/v1795361169/02_Laboratory_1920x1080.jpg.webp',
    imageAlt:
      'Complete laboratory equipment for research and diagnostics - Microscopes, centrifuges, analytical balances, spectrophotometers, and lab consumables',
  },
  {
    id: 'gym-equipment',
    category: 'Gym Equipment',
    shortName: 'Gym',
    badge: 'Fitness & Gym Equipment',
    badgeIcon: Dumbbell,
    titleLine1: 'Commercial Gym &',
    titleLine2: 'Fitness Equipment',
    subtitle: 'Premium Fitness Machinery & Gym Solutions',
    description:
      'Commercial-grade gym machinery, strength training systems, and turnkey equipment maintenance across hospitality, residential, and corporate clubs.',
    ctaText: 'Explore Gym Equipment',
    ctaLink: '/products?group=SP',
    imageUrl:
      'https://res.cloudinary.com/m6fi2bs5/image/upload/f_auto,q_auto/v1795361169/05_Gym_1920x1080-optimized.webp',
    imageAlt:
      'Commercial gym equipment and fitness machinery - Treadmills, strength training machines, power racks, and fitness accessories UAE',
  },
  {
    id: 'safety-equipment-supply',
    category: 'Safety Equipment',
    shortName: 'Safety',
    badge: 'Workplace Protection & PPE',
    badgeIcon: HardHat,
    titleLine1: 'Safety Equipment Supply',
    titleLine2: '& Workplace Protection',
    subtitle: 'Reliable Safety Equipment Solutions & Certified PPE',
    description:
      'Certified industrial PPE, hazard detection, and workplace protection systems built for UAE construction, oil & gas, and utility operations.',
    ctaText: 'Explore Safety Products',
    ctaLink: '/products?group=SF',
    imageUrl:
      'https://res.cloudinary.com/m6fi2bs5/image/upload/f_auto,q_auto/v1795361170/04_Electronics_1920x1080.jpg.webp',
    imageAlt:
      'Workplace protection, automation, and safety equipment supply - Industrial sensors, limit controls, safety relays, and instrumentation',
  },
  {
    id: 'industrial-technical-products',
    category: 'Industrial & Technical',
    shortName: 'Industrial',
    badge: 'Trusted Industrial Supplier',
    badgeIcon: ShieldCheck,
    titleLine1: 'A Trusted Supplier of',
    titleLine2: 'Industrial & Technical Products',
    subtitle: 'Delivering Quality Products & Dependable Solutions',
    description:
      'Delivering certified engineering products and dependable technical solutions to support industries, MEP contractors, and infrastructure projects across the UAE.',
    ctaText: 'Explore Products',
    ctaLink: '/products',
    imageUrl:
      'https://res.cloudinary.com/m6fi2bs5/image/upload/f_auto,q_auto/v1795361169/09_Electrical_1920x1080-optimized.webp',
    imageAlt:
      'Vision Energy - Quality industrial and technical products showroom in UAE: distribution panels, circuit breakers, cable trays, and rigid conduits',
  },
  {
    id: 'commercial-packaging-solutions',
    category: 'Commercial Packaging',
    shortName: 'Packaging',
    badge: 'Packaging & Signage',
    badgeIcon: Boxes,
    titleLine1: 'Safety Equipment &',
    titleLine2: 'Commercial Packaging',
    subtitle: 'Reliable Safety & Packaging Products',
    description:
      'Heavy-duty industrial packaging, protective wrapping, cable drums, and facility identification engineered for safe UAE logistics and handling.',
    ctaText: 'Explore Packaging',
    ctaLink: '/products?group=PK',
    imageUrl:
      'https://res.cloudinary.com/m6fi2bs5/image/upload/f_auto,q_auto/v1795361170/01_Cables_1920x1080.webp',
    imageAlt:
      'Safety equipment and commercial packaging solutions - Heavy-duty cable drums, spools, coiled conductors, and packaging materials',
  },
  {
    id: 'sports-equipment-solutions',
    category: 'Sports & Accessories',
    shortName: 'Sports',
    badge: 'Sports Equipment & Accessories',
    badgeIcon: Trophy,
    titleLine1: 'Sports Equipment &',
    titleLine2: 'Court Accessories',
    subtitle: 'Premium sports products and accessories for every athletic facility.',
    description:
      'Professional athletic gear, court accessories, and institutional sports equipment supplied to academies, schools, and clubs across the Emirates.',
    ctaText: 'Explore Sports Products',
    ctaLink: '/products?group=SP',
    imageUrl:
      'https://res.cloudinary.com/m6fi2bs5/image/upload/f_auto,q_auto/v1795361169/05_Gym_1920x1080-optimized.webp',
    imageAlt:
      'Sports equipment and accessories - Premium commercial athletic equipment, dumbbells, weights, rowing machines, and fitness accessories',
  },
  {
    id: 'delivering-excellence-multiple-sectors',
    category: 'Multi-Sector Solutions',
    shortName: 'Multi-Sector',
    badge: 'Delivering Excellence',
    badgeIcon: Globe,
    titleLine1: 'Delivering Excellence',
    titleLine2: 'Across Multiple Sectors',
    subtitle: 'One Company. Multiple Solutions. A Commitment to Quality.',
    description:
      'Backed by 18+ years of industry experience in the UAE, Vision Energy supports energy, MEP, solar PV, and industrial developments with turnkey supply.',
    ctaText: 'Explore All Solutions',
    ctaLink: '/products?group=EN',
    imageUrl:
      'https://res.cloudinary.com/m6fi2bs5/image/upload/f_auto,q_auto/v1795361169/08_Solar_1920x1080-optimized.webp',
    imageAlt:
      'Delivering excellence across multiple sectors - Solar PV renewable energy systems, hybrid inverters, battery storage BESS, and sustainable infrastructure',
  },
];

const SLIDE_DURATION_MS = 4200;

export default function HomeHeroClient() {
  const { openServiceModal } = useEnquiryModal();
  const [sliderState, setSliderState] = useState<{ active: number; loaded: number[] }>({
    active: 0,
    loaded: [0, 1],
  });
  const [isHovered, setIsHovered] = useState(false);

  const currentSlide = sliderState.active;
  const loadedSlides = sliderState.loaded;

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const tabsRailRef = useRef<HTMLDivElement>(null);

  const totalSlides = HERO_SLIDES.length;
  const isPaused = isHovered;

  // Keep active category pill centered horizontally on mobile one-line rail without vertical scroll
  useEffect(() => {
    const rail = tabsRailRef.current;
    if (!rail || rail.scrollWidth <= rail.clientWidth) return;
    const activeTab = rail.querySelector<HTMLElement>(`[data-slide-index="${currentSlide}"]`);
    if (!activeTab) return;

    const targetLeft = activeTab.offsetLeft - rail.clientWidth / 2 + activeTab.clientWidth / 2;
    rail.scrollTo({ left: Math.max(0, targetLeft), behavior: 'smooth' });
  }, [currentSlide]);

  const updateSlide = useCallback(
    (resolver: (curr: number) => number) => {
      setSliderState((prev) => {
        const nextIdx = resolver(prev.active);
        const preloadIdx = (nextIdx + 1) % totalSlides;
        const nextLoaded = new Set(prev.loaded);
        nextLoaded.add(prev.active);
        nextLoaded.add(nextIdx);
        nextLoaded.add(preloadIdx);
        return {
          active: nextIdx,
          loaded: Array.from(nextLoaded),
        };
      });
    },
    [totalSlides]
  );

  const nextSlide = useCallback(() => {
    updateSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides, updateSlide]);

  const prevSlide = useCallback(() => {
    updateSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides, updateSlide]);

  const goToSlide = (index: number) => {
    updateSlide(() => index);
  };

  // Auto-advance timer (skips when paused or user prefers reduced motion)
  useEffect(() => {
    if (isPaused) return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const timer = setTimeout(() => {
      updateSlide((prev) => (prev + 1) % totalSlides);
    }, SLIDE_DURATION_MS);

    return () => clearTimeout(timer);
  }, [isPaused, currentSlide, totalSlides, updateSlide]);

  // Keyboard navigation (ignore when typing or modal open)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable)
      ) {
        return;
      }
      if (document.body.classList.contains('modal-open')) return;

      if (e.key === 'ArrowRight') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 45) {
      nextSlide();
    } else if (distance < -45) {
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const activeSlide = HERO_SLIDES[currentSlide];

  return (
    <section
      id="home-hero"
      data-hero-section="true"
      data-dark-hero="true"
      aria-label="Vision Energy Hero Slider"
      className="relative w-full flex flex-col justify-between overflow-hidden bg-[#050A14] min-h-[calc(100svh-var(--navbar-h,122px))] sm:min-h-[calc(100svh-var(--navbar-h,130px))] lg:min-h-[calc(100svh-var(--navbar-h,142px))] select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* ============================================================ */}
      {/* LAYER 1: Full-Bleed Background Image Slider                  */}
      {/* ============================================================ */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
        {HERO_SLIDES.map((slide, idx) => {
          const isActive = idx === currentSlide;
          if (!loadedSlides.includes(idx)) return null;

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
              aria-hidden={!isActive}
            >
              <Image
                src={slide.imageUrl}
                alt={slide.imageAlt}
                fill
                sizes="100vw"
                priority={idx === 0}
                loading={idx === 0 ? 'eager' : 'lazy'}
                fetchPriority={idx === 0 ? 'high' : 'low'}
                quality={90}
                className={`object-cover object-center brightness-[1.12] contrast-[1.05] transition-transform duration-[4500ms] ease-out ${
                  isActive ? 'scale-105' : 'scale-100'
                }`}
              />
            </div>
          );
        })}
      </div>

      {/* Lightweight Directional Scrim: Keeps left typography crisp while leaving background photography bright and clearly visible */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            'linear-gradient(92deg, rgba(5,11,24,0.72) 0%, rgba(6,14,30,0.42) 32%, rgba(6,14,30,0.08) 54%, rgba(6,14,30,0) 70%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, transparent 86%, rgba(5,10,20,0.22) 100%)',
        }}
        aria-hidden="true"
      />

      {/* ============================================================ */}
      {/* Mobile Top Segmented Progress Indicator (<lg)                */}
      {/* ============================================================ */}
      <div className="relative z-30 w-full max-w-[80rem] mx-auto px-4 pt-2.5 lg:hidden">
        <div
          className="grid gap-1.5 w-full"
          style={{ gridTemplateColumns: `repeat(${totalSlides}, minmax(0, 1fr))` }}
        >
          {HERO_SLIDES.map((slide, idx) => {
            const isSelected = idx === currentSlide;
            const isPassed = idx < currentSlide;
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => goToSlide(idx)}
                className="py-2 -my-2 w-full flex items-center relative focus:outline-none"
                aria-label={`Jump to slide ${idx + 1}: ${slide.category}`}
              >
                <div className="w-full h-1 rounded-full bg-white/20 overflow-hidden relative">
                  <div
                    key={`mobile-progress-${idx}-${currentSlide}-${isPaused ? 'paused' : 'run'}`}
                    className="h-full bg-[#8DC63F] rounded-full origin-left will-change-transform"
                    style={{
                      transform: isPassed ? 'scaleX(1)' : isSelected ? undefined : 'scaleX(0)',
                      animation:
                        isSelected && !isPaused
                          ? `heroProgressFill ${SLIDE_DURATION_MS}ms linear forwards`
                          : 'none',
                    }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ============================================================ */}
      {/* MAIN HERO CONTENT                                            */}
      {/* ============================================================ */}
      <div className="relative z-30 w-full max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center py-2.5 sm:py-6 lg:py-8">
        <div className="max-w-[56rem] min-w-0 flex flex-col justify-center text-left">
          {/* Executive Heritage & Regional Coverage Strip */}
          <div
            data-preserve-contrast="true"
            className="mb-3 sm:mb-5 lg:mb-6 inline-flex flex-wrap items-center gap-x-2.5 gap-y-1 px-3.5 py-1.5 rounded-full bg-[#071122]/82 backdrop-blur-md border border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_10px_28px_rgba(0,0,0,0.35)] text-[11px] sm:text-xs tracking-wide w-fit max-w-full"
          >
            <span className="inline-flex items-center gap-1.5">
              <span
                className="w-1.5 h-1.5 rounded-full bg-[#8DC63F] shadow-[0_0_8px_rgba(141,198,63,0.9)] shrink-0"
                aria-hidden="true"
              />
              <span className="font-extrabold text-[#8DC63F] tabular-nums">2018</span>
              <span className="font-semibold text-white">Established</span>
            </span>
            <span className="w-px h-3.5 bg-white/25 shrink-0" aria-hidden="true" />
            <span className="inline-flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[#8DC63F] shrink-0" aria-hidden="true" />
              <span className="font-bold text-white">UAE &amp; Qatar</span>
              <span className="font-medium text-[#CBD5E1]">Coverage</span>
            </span>
          </div>

          {/* Dynamic Slide H1 Headline */}
          <h1
            key={`title-${currentSlide}`}
            className="mb-3 sm:mb-5 lg:mb-5 font-bold tracking-[-0.025em] leading-[1.12] sm:leading-[1.1] animate-fadeIn text-left"
          >
            <span
              className="block text-white text-[clamp(1.55rem,7.2vw,1.95rem)] sm:text-[2.25rem] md:text-[2.625rem] lg:text-[clamp(2.35rem,3.6vw,3.15rem)] xl:text-[3.25rem]"
              style={{
                textShadow: '0 2px 16px rgba(5,10,20,0.95), 0 1px 3px rgba(5,10,20,0.9)',
              }}
            >
              {activeSlide.titleLine1}
            </span>{' '}
            <span
              data-accent-text="true"
              className="block font-extrabold text-[#8DC63F] text-[clamp(1.55rem,7.2vw,1.95rem)] sm:text-[2.25rem] md:text-[2.625rem] lg:text-[clamp(2.35rem,3.6vw,3.15rem)] xl:text-[3.25rem] mt-1.5"
              style={{
                textShadow: '0 0 28px rgba(141,198,63,0.35), 0 2px 14px rgba(5,10,20,0.95)',
              }}
            >
              {activeSlide.titleLine2}
            </span>
          </h1>

          {/* Enlarged Hero Description */}
          <div key={`desc-${currentSlide}`} className="mb-4 sm:mb-7 lg:mb-8 animate-fadeIn max-w-[58ch]">
            <p
              className="text-[#E2E8F0] font-normal text-[15.5px] sm:text-[17.5px] lg:text-[19px] xl:text-[20px] leading-[1.6]"
              style={{
                textShadow: '0 2px 14px rgba(5,10,20,0.95)',
              }}
            >
              {activeSlide.description}
            </p>
          </div>

          {/* Action Buttons (Single horizontal row when space permits; wraps cleanly without text truncation on narrow screens) */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 sm:gap-4 w-full sm:w-auto">
              <Link
                href={activeSlide.ctaLink}
                className="flex-auto sm:flex-none min-w-0 inline-flex items-center justify-center gap-1.5 sm:gap-2 h-[44px] sm:h-[48px] px-3 sm:px-6 rounded-xl bg-[#8DC63F] hover:bg-[#9BD34E] text-[#07111E] text-[11.5px] min-[390px]:text-[12.5px] sm:text-sm font-bold shadow-[0_10px_28px_rgba(141,198,63,0.35)] hover:shadow-[0_12px_32px_rgba(141,198,63,0.5)] transition-all active:scale-[0.98] whitespace-nowrap"
              >
                <span>{activeSlide.ctaText}</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" aria-hidden="true" />
              </Link>

              <button
                type="button"
                onClick={() =>
                  openServiceModal({
                    serviceSlug: activeSlide.id,
                    serviceTitle: `${activeSlide.category} Technical Consultation`,
                  })
                }
                className="hero-consultation-btn flex-auto sm:flex-none min-w-0 inline-flex items-center justify-center gap-1.5 sm:gap-2 h-[44px] sm:h-[48px] px-3 sm:px-6 rounded-xl bg-[#0B1628]/80 hover:bg-[#0B65B3] border border-white/25 hover:border-[#8DC63F] text-white text-[11.5px] min-[390px]:text-[12.5px] sm:text-sm font-semibold backdrop-blur-md transition-all active:scale-[0.98] whitespace-nowrap"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#8DC63F] shrink-0" aria-hidden="true" />
                <span>Book Consultation</span>
                <ArrowUpRight className="hidden min-[400px]:inline-block w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/80 shrink-0" aria-hidden="true" />
              </button>
            </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* FULL-WIDTH ALL CATEGORY SLIDER BOXES                         */}
      {/* ============================================================ */}
      <div className="relative z-30 w-full max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 pt-1 sm:pt-3 lg:pt-4 pb-4 sm:pb-8 lg:pb-10">
        <div
          ref={tabsRailRef}
          data-light-surface="true"
          onTouchStart={(e) => e.stopPropagation()}
          className="w-full flex flex-nowrap sm:flex-wrap items-center gap-2 sm:gap-2.5 xl:gap-3 overflow-x-auto sm:overflow-visible no-scrollbar"
          role="tablist"
          aria-label="Hero product & solution categories"
        >
          {HERO_SLIDES.map((slide, idx) => {
            const isSelected = idx === currentSlide;
            const SlideIcon = slide.badgeIcon;
            return (
              <React.Fragment key={slide.id}>
                <button
                  type="button"
                  role="tab"
                  data-slide-index={idx}
                  onClick={() => goToSlide(idx)}
                  aria-selected={isSelected}
                  aria-current={isSelected ? 'true' : 'false'}
                  aria-label={`Go to slide ${idx + 1}: ${slide.category}`}
                  className={`hero-slider-tab group relative shrink-0 overflow-hidden flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 xl:px-4 xl:py-2 rounded-lg text-[11px] sm:text-xs xl:text-[13px] transition-all duration-200 border shadow-sm ${
                    isSelected
                      ? 'bg-[#EDF7DF] border-[#5B8C1E] text-[#365314] font-semibold shadow-[0_2px_10px_rgba(91,140,30,0.18)]'
                      : 'bg-[#F8FAFC] border-[#CBD5E1] text-[#1E293B] font-medium hover:bg-white hover:border-[#94A3B8] hover:text-[#0F172A]'
                  }`}
                >
                  {/* Smooth Internal Progress Sweep on Active Box */}
                  {isSelected && (
                    <span
                      key={`pill-progress-${currentSlide}-${isPaused ? 'paused' : 'run'}`}
                      className="absolute inset-0 bg-gradient-to-r from-[#8DC63F]/28 via-[#8DC63F]/18 to-[#5B8C1E]/15 origin-left pointer-events-none will-change-transform"
                      style={{
                        animation: !isPaused
                          ? `heroProgressFill ${SLIDE_DURATION_MS}ms linear forwards`
                          : 'none',
                      }}
                      aria-hidden="true"
                    />
                  )}

                  <SlideIcon
                    className={`relative z-10 w-3.5 h-3.5 xl:w-4 xl:h-4 shrink-0 transition-colors ${
                      isSelected
                        ? 'text-[#4D7C0F]'
                        : 'text-[#5B8C1E] group-hover:text-[#4D7C0F]'
                    }`}
                    aria-hidden="true"
                  />
                  <span className="relative z-10 whitespace-nowrap sm:hidden">{slide.shortName}</span>
                  <span className="relative z-10 whitespace-nowrap hidden sm:inline">{slide.category}</span>
                </button>
                {/* Break cleanly after the 6th box so desktop shows 6 boxes on top row and 5 on bottom row */}
                {idx === 5 && (
                  <span
                    aria-hidden="true"
                    className="hidden lg:block basis-full h-0 sm:-my-1.5 pointer-events-none"
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}
