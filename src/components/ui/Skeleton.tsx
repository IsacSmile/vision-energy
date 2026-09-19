import React from 'react';

interface SkeletonProps {
  className?: string;
}

export default function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div className={`skeleton-shimmer rounded-xl ${className}`} aria-hidden="true" />
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-[#0D1117] border border-[#1F2937] p-5 sm:p-6 rounded-2xl space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="w-20 h-6 rounded-full" />
        <Skeleton className="w-16 h-5 rounded-full" />
      </div>
      <Skeleton className="w-3/4 h-6" />
      <Skeleton className="w-full h-12" />
      <div className="pt-4 border-t border-[#1F2937] flex gap-3">
        <Skeleton className="w-1/2 h-11 rounded-xl" />
        <Skeleton className="w-1/2 h-11 rounded-xl" />
      </div>
    </div>
  );
}
