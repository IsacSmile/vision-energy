"use client";

import React, { useState, useEffect } from "react";
import { Trash2, RotateCcw, AlertTriangle, Loader2, RefreshCw } from "lucide-react";
import { showToast } from "@/components/admin/Toast";

export default function AdminTrashPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Permanent Delete Modal State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<any | null>(null);
  const [confirmInput, setConfirmInput] = useState("");
  const [deleting, setDeleting] = useState(false);

  const fetchTrash = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/trash");
      if (res.ok) {
        const data = await res.json();
        setItems(data.items || []);
      }
    } catch (err) {
      showToast("Failed to fetch trash items", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrash();
  }, []);

  const handleRestore = async (item: any) => {
    try {
      const res = await fetch("/api/admin/trash", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "restore", type: item.type, id: item.id }),
      });
      if (res.ok) {
        showToast(`Restored "${item.title}" as DRAFT`, "success");
        fetchTrash();
      } else {
        const json = await res.json();
        showToast(json.error || "Restore failed", "error");
      }
    } catch (err) {
      showToast("Failed to restore item", "error");
    }
  };

  const handlePermanentDelete = async () => {
    if (!itemToDelete || confirmInput !== "DELETE") return;
    setDeleting(true);
    try {
      const res = await fetch("/api/admin/trash", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "permanent_delete", type: itemToDelete.type, id: itemToDelete.id }),
      });
      if (res.ok) {
        showToast("Item permanently deleted", "success");
        setDeleteModalOpen(false);
        setItemToDelete(null);
        setConfirmInput("");
        fetchTrash();
      } else {
        const json = await res.json();
        showToast(json.error || "Permanent delete failed", "error");
      }
    } catch (err) {
      showToast("Failed to delete item", "error");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1F2937] pb-5">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Trash2 className="w-6 h-6 text-red-400" />
            <span>Trash & Recovery</span>
          </h1>
          <p className="text-xs text-[#A9B4C0] mt-1">
            Items in trash are hidden from the site. Items in trash for over 30 days are automatically purged daily.
          </p>
        </div>

        <button
          onClick={fetchTrash}
          className="p-2.5 text-gray-400 hover:text-white bg-[#0D1117] border border-[#1F2937] rounded-xl hover:bg-white/5 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center self-start sm:self-auto"
          title="Refresh Trash"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Trash Items List */}
      <div className="bg-[#0D1117] border border-[#1F2937] rounded-xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="flex flex-col items-center justify-center p-12 gap-3">
            <Loader2 className="w-6 h-6 text-[#A3E635] animate-spin" />
            <p className="text-xs text-gray-400 font-mono">Loading trashed items...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="p-12 text-center space-y-2">
            <p className="text-sm font-semibold text-white">Trash is empty.</p>
            <p className="text-xs text-gray-400">Deleted products, services, and blog posts will appear here for 30 days.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#050608] border-b border-[#1F2937] text-gray-400 text-[11px] font-semibold uppercase tracking-wider">
                  <th scope="col" className="p-4">Type</th>
                  <th scope="col" className="p-4">Title & Slug</th>
                  <th scope="col" className="p-4">Deleted Date</th>
                  <th scope="col" className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1F2937] text-xs">
                {items.map((item) => (
                  <tr key={`${item.type}-${item.id}`} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 text-[10px] font-mono font-bold rounded-md bg-red-950/40 text-red-400 border border-red-500/30">
                        {item.type}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="font-semibold text-white">{item.title}</div>
                      <span className="text-[11px] font-mono text-gray-500">{item.slug || item.code}</span>
                    </td>
                    <td className="p-4 font-mono text-gray-400 whitespace-nowrap">
                      {new Date(item.deletedAt).toLocaleString("en-GB")}
                    </td>
                    <td className="p-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleRestore(item)}
                          className="px-3 py-1.5 bg-[#A3E635]/10 text-[#A3E635] hover:bg-[#A3E635]/20 border border-[#A3E635]/30 rounded-xl font-bold text-xs flex items-center gap-1 min-h-[44px]"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Restore as Draft</span>
                        </button>
                        <button
                          onClick={() => {
                            setItemToDelete(item);
                            setConfirmInput("");
                            setDeleteModalOpen(true);
                          }}
                          className="px-3 py-1.5 bg-red-950/40 text-red-400 hover:bg-red-900/60 border border-red-500/30 rounded-xl font-bold text-xs flex items-center gap-1 min-h-[44px]"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete Permanently</span>
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

      {/* Confirm Permanent Delete Modal */}
      {deleteModalOpen && itemToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0D1117] border border-[#1F2937] p-6 rounded-2xl max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-red-400">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h3 className="text-base font-bold text-white">Permanently Delete Item?</h3>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed">
              This action cannot be undone. Item <strong className="text-white">"{itemToDelete.title}"</strong> and its media files will be permanently erased.
            </p>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-gray-400">
                To confirm permanent deletion, type <span className="text-white font-mono font-bold">DELETE</span> below:
              </label>
              <input
                type="text"
                value={confirmInput}
                onChange={(e) => setConfirmInput(e.target.value)}
                placeholder="DELETE"
                className="w-full bg-[#050608] border border-red-500/40 text-white text-xs font-mono rounded-xl px-3 py-2.5 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteModalOpen(false)}
                className="px-4 py-2.5 bg-[#050608] border border-[#1F2937] text-gray-300 rounded-xl font-semibold text-xs min-h-[44px]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handlePermanentDelete}
                disabled={confirmInput !== "DELETE" || deleting}
                className="px-5 py-2.5 bg-red-600 text-white font-bold text-xs rounded-xl hover:bg-red-700 disabled:opacity-40 transition-opacity flex items-center gap-2 min-h-[44px]"
              >
                {deleting && <Loader2 className="w-4 h-4 animate-spin" />}
                <span>Permanently Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
