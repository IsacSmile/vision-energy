"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  FileText,
  Plus,
  Search,
  ExternalLink,
  Edit,
  Trash2,
  Loader2,
  Clock,
} from "lucide-react";
import { showToast } from "@/components/admin/Toast";

export const dynamic = "force-dynamic";

function AdminBlogContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [items, setItems] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "";
  const category = searchParams.get("category") || "";
  const sortBy = searchParams.get("sortBy") || "updatedAt";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const [pagination, setPagination] = useState({ total: 0, totalPages: 1 });

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        search,
        status,
        category,
        sortBy,
        page: page.toString(),
        limit: "25",
      });
      const res = await fetch(`/api/admin/blog?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setItems(data.items || []);
        setPagination(data.pagination || { total: 0, totalPages: 1 });
        if (data.categories) setCategories(data.categories);
      }
    } catch (err) {
      showToast("Failed to fetch blog posts", "error");
    } finally {
      setLoading(false);
    }
  }, [search, status, category, sortBy, page]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    params.set("page", "1");
    router.push(`/admin/blog?${params.toString()}`);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) setSelectedIds(items.map((i) => i.id));
    else setSelectedIds([]);
  };

  const handleSelectOne = (id: string, checked: boolean) => {
    if (checked) setSelectedIds((prev) => (checked ? [...prev, id] : prev.filter((i) => i !== id)));
  };

  const handleBulkAction = async (action: "bulk_publish" | "bulk_unpublish" | "bulk_trash") => {
    if (selectedIds.length === 0) return;
    if (!confirm(`Are you sure you want to run this bulk action on ${selectedIds.length} posts?`)) return;

    try {
      const res = await fetch("/api/admin/blog", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, ids: selectedIds }),
      });
      if (res.ok) {
        showToast("Bulk operation complete", "success");
        setSelectedIds([]);
        fetchPosts();
      }
    } catch (err) {
      showToast("Bulk operation failed", "error");
    }
  };

  const handleTrash = async (item: any) => {
    if (!confirm(`Move blog post "${item.title}" to trash?`)) return;
    try {
      const res = await fetch(`/api/admin/blog/${item.id}`, { method: "DELETE" });
      if (res.ok) {
        showToast("Article moved to trash", "success");
        fetchPosts();
      }
    } catch (err) {
      showToast("Failed to trash article", "error");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1F2937] pb-5">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <FileText className="w-6 h-6 text-[#A3E635]" />
            <span>Blog & Technical Articles</span>
          </h1>
          <p className="text-xs text-[#A9B4C0] mt-1">
            Create, edit, publish and schedule technical articles and engineering insight posts.
          </p>
        </div>

        <Link
          href="/admin/blog/new"
          className="px-4 py-2 bg-[#A3E635] text-[#050608] font-bold text-xs rounded-xl hover:opacity-90 flex items-center gap-2 transition-opacity shadow-lg min-h-[44px] self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Article</span>
        </Link>
      </div>

      {/* Filters Toolbar */}
      <div className="flex flex-wrap items-center gap-3 p-4 bg-[#0D1117] border border-[#1F2937] rounded-xl">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
          <input
            type="text"
            defaultValue={search}
            onChange={(e) => updateParam("search", e.target.value)}
            placeholder="Search article title or content..."
            className="w-full bg-[#050608] border border-[#1F2937] text-white text-xs rounded-xl pl-9 pr-3 py-2.5 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-[#A3E635]"
          />
        </div>

        <select
          value={status}
          onChange={(e) => updateParam("status", e.target.value)}
          className="bg-[#050608] border border-[#1F2937] text-white text-xs rounded-xl px-3 py-2 min-h-[44px]"
        >
          <option value="">All Statuses</option>
          <option value="PUBLISHED">Published</option>
          <option value="DRAFT">Draft</option>
        </select>

        <select
          value={category}
          onChange={(e) => updateParam("category", e.target.value)}
          className="bg-[#050608] border border-[#1F2937] text-white text-xs rounded-xl px-3 py-2 min-h-[44px]"
        >
          <option value="">All Categories</option>
          {categories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => updateParam("sortBy", e.target.value)}
          className="bg-[#050608] border border-[#1F2937] text-white text-xs rounded-xl px-3 py-2 min-h-[44px]"
        >
          <option value="updatedAt">Sort: Updated</option>
          <option value="publishedAt">Sort: Published Date</option>
          <option value="title">Sort: Title</option>
        </select>
      </div>

      {/* Bulk Action Bar */}
      {selectedIds.length > 0 && (
        <div className="sticky top-16 z-30 p-3 bg-[#A3E635] text-[#050608] rounded-xl flex items-center justify-between shadow-2xl font-semibold text-xs">
          <span>{selectedIds.length} articles selected</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleBulkAction("bulk_publish")}
              className="px-3 py-1.5 bg-[#050608] text-white rounded-lg hover:bg-black min-h-[44px]"
            >
              Publish Selected
            </button>
            <button
              onClick={() => handleBulkAction("bulk_unpublish")}
              className="px-3 py-1.5 bg-[#050608] text-white rounded-lg hover:bg-black min-h-[44px]"
            >
              Unpublish Selected
            </button>
            <button
              onClick={() => handleBulkAction("bulk_trash")}
              className="px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 min-h-[44px]"
            >
              Move to Trash
            </button>
          </div>
        </div>
      )}

      {/* Articles Table */}
      <div className="bg-[#0D1117] border border-[#1F2937] rounded-xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="flex flex-col items-center justify-center p-12 gap-3">
            <Loader2 className="w-6 h-6 text-[#A3E635] animate-spin" />
            <p className="text-xs text-gray-400 font-mono">Loading blog posts...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <p className="text-base font-bold text-white">No articles found.</p>
            <Link
              href="/admin/blog/new"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#A3E635] text-[#050608] font-bold text-xs rounded-xl min-h-[44px]"
            >
              <Plus className="w-4 h-4" />
              <span>Write New Article</span>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#050608] border-b border-[#1F2937] text-gray-400 text-[11px] font-semibold uppercase tracking-wider">
                  <th scope="col" className="p-4 w-10">
                    <input
                      type="checkbox"
                      checked={selectedIds.length === items.length}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="rounded border-gray-600 bg-gray-800 text-[#A3E635]"
                    />
                  </th>
                  <th scope="col" className="p-4">Title & Slug</th>
                  <th scope="col" className="p-4">Category</th>
                  <th scope="col" className="p-4">Status</th>
                  <th scope="col" className="p-4">Publish Date</th>
                  <th scope="col" className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1F2937] text-xs">
                {items.map((item) => {
                  const isScheduled = new Date(item.publishedAt).getTime() > Date.now();
                  return (
                    <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-4">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(item.id)}
                          onChange={(e) => handleSelectOne(item.id, e.target.checked)}
                          className="rounded border-gray-600 bg-gray-800 text-[#A3E635]"
                        />
                      </td>
                      <td className="p-4">
                        <Link href={`/admin/blog/${item.id}/edit`} className="font-semibold text-white hover:text-[#A3E635] block">
                          {item.title}
                        </Link>
                        <span className="text-[11px] font-mono text-gray-500">{item.slug}</span>
                      </td>
                      <td className="p-4 text-gray-300 font-medium whitespace-nowrap">{item.category}</td>
                      <td className="p-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`px-2.5 py-1 text-[10px] font-mono font-bold rounded-full border ${
                              item.status === "PUBLISHED"
                                ? "bg-[#A3E635]/10 text-[#A3E635] border-[#A3E635]/30"
                                : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                            }`}
                          >
                            {item.status}
                          </span>
                          {isScheduled && (
                            <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-blue-500/10 text-blue-400 border border-blue-500/30">
                              Scheduled
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-4 font-mono text-gray-400 whitespace-nowrap">
                        {new Date(item.publishedAt).toLocaleDateString("en-GB")}
                      </td>
                      <td className="p-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1">
                          {item.status === "PUBLISHED" && !isScheduled && (
                            <a
                              href={`/blog/${item.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5"
                              title="View on site"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                          <Link
                            href={`/admin/blog/${item.id}/edit`}
                            className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleTrash(item)}
                            className="p-2 text-red-400 hover:text-red-300 rounded-lg hover:bg-red-950/40"
                            title="Move to trash"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminBlogPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center p-12"><Loader2 className="w-6 h-6 text-[#A3E635] animate-spin" /></div>}>
      <AdminBlogContent />
    </Suspense>
  );
}
