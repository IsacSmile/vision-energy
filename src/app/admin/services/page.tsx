"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Wrench,
  Plus,
  Search,
  ExternalLink,
  Edit,
  Copy,
  Trash2,
  Loader2,
} from "lucide-react";
import { showToast } from "@/components/admin/Toast";

export const dynamic = "force-dynamic";

function AdminServicesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "";
  const sortBy = searchParams.get("sortBy") || "sortOrder";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const [pagination, setPagination] = useState({ total: 0, totalPages: 1 });

  const fetchServices = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        search,
        status,
        sortBy,
        page: page.toString(),
        limit: "25",
      });
      const res = await fetch(`/api/admin/services?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setItems(data.items || []);
        setPagination(data.pagination || { total: 0, totalPages: 1 });
      }
    } catch (err) {
      showToast("Failed to fetch services", "error");
    } finally {
      setLoading(false);
    }
  }, [search, status, sortBy, page]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    params.set("page", "1");
    router.push(`/admin/services?${params.toString()}`);
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
    if (!confirm(`Are you sure you want to run this bulk action on ${selectedIds.length} services?`)) return;

    try {
      const res = await fetch("/api/admin/services", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, ids: selectedIds }),
      });
      if (res.ok) {
        showToast("Bulk operation complete", "success");
        setSelectedIds([]);
        fetchServices();
      }
    } catch (err) {
      showToast("Bulk operation failed", "error");
    }
  };

  const handleTrash = async (item: any) => {
    if (!confirm(`Move service "${item.title}" to trash? It will no longer be public.`)) return;
    try {
      const res = await fetch(`/api/admin/services/${item.id}`, { method: "DELETE" });
      if (res.ok) {
        showToast("Service moved to trash", "success");
        fetchServices();
      }
    } catch (err) {
      showToast("Failed to trash service", "error");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1F2937] pb-5">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Wrench className="w-6 h-6 text-[#A3E635]" />
            <span>Service Scopes</span>
          </h1>
          <p className="text-xs text-[#A9B4C0] mt-1">
            Manage client engineering services, technical scopes, process confirmation steps and FAQs.
          </p>
        </div>

        <Link
          href="/admin/services/new"
          className="px-4 py-2 bg-[#A3E635] text-[#050608] font-bold text-xs rounded-xl hover:opacity-90 flex items-center gap-2 transition-opacity shadow-lg min-h-[44px] self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Service</span>
        </Link>
      </div>

      {/* Toolbar Filters */}
      <div className="flex flex-wrap items-center gap-3 p-4 bg-[#0D1117] border border-[#1F2937] rounded-xl">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
          <input
            type="text"
            defaultValue={search}
            onChange={(e) => updateParam("search", e.target.value)}
            placeholder="Search service title or slug..."
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
          value={sortBy}
          onChange={(e) => updateParam("sortBy", e.target.value)}
          className="bg-[#050608] border border-[#1F2937] text-white text-xs rounded-xl px-3 py-2 min-h-[44px]"
        >
          <option value="sortOrder">Sort: Order</option>
          <option value="title">Sort: Title</option>
          <option value="updatedAt">Sort: Updated</option>
        </select>
      </div>

      {/* Bulk Action Bar */}
      {selectedIds.length > 0 && (
        <div className="sticky top-16 z-30 p-3 bg-[#A3E635] text-[#050608] rounded-xl flex items-center justify-between shadow-2xl font-semibold text-xs">
          <span>{selectedIds.length} services selected</span>
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

      {/* Services Table */}
      <div className="bg-[#0D1117] border border-[#1F2937] rounded-xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="flex flex-col items-center justify-center p-12 gap-3">
            <Loader2 className="w-6 h-6 text-[#A3E635] animate-spin" />
            <p className="text-xs text-gray-400 font-mono">Loading service scopes...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <p className="text-base font-bold text-white">No service scopes found.</p>
            <Link
              href="/admin/services/new"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#A3E635] text-[#050608] font-bold text-xs rounded-xl min-h-[44px]"
            >
              <Plus className="w-4 h-4" />
              <span>New Service Scope</span>
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
                  <th scope="col" className="p-4">Summary</th>
                  <th scope="col" className="p-4">Status</th>
                  <th scope="col" className="p-4">Updated</th>
                  <th scope="col" className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1F2937] text-xs">
                {items.map((item) => (
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
                      <Link href={`/admin/services/${item.id}/edit`} className="font-semibold text-white hover:text-[#A3E635] block">
                        {item.title}
                      </Link>
                      <span className="text-[11px] font-mono text-gray-500">{item.slug}</span>
                    </td>
                    <td className="p-4 text-gray-300 max-w-sm truncate">{item.summary}</td>
                    <td className="p-4 whitespace-nowrap">
                      <span
                        className={`px-2.5 py-1 text-[10px] font-mono font-bold rounded-full border ${
                          item.status === "PUBLISHED"
                            ? "bg-[#A3E635]/10 text-[#A3E635] border-[#A3E635]/30"
                            : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4 font-mono text-gray-400 whitespace-nowrap">
                      {new Date(item.updatedAt).toLocaleDateString("en-GB")}
                    </td>
                    <td className="p-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">
                        {item.status === "PUBLISHED" && (
                          <a
                            href={`/services/${item.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5"
                            title="View on site"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                        <Link
                          href={`/admin/services/${item.id}/edit`}
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
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminServicesPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center p-12"><Loader2 className="w-6 h-6 text-[#A3E635] animate-spin" /></div>}>
      <AdminServicesContent />
    </Suspense>
  );
}
