'use client';

import React, { useLayoutEffect, useRef, useState } from 'react';
import { CloudLightning, Shield, ShieldCheck, type LucideIcon } from 'lucide-react';
import type { SubTabPanel } from '@/lib/data/expertise';

const SAFETY_PHASE_ICONS: Record<string, LucideIcon> = {
  before: Shield,
  during: CloudLightning,
  after: ShieldCheck,
};

interface SubTabsProps {
  idPrefix: string;
  ariaLabel: string;
  items: SubTabPanel[];
  activeId: string;
  onChange: (id: string) => void;
  tone?: 'light' | 'navy';
}

export default function SubTabs({
  idPrefix,
  ariaLabel,
  items,
  activeId,
  onChange,
  tone = 'light',
}: SubTabsProps) {
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const trackRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState<{ left: number; width: number; ready: boolean }>({
    left: 0,
    width: 0,
    ready: false,
  });

  useLayoutEffect(() => {
    const updateIndicator = () => {
      const idx = items.findIndex((i) => i.id === activeId);
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
  }, [activeId, items]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | null = null;
    if (e.key === 'ArrowRight') {
      nextIndex = (index + 1) % items.length;
    } else if (e.key === 'ArrowLeft') {
      nextIndex = (index - 1 + items.length) % items.length;
    } else if (e.key === 'Home') {
      nextIndex = 0;
    } else if (e.key === 'End') {
      nextIndex = items.length - 1;
    }

    if (nextIndex !== null) {
      e.preventDefault();
      const target = items[nextIndex];
      onChange(target.id);
      buttonRefs.current[nextIndex]?.focus();
    }
  };

  const isNavy = tone === 'navy';

  return (
    <div className="overflow-x-auto no-scrollbar">
      <div
        ref={trackRef}
        role="tablist"
        aria-label={ariaLabel}
        className={`relative inline-flex items-center gap-1 p-1 rounded-full border flex-nowrap ${
          isNavy
            ? 'expertise-subtabs-navy'
            : 'bg-slate-100/95 dark:bg-[#0D1117] border-slate-200/90 dark:border-white/10'
        }`}
      >
        {indicator.ready && (
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute top-1 bottom-1 left-0 rounded-full transition-[transform,width] duration-[250ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:transition-none ${
              isNavy
                ? 'bg-[linear-gradient(135deg,#0B65B3_0%,#095292_100%)] shadow-[0_6px_16px_-4px_rgba(11,101,179,0.65)] border border-white/15'
                : 'bg-[#0B65B3] shadow-sm'
            }`}
            style={{
              width: `${indicator.width}px`,
              transform: `translateX(${indicator.left}px)`,
            }}
          />
        )}

        {items.map((item, idx) => {
          const isActive = item.id === activeId;
          const PhaseIcon = isNavy ? SAFETY_PHASE_ICONS[item.id] : undefined;
          return (
            <button
              key={item.id}
              ref={(el) => {
                buttonRefs.current[idx] = el;
              }}
              id={`${idPrefix}-subtab-${item.id}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`${idPrefix}-subpanel-${item.id}`}
              tabIndex={isActive ? 0 : -1}
              data-preserve-contrast={isActive ? 'true' : undefined}
              onClick={() => onChange(item.id)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className={`relative z-10 shrink-0 whitespace-nowrap inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] cursor-pointer ${
                isActive
                  ? `text-white ${!indicator.ready ? 'bg-[#0B65B3]' : ''}`
                  : isNavy
                  ? 'expertise-subtab-navy-inactive'
                  : 'text-[#0A192F]/75 dark:text-[#A9B4C0] hover:text-[#0A192F] dark:hover:text-white'
              }`}
            >
              {PhaseIcon && <PhaseIcon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />}
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
