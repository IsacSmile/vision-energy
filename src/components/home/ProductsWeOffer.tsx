'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';

export default function ProductsWeOffer() {
  return (
    <section
      id="products-we-offer"
      data-dark-hero="true"
      data-preserve-contrast="true"
      aria-labelledby="products-banner-heading"
      className="relative min-h-[440px] sm:min-h-[500px] lg:min-h-[560px] flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#050608' }}
    >
      {/* Background Image Collage - Clear, Sharp & Responsive */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/products-collage-banner.jpg"
          alt="Vision Energy Certified Engineering Supplies"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover object-center scale-[1.01]"
        />
        {/* Transparent dark gradient overlay to guarantee text legibility without hiding the product collage */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, rgba(5,6,8,0.55) 0%, rgba(5,6,8,0.35) 40%, rgba(5,6,8,0.35) 60%, rgba(5,6,8,0.60) 100%)',
          }}
          aria-hidden="true"
        />
        {/* Subtle radial focus vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at center, rgba(5,6,8,0.20) 0%, rgba(5,6,8,0.65) 100%)',
          }}
          aria-hidden="true"
        />
      </div>

      {/* Centered Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center flex flex-col items-center justify-center">
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
            className="inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-4.5 rounded-full bg-[#0B65B3] hover:bg-[#0c72ca] text-white font-bold text-base sm:text-lg shadow-[0_12px_32px_rgba(0,0,0,0.7)] hover:shadow-[0_12px_32px_rgba(141,198,63,0.35)] border border-white/25 hover:border-[#8DC63F] transition-all duration-300 group hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Explore Our Products</span>
            <ArrowRight className="w-5 h-5 text-[#8DC63F] group-hover:translate-x-1.5 transition-transform duration-300" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
