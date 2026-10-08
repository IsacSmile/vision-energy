'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useEnquiryModal } from '@/components/modals/EnquiryModalProvider';
import {
  ArrowRight,
  Zap,
  Layers,
  ShieldAlert,
  Factory,
  ChevronLeft,
  ChevronRight,
  PhoneCall,
} from 'lucide-react';
import LightningButton from '@/components/ui/LightningButton';

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
    id: 'earthing',
    category: 'Earthing & Grounding',
    shortName: 'Earthing',
    badge: 'Low-Impedance Grids',
    badgeIcon: Layers,
    titleLine1: 'Precision Earthing &',
    titleLine2: 'Grounding Solutions',
    subtitle: 'Low-Impedance Foundation & Deep Earth Grids',
    description:
      'Engineered copper earthing grids and low-impedance grounding for maximum electrical safety.',
    ctaText: 'Explore Earthing',
    ctaLink: '/products/es-01-earth-rods-couplers-accessories',
    imageUrl:
      'https://images.unsplash.com/photo-1565249167139-75006b429343?q=80&w=1600&auto=format&fit=crop',
    imageAlt:
      'Industrial electrical grounding and power infrastructure installation',
    standards: 'IEEE 80 • BS 7430',
    highlightColor: 'text-[#8DC63F]',
    glowColor: 'rgba(141,198,63,0.45)',
  },
  {
    id: 'surge-protection',
    category: 'Surge Protection',
    shortName: 'Surge SPD',
    badge: 'Transient Overvoltage Defense',
    badgeIcon: ShieldAlert,
    titleLine1: 'Mission-Critical Surge',
    titleLine2: 'Protection Devices',
    subtitle: 'Safeguarding Power, Control & Data Systems',
    description:
      'High-performance Type 1, 2 & 3 SPDs protecting critical power, telemetry, and data networks.',
    ctaText: 'Explore Surge',
    ctaLink: '/products/sp-01-surge-protection-devices-spd',
    imageUrl:
      'https://images.unsplash.com/photo-1722666825118-02f3c12d4434?q=80&w=1600&auto=format&fit=crop',
    imageAlt:
      'High-performance electrical power engineering and surge protection infrastructure',
    standards: 'IEC 61643-11 • UL 1449',
    highlightColor: 'text-[#38BDF8]',
    glowColor: 'rgba(56,189,248,0.45)',
  },
  {
    id: 'industrial-engineering',
    category: 'Industrial Applications',
    shortName: 'Industrial',
    badge: 'Turnkey MEP & Infrastructure',
    badgeIcon: Factory,
    titleLine1: 'Industrial & Engineering',
    titleLine2: 'Turnkey Solutions',
    subtitle: 'Comprehensive Electrical, Mechanical & Solar Integration',
    description:
      'Turnkey MEP engineering, testing, and high-reliability power infrastructure solutions.',
    ctaText: 'Explore Solutions',
    ctaLink: '/products',
    imageUrl:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop',
    imageAlt:
      'Modern commercial high-rise building and industrial engineering architecture in UAE',
    standards: 'ISO 9001 • UAE Standards',
    highlightColor: 'text-[#8DC63F]',
    glowColor: 'rgba(141,198,63,0.45)',
  },
  {
    id: 'lightning-protection',
    category: 'Lightning Protection',
    shortName: 'Lightning',
    badge: 'Direct-Strike Mitigation',
    badgeIcon: Zap,
    titleLine1: 'Advanced Lightning',
    titleLine2: 'Protection Systems',
    subtitle: 'Engineered Direct-Strike & Structural Safety',
    description:
      'Certified structural lightning interception and ESE systems safeguarding infrastructure across the UAE.',
    ctaText: 'Explore Lightning',
    ctaLink: '/products/lp-01-conventional-lightning-protection-systems',
    imageUrl:
      'https://plus.unsplash.com/premium_photo-1664298006973-e98eb94d006c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    imageAlt:
      'Dramatic cityscape thunderstorm and structural lightning protection system',
    standards: 'IEC 62305 • NFPA 780',
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
  const [progress, setProgress] = useState(0);

  // Touch swipe handling
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const totalSlides = HERO_SLIDES.length;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    setProgress(0);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    setProgress(0);
  }, [totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setProgress(0);
  };

  // Timer and progress tick every 3 seconds (3000ms)
  useEffect(() => {
    if (isPaused) return;

    const intervalStep = 50;
    const stepIncrement = (intervalStep / SLIDE_DURATION_MS) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + stepIncrement;
      });
    }, intervalStep);

    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

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
      className="relative w-full h-[100svh] min-h-[100svh] flex flex-col justify-between overflow-hidden bg-[#050608] pt-[var(--mobile-header-h,56px)] lg:pt-[var(--header-h,80px)] select-none"
      style={{ minHeight: '100svh', height: '100svh' }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* ============================================================ */}
      {/* LAYER 1: Background Images Slider (Crossfade + Subtle Scale) */}
      {/* ============================================================ */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
        {HERO_SLIDES.map((slide, idx) => {
          const isActive = idx === currentSlide;
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
                loading="eager"
                fetchPriority={idx === 0 ? 'high' : 'auto'}
                sizes="100vw"
                className={`object-cover object-center transition-transform duration-[4000ms] ease-out ${
                  isActive ? 'scale-105' : 'scale-100'
                }`}
                quality={90}
              />
            </div>
          );
        })}
      </div>

      {/* 10% Overlay Only */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none z-10" />

      {/* ============================================================ */}
      {/* Mobile Top Segmented Progress Bar (Story-Style) */}
      {/* ============================================================ */}
      <div className="relative z-30 w-full max-w-[80rem] mx-auto px-4 pt-2 lg:hidden">
        <div className="grid grid-cols-4 gap-1.5 w-full">
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
                  className="h-full bg-[#8DC63F] transition-all duration-75 ease-linear rounded-full"
                  style={{
                    width: isPassed ? '100%' : isSelected ? `${progress}%` : '0%',
                  }}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* ============================================================ */}
      {/* LAYER 3: Main Content (Slide Details & CTAs) */}
      {/* ============================================================ */}
      <div className="relative z-30 w-full max-w-[80rem] mx-auto px-5 sm:px-6 lg:px-8 my-auto flex-1 flex flex-col justify-center py-4 sm:py-8">
        <div className="max-w-[760px] text-left space-y-4 sm:space-y-6">
          


          {/* H1 Heading */}
          <h1
            key={`title-${currentSlide}`}
            className="font-bold tracking-[-0.025em] leading-[1.16] sm:leading-[1.14] transition-all duration-400 animate-fadeIn text-left"
          >
            <span
              className="block text-white text-[30px] sm:text-[40px] lg:text-[60px]"
              style={{
                textShadow: '0 2px 14px rgba(5,6,8,0.95), 0 1px 3px rgba(5,6,8,0.8)',
              }}
            >
              {activeSlide.titleLine1}
            </span>
            <span
              className={`block font-extrabold text-[30px] sm:text-[40px] lg:text-[60px] mt-1 ${activeSlide.highlightColor}`}
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
          <div className="pt-3 sm:pt-5 flex flex-row items-center justify-start gap-3 sm:gap-4 w-full max-w-[380px] sm:max-w-none">
            {/* Primary Action Button */}
            <Link
              href={activeSlide.ctaLink}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 h-[46px] sm:h-[48px] px-5 sm:px-6 rounded-full bg-gradient-to-r from-[#8DC63F] to-[#7CB332] text-[#050608] text-[13px] sm:text-sm font-bold shadow-[0_0_20px_rgba(141,198,63,0.35)] hover:shadow-[0_0_30px_rgba(141,198,63,0.55)] transition-all active:scale-[0.98]"
            >
              <span>{activeSlide.ctaText}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Secondary Action Button */}
            <button
              onClick={() =>
                openServiceModal({
                  serviceSlug: activeSlide.id,
                  serviceTitle: `${activeSlide.category} Technical Consultation`,
                })
              }
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 h-[46px] sm:h-[48px] px-4 sm:px-6 rounded-full bg-white/[0.08] hover:bg-white/[0.14] border border-white/20 text-white text-[13px] sm:text-sm font-semibold backdrop-blur-xl transition-all active:scale-[0.98]"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#8DC63F]" />
              <span>Consultation</span>
            </button>
          </div>

          {/* ============================================================ */}
          {/* Desktop Interactive Slider Navigation Tabs */}
          {/* ============================================================ */}
          <div className="hidden lg:flex items-center gap-3 pt-6">
            {HERO_SLIDES.map((slide, idx) => {
              const isSelected = idx === currentSlide;
              const SlideIcon = slide.badgeIcon;
              return (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(idx)}
                  className={`group relative flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-300 border ${
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

                  {/* 3s Animated Progress Line */}
                  {isSelected && (
                    <div className="absolute bottom-0 left-2 right-2 h-[2px] bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#8DC63F] transition-all duration-75 ease-linear"
                        style={{ width: `${progress}%` }}
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
                className="w-8 h-8 rounded-lg bg-[#0D1117]/60 hover:bg-[#0D1117] border border-white/10 hover:border-white/25 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={nextSlide}
                className="w-8 h-8 rounded-lg bg-[#0D1117]/60 hover:bg-[#0D1117] border border-white/10 hover:border-white/25 flex items-center justify-center text-white/70 hover:text-white transition-colors"
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
      <div className="relative z-30 w-full max-w-[80rem] mx-auto px-4 pb-[max(12px,env(safe-area-inset-bottom))] lg:hidden">
        
        {/* Mobile Quick Category Switcher Tabs */}
        <div className="grid grid-cols-4 gap-1.5 mb-2.5">
          {HERO_SLIDES.map((slide, idx) => {
            const isSelected = idx === currentSlide;
            const SlideIcon = slide.badgeIcon;
            return (
              <button
                key={slide.id}
                onClick={() => goToSlide(idx)}
                className={`h-[34px] rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1 transition-all border ${
                  isSelected
                    ? 'bg-[#0D1117]/90 border-[#8DC63F] text-white shadow-md shadow-[#8DC63F]/20'
                    : 'bg-[#0D1117]/50 border-white/10 text-white/60 hover:text-white'
                }`}
              >
                <SlideIcon className={`w-3 h-3 ${isSelected ? 'text-[#8DC63F]' : 'text-white/40'}`} />
                <span className="truncate">{slide.shortName}</span>
              </button>
            );
          })}
        </div>

        {/* Quick Fact Tiles */}
        <div
          className={`grid ${
            productCategoryCount && productCategoryCount > 0 ? 'grid-cols-3' : 'grid-cols-2'
          } gap-2 w-full mb-2`}
        >
          {/* Tile A: 2018 Established */}
          <div className="h-[62px] [media(max-height:640px)]:h-[52px] bg-[#0D1117]/85 backdrop-blur-md border border-white/[0.08] rounded-xl flex flex-col items-center justify-center text-center p-1">
            <span className="text-[16px] [media(max-height:640px)]:text-[14px] font-bold text-white leading-tight">
              2018
            </span>
            <span className="text-[10px] [media(max-height:640px)]:text-[8px] text-[#A9B4C0] uppercase tracking-[0.04em] font-medium leading-tight mt-0.5">
              Established
            </span>
          </div>

          {/* Tile B: 3 UAE Locations */}
          <div className="h-[62px] [media(max-height:640px)]:h-[52px] bg-[#0D1117]/85 backdrop-blur-md border border-white/[0.08] rounded-xl flex flex-col items-center justify-center text-center p-1">
            <span className="text-[16px] [media(max-height:640px)]:text-[14px] font-bold text-white leading-tight">
              3
            </span>
            <span className="text-[10px] [media(max-height:640px)]:text-[8px] text-[#A9B4C0] uppercase tracking-[0.04em] font-medium leading-tight mt-0.5">
              UAE Locations
            </span>
          </div>

          {/* Tile C: Product Categories */}
          {Boolean(productCategoryCount && productCategoryCount > 0) && (
            <div className="h-[62px] [media(max-height:640px)]:h-[52px] bg-[#0D1117]/85 backdrop-blur-md border border-white/[0.08] rounded-xl flex flex-col items-center justify-center text-center p-1 overflow-hidden">
              <span className="text-[16px] [media(max-height:640px)]:text-[14px] font-bold text-white leading-tight">
                {productCategoryCount}
              </span>
              <span className="text-[10px] [media(max-height:640px)]:text-[8px] text-[#A9B4C0] uppercase tracking-[0.04em] font-medium leading-tight mt-0.5 truncate w-full">
                Categories
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
