'use client';

import React, { useEffect, useRef, useState } from 'react';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  staggerIndex?: number;
  as?: 'div' | 'section' | 'article' | 'span' | 'header' | 'footer' | 'li';
  className?: string;
  style?: React.CSSProperties;
}

// Global shared IntersectionObserver singleton to minimize mobile main-thread CPU overhead
let sharedObserver: IntersectionObserver | null = null;
const observerCallbacks = new Map<Element, () => void>();

function getSharedObserver() {
  if (typeof window === 'undefined') return null;
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const cb = observerCallbacks.get(entry.target);
            if (cb) {
              cb();
              observerCallbacks.delete(entry.target);
              sharedObserver?.unobserve(entry.target);
            }
          }
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );
  }
  return sharedObserver;
}

export default function Reveal({
  children,
  delay,
  staggerIndex,
  as: Component = 'div',
  className = '',
  style = {},
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // prefers-reduced-motion check
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) {
      setIsVisible(true);
      return;
    }

    const observer = getSharedObserver();
    if (!observer) {
      setIsVisible(true);
      return;
    }

    observerCallbacks.set(el, () => setIsVisible(true));
    observer.observe(el);

    return () => {
      observerCallbacks.delete(el);
      observer.unobserve(el);
    };
  }, []);

  const calculatedDelay =
    delay !== undefined
      ? delay
      : staggerIndex !== undefined
      ? Math.min(staggerIndex * 70, 400)
      : 0;

  const combinedStyle: React.CSSProperties = {
    ...style,
    transition: 'opacity 600ms cubic-bezier(0.22, 1, 0.36, 1), transform 600ms cubic-bezier(0.22, 1, 0.36, 1)',
    transitionDelay: `${calculatedDelay}ms`,
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
    willChange: 'opacity, transform',
  };

  return React.createElement(
    Component,
    {
      ref: ref as any,
      className,
      style: combinedStyle,
    },
    children
  );
}
