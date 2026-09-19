'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

const Lightning = dynamic(() => import('@/components/ui/Lightning'), { ssr: false });

export const LIGHTNING_HUE = 210; // Brand blue (hue 210)
export const LIGHTNING_SPEED = 0.7; // Speed tuned for smooth non-strobing animation
export const LIGHTNING_SIZE = 1;

export default function HeroLightning() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [inView, setInView] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [lightningProps, setLightningProps] = useState({
    xOffset: -0.7,
    intensity: 1.0,
  });

  useEffect(() => {
    // Check prefers-reduced-motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReducedMotion(true);
      return;
    }

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        // Desktop (>= 1024px): right third
        setLightningProps({ xOffset: -0.7, intensity: 1.0 });
      } else {
        // Mobile / Tablet (< 1024px): offset -0.6 & wrapper opacity 0.5 for robust contrast
        setLightningProps({ xOffset: -0.6, intensity: 1.0 });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

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
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (reducedMotion || !mounted || !inView) {
    return <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative' }} />;
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative opacity-50 lg:opacity-100 transition-opacity duration-300"
    >
      <Lightning
        hue={LIGHTNING_HUE}
        xOffset={lightningProps.xOffset}
        speed={LIGHTNING_SPEED}
        intensity={lightningProps.intensity}
        size={LIGHTNING_SIZE}
      />
    </div>
  );
}
