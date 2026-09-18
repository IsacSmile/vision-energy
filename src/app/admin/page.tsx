'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import EnquiryTable from '@/components/admin/EnquiryTable';
import { LogOut, Download, Package, Wrench, Shield, RefreshCw } from 'lucide-react';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'product' | 'service'>('product');
  const [newCounts, setNewCounts] = useState<{ product: number; service: number }>({
    product: 0,
    service: 0,
  });

  const fetchBadgeCounts = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/enquiries?type=product&limit=1');
      const json = await res.json();
      if (res.ok && json.newCounts) {
        setNewCounts(json.newCounts);
      }
    } catch (err) {
      console.error('Failed to fetch badge counts:', err);
    }
  }, []);

  useEffect(() => {
    fetchBadgeCounts();
  }, [fetchBadgeCounts]);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const handleExportCSV = () => {
    window.open(`/api/admin/export?type=${activeTab}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#050608] text-white">
      {/* Dashboard Top Header Bar */}
      <header className="bg-[#0D1117] border-b border-[#1F2937] py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#050608] border border-[#0B65B3]/40 rounded-xl flex items-center justify-center">
              <Image src="/site-main-logo.png" alt="Logo" width={32} height={32} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white tracking-tight leading-tight">
                VISION ENERGY INTERNATIONAL
              </h1>
              <span className="text-[11px] font-semibold text-[#8DC63F] block">
                Administrative Control Panel • Enquiries Management
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchBadgeCounts}
              className="p-2 text-gray-400 hover:text-white bg-[#050608] border border-[#1F2937] rounded-xl hover:bg-white/5 transition-colors"
              title="Refresh Badge Counts"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-950/60 border border-red-500/40 text-red-300 hover:bg-red-900/60 font-semibold text-xs rounded-xl flex items-center gap-2 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Header Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Client Enquiries Dashboard</h2>
            <p className="text-xs text-[#A9B4C0] mt-1">
              Manage product availability enquiries and service booking requests submitted via the portal.
            </p>
          </div>

          <button
            onClick={handleExportCSV}
            className="px-5 py-2.5 bg-gradient-brand text-white font-bold text-xs rounded-full hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg pill-glow self-start sm:self-auto"
          >
            <Download className="w-4 h-4" />
            <span>Export Current Tab to CSV</span>
          </button>
        </div>

        {/* TWO SEPARATED TAB HEADERS */}
        <div className="flex border-b border-[#1F2937] gap-2 sm:gap-4">
          {/* Tab 1: Product Enquiries */}
          <button
            onClick={() => setActiveTab('product')}
            className={`py-3 px-5 text-sm font-bold border-b-2 flex items-center gap-3 transition-colors ${
              activeTab === 'product'
                ? 'border-[#0B65B3] text-[#0B65B3] bg-[#0B65B3]/10 rounded-t-xl'
                : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5 rounded-t-xl'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Product Enquiries</span>
            <span
              className={`px-2.5 py-0.5 text-xs font-mono rounded-full font-bold ${
                newCounts.product > 0
                  ? 'bg-[#8DC63F] text-[#050608] pill-glow'
                  : 'bg-gray-800 text-gray-400'
              }`}
            >
              {newCounts.product} NEW
            </span>
          </button>

          {/* Tab 2: Service Enquiries */}
          <button
            onClick={() => setActiveTab('service')}
            className={`py-3 px-5 text-sm font-bold border-b-2 flex items-center gap-3 transition-colors ${
              activeTab === 'service'
                ? 'border-[#8DC63F] text-[#8DC63F] bg-[#8DC63F]/10 rounded-t-xl'
                : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5 rounded-t-xl'
            }`}
          >
            <Wrench className="w-4 h-4" />
            <span>Service Enquiries</span>
            <span
              className={`px-2.5 py-0.5 text-xs font-mono rounded-full font-bold ${
                newCounts.service > 0
                  ? 'bg-[#8DC63F] text-[#050608] pill-glow'
                  : 'bg-gray-800 text-gray-400'
              }`}
            >
              {newCounts.service} NEW
            </span>
          </button>
        </div>

        {/* TAB CONTENT TABLES */}
        <div>
          {activeTab === 'product' ? (
            <EnquiryTable type="product" onNewCountChange={fetchBadgeCounts} />
          ) : (
            <EnquiryTable type="service" onNewCountChange={fetchBadgeCounts} />
          )}
        </div>
      </main>
    </div>
  );
}
