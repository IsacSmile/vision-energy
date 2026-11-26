'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  EXPERTISE_TABS,
  EXPERTISE_TAB_IDS,
  getExpertiseTab,
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
            behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
              ? 'auto'
              : 'smooth',
          });
        }
      }
    }
  }, []);

  const currentTabConfig = getExpertiseTab(activeTab);

  return (
    <section
      ref={sectionRef}
      id="expertise-tabs"
      aria-label="Engineering Expertise Categories"
      className="scroll-mt-[88px] sm:scroll-mt-[96px] lg:scroll-mt-[102px] xl:scroll-mt-[106px] bg-white dark:bg-[#050608] border-b border-slate-200 dark:border-[#1F2937]/80"
    >
      <Tabs tabs={EXPERTISE_TABS} activeTab={activeTab} onSelectTab={handleSelectTab} />
      <ExpertisePanel key={currentTabConfig.id} tab={currentTabConfig} />
    </section>
  );
}

