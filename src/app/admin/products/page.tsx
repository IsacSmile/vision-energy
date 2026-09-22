"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Package,
  Plus,
  Search,
  Filter,
  ArrowUpDown,
  MoreVertical,
  ExternalLink,
  Edit,
  Copy,
  Trash2,
  CheckCircle,
  XCircle,
  Upload,
  Download,
  ListOrdered,
  MoveUp,
  MoveDown,
  Loader2,
  Check,
} from "lucide-react";
import { showToast } from "@/components/admin/Toast";

export const dynamic = "force-dynamic";

function AdminProductsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [items, setItems] = useState<any[]>([]);
  const [groups, setGroups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Filters from URL
  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "";
  const group = searchParams.get("group") || "";
  const sortBy = searchParams.get("sortBy") || "sortOrder";
  const order = searchParams.get("order") || "asc";
  const page = parseInt(searchParams.get("page") || "1", 10);

  const [pagination, setPagination] = useState({ page: 1, total: 0, totalPages: 1 });
  const [reorderMode, setReorderMode] = useState(false);
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [importJsonText, setImportJsonText] = useState("");
  const [importPreview, setImportPreview] = useState<any[] | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        search,
        status,
        group,
        sortBy,
        order,
        page: page.toString(),
        limit: "25",
      });
      const res = await fetch(`/api/admin/products?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setItems(data.items || []);
        setPagination(data.pagination || { total: 0, totalPages: 1 });
        if (data.groups) setGroups(data.groups);
      }
    } catch (err) {
      showToast("Failed to fetch products", "error");
    } finally {
      setLoading(false);
    }
  }, [search, status, group, sortBy, order, page]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    params.set("page", "1");
    router.push(`/admin/products?${params.toString()}`);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) setSelectedIds(items.map((i) => i.id));
    else setSelectedIds([]);
  };

  const handleSelectOne = (id: string, checked: boolean) => {
    if (checked) setSelectedIds((prev) => [...prev, id]);
    else setSelectedIds((prev) => prev.filter((item) => item !== id));
  };

  const handleBulkAction = async (action: "bulk_publish" | "bulk_unpublish" | "bulk_trash") => {
    if (selectedIds.length === 0) return;
    if (!confirm(`Are you sure you want to perform this action on ${selectedIds.length} items?`)) return;

    try {
      const res = await fetch("/api/admin/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, ids: selectedIds }),
      });
      if (res.ok) {
        showToast("Bulk operation successful", "success");
        setSelectedIds([]);
        fetchProducts();
      } else {
        const json = await res.json();
        showToast(json.error || "Bulk operation failed", "error");
      }
    } catch (err) {
      showToast("Failed to run bulk action", "error");
    }
  };

  const handleSinglePublishToggle = async (item: any) => {
    const newStatus = item.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
    try {
      const res = await fetch(`/api/admin/products/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...item,
          status: newStatus,
          updatedAt: item.updatedAt,
        }),
      });
      if (res.ok) {
        showToast(`Category ${item.code} is now ${newStatus}`, "success");
        fetchProducts();
      } else {
        const json = await res.json();
        showToast(json.error || "Update failed", "error");
      }
    } catch (err) {
      showToast("Update failed", "error");
    }
  };

  const handleDuplicate = async (item: any) => {
    const copyCode = `${item.code}-COPY`;
    const copySlug = `${item.slug}-copy`;
    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...item,
          code: copyCode,
          slug: copySlug,
          title: `${item.title} (Copy)`,
          status: "DRAFT",
        }),
      });
      if (res.ok) {
        showToast("Category duplicated as DRAFT", "success");
        fetchProducts();
      } else {
        const json = await res.json();
        showToast(json.error || "Duplicate failed", "error");
      }
    } catch (err) {
      showToast("Duplicate failed", "error");
    }
  };

  const handleTrash = async (item: any) => {
    if (!confirm(`Move "${item.title}" to trash? It will no longer be public.`)) return;
    try {
      const res = await fetch(`/api/admin/products/${item.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        showToast("Moved to trash", "success");
        fetchProducts();
      }
    } catch (err) {
      showToast("Failed to move item to trash", "error");
    }
  };

  const handleMoveOrder = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;
    const newItems = [...items];
    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;
    // update sortOrders
    newItems.forEach((it, idx) => {
      it.sortOrder = idx + 1;
    });
    setItems(newItems);
  };

  const saveReorder = async () => {
    try {
      const reorderPayload = items.map((it, idx) => ({ id: it.id, sortOrder: idx + 1 }));
      const res = await fetch("/api/admin/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reorder", items: reorderPayload }),
      });
      if (res.ok) {
        showToast("Sort order updated", "success");
        setReorderMode(false);
        fetchProducts();
      }
    } catch (err) {
      showToast("Failed to save reorder", "error");
    }
  };

  const handleExportJSON = () => {
    const exportData = items.map((it) => ({
      code: it.code,
      slug: it.slug,
      groupPrefix: it.group,
      title: it.title,
      description: it.description,
      families: Array.isArray(it.productFamilies) ? it.productFamilies.join("; ") : it.productFamilies,
      sortOrder: it.sortOrder,
    }));
    const jsonStr = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "product-categories.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleParseImportJson = () => {
    try {
      const parsed = JSON.parse(importJsonText);
      if (!Array.isArray(parsed)) {
        showToast("JSON must be an array of category objects", "error");
        return;
      }
      setImportPreview(parsed);
    } catch (err) {
      showToast("Invalid JSON syntax", "error");
    }
  };

  const handleConfirmImport = async () => {
    if (!importPreview) return;
    try {
      const res = await fetch("/api/admin/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "import_json", importCategories: importPreview }),
      });
      if (res.ok) {
        const json = await res.json();
        showToast(`Successfully imported ${json.count} categories`, "success");
        setImportModalOpen(false);
        setImportPreview(null);
        setImportJsonText("");
        fetchProducts();
      }
    } catch (err) {
      showToast("Failed to import JSON categories", "error");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1F2937] pb-5">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Package className="w-6 h-6 text-[#0B65B3]" />
            <span>Product Categories</span>
          </h1>
          <p className="text-xs text-[#A9B4C0] mt-1">
            Manage product categories, group prefixes, priority flags and catalog listings.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setReorderMode(!reorderMode)}
            className={`px-3 py-2 border rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors min-h-[44px] ${
              reorderMode ? "bg-[#A3E635]/10 text-[#A3E635] border-[#A3E635]/40" : "bg-[#0D1117] border-[#1F2937] text-gray-300"
            }`}
          >
            <ListOrdered className="w-4 h-4" />
            <span>{reorderMode ? "Done Reordering" : "Reorder"}</span>
          </button>
          <button
            onClick={handleExportJSON}
            className="px-3 py-2 bg-[#0D1117] border border-[#1F2937] text-gray-300 hover:text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors min-h-[44px]"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button
            onClick={() => setImportModalOpen(true)}
            className="px-3 py-2 bg-[#0D1117] border border-[#1F2937] text-gray-300 hover:text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors min-h-[44px]"
          >
            <Upload className="w-4 h-4" />
            <span>Import</span>
          </button>
          <Link
            href="/admin/products/new"
            className="px-4 py-2 bg-[#A3E635] text-[#050608] font-bold text-xs rounded-xl hover:opacity-90 flex items-center gap-2 transition-opacity shadow-lg min-h-[44px]"
          >
            <Plus className="w-4 h-4" />
            <span>New Product</span>
          </Link>
        </div>
      </div>

      {/* Toolbar Filters */}
      <div className="flex flex-wrap items-center gap-3 p-4 bg-[#0D1117] border border-[#1F2937] rounded-xl">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
          <input
            type="text"
            defaultValue={search}
            onChange={(e) => updateParam("search", e.target.value)}
            placeholder="Search title, code (LP-01), or slug..."
            className="w-full bg-[#050608] border border-[#1F2937] text-white text-xs rounded-xl pl-9 pr-3 py-2.5 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-[#A3E635]"
          />
        </div>

        {/* Status Filter */}
        <select
          value={status}
          onChange={(e) => updateParam("status", e.target.value)}
          className="bg-[#050608] border border-[#1F2937] text-white text-xs rounded-xl px-3 py-2 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-[#A3E635]"
        >
          <option value="">All Statuses</option>
          <option value="PUBLISHED">Published</option>
          <option value="DRAFT">Draft</option>
        </select>

        {/* Group Filter */}
        <select
          value={group}
          onChange={(e) => updateParam("group", e.target.value)}
          className="bg-[#050608] border border-[#1F2937] text-white text-xs rounded-xl px-3 py-2 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-[#A3E635]"
        >
          <option value="">All Groups</option>
          {groups.map((g) => (
            <option key={g.group} value={g.group}>
              {g.group} - {g.groupLabel}
            </option>
          ))}
        </select>

        {/* Sort Filter */}
        <select
          value={sortBy}
          onChange={(e) => updateParam("sortBy", e.target.value)}
          className="bg-[#050608] border border-[#1F2937] text-white text-xs rounded-xl px-3 py-2 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-[#A3E635]"
        >
          <option value="sortOrder">Sort: Order</option>
          <option value="title">Sort: Title</option>
          <option value="updatedAt">Sort: Updated</option>
        </select>
      </div>

      {/* Sticky Bulk Action Bar */}
      {selectedIds.length > 0 && (
        <div className="sticky top-16 z-30 p-3 bg-[#A3E635] text-[#050608] rounded-xl flex items-center justify-between shadow-2xl font-semibold text-xs">
          <span>{selectedIds.length} categories selected</span>
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

      {/* Products Table / Stacked Mobile List */}
      <div className="bg-[#0D1117] border border-[#1F2937] rounded-xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="flex flex-col items-center justify-center p-12 gap-3">
            <Loader2 className="w-6 h-6 text-[#A3E635] animate-spin" />
            <p className="text-xs text-gray-400 font-mono">Loading product categories...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <p className="text-base font-bold text-white">No product categories found.</p>
            <p className="text-xs text-gray-400 max-w-sm mx-auto">
              Create your first category or import categories from JSON.
            </p>
            <Link
              href="/admin/products/new"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#A3E635] text-[#050608] font-bold text-xs rounded-xl min-h-[44px]"
            >
              <Plus className="w-4 h-4" />
              <span>New Product Category</span>
            </Link>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
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
                    {reorderMode && <th scope="col" className="p-4 w-16">Move</th>}
                    <th scope="col" className="p-4">Code</th>
                    <th scope="col" className="p-4">Title & Slug</th>
                    <th scope="col" className="p-4">Group</th>
                    <th scope="col" className="p-4">Status</th>
                    <th scope="col" className="p-4">Updated</th>
                    <th scope="col" className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1F2937] text-xs">
                  {items.map((item, idx) => (
                    <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-4">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(item.id)}
                          onChange={(e) => handleSelectOne(item.id, e.target.checked)}
                          className="rounded border-gray-600 bg-gray-800 text-[#A3E635]"
                        />
                      </td>

                      {reorderMode && (
                        <td className="p-4">
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => handleMoveOrder(idx, "up")}
                              disabled={idx === 0}
                              className="p-1 hover:bg-white/10 rounded disabled:opacity-30"
                            >
                              <MoveUp className="w-3.5 h-3.5 text-gray-300" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleMoveOrder(idx, "down")}
                              disabled={idx === items.length - 1}
                              className="p-1 hover:bg-white/10 rounded disabled:opacity-30"
                            >
                              <MoveDown className="w-3.5 h-3.5 text-gray-300" />
                            </button>
                          </div>
                        </td>
                      )}

                      <td className="p-4 font-mono font-bold text-[#0B65B3] whitespace-nowrap">{item.code}</td>

                      <td className="p-4">
                        <Link href={`/admin/products/${item.id}/edit`} className="font-semibold text-white hover:text-[#A3E635] block">
                          {item.title}
                        </Link>
                        <span className="text-[11px] font-mono text-gray-500">{item.slug}</span>
                      </td>

                      <td className="p-4 font-mono text-gray-300 whitespace-nowrap">
                        {item.group} ({item.groupLabel})
                      </td>

                      <td className="p-4 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => handleSinglePublishToggle(item)}
                          className={`px-2.5 py-1 text-[10px] font-mono font-bold rounded-full border transition-all ${
                            item.status === "PUBLISHED"
                              ? "bg-[#A3E635]/10 text-[#A3E635] border-[#A3E635]/30 hover:bg-red-950/40 hover:text-red-300"
                              : "bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-[#A3E635]/20 hover:text-[#A3E635]"
                          }`}
                        >
                          {item.status}
                        </button>
                      </td>

                      <td className="p-4 font-mono text-gray-400 whitespace-nowrap">
                        {new Date(item.updatedAt).toLocaleDateString("en-GB")}
                      </td>

                      <td className="p-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1">
                          {item.status === "PUBLISHED" && (
                            <a
                              href={`/products/${item.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5"
                              title="View on site"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                          <Link
                            href={`/admin/products/${item.id}/edit`}
                            className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDuplicate(item)}
                            className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5"
                            title="Duplicate"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
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

            {/* Mobile Stacked Cards List */}
            <div className="md:hidden divide-y divide-[#1F2937]">
              {items.map((item) => (
                <div key={item.id} className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[11px] font-mono font-bold text-[#0B65B3] block">{item.code}</span>
                      <Link href={`/admin/products/${item.id}/edit`} className="font-bold text-sm text-white hover:text-[#A3E635]">
                        {item.title}
                      </Link>
                    </div>
                    <span
                      className={`px-2 py-0.5 text-[10px] font-mono font-bold rounded-md border shrink-0 ${
                        item.status === "PUBLISHED"
                          ? "bg-[#A3E635]/10 text-[#A3E635] border-[#A3E635]/30"
                          : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <p className="text-xs text-gray-400 line-clamp-2">{item.description}</p>

                  <div className="flex items-center justify-between text-xs text-gray-500 pt-1 border-t border-[#1F2937]">
                    <span>Group: {item.group}</span>
                    <div className="flex items-center gap-3">
                      <Link href={`/admin/products/${item.id}/edit`} className="text-[#A3E635] font-semibold min-h-[44px] flex items-center">
                        Edit
                      </Link>
                      <button onClick={() => handleTrash(item)} className="text-red-400 font-semibold min-h-[44px] flex items-center">
                        Trash
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Reorder Save Bar */}
        {reorderMode && (
          <div className="p-4 bg-[#050608] border-t border-[#1F2937] flex justify-end">
            <button
              onClick={saveReorder}
              className="px-5 py-2.5 bg-[#A3E635] text-[#050608] font-bold text-xs rounded-xl hover:opacity-90 min-h-[44px]"
            >
              Save Reordered Sort Order
            </button>
          </div>
        )}

        {/* Pagination Controls */}
        {pagination.totalPages > 1 && (
          <div className="p-4 bg-[#050608] border-t border-[#1F2937] flex items-center justify-between text-xs text-gray-400">
            <span>
              Page {pagination.page} of {pagination.totalPages} ({pagination.total} total)
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateParam("page", (page - 1).toString())}
                disabled={page <= 1}
                className="px-3 py-1.5 bg-[#0D1117] border border-[#1F2937] rounded-lg disabled:opacity-40 text-white font-semibold min-h-[44px]"
              >
                Previous
              </button>
              <button
                onClick={() => updateParam("page", (page + 1).toString())}
                disabled={page >= pagination.totalPages}
                className="px-3 py-1.5 bg-[#0D1117] border border-[#1F2937] rounded-lg disabled:opacity-40 text-white font-semibold min-h-[44px]"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* JSON Import Modal */}
      {importModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0D1117] border border-[#1F2937] p-6 rounded-2xl max-w-2xl w-full space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-white">Import Product Categories JSON</h3>
            <p className="text-xs text-gray-400">
              Paste array JSON matching data/product-categories.json. Import will upsert categories by code without deleting existing entries.
            </p>

            <textarea
              rows={8}
              value={importJsonText}
              onChange={(e) => setImportJsonText(e.target.value)}
              placeholder='[ { "code": "LP-01", "slug": "conventional-lightning...", "title": "..." } ]'
              className="w-full bg-[#050608] border border-[#1F2937] text-white text-xs font-mono rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#A3E635]"
            />

            {importPreview && (
              <div className="p-3 bg-[#050608] border border-[#1F2937] rounded-xl text-xs text-[#A3E635]">
                Parsed {importPreview.length} valid category objects ready for upsert.
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setImportModalOpen(false);
                  setImportPreview(null);
                }}
                className="px-4 py-2.5 bg-[#050608] border border-[#1F2937] text-gray-300 rounded-xl font-semibold text-xs min-h-[44px]"
              >
                Cancel
              </button>
              {importPreview ? (
                <button
                  type="button"
                  onClick={handleConfirmImport}
                  className="px-5 py-2.5 bg-[#A3E635] text-[#050608] font-bold text-xs rounded-xl hover:opacity-90 min-h-[44px]"
                >
                  Confirm & Upsert {importPreview.length} Items
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleParseImportJson}
                  className="px-5 py-2.5 bg-[#0B65B3] text-white font-bold text-xs rounded-xl hover:opacity-90 min-h-[44px]"
                >
                  Validate JSON
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminProductsPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center p-12"><Loader2 className="w-6 h-6 text-[#A3E635] animate-spin" /></div>}>
      <AdminProductsContent />
    </Suspense>
  );
}
