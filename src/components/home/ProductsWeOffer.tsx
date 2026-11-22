'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';

export default function ProductsWeOffer() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const updateCoordinates = (clientX: number, clientY: number) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    sectionRef.current.style.setProperty('--mouse-x', `${x}px`);
    sectionRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    updateCoordinates(e.clientX, e.clientY);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    setIsHovered(true);
    updateCoordinates(e.clientX, e.clientY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLElement>) => {
    setIsHovered(true);
    if (e.touches[0]) {
      updateCoordinates(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLElement>) => {
    if (e.touches[0]) {
      updateCoordinates(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchEnd = () => {
    setIsHovered(false);
  };

  return (
    <section
      ref={sectionRef}
      id="products-we-offer"
      data-dark-hero="true"
      data-preserve-contrast="true"
      aria-labelledby="products-banner-heading"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative min-h-[440px] sm:min-h-[500px] lg:min-h-[560px] flex items-center justify-center overflow-hidden cursor-crosshair select-none"
      style={
        {
          backgroundColor: '#050608',
          '--mouse-x': '50%',
          '--mouse-y': '50%',
        } as React.CSSProperties
      }
    >
      {/* Background Image Collage - Clear, Sharp & Interactive Spotlight */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/products-collage-banner.webp?v=20261122v3"
          alt="Vision Energy Certified Engineering Supplies"
          fill
          loading="lazy"
          quality={85}
          sizes="100vw"
          className={`object-cover object-center transition-all duration-700 ease-out ${
            isHovered
              ? 'scale-[1.03] brightness-110 contrast-105'
              : 'scale-[1.01] brightness-90 contrast-100'
          }`}
        />

        {/* Base dark gradient overlay - clears to lower opacity on hover */}
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ease-out ${
            isHovered ? 'opacity-35' : 'opacity-65'
          }`}
          style={{
            background:
              'linear-gradient(180deg, rgba(5,6,8,0.70) 0%, rgba(5,6,8,0.40) 40%, rgba(5,6,8,0.40) 60%, rgba(5,6,8,0.75) 100%)',
          }}
          aria-hidden="true"
        />

        {/* Dynamic Spotlight Cutout: Where mouse hovers, the background gets completely clear and transparent */}
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ease-out ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background:
              'radial-gradient(circle 380px at var(--mouse-x, 50%) var(--mouse-y, 50%), transparent 0%, rgba(5,6,8,0.20) 45%, rgba(5,6,8,0.60) 100%)',
          }}
          aria-hidden="true"
        />

        {/* High-Luminance Spotlight Beam (Bright Light illuminating the products underneath the cursor) */}
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ease-out ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background:
              'radial-gradient(circle 340px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.30) 0%, rgba(141,198,63,0.18) 32%, rgba(11,101,179,0.15) 65%, transparent 100%)',
            mixBlendMode: 'screen',
          }}
          aria-hidden="true"
        />

        {/* Core Electric Bright Light (Intense center glow directly under mouse) */}
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-200 ease-out ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background:
              'radial-gradient(circle 140px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.12) 60%, transparent 100%)',
            mixBlendMode: 'screen',
          }}
          aria-hidden="true"
        />
      </div>

      {/* Centered Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center flex flex-col items-center justify-center pointer-events-auto">
        {/* Common Section Eyebrow Badge */}
        <Reveal staggerIndex={0}>
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/65 border border-white/20 backdrop-blur-md text-xs sm:text-[13px] font-bold text-[#8DC63F] uppercase tracking-[0.16em] mb-4 sm:mb-6 shadow-xl">
            <span className="w-2 h-2 rounded-full bg-[#8DC63F] animate-pulse" aria-hidden="true" />
            <span>Certified Engineering Supplies</span>
          </div>
        </Reveal>

        {/* 1-Line Centered Heading */}
        <Reveal staggerIndex={1}>
          <h2
            id="products-banner-heading"
            className="text-2xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold text-white tracking-tight leading-[1.2] text-balance mb-6 sm:mb-8 drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]"
          >
            Explore Our Comprehensive Product Range
          </h2>
        </Reveal>

        {/* Centered CTA Button to /products */}
        <Reveal staggerIndex={2}>
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-4.5 rounded-full bg-[#0B65B3] hover:bg-[#0c72ca] text-white font-bold text-base sm:text-lg shadow-[0_12px_32px_rgba(0,0,0,0.7)] hover:shadow-[0_12px_32px_rgba(141,198,63,0.35)] border border-white/25 hover:border-[#8DC63F] transition-all duration-300 group hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <span>Explore Our Products</span>
            <ArrowRight className="w-5 h-5 text-[#8DC63F] group-hover:translate-x-1.5 transition-transform duration-300" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
