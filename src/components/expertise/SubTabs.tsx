'use client';

import React, { useRef } from 'react';
import type { SubTabPanel } from '@/lib/data/expertise';

interface SubTabsProps {
  idPrefix: string;
  ariaLabel: string;
  items: SubTabPanel[];
  activeId: string;
  onChange: (id: string) => void;
}

export default function SubTabs({
  idPrefix,
  ariaLabel,
  items,
  activeId,
  onChange,
}: SubTabsProps) {
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

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

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className="inline-flex max-w-full items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-[#050608] border border-slate-200 dark:border-white/10 overflow-x-auto no-scrollbar flex-nowrap"
    >
      {items.map((item, idx) => {
        const isActive = item.id === activeId;
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
            aria-controls={`${idPrefix}-subpanel`}
            tabIndex={isActive ? 0 : -1}
            data-preserve-contrast={isActive ? 'true' : undefined}
            onClick={() => onChange(item.id)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            className={`shrink-0 whitespace-nowrap px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] cursor-pointer ${
              isActive
                ? 'bg-[#0B65B3] text-white'
                : 'bg-transparent text-slate-600 dark:text-[#A9B4C0] hover:bg-white/70 hover:text-slate-900 dark:hover:bg-white/[0.06] dark:hover:text-white'
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

