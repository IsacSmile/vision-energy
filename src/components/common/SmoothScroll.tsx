'use client';

import React, { useEffect, useRef } from 'react';

interface SmoothScrollProps {
  children?: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    // Only initialize smooth scroll on desktop with mouse pointer (never on mobile touch)
    if (
      typeof window === 'undefined' ||
      window.innerWidth < 1024 ||
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    let isMounted = true;
    let tickerHandler: any = null;

    // Asynchronously import Lenis and GSAP when the main thread is idle
    const initLenis = async () => {
      try {
        const [{ default: Lenis }, { default: gsap }, { ScrollTrigger }] = await Promise.all([
          import('lenis'),
          import('gsap'),
          import('gsap/ScrollTrigger'),
        ]);

        if (!isMounted) return;

        gsap.registerPlugin(ScrollTrigger);

        const lenis = new Lenis({
          duration: 1.1,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 0.95,
        });

        lenisRef.current = lenis;

        lenis.on('scroll', ScrollTrigger.update);

        tickerHandler = (time: number) => {
          lenis.raf(time * 1000);
        };

        gsap.ticker.add(tickerHandler);
        gsap.ticker.lagSmoothing(0);
      } catch (err) {
        console.warn('SmoothScroll initialization deferred or skipped:', err);
      }
    };

    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(initLenis, { timeout: 2000 });
    } else {
      setTimeout(initLenis, 1000);
    }

    return () => {
      isMounted = false;
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      if (tickerHandler) {
        import('gsap').then(({ default: gsap }) => gsap.ticker.remove(tickerHandler)).catch(() => {});
      }
    };
  }, []);

  return <>{children}</>;
}
