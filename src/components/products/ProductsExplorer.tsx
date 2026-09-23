'use client';

import React, {
  useState,
  useMemo,
  useEffect,
  useRef,
  useDeferredValue,
  useCallback,
} from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Search,
  X,
  SlidersHorizontal,
  Grid,
  List as ListIcon,
  ArrowRight,
  ArrowUpRight,
  Send,
  Phone,
  Check,
  ChevronRight,
  Sparkles,
  HelpCircle,
} from 'lucide-react';
import Image from 'next/image';
import { getCategoryPlaceholder } from '@/lib/utils/placeholders';
import { useEnquiryModal } from '@/components/modals/EnquiryModalProvider';
import { getGroupIcon, getGroupLabel, GROUP_LABELS } from '@/lib/group-icons';
import { PILLARS_CONFIG } from '@/config/pillars';
import LightningButton from '@/components/ui/LightningButton';
import Reveal from '@/components/ui/Reveal';
import Card from '@/components/ui/Card';
import CustomSelect, { SelectOption } from '@/components/ui/CustomSelect';

const SORT_OPTIONS: SelectOption[] = [
  { value: 'featured', label: 'Featured Order' },
  { value: 'az', label: 'A to Z' },
];

export interface CategoryExplorerItem {
  code: string;
  slug: string;
  group: string;
  groupLabel: string;
  sortOrder: number;
  priority: boolean;
  title: string;
  description: string;
  productFamilies: string[];
  imageUrl?: string | null;
  imageAlt?: string | null;
  isPlaceholder?: boolean;
}

interface ProductsExplorerProps {
  categories: CategoryExplorerItem[];
  initialQ?: string;
  initialGroup?: string;
  initialCodes?: string[];
  initialSort?: 'featured' | 'az';
  initialView?: 'grid' | 'list';
}

// Code normalisation helper: treats "lp01", "lp 01", "lp-01" as "lp01"
function normalizeCode(str: string): string {
  return str.toLowerCase().replace(/[\s\-_]/g, '');
}

// Highlight text helper
function HighlightedText({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;
  const words = query
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);
  if (words.length === 0) return <>{text}</>;

  // Regex pattern matching any of the query words
  const escapedWords = words.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const pattern = new RegExp(`(${escapedWords.join('|')})`, 'gi');
  const parts = text.split(pattern);

  return (
    <>
      {parts.map((part, i) =>
        pattern.test(part) ? (
          <mark key={i} className="bg-transparent text-[#8DC63F] font-semibold">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
}

export default function ProductsExplorer({
  categories,
  initialQ = '',
  initialGroup = 'ALL',
  initialCodes = [],
  initialSort = 'featured',
  initialView = 'grid',
}: ProductsExplorerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { openProductModal } = useEnquiryModal();

  // URL state
  const qParam = searchParams?.get('q') ?? initialQ;
  const groupParam = searchParams?.get('group') ?? initialGroup;
  const codesParam = searchParams?.get('codes') ?? null;
  const sortParam = (searchParams?.get('sort') as 'featured' | 'az') || initialSort;
  const viewParam = (searchParams?.get('view') as 'grid' | 'list') || initialView;

  // Local state for search input (debounced with deferred value)
  const [searchInput, setSearchInput] = useState(qParam);
  const deferredSearchInput = useDeferredValue(searchInput);

  // Mobile Groups Sheet state
  const [sheetOpen, setSheetOpen] = useState(false);

  // Refs
  const searchInputRef = useRef<HTMLInputElement>(null);
  const groupsButtonRef = useRef<HTMLButtonElement>(null);
  const activeChipRef = useRef<HTMLAnchorElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const sidebarScrollRef = useRef<HTMLDivElement>(null);
  const activeRowRef = useRef<HTMLAnchorElement>(null);
  const scrollTimerRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartY = useRef<number>(0);
  const touchCurrentY = useRef<number>(0);
  const [sheetTranslateY, setSheetTranslateY] = useState(0);

  // Reduced motion detection
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const media = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(media.matches);
      const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      media.addEventListener('change', handler);
      return () => media.removeEventListener('change', handler);
    }
  }, []);

  // Throttled scroll handler for sidebar scroll container
  const handleSidebarScroll = useCallback(() => {
    const el = sidebarScrollRef.current;
    if (!el) return;

    el.classList.add('is-scrolling');
    if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    scrollTimerRef.current = setTimeout(() => {
      el.classList.remove('is-scrolling');
    }, 900);

    const scrollTop = el.scrollTop;
    const clientHeight = el.clientHeight;
    const scrollHeight = el.scrollHeight;

    const fadeTop = scrollTop > 4 ? '24px' : '0px';
    const fadeBottom = scrollTop + clientHeight < scrollHeight - 4 ? '32px' : '0px';

    el.style.setProperty('--fade-top', fadeTop);
    el.style.setProperty('--fade-bottom', fadeBottom);
  }, []);

  // Initial mask calculations on load
  useEffect(() => {
    handleSidebarScroll();
  }, [handleSidebarScroll, categories]);

  // Scroll active row into view inside sidebar scroll container only
  useEffect(() => {
    if (activeRowRef.current && sidebarScrollRef.current) {
      const container = sidebarScrollRef.current;
      const row = activeRowRef.current;
      const rowTop = row.offsetTop;
      const rowBottom = rowTop + row.offsetHeight;
      const containerTop = container.scrollTop;
      const containerBottom = containerTop + container.clientHeight;

      if (rowTop < containerTop) {
        container.scrollTo({
          top: Math.max(0, rowTop - 8),
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
        });
      } else if (rowBottom > containerBottom) {
        container.scrollTo({
          top: rowBottom - container.clientHeight + 8,
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
        });
      }
    }
  }, [groupParam, prefersReducedMotion]);

  // Update search input if URL q changes externally
  useEffect(() => {
    setSearchInput(qParam);
  }, [qParam]);

  // Active codes list
  const activeCodes = useMemo(() => {
    if (!codesParam) return initialCodes;
    return codesParam
      .split(',')
      .map((c) => c.trim().toUpperCase())
      .filter(Boolean);
  }, [codesParam, initialCodes]);

  // Check if activeCodes matches a configured pillar
  const pillarMatch = useMemo(() => {
    if (activeCodes.length === 0) return null;
    const sortedActive = [...activeCodes].sort().join(',');
    for (const pillar of PILLARS_CONFIG) {
      if (pillar.categoryCodes) {
        const sortedPillar = [...pillar.categoryCodes].map((c) => c.toUpperCase()).sort().join(',');
        if (sortedActive === sortedPillar) {
          return pillar.title;
        }
      }
    }
    return null;
  }, [activeCodes]);

  // Unique list of groups with category counts
  const groupsWithCounts = useMemo(() => {
    const countsMap = new Map<string, number>();
    categories.forEach((cat) => {
      countsMap.set(cat.group, (countsMap.get(cat.group) || 0) + 1);
    });

    // Sort group keys with LP first, ER/EB second, rest by order in GROUP_LABELS
    const keys = Array.from(countsMap.keys());
    keys.sort((a, b) => {
      if (a === 'LP') return -1;
      if (b === 'LP') return 1;
      if (a === 'ER' || a === 'EB') return -1;
      if (b === 'ER' || b === 'EB') return 1;
      const minSortA = Math.min(...categories.filter((c) => c.group === a).map((c) => c.sortOrder));
      const minSortB = Math.min(...categories.filter((c) => c.group === b).map((c) => c.sortOrder));
      return minSortA - minSortB;
    });

    return keys.map((groupKey) => ({
      key: groupKey,
      label: getGroupLabel(groupKey),
      count: countsMap.get(groupKey) || 0,
    }));
  }, [categories]);

  // Sync search input to URL with router.replace and 150ms debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      const trimmed = deferredSearchInput.trim().slice(0, 80);
      if (trimmed !== qParam) {
        const params = new URLSearchParams(searchParams ? searchParams.toString() : '');
        if (trimmed) {
          params.set('q', trimmed);
        } else {
          params.delete('q');
        }
        router.replace(`/products?${params.toString()}`, { scroll: false });
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [deferredSearchInput, qParam, router, searchParams]);

  // URL state update helper for group (router.push)
  const setGroupFilter = useCallback(
    (newGroup: string) => {
      const params = new URLSearchParams(searchParams ? searchParams.toString() : '');
      if (newGroup && newGroup !== 'ALL') {
        params.set('group', newGroup);
      } else {
        params.delete('group');
      }
      router.push(`/products?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  // URL state update helper for replace (sort, view, clear)
  const updateUrlParam = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams ? searchParams.toString() : '');
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.replace(`/products?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  // Clear all filters handler
  const clearAllFilters = useCallback(() => {
    setSearchInput('');
    router.replace('/products', { scroll: false });
  }, [router]);

  // Keyboard shortcut '/' to focus search input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === '/' &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA' &&
        document.activeElement?.getAttribute('contenteditable') !== 'true'
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter & Search Logic
  const filteredCategories = useMemo(() => {
    let result = [...categories];

    // 1. Filter by codes if present
    if (activeCodes.length > 0) {
      const matched = result.filter((cat) => activeCodes.includes(cat.code.toUpperCase()));
      if (matched.length > 0) {
        result = matched;
      }
    }

    // 2. Filter by group if selected
    if (groupParam && groupParam !== 'ALL') {
      result = result.filter((cat) => cat.group.toUpperCase() === groupParam.toUpperCase());
    }

    // 3. Search text matching & ranking
    const query = deferredSearchInput.trim().toLowerCase();
    if (query) {
      const normQuery = normalizeCode(query);
      const tokens = query.split(/\s+/).filter(Boolean);

      result = result.filter((cat) => {
        const normCatCode = normalizeCode(cat.code);
        const codeMatch = normCatCode.includes(normQuery);
        const titleMatch = tokens.every((t) => cat.title.toLowerCase().includes(t));
        const descMatch = tokens.every((t) => cat.description.toLowerCase().includes(t));
        const familiesMatch = tokens.every((t) =>
          cat.productFamilies.some((f) => f.toLowerCase().includes(t))
        );
        return codeMatch || titleMatch || descMatch || familiesMatch;
      });

      // Rank results
      result.sort((a, b) => {
        const normACode = normalizeCode(a.code);
        const normBCode = normalizeCode(b.code);

        const exactA = normACode === normQuery;
        const exactB = normBCode === normQuery;
        if (exactA && !exactB) return -1;
        if (!exactA && exactB) return 1;

        const titleStartA = a.title.toLowerCase().startsWith(query);
        const titleStartB = b.title.toLowerCase().startsWith(query);
        if (titleStartA && !titleStartB) return -1;
        if (!titleStartA && titleStartB) return 1;

        const titleContainA = tokens.every((t) => a.title.toLowerCase().includes(t));
        const titleContainB = tokens.every((t) => b.title.toLowerCase().includes(t));
        if (titleContainA && !titleContainB) return -1;
        if (!titleContainA && titleContainB) return 1;

        return a.sortOrder - b.sortOrder;
      });
    }

    // 4. Sort order
    if (sortParam === 'az') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (!query) {
      result.sort((a, b) => a.sortOrder - b.sortOrder);
    }

    return result;
  }, [categories, activeCodes, groupParam, deferredSearchInput, sortParam]);

  // Is page in unfiltered grouped view?
  const isGroupedView = useMemo(() => {
    return (
      !deferredSearchInput.trim() &&
      (!groupParam || groupParam === 'ALL') &&
      activeCodes.length === 0 &&
      sortParam === 'featured'
    );
  }, [deferredSearchInput, groupParam, activeCodes, sortParam]);

  // Grouped results for All view
  const groupedSections = useMemo(() => {
    if (!isGroupedView) return [];
    const map = new Map<string, CategoryExplorerItem[]>();

    filteredCategories.forEach((cat) => {
      if (!map.has(cat.group)) {
        map.set(cat.group, []);
      }
      map.get(cat.group)!.push(cat);
    });

    const keys = Array.from(map.keys());
    keys.sort((a, b) => {
      if (a === 'LP') return -1;
      if (b === 'LP') return 1;
      if (a === 'ER' || a === 'EB') return -1;
      if (b === 'ER' || b === 'EB') return 1;
      const minSortA = Math.min(...map.get(a)!.map((c) => c.sortOrder));
      const minSortB = Math.min(...map.get(b)!.map((c) => c.sortOrder));
      return minSortA - minSortB;
    });

    return keys.map((groupKey) => ({
      groupKey,
      label: getGroupLabel(groupKey),
      items: map.get(groupKey)!,
      isPriority: groupKey === 'LP' || groupKey === 'ER' || groupKey === 'EB',
    }));
  }, [isGroupedView, filteredCategories]);

  // Scroll active chip into view on mobile strip
  useEffect(() => {
    if (activeChipRef.current) {
      activeChipRef.current.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [groupParam, prefersReducedMotion]);

  // Mobile Bottom Sheet Focus Trap & Strict Body Scroll Lock
  useEffect(() => {
    if (sheetOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      document.documentElement.style.overflow = 'hidden';

      const handleSheetKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setSheetOpen(false);
          groupsButtonRef.current?.focus();
        }
      };
      window.addEventListener('keydown', handleSheetKeyDown);
      return () => {
        document.body.style.overflow = '';
        document.body.style.touchAction = '';
        document.documentElement.style.overflow = '';
        window.removeEventListener('keydown', handleSheetKeyDown);
      };
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      document.documentElement.style.overflow = '';
    }
  }, [sheetOpen]);

  // Touch drag-to-close handler for mobile sheet
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchCurrentY.current = e.touches[0].clientY;
    const deltaY = touchCurrentY.current - touchStartY.current;
    if (deltaY > 0) {
      setSheetTranslateY(deltaY);
    }
  };
  const handleTouchEnd = () => {
    if (sheetTranslateY > 80) {
      setSheetOpen(false);
      groupsButtonRef.current?.focus();
    }
    setSheetTranslateY(0);
  };

  // Active filters count
  const hasActiveFilters =
    Boolean(deferredSearchInput.trim()) ||
    (Boolean(groupParam) && groupParam !== 'ALL') ||
    activeCodes.length > 0 ||
    sortParam !== 'featured';

  // Desktop Sidebar active row index
  const activeSidebarIndex = useMemo(() => {
    if (!groupParam || groupParam === 'ALL') return 0;
    const idx = groupsWithCounts.findIndex((g) => g.key === groupParam);
    return idx >= 0 ? idx + 1 : 0;
  }, [groupParam, groupsWithCounts]);

  return (
    <div className="min-h-screen bg-[#050608] text-white">
      {/* 3. PAGE HEADER (Compact, Left-Aligned) */}
      <div className="relative bg-[#050608] overflow-hidden border-b border-[#1F2937]/80">
        {/* Soft radial blue glow at top left */}
        <div
          className="pointer-events-none absolute top-0 left-0 w-[600px] h-[600px] opacity-100"
          style={{
            background:
              'radial-gradient(600px circle at 0% 0%, rgba(11, 101, 179, 0.14), transparent 70%)',
          }}
          aria-hidden="true"
        />

        <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 pt-[calc(var(--header-offset,80px)+32px)] lg:pt-[calc(var(--header-offset,80px)+48px)] pb-8 relative z-10">
          <div className="space-y-4 max-w-4xl">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="text-[13px] text-[#A9B4C0] font-medium flex items-center gap-2">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-[#A9B4C0]/60" />
              <span className="text-white" aria-current="page">
                Products
              </span>
            </nav>

            {/* H1 Title */}
            <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold text-white leading-[1.1] tracking-[-0.02em] [text-wrap:balance]">
              Product Catalogue
            </h1>

            {/* Description */}
            <p className="text-base lg:text-[18px] text-[#A9B4C0] leading-[1.65] max-w-[60ch]">
              Browse {categories.length} product categories across lightning protection, earthing, electrical, mechanical and solar. Select a category to see its product families, or send us an enquiry.
            </p>

            {/* Live Count Meta Line */}
            <p className="text-[13px] text-[#A9B4C0] font-medium">
              {filteredCategories.length} categories · {groupsWithCounts.length} groups
            </p>
          </div>
        </div>
      </div>

      {/* 4. STICKY TOOLBAR */}
      <div
        className="sticky z-30 w-full bg-[#050608]/85 backdrop-blur-[12px] border-b border-[#1F2937] transition-[top] duration-250 ease-in-out"
        style={{ top: 'var(--header-offset, 0px)' }}
      >
        <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
          {/* Search Input Container (Role search) */}
          <div className="relative flex-1 lg:max-w-[480px]" role="search">
            <Search className="w-4 h-4 text-[#A9B4C0] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              ref={searchInputRef}
              type="search"
              inputMode="search"
              enterKeyHint="search"
              autoComplete="off"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') setSearchInput('');
              }}
              placeholder="Search by name, code or product (e.g. LP-01, cable tray)"
              aria-label="Search product categories"
              className="w-full h-12 lg:h-11 pl-11 pr-11 lg:pr-12 rounded-full bg-[#050608] border border-[#1F2937] text-base lg:text-sm text-white placeholder-[#A9B4C0] focus:outline-none focus:border-[#8DC63F] focus:ring-1 focus:ring-[#8DC63F] transition-colors"
            />
            {/* Clear Button */}
            {searchInput ? (
              <button
                type="button"
                onClick={() => setSearchInput('')}
                aria-label="Clear search input"
                className="absolute right-1 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center text-[#A9B4C0] hover:text-white rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F]"
              >
                <X className="w-4 h-4" />
              </button>
            ) : (
              /* Keyboard shortcut '/' hint on desktop fine-pointer devices */
              <span
                className="hidden lg:flex items-center justify-center absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded bg-white/10 text-[11px] font-mono font-bold text-[#A9B4C0] pointer-events-none"
                aria-hidden="true"
              >
                /
              </span>
            )}
          </div>

          {/* MOBILE TOOLBAR RIGHT: Groups Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              ref={groupsButtonRef}
              type="button"
              onClick={() => setSheetOpen(true)}
              aria-expanded={sheetOpen}
              aria-controls="groups-sheet"
              aria-label="Open product groups sheet"
              className="h-12 px-4 rounded-full bg-[#0D1117] border border-[#1F2937] text-sm font-semibold text-white flex items-center gap-2 hover:bg-white/5 active-press"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#8DC63F]" />
              <span>Groups</span>
              {groupParam && groupParam !== 'ALL' && (
                <span className="w-2 h-2 rounded-full bg-[#8DC63F] pill-glow" />
              )}
            </button>
          </div>

          {/* DESKTOP TOOLBAR RIGHT: Live Count + Sort Select + View Toggle */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Result Count */}
            <span className="text-sm font-medium text-[#A9B4C0] tabular-nums" aria-live="polite">
              Showing {filteredCategories.length} {filteredCategories.length === 1 ? 'category' : 'categories'}
            </span>

            {/* Sort Select */}
            <div className="flex items-center gap-2">
              <label htmlFor="desktop-sort" className="text-sm text-[#A9B4C0] font-medium">
                Sort:
              </label>
              <CustomSelect
                id="desktop-sort"
                options={SORT_OPTIONS}
                value={sortParam}
                onChange={(val) => updateUrlParam('sort', val === 'featured' ? null : val)}
                size="md"
                align="right"
              />
            </div>

            {/* View Toggle (Grid / List) */}
            <div className="flex items-center gap-1 bg-[#050608] p-1 rounded-full border border-[#1F2937]">
              <button
                type="button"
                aria-label="Grid view"
                aria-pressed={viewParam === 'grid'}
                onClick={() => updateUrlParam('view', 'grid')}
                className={`w-11 h-9 rounded-full flex items-center justify-center transition-colors ${
                  viewParam === 'grid'
                    ? 'bg-[#0B65B3]/20 text-[#8DC63F] border border-[#0B65B3]/40'
                    : 'text-[#A9B4C0] hover:text-white'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                type="button"
                aria-label="List view"
                aria-pressed={viewParam === 'list'}
                onClick={() => updateUrlParam('view', 'list')}
                className={`w-11 h-9 rounded-full flex items-center justify-center transition-colors ${
                  viewParam === 'list'
                    ? 'bg-[#0B65B3]/20 text-[#8DC63F] border border-[#0B65B3]/40'
                    : 'text-[#A9B4C0] hover:text-white'
                }`}
              >
                <ListIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 5. MOBILE GROUP CHIPS & SUMMARY ROW (below lg) */}
      <div className="block lg:hidden border-b border-[#1F2937]/60 bg-[#050608]">
        {/* Horizontal Scrollable Chips Strip */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-snap-x px-5 py-3">
          {/* All Chip */}
          <Link
            ref={!groupParam || groupParam === 'ALL' ? activeChipRef : undefined}
            href={`/products${searchParams?.get('q') ? `?q=${encodeURIComponent(searchParams.get('q')!)}` : ''}`}
            onClick={(e) => {
              e.preventDefault();
              setGroupFilter('ALL');
            }}
            className={`shrink-0 scroll-snap-align-start h-[44px] px-4 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-colors border select-none ${
              !groupParam || groupParam === 'ALL'
                ? 'bg-[#8DC63F]/15 border-[#8DC63F] text-[#8DC63F] pill-glow'
                : 'bg-[#0D1117] border-[#1F2937] text-[#A9B4C0] hover:text-white'
            }`}
          >
            <span>All ({categories.length})</span>
          </Link>

          {/* Group Chips */}
          {groupsWithCounts.map((g) => {
            const isActive = groupParam?.toUpperCase() === g.key;
            return (
              <Link
                key={g.key}
                ref={isActive ? activeChipRef : undefined}
                href={`/products?group=${g.key}${searchParams?.get('q') ? `&q=${encodeURIComponent(searchParams.get('q')!)}` : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setGroupFilter(g.key);
                }}
                className={`shrink-0 scroll-snap-align-start h-[44px] px-4 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-colors border select-none ${
                  isActive
                    ? 'bg-[#8DC63F]/15 border-[#8DC63F] text-[#8DC63F] pill-glow'
                    : 'bg-[#0D1117] border-[#1F2937] text-[#A9B4C0] hover:text-white'
                }`}
              >
                <span>{g.label}</span>
                <span className="text-[11px] opacity-75 tabular-nums">({g.count})</span>
              </Link>
            );
          })}
        </div>

        {/* Mobile Summary Row & Active Filters */}
        <div className="px-5 py-2.5 flex items-center justify-between border-t border-[#1F2937]/40 text-xs text-[#A9B4C0]">
          <span aria-live="polite" aria-atomic="true">
            Showing {filteredCategories.length} of {categories.length} categories
          </span>

          {/* Mobile Sort Dropdown */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-[#A9B4C0] font-medium">Sort:</span>
            <CustomSelect
              id="mobile-sort"
              options={SORT_OPTIONS}
              value={sortParam}
              onChange={(val) => updateUrlParam('sort', val === 'featured' ? null : val)}
              size="sm"
              align="right"
              buttonClassName="border-none bg-transparent hover:bg-white/5 !px-2 font-semibold text-[#8DC63F]"
            />
          </div>
        </div>

        {/* Active Removable Filters Chips Bar */}
        {hasActiveFilters && (
          <div className="px-5 pb-3 flex flex-wrap items-center gap-2 pt-1 border-t border-[#1F2937]/40">
            {/* Active Group Filter */}
            {groupParam && groupParam !== 'ALL' && (
              <span className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full bg-[#8DC63F]/10 border border-[#8DC63F]/40 text-xs font-semibold text-[#8DC63F]">
                <span>Group: {getGroupLabel(groupParam)}</span>
                <button
                  type="button"
                  onClick={() => setGroupFilter('ALL')}
                  className="w-5 h-5 rounded-full flex items-center justify-center hover:bg-[#8DC63F]/20 text-[#8DC63F]"
                  aria-label="Remove group filter"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            {/* Active Search Filter */}
            {deferredSearchInput.trim() && (
              <span className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full bg-[#0B65B3]/20 border border-[#0B65B3]/40 text-xs font-semibold text-white">
                <span>Search: &ldquo;{deferredSearchInput.trim()}&rdquo;</span>
                <button
                  type="button"
                  onClick={() => setSearchInput('')}
                  className="w-5 h-5 rounded-full flex items-center justify-center hover:bg-white/20 text-white"
                  aria-label="Remove search filter"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            {/* Active Code Filter */}
            {activeCodes.length > 0 && (
              <span className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full bg-[#8DC63F]/10 border border-[#8DC63F]/40 text-xs font-semibold text-[#8DC63F]">
                <span>Filtered: {pillarMatch || 'Selection'}</span>
                <button
                  type="button"
                  onClick={() => updateUrlParam('codes', null)}
                  className="w-5 h-5 rounded-full flex items-center justify-center hover:bg-[#8DC63F]/20 text-[#8DC63F]"
                  aria-label="Remove codes filter"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            {/* Clear All Text Button */}
            <button
              type="button"
              onClick={clearAllFilters}
              className="text-xs text-[#A9B4C0] hover:text-white font-semibold underline underline-offset-2 px-1 py-1"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* MOBILE GROUPS BOTTOM SHEET (< lg) */}
      {sheetOpen && (
        <div
          id="groups-sheet"
          role="dialog"
          aria-modal="true"
          aria-label="Product groups"
          className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end bg-black/80 backdrop-blur-sm touch-none"
          onTouchMove={(e) => {
            if (e.target === e.currentTarget) {
              e.preventDefault();
            }
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSheetOpen(false);
              groupsButtonRef.current?.focus();
            }
          }}
        >
          <div
            ref={sheetRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
              transform: `translateY(${sheetTranslateY}px)`,
              transition: sheetTranslateY === 0 && !prefersReducedMotion ? 'transform 320ms cubic-bezier(0.22, 1, 0.36, 1)' : 'none',
            }}
            className="w-full max-h-[88svh] bg-[#0D1117] border-t border-[#1F2937] rounded-t-[24px] flex flex-col overflow-hidden shadow-2xl pb-safe"
          >
            {/* Drag Handle */}
            <div className="w-12 h-1.5 bg-gray-600/60 rounded-full mx-auto my-3 shrink-0" aria-hidden="true" />

            {/* Sticky Header */}
            <div className="px-6 py-3 border-b border-[#1F2937] flex items-center justify-between shrink-0">
              <h2 className="text-lg font-bold text-white">Product Groups</h2>
              <button
                type="button"
                onClick={() => {
                  setSheetOpen(false);
                  groupsButtonRef.current?.focus();
                }}
                className="w-11 h-11 flex items-center justify-center text-[#A9B4C0] hover:text-white rounded-xl hover:bg-white/10 transition-colors"
                aria-label="Close product groups sheet"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Sheet Rows List */}
            <div className="overflow-y-auto divide-y divide-[#1F2937]/60">
              {/* Row 1: All products */}
              <button
                type="button"
                onClick={() => {
                  setGroupFilter('ALL');
                  setSheetOpen(false);
                  groupsButtonRef.current?.focus();
                }}
                className={`w-full min-h-[56px] px-6 flex items-center justify-between text-left text-base font-semibold transition-colors ${
                  !groupParam || groupParam === 'ALL'
                    ? 'bg-[#8DC63F]/10 text-[#8DC63F]'
                    : 'text-white hover:bg-white/5'
                }`}
              >
                <span>All products ({categories.length})</span>
                {(!groupParam || groupParam === 'ALL') && <Check className="w-5 h-5 text-[#8DC63F]" />}
              </button>

              {/* Group Rows */}
              {groupsWithCounts.map((g) => {
                const isActive = groupParam?.toUpperCase() === g.key;
                return (
                  <button
                    key={g.key}
                    type="button"
                    onClick={() => {
                      setGroupFilter(g.key);
                      setSheetOpen(false);
                      groupsButtonRef.current?.focus();
                    }}
                    className={`w-full min-h-[56px] px-6 flex items-center justify-between text-left text-base font-semibold transition-colors ${
                      isActive ? 'bg-[#8DC63F]/10 text-[#8DC63F]' : 'text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span>{g.label}</span>
                      <span className="text-xs text-[#A9B4C0] tabular-nums">({g.count})</span>
                    </div>
                    {isActive && <Check className="w-5 h-5 text-[#8DC63F]" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 6. MAIN CONTENT AREA (Desktop Sidebar + Results Grid) */}
      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-12 2xl:gap-16 items-start">
          {/* DESKTOP STICKY SIDEBAR (>= lg) */}
          <aside
            className="hidden lg:block self-start sticky z-20 w-[280px] transition-[top] duration-250 cubic-bezier(0.22, 1, 0.36, 1)"
            style={{
              top: 'calc(var(--header-offset, 0px) + 64px + 24px)',
              maxHeight: 'calc(100svh - var(--header-offset, 0px) - 64px - 48px)',
            }}
          >
            <nav aria-label="Product groups" className="flex flex-col h-full max-h-[inherit]">
              {/* Part 1 Top (flex-none): Eyebrow */}
              <div className="flex-none pb-2 px-3">
                <h2 className="text-[12px] uppercase tracking-[0.14em] font-semibold text-[#A9B4C0]">
                  GROUPS
                </h2>
              </div>

              {/* Part 2 Middle (flex-1, min-h-0, overflow-y-auto): Group list */}
              <div
                ref={sidebarScrollRef}
                onScroll={handleSidebarScroll}
                className="flex-1 min-h-0 overflow-y-auto sidebar-scroll relative px-1 py-1 space-y-0.5"
              >
                <div className="relative space-y-0.5 border-l border-[#1F2937]">
                  {/* 2px Lime Indicator Bar */}
                  <div
                    className={`absolute left-0 w-[2px] h-[48px] bg-[#8DC63F] z-10 ${
                      prefersReducedMotion
                        ? ''
                        : 'transition-transform duration-350 cubic-bezier(0.22, 1, 0.36, 1)'
                    }`}
                    style={{
                      transform: `translateY(${activeSidebarIndex * 48}px)`,
                    }}
                    aria-hidden="true"
                  />

                  {/* All products option */}
                  <Link
                    ref={!groupParam || groupParam === 'ALL' ? activeRowRef : undefined}
                    href={`/products${searchParams?.get('q') ? `?q=${encodeURIComponent(searchParams.get('q')!)}` : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setGroupFilter('ALL');
                    }}
                    className={`h-[48px] px-4 flex items-center justify-between text-[15px] font-medium transition-colors rounded-r-lg ${
                      !groupParam || groupParam === 'ALL'
                        ? 'text-white font-semibold bg-white/5'
                        : 'text-white/65 hover:text-white hover:bg-white/[0.02]'
                    }`}
                  >
                    <span>All products</span>
                    <span className="text-[13px] tabular-nums text-[#A9B4C0]">
                      {categories.length}
                    </span>
                  </Link>

                  {/* Individual Groups */}
                  {groupsWithCounts.map((g) => {
                    const isActive = groupParam?.toUpperCase() === g.key;
                    return (
                      <Link
                        key={g.key}
                        ref={isActive ? activeRowRef : undefined}
                        href={`/products?group=${g.key}${searchParams?.get('q') ? `&q=${encodeURIComponent(searchParams.get('q')!)}` : ''}`}
                        onClick={(e) => {
                          e.preventDefault();
                          setGroupFilter(g.key);
                        }}
                        className={`h-[48px] px-4 flex items-center justify-between text-[15px] font-medium transition-colors rounded-r-lg ${
                          isActive
                            ? 'text-white font-semibold bg-white/5'
                            : 'text-white/65 hover:text-white hover:bg-white/[0.02]'
                        }`}
                      >
                        <span className="truncate pr-2">{g.label}</span>
                        <span className="text-[13px] tabular-nums text-[#A9B4C0] shrink-0">
                          {g.count}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Part 3 Bottom (flex-none): Hairline & Help Block */}
              <div className="flex-none pt-4 border-t border-[#1F2937] space-y-3 px-3 mt-auto bg-[#050608] z-10">
                <p className="text-sm font-semibold text-white">Need help choosing?</p>
                <div className="flex flex-col space-y-2 text-xs">
                  <a
                    href="tel:+97172042763"
                    className="inline-flex items-center gap-2 text-[#8DC63F] hover:underline font-semibold"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>+971 7 204 2763</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => openProductModal()}
                    className="text-left text-[#A9B4C0] hover:text-white transition-colors underline underline-offset-2"
                  >
                    Send an enquiry
                  </button>
                </div>
              </div>
            </nav>
          </aside>

          {/* RESULTS MAIN CONTAINER */}
          <main className="min-h-[400px]">
            {/* Active removable filter chips on desktop (lg+) */}
            {hasActiveFilters && (
              <div className="hidden lg:flex flex-wrap items-center gap-2 pb-6">
                {groupParam && groupParam !== 'ALL' && (
                  <span className="inline-flex items-center gap-2 h-9 px-4 rounded-full bg-[#8DC63F]/10 border border-[#8DC63F]/40 text-xs font-semibold text-[#8DC63F]">
                    <span>Group: {getGroupLabel(groupParam)}</span>
                    <button
                      type="button"
                      onClick={() => setGroupFilter('ALL')}
                      className="w-5 h-5 rounded-full flex items-center justify-center hover:bg-[#8DC63F]/20 text-[#8DC63F]"
                      aria-label="Remove group filter"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}

                {deferredSearchInput.trim() && (
                  <span className="inline-flex items-center gap-2 h-9 px-4 rounded-full bg-[#0B65B3]/20 border border-[#0B65B3]/40 text-xs font-semibold text-white">
                    <span>Search: &ldquo;{deferredSearchInput.trim()}&rdquo;</span>
                    <button
                      type="button"
                      onClick={() => setSearchInput('')}
                      className="w-5 h-5 rounded-full flex items-center justify-center hover:bg-white/20 text-white"
                      aria-label="Remove search filter"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}

                {activeCodes.length > 0 && (
                  <span className="inline-flex items-center gap-2 h-9 px-4 rounded-full bg-[#8DC63F]/10 border border-[#8DC63F]/40 text-xs font-semibold text-[#8DC63F]">
                    <span>Filtered: {pillarMatch || 'Selection'}</span>
                    <button
                      type="button"
                      onClick={() => updateUrlParam('codes', null)}
                      className="w-5 h-5 rounded-full flex items-center justify-center hover:bg-[#8DC63F]/20 text-[#8DC63F]"
                      aria-label="Remove codes filter"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}

                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="text-xs text-[#A9B4C0] hover:text-white font-semibold underline underline-offset-2 px-2 py-1"
                >
                  Clear all filters
                </button>
              </div>
            )}

            {/* CASE 1: UNFILTERED GROUPED VIEW */}
            {isGroupedView ? (
              <div className="space-y-12 lg:space-y-16">
                {groupedSections.map((sec, secIdx) => {
                  return (
                    <section
                      key={sec.groupKey}
                      id={`group-${sec.groupKey.toLowerCase()}`}
                      className={`relative rounded-2xl ${
                        sec.isPriority ? 'p-1 bg-gradient-to-b from-[#0B65B3]/10 to-transparent rounded-[24px]' : ''
                      }`}
                      style={{
                        scrollMarginTop: 'calc(var(--header-offset, 80px) + 64px + 16px)',
                        contentVisibility: secIdx >= 2 ? 'auto' : undefined,
                        containIntrinsicSize: secIdx >= 2 ? '1px 500px' : undefined,
                      }}
                    >
                      {/* Section Heading */}
                      <div className="px-4 sm:px-6 space-y-2 pb-4 mb-6 border-b border-[#1F2937]">
                        {sec.isPriority && (
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-[#8DC63F] pill-glow" />
                            <span className="text-[11px] font-bold text-[#8DC63F] uppercase tracking-wider">
                              Priority Range
                            </span>
                          </div>
                        )}
                        <div className="flex items-end justify-between gap-3">
                          <div className="flex items-baseline gap-2 sm:gap-3 flex-wrap">
                            <h2 className="text-lg sm:text-xl lg:text-[clamp(1.5rem,2.6vw,2.25rem)] font-semibold text-white leading-snug">
                              {sec.label}
                            </h2>
                            <span className="text-xs sm:text-sm font-medium text-[#A9B4C0] tabular-nums">
                              ({sec.items.length})
                            </span>
                          </div>
                          <Link
                            href={`/products?group=${sec.groupKey}`}
                            className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#8DC63F] hover:underline shrink-0"
                          >
                            <span>View group</span>
                            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </Link>
                        </div>
                      </div>

                      {/* Items Rendering */}
                      <div
                        className={
                          viewParam === 'list'
                            ? 'divide-y divide-[#1F2937]'
                            : 'grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6'
                        }
                      >
                        {sec.items.map((cat, itemIdx) => (
                          <ItemCardOrRow
                            key={cat.code}
                            cat={cat}
                            view={viewParam}
                            searchQuery={deferredSearchInput}
                            staggerIndex={secIdx < 2 && itemIdx < 12 ? secIdx * 4 + itemIdx : undefined}
                            openModal={openProductModal}
                          />
                        ))}
                      </div>
                    </section>
                  );
                })}
              </div>
            ) : filteredCategories.length > 0 ? (
              /* CASE 2: FLAT RESULTS (FILTERED, SEARCHED, OR SORTED A-Z) */
              <div
                className={
                  viewParam === 'list'
                    ? 'divide-y divide-[#1F2937]'
                    : 'grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6'
                }
              >
                {filteredCategories.map((cat, itemIdx) => (
                  <ItemCardOrRow
                    key={cat.code}
                    cat={cat}
                    view={viewParam}
                    searchQuery={deferredSearchInput}
                    showGroupMeta
                    staggerIndex={itemIdx < 12 ? itemIdx : undefined}
                    openModal={openProductModal}
                  />
                ))}
              </div>
            ) : (
              /* CASE 3: EMPTY SEARCH STATE */
              <div className="py-16 lg:py-24 px-6 text-center bg-[#0D1117] border border-[#1F2937] rounded-[24px] space-y-6 max-w-xl mx-auto">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-[#A9B4C0]">
                  <Search className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-white">
                    No categories match &ldquo;{deferredSearchInput.trim()}&rdquo;.
                  </h2>
                  <p className="text-sm text-[#A9B4C0]">
                    Try a different word, or browse a group.
                  </p>
                </div>

                {/* Suggestion Chips */}
                <div className="space-y-2 pt-2">
                  <p className="text-xs uppercase tracking-wider font-semibold text-[#A9B4C0]">
                    Popular Groups
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {groupsWithCounts.slice(0, 3).map((g) => (
                      <button
                        key={g.key}
                        type="button"
                        onClick={() => {
                          setSearchInput('');
                          setGroupFilter(g.key);
                        }}
                        className="px-4 py-2 rounded-full bg-[#050608] border border-[#1F2937] text-xs font-semibold text-white hover:border-[#8DC63F] hover:text-[#8DC63F] transition-colors"
                      >
                        {g.label} ({g.count})
                      </button>
                    ))}
                  </div>
                </div>

                {/* Clear all & Modal Link */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={clearAllFilters}
                    className="px-5 py-2.5 rounded-full bg-[#0B65B3] text-white text-xs font-bold hover:bg-[#0B65B3]/80 transition-colors"
                  >
                    Clear all filters
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      openProductModal({
                        prefillMessage: `I am looking for: ${deferredSearchInput.trim()}`,
                      })
                    }
                    className="text-xs font-semibold text-[#8DC63F] hover:underline"
                  >
                    Can&apos;t find it? Send an enquiry
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* 10. BOTTOM CTA SECTION */}
      <section className="mt-16 lg:mt-24 border-t border-[#1F2937] bg-[#0D1117] py-20 lg:py-32 relative">
        {/* Soft top gradient hairline */}
        <div
          className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#0B65B3] to-[#8DC63F]"
          aria-hidden="true"
        />

        <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <Reveal>
            <div className="space-y-4 max-w-2xl mx-auto">
              <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-semibold text-white leading-[1.15] [text-wrap:balance]">
                Can&apos;t Find What You Need?
              </h2>
              <p className="text-base text-[#A9B4C0] leading-[1.65] max-w-[46ch] mx-auto">
                Tell us what your project needs and our team will get back to you.
              </p>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-[360px] sm:max-w-none mx-auto pt-2">
              <LightningButton
                variant="primary"
                size="lg"
                onClick={() => openProductModal()}
                iconLeft={<Send className="w-4 h-4" />}
              >
                Send Enquiry
              </LightningButton>
              <LightningButton
                variant="secondary"
                size="lg"
                href="tel:+97172042763"
                iconLeft={<Phone className="w-4 h-4 text-[#8DC63F]" />}
              >
                Call Now
              </LightningButton>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

// ----------------------------------------------------------------------
// Enquire Now Button Component
// ----------------------------------------------------------------------
function EnquireNowButton({
  cat,
  openModal,
  className = '',
}: {
  cat: CategoryExplorerItem;
  openModal: (ctx: { categoryCode: string; categoryTitle: string }) => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-label={`Enquire Now about ${cat.title}`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        openModal({ categoryCode: cat.code, categoryTitle: cat.title });
      }}
      className={`group/btn relative z-10 inline-flex items-center justify-center gap-2 rounded-full border border-white/16 bg-[#050608] hover:bg-white focus-visible:bg-white hover:text-[#050608] focus-visible:text-[#050608] hover:border-white focus-visible:border-white text-white font-semibold transition-all duration-300 active-press select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] ${className}`}
    >
      <Send className="w-4 h-4 text-[#8DC63F] group-hover/btn:text-[#050608] group-focus-visible/btn:text-[#050608] transition-colors shrink-0" />
      <span>Enquire Now</span>
    </button>
  );
}

// ----------------------------------------------------------------------
// Item Design Component (Grid Card vs List Row)
// ----------------------------------------------------------------------
function ItemCardOrRow({
  cat,
  view,
  searchQuery,
  showGroupMeta = false,
  staggerIndex,
  openModal,
}: {
  cat: CategoryExplorerItem;
  view: 'grid' | 'list';
  searchQuery: string;
  showGroupMeta?: boolean;
  staggerIndex?: number;
  openModal: (ctx: { categoryCode: string; categoryTitle: string }) => void;
}) {
  const router = useRouter();
  const GroupIcon = getGroupIcon(cat.group);
  const familiesString = cat.productFamilies.join(' · ');
  const prefetchedRef = useRef(false);

  const handlePrefetch = () => {
    if (!prefetchedRef.current) {
      prefetchedRef.current = true;
      router.prefetch(`/products/${cat.slug}`);
    }
  };

  // Determine photo data using imageUrl or fallback category placeholder
  const placeholder = getCategoryPlaceholder(cat.group, cat.groupLabel, cat.title);
  const photoUrl = cat.imageUrl || placeholder.imageUrl;
  const photoAlt = cat.imageAlt || placeholder.imageAlt;
  const isPlaceholder = cat.isPlaceholder ?? (!cat.imageUrl);

  // Mobile or List view layout
  if (view === 'list') {
    return (
      <Reveal staggerIndex={staggerIndex} as="article">
        <div className="px-4 sm:px-6 py-5 border-b border-[#1F2937] last:border-b-0">
          {/* Mobile View (below lg): Flex layout [Image thumbnail] [Content] */}
          <div className="lg:hidden group/card relative flex items-start gap-4 min-h-[88px] cursor-pointer">
            {/* Thumbnail Box */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-[#161B22] border border-[#1F2937] shrink-0 mt-0.5 group/img">
              <Image
                src={photoUrl}
                alt={photoAlt}
                fill
                className="object-cover transition-transform duration-300 group-hover/card:scale-105"
                sizes="(max-width: 640px) 80px, 96px"
              />
              <div className="absolute top-1 left-1 w-6 h-6 rounded-md bg-[#050608]/85 backdrop-blur-md border border-[#0B65B3]/30 text-[#8DC63F] flex items-center justify-center">
                <GroupIcon className="w-3.5 h-3.5" />
              </div>
              {isPlaceholder && (
                <span className="absolute bottom-1 right-1 px-1 py-0.5 text-[8px] font-medium text-white/70 bg-[#050608]/85 backdrop-blur-md rounded border border-white/10">
                  Sample
                </span>
              )}
            </div>

            {/* Content Block */}
            <div className="flex-1 min-w-0 space-y-1.5">
              {/* Meta Row: code, group label in flat results, ArrowUpRight at right end */}
              <div className="flex items-center justify-between gap-2 text-[13px] text-[#A9B4C0] font-medium">
                <div className="flex items-center gap-2 truncate">
                  <span className="font-semibold text-[#8DC63F]">{cat.code}</span>
                  {showGroupMeta && (
                    <>
                      <span>·</span>
                      <span className="truncate">{cat.groupLabel}</span>
                    </>
                  )}
                </div>
                <ArrowUpRight className="w-4.5 h-4.5 text-[#A9B4C0] group-hover/card:text-[#8DC63F] group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 transition-all duration-250 shrink-0" />
              </div>

              {/* Title Link with Stretched-link pseudo element and gradient underline */}
              <h3 className="text-base font-semibold text-white leading-snug">
                <Link
                  href={`/products?group=${cat.group}&codes=${cat.code}`}
                  prefetch={false}
                  className="relative z-0 group/link inline-block focus-visible:outline-none after:absolute after:inset-0 after:z-0 after:rounded-lg after:content-[''] after:cursor-pointer focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-[#8DC63F] focus-visible:after:outline-offset-2"
                >
                  <span className="relative inline-block after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-gradient-to-r after:from-[#0B65B3] after:to-[#8DC63F] after:scale-x-0 group-hover/card:after:scale-x-100 group-focus-within/card:after:scale-x-100 focus-visible:after:scale-x-100 after:origin-left after:transition-transform after:duration-350">
                    <HighlightedText text={cat.title} query={searchQuery} />
                  </span>
                </Link>
              </h3>

              <p className="text-xs text-[#A9B4C0] line-clamp-2 leading-relaxed">
                {cat.description}
              </p>

              {cat.productFamilies.length > 0 && (
                <p className="text-xs text-white/70 line-clamp-1">
                  Includes: {familiesString}
                </p>
              )}

              {/* Enquire Now Button */}
              <div className="pt-2">
                <EnquireNowButton
                  cat={cat}
                  openModal={openModal}
                  className="h-11 px-5 text-sm w-auto inline-flex"
                />
              </div>
            </div>
          </div>

          {/* Desktop List View (lg and up): Flex [Image thumbnail] [Content] [Button] */}
          <div className="hidden lg:flex group/card relative items-center gap-6 py-2 cursor-pointer">
            {/* Thumbnail Box */}
            <div className="relative w-28 h-24 rounded-xl overflow-hidden bg-[#161B22] border border-[#1F2937] shrink-0 group/img">
              <Image
                src={photoUrl}
                alt={photoAlt}
                fill
                className="object-cover transition-transform duration-300 group-hover/card:scale-105"
                sizes="112px"
              />
              <div className="absolute top-1.5 left-1.5 w-7 h-7 rounded-md bg-[#050608]/85 backdrop-blur-md border border-[#0B65B3]/30 text-[#8DC63F] flex items-center justify-center">
                <GroupIcon className="w-3.5 h-3.5" />
              </div>
              {isPlaceholder && (
                <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 text-[9px] font-medium text-white/70 bg-[#050608]/85 backdrop-blur-md rounded border border-white/10">
                  Sample image
                </span>
              )}
            </div>

            {/* Content Block */}
            <div className="flex-1 min-w-0 space-y-1">
              {/* Meta Row: code, group label, ArrowUpRight icon */}
              <div className="flex items-center gap-3 text-xs text-[#A9B4C0] font-medium">
                <span className="font-semibold text-[#8DC63F]">{cat.code}</span>
                {showGroupMeta && (
                  <>
                    <span>·</span>
                    <span>{cat.groupLabel}</span>
                  </>
                )}
                <ArrowUpRight className="w-4.5 h-4.5 text-[#A9B4C0] group-hover/card:text-[#8DC63F] group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 transition-all duration-250" />
              </div>

              <h3 className="text-lg font-semibold text-white leading-snug">
                <Link
                  href={`/products?group=${cat.group}&codes=${cat.code}`}
                  prefetch={false}
                  className="relative z-0 group/link inline-block focus-visible:outline-none after:absolute after:inset-0 after:z-0 after:rounded-lg after:content-[''] after:cursor-pointer focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-[#8DC63F] focus-visible:after:outline-offset-2"
                >
                  <span className="relative inline-block after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-gradient-to-r after:from-[#0B65B3] after:to-[#8DC63F] after:scale-x-0 group-hover/card:after:scale-x-100 group-focus-within/card:after:scale-x-100 focus-visible:after:scale-x-100 after:origin-left after:transition-transform after:duration-350">
                    <HighlightedText text={cat.title} query={searchQuery} />
                  </span>
                </Link>
              </h3>

              <p className="text-sm text-[#A9B4C0] line-clamp-2 leading-relaxed">
                {cat.description}
              </p>

              {cat.productFamilies.length > 0 && (
                <p className="text-xs text-white/70 line-clamp-1">
                  Includes: {familiesString}
                </p>
              )}
            </div>

            {/* Vertically Centered Enquire Now Pill (44px) */}
            <div className="shrink-0">
              <EnquireNowButton
                cat={cat}
                openModal={openModal}
                className="h-11 px-5 text-sm w-auto"
              />
            </div>
          </div>
        </div>
      </Reveal>
    );
  }

  // Grid Card Layout (md and up)
  return (
    <Reveal staggerIndex={staggerIndex} as="article" className="h-full">
      <div className="relative group/card bg-[#0D1117] border border-[#1F2937] hover:border-[#0B65B3]/50 hover:bg-[#161B22]/50 rounded-2xl p-4 sm:p-5 flex flex-col h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(11,101,179,0.12)] active-press cursor-pointer">
        {/* Product Photo Showcase Box */}
        <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-[#161B22] border border-[#1F2937] mb-4 group/img">
          <Image
            src={photoUrl}
            alt={photoAlt}
            fill
            className="object-cover transition-transform duration-500 group-hover/card:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117]/70 via-transparent to-black/30 pointer-events-none" />

          {/* Floating Top Bar Over Image */}
          <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-2 pointer-events-none">
            <div className="w-8 h-8 rounded-lg bg-[#050608]/85 backdrop-blur-md border border-[#0B65B3]/30 text-[#8DC63F] flex items-center justify-center shrink-0">
              <GroupIcon className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#050608]/85 backdrop-blur-md border border-white/10">
              <span className="text-xs font-semibold text-[#8DC63F] tabular-nums">
                <HighlightedText text={cat.code} query={searchQuery} />
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#A9B4C0] group-hover/card:text-[#8DC63F] group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 transition-all duration-250" />
            </div>
          </div>

          {/* Placeholder Badge */}
          {isPlaceholder && (
            <span className="absolute bottom-2 right-2 px-2 py-0.5 text-[10px] font-medium text-white/70 bg-[#050608]/85 backdrop-blur-md rounded border border-white/10 pointer-events-none">
              Sample image
            </span>
          )}
        </div>

        {/* Card Content */}
        <div className="space-y-2.5 mb-4 flex-1">
          {showGroupMeta && (
            <span className="text-[12px] font-semibold text-[#8DC63F] uppercase tracking-wider block">
              {cat.groupLabel}
            </span>
          )}

          <h3 className="text-base sm:text-lg font-semibold text-white leading-snug [text-wrap:balance]">
            <Link
              href={`/products?group=${cat.group}&codes=${cat.code}`}
              prefetch={false}
              className="relative z-0 group/link inline-block focus-visible:outline-none after:absolute after:inset-0 after:z-0 after:rounded-2xl after:content-[''] after:cursor-pointer focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-[#8DC63F] focus-visible:after:outline-offset-2"
            >
              <span className="relative inline-block after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-gradient-to-r after:from-[#0B65B3] after:to-[#8DC63F] after:scale-x-0 group-hover/card:after:scale-x-100 group-focus-within/card:after:scale-x-100 focus-visible:after:scale-x-100 after:origin-left after:transition-transform after:duration-350">
                <HighlightedText text={cat.title} query={searchQuery} />
              </span>
            </Link>
          </h3>

          <p className="text-xs sm:text-sm text-[#A9B4C0] line-clamp-2 leading-relaxed">
            {cat.description}
          </p>

          {/* Families Paragraph */}
          {cat.productFamilies.length > 0 && (
            <p className="text-xs text-white/65 line-clamp-2 pt-0.5">
              <span>Includes: {cat.productFamilies.slice(0, 3).join(' · ')}</span>
              {cat.productFamilies.length > 3 && (
                <span className="text-[#A9B4C0] ml-1 font-medium">
                  +{cat.productFamilies.length - 3} more
                </span>
              )}
            </p>
          )}
        </div>

        {/* Card Footer (Pinned to bottom): ONE Enquire Now button full-width */}
        <div className="pt-4 border-t border-[#1F2937] mt-auto">
          <EnquireNowButton
            cat={cat}
            openModal={openModal}
            className="w-full h-11 text-[14px]"
          />
        </div>
      </div>
    </Reveal>
  );
}
