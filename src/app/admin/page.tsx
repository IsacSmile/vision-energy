"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Package,
  Wrench,
  FileText,
  Inbox,
  Plus,
  AlertTriangle,
  ArrowRight,
  Clock,
  Loader2,
  RefreshCw,
} from "lucide-react";

interface DashboardData {
  counts: {
    newProductEnquiries: number;
    newServiceEnquiries: number;
    publishedProducts: number;
    draftProducts: number;
    publishedServices: number;
    draftServices: number;
    publishedPosts: number;
    draftPosts: number;
  };
  needsAttention: {
    oldDrafts: Array<{ type: string; title: string; href: string; updatedAt: string }>;
    servicesWithUnconfirmedSteps: Array<{ id: string; title: string; href: string }>;
  };
  latestEnquiries: {
    product: any[];
    service: any[];
  };
}

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/dashboard");
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (err) {
      console.error("Failed to load dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading || !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-3">
        <Loader2 className="w-8 h-8 text-[#A3E635] animate-spin" />
        <p className="text-xs text-gray-400 font-mono">Loading CMS Dashboard metrics...</p>
      </div>
    );
  }

  const { counts, needsAttention, latestEnquiries } = data;

  return (
    <div className="space-y-8">
      {/* Page Title & Refresh */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1F2937] pb-5">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Dashboard Overview</h1>
          <p className="text-xs text-[#A9B4C0] mt-1">
            Real-time operations, enquiries breakdown, content counts and attention items.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchDashboard}
            className="p-2.5 text-gray-400 hover:text-white bg-[#0D1117] border border-[#1F2937] rounded-xl hover:bg-white/5 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            title="Refresh Dashboard Data"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* QUICK ACTIONS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Link
          href="/admin/products/new"
          className="flex items-center justify-between p-4 bg-[#0D1117] border border-[#1F2937] hover:border-[#0B65B3]/60 rounded-xl transition-all group min-h-[44px]"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#0B65B3]/10 text-[#0B65B3] rounded-lg">
              <Package className="w-5 h-5" />
            </div>
            <span className="text-sm font-semibold text-white group-hover:text-[#0B65B3] transition-colors">
              New Product Category
            </span>
          </div>
          <Plus className="w-4 h-4 text-gray-400 group-hover:text-white" />
        </Link>

        <Link
          href="/admin/services/new"
          className="flex items-center justify-between p-4 bg-[#0D1117] border border-[#1F2937] hover:border-[#A3E635]/60 rounded-xl transition-all group min-h-[44px]"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#A3E635]/10 text-[#A3E635] rounded-lg">
              <Wrench className="w-5 h-5" />
            </div>
            <span className="text-sm font-semibold text-white group-hover:text-[#A3E635] transition-colors">
              New Service Scope
            </span>
          </div>
          <Plus className="w-4 h-4 text-gray-400 group-hover:text-white" />
        </Link>

        <Link
          href="/admin/blog/new"
          className="flex items-center justify-between p-4 bg-[#0D1117] border border-[#1F2937] hover:border-purple-500/60 rounded-xl transition-all group min-h-[44px]"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg">
              <FileText className="w-5 h-5" />
            </div>
            <span className="text-sm font-semibold text-white group-hover:text-purple-400 transition-colors">
              New Blog Article
            </span>
          </div>
          <Plus className="w-4 h-4 text-gray-400 group-hover:text-white" />
        </Link>
      </div>

      {/* METRIC CARDS (PLAIN NUMBERS WITH LABELS) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href="/admin/enquiries" className="p-5 bg-[#0D1117] border border-[#1F2937] rounded-xl space-y-2 hover:border-gray-700 transition-all block">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Product Enquiries</span>
            <Inbox className="w-4 h-4 text-[#0B65B3]" />
          </div>
          <div className="text-3xl font-bold text-white font-mono">{counts.newProductEnquiries}</div>
          <p className="text-[11px] text-[#0B65B3] font-medium">New unhandled enquiries</p>
        </Link>

        <Link href="/admin/enquiries" className="p-5 bg-[#0D1117] border border-[#1F2937] rounded-xl space-y-2 hover:border-gray-700 transition-all block">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Service Enquiries</span>
            <Inbox className="w-4 h-4 text-[#A3E635]" />
          </div>
          <div className="text-3xl font-bold text-white font-mono">{counts.newServiceEnquiries}</div>
          <p className="text-[11px] text-[#A3E635] font-medium">New unhandled requests</p>
        </Link>

        <Link href="/admin/products" className="p-5 bg-[#0D1117] border border-[#1F2937] rounded-xl space-y-2 hover:border-gray-700 transition-all block">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Products</span>
            <Package className="w-4 h-4 text-gray-400" />
          </div>
          <div className="text-3xl font-bold text-white font-mono">{counts.publishedProducts}</div>
          <p className="text-[11px] text-gray-400">
            <span className="text-[#A3E635] font-semibold">{counts.publishedProducts} published</span> • {counts.draftProducts} drafts
          </p>
        </Link>

        <Link href="/admin/services" className="p-5 bg-[#0D1117] border border-[#1F2937] rounded-xl space-y-2 hover:border-gray-700 transition-all block">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Services & Blog</span>
            <Wrench className="w-4 h-4 text-gray-400" />
          </div>
          <div className="text-3xl font-bold text-white font-mono">{counts.publishedServices + counts.publishedPosts}</div>
          <p className="text-[11px] text-gray-400">
            {counts.publishedServices} services, {counts.publishedPosts} posts published
          </p>
        </Link>
      </div>

      {/* NEEDS ATTENTION SECTION */}
      {(needsAttention.oldDrafts.length > 0 || needsAttention.servicesWithUnconfirmedSteps.length > 0) && (
        <div className="p-5 bg-[#0D1117] border border-amber-500/30 rounded-xl space-y-4">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <h2>Needs Attention</h2>
          </div>

          <div className="space-y-2 text-xs">
            {needsAttention.servicesWithUnconfirmedSteps.map((s) => (
              <div key={s.id} className="flex items-center justify-between p-3 bg-[#050608] border border-[#1F2937] rounded-lg">
                <span className="text-gray-300">
                  Service <strong className="text-white">{s.title}</strong> has unconfirmed process steps (hidden on site).
                </span>
                <Link href={s.href} className="text-[#A3E635] hover:underline font-semibold flex items-center gap-1 shrink-0 ml-2">
                  <span>Edit Service</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}

            {needsAttention.oldDrafts.map((d, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-[#050608] border border-[#1F2937] rounded-lg">
                <span className="text-gray-300">
                  {d.type} draft <strong className="text-white">{d.title}</strong> has been unupdated for over 14 days.
                </span>
                <Link href={d.href} className="text-[#A3E635] hover:underline font-semibold flex items-center gap-1 shrink-0 ml-2">
                  <span>Review Draft</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5 LATEST ENQUIRIES OF EACH TYPE */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Latest Product Enquiries */}
        <div className="bg-[#0D1117] border border-[#1F2937] rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-[#0B65B3]" />
              <h3 className="font-bold text-sm text-white">Latest Product Enquiries</h3>
            </div>
            <Link href="/admin/enquiries" className="text-xs text-[#0B65B3] hover:underline font-medium">
              View all
            </Link>
          </div>

          <div className="space-y-2">
            {latestEnquiries.product.length === 0 ? (
              <p className="text-xs text-gray-500 py-4 text-center">No product enquiries yet.</p>
            ) : (
              latestEnquiries.product.map((item) => (
                <Link
                  key={item.id}
                  href="/admin/enquiries"
                  className="block p-3 bg-[#050608] border border-[#1F2937] hover:border-gray-700 rounded-lg text-xs space-y-1 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white">{item.name} ({item.company || "Individual"})</span>
                    <span className="text-[10px] font-mono text-[#0B65B3]">{item.categoryCode}</span>
                  </div>
                  <p className="text-gray-400 text-[11px] truncate">{item.categoryTitle}</p>
                  <div className="text-[10px] text-gray-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{new Date(item.createdAt).toLocaleDateString("en-GB")}</span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Latest Service Enquiries */}
        <div className="bg-[#0D1117] border border-[#1F2937] rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wrench className="w-4 h-4 text-[#A3E635]" />
              <h3 className="font-bold text-sm text-white">Latest Service Enquiries</h3>
            </div>
            <Link href="/admin/enquiries" className="text-xs text-[#A3E635] hover:underline font-medium">
              View all
            </Link>
          </div>

          <div className="space-y-2">
            {latestEnquiries.service.length === 0 ? (
              <p className="text-xs text-gray-500 py-4 text-center">No service enquiries yet.</p>
            ) : (
              latestEnquiries.service.map((item) => (
                <Link
                  key={item.id}
                  href="/admin/enquiries"
                  className="block p-3 bg-[#050608] border border-[#1F2937] hover:border-gray-700 rounded-lg text-xs space-y-1 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white">{item.name} ({item.emirate})</span>
                    <span className="text-[10px] font-mono text-[#A3E635]">{item.projectType}</span>
                  </div>
                  <p className="text-gray-400 text-[11px] truncate">{item.serviceTitle}</p>
                  <div className="text-[10px] text-gray-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{new Date(item.createdAt).toLocaleDateString("en-GB")}</span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
