'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

const Lightning = dynamic(() => import('@/components/ui/Lightning'), { ssr: false });
const LightningCentered = dynamic(() => import('@/components/ui/LightningCentered'), { ssr: false });

export const LIGHTNING_HUE = 210; // Brand blue (hue 210)
export const LIGHTNING_SPEED = 0.7; // Speed tuned for smooth non-strobing animation
export const LIGHTNING_SIZE = 1;
export const BOLT_POSITION = 0.75; // Default 0.75 (75% across hero width, valid 0.65 to 0.85)
export const MOBILE_WANDER = 0.5; // Named constant (0.4 = nearly straight, 0.7 = more wandering)

export default function HeroLightning() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [inView, setInView] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [lightningProps, setLightningProps] = useState({
    xOffset: -0.7,
    intensity: 1.0,
    size: 1.0,
  });

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleMenuState = (e: any) => {
      setMenuOpen(Boolean(e.detail?.open));
    };
    window.addEventListener('mobile-menu-state', handleMenuState);
    return () => window.removeEventListener('mobile-menu-state', handleMenuState);
  }, []);

  useEffect(() => {
    // Check prefers-reduced-motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReducedMotion(true);
      return;
    }

    const updatePosition = () => {
      const el = containerRef.current;
      const width = el ? el.clientWidth : window.innerWidth;
      const height = el ? el.clientHeight : window.innerHeight;

      if (width >= 1024) {
        setIsMobile(false);
        // Desktop (>= 1024px): compute xOffset from aspect ratio
        const aspect = width / (height || 1);
        let targetPos = BOLT_POSITION; // 0.75

        // On very wide screens (aspect above 2.2), cap bolt position so it never sits farther than 12rem outside container's right edge
        if (aspect > 2.2) {
          const rootFontSize = typeof document !== 'undefined'
            ? (parseFloat(getComputedStyle(document.documentElement).fontSize) || 16)
            : 16;
          // Container is centered max-w-[80rem], so container right edge is width/2 + 40rem.
          // 12rem outside container right edge = width/2 + 40rem + 12rem = width/2 + 52rem.
          const maxBoltX = width / 2 + 52 * rootFontSize;
          const maxPos = maxBoltX / width;
          if (targetPos > maxPos) {
            targetPos = maxPos;
          }
        }

        const calculatedXOffset = -(targetPos - 0.5) * 2 * aspect;
        const calculatedSize = width > 2000 ? 1.15 : LIGHTNING_SIZE;

        setLightningProps({
          xOffset: calculatedXOffset,
          intensity: 1.0,
          size: calculatedSize,
        });
      } else {
        // Mobile / Tablet (< 1024px)
        setIsMobile(true);
        setLightningProps({
          xOffset: 0,
          intensity: 0.85,
          size: LIGHTNING_SIZE,
        });
      }
    };

    updatePosition();

    // Use ResizeObserver to measure hero wrapper smoothly
    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && containerRef.current) {
      resizeObserver = new ResizeObserver(() => {
        updatePosition();
      });
      resizeObserver.observe(containerRef.current);
    } else {
      window.addEventListener('resize', updatePosition, { passive: true });
    }

    // Mount only after first paint (~250ms)
    const timer = setTimeout(() => {
      setMounted(true);
    }, 250);

    // IntersectionObserver to pause/unmount rendering when off-screen
    const el = containerRef.current;
    if (!el) return () => clearTimeout(timer);

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.01 }
    );

    observer.observe(el);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      if (resizeObserver) {
        resizeObserver.disconnect();
      } else {
        window.removeEventListener('resize', updatePosition);
      }
    };
  }, []);

  if (reducedMotion || !mounted || !inView || menuOpen) {
    return <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative' }} />;
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative opacity-70 lg:opacity-100 transition-opacity duration-300"
    >
      {isMobile ? (
        <LightningCentered
          hue={LIGHTNING_HUE}
          xOffset={0}
          wander={MOBILE_WANDER}
          speed={LIGHTNING_SPEED}
          intensity={0.85}
          size={1}
          octaves={6}
          maxDpr={1}
        />
      ) : (
        <Lightning
          hue={LIGHTNING_HUE}
          xOffset={lightningProps.xOffset}
          speed={LIGHTNING_SPEED}
          intensity={lightningProps.intensity}
          size={lightningProps.size}
        />
      )}
    </div>
  );
}
