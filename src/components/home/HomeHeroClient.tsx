'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useEnquiryModal } from '@/components/modals/EnquiryModalProvider';
import {
  ArrowRight,
  Zap,
  Layers,
  ChevronLeft,
  ChevronRight,
  PhoneCall,
  ShieldCheck,
  Wrench,
  Microscope,
  Dumbbell,
  HardHat,
  Boxes,
  Trophy,
  Globe,
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
  standards: string;
  highlightColor: string;
  glowColor: string;
}

const HERO_SLIDES: SlideData[] = [
  {
    id: 'industrial-technical-products',
    category: 'Industrial & Technical',
    shortName: 'Industrial',
    badge: 'Trusted Industrial Supplier',
    badgeIcon: ShieldCheck,
    titleLine1: 'A Trusted Supplier of',
    titleLine2: 'Quality Industrial & Technical Products',
    subtitle: 'Delivering Quality Products & Dependable Solutions',
    description:
      'Delivering quality products and dependable solutions to support industries, infrastructure and projects across diverse sectors.',
    ctaText: 'Explore Products',
    ctaLink: '/products?group=EL',
    imageUrl: '/images/industrial-technical-products-hero.webp?v=20261122v5',
    imageAlt:
      'Vision Energy - Quality industrial and technical products showroom in UAE: distribution panels, circuit breakers, cable trays, and rigid conduits',
    standards: 'DEWA • SEWA • Civil Defense Compliant',
    highlightColor: 'text-[#8DC63F]',
    glowColor: 'rgba(141,198,63,0.45)',
  },
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
      'Lightning, a powerful force of nature, can cause severe damage. We provide comprehensive solutions to protect lives, structures, and equipment across the UAE.',
    ctaText: 'Explore Lightning',
    ctaLink: '/products?group=LP',
    imageUrl: '/images/lightning-protection-hero-2nd-img.webp?v=20261122v5',
    imageAlt:
      'Advanced lightning protection systems - Early Streamer Emission ESE air terminals, conventional copper rods, and surge protection devices SPDs',
    standards: 'IEC 62305 • BS EN 62305 • NFC 17-102 • NFPA 780',
    highlightColor: 'text-[#8DC63F]',
    glowColor: 'rgba(141,198,63,0.45)',
  },
  {
    id: 'earthing',
    category: 'Earthing & Grounding',
    shortName: 'Earthing',
    badge: 'Low-Impedance Grids',
    badgeIcon: Layers,
    titleLine1: 'Precision Earthing &',
    titleLine2: 'Grounding Solutions',
    subtitle: 'Low-Impedance Foundation & Deep Earth Grids',
    description:
      'Engineered copper earthing grids and low-impedance grounding for maximum electrical safety across UAE soil conditions.',
    ctaText: 'Explore Earthing',
    ctaLink: '/products?group=ER',
    imageUrl: '/images/earthing-grounding-hero.webp?v=20261122v5',
    imageAlt:
      'Precision earthing and grounding solutions - Copper earth rods, exothermic welding, earth pit, and copper tape conductors',
    standards: 'IEEE 80 • BS 7430',
    highlightColor: 'text-[#8DC63F]',
    glowColor: 'rgba(141,198,63,0.45)',
  },
  {
    id: 'electrical-mechanical-solutions',
    category: 'Electrical & Mechanical',
    shortName: 'Electrical',
    badge: 'Industrial & Infrastructure',
    badgeIcon: Wrench,
    titleLine1: 'Advanced Electrical &',
    titleLine2: 'Mechanical Solutions',
    subtitle: 'Engineered for Industrial & Infrastructure Applications',
    description:
      'Advanced electrical and mechanical solutions for industrial and infrastructure applications.',
    ctaText: 'Explore Solutions',
    ctaLink: '/products?group=ME',
    imageUrl: '/images/electrical-mechanical-solutions-hero.webp?v=20261122v5',
    imageAlt:
      'Advanced electrical and mechanical solutions UAE - Industrial centrifugal water pumps, booster pumps, gate valves, check valves, and pipe fittings',
    standards: 'DEWA • SEWA • ISO 9001 Compliant',
    highlightColor: 'text-[#8DC63F]',
    glowColor: 'rgba(141,198,63,0.45)',
  },
  {
    id: 'laboratory-equipment',
    category: 'Laboratory Equipment',
    shortName: 'Laboratory',
    badge: 'Research & Diagnostics',
    badgeIcon: Microscope,
    titleLine1: 'Complete Laboratory Equipments',
    titleLine2: 'for Better Tomorrow',
    subtitle: 'Quality Laboratory Equipment, Consumables & Accessories',
    description:
      'Quality laboratory equipment, consumables and accessories for multiple applications.',
    ctaText: 'Explore Equipment',
    ctaLink: '/products?group=LE',
    imageUrl: '/images/laboratory-equipment-hero.webp?v=20261122v5',
    imageAlt:
      'Complete laboratory equipment for research and diagnostics - Microscopes, centrifuges, analytical balances, spectrophotometers, and lab consumables',
    standards: 'ISO 17025 • GLP • CE Certified',
    highlightColor: 'text-[#8DC63F]',
    glowColor: 'rgba(141,198,63,0.45)',
  },
  {
    id: 'gym-equipment-maintenance',
    category: 'Gym Equipment Maintenance',
    shortName: 'Gym Care',
    badge: 'Fitness Equipment Care',
    badgeIcon: Dumbbell,
    titleLine1: 'Gym Equipment',
    titleLine2: 'Maintenance Services',
    subtitle: 'Expert Maintenance & Repair Solutions',
    description:
      "Expert maintenance and repair solutions to keep your gym equipment safe, reliable, and performing at its best.",
    ctaText: 'Explore Gym & Fitness',
    ctaLink: '/products?group=SP',
    imageUrl: '/images/gym-equipment-maintenance-hero.webp?v=20261122v5',
    imageAlt:
      'Gym equipment maintenance services - Commercial fitness machinery, treadmills, rowing machines, power racks, and repair solutions',
    standards: 'Certified Technicians • Preventive AMC • OEM Genuine Parts',
    highlightColor: 'text-[#8DC63F]',
    glowColor: 'rgba(141,198,63,0.45)',
  },
  {
    id: 'safety-equipment-supply',
    category: 'Safety Equipment Supply',
    shortName: 'Safety',
    badge: 'Workplace Protection & PPE',
    badgeIcon: HardHat,
    titleLine1: 'Safety Equipment Supply',
    titleLine2: '& Workplace Protection',
    subtitle: 'Reliable Safety Equipment Solutions & Certified PPE',
    description:
      'Reliable safety equipment solutions to ensure workplace protection, compliance and peace of mind.',
    ctaText: 'Explore Safety Products',
    ctaLink: '/products?group=SF',
    imageUrl: '/images/safety-equipment-supply-hero.webp?v=20261122v5',
    imageAlt:
      'Workplace protection, automation, and safety equipment supply - Industrial sensors, limit controls, safety relays, and instrumentation',
    standards: 'EN 397 • ANSI Z87.1 • OSHA Compliant',
    highlightColor: 'text-[#8DC63F]',
    glowColor: 'rgba(141,198,63,0.45)',
  },
  {
    id: 'commercial-packaging-solutions',
    category: 'Commercial Packaging',
    shortName: 'Packaging',
    badge: 'Packaging & Signage',
    badgeIcon: Boxes,
    titleLine1: 'Safety Equipment &',
    titleLine2: 'Commercial Packaging Solutions',
    subtitle: 'Reliable Safety & Packaging Products',
    description:
      'Reliable safety and packaging products ensuring workplace protection, product safety, and efficient handling.',
    ctaText: 'Explore Packaging',
    ctaLink: '/products?group=PK',
    imageUrl: '/images/commercial-packaging-safety-hero.webp?v=20261122v5',
    imageAlt:
      'Safety equipment and commercial packaging solutions - Heavy-duty cable drums, spools, coiled conductors, and packaging materials',
    standards: 'ISO 9001 • Eco-Friendly • Heavy Duty Material',
    highlightColor: 'text-[#8DC63F]',
    glowColor: 'rgba(141,198,63,0.45)',
  },
  {
    id: 'sports-equipment-solutions',
    category: 'Sports & Accessories',
    shortName: 'Sports',
    badge: 'Sports Equipment & Accessories',
    badgeIcon: Trophy,
    titleLine1: 'Sports Equipment &',
    titleLine2: 'Accessories',
    subtitle:
      'Premium sports products and accessories designed to support every game and fitness activity.',
    description:
      'Premium sports products and accessories designed to support every game and fitness activity.',
    ctaText: 'Explore Sports Products',
    ctaLink: '/products?group=SP',
    imageUrl: '/images/sports-equipment-solutions-hero.webp?v=20261122v5',
    imageAlt:
      'Sports equipment and accessories - Premium commercial athletic equipment, dumbbells, weights, rowing machines, and fitness accessories',
    standards: 'FIFA • FIBA • ITF Approved Standards',
    highlightColor: 'text-[#8DC63F]',
    glowColor: 'rgba(141,198,63,0.45)',
  },
  {
    id: 'delivering-excellence-multiple-sectors',
    category: 'Multi-Sector Solutions',
    shortName: 'Multi-Sector',
    badge: 'Delivering Excellence',
    badgeIcon: Globe,
    titleLine1: 'Delivering Excellence Across',
    titleLine2: 'Multiple Sectors',
    subtitle: 'One Company. Multiple Solutions. A Commitment to Quality.',
    description: 'One Company. Multiple Solutions. A Commitment to Quality.',
    ctaText: 'Explore All Solutions',
    ctaLink: '/products?group=EN',
    imageUrl: '/images/delivering-excellence-multiple-sectors-hero.webp?v=20261122v5',
    imageAlt:
      'Delivering excellence across multiple sectors - Solar PV renewable energy systems, hybrid inverters, battery storage BESS, and sustainable infrastructure',
    standards: 'DEWA • SEWA • Civil Defense • ISO 9001 Compliant',
    highlightColor: 'text-[#8DC63F]',
    glowColor: 'rgba(141,198,63,0.45)',
  },
];

interface HomeHeroClientProps {
  productCategoryCount?: number;
}

const SLIDE_DURATION_MS = 3000;

export default function HomeHeroClient({ productCategoryCount }: HomeHeroClientProps) {
  const { openServiceModal } = useEnquiryModal();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  // Touch swipe handling
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const totalSlides = HERO_SLIDES.length;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Timer: triggers once per slide duration (no high-frequency 50ms interval churn)
  useEffect(() => {
    if (isPaused) return;

    const timer = setTimeout(() => {
      nextSlide();
    }, SLIDE_DURATION_MS);

    return () => clearTimeout(timer);
  }, [isPaused, currentSlide, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 45;

    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
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
      aria-label="Vision Energy Hero Image Slider"
      className="relative w-full flex flex-col justify-between overflow-hidden bg-[#050608] mt-[var(--navbar-h,120px)] sm:mt-[var(--navbar-h,128px)] md:mt-[var(--navbar-h,134px)] lg:mt-[var(--navbar-h,140px)] xl:mt-[var(--navbar-h,144px)] h-[calc(100svh-var(--navbar-h,120px))] sm:h-[calc(100svh-var(--navbar-h,128px))] md:h-[calc(100svh-var(--navbar-h,134px))] lg:h-[calc(100svh-var(--navbar-h,140px))] xl:h-[calc(100svh-var(--navbar-h,144px))] min-h-[calc(100svh-var(--navbar-h,120px))] sm:min-h-[calc(100svh-var(--navbar-h,128px))] md:min-h-[calc(100svh-var(--navbar-h,134px))] lg:min-h-[calc(100svh-var(--navbar-h,140px))] xl:min-h-[calc(100svh-var(--navbar-h,144px))] pt-2 sm:pt-3 lg:pt-4 pb-2 sm:pb-3 lg:pb-4 px-2 sm:px-6 lg:px-8 select-none"
      style={{
        height: 'calc(100svh - var(--navbar-h, 140px))',
        minHeight: 'calc(100svh - var(--navbar-h, 140px))',
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* ============================================================ */}
      {/* Centered Website-Width Hero Slider Card                      */}
      {/* ============================================================ */}
      <div className="relative w-full max-w-[80rem] mx-auto flex-1 flex flex-col justify-between overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.85)] bg-[#090C12]">
        {/* ============================================================ */}
        {/* LAYER 1: Background Images Slider (Website Content Width)    */}
        {/* ============================================================ */}
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
          {HERO_SLIDES.map((slide, idx) => {
            const isActive = idx === currentSlide;
            // Don't render inactive slides in initial SSR HTML to save critical LCP network bandwidth
            if (idx !== 0 && !hasHydrated) return null;

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
                  priority={idx === 0}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                  fetchPriority={idx === 0 ? 'high' : 'low'}
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  className={`object-cover object-center transition-transform duration-[4000ms] ease-out ${
                    isActive ? 'scale-105' : 'scale-100'
                  }`}
                  quality={92}
                />
              </div>
            );
          })}
        </div>

        {/* Ambient Dark Gradient Scrim (High contrast for text without washing out the image) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/20 pointer-events-none z-10" />

        {/* ============================================================ */}
        {/* Mobile Top Segmented Progress Bar (Story-Style, GPU)         */}
        {/* ============================================================ */}
        <div className="relative z-30 w-full px-3 sm:px-4 pt-2.5 lg:hidden">
          <div
            className="grid gap-2 w-full"
            style={{ gridTemplateColumns: `repeat(${totalSlides}, minmax(0, 1fr))` }}
          >
            {HERO_SLIDES.map((slide, idx) => {
              const isSelected = idx === currentSlide;
              const isPassed = idx < currentSlide;
              return (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(idx)}
                  className="h-1 rounded-full bg-white/20 overflow-hidden relative"
                  aria-label={`Jump to ${slide.category}`}
                >
                  <div
                    key={`mobile-progress-${idx}-${currentSlide}`}
                    className="h-full bg-[#8DC63F] rounded-full origin-left will-change-transform"
                    style={{
                      transform: isPassed ? 'scaleX(1)' : isSelected ? undefined : 'scaleX(0)',
                      animation: isSelected && !isPaused ? `heroProgressFill ${SLIDE_DURATION_MS}ms linear forwards` : 'none',
                    }}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* ============================================================ */}
        {/* LAYER 3: Main Content (Slide Details & CTAs)                 */}
        {/* ============================================================ */}
        <div className="relative z-30 w-full px-5 sm:px-8 lg:px-10 my-auto flex-1 flex flex-col justify-center py-4 sm:py-6">
        <div className="max-w-[760px] text-left space-y-3 sm:space-y-4 lg:space-y-5">
          


          {/* H1 Heading */}
          <h1
            key={`title-${currentSlide}`}
            className="font-bold tracking-[-0.025em] leading-[1.16] sm:leading-[1.14] transition-all duration-400 animate-fadeIn text-left"
          >
            <span
              className="block text-white text-[26px] min-[360px]:text-[28px] sm:text-[36px] lg:text-[44px] xl:text-[52px]"
              style={{
                textShadow: '0 2px 14px rgba(5,6,8,0.95), 0 1px 3px rgba(5,6,8,0.8)',
              }}
            >
              {activeSlide.titleLine1}
            </span>
            <span
              className={`block font-extrabold text-[26px] min-[360px]:text-[28px] sm:text-[36px] lg:text-[44px] xl:text-[52px] mt-1 ${activeSlide.highlightColor}`}
              style={{
                textShadow: `0 0 24px ${activeSlide.glowColor}, 0 2px 12px rgba(5,6,8,0.95)`,
              }}
            >
              {activeSlide.titleLine2}
            </span>
          </h1>

          {/* Concise Slide Description */}
          <div key={`desc-${currentSlide}`} className="animate-fadeIn max-w-[360px] sm:max-w-[50ch] text-left pt-1">
            <p
              className="text-[#E2E8F0] font-normal text-[13.5px] sm:text-base lg:text-lg leading-relaxed"
              style={{
                textShadow: '0 2px 14px rgba(5,6,8,0.95)',
              }}
            >
              {activeSlide.description}
            </p>
          </div>

          {/* Action Buttons (Desktop & Mobile Redesigned) */}
          <div className="pt-3 sm:pt-5 flex flex-row items-center justify-start gap-2 sm:gap-4 w-full max-w-[420px] sm:max-w-none">
            {/* Primary Action Button */}
            <Link
              href={activeSlide.ctaLink}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 sm:gap-2 h-[44px] sm:h-[48px] px-3 sm:px-6 rounded-full bg-[#0B65B3] hover:bg-[#095292] text-white text-[12px] min-[360px]:text-[13px] sm:text-sm font-bold border border-[#8DC63F]/60 hover:border-[#8DC63F] shadow-[0_0_20px_rgba(11,101,179,0.4)] hover:shadow-[0_0_28px_rgba(141,198,63,0.5)] transition-all active:scale-[0.98] whitespace-nowrap"
            >
              <span className="whitespace-nowrap">{activeSlide.ctaText}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#8DC63F] shrink-0" />
            </Link>

            {/* Secondary Action Button */}
            <button
              onClick={() =>
                openServiceModal({
                  serviceSlug: activeSlide.id,
                  serviceTitle: `${activeSlide.category} Technical Consultation`,
                })
              }
              className="hero-consultation-btn flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 sm:gap-2 h-[44px] sm:h-[48px] px-3 sm:px-6 rounded-full bg-[#0B65B3]/20 hover:bg-[#0B65B3] border-2 border-[#0B65B3] hover:border-[#8DC63F] text-white text-[12px] min-[360px]:text-[13px] sm:text-sm font-semibold backdrop-blur-xl hover:shadow-[0_0_24px_rgba(141,198,63,0.4)] transition-all active:scale-[0.98] whitespace-nowrap"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#8DC63F] shrink-0" />
              <span className="whitespace-nowrap">Consultation</span>
            </button>
          </div>

          {/* ============================================================ */}
          {/* Desktop Interactive Slider Navigation Tabs */}
          {/* ============================================================ */}
          <div className="hidden lg:flex flex-wrap items-center gap-2 pt-6">
            {HERO_SLIDES.map((slide, idx) => {
              const isSelected = idx === currentSlide;
              const SlideIcon = slide.badgeIcon;
              return (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(idx)}
                  className={`hero-slider-tab group relative flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-300 border ${
                    isSelected
                      ? 'bg-[#0D1117]/90 border-[#8DC63F]/60 text-white shadow-lg shadow-[#8DC63F]/15'
                      : 'bg-[#0D1117]/40 border-white/10 text-white/70 hover:text-white hover:bg-[#0D1117]/70 hover:border-white/20'
                  }`}
                  aria-label={`Go to slide ${idx + 1}: ${slide.category}`}
                  aria-current={isSelected ? 'true' : 'false'}
                >
                  <SlideIcon
                    className={`w-3.5 h-3.5 transition-colors ${
                      isSelected ? slide.highlightColor : 'text-white/50 group-hover:text-white/80'
                    }`}
                  />
                  <span>{slide.category}</span>

                  {/* 3s Animated Progress Line (GPU-composited scaleX animation) */}
                  {isSelected && (
                    <div className="absolute bottom-0 left-2 right-2 h-[2px] bg-white/10 rounded-full overflow-hidden">
                      <div
                        key={`desktop-progress-${currentSlide}`}
                        className="h-full bg-[#8DC63F] origin-left will-change-transform"
                        style={{
                          animation: !isPaused ? `heroProgressFill ${SLIDE_DURATION_MS}ms linear forwards` : 'none',
                        }}
                      />
                    </div>
                  )}
                </button>
              );
            })}

            {/* Navigation Arrows */}
            <div className="flex items-center gap-1.5 ml-2 pl-2 border-l border-white/15">
              <button
                onClick={prevSlide}
                className="hero-arrow-btn w-8 h-8 rounded-lg bg-[#0B65B3]/20 hover:bg-[#0B65B3] border border-[#8DC63F]/40 hover:border-[#8DC63F] flex items-center justify-center text-[#8DC63F] hover:text-white hover:shadow-[0_0_14px_rgba(141,198,63,0.4)] transition-all"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={nextSlide}
                className="hero-arrow-btn w-8 h-8 rounded-lg bg-[#0B65B3]/20 hover:bg-[#0B65B3] border border-[#8DC63F]/40 hover:border-[#8DC63F] flex items-center justify-center text-[#8DC63F] hover:text-white hover:shadow-[0_0_14px_rgba(141,198,63,0.4)] transition-all"
                aria-label="Next slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* Mobile Interactive Quick-Tabs & Stats Bar */}
      {/* ============================================================ */}
      <div className="relative z-30 w-full px-3 sm:px-4 pb-[max(10px,env(safe-area-inset-bottom))] lg:hidden">
        
        {/* Mobile Quick Category Switcher Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none sm:grid sm:grid-cols-5 md:grid-cols-10 mb-2.5">
          {HERO_SLIDES.map((slide, idx) => {
            const isSelected = idx === currentSlide;
            const SlideIcon = slide.badgeIcon;
            return (
              <button
                key={slide.id}
                onClick={() => goToSlide(idx)}
                className={`h-[34px] px-2.5 sm:px-1 shrink-0 sm:shrink rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-all border ${
                  isSelected
                    ? 'bg-[#0D1117]/90 border-[#8DC63F] text-white shadow-md shadow-[#8DC63F]/20'
                    : 'bg-[#0D1117]/50 border-white/10 text-white/60 hover:text-white'
                }`}
              >
                <SlideIcon className={`w-3 h-3 shrink-0 ${isSelected ? 'text-[#8DC63F]' : 'text-white/40'}`} />
                <span className="whitespace-nowrap sm:truncate">{slide.shortName}</span>
              </button>
            );
          })}
        </div>

        {/* Quick Fact Tiles (2 Columns, Balanced) */}
        <div className="grid grid-cols-2 gap-2.5 w-full mb-2">
          {/* Tile A: 2018 Established */}
          <div className="h-[62px] [media(max-height:640px)]:h-[52px] bg-[#0D1117]/85 backdrop-blur-md border border-white/[0.08] rounded-xl flex flex-col items-center justify-center text-center p-1">
            <span className="text-[16px] [media(max-height:640px)]:text-[14px] font-bold text-white leading-tight">
              2018
            </span>
            <span className="text-[10px] [media(max-height:640px)]:text-[8px] text-[#A9B4C0] uppercase tracking-[0.04em] font-medium leading-tight mt-0.5">
              Established
            </span>
          </div>

          {/* Tile B: UAE and GCC */}
          <div className="h-[62px] [media(max-height:640px)]:h-[52px] bg-[#0D1117]/85 backdrop-blur-md border border-white/[0.08] rounded-xl flex flex-col items-center justify-center text-center p-1">
            <span className="text-[15px] [media(max-height:640px)]:text-[13px] font-bold text-white leading-tight">
              UAE and GCC
            </span>
            <span className="text-[10px] [media(max-height:640px)]:text-[8px] text-[#A9B4C0] uppercase tracking-[0.04em] font-medium leading-tight mt-0.5">
              Coverage
            </span>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
