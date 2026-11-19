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
      aria-labelledby="products-banner-heading"
      className="relative min-h-[460px] sm:min-h-[520px] lg:min-h-[580px] flex items-center justify-center overflow-hidden bg-[#050608]"
    >
      {/* Background Image Collage */}
      <div className="absolute inset-0">
        <Image
          src="/images/products-collage-banner.jpg"
          alt="Vision Energy Certified Engineering Supplies"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Layered dark overlays for text legibility while keeping products visible */}
        <div className="absolute inset-0 bg-[#050608]/70 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-transparent to-[#050608]/85" />
        <div className="absolute inset-0 bg-radial-[at_center_center] from-transparent via-[#050608]/40 to-[#050608]/90" />
      </div>

      {/* Centered Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center flex flex-col items-center justify-center">
        {/* Common Section Eyebrow */}
        <Reveal staggerIndex={0}>
          <div className="inline-flex items-center gap-2.5 text-xs sm:text-[13px] font-bold text-[#8DC63F] uppercase tracking-[0.16em] mb-4 sm:mb-5">
            <span className="w-6 h-[2px] bg-[#8DC63F] rounded-full shrink-0" aria-hidden="true" />
            <span>Certified Engineering Supplies</span>
            <span className="w-6 h-[2px] bg-[#8DC63F] rounded-full shrink-0" aria-hidden="true" />
          </div>
        </Reveal>

        {/* 1-Line Centered Heading */}
        <Reveal staggerIndex={1}>
          <h2
            id="products-banner-heading"
            className="text-2xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold text-white tracking-tight leading-[1.2] text-balance mb-8 sm:mb-10"
          >
            Explore Our Comprehensive Product Range
          </h2>
        </Reveal>

        {/* Centered CTA Button to /products */}
        <Reveal staggerIndex={2}>
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-4.5 rounded-full bg-[#0B65B3] hover:bg-[#0c72ca] text-white font-semibold text-base sm:text-lg shadow-[0_10px_35px_rgba(11,101,179,0.45)] hover:shadow-[0_15px_45px_rgba(141,198,63,0.35)] border border-white/20 hover:border-[#8DC63F] transition-all duration-300 group hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Explore Our Products</span>
            <ArrowRight className="w-5 h-5 text-[#8DC63F] group-hover:translate-x-1.5 transition-transform duration-300" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
