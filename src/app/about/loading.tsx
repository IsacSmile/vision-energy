import React from 'react';

export default function AboutLoading() {
  return (
    <div className="min-h-screen bg-[#050608] text-white animate-pulse">
      {/* Skeleton Header Area */}
      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 space-y-6">
        {/* Breadcrumb Skeleton */}
        <div className="w-32 h-4 bg-white/10 rounded-full" />

        {/* Eyebrow Skeleton */}
        <div className="w-24 h-4 bg-[#8DC63F]/20 rounded-full" />

        {/* H1 Skeleton */}
        <div className="w-3/4 max-w-2xl h-12 lg:h-16 bg-white/10 rounded-xl" />

        {/* Lead Paragraph Skeleton */}
        <div className="space-y-3 max-w-2xl pt-2">
          <div className="w-full h-4 bg-white/10 rounded" />
          <div className="w-5/6 h-4 bg-white/10 rounded" />
          <div className="w-2/3 h-4 bg-white/10 rounded" />
        </div>

        {/* Tagline Skeleton */}
        <div className="w-1/2 max-w-lg h-5 bg-[#8DC63F]/15 rounded-full" />

        {/* Buttons Skeleton */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <div className="w-full sm:w-44 h-12 bg-white/10 rounded-full" />
          <div className="w-full sm:w-44 h-12 bg-white/10 rounded-full" />
        </div>

        {/* Facts Strip Skeleton */}
        <div className="pt-12 mt-12 border-t border-[#1F2937] grid grid-cols-2 md:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-2">
              <div className="w-24 h-10 bg-white/10 rounded-lg" />
              <div className="w-32 h-3 bg-white/10 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
