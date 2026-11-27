'use client';

import React, {
  useState,
  useMemo,
  useEffect,
  useRef,
  useDeferredValue,
  useCallback,
  useSyncExternalStore,
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
  ChevronDown,
  CornerDownRight,
} from 'lucide-react';
import Image from 'next/image';
import BrandImage from '@/components/ui/BrandImage';
import { getCategoryPlaceholder } from '@/lib/utils/placeholders';
import { useEnquiryModal } from '@/components/modals/EnquiryModalProvider';
import { getGroupIcon, getGroupLabel } from '@/lib/group-icons';
import {
  buildTaxonomyTree,
  getMainCategoryDef,
  getSubcategoryMeta,
  resolveLegacyGroupTarget,
  resolveProductTaxonomy,
  type TaxonomyMainNode,
  type TaxonomySubNode,
} from '@/lib/product-taxonomy';
import { PILLARS_CONFIG } from '@/config/pillars';
import LightningButton from '@/components/ui/LightningButton';
import Reveal from '@/components/ui/Reveal';
import CustomSelect, { SelectOption } from '@/components/ui/CustomSelect';
import ProductPreviewModal from './ProductPreviewModal';

const SORT_OPTIONS: SelectOption[] = [
  { value: 'featured', label: 'Featured Order' },
  { value: 'az', label: 'A to Z' },
];

export interface CategoryExplorerItem {
  code: string;
  slug: string;
  group: string;
  groupLabel: string;
  mainCategoryId?: string;
  mainCategoryLabel?: string;
  subcategoryId?: string;
  subcategoryLabel?: string;
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
  initialMain?: string;
  initialSub?: string;
  initialCodes?: string[];
  initialSort?: 'featured' | 'az';
  initialView?: 'grid' | 'list';
}

function normalizeCode(str: string): string {
  return str.toLowerCase().replace(/[\s\-_]/g, '');
}

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
}

function getReducedMotionSnapshot() {
  return typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;
}

function getReducedMotionServerSnapshot() {
  return false;
}

function GroupIconMark({ group, className }: { group: string; className?: string }) {
  return React.createElement(getGroupIcon(group), { className });
}

function HighlightedText({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;
  const words = query
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);
  if (words.length === 0) return <>{text}</>;

  const escapedWords = words.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const pattern = new RegExp(`(${escapedWords.join('|')})`, 'gi');
  const parts = text.split(pattern);

  return (
    <>
      {parts.map((part, i) =>
        words.includes(part.toLowerCase()) ? (
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
  initialMain = '',
  initialSub = '',
  initialCodes = [],
  initialSort = 'featured',
  initialView = 'grid',
}: ProductsExplorerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { openProductModal } = useEnquiryModal();

  // Enrich items once with deterministic Main Category + Subcategory taxonomy
  const enrichedCategories = useMemo(() => {
    return categories.map((cat) => {
      const tax = resolveProductTaxonomy(cat.code, cat.group, cat.groupLabel);
      return {
        ...cat,
        mainCategoryId: cat.mainCategoryId || tax.mainId,
        mainCategoryLabel: cat.mainCategoryLabel || tax.mainLabel,
        subcategoryId: cat.subcategoryId || tax.subId,
        subcategoryLabel: cat.subcategoryLabel || tax.subLabel,
      };
    });
  }, [categories]);

  // Complete taxonomy tree for sidebar, mobile chips, and bottom sheet
  const fullTree = useMemo(
    () => buildTaxonomyTree(enrichedCategories, false),
    [enrichedCategories]
  );

  // Product Preview Modal state
  const [previewCategory, setPreviewCategory] = useState<CategoryExplorerItem | null>(null);
  const [previewInitialForm, setPreviewInitialForm] = useState(false);

  const handleOpenPreview = (cat: CategoryExplorerItem, showForm = false) => {
    setPreviewCategory(cat);
    setPreviewInitialForm(showForm);
  };

  // URL state
  const qParam = searchParams?.get('q') ?? initialQ;
  const rawGroupParam = searchParams?.get('group') ?? initialGroup;
  const groupParam = rawGroupParam ? rawGroupParam.toUpperCase() : 'ALL';
  const rawMainParam = (searchParams?.get('main') ?? initialMain ?? '').toLowerCase();
  const rawSubParam = (searchParams?.get('sub') ?? initialSub ?? '').toLowerCase();
  const codesParam = searchParams?.get('codes') ?? null;
  const sortParam = (searchParams?.get('sort') as 'featured' | 'az') || initialSort;
  const viewParam = (searchParams?.get('view') as 'grid' | 'list') || initialView;

  // Derive active Main Category & Subcategory (supporting direct ?main/?sub as well as legacy ?group=)
  const activeTaxonomySelection = useMemo(() => {
    if (rawSubParam) {
      const subMeta = getSubcategoryMeta(rawSubParam);
      if (subMeta) {
        return { mainId: subMeta.mainDef.id, subId: subMeta.subDef.id };
      }
      const fallbackSub = fullTree
        .flatMap((m) => m.subcategories)
        .find((s) => s.id === rawSubParam);
      if (fallbackSub) {
        return { mainId: fallbackSub.mainId, subId: fallbackSub.id };
      }
    }

    if (rawMainParam) {
      return { mainId: rawMainParam, subId: null as string | null };
    }

    if (groupParam && groupParam !== 'ALL') {
      return resolveLegacyGroupTarget(groupParam);
    }

    return { mainId: null as string | null, subId: null as string | null };
  }, [rawSubParam, rawMainParam, groupParam, fullTree]);

  const effectiveMainId = activeTaxonomySelection.mainId;
  const effectiveSubId = activeTaxonomySelection.subId;

  // Local state for search input (debounced with deferred value)
  const [searchInput, setSearchInput] = useState(qParam);
  const deferredSearchInput = useDeferredValue(searchInput);
  const lastPushedQueryRef = useRef(qParam);

  // Sidebar collapse state (empty map => all main categories expanded by default)
  const [collapsedMains, setCollapsedMains] = useState<Record<string, boolean>>({});

  const allExpanded = useMemo(
    () => fullTree.length > 0 && fullTree.every((m) => !collapsedMains[m.id]),
    [fullTree, collapsedMains]
  );

  const toggleAllExpanded = () => {
    const collapseTarget = allExpanded;
    const next: Record<string, boolean> = {};
    fullTree.forEach((m) => {
      next[m.id] = collapseTarget;
    });
    setCollapsedMains(next);
  };

  const toggleMainExpanded = (mainId: string) => {
    setCollapsedMains((prev) => ({
      ...prev,
      [mainId]: !prev[mainId],
    }));
  };

  // Mobile Groups Sheet state
  const [sheetOpen, setSheetOpen] = useState(false);

  // Refs
  const searchInputRef = useRef<HTMLInputElement>(null);
  const groupsButtonRef = useRef<HTMLButtonElement>(null);
  const activeChipRef = useRef<HTMLAnchorElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const sidebarScrollRef = useRef<HTMLDivElement>(null);
  const activeRowRef = useRef<HTMLAnchorElement>(null);
  const resultsTopRef = useRef<HTMLElement>(null);
  const scrollTimerRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartY = useRef<number>(0);
  const touchCurrentY = useRef<number>(0);
  const [sheetTranslateY, setSheetTranslateY] = useState(0);

  // Reduced motion detection via useSyncExternalStore (no synchronous setState in effect)
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  // Scroll handler for sidebar scroll container
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

  useEffect(() => {
    handleSidebarScroll();
  }, [handleSidebarScroll, enrichedCategories]);

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
          top: Math.max(0, rowTop - 12),
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
        });
      } else if (rowBottom > containerBottom) {
        container.scrollTo({
          top: rowBottom - container.clientHeight + 12,
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
        });
      }
    }
  }, [effectiveMainId, effectiveSubId, prefersReducedMotion]);

  // Update search input if URL q changes externally
  useEffect(() => {
    if (
      qParam !== lastPushedQueryRef.current &&
      document.activeElement !== searchInputRef.current
    ) {
      lastPushedQueryRef.current = qParam;
      setSearchInput(qParam);
    }
  }, [qParam]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const url = new URL(window.location.href);
      const urlQ = url.searchParams.get('q') || '';
      lastPushedQueryRef.current = urlQ;
      setSearchInput(urlQ);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

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

  // Build URL helper preserving query/sort/view cleanly
  const buildCategoryHref = useCallback(
    (opts: { main?: string | null; sub?: string | null; group?: string | null; clearCodes?: boolean }) => {
      const params = new URLSearchParams(searchParams ? searchParams.toString() : '');
      params.delete('main');
      params.delete('sub');
      params.delete('group');
      if (opts.clearCodes !== false) {
        params.delete('codes');
      }
      if (opts.main) params.set('main', opts.main);
      if (opts.sub) params.set('sub', opts.sub);
      if (opts.group && opts.group !== 'ALL') params.set('group', opts.group);
      const qs = params.toString();
      return qs ? `/products?${qs}` : '/products';
    },
    [searchParams]
  );

  // Scroll smoothly to results header if the user has scrolled below it
  const scrollToResultsIfNeeded = useCallback(() => {
    if (typeof window === 'undefined' || !resultsTopRef.current) return;
    const rect = resultsTopRef.current.getBoundingClientRect();
    if (rect.top < 80) {
      const targetTop = Math.max(0, window.scrollY + rect.top - 160);
      window.scrollTo({
        top: targetTop,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    }
  }, [prefersReducedMotion]);

  // Navigation helpers for All / Main Category / Subcategory
  const selectAllProducts = useCallback(() => {
    router.push(buildCategoryHref({ main: null, sub: null, group: null }), { scroll: false });
    scrollToResultsIfNeeded();
  }, [router, buildCategoryHref, scrollToResultsIfNeeded]);

  const selectMainCategory = useCallback(
    (mainId: string) => {
      setCollapsedMains((prev) => (prev[mainId] ? { ...prev, [mainId]: false } : prev));
      router.push(buildCategoryHref({ main: mainId, sub: null, group: null }), { scroll: false });
      scrollToResultsIfNeeded();
    },
    [router, buildCategoryHref, scrollToResultsIfNeeded]
  );

  const selectSubcategory = useCallback(
    (mainId: string, subId: string) => {
      setCollapsedMains((prev) => (prev[mainId] ? { ...prev, [mainId]: false } : prev));
      router.push(buildCategoryHref({ main: mainId, sub: subId, group: null }), { scroll: false });
      scrollToResultsIfNeeded();
    },
    [router, buildCategoryHref, scrollToResultsIfNeeded]
  );

  const clearLegacyGroup = useCallback(() => {
    const params = new URLSearchParams(searchParams ? searchParams.toString() : '');
    params.delete('group');
    const qs = params.toString();
    router.push(qs ? `/products?${qs}` : '/products', { scroll: false });
  }, [router, searchParams]);

  // Clear search input handler
  const clearSearch = useCallback(() => {
    setSearchInput('');
    lastPushedQueryRef.current = '';
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.delete('q');
      window.history.replaceState(window.history.state, '', url.pathname + url.search);
    }
    searchInputRef.current?.focus();
  }, []);

  // Sync search input to URL with replaceState and 250ms debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      const trimmed = deferredSearchInput.trim().slice(0, 80);
      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href);
        const currentQ = url.searchParams.get('q') || '';
        if (trimmed !== currentQ) {
          lastPushedQueryRef.current = trimmed;
          if (trimmed) {
            url.searchParams.set('q', trimmed);
          } else {
            url.searchParams.delete('q');
          }
          window.history.replaceState(window.history.state, '', url.pathname + url.search);
        }
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [deferredSearchInput]);

  // URL state update helper for replace (sort, view, codes)
  const updateUrlParam = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams ? searchParams.toString() : '');
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      const qs = params.toString();
      router.replace(qs ? `/products?${qs}` : '/products', { scroll: false });
    },
    [router, searchParams]
  );

  // Clear all filters handler
  const clearAllFilters = useCallback(() => {
    setSearchInput('');
    lastPushedQueryRef.current = '';
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
    let result = [...enrichedCategories];

    // 1. Filter by explicit codes (from Pillars / Home links)
    if (activeCodes.length > 0) {
      const matched = result.filter((cat) => activeCodes.includes(cat.code.toUpperCase()));
      if (matched.length > 0) {
        result = matched;
      }
    }

    // 2. Filter by Subcategory / Main Category / Legacy Group
    if (rawSubParam) {
      result = result.filter((cat) => cat.subcategoryId === rawSubParam);
    } else if (rawMainParam) {
      result = result.filter((cat) => cat.mainCategoryId === rawMainParam);
    } else if (groupParam && groupParam !== 'ALL') {
      result = result.filter((cat) => cat.group.toUpperCase() === groupParam.toUpperCase());
    }

    // 3. Search text matching & ranking (searches code, title, description, families, main & sub categories)
    const query = deferredSearchInput.trim().toLowerCase();
    if (query) {
      const normQuery = normalizeCode(query);
      const tokens = query.split(/\s+/).filter(Boolean);

      result = result.filter((cat) => {
        const normCatCode = normalizeCode(cat.code);
        const codeMatch = normCatCode.includes(normQuery);
        const titleMatch = tokens.every((t) => cat.title.toLowerCase().includes(t));
        const descMatch = tokens.every((t) => cat.description.toLowerCase().includes(t));
        const mainMatch = tokens.every((t) =>
          (cat.mainCategoryLabel || '').toLowerCase().includes(t)
        );
        const subMatch = tokens.every((t) =>
          (cat.subcategoryLabel || '').toLowerCase().includes(t)
        );
        const familiesMatch = tokens.every((t) =>
          cat.productFamilies.some((f) => f.toLowerCase().includes(t))
        );
        return codeMatch || titleMatch || descMatch || mainMatch || subMatch || familiesMatch;
      });

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
  }, [
    enrichedCategories,
    activeCodes,
    rawSubParam,
    rawMainParam,
    groupParam,
    deferredSearchInput,
    sortParam,
  ]);

  // Quick matching Main Categories & Subcategories when user searches
  const searchCategoryMatches = useMemo(() => {
    const query = deferredSearchInput.trim().toLowerCase();
    if (!query) return { mains: [] as TaxonomyMainNode<CategoryExplorerItem>[], subs: [] as TaxonomySubNode<CategoryExplorerItem>[] };

    const tokens = query.split(/\s+/).filter(Boolean);
    const mains = fullTree.filter((m) =>
      tokens.every((t) => m.label.toLowerCase().includes(t))
    );
    const subs = fullTree
      .flatMap((m) => m.subcategories)
      .filter((s) => tokens.every((t) => s.label.toLowerCase().includes(t)));

    return { mains: mains.slice(0, 4), subs: subs.slice(0, 5) };
  }, [deferredSearchInput, fullTree]);

  // Should we display flat ranked results vs category-wise Main -> Subcategory -> Products?
  const isSearchActive = Boolean(deferredSearchInput.trim());
  const isGlobalAlphabetical =
    sortParam === 'az' &&
    !rawMainParam &&
    !rawSubParam &&
    (!groupParam || groupParam === 'ALL') &&
    activeCodes.length === 0;
  const showFlatResults = isSearchActive || isGlobalAlphabetical;

  // Build hierarchical tree for current filtered view
  const filteredTree = useMemo(() => {
    if (showFlatResults) return [];
    return buildTaxonomyTree(filteredCategories, sortParam === 'az');
  }, [showFlatResults, filteredCategories, sortParam]);

  // Metadata for currently selected Main Category / Subcategory (for header & mobile secondary strip)
  const activeMainNode = useMemo(() => {
    if (!effectiveMainId) return null;
    return fullTree.find((m) => m.id === effectiveMainId) || null;
  }, [fullTree, effectiveMainId]);

  const activeSubNode = useMemo(() => {
    if (!effectiveSubId) return null;
    for (const m of fullTree) {
      const found = m.subcategories.find((s) => s.id === effectiveSubId);
      if (found) return found;
    }
    return null;
  }, [fullTree, effectiveSubId]);

  // Human-readable live summary string for desktop & mobile toolbars
  const liveSummaryText = useMemo(() => {
    const count = filteredCategories.length;
    const itemWord = count === 1 ? 'product' : 'products';
    if (isSearchActive) {
      return `Showing ${count} ${itemWord}`;
    }
    if (activeSubNode) {
      return `Showing ${count} ${itemWord} in ${activeSubNode.label}`;
    }
    if (activeMainNode && !rawGroupParamActive(groupParam)) {
      return `Showing ${count} ${itemWord} across ${activeMainNode.subcategories.length} subcategories`;
    }
    if (groupParam && groupParam !== 'ALL') {
      return `Showing ${count} ${itemWord} in ${getGroupLabel(groupParam)}`;
    }
    return `Showing ${count} ${itemWord} across ${fullTree.length} categories`;
  }, [
    filteredCategories.length,
    isSearchActive,
    activeSubNode,
    activeMainNode,
    groupParam,
    fullTree.length,
  ]);

  // Scroll active chip into view on mobile strip
  useEffect(() => {
    if (activeChipRef.current) {
      activeChipRef.current.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [effectiveMainId, effectiveSubId, prefersReducedMotion]);

  // Mobile Bottom Sheet Focus Trap & Body Scroll Lock
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

  // Active filters check
  const hasActiveFilters =
    Boolean(deferredSearchInput.trim()) ||
    Boolean(rawMainParam) ||
    Boolean(rawSubParam) ||
    (Boolean(groupParam) && groupParam !== 'ALL') ||
    activeCodes.length > 0 ||
    sortParam !== 'featured';

  const activeMainLabel =
    (rawMainParam && (getMainCategoryDef(rawMainParam)?.label || activeMainNode?.label)) ||
    null;
  const activeSubLabel =
    (rawSubParam && (getSubcategoryMeta(rawSubParam)?.subDef.label || activeSubNode?.label)) ||
    null;

  return (
    <div id="products-explorer" className="min-h-screen bg-[#050608] text-white">
      {/* 3. PAGE HEADER (Full Background Hero Image) */}
      <div
        id="products-hero"
        data-dark-hero="true"
        data-hero-section="true"
        className="products-hero relative bg-[#050608] overflow-hidden border-b border-[#1F2937]/80 min-h-[360px] sm:min-h-[400px] lg:min-h-[440px] flex flex-col justify-end"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/products-hero-banner.png"
            alt="Vision Energy comprehensive electrical, earthing, lightning protection, and MEP product range"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center lg:object-right"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050608]/80 via-[#050608]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-transparent to-[#050608]/25" />
        </div>

        <div className="max-w-[80rem] w-full mx-auto px-4 sm:px-6 lg:px-8 pt-[calc(var(--header-offset,118px)+32px)] lg:pt-[calc(var(--header-offset,118px)+48px)] pb-10 sm:pb-14 relative z-10">
          <div className="space-y-4 max-w-4xl">
            <nav
              aria-label="Breadcrumb"
              className="text-[13px] text-white/80 font-medium flex items-center gap-2 drop-shadow-sm"
            >
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-white/50" />
              <span className="text-white font-semibold" aria-current="page">
                Products
              </span>
            </nav>

            <h1 className="text-[clamp(2.25rem,5vw,3.75rem)] font-bold text-white leading-[1.1] tracking-[-0.02em] [text-wrap:balance] drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
              Product Catalogue
            </h1>

            <p className="text-base lg:text-[18px] text-slate-100 leading-[1.65] max-w-[62ch] font-normal drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]">
              Browse certified product lines structured by main category and subcategory across lightning protection, earthing, wires &amp; cables, switchgear, HVAC, and laboratory supplies.
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
          {/* Search Input Container */}
          <div className="relative flex-1 lg:max-w-[480px]" role="search">
            <Search className="w-4 h-4 text-[#A9B4C0] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              ref={searchInputRef}
              type="text"
              inputMode="search"
              role="searchbox"
              enterKeyHint="search"
              autoComplete="off"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') clearSearch();
              }}
              placeholder="Search products or categories (e.g. lightning, cable, SPD)"
              aria-label="Search products"
              className="w-full h-12 lg:h-11 pl-11 pr-11 lg:pr-12 rounded-full bg-[#050608] border border-[#1F2937] text-base lg:text-sm text-white placeholder-[#A9B4C0] focus:outline-none focus:border-[#8DC63F] focus:ring-1 focus:ring-[#8DC63F] transition-colors"
            />
            {searchInput ? (
              <button
                type="button"
                onClick={clearSearch}
                aria-label="Clear search input"
                className="absolute right-1 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center text-[#A9B4C0] hover:text-white rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F]"
              >
                <X className="w-4 h-4" />
              </button>
            ) : (
              <span
                className="hidden lg:flex items-center justify-center absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded bg-white/10 text-[11px] font-mono font-bold text-[#A9B4C0] pointer-events-none"
                aria-hidden="true"
              >
                /
              </span>
            )}
          </div>

          {/* MOBILE TOOLBAR RIGHT: Categories Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              ref={groupsButtonRef}
              type="button"
              onClick={() => setSheetOpen(true)}
              aria-expanded={sheetOpen}
              aria-controls="groups-sheet"
              aria-label="Open product categories sheet"
              className="h-12 px-4 rounded-full bg-[#0D1117] border border-[#1F2937] text-sm font-semibold text-white flex items-center gap-2 hover:bg-white/5 active-press"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#8DC63F]" />
              <span>Categories</span>
              {(effectiveMainId || (groupParam && groupParam !== 'ALL')) && (
                <span className="w-2 h-2 rounded-full bg-[#8DC63F] pill-glow" />
              )}
            </button>
          </div>

          {/* DESKTOP TOOLBAR RIGHT */}
          <div className="hidden lg:flex items-center gap-6">
            <span className="text-sm font-medium text-[#A9B4C0]" aria-live="polite">
              {liveSummaryText}
            </span>

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

      {/* 5. MOBILE CATEGORY & SUBCATEGORY CHIPS + SUMMARY ROW (< lg) */}
      <div className="block lg:hidden border-b border-[#1F2937]/60 bg-[#050608]">
        {/* Row 1: Main Categories Horizontal Strip */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-snap-x px-5 py-3">
          <Link
            ref={!effectiveMainId && (!groupParam || groupParam === 'ALL') ? activeChipRef : undefined}
            href={buildCategoryHref({ main: null, sub: null, group: null })}
            onClick={(e) => {
              e.preventDefault();
              selectAllProducts();
            }}
            className={`shrink-0 scroll-snap-align-start h-[42px] px-4 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-colors border select-none ${
              !effectiveMainId && (!groupParam || groupParam === 'ALL')
                ? 'bg-[#8DC63F]/15 border-[#8DC63F] text-[#8DC63F] pill-glow'
                : 'bg-[#0D1117] border-[#1F2937] text-[#A9B4C0] hover:text-white'
            }`}
          >
            <span>All Products</span>
            <span className="opacity-70 tabular-nums">({enrichedCategories.length})</span>
          </Link>

          {fullTree.map((mainNode) => {
            const isMainActive = effectiveMainId === mainNode.id;
            return (
              <Link
                key={mainNode.id}
                ref={isMainActive && !effectiveSubId ? activeChipRef : undefined}
                href={buildCategoryHref({ main: mainNode.id, sub: null, group: null })}
                onClick={(e) => {
                  e.preventDefault();
                  selectMainCategory(mainNode.id);
                }}
                className={`shrink-0 scroll-snap-align-start h-[42px] px-4 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-colors border select-none ${
                  isMainActive
                    ? 'bg-[#8DC63F]/15 border-[#8DC63F] text-[#8DC63F] pill-glow'
                    : 'bg-[#0D1117] border-[#1F2937] text-[#A9B4C0] hover:text-white'
                }`}
              >
                <span>{mainNode.label}</span>
                <span className="opacity-70 tabular-nums">({mainNode.totalCount})</span>
              </Link>
            );
          })}
        </div>

        {/* Row 2: Contextual Subcategory Chips when a Main Category is active */}
        {activeMainNode && activeMainNode.subcategories.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-snap-x px-5 pb-3 pt-1 border-t border-[#1F2937]/40">
            <Link
              href={buildCategoryHref({ main: activeMainNode.id, sub: null, group: null })}
              onClick={(e) => {
                e.preventDefault();
                selectMainCategory(activeMainNode.id);
              }}
              className={`shrink-0 h-[34px] px-3 rounded-full text-[11.5px] font-semibold flex items-center gap-1.5 transition-colors border select-none ${
                !effectiveSubId && !rawGroupParamActive(groupParam)
                  ? 'bg-[#0B65B3]/20 border-[#0B65B3] text-white'
                  : 'bg-[#0D1117] border-[#1F2937] text-[#A9B4C0] hover:text-white'
              }`}
            >
              <span>All in {activeMainNode.label}</span>
            </Link>

            {activeMainNode.subcategories.map((subNode) => {
              const isSubActive = effectiveSubId === subNode.id;
              return (
                <Link
                  key={subNode.id}
                  ref={isSubActive ? activeChipRef : undefined}
                  href={buildCategoryHref({
                    main: activeMainNode.id,
                    sub: subNode.id,
                    group: null,
                  })}
                  onClick={(e) => {
                    e.preventDefault();
                    selectSubcategory(activeMainNode.id, subNode.id);
                  }}
                  className={`shrink-0 h-[34px] px-3 rounded-full text-[11.5px] font-medium flex items-center gap-1.5 transition-colors border select-none ${
                    isSubActive
                      ? 'bg-[#8DC63F]/15 border-[#8DC63F] text-[#8DC63F] font-semibold'
                      : 'bg-[#0D1117] border-[#1F2937] text-[#A9B4C0] hover:text-white'
                  }`}
                >
                  <CornerDownRight className="w-3 h-3 opacity-70 shrink-0" />
                  <span>{subNode.label}</span>
                  <span className="opacity-70 tabular-nums">({subNode.count})</span>
                </Link>
              );
            })}
          </div>
        )}

        {/* Mobile Summary Row */}
        <div className="px-5 py-2.5 flex items-center justify-between border-t border-[#1F2937]/40 text-xs text-[#A9B4C0]">
          <span aria-live="polite" aria-atomic="true" className="truncate pr-2">
            {liveSummaryText}
          </span>

          <div className="flex items-center gap-1.5 shrink-0">
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
          <ActiveFilterChips
            compact
            activeMainLabel={activeMainLabel}
            activeSubLabel={activeSubLabel}
            rawMainParam={rawMainParam}
            rawSubParam={rawSubParam}
            groupParam={groupParam}
            effectiveMainId={effectiveMainId}
            searchQuery={deferredSearchInput.trim()}
            activeCodesCount={activeCodes.length}
            pillarMatch={pillarMatch}
            onSelectAll={selectAllProducts}
            onSelectMain={selectMainCategory}
            onClearLegacyGroup={clearLegacyGroup}
            onClearSearch={() => setSearchInput('')}
            onClearCodes={() => updateUrlParam('codes', null)}
            onClearAll={clearAllFilters}
          />
        )}
      </div>

      {/* MOBILE HIERARCHICAL CATEGORIES BOTTOM SHEET (< lg) */}
      {sheetOpen && (
        <div
          id="groups-sheet"
          role="dialog"
          aria-modal="true"
          aria-label="Product categories and subcategories"
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
              transition:
                sheetTranslateY === 0 && !prefersReducedMotion
                  ? 'transform 320ms cubic-bezier(0.22, 1, 0.36, 1)'
                  : 'none',
            }}
            className="w-full max-h-[88svh] bg-[#0D1117] border-t border-[#1F2937] rounded-t-[24px] flex flex-col overflow-hidden shadow-2xl pb-safe"
          >
            <div
              className="w-12 h-1.5 bg-gray-600/60 rounded-full mx-auto my-3 shrink-0"
              aria-hidden="true"
            />

            <div className="px-6 py-3 border-b border-[#1F2937] flex items-center justify-between shrink-0">
              <h2 className="text-lg font-bold text-white">Product Categories</h2>
              <button
                type="button"
                onClick={() => {
                  setSheetOpen(false);
                  groupsButtonRef.current?.focus();
                }}
                className="w-11 h-11 flex items-center justify-center text-[#A9B4C0] hover:text-white rounded-xl hover:bg-white/10 transition-colors"
                aria-label="Close product categories sheet"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="overflow-y-auto divide-y divide-[#1F2937]/60">
              {/* All Products Row */}
              <button
                type="button"
                onClick={() => {
                  selectAllProducts();
                  setSheetOpen(false);
                  groupsButtonRef.current?.focus();
                }}
                className={`w-full min-h-[52px] px-6 flex items-center justify-between text-left text-base font-semibold transition-colors ${
                  !effectiveMainId && (!groupParam || groupParam === 'ALL')
                    ? 'bg-[#8DC63F]/10 text-[#8DC63F]'
                    : 'text-white hover:bg-white/5'
                }`}
              >
                <span>All products ({enrichedCategories.length})</span>
                {!effectiveMainId && (!groupParam || groupParam === 'ALL') && (
                  <Check className="w-5 h-5 text-[#8DC63F]" />
                )}
              </button>

              {/* Main Categories & Nested Subcategories */}
              {fullTree.map((mainNode) => {
                const isMainSelected = effectiveMainId === mainNode.id && !effectiveSubId;
                const hasSelectedSub = effectiveMainId === mainNode.id && Boolean(effectiveSubId);
                const isExpanded = !collapsedMains[mainNode.id];

                return (
                  <div key={mainNode.id} className="py-1">
                    <div className="flex items-center justify-between pr-3">
                      <button
                        type="button"
                        onClick={() => {
                          selectMainCategory(mainNode.id);
                          setSheetOpen(false);
                          groupsButtonRef.current?.focus();
                        }}
                        className={`flex-1 min-h-[48px] pl-6 pr-2 flex items-center justify-between text-left text-[15px] font-bold transition-colors ${
                          isMainSelected
                            ? 'text-[#8DC63F]'
                            : hasSelectedSub
                            ? 'text-white'
                            : 'text-white hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <GroupIconMark
                            group={mainNode.iconGroup}
                            className="w-4 h-4 text-[#8DC63F] shrink-0"
                          />
                          <span className="truncate">{mainNode.label}</span>
                        </div>
                        <span className="text-xs font-medium text-[#A9B4C0] tabular-nums ml-2">
                          {mainNode.totalCount}
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => toggleMainExpanded(mainNode.id)}
                        aria-expanded={isExpanded}
                        aria-label={`Toggle ${mainNode.label} subcategories`}
                        className="w-10 h-10 flex items-center justify-center rounded-lg text-[#A9B4C0] hover:text-white hover:bg-white/5"
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                    </div>

                    {isExpanded && (
                      <div className="pl-10 pr-6 pb-2 space-y-1">
                        {mainNode.subcategories.map((subNode) => {
                          const isSubActive = effectiveSubId === subNode.id;
                          return (
                            <button
                              key={subNode.id}
                              type="button"
                              onClick={() => {
                                selectSubcategory(mainNode.id, subNode.id);
                                setSheetOpen(false);
                                groupsButtonRef.current?.focus();
                              }}
                              className={`w-full min-h-[40px] px-3 rounded-lg flex items-center justify-between text-left text-sm transition-colors ${
                                isSubActive
                                  ? 'bg-[#8DC63F]/15 text-[#8DC63F] font-semibold'
                                  : 'text-[#A9B4C0] hover:text-white hover:bg-white/5'
                              }`}
                            >
                              <span className="flex items-center gap-2 min-w-0">
                                <CornerDownRight className="w-3.5 h-3.5 shrink-0 opacity-70" />
                                <span className="truncate">{subNode.label}</span>
                              </span>
                              <span className="text-xs opacity-75 tabular-nums ml-2 shrink-0">
                                {subNode.count}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 6. MAIN CONTENT AREA (Desktop Hierarchical Sidebar + Category-Wise Products) */}
      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="lg:grid lg:grid-cols-[300px_1fr] lg:gap-10 2xl:gap-14 items-start">
          {/* DESKTOP STICKY SIDEBAR (>= lg) */}
          <aside
            className="hidden lg:block self-start sticky z-20 w-[300px] transition-[top] duration-250 cubic-bezier(0.22, 1, 0.36, 1)"
            style={{
              top: 'calc(var(--header-offset, 0px) + 64px + 24px)',
              maxHeight: 'calc(100svh - var(--header-offset, 0px) - 64px - 48px)',
            }}
          >
            <nav
              aria-label="Product categories and subcategories"
              className="flex flex-col h-full max-h-[inherit]"
            >
              {/* Top Eyebrow + Collapse/Expand All */}
              <div className="flex-none pb-2.5 px-2 flex items-center justify-between">
                <h2 className="text-[12px] uppercase tracking-[0.14em] font-semibold text-[#A9B4C0]">
                  CATEGORIES
                </h2>
                <button
                  type="button"
                  onClick={toggleAllExpanded}
                  className="text-[11px] font-semibold text-[#A9B4C0] hover:text-[#8DC63F] transition-colors"
                >
                  {allExpanded ? 'Collapse all' : 'Expand all'}
                </button>
              </div>

              {/* Scrollable Tree Container */}
              <div
                ref={sidebarScrollRef}
                onScroll={handleSidebarScroll}
                className="flex-1 min-h-0 overflow-y-auto sidebar-scroll relative pr-1.5 py-1"
              >
                <div className="border-l border-[#1F2937] space-y-1">
                  {/* Row 0: All products */}
                  <Link
                    ref={!effectiveMainId && (!groupParam || groupParam === 'ALL') ? activeRowRef : undefined}
                    href={buildCategoryHref({ main: null, sub: null, group: null })}
                    onClick={(e) => {
                      e.preventDefault();
                      selectAllProducts();
                    }}
                    className={`relative h-[38px] px-3 flex items-center justify-between text-[13.5px] transition-colors rounded-r-lg ${
                      !effectiveMainId && (!groupParam || groupParam === 'ALL')
                        ? 'text-white font-semibold bg-white/[0.08] before:absolute before:left-0 before:inset-y-1 before:w-[2.5px] before:rounded-full before:bg-[#8DC63F]'
                        : 'text-white/65 font-medium hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span className="truncate">All products</span>
                    <span className="text-[11px] text-[#A9B4C0] tabular-nums ml-2 shrink-0">
                      {enrichedCategories.length}
                    </span>
                  </Link>

                  {/* Hierarchical Main Category -> ↳ Subcategories Tree (Screenshot 3 style) */}
                  {fullTree.map((mainNode) => {
                    const isMainActive =
                      effectiveMainId === mainNode.id &&
                      !effectiveSubId &&
                      !rawGroupParamActive(groupParam);
                    const hasActiveSub =
                      effectiveMainId === mainNode.id &&
                      (Boolean(effectiveSubId) || rawGroupParamActive(groupParam));
                    const isExpanded = !collapsedMains[mainNode.id];

                    return (
                      <div
                        key={mainNode.id}
                        className="pt-2 mt-2 border-t border-[#1F2937]"
                      >
                        {/* Main Category Header Row */}
                        <div className="flex items-center gap-0.5">
                          <Link
                            ref={isMainActive ? activeRowRef : undefined}
                            href={buildCategoryHref({
                              main: mainNode.id,
                              sub: null,
                              group: null,
                            })}
                            onClick={(e) => {
                              e.preventDefault();
                              selectMainCategory(mainNode.id);
                            }}
                            className={`relative flex-1 min-w-0 min-h-[36px] py-1.5 pl-3 pr-2 flex items-center justify-between gap-2 text-[13.5px] transition-colors rounded-r-lg ${
                              isMainActive
                                ? 'text-white font-bold bg-white/[0.08] before:absolute before:left-0 before:inset-y-1 before:w-[2.5px] before:rounded-full before:bg-[#8DC63F]'
                                : hasActiveSub
                                ? 'text-white font-bold hover:bg-white/5'
                                : 'text-white font-semibold hover:bg-white/5'
                            }`}
                          >
                            <span className="flex items-center gap-2 min-w-0">
                              <GroupIconMark
                                group={mainNode.iconGroup}
                                className={`w-3.5 h-3.5 shrink-0 ${
                                  isMainActive || hasActiveSub
                                    ? 'text-[#8DC63F]'
                                    : 'text-[#A9B4C0]'
                                }`}
                              />
                              <span className="truncate">{mainNode.label}</span>
                            </span>
                            <span className="text-[11px] font-medium text-[#A9B4C0] tabular-nums shrink-0">
                              {mainNode.totalCount}
                            </span>
                          </Link>

                          <button
                            type="button"
                            onClick={() => toggleMainExpanded(mainNode.id)}
                            aria-expanded={isExpanded}
                            aria-label={
                              isExpanded
                                ? `Collapse ${mainNode.label}`
                                : `Expand ${mainNode.label}`
                            }
                            className="w-7 h-7 rounded-md flex items-center justify-center text-[#A9B4C0] hover:text-white hover:bg-white/5 transition-colors shrink-0"
                          >
                            <ChevronDown
                              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                                isExpanded ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                        </div>

                        {/* Indented Subcategories with ↳ prefix */}
                        {isExpanded && (
                          <div className="pl-3 pr-1 pt-0.5 pb-1 space-y-0.5">
                            {mainNode.subcategories.map((subNode) => {
                              const isSubActive = effectiveSubId === subNode.id;
                              return (
                                <Link
                                  key={subNode.id}
                                  ref={isSubActive ? activeRowRef : undefined}
                                  href={buildCategoryHref({
                                    main: mainNode.id,
                                    sub: subNode.id,
                                    group: null,
                                  })}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    selectSubcategory(mainNode.id, subNode.id);
                                  }}
                                  className={`relative min-h-[32px] py-1 px-2.5 flex items-center justify-between gap-2 text-[12.5px] leading-snug transition-colors rounded-r-lg ${
                                    isSubActive
                                      ? 'text-white font-semibold bg-white/[0.08] before:absolute before:left-0 before:inset-y-1 before:w-[2.5px] before:rounded-full before:bg-[#8DC63F]'
                                      : 'text-white/65 font-normal hover:text-white hover:bg-white/5'
                                  }`}
                                >
                                  <span className="flex items-center gap-1.5 min-w-0">
                                    <CornerDownRight
                                      className={`w-3 h-3 shrink-0 ${
                                        isSubActive
                                          ? 'text-[#8DC63F]'
                                          : 'text-[#A9B4C0] opacity-75'
                                      }`}
                                    />
                                    <span className="truncate">{subNode.label}</span>
                                  </span>
                                  <span className="text-[11px] text-[#A9B4C0] tabular-nums shrink-0">
                                    {subNode.count}
                                  </span>
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Help Block inside scroll container */}
                <div className="pt-4 mt-4 border-t border-[#1F2937]/80 space-y-2 px-3 pb-3">
                  <p className="text-xs uppercase tracking-wider font-semibold text-white/70">
                    Need help choosing?
                  </p>
                  <div className="flex flex-col space-y-1.5 text-xs">
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
              </div>
            </nav>
          </aside>

          {/* RESULTS MAIN CONTAINER */}
          <main ref={resultsTopRef} className="min-h-[400px]">
            {/* Desktop Active Filter Chips */}
            {hasActiveFilters && (
              <ActiveFilterChips
                activeMainLabel={activeMainLabel}
                activeSubLabel={activeSubLabel}
                rawMainParam={rawMainParam}
                rawSubParam={rawSubParam}
                groupParam={groupParam}
                effectiveMainId={effectiveMainId}
                searchQuery={deferredSearchInput.trim()}
                activeCodesCount={activeCodes.length}
                pillarMatch={pillarMatch}
                onSelectAll={selectAllProducts}
                onSelectMain={selectMainCategory}
                onClearLegacyGroup={clearLegacyGroup}
                onClearSearch={() => setSearchInput('')}
                onClearCodes={() => updateUrlParam('codes', null)}
                onClearAll={clearAllFilters}
              />
            )}

            {/* Quick Category Matches when Searching */}
            {isSearchActive &&
              (searchCategoryMatches.mains.length > 0 ||
                searchCategoryMatches.subs.length > 0) && (
                <div className="mb-6 p-4 rounded-2xl bg-[#0D1117] border border-[#1F2937] space-y-2.5">
                  <span className="text-[11px] uppercase tracking-[0.12em] font-bold text-[#A9B4C0] block">
                    Matching Categories
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    {searchCategoryMatches.mains.map((m) => (
                      <button
                        key={`match-main-${m.id}`}
                        type="button"
                        onClick={() => {
                          setSearchInput('');
                          selectMainCategory(m.id);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#8DC63F]/10 border border-[#8DC63F]/40 text-xs font-semibold text-[#8DC63F] hover:bg-[#8DC63F]/20 transition-colors"
                      >
                        <span>{m.label}</span>
                        <span className="opacity-75 tabular-nums">({m.totalCount})</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    ))}
                    {searchCategoryMatches.subs.map((s) => (
                      <button
                        key={`match-sub-${s.id}`}
                        type="button"
                        onClick={() => {
                          setSearchInput('');
                          selectSubcategory(s.mainId, s.id);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#050608] border border-[#1F2937] text-xs font-medium text-white hover:border-[#8DC63F] hover:text-[#8DC63F] transition-colors"
                      >
                        <CornerDownRight className="w-3 h-3 text-[#8DC63F]" />
                        <span>{s.label}</span>
                        <span className="opacity-70 tabular-nums">({s.count})</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

            {/* CASE 1: HIERARCHICAL VIEW (Main Category -> Subcategory -> Products) */}
            {!showFlatResults && filteredTree.length > 0 ? (
              <div className="space-y-12 lg:space-y-16">
                {/* Context Header & Subcategory Quick-Switcher when a Main Category or Subcategory is active */}
                {(activeMainNode || (groupParam && groupParam !== 'ALL')) && (
                  <CategoryContextHeader
                    activeMainNode={activeMainNode}
                    activeSubNode={activeSubNode}
                    groupParam={groupParam}
                    filteredCount={filteredCategories.length}
                    onSelectAll={selectAllProducts}
                    onSelectMain={selectMainCategory}
                    onSelectSub={selectSubcategory}
                    buildCategoryHref={buildCategoryHref}
                  />
                )}

                {filteredTree.map((mainNode, mainIdx) => {
                  const isSingleSelectedView = Boolean(rawMainParam || rawSubParam || (groupParam && groupParam !== 'ALL'));

                  return (
                    <section
                      key={mainNode.id}
                      id={`category-${mainNode.id}`}
                      className={`relative rounded-2xl ${
                        mainNode.isPriority && !isSingleSelectedView
                          ? 'p-4 sm:p-6 bg-gradient-to-b from-[#0B65B3]/10 to-transparent rounded-[24px] border border-[#0B65B3]/20'
                          : ''
                      }`}
                      style={{
                        scrollMarginTop: 'calc(var(--header-offset, 80px) + 64px + 16px)',
                        contentVisibility:
                          !isSingleSelectedView && mainIdx >= 2 ? 'auto' : undefined,
                        containIntrinsicSize:
                          !isSingleSelectedView && mainIdx >= 2 ? '1px 600px' : undefined,
                      }}
                    >
                      {/* Main Category Section Heading (shown in All-Products overview or multi-category pillar views) */}
                      {(!isSingleSelectedView || filteredTree.length > 1) && (
                        <div className="space-y-3 pb-5 mb-7 border-b border-[#1F2937]">
                          {mainNode.isPriority && (
                            <div className="flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-[#8DC63F] pill-glow" />
                              <span className="text-[11px] font-bold text-[#8DC63F] uppercase tracking-wider">
                                Priority Range
                              </span>
                            </div>
                          )}

                          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                            <div className="space-y-1.5">
                              <div className="flex items-center gap-3">
                                <span className="w-9 h-9 rounded-xl bg-[#0D1117] border border-[#1F2937] text-[#8DC63F] flex items-center justify-center shrink-0">
                                  <GroupIconMark group={mainNode.iconGroup} className="w-4.5 h-4.5" />
                                </span>
                                <h2 className="text-xl sm:text-2xl lg:text-[clamp(1.5rem,2.4vw,2.1rem)] font-bold text-white leading-snug">
                                  {mainNode.label}
                                </h2>
                                <span className="text-xs font-semibold text-[#A9B4C0] bg-[#0D1117] border border-[#1F2937] px-2.5 py-0.5 rounded-full tabular-nums">
                                  {mainNode.totalCount}{' '}
                                  {mainNode.totalCount === 1 ? 'product' : 'products'}
                                </span>
                              </div>

                              {mainNode.description && (
                                <p className="text-xs sm:text-sm text-[#A9B4C0] max-w-2xl leading-relaxed">
                                  {mainNode.description}
                                </p>
                              )}
                            </div>

                            <Link
                              href={buildCategoryHref({
                                main: mainNode.id,
                                sub: null,
                                group: null,
                              })}
                              onClick={(e) => {
                                e.preventDefault();
                                selectMainCategory(mainNode.id);
                              }}
                              className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#8DC63F] hover:underline shrink-0"
                            >
                              <span>View category</span>
                              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            </Link>
                          </div>

                          {/* Subcategory quick-filter chips directly inside each Main Category */}
                          {mainNode.subcategories.length > 1 && (
                            <div className="flex flex-wrap items-center gap-1.5 pt-1">
                              {mainNode.subcategories.map((subNode) => (
                                <Link
                                  key={subNode.id}
                                  href={buildCategoryHref({
                                    main: mainNode.id,
                                    sub: subNode.id,
                                    group: null,
                                  })}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    selectSubcategory(mainNode.id, subNode.id);
                                  }}
                                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0D1117] border border-[#1F2937] hover:border-[#8DC63F]/60 text-xs font-medium text-[#A9B4C0] hover:text-white transition-colors"
                                >
                                  <CornerDownRight className="w-3 h-3 text-[#8DC63F]" />
                                  <span>{subNode.label}</span>
                                  <span className="opacity-70 tabular-nums">({subNode.count})</span>
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Subcategory Blocks & Products Inside Each Subcategory */}
                      <div className="space-y-10">
                        {mainNode.subcategories.map((subNode, subIdx) => (
                          <div
                            key={subNode.id}
                            id={`sub-${subNode.id}`}
                            className="space-y-4"
                          >
                            {/* Subcategory Header (shown unless a single subcategory is already isolated at top) */}
                            {!(effectiveSubId && mainNode.subcategories.length === 1 && filteredTree.length === 1) && (
                              <div className="flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl bg-[#0D1117] border border-[#1F2937]">
                                <div className="flex items-center gap-2.5 min-w-0">
                                  <CornerDownRight className="w-4 h-4 text-[#8DC63F] shrink-0" />
                                  <h3 className="text-sm sm:text-base font-semibold text-white truncate">
                                    {subNode.label}
                                  </h3>
                                  <span className="text-[11px] font-semibold text-[#A9B4C0] bg-[#050608] border border-[#1F2937] px-2 py-0.5 rounded-full tabular-nums shrink-0">
                                    {subNode.count}{' '}
                                    {subNode.count === 1 ? 'product' : 'products'}
                                  </span>
                                </div>

                                <Link
                                  href={buildCategoryHref({
                                    main: mainNode.id,
                                    sub: subNode.id,
                                    group: null,
                                  })}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    selectSubcategory(mainNode.id, subNode.id);
                                  }}
                                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#8DC63F] hover:underline shrink-0"
                                >
                                  <span className="hidden sm:inline">Filter</span>
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                              </div>
                            )}

                            {/* Products Grid / List inside this Subcategory */}
                            <div
                              className={
                                viewParam === 'list'
                                  ? 'divide-y divide-[#1F2937] rounded-2xl border border-[#1F2937] bg-[#0D1117]/40'
                                  : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8'
                              }
                            >
                              {subNode.items.map((cat, itemIdx) => (
                                <ItemCardOrRow
                                  key={cat.code}
                                  cat={cat}
                                  view={viewParam}
                                  searchQuery={deferredSearchInput}
                                  staggerIndex={
                                    mainIdx < 2 && subIdx < 2 && itemIdx < 8
                                      ? mainIdx * 4 + subIdx * 2 + itemIdx
                                      : undefined
                                  }
                                  openModal={() => handleOpenPreview(cat, true)}
                                  openPreview={() => handleOpenPreview(cat, false)}
                                />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  );
                })}
              </div>
            ) : filteredCategories.length > 0 ? (
              /* CASE 2: FLAT RANKED RESULTS (SEARCH OR GLOBAL A-Z SORT) */
              <div
                className={
                  viewParam === 'list'
                    ? 'divide-y divide-[#1F2937] rounded-2xl border border-[#1F2937] bg-[#0D1117]/40'
                    : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8'
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
                    openModal={() => handleOpenPreview(cat, true)}
                    openPreview={() => handleOpenPreview(cat, false)}
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
                    No products match &ldquo;{deferredSearchInput.trim()}&rdquo;.
                  </h2>
                  <p className="text-sm text-[#A9B4C0]">
                    Try a different keyword, or browse one of our main categories.
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <p className="text-xs uppercase tracking-wider font-semibold text-[#A9B4C0]">
                    Popular Categories
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {fullTree.slice(0, 4).map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => {
                          setSearchInput('');
                          selectMainCategory(m.id);
                        }}
                        className="px-4 py-2 rounded-full bg-[#050608] border border-[#1F2937] text-xs font-semibold text-white hover:border-[#8DC63F] hover:text-[#8DC63F] transition-colors"
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={clearAllFilters}
                    className="px-5 py-2.5 rounded-full bg-[#0B65B3] hover:bg-[#095292] text-white text-xs font-bold border border-[#8DC63F]/50 hover:border-[#8DC63F] shadow-[0_0_14px_rgba(11,101,179,0.35)] transition-all"
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
                iconLeft={<Send className="w-4 h-4 text-[#8DC63F]" />}
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

      {/* Product Preview & Requirement Modal */}
      <ProductPreviewModal
        category={previewCategory}
        isOpen={!!previewCategory}
        onClose={() => setPreviewCategory(null)}
        initialShowForm={previewInitialForm}
      />
    </div>
  );
}

function rawGroupParamActive(groupParam: string) {
  return Boolean(groupParam && groupParam !== 'ALL');
}

// ----------------------------------------------------------------------
// Shared Removable Active Filter Chips Bar (Mobile & Desktop)
// ----------------------------------------------------------------------
function ActiveFilterChips({
  compact = false,
  activeMainLabel,
  activeSubLabel,
  rawMainParam,
  rawSubParam,
  groupParam,
  effectiveMainId,
  searchQuery,
  activeCodesCount,
  pillarMatch,
  onSelectAll,
  onSelectMain,
  onClearLegacyGroup,
  onClearSearch,
  onClearCodes,
  onClearAll,
}: {
  compact?: boolean;
  activeMainLabel: string | null;
  activeSubLabel: string | null;
  rawMainParam: string;
  rawSubParam: string;
  groupParam: string;
  effectiveMainId: string | null;
  searchQuery: string;
  activeCodesCount: number;
  pillarMatch: string | null;
  onSelectAll: () => void;
  onSelectMain: (mainId: string) => void;
  onClearLegacyGroup: () => void;
  onClearSearch: () => void;
  onClearCodes: () => void;
  onClearAll: () => void;
}) {
  const pillHeight = compact ? 'h-8 px-3 gap-1.5' : 'h-9 px-4 gap-2';
  const wrapperClass = compact
    ? 'px-5 pb-3 flex flex-wrap items-center gap-2 pt-1 border-t border-[#1F2937]/40'
    : 'hidden lg:flex flex-wrap items-center gap-2 pb-6';

  return (
    <div className={wrapperClass}>
      {activeMainLabel && (
        <span
          className={`inline-flex items-center ${pillHeight} rounded-full bg-[#8DC63F]/10 border border-[#8DC63F]/40 text-xs font-semibold text-[#8DC63F]`}
        >
          <span>Category: {activeMainLabel}</span>
          <button
            type="button"
            onClick={onSelectAll}
            className="w-5 h-5 rounded-full flex items-center justify-center hover:bg-[#8DC63F]/20 text-[#8DC63F]"
            aria-label="Remove category filter"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </span>
      )}

      {activeSubLabel && (
        <span
          className={`inline-flex items-center ${pillHeight} rounded-full bg-[#0B65B3]/20 border border-[#0B65B3]/40 text-xs font-semibold text-white`}
        >
          <span>Subcategory: {activeSubLabel}</span>
          <button
            type="button"
            onClick={() => (effectiveMainId ? onSelectMain(effectiveMainId) : onSelectAll())}
            className="w-5 h-5 rounded-full flex items-center justify-center hover:bg-white/20 text-white"
            aria-label="Remove subcategory filter"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </span>
      )}

      {!rawMainParam && !rawSubParam && groupParam && groupParam !== 'ALL' && (
        <span
          className={`inline-flex items-center ${pillHeight} rounded-full bg-[#8DC63F]/10 border border-[#8DC63F]/40 text-xs font-semibold text-[#8DC63F]`}
        >
          <span>Group: {getGroupLabel(groupParam)}</span>
          <button
            type="button"
            onClick={onClearLegacyGroup}
            className="w-5 h-5 rounded-full flex items-center justify-center hover:bg-[#8DC63F]/20 text-[#8DC63F]"
            aria-label="Remove group filter"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </span>
      )}

      {searchQuery && (
        <span
          className={`inline-flex items-center ${pillHeight} rounded-full bg-[#0B65B3]/20 border border-[#0B65B3]/40 text-xs font-semibold text-white`}
        >
          <span>Search: &ldquo;{searchQuery}&rdquo;</span>
          <button
            type="button"
            onClick={onClearSearch}
            className="w-5 h-5 rounded-full flex items-center justify-center hover:bg-white/20 text-white"
            aria-label="Remove search filter"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </span>
      )}

      {activeCodesCount > 0 && (
        <span
          className={`inline-flex items-center ${pillHeight} rounded-full bg-[#8DC63F]/10 border border-[#8DC63F]/40 text-xs font-semibold text-[#8DC63F]`}
        >
          <span>Filtered: {pillarMatch || 'Selection'}</span>
          <button
            type="button"
            onClick={onClearCodes}
            className="w-5 h-5 rounded-full flex items-center justify-center hover:bg-[#8DC63F]/20 text-[#8DC63F]"
            aria-label="Remove codes filter"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </span>
      )}

      <button
        type="button"
        onClick={onClearAll}
        className={`text-xs text-[#A9B4C0] hover:text-white font-semibold underline underline-offset-2 ${
          compact ? 'px-1 py-1' : 'px-2 py-1'
        }`}
      >
        {compact ? 'Clear all' : 'Clear all filters'}
      </button>
    </div>
  );
}

// ----------------------------------------------------------------------
// Context Header & Subcategory Quick-Switcher for Filtered Views
// ----------------------------------------------------------------------
function CategoryContextHeader({
  activeMainNode,
  activeSubNode,
  groupParam,
  filteredCount,
  onSelectAll,
  onSelectMain,
  onSelectSub,
  buildCategoryHref,
}: {
  activeMainNode: TaxonomyMainNode<CategoryExplorerItem> | null;
  activeSubNode: TaxonomySubNode<CategoryExplorerItem> | null;
  groupParam: string;
  filteredCount: number;
  onSelectAll: () => void;
  onSelectMain: (mainId: string) => void;
  onSelectSub: (mainId: string, subId: string) => void;
  buildCategoryHref: (opts: {
    main?: string | null;
    sub?: string | null;
    group?: string | null;
  }) => string;
}) {
  const title = activeSubNode
    ? activeSubNode.label
    : activeMainNode && !rawGroupParamActive(groupParam)
    ? activeMainNode.label
    : getGroupLabel(groupParam);

  const description = activeSubNode
    ? `Products under ${activeSubNode.mainLabel} › ${activeSubNode.label}.`
    : activeMainNode && !rawGroupParamActive(groupParam)
    ? activeMainNode.description
    : `Certified product lines in ${getGroupLabel(groupParam)}.`;

  const iconGroup = activeMainNode ? activeMainNode.iconGroup : groupParam;

  return (
    <div className="p-5 sm:p-6 rounded-[22px] bg-[#0D1117] border border-[#1F2937] space-y-4">
      {/* Breadcrumb */}
      <nav aria-label="Category breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs text-[#A9B4C0] font-medium">
        <Link
          href="/products"
          onClick={(e) => {
            e.preventDefault();
            onSelectAll();
          }}
          className="hover:text-[#8DC63F] transition-colors"
        >
          All products
        </Link>

        {activeMainNode && (
          <>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            {activeSubNode ? (
              <Link
                href={buildCategoryHref({ main: activeMainNode.id, sub: null, group: null })}
                onClick={(e) => {
                  e.preventDefault();
                  onSelectMain(activeMainNode.id);
                }}
                className="hover:text-[#8DC63F] transition-colors"
              >
                {activeMainNode.label}
              </Link>
            ) : (
              <span className="text-white font-semibold">{activeMainNode.label}</span>
            )}
          </>
        )}

        {activeSubNode && (
          <>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            <span className="text-white font-semibold">{activeSubNode.label}</span>
          </>
        )}
      </nav>

      {/* Main Heading & Product Count */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#050608] border border-[#1F2937] text-[#8DC63F] flex items-center justify-center shrink-0 mt-0.5">
            <GroupIconMark group={iconGroup} className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
              {title}
            </h2>
            {description && (
              <p className="text-xs sm:text-sm text-[#A9B4C0] max-w-2xl leading-relaxed">
                {description}
              </p>
            )}
          </div>
        </div>

        <span className="self-start sm:self-center text-xs font-semibold text-[#8DC63F] bg-[#8DC63F]/10 border border-[#8DC63F]/30 px-3 py-1 rounded-full tabular-nums shrink-0">
          {filteredCount} {filteredCount === 1 ? 'product' : 'products'}
        </span>
      </div>

      {/* Subcategory Quick-Switcher Pills inside Active Main Category */}
      {activeMainNode && activeMainNode.subcategories.length > 1 && (
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#1F2937]/70">
          <Link
            href={buildCategoryHref({ main: activeMainNode.id, sub: null, group: null })}
            onClick={(e) => {
              e.preventDefault();
              onSelectMain(activeMainNode.id);
            }}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
              !activeSubNode && !rawGroupParamActive(groupParam)
                ? 'bg-[#8DC63F]/15 border-[#8DC63F] text-[#8DC63F]'
                : 'bg-[#050608] border-[#1F2937] text-[#A9B4C0] hover:text-white hover:border-[#8DC63F]/50'
            }`}
          >
            <span>All in {activeMainNode.label}</span>
            <span className="opacity-70 tabular-nums">({activeMainNode.totalCount})</span>
          </Link>

          {activeMainNode.subcategories.map((subNode) => {
            const isActive = activeSubNode?.id === subNode.id;
            return (
              <Link
                key={subNode.id}
                href={buildCategoryHref({
                  main: activeMainNode.id,
                  sub: subNode.id,
                  group: null,
                })}
                onClick={(e) => {
                  e.preventDefault();
                  onSelectSub(activeMainNode.id, subNode.id);
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                  isActive
                    ? 'bg-[#8DC63F]/15 border-[#8DC63F] text-[#8DC63F] font-semibold'
                    : 'bg-[#050608] border-[#1F2937] text-[#A9B4C0] hover:text-white hover:border-[#8DC63F]/50'
                }`}
              >
                <CornerDownRight className="w-3 h-3 opacity-75" />
                <span>{subNode.label}</span>
                <span className="opacity-70 tabular-nums">({subNode.count})</span>
              </Link>
            );
          })}
        </div>
      )}
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
      data-preserve-contrast="true"
      aria-label={`Enquire Now about ${cat.title}`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        openModal({ categoryCode: cat.code, categoryTitle: cat.title });
      }}
      className={`group/btn relative z-10 inline-flex items-center justify-center gap-2 rounded-full border border-[#8DC63F]/50 hover:border-[#8DC63F] bg-[#0B65B3] hover:bg-[#095292] focus-visible:bg-[#095292] text-white font-semibold shadow-[0_0_16px_rgba(11,101,179,0.35)] hover:shadow-[0_0_24px_rgba(141,198,63,0.45)] transition-all duration-300 active-press select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] ${className}`}
    >
      <Send className="w-4 h-4 text-[#8DC63F] group-hover/btn:scale-110 transition-transform shrink-0" />
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
  openPreview,
}: {
  cat: CategoryExplorerItem;
  view: 'grid' | 'list';
  searchQuery: string;
  showGroupMeta?: boolean;
  staggerIndex?: number;
  openModal: (ctx: { categoryCode: string; categoryTitle: string }) => void;
  openPreview: (cat: CategoryExplorerItem) => void;
}) {
  const router = useRouter();
  const familiesString = cat.productFamilies.join(' · ');
  const prefetchedRef = useRef(false);

  const handlePrefetch = () => {
    if (!prefetchedRef.current) {
      prefetchedRef.current = true;
      router.prefetch(`/products/${cat.slug}`);
    }
  };

  const placeholder = getCategoryPlaceholder(cat.group, cat.groupLabel, cat.title);
  const photoUrl = cat.imageUrl || placeholder.imageUrl;
  const photoAlt = cat.imageAlt || placeholder.imageAlt;
  const isPlaceholder = cat.isPlaceholder ?? !cat.imageUrl;
  const metaPath = `${cat.mainCategoryLabel || cat.groupLabel}${
    cat.subcategoryLabel ? ` › ${cat.subcategoryLabel}` : ''
  }`;

  if (view === 'list') {
    return (
      <Reveal staggerIndex={staggerIndex} as="article">
        <div
          onMouseEnter={handlePrefetch}
          className="px-4 sm:px-6 py-5 border-b border-[#1F2937] last:border-b-0"
        >
          {/* Mobile List View */}
          <div
            onClick={() => openPreview(cat)}
            className="lg:hidden group/card relative flex items-start gap-4 min-h-[88px] cursor-pointer"
          >
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-[#161B22] border border-[#1F2937] shrink-0 mt-0.5 group/img p-1">
              <BrandImage
                src={photoUrl}
                alt={photoAlt}
                fill
                surface="auto"
                logoSize="xs"
                className="object-contain transition-transform duration-300 group-hover/card:scale-105"
                sizes="(max-width: 640px) 80px, 96px"
              />
              <div className="absolute top-1 left-1 z-20 w-6 h-6 rounded-md bg-[#050608]/85 backdrop-blur-md border border-[#0B65B3]/30 text-[#8DC63F] flex items-center justify-center">
                <GroupIconMark group={cat.group} className="w-3.5 h-3.5" />
              </div>
              {isPlaceholder && (
                <span className="absolute bottom-1 right-1 z-20 px-1 py-0.5 text-[8px] font-medium text-white/70 bg-[#050608]/85 backdrop-blur-md rounded border border-white/10">
                  Sample
                </span>
              )}
            </div>

            <div className="flex-1 min-w-0 space-y-1.5">
              <div className="flex items-center justify-between gap-2 text-[13px] text-[#A9B4C0] font-medium">
                <div className="flex items-center gap-2 truncate">
                  <span className="font-semibold text-[#8DC63F]">{cat.code}</span>
                  {showGroupMeta && (
                    <>
                      <span>·</span>
                      <span className="truncate">{metaPath}</span>
                    </>
                  )}
                </div>
                <ArrowUpRight className="w-4.5 h-4.5 text-[#A9B4C0] group-hover/card:text-[#8DC63F] group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 transition-all duration-250 shrink-0" />
              </div>

              <h3 className="text-base font-semibold text-white leading-snug">
                <span className="relative inline-block after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-gradient-to-r after:from-[#0B65B3] after:to-[#8DC63F] after:scale-x-0 group-hover/card:after:scale-x-100 group-focus-within/card:after:scale-x-100 focus-visible:after:scale-x-100 after:origin-left after:transition-transform after:duration-350">
                  <HighlightedText text={cat.title} query={searchQuery} />
                </span>
              </h3>

              <p className="text-xs text-[#A9B4C0] line-clamp-2 leading-relaxed">
                {cat.description}
              </p>

              {cat.productFamilies.length > 0 && (
                <p className="text-xs text-white/70 line-clamp-1">
                  Includes: {familiesString}
                </p>
              )}

              <div className="pt-2" onClick={(e) => e.stopPropagation()}>
                <EnquireNowButton
                  cat={cat}
                  openModal={openModal}
                  className="h-11 px-5 text-sm w-auto inline-flex"
                />
              </div>
            </div>
          </div>

          {/* Desktop List View */}
          <div
            onClick={() => openPreview(cat)}
            className="hidden lg:flex group/card relative items-center gap-6 py-2 cursor-pointer"
          >
            <div className="relative w-28 h-24 rounded-xl overflow-hidden bg-[#161B22] border border-[#1F2937] shrink-0 group/img p-1">
              <BrandImage
                src={photoUrl}
                alt={photoAlt}
                fill
                surface="auto"
                logoSize="xs"
                className="object-contain transition-transform duration-300 group-hover/card:scale-105"
                sizes="112px"
              />
              <div className="absolute top-1.5 left-1.5 z-20 w-7 h-7 rounded-md bg-[#050608]/85 backdrop-blur-md border border-[#0B65B3]/30 text-[#8DC63F] flex items-center justify-center">
                <GroupIconMark group={cat.group} className="w-3.5 h-3.5" />
              </div>
              {isPlaceholder && (
                <span className="absolute bottom-1.5 right-1.5 z-20 px-1.5 py-0.5 text-[9px] font-medium text-white/70 bg-[#050608]/85 backdrop-blur-md rounded border border-white/10">
                  Sample image
                </span>
              )}
            </div>

            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex items-center gap-3 text-xs text-[#A9B4C0] font-medium">
                <span className="font-semibold text-[#8DC63F]">{cat.code}</span>
                {showGroupMeta && (
                  <>
                    <span>·</span>
                    <span className="truncate">{metaPath}</span>
                  </>
                )}
                <ArrowUpRight className="w-4.5 h-4.5 text-[#A9B4C0] group-hover/card:text-[#8DC63F] group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 transition-all duration-250" />
              </div>

              <h3 className="text-lg font-semibold text-white leading-snug">
                <span className="relative inline-block after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-gradient-to-r after:from-[#0B65B3] after:to-[#8DC63F] after:scale-x-0 group-hover/card:after:scale-x-100 group-focus-within/card:after:scale-x-100 focus-visible:after:scale-x-100 after:origin-left after:transition-transform after:duration-350">
                  <HighlightedText text={cat.title} query={searchQuery} />
                </span>
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

            <div className="shrink-0" onClick={(e) => e.stopPropagation()}>
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

  // Grid Card Layout
  return (
    <Reveal staggerIndex={staggerIndex} as="article" className="h-full">
      <div
        onMouseEnter={handlePrefetch}
        onClick={() => openPreview(cat)}
        className="relative group/card bg-[#0D1117] border border-[#1F2937] hover:border-[#8DC63F]/50 hover:bg-[#161B22]/50 rounded-[22px] p-5 sm:p-6 lg:p-6.5 flex flex-col h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#8DC63F]/5 active-press cursor-pointer"
      >
        <div className="relative w-full aspect-[16/10] min-h-[220px] sm:min-h-[260px] lg:min-h-[280px] rounded-2xl overflow-hidden bg-[#161B22] border border-[#1F2937] mb-5 group/img p-3 flex items-center justify-center">
          <BrandImage
            src={photoUrl}
            alt={photoAlt}
            fill
            surface="auto"
            logoSize="lg"
            className="object-contain p-3 transition-transform duration-700 group-hover/card:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            quality={90}
          />

          <div className="absolute top-3 left-3 z-20 flex items-center justify-between gap-2 pointer-events-none right-3">
            <div className="w-9 h-9 rounded-xl bg-[#050608]/90 backdrop-blur-md border border-[#0B65B3]/40 text-[#8DC63F] flex items-center justify-center shrink-0 shadow-lg">
              <GroupIconMark group={cat.group} className="w-4.5 h-4.5" />
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#050608]/90 backdrop-blur-md border border-white/15 shadow-lg">
              <span className="text-xs sm:text-[13px] font-bold text-[#8DC63F] tabular-nums tracking-wide">
                <HighlightedText text={cat.code} query={searchQuery} />
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#A9B4C0] group-hover/card:text-[#8DC63F] group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 transition-all duration-250" />
            </div>
          </div>

          {isPlaceholder && (
            <span className="absolute bottom-2.5 right-2.5 z-20 px-2 py-0.5 text-[10px] font-medium text-white/70 bg-[#050608]/85 backdrop-blur-md rounded border border-white/10 pointer-events-none">
              Sample image
            </span>
          )}
        </div>

        <div className="space-y-2.5 mb-5 flex-1">
          {showGroupMeta && (
            <span className="text-xs font-semibold text-[#8DC63F] uppercase tracking-wider block mb-1 truncate">
              {metaPath}
            </span>
          )}

          <h3 className="text-lg sm:text-xl font-bold text-white leading-snug [text-wrap:balance]">
            <span className="relative inline-block after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-gradient-to-r after:from-[#0B65B3] after:to-[#8DC63F] after:scale-x-0 group-hover/card:after:scale-x-100 group-focus-within/card:after:scale-x-100 focus-visible:after:scale-x-100 after:origin-left after:transition-transform after:duration-350">
              <HighlightedText text={cat.title} query={searchQuery} />
            </span>
          </h3>

          <p className="text-sm text-[#A9B4C0] line-clamp-2 sm:line-clamp-3 leading-relaxed">
            {cat.description}
          </p>

          {cat.productFamilies.length > 0 && (
            <p className="text-xs text-white/65 line-clamp-2 pt-1">
              <span>Includes: {cat.productFamilies.slice(0, 3).join(' · ')}</span>
              {cat.productFamilies.length > 3 && (
                <span className="text-[#A9B4C0] ml-1 font-medium">
                  +{cat.productFamilies.length - 3} more
                </span>
              )}
            </p>
          )}
        </div>

        <div className="pt-4 border-t border-[#1F2937] mt-auto" onClick={(e) => e.stopPropagation()}>
          <EnquireNowButton
            cat={cat}
            openModal={openModal}
            className="w-full h-12 text-[14px] font-bold"
          />
        </div>
      </div>
    </Reveal>
  );
}
