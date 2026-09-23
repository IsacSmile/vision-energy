"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Search,
  Filter,
  Plus,
  Edit,
  Archive,
  RotateCcw,
  Package,
  ImageOff,
  CheckSquare,
  Square,
  Layers,
} from "lucide-react";
import { PRODUCT_CATEGORIES } from "@/lib/schemas/product";

import { getCategoryPlaceholder } from "@/lib/utils/placeholders";

interface ProductListItem {
  id: string;
  code: string;
  title: string;
  description: string;
  category: string;
  subcategoryGroup: string;
  status: "PUBLISHED" | "ARCHIVED";
  updatedAt: string;
  imageUrl: string | null;
  imageAlt: string | null;
  isPlaceholder: boolean;
}

interface ProductListTableProps {
  initialItems: ProductListItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  categories: string[];
  subcategories: string[];
}

export function ProductListTable({
  initialItems,
  pagination,
  categories,
  subcategories,
}: ProductListTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [bulkCategory, setBulkCategory] = useState<string>("");

  const currentSearch = searchParams.get("search") || "";
  const currentStatus = searchParams.get("status") || "";
  const currentCategory = searchParams.get("category") || "";
  const currentSubcategory = searchParams.get("subcategoryGroup") || "";

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set("page", "1");
    startTransition(() => {
      router.push(`/admin/products?${params.toString()}`);
    });
  };

  const handleSelectAll = () => {
    if (selectedIds.length === initialItems.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(initialItems.map((item) => item.id));
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleBulkAction = async (action: string) => {
    if (selectedIds.length === 0) return;

    const res = await fetch("/api/admin/products", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action,
        ids: selectedIds,
        newCategory: action === "bulk_reassign_category" ? bulkCategory : undefined,
      }),
    });

    if (res.ok) {
      setSelectedIds([]);
      setBulkCategory("");
      router.refresh();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & New Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Product Catalogue</h1>
          <p className="text-sm text-slate-400">
            Total {pagination.total} products ({initialItems.filter((i) => i.status === "PUBLISHED").length} active on page)
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-bold text-slate-950 hover:bg-emerald-400 transition shadow-lg shadow-emerald-500/10 w-fit"
        >
          <Plus className="h-4 w-4" />
          <span>New Product</span>
        </Link>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
        {/* Search */}
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
          <input
            type="text"
            defaultValue={currentSearch}
            onChange={(e) => updateFilters("search", e.target.value)}
            placeholder="Search SKU code, title..."
            className="w-full rounded-xl border border-slate-800 bg-slate-950 pl-10 pr-4 py-2 text-xs text-slate-100 placeholder-slate-600 focus:border-emerald-500 focus:outline-none"
          />
        </div>

        {/* Status Filter */}
        <select
          value={currentStatus}
          onChange={(e) => updateFilters("status", e.target.value)}
          className="rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-slate-200 focus:border-emerald-500 focus:outline-none"
        >
          <option value="">All Statuses</option>
          <option value="PUBLISHED">Published Only</option>
          <option value="ARCHIVED">Archived Only</option>
        </select>

        {/* Category Filter */}
        <select
          value={currentCategory}
          onChange={(e) => updateFilters("category", e.target.value)}
          className="rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-slate-200 focus:border-emerald-500 focus:outline-none"
        >
          <option value="">All Categories</option>
          {PRODUCT_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Subcategory Filter */}
        {subcategories.length > 0 && (
          <select
            value={currentSubcategory}
            onChange={(e) => updateFilters("subcategoryGroup", e.target.value)}
            className="rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-slate-200 focus:border-emerald-500 focus:outline-none max-w-[180px] truncate"
          >
            <option value="">All Subcategories</option>
            {subcategories.map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Bulk Action Controls */}
      {selectedIds.length > 0 && (
        <div className="flex flex-wrap items-center gap-3 rounded-xl border border-emerald-500/40 bg-emerald-950/20 p-3 text-xs">
          <span className="font-semibold text-emerald-400">
            {selectedIds.length} item(s) selected
          </span>

          <button
            onClick={() => handleBulkAction("bulk_archive")}
            className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 font-medium text-amber-400 hover:bg-slate-800"
          >
            <Archive className="h-3.5 w-3.5" />
            <span>Bulk Archive</span>
          </button>

          <button
            onClick={() => handleBulkAction("bulk_restore")}
            className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 font-medium text-emerald-400 hover:bg-slate-800"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Bulk Restore</span>
          </button>

          <div className="flex items-center gap-2">
            <select
              value={bulkCategory}
              onChange={(e) => setBulkCategory(e.target.value)}
              className="rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-1 text-xs text-slate-200"
            >
              <option value="">Choose category...</option>
              {PRODUCT_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <button
              onClick={() => handleBulkAction("bulk_reassign_category")}
              disabled={!bulkCategory}
              className="rounded-lg bg-slate-800 px-3 py-1.5 font-medium text-slate-200 hover:bg-slate-700 disabled:opacity-40"
            >
              Reassign Category
            </button>
          </div>
        </div>
      )}

      {/* Table List View */}
      {initialItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/40 p-12 text-center">
          <Package className="h-12 w-12 text-slate-600 mb-3" />
          <h3 className="text-base font-bold text-white">No products found</h3>
          <p className="mt-1 text-xs text-slate-400">
            No products match the selected filters or search query.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-800 bg-slate-950/80 uppercase tracking-wider text-slate-400 font-semibold">
              <tr>
                <th className="p-3.5 w-10">
                  <button onClick={handleSelectAll} className="text-slate-400 hover:text-white">
                    {selectedIds.length === initialItems.length ? (
                      <CheckSquare className="h-4 w-4 text-emerald-400" />
                    ) : (
                      <Square className="h-4 w-4" />
                    )}
                  </button>
                </th>
                <th className="p-3.5">Thumbnail</th>
                <th className="p-3.5">Code</th>
                <th className="p-3.5">Title</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Image Source</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Updated</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {initialItems.map((product) => {
                const fallback = getCategoryPlaceholder(product.category, product.subcategoryGroup, product.title);
                const imageUrl = product.imageUrl || fallback.imageUrl;
                const imageAlt = product.imageAlt || fallback.imageAlt;
                const isPlaceholder = product.isPlaceholder ?? fallback.isPlaceholder;
                const isSelected = selectedIds.includes(product.id);

                return (
                  <tr
                    key={product.id}
                    className={`transition hover:bg-slate-800/40 ${
                      isSelected ? "bg-emerald-950/20" : ""
                    }`}
                  >
                    <td className="p-3.5">
                      <button
                        onClick={() => handleToggleSelect(product.id)}
                        className="text-slate-400 hover:text-white"
                      >
                        {isSelected ? (
                          <CheckSquare className="h-4 w-4 text-emerald-400" />
                        ) : (
                          <Square className="h-4 w-4" />
                        )}
                      </button>
                    </td>

                    {/* Thumbnail */}
                    <td className="p-3.5">
                      <div className="relative h-10 w-12 overflow-hidden rounded-lg bg-slate-950 border border-slate-800">
                        <Image
                          src={imageUrl}
                          alt={imageAlt}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                    </td>

                    {/* Code */}
                    <td className="p-3.5 font-mono font-bold text-emerald-400">
                      {product.code}
                    </td>

                    {/* Title */}
                    <td className="p-3.5 font-semibold text-slate-100 max-w-[200px] truncate">
                      {product.title}
                    </td>

                    {/* Category */}
                    <td className="p-3.5">
                      <div className="flex flex-col">
                        <span className="font-medium text-slate-200">{product.category}</span>
                        <span className="text-[10px] text-slate-400 truncate max-w-[120px]">
                          {product.subcategoryGroup}
                        </span>
                      </div>
                    </td>

                    {/* Image Source */}
                    <td className="p-3.5">
                      <span
                        className={`inline-block rounded px-2 py-0.5 text-[10px] font-semibold ${
                          isPlaceholder
                            ? "bg-slate-800 text-slate-400 border border-slate-700"
                            : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                        }`}
                      >
                        {isPlaceholder ? "Sample Image" : "Uploaded Photo"}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="p-3.5">
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                          product.status === "PUBLISHED"
                            ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                            : "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                        }`}
                      >
                        {product.status}
                      </span>
                    </td>

                    {/* Updated At */}
                    <td className="p-3.5 text-slate-400 text-[11px]">
                      {new Date(product.updatedAt).toLocaleDateString()}
                    </td>

                    {/* Actions */}
                    <td className="p-3.5 text-right">
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1 text-[11px] font-semibold text-slate-200 hover:bg-slate-700 transition"
                      >
                        <Edit className="h-3.5 w-3.5" />
                        <span>Edit</span>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Controls */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-slate-800 pt-4 text-xs text-slate-400">
          <span>
            Page {pagination.page} of {pagination.totalPages}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => updateFilters("page", String(pagination.page - 1))}
              disabled={pagination.page <= 1}
              className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-slate-200 hover:bg-slate-800 disabled:opacity-40"
            >
              Previous
            </button>
            <button
              onClick={() => updateFilters("page", String(pagination.page + 1))}
              disabled={pagination.page >= pagination.totalPages}
              className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-slate-200 hover:bg-slate-800 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
