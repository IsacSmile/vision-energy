'use client';

import React from 'react';
import { BrandLogoPlaceholder } from '@/components/ui/BrandImage';

interface BrandLoadingScreenProps {
  /** Screen-reader status announcement. */
  label?: string;
}

/**
 * Full-viewport branded loading fallback displaying the Vision Energy International logo
 * while route server data streams in.
 */
export default function BrandLoadingScreen({
  label = 'Loading Vision Energy content...',
}: BrandLoadingScreenProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={label}
      className="min-h-[calc(100svh-80px)] w-full pt-[calc(var(--header-offset,80px)+16px)] flex items-center justify-center px-6 bg-white dark:bg-[#05080F]"
    >
      <div className="relative w-full max-w-sm rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-[0_20px_50px_rgba(15,23,42,0.08)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.65)] overflow-hidden p-10 sm:p-12 flex flex-col items-center justify-center bg-slate-50 dark:bg-[#0B1220]">
        <BrandLogoPlaceholder surface="auto" logoSize="lg" className="w-full" />
        <span className="sr-only">{label}</span>
      </div>
    </div>
  );
}
