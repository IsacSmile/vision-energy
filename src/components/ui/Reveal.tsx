'use client';

import React, { useEffect, useRef, useState } from 'react';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  staggerIndex?: number;
  as?: 'div' | 'section' | 'article' | 'span' | 'header' | 'footer';
  className?: string;
  style?: React.CSSProperties;
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

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
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
