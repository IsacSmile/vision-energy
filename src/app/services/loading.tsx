import React from 'react';

export default function ServicesLoading() {
  return (
    <div className="w-full bg-[#050608] min-h-screen text-white pt-[calc(var(--header-offset,0px)+40px)] animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 py-12">
        <div className="h-4 w-32 bg-white/10 rounded" />
        <div className="h-12 w-3/4 max-w-xl bg-white/10 rounded-lg" />
        <div className="h-6 w-1/2 max-w-md bg-white/10 rounded" />

        <div className="space-y-8 pt-12">
          {[1, 2].map((i) => (
            <div key={i} className="h-48 bg-white/5 rounded-2xl border border-white/10 p-8" />
          ))}
        </div>
      </div>
    </div>
  );
}
