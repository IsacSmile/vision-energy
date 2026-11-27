'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  EXPERTISE_TABS,
  EXPERTISE_TAB_IDS,
  type ExpertiseTabId,
} from '@/lib/data/expertise';
import Tabs from './Tabs';
import ExpertisePanel from './ExpertisePanel';
import '@/app/expertise/expertise.css';

function parseHashTab(hash: string): ExpertiseTabId | null {
  const cleaned = hash.replace(/^#/, '').trim().toLowerCase();
  if (EXPERTISE_TAB_IDS.includes(cleaned as ExpertiseTabId)) {
    return cleaned as ExpertiseTabId;
  }
  return null;
}

function getStickyHeaderOffset() {
  const header = document.querySelector('header');
  return header ? Math.ceil(header.getBoundingClientRect().height) : 106;
}

export default function ExpertiseClient() {
  const [activeTab, setActiveTab] = useState<ExpertiseTabId>('lightning');
  const sectionRef = useRef<HTMLElement>(null);

  // Sync with URL hash on initial mount and browser back/forward
  useEffect(() => {
    const applyHash = (scrollIntoView: boolean) => {
      const fromHash = parseHashTab(window.location.hash);
      if (fromHash) {
        setActiveTab(fromHash);
        if (scrollIntoView && sectionRef.current) {
          const rect = sectionRef.current.getBoundingClientRect();
          const top = window.scrollY + rect.top - getStickyHeaderOffset();
          window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
        }
      }
    };

    applyHash(Boolean(window.location.hash));

    const handleHashChange = () => applyHash(false);
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  const handleSelectTab = useCallback((tabId: ExpertiseTabId) => {
    setActiveTab(tabId);

    if (typeof window !== 'undefined') {
      const targetHash = `#${tabId}`;
      if (window.location.hash !== targetHash) {
        window.history.pushState(null, '', targetHash);
      }

      // If scrolled deep inside the previous panel, return smoothly to the top of the tab section
      if (sectionRef.current) {
        const headerOffset = getStickyHeaderOffset();
        const rect = sectionRef.current.getBoundingClientRect();
        if (rect.top < headerOffset) {
          const y = window.scrollY + rect.top - headerOffset;
          window.scrollTo({
            top: Math.max(0, y),
            behavior: 'auto',
          });
        }
      }
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="expertise-tabs"
      aria-label="Engineering Expertise Categories"
      className="scroll-mt-[88px] sm:scroll-mt-[96px] lg:scroll-mt-[102px] xl:scroll-mt-[106px] bg-white dark:bg-[#050608] border-b border-slate-200 dark:border-[#1F2937]/80"
    >
      <Tabs tabs={EXPERTISE_TABS} activeTab={activeTab} onSelectTab={handleSelectTab} />
      {EXPERTISE_TABS.map((tabConfig) => (
        <ExpertisePanel
          key={tabConfig.id}
          tab={tabConfig}
          isActive={tabConfig.id === activeTab}
        />
      ))}

      {/* Subtle indexable discipline cross-links row for search crawlers & direct deep-linking */}
      <nav
        aria-label="Dedicated discipline engineering pages"
        className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 py-4 border-t border-slate-200/80 dark:border-white/[0.06] flex flex-wrap items-center justify-between gap-3 text-xs text-[#475569] dark:text-[#A9B4C0]"
      >
        <span className="font-semibold uppercase tracking-[0.12em] text-[#0B65B3] dark:text-[#8DC63F]">
          Dedicated Discipline Guides
        </span>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {EXPERTISE_TABS.map((tab) => (
            <Link
              key={tab.id}
              href={`/expertise/${tab.id}`}
              className="px-3 py-1 rounded-full border border-slate-200/90 dark:border-white/10 hover:border-[#0B65B3] dark:hover:border-[#8DC63F] hover:text-[#0B65B3] dark:hover:text-[#8DC63F] transition-colors font-medium"
            >
              {tab.label} Engineering Guide
            </Link>
          ))}
        </div>
      </nav>
    </section>
  );
}

