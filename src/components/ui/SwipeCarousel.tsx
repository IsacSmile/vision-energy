'use client';

import React, { useRef, useState, useEffect } from 'react';

interface SwipeCarouselProps {
  children: React.ReactNode[];
  ariaLabel: string;
  lgGridClass?: string;
  itemClasses?: string[];
}

export default function SwipeCarousel({
  children,
  ariaLabel,
  lgGridClass = 'lg:grid lg:grid-cols-3 lg:gap-6',
  itemClasses,
}: SwipeCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Sync scroll position to active index dot using IntersectionObserver
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const cards = Array.from(track.children) as HTMLElement[];
    if (cards.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cards.indexOf(entry.target as HTMLElement);
            if (index !== -1) {
              setActiveIndex(index);
            }
          }
        });
      },
      {
        root: track,
        threshold: 0.6,
      }
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [children.length]);

  const scrollToCard = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(track.children) as HTMLElement[];
    if (cards[index]) {
      cards[index].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIndex = Math.min(activeIndex + 1, children.length - 1);
      scrollToCard(nextIndex);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIndex = Math.max(activeIndex - 1, 0);
      scrollToCard(prevIndex);
    }
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      className="w-full relative"
    >
      {/* Mobile Horizontal Snap Track / Desktop Grid Container */}
      <div
        ref={trackRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className={`flex lg:grid overflow-x-auto lg:overflow-visible snap-x snap-mandatory no-scrollbar gap-4 lg:gap-6 px-5 lg:px-0 scroll-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] rounded-xl ${lgGridClass}`}
      >
        {children.map((child, idx) => (
          <div
            key={idx}
            className={`w-[82vw] sm:w-[320px] lg:w-auto shrink-0 snap-start flex flex-col h-full ${
              itemClasses?.[idx] || ''
            }`}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Mobile Dot Indicators */}
      <div className="flex lg:hidden items-center justify-center gap-1 mt-4" aria-hidden="true">
        {children.map((_, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => scrollToCard(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              aria-current={isActive ? 'true' : undefined}
              className="w-[44px] h-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] rounded-full"
            >
              <span
                className={`transition-all duration-300 rounded-full ${
                  isActive
                    ? 'w-6 h-1.5 bg-[#8DC63F]'
                    : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
