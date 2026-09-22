"use client";

import React, { useState, useEffect, useCallback } from "react";
import EnquiryTable from "@/components/admin/EnquiryTable";
import { Download, Package, Wrench, RefreshCw } from "lucide-react";

export default function AdminEnquiriesPage() {
  const [activeTab, setActiveTab] = useState<"product" | "service">("product");
  const [newCounts, setNewCounts] = useState<{ product: number; service: number }>({
    product: 0,
    service: 0,
  });

  const fetchBadgeCounts = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/enquiries?type=product&limit=1");
      const json = await res.json();
      if (res.ok && json.newCounts) {
        setNewCounts(json.newCounts);
      }
    } catch (err) {
      console.error("Failed to fetch badge counts:", err);
    }
  }, []);

  useEffect(() => {
    fetchBadgeCounts();
  }, [fetchBadgeCounts]);

  const handleExportCSV = () => {
    window.open(`/api/admin/export?type=${activeTab}`, "_blank");
  };

  return (
    <div className="space-y-6">
      {/* Header Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1F2937] pb-5">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Client Enquiries</h1>
          <p className="text-xs text-[#A9B4C0] mt-1">
            Manage product availability enquiries and service booking requests submitted via the portal.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchBadgeCounts}
            className="p-2.5 text-gray-400 hover:text-white bg-[#0D1117] border border-[#1F2937] rounded-xl hover:bg-white/5 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            title="Refresh Badge Counts"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 bg-[#A3E635] text-[#050608] font-bold text-xs rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg min-h-[44px]"
          >
            <Download className="w-4 h-4" />
            <span>Export {activeTab === "product" ? "Products" : "Services"} CSV</span>
          </button>
        </div>
      </div>

      {/* TWO SEPARATED TAB HEADERS */}
      <div className="flex border-b border-[#1F2937] gap-2 sm:gap-4 overflow-x-auto pb-px">
        {/* Tab 1: Product Enquiries */}
        <button
          onClick={() => setActiveTab("product")}
          className={`py-3 px-5 text-sm font-bold border-b-2 flex items-center gap-3 transition-colors shrink-0 min-h-[44px] ${
            activeTab === "product"
              ? "border-[#0B65B3] text-[#0B65B3] bg-[#0B65B3]/10 rounded-t-xl"
              : "border-transparent text-gray-400 hover:text-white hover:bg-white/5 rounded-t-xl"
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Product Enquiries</span>
          <span
            className={`px-2.5 py-0.5 text-xs font-mono rounded-full font-bold ${
              newCounts.product > 0 ? "bg-[#8DC63F] text-[#050608]" : "bg-gray-800 text-gray-400"
            }`}
          >
            {newCounts.product} NEW
          </span>
        </button>

        {/* Tab 2: Service Enquiries */}
        <button
          onClick={() => setActiveTab("service")}
          className={`py-3 px-5 text-sm font-bold border-b-2 flex items-center gap-3 transition-colors shrink-0 min-h-[44px] ${
            activeTab === "service"
              ? "border-[#8DC63F] text-[#8DC63F] bg-[#8DC63F]/10 rounded-t-xl"
              : "border-transparent text-gray-400 hover:text-white hover:bg-white/5 rounded-t-xl"
          }`}
        >
          <Wrench className="w-4 h-4" />
          <span>Service Enquiries</span>
          <span
            className={`px-2.5 py-0.5 text-xs font-mono rounded-full font-bold ${
              newCounts.service > 0 ? "bg-[#8DC63F] text-[#050608]" : "bg-gray-800 text-gray-400"
            }`}
          >
            {newCounts.service} NEW
          </span>
        </button>
      </div>

      {/* TAB CONTENT TABLES */}
      <div>
        {activeTab === "product" ? (
          <EnquiryTable type="product" onNewCountChange={fetchBadgeCounts} />
        ) : (
          <EnquiryTable type="service" onNewCountChange={fetchBadgeCounts} />
        )}
      </div>
    </div>
  );
}
