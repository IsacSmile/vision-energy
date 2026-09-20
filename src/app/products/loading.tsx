import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#050608] text-white">
      {/* Header Skeleton */}
      <div className="bg-[#050608] border-b border-[#1F2937]/80">
        <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 pt-[calc(var(--header-offset,80px)+32px)] lg:pt-[calc(var(--header-offset,80px)+48px)] pb-8 space-y-4">
          <div className="h-4 w-32 rounded bg-white/10 skeleton-shimmer" />
          <div className="h-10 lg:h-14 w-3/4 max-w-lg rounded-xl bg-white/10 skeleton-shimmer" />
          <div className="h-5 w-full max-w-xl rounded-lg bg-white/10 skeleton-shimmer" />
          <div className="h-4 w-44 rounded bg-white/10 skeleton-shimmer" />
        </div>
      </div>

      {/* Sticky Toolbar Skeleton */}
      <div
        className="sticky z-30 w-full bg-[#050608]/85 backdrop-blur-[12px] border-b border-[#1F2937]"
        style={{ top: 'var(--header-offset, 0px)' }}
      >
        <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="h-11 w-full max-w-[480px] rounded-full bg-white/10 skeleton-shimmer" />
          <div className="hidden lg:flex items-center gap-6">
            <div className="h-4 w-28 rounded bg-white/10 skeleton-shimmer" />
            <div className="h-10 w-36 rounded-full bg-white/10 skeleton-shimmer" />
            <div className="h-10 w-24 rounded-full bg-white/10 skeleton-shimmer" />
          </div>
        </div>
      </div>

      {/* Main Grid Skeleton */}
      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-12 2xl:gap-16 items-start">
          {/* Sidebar Skeleton */}
          <aside className="hidden lg:block space-y-3">
            <div className="h-4 w-20 rounded bg-white/10 skeleton-shimmer" />
            <div className="space-y-1 pt-2">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="h-12 w-full rounded-r-lg bg-white/5 skeleton-shimmer" />
              ))}
            </div>
          </aside>

          {/* Cards Grid Skeleton (8 Cards) */}
          <main className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-[#0D1117] border border-[#1F2937] rounded-[20px] p-6 space-y-4 h-[320px] flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-lg bg-white/10 skeleton-shimmer" />
                    <div className="w-16 h-4 rounded bg-white/10 skeleton-shimmer" />
                  </div>
                  <div className="h-6 w-4/5 rounded bg-white/10 skeleton-shimmer" />
                  <div className="h-4 w-full rounded bg-white/10 skeleton-shimmer" />
                  <div className="h-4 w-2/3 rounded bg-white/10 skeleton-shimmer" />
                </div>
                <div className="pt-4 border-t border-[#1F2937] flex items-center justify-between">
                  <div className="h-4 w-24 rounded bg-white/10 skeleton-shimmer" />
                  <div className="h-11 w-24 rounded-full bg-white/10 skeleton-shimmer" />
                </div>
              </div>
            ))}
          </main>
        </div>
      </div>
    </div>
  );
}
