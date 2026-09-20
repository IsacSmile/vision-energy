import React from 'react';

export default function ServiceDetailLoading() {
  return (
    <div className="w-full bg-[#050608] min-h-screen text-white pt-[calc(var(--header-offset,0px)+40px)] animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 py-12">
        <div className="h-4 w-48 bg-white/10 rounded" />
        <div className="h-12 w-3/4 max-w-2xl bg-white/10 rounded-lg" />
        <div className="h-6 w-1/2 max-w-lg bg-white/10 rounded" />
        <div className="flex gap-4">
          <div className="h-12 w-40 bg-white/10 rounded-full" />
          <div className="h-12 w-36 bg-white/10 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-12">
          <div className="lg:col-span-8 space-y-12">
            <div className="h-32 bg-white/5 rounded-xl" />
            <div className="h-64 bg-white/5 rounded-xl" />
          </div>
          <div className="hidden lg:block lg:col-span-4 h-96 bg-white/5 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
