"use client";

import Image from "next/image";
import { Package } from "lucide-react";
import type { ProductItem } from "@/lib/data/product-items";
import { getCategoryPlaceholder } from "@/lib/utils/placeholders";

interface ProductItemCardProps {
  product: ProductItem;
  view?: "grid" | "list";
}

export function ProductItemCard({ product, view = "grid" }: ProductItemCardProps) {
  // Resolve image URL, alt text, and placeholder flag
  const fallback = getCategoryPlaceholder(product.category, product.subcategoryGroup, product.title);
  const imageUrl = product.imageUrl || fallback.imageUrl;
  const imageAlt = product.imageAlt || fallback.imageAlt || product.title;
  const isPlaceholder = product.isPlaceholder ?? fallback.isPlaceholder;

  if (view === "list") {
    return (
      <div className="group relative flex flex-col sm:flex-row items-center overflow-hidden rounded-xl border border-slate-800 bg-slate-900/80 transition-all duration-300 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10 p-3 sm:p-4 gap-4">
        {/* Fixed size thumbnail for list view */}
        <div className="relative aspect-[4/3] w-full sm:w-36 shrink-0 overflow-hidden rounded-lg bg-slate-950 border border-slate-800">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            sizes="144px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Top-left Code Badge */}
          <div className="absolute top-1.5 left-1.5 z-10 flex items-center gap-1 rounded bg-slate-950/90 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-slate-800">
            <Package className="h-3 w-3" />
            <span>{product.code}</span>
          </div>

          {/* Bottom-right Sample Image Badge */}
          {isPlaceholder && (
            <div className="absolute bottom-1.5 right-1.5 z-10 rounded bg-slate-950/85 px-1.5 py-0.5 text-[9px] font-medium text-slate-300 border border-slate-800 backdrop-blur-sm">
              Sample image
            </div>
          )}
        </div>

        {/* Content stacked/inline */}
        <div className="flex flex-1 flex-col justify-between space-y-2 w-full">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-400 border border-slate-700">
                {product.category}
              </span>
              <span className="text-xs text-slate-400 truncate">
                {product.subcategoryGroup}
              </span>
            </div>
          </div>

          <h3 className="text-base font-bold text-white transition-colors group-hover:text-emerald-400">
            {product.title}
          </h3>

          <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {product.includes && product.includes.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-1">
              {product.includes.slice(0, 4).map((inc, i) => (
                <span
                  key={i}
                  className="rounded bg-slate-800/60 px-2 py-0.5 text-[10px] text-slate-300 border border-slate-700/50"
                >
                  {inc}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Grid view (Default)
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-800 bg-slate-900/80 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10">
      {/* Aspect ratio image container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Top-left Code Badge Overlay */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 rounded-md bg-slate-950/90 px-2.5 py-1 text-xs font-bold text-emerald-400 backdrop-blur-md border border-slate-800">
          <Package className="h-3.5 w-3.5" />
          <span>{product.code}</span>
        </div>

        {/* Bottom-right Sample Image Badge */}
        {isPlaceholder && (
          <div className="absolute bottom-3 right-3 z-10 rounded-md bg-slate-950/85 px-2 py-0.5 text-[10px] font-medium text-slate-300 border border-slate-800 backdrop-blur-sm">
            Sample image
          </div>
        )}
      </div>

      {/* Card Details */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="inline-block rounded-full bg-slate-800 px-2.5 py-0.5 text-xs font-semibold text-emerald-400 border border-slate-700">
            {product.category}
          </span>
          <span className="text-xs text-slate-400 truncate max-w-[150px]">
            {product.subcategoryGroup}
          </span>
        </div>

        <h3 className="mb-2 text-lg font-bold text-white transition-colors group-hover:text-emerald-400">
          {product.title}
        </h3>

        <p className="mb-4 text-sm text-slate-300 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Included Items Badges */}
        {product.includes && product.includes.length > 0 && (
          <div className="mt-auto pt-3 border-t border-slate-800/80">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
              Includes / Key Specs
            </span>
            <div className="flex flex-wrap gap-1.5">
              {product.includes.slice(0, 4).map((inc, i) => (
                <span
                  key={i}
                  className="rounded bg-slate-800/60 px-2 py-0.5 text-[11px] text-slate-300 border border-slate-700/50"
                >
                  {inc}
                </span>
              ))}
              {product.includes.length > 4 && (
                <span className="rounded bg-slate-800/60 px-2 py-0.5 text-[11px] text-slate-400">
                  +{product.includes.length - 4} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Skeleton Loader matching aspect ratio container
 */
export function ProductItemCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 animate-pulse">
      <div className="aspect-[4/3] w-full bg-slate-800" />
      <div className="p-5 flex flex-col gap-3">
        <div className="h-4 w-24 bg-slate-800 rounded" />
        <div className="h-6 w-3/4 bg-slate-800 rounded" />
        <div className="h-4 w-full bg-slate-800 rounded" />
        <div className="h-4 w-2/3 bg-slate-800 rounded" />
      </div>
    </div>
  );
}
