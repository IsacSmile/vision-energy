'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  X,
  ChevronDown,
  ArrowUpRight,
  Send,
  MessageSquare,
} from 'lucide-react';
import { useEnquiryModal } from '@/components/modals/EnquiryModalProvider';
import Reveal from '@/components/ui/Reveal';
import LightningButton from '@/components/ui/LightningButton';

export interface CategoryData {
  id: string;
  code: string;
  slug: string;
  groupPrefix: string;
  title: string;
  description: string;
  families: string;
  sortOrder: number;
}

export interface GroupData {
  prefix: string;
  label: string;
  categories: CategoryData[];
}

interface CatalogueIndexProps {
  groups: GroupData[];
  totalCategoryCount: number;
}

function formatFamilies(families: any): string {
  if (Array.isArray(families)) return families.join(' · ');
  if (typeof families === 'string') return families.split(';').join(' · ');
  return '';
}

export default function CatalogueIndex({
  groups,
  totalCategoryCount,
}: CatalogueIndexProps) {
  const { openProductModal } = useEnquiryModal();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeGroupIndex, setActiveGroupIndex] = useState<number>(0);
  const [openAccordionIndex, setOpenAccordionIndex] = useState<number>(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const hoverTimer = useRef<NodeJS.Timeout | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Filter categories across all groups when search input has text
  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return [];

    const matches: CategoryData[] = [];
    groups.forEach((g) => {
      g.categories.forEach((cat) => {
        if (
          cat.title.toLowerCase().includes(query) ||
          cat.code.toLowerCase().includes(query) ||
          cat.families.toLowerCase().includes(query)
        ) {
          matches.push(cat);
        }
      });
    });
    return matches;
  }, [searchQuery, groups]);

  // Hover intent delay (120ms) for switching active group on desktop
  const handlePointerEnterWithDelay = (index: number) => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => {
      setActiveGroupIndex(index);
    }, 120);
  };

  const handlePointerLeaveTab = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
  };

  const handleGroupSelect = (index: number) => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setActiveGroupIndex(index);
  };

  // Keyboard navigation for vertical tablist (Up / Down / Home / End)
  const handleKeyDownTab = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = index;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      nextIndex = (index + 1) % groups.length;
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      nextIndex = (index - 1 + groups.length) % groups.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      nextIndex = groups.length - 1;
    }

    if (nextIndex !== index) {
      setActiveGroupIndex(nextIndex);
      tabRefs.current[nextIndex]?.focus();
    }
  };

  const toggleAccordion = (index: number) => {
    setOpenAccordionIndex((prev) => (prev === index ? -1 : index));
  };

  const activeGroup = groups && groups.length > 0 ? (groups[activeGroupIndex] || groups[0]) : null;

  if (!groups || groups.length === 0 || !activeGroup) {
    return (
      <div className="rounded-[24px] border border-white/[0.08] bg-[#0D1117] p-8 text-center space-y-4">
        <p className="text-base text-[#A9B4C0]">No product categories available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 lg:space-y-12">
      {/* 1. SEARCH INPUT BAR (Full Width) */}
      <div className="relative w-full">
        <div className="relative flex items-center">
          <Search className="absolute left-6 w-5 h-5 text-[#A9B4C0] pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') setSearchQuery('');
            }}
            placeholder={`Search ${totalCategoryCount} categories by name, code or product`}
            aria-label="Search categories"
            className="w-full h-[56px] pl-14 pr-12 rounded-full bg-transparent border border-white/[0.12] text-base text-white placeholder-[#A9B4C0] focus:outline-none focus:border-[#0B65B3] focus:ring-2 focus:ring-[#0B65B3]/40 transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
              className="absolute right-5 p-1 rounded-full text-[#A9B4C0] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F]"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* 2. LIVE SEARCH RESULTS VIEW (Appears when search has text) */}
      {searchQuery.trim() !== '' ? (
        <div className="rounded-[24px] border border-white/[0.08] bg-[#0D1117] p-6 lg:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
            <h3 className="text-xl font-semibold text-white">
              Search Results ({searchResults.length})
            </h3>
            {searchResults.length > 0 && (
              <Link
                href={`/products?q=${encodeURIComponent(searchQuery)}`}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#8DC63F] hover:underline"
              >
                <span>See all results</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            )}
          </div>

          {searchResults.length > 0 ? (
            <div className="divide-y divide-white/[0.08]">
              {searchResults.slice(0, 10).map((cat) => (
                <div
                  key={cat.id}
                  className="group py-4 flex items-center justify-between gap-4 transition-colors hover:bg-white/[0.02] px-2 rounded-lg"
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <span className="font-mono text-xs font-semibold text-[#8DC63F] w-[72px] shrink-0">
                      {cat.code}
                    </span>
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/products/${cat.slug}`}
                        className="text-[17px] font-medium text-white group-hover:text-[#8DC63F] transition-colors hover:underline block truncate focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] rounded"
                      >
                        {cat.title}
                      </Link>
                      <span className="text-sm text-[#A9B4C0] truncate block mt-0.5">
                        {formatFamilies(cat.families)}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    aria-label={`Send enquiry for ${cat.title}`}
                    onClick={() =>
                      openProductModal({ categoryCode: cat.code, categoryTitle: cat.title })
                    }
                    className="w-11 h-11 rounded-full border border-white/15 bg-white/5 hover:bg-[#8DC63F]/20 hover:border-[#8DC63F] text-white hover:text-[#8DC63F] flex items-center justify-center shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F]"
                  >
                    <Send className="w-4 h-4 stroke-[1.5]" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center space-y-4">
              <p className="text-base text-[#A9B4C0]">
                No matches found for &quot;{searchQuery}&quot;.
              </p>
              <div className="text-sm text-[#A9B4C0]">
                <span>Can&apos;t find it? </span>
                <button
                  type="button"
                  onClick={() => openProductModal()}
                  className="font-semibold text-[#8DC63F] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] rounded"
                >
                  Send an enquiry
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <>
          {/* 3. DESKTOP VIEW (lg and up): Index + Live Preview Panel */}
          <div className="hidden lg:grid grid-cols-12 gap-16 items-start">
            {/* LEFT COLUMN: Group Index List (col-span-5) */}
            <div className="col-span-5 relative">
              {/* 2px Lime Indicator Bar */}
              <div
                className={`absolute left-0 w-[2px] h-[64px] bg-[#8DC63F] z-10 ${
                  prefersReducedMotion
                    ? ''
                    : 'transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]'
                }`}
                style={{
                  transform: `translateY(${activeGroupIndex * 64}px)`,
                }}
                aria-hidden="true"
              />

              {/* Tablist */}
              <ol
                role="tablist"
                aria-orientation="vertical"
                className="relative divide-y divide-white/[0.08] border-y border-white/[0.08]"
              >
                {groups.map((group, index) => {
                  const isActive = activeGroupIndex === index;
                  const numStr = (index + 1).toString().padStart(2, '0');

                  return (
                    <li key={group.prefix} className="w-full">
                      <button
                        ref={(el) => {
                          tabRefs.current[index] = el;
                        }}
                        type="button"
                        role="tab"
                        id={`tab-${group.prefix}`}
                        aria-selected={isActive}
                        aria-controls={`panel-${group.prefix}`}
                        tabIndex={isActive ? 0 : -1}
                        onClick={() => handleGroupSelect(index)}
                        onPointerEnter={() => handlePointerEnterWithDelay(index)}
                        onPointerLeave={handlePointerLeaveTab}
                        onFocus={() => handleGroupSelect(index)}
                        onKeyDown={(e) => handleKeyDownTab(e, index)}
                        className={`w-full min-h-[64px] py-[20px] px-4 flex items-center justify-between gap-4 text-left group transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] rounded-lg ${
                          isActive ? 'bg-white/[0.02]' : 'hover:bg-white/[0.01]'
                        }`}
                      >
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                          {/* Monospace Index Number */}
                          <span
                            className={`font-mono text-[13px] tracking-[0.08em] tabular-nums shrink-0 transition-colors duration-300 ${
                              isActive ? 'text-[#8DC63F] font-semibold' : 'text-[#A9B4C0]'
                            }`}
                          >
                            {numStr}
                          </span>

                          {/* Group Label */}
                          <span
                            className={`text-[clamp(1.25rem,1.9vw,1.75rem)] font-medium leading-snug truncate transition-colors duration-300 ${
                              isActive
                                ? 'text-white font-semibold'
                                : 'text-white/60 group-hover:text-white'
                            }`}
                          >
                            {group.label}
                          </span>
                        </div>

                        {/* Right: Category Count + Active Arrow */}
                        <div className="flex items-center gap-3 shrink-0">
                          <span
                            className={`text-xs transition-colors duration-300 ${
                              isActive ? 'text-white font-medium' : 'text-[#A9B4C0]'
                            }`}
                          >
                            {group.categories.length} categories
                          </span>
                          <ArrowUpRight
                            className={`w-5 h-5 text-[#8DC63F] transition-opacity duration-300 ${
                              isActive ? 'opacity-100' : 'opacity-0'
                            }`}
                          />
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>

            {/* RIGHT COLUMN: Sticky Preview Panel (col-span-7) */}
            <div
              role="tabpanel"
              id={`panel-${activeGroup.prefix}`}
              aria-labelledby={`tab-${activeGroup.prefix}`}
              className="col-span-7 sticky top-[7rem] self-start rounded-[24px] border border-white/[0.08] bg-[#0D1117] p-8 min-h-[480px] flex flex-col justify-between overflow-hidden shadow-2xl"
            >
              <div className="space-y-6">
                {/* Panel Header */}
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                  <h3 className="text-2xl font-semibold text-white">{activeGroup.label}</h3>
                  <span className="text-sm text-[#A9B4C0]">
                    {activeGroup.categories.length} categories
                  </span>
                </div>

                {/* Categories Scrollable List */}
                <div className="max-h-[380px] overflow-y-auto pr-2 divide-y divide-white/[0.08] space-y-1">
                  {activeGroup.categories.map((cat) => (
                    <div
                      key={cat.id}
                      className="group/row min-h-[72px] py-4 flex items-center justify-between gap-4 transition-colors hover:bg-white/[0.02] px-2 rounded-lg"
                    >
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        {/* Code Column (72px) */}
                        <span className="font-mono text-xs text-[#8DC63F] font-semibold w-[72px] shrink-0 group-hover/row:text-white transition-colors">
                          {cat.code}
                        </span>

                        {/* Title & Families Column */}
                        <div className="flex-1 min-w-0 group-hover/row:translate-x-[6px] transition-transform duration-300">
                          <Link
                            href={`/products/${cat.slug}`}
                            className="text-[17px] font-medium text-white group-hover/row:text-[#8DC63F] transition-colors block truncate focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] rounded"
                          >
                            {cat.title}
                          </Link>
                          <span className="text-sm text-[#A9B4C0] truncate block mt-0.5">
                            {formatFamilies(cat.families)}
                          </span>
                        </div>
                      </div>

                      {/* 44px Enquire Button */}
                      <button
                        type="button"
                        aria-label={`Send enquiry for ${cat.title}`}
                        onClick={() =>
                          openProductModal({ categoryCode: cat.code, categoryTitle: cat.title })
                        }
                        className="w-11 h-11 rounded-full border border-white/15 bg-white/5 hover:bg-[#8DC63F]/20 hover:border-[#8DC63F] text-white hover:text-[#8DC63F] flex items-center justify-center shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F]"
                      >
                        <Send className="w-4 h-4 stroke-[1.5]" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Group Link */}
              <div className="pt-4 border-t border-white/[0.08] mt-4">
                <Link
                  href={`/products?group=${activeGroup.prefix}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#8DC63F] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] rounded"
                >
                  <span>View all {activeGroup.label}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* 4. MOBILE VIEW (below lg): Accordion List */}
          <div className="block lg:hidden space-y-8">
            <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
              {groups.map((group, index) => {
                const isOpen = openAccordionIndex === index;
                const numStr = (index + 1).toString().padStart(2, '0');
                const buttonId = `acc-btn-${group.prefix}`;
                const panelId = `acc-panel-${group.prefix}`;

                return (
                  <div key={group.prefix} className="w-full">
                    {/* Accordion Button */}
                    <button
                      id={buttonId}
                      type="button"
                      onClick={() => toggleAccordion(index)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className="w-full min-h-[64px] py-4 flex items-center justify-between gap-4 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] rounded-lg px-2 hover:bg-white/[0.02]"
                    >
                      <div className="flex items-center gap-3.5 flex-1 min-w-0">
                        <span className="font-mono text-[13px] tracking-[0.08em] text-[#A9B4C0] shrink-0">
                          {numStr}
                        </span>
                        <span
                          className={`text-xl font-medium truncate transition-colors ${
                            isOpen ? 'text-[#8DC63F]' : 'text-white'
                          }`}
                        >
                          {group.label}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-xs text-[#A9B4C0]">
                          {group.categories.length}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 text-[#A9B4C0] transition-transform duration-300 ${
                            isOpen ? 'rotate-180 text-[#8DC63F]' : ''
                          }`}
                        />
                      </div>
                    </button>

                    {/* Accordion Region */}
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      className={`grid ${
                        prefersReducedMotion
                          ? isOpen
                            ? 'grid-rows-[1fr]'
                            : 'grid-rows-[0fr]'
                          : `transition-all duration-300 ease-in-out ${
                              isOpen ? 'grid-rows-[1fr] opacity-100 pb-6' : 'grid-rows-[0fr] opacity-0 pb-0'
                            }`
                      }`}
                    >
                      <div className="overflow-hidden pl-6 sm:pl-8 pr-2 divide-y divide-white/[0.08]">
                        {group.categories.map((cat) => (
                          <div
                            key={cat.id}
                            className="py-4 flex items-center justify-between gap-4"
                          >
                            <div className="flex flex-col flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-xs text-[#8DC63F] font-semibold">
                                  {cat.code}
                                </span>
                                <Link
                                  href={`/products/${cat.slug}`}
                                  className="text-base font-medium text-white hover:text-[#8DC63F] transition-colors truncate focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] rounded"
                                >
                                  {cat.title}
                                </Link>
                              </div>
                              <span className="text-xs text-[#A9B4C0] truncate mt-1">
                                {formatFamilies(cat.families)}
                              </span>
                            </div>

                            <button
                              type="button"
                              aria-label={`Send enquiry for ${cat.title}`}
                              onClick={() =>
                                openProductModal({ categoryCode: cat.code, categoryTitle: cat.title })
                              }
                              className="w-11 h-11 rounded-full border border-white/15 bg-white/5 hover:bg-[#8DC63F]/20 hover:border-[#8DC63F] text-white hover:text-[#8DC63F] flex items-center justify-center shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F]"
                            >
                              <Send className="w-4 h-4 stroke-[1.5]" />
                            </button>
                          </div>
                        ))}

                        <div className="pt-4">
                          <Link
                            href={`/products?group=${group.prefix}`}
                            className="inline-flex items-center gap-2 text-sm font-semibold text-[#8DC63F] hover:underline"
                          >
                            <span>View all {group.label}</span>
                            <ArrowUpRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* View All Products Primary Pill Button */}
            <div className="pt-4 text-center">
              <LightningButton variant="primary" size="md" href="/products" fullWidth>
                View all products
              </LightningButton>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
