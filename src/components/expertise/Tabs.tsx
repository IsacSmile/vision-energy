'use client';

import React, { useRef } from 'react';
import type { ExpertiseTabConfig, ExpertiseTabId } from '@/lib/data/expertise';

interface TabsProps {
  tabs: ExpertiseTabConfig[];
  activeTab: ExpertiseTabId;
  onSelectTab: (tabId: ExpertiseTabId) => void;
}

export default function Tabs({ tabs, activeTab, onSelectTab }: TabsProps) {
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

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
    <div className="sticky top-[88px] sm:top-[96px] lg:top-[102px] xl:top-[106px] z-30 w-full bg-white/95 dark:bg-[#050608]/95 backdrop-blur-md border-b border-slate-200 dark:border-[#1F2937]">
      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div
          role="tablist"
          aria-label="Engineering Expertise Categories"
          className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-3 flex-nowrap"
        >
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
                aria-controls="expertise-tabpanel"
                tabIndex={isActive ? 0 : -1}
                data-preserve-contrast={isActive ? 'true' : undefined}
                onClick={() => onSelectTab(tab.id)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={`shrink-0 whitespace-nowrap px-3.5 sm:px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#050608] cursor-pointer ${
                  isActive
                    ? 'bg-[#0B65B3] text-white'
                    : 'bg-transparent text-slate-600 dark:text-[#A9B4C0] hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-white/[0.06] dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

