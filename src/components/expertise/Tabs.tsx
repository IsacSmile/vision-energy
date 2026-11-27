'use client';

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Dumbbell, FlaskConical, Zap } from 'lucide-react';
import type { ExpertiseTabConfig, ExpertiseTabId } from '@/lib/data/expertise';

interface TabsProps {
  tabs: ExpertiseTabConfig[];
  activeTab: ExpertiseTabId;
  onSelectTab: (tabId: ExpertiseTabId) => void;
}

function EarthGroundIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 3v9" />
      <path d="M4.5 12h15" />
      <path d="M7.5 16h9" />
      <path d="M10 20h4" />
    </svg>
  );
}

function renderTabIcon(id: ExpertiseTabId) {
  switch (id) {
    case 'lightning':
      return <Zap className="w-4 h-4 shrink-0" aria-hidden="true" />;
    case 'earthing':
      return <EarthGroundIcon className="w-4 h-4 shrink-0" />;
    case 'gym':
      return <Dumbbell className="w-4 h-4 shrink-0" aria-hidden="true" />;
    case 'laboratory':
      return <FlaskConical className="w-4 h-4 shrink-0" aria-hidden="true" />;
  }
}

export default function Tabs({ tabs, activeTab, onSelectTab }: TabsProps) {
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const trackRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [indicator, setIndicator] = useState<{ left: number; width: number; ready: boolean }>({
    left: 0,
    width: 0,
    ready: false,
  });

  // Detect sticky state via 1px sentinel above the tab bar
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const header = document.querySelector('header');
    const headerH = header ? Math.ceil(header.getBoundingClientRect().height) : 106;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: `-${headerH + 1}px 0px 0px 0px` }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  // Sync sliding pill indicator to active tab
  useLayoutEffect(() => {
    const updateIndicator = () => {
      const idx = tabs.findIndex((t) => t.id === activeTab);
      const btn = buttonRefs.current[idx];
      if (!btn) return;
      setIndicator({
        left: btn.offsetLeft,
        width: btn.offsetWidth,
        ready: true,
      });
    };

    updateIndicator();

    const ro = new ResizeObserver(updateIndicator);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener('resize', updateIndicator, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateIndicator);
    };
  }, [activeTab, tabs]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | null = null;

    if (e.key === 'ArrowRight') {
      nextIndex = (index + 1) % tabs.length;
    } else if (e.key === 'ArrowLeft') {
      nextIndex = (index - 1 + tabs.length) % tabs.length;
    } else if (e.key === 'Home') {
      nextIndex = 0;
    } else if (e.key === 'End') {
      nextIndex = tabs.length - 1;
    }

    if (nextIndex !== null) {
      e.preventDefault();
      const targetTab = tabs[nextIndex];
      onSelectTab(targetTab.id);
      buttonRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <>
      <div ref={sentinelRef} className="h-px w-full pointer-events-none" aria-hidden="true" />
      <div
        className={`sticky top-[88px] sm:top-[96px] lg:top-[102px] xl:top-[106px] z-30 w-full bg-white/95 dark:bg-[#050608]/95 backdrop-blur-md border-b border-slate-200/90 dark:border-[#1F2937] transition-shadow duration-200 ${
          isSticky
            ? 'shadow-[0_8px_24px_-8px_rgba(10,25,47,0.14)] dark:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.75)]'
            : ''
        }`}
      >
        <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="overflow-x-auto no-scrollbar">
            <div
              ref={trackRef}
              role="tablist"
              aria-label="Engineering Expertise Categories"
              className="relative inline-flex items-center gap-1 p-1.5 rounded-full bg-slate-100/95 dark:bg-[#0D1117] border border-slate-200/90 dark:border-white/10 flex-nowrap"
            >
              {/* Sliding active pill indicator */}
              {indicator.ready && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute top-1.5 bottom-1.5 left-0 rounded-full bg-[#0B65B3] shadow-[0_4px_12px_rgba(11,101,179,0.28)] transition-[transform,width] duration-[250ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:transition-none"
                  style={{
                    width: `${indicator.width}px`,
                    transform: `translateX(${indicator.left}px)`,
                  }}
                />
              )}

              {tabs.map((tab, index) => {
                const isActive = tab.id === activeTab;
                return (
                  <button
                    key={tab.id}
                    ref={(el) => {
                      buttonRefs.current[index] = el;
                    }}
                    id={`expertise-tab-${tab.id}`}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`expertise-tabpanel-${tab.id}`}
                    tabIndex={isActive ? 0 : -1}
                    data-preserve-contrast={isActive ? 'true' : undefined}
                    onClick={() => onSelectTab(tab.id)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className={`relative z-10 shrink-0 whitespace-nowrap inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-sm font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#050608] cursor-pointer ${
                      isActive
                        ? `text-white ${!indicator.ready ? 'bg-[#0B65B3]' : ''}`
                        : 'text-[#0A192F]/80 dark:text-[#A9B4C0] hover:text-[#0A192F] dark:hover:text-white'
                    }`}
                  >
                    {renderTabIcon(tab.id)}
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
