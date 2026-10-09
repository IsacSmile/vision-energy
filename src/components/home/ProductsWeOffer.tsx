'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronRight } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import { useEnquiryModal } from '@/components/modals/EnquiryModalProvider';
import { PRODUCTS_WE_OFFER_ROWS, ProductRowGroup, ProductCardItem } from '@/data/products-we-offer';

export default function ProductsWeOffer() {
  const { openProductModal } = useEnquiryModal();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [activeDots, setActiveDots] = useState<Record<number, number>>({});
  const [coveredRows, setCoveredRows] = useState<Record<number, boolean>>({});

  const rowContainersRef = useRef<(HTMLDivElement | null)[]>([]);
  const scrollStripsRef = useRef<(HTMLDivElement | null)[]>([]);
  const isTickingRef = useRef(false);

  // Check reduced motion preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const media = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(media.matches);
      const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      media.addEventListener('change', listener);
      return () => media.removeEventListener('change', listener);
    }
  }, []);

  // Track stacking scale and dimming of covered rows on scroll (desktop only)
  useEffect(() => {
    if (prefersReducedMotion || typeof window === 'undefined') return;

    const handleScroll = () => {
      if (!isTickingRef.current) {
        window.requestAnimationFrame(() => {
          const isDesktop = window.innerWidth >= 1024;
          if (!isDesktop) {
            // On mobile & tablet, rows flow naturally with clean vertical scroll, no sticky stacking
            setCoveredRows({});
            isTickingRef.current = false;
            return;
          }

          const newCovered: Record<number, boolean> = {};

          rowContainersRef.current.forEach((el, idx) => {
            if (!el) return;
            const rect = el.getBoundingClientRect();
            // A row is considered "covered" if the next row has reached close to its sticky position
            const nextEl = rowContainersRef.current[idx + 1];
            if (nextEl) {
              const nextRect = nextEl.getBoundingClientRect();
              if (nextRect.top <= rect.top + 25) {
                newCovered[idx] = true;
              }
            }
          });

          setCoveredRows(newCovered);
          isTickingRef.current = false;
        });
        isTickingRef.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prefersReducedMotion]);

  // Handle horizontal scroll on mobile strips to update active dot
  const handleStripScroll = useCallback((rowIdx: number) => {
    const strip = scrollStripsRef.current[rowIdx];
    if (!strip) return;
    const cardWidth = strip.firstElementChild ? (strip.firstElementChild as HTMLElement).offsetWidth : 280;
    const scrollLeft = strip.scrollLeft;
    const activeIndex = Math.min(2, Math.max(0, Math.round(scrollLeft / cardWidth)));

    setActiveDots((prev) => (prev[rowIdx] === activeIndex ? prev : { ...prev, [rowIdx]: activeIndex }));
  }, []);

  // Click dot to scroll to card on mobile
  const scrollToCard = (rowIdx: number, cardIdx: number) => {
    const strip = scrollStripsRef.current[rowIdx];
    if (!strip) return;
    const cardWidth = strip.firstElementChild ? (strip.firstElementChild as HTMLElement).offsetWidth : 280;
    strip.scrollTo({
      left: cardIdx * cardWidth,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  const handleCardClick = (product: ProductCardItem) => {
    if (product.code) {
      openProductModal({
        categoryCode: product.code,
        categoryTitle: product.name,
      });
    }
  };

  return (
    <section
      id="products-we-offer"
      aria-labelledby="products-we-offer-heading"
      className="py-16 md:py-24 lg:py-32 bg-[#050608] relative overflow-visible"
    >
      {/* Background Ambience */}
      <div
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#8DC63F]/[0.025] blur-[160px] rounded-full"
        aria-hidden="true"
      />

      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 space-y-12 lg:space-y-16 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-white/[0.08]">
          <div className="space-y-3 max-w-2xl">
            <Reveal staggerIndex={0}>
              <div className="inline-flex items-center gap-2 text-xs sm:text-[13px] font-bold text-[#8DC63F] uppercase tracking-[0.16em]">
                <span className="w-6 h-[2px] bg-[#8DC63F] rounded-full shrink-0" aria-hidden="true" />
                <span>Certified Engineering Supplies</span>
              </div>
            </Reveal>

            <Reveal staggerIndex={1}>
              <h2
                id="products-we-offer-heading"
                className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-white tracking-tight leading-[1.15]"
              >
                Products We Offer
              </h2>
            </Reveal>

            <Reveal staggerIndex={2}>
              <p className="text-base sm:text-lg text-[#A9B4C0] leading-relaxed max-w-xl">
                27 core product systems engineered for lightning protection, grounding, power distribution, and UAE infrastructure compliance.
              </p>
            </Reveal>
          </div>

          <Reveal staggerIndex={3}>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0D1117] hover:bg-[#161B22] border border-white/10 hover:border-[#8DC63F]/50 text-sm font-semibold text-white hover:text-[#8DC63F] transition-all group shrink-0 shadow-lg"
            >
              <span>Explore Full 57+ Categories</span>
              <ChevronRight className="w-4 h-4 text-[#8DC63F] group-hover:translate-x-1 transition-transform" />
            </Link>
          </Reveal>
        </div>

        {/* 9 Stacking Rows: Natural fluid scrolling on Mobile, Sticky Stacking on Desktop (lg+) */}
        <div className="relative space-y-10 sm:space-y-12 lg:space-y-16 pb-16 sm:pb-20 lg:pb-28">
          {PRODUCTS_WE_OFFER_ROWS.map((group, rowIdx) => {
            const isCovered = Boolean(coveredRows[rowIdx]);
            // Desktop sticky offset: header (80px) + margin + subtle 4px tab offset per row
            const desktopTop = `calc(var(--header-offset, 80px) + 16px + ${rowIdx * 4}px)`;

            return (
              <div
                key={group.row}
                ref={(el) => {
                  rowContainersRef.current[rowIdx] = el;
                }}
                style={{
                  ['--row-top-desktop' as string]: desktopTop,
                  zIndex: 10 + rowIdx,
                  transform: !prefersReducedMotion && isCovered ? 'scale(0.96)' : 'scale(1)',
                  opacity: !prefersReducedMotion && isCovered ? 0.45 : 1,
                  transformOrigin: 'top center',
                }}
                className={`relative lg:sticky lg:top-[var(--row-top-desktop)] rounded-2xl sm:rounded-3xl bg-[#0C1017] border border-white/[0.14] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] p-4 sm:p-5 lg:p-6 transition-all duration-300 ease-out`}
              >

                {/* Row Header Bar - High contrast, guaranteed visible */}
                <div className="flex items-center justify-between pb-3 mb-3.5 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2.5">
                    <span className="text-[11px] sm:text-xs font-mono font-bold text-[#8DC63F] bg-[#8DC63F]/15 border border-[#8DC63F]/30 px-3 py-0.5 rounded-full shadow-sm">
                      ROW {group.row < 10 ? `0${group.row}` : group.row}
                    </span>
                    <span className="text-xs sm:text-[14px] font-bold uppercase tracking-wider text-white">
                      {group.label}
                    </span>
                  </div>

                  <span className="hidden sm:inline-block text-[11px] font-medium text-white/50">
                    3 Core Product Lines
                  </span>
                </div>

                {/* Product Cards: Desktop Grid (3 equal cols) / Mobile & Tablet Horizontal Scroll-Snap Strip */}
                <div
                  ref={(el) => {
                    scrollStripsRef.current[rowIdx] = el;
                  }}
                  onScroll={() => handleStripScroll(rowIdx)}
                  style={{
                    touchAction: 'pan-y pan-x',
                    overscrollBehaviorX: 'contain',
                    overscrollBehaviorY: 'auto',
                    scrollSnapType: 'x mandatory',
                    WebkitOverflowScrolling: 'touch',
                  }}
                  className="flex lg:grid lg:grid-cols-3 gap-3.5 sm:gap-4 lg:gap-5 overflow-x-auto lg:overflow-visible scrollbar-none pb-2 sm:pb-1"
                >
                  {group.products.map((product) => {
                    const productHref = product.slug
                      ? `/products/${product.slug}`
                      : product.code
                      ? `/products?codes=${product.code}`
                      : '/products';

                    return (
                      <Link
                        key={product.id}
                        href={productHref}
                        className="w-[82vw] sm:w-[46vw] lg:w-auto shrink-0 snap-start snap-always bg-white rounded-xl shadow-md border border-slate-200/80 hover:border-[#8DC63F]/50 flex flex-col justify-between overflow-hidden group cursor-pointer text-slate-900 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl h-[360px] sm:h-[385px] lg:h-[400px]"
                      >
                        {/* Top: Product Image (aspect-[16/10], contain, light neutral background) */}
                        <div className="relative aspect-[16/10] sm:aspect-[4/3] max-h-[190px] w-full bg-[#F4F6F8] border-b border-slate-100 flex items-center justify-center overflow-hidden shrink-0">
                          <Image
                            src={product.image}
                            alt={product.alt}
                            fill
                            sizes="(max-width: 640px) 82vw, (max-width: 1024px) 46vw, 30vw"
                            className="object-contain p-3 sm:p-3.5 transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                            loading="lazy"
                          />
                        </div>

                        {/* Middle: Heading Tab */}
                        <div className="pt-3 pb-1.5 flex justify-start">
                          <div
                            className="bg-[#050608] text-white py-1.5 pl-3 sm:pl-3.5 pr-6 sm:pr-7 font-bold text-[13.5px] sm:text-[15px] uppercase tracking-wide truncate max-w-[96%] select-none shadow-sm"
                            style={{
                              clipPath: 'polygon(0 0, calc(100% - 13px) 0, 100% 100%, 0 100%)',
                            }}
                          >
                            {product.name}
                          </div>
                        </div>

                        {/* Bottom: Description (Readable font size) */}
                        <div className="px-3 sm:px-3.5 pt-1 pb-3 flex-1 flex flex-col justify-between">
                          <p className="text-[#334155] text-[13.5px] sm:text-[14px] lg:text-[14.5px] leading-[1.6] line-clamp-2 sm:line-clamp-3 font-normal">
                            {product.description}
                          </p>
                        </div>

                        {/* Card Bottom Action Bar */}
                        <div className="px-3 sm:px-3.5 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between mt-auto">
                          <span className="text-xs sm:text-[12.5px] font-bold uppercase tracking-wider text-[#0B65B3] group-hover:text-[#8DC63F] transition-colors">
                            Enquire / Specs
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#0B65B3] group-hover:text-[#8DC63F] transition-transform group-hover:translate-x-1 duration-300" />
                        </div>
                      </Link>
                    );
                  })}
                </div>

                {/* Mobile & Tablet Dot Indicators under each strip (<1024px) */}
                <div className="flex lg:hidden items-center justify-center gap-1.5 pt-3">
                  {[0, 1, 2].map((dotIdx) => {
                    const activeIndex = activeDots[rowIdx] || 0;
                    const isActive = activeIndex === dotIdx;
                    return (
                      <button
                        key={dotIdx}
                        type="button"
                        onClick={() => scrollToCard(rowIdx, dotIdx)}
                        aria-label={`Scroll to product ${dotIdx + 1} of row ${group.row}`}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          isActive ? 'w-6 bg-[#8DC63F]' : 'w-1.5 bg-white/30 hover:bg-white/60'
                        }`}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
