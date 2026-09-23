"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, ArrowLeft } from "lucide-react";

export default function AdminProductsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Admin Product Route Error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center p-6 text-center">
      <div className="rounded-full bg-rose-500/10 p-4 text-rose-400 mb-4 border border-rose-500/20">
        <AlertTriangle className="h-10 w-10" />
      </div>
      <h2 className="text-xl font-bold text-white mb-2">
        An error occurred in Admin Products
      </h2>
      <p className="text-xs text-slate-400 max-w-md mb-6">
        {error.message || "An unexpected error occurred while processing the product data."}
      </p>

      <div className="flex items-center gap-3">
        <button
          onClick={() => reset()}
          className="flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Try Again</span>
        </button>

        <Link
          href="/admin/products"
          className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-800 transition"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to List</span>
        </Link>
      </div>
    </div>
  );
}
