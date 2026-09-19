'use client';

import React, { useState, useEffect, useCallback } from 'react';
import EnquiryDetailDrawer from './EnquiryDetailDrawer';
import { Search, Filter, Calendar, ChevronLeft, ChevronRight, Phone, Mail, Loader2, Eye } from 'lucide-react';

interface EnquiryTableProps {
  type: 'product' | 'service';
  onNewCountChange?: () => void;
}

export default function EnquiryTable({ type, onNewCountChange }: EnquiryTableProps) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [selectedRecord, setSelectedRecord] = useState<any | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams({
        type,
        search,
        status,
        startDate,
        endDate,
        page: page.toString(),
        limit: '10',
      });
      const res = await fetch(`/api/admin/enquiries?${query.toString()}`);
      const json = await res.json();
      if (res.ok) {
        setData(json.data || []);
        setTotalPages(json.pagination?.totalPages || 1);
        setTotalCount(json.pagination?.total || 0);
        if (onNewCountChange) onNewCountChange();
      }
    } catch (err) {
      console.error('Failed to fetch enquiries:', err);
    } finally {
      setLoading(false);
    }
  }, [type, search, status, startDate, endDate, page, onNewCountChange]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleResetFilters = () => {
    setSearch('');
    setStatus('');
    setStartDate('');
    setEndDate('');
    setPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Search & Filter Toolbar */}
      <div className="bg-[#0D1117] border border-[#1F2937] p-4 sm:p-5 rounded-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search by reference, name, email, phone..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full bg-[#050608] border border-[#1F2937] rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:border-[#8DC63F]"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400 shrink-0" />
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
            className="w-full bg-[#050608] border border-[#1F2937] rounded-xl px-3 py-2.5 text-xs text-white focus:border-[#8DC63F]"
          >
            <option value="">All Statuses</option>
            <option value="NEW">NEW Only</option>
            <option value="CONTACTED">CONTACTED Only</option>
            <option value="CLOSED">CLOSED Only</option>
          </select>
        </div>

        {/* Date Range Start */}
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
          <input
            type="date"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
              setPage(1);
            }}
            className="w-full bg-[#050608] border border-[#1F2937] rounded-xl px-3 py-2.5 text-xs text-white focus:border-[#8DC63F]"
            title="Start Date"
          />
        </div>

        {/* Date Range End & Reset */}
        <div className="flex items-center gap-2">
          <input
            type="date"
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value);
              setPage(1);
            }}
            className="w-full bg-[#050608] border border-[#1F2937] rounded-xl px-3 py-2.5 text-xs text-white focus:border-[#8DC63F]"
            title="End Date"
          />
          <button
            onClick={handleResetFilters}
            className="min-h-[38px] px-3.5 py-2 text-xs font-semibold text-gray-400 hover:text-white bg-[#050608] border border-[#1F2937] rounded-xl hover:bg-white/5 transition-colors shrink-0"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Main Container: Mobile Stacked Cards (< lg) vs Desktop Table (>= lg) */}
      <div className="bg-[#0D1117] border border-[#1F2937] rounded-2xl overflow-hidden shadow-xl">
        {/* Mobile View: Stacked Cards (< lg) */}
        <div className="block lg:hidden divide-y divide-[#1F2937]">
          {loading ? (
            <div className="py-12 text-center text-gray-400">
              <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-[#0B65B3]" />
              <span>Loading enquiries...</span>
            </div>
          ) : data.length === 0 ? (
            <div className="py-12 text-center text-gray-400 text-sm">
              No {type} enquiries found matching your filter criteria.
            </div>
          ) : (
            data.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedRecord(item)}
                className="p-4 space-y-3 hover:bg-white/5 cursor-pointer transition-colors active:bg-white/10"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#8DC63F] bg-[#8DC63F]/10 px-2.5 py-1 rounded-full border border-[#8DC63F]/30">
                    {item.reference}
                  </span>
                  <StatusBadge status={item.status} />
                </div>

                <div>
                  <h3 className="font-bold text-white text-sm">{item.name}</h3>
                  <p className="text-xs text-gray-400">{item.company || 'Private Client'}</p>
                </div>

                <div className="bg-[#050608] p-3 rounded-xl border border-[#1F2937]/60 space-y-1 text-xs">
                  <div className="font-semibold text-[#0B65B3]">
                    {type === 'product' ? `[${item.categoryCode}] ${item.categoryTitle}` : item.serviceTitle}
                  </div>
                  <div className="flex flex-wrap items-center gap-4 pt-1 text-[11px] text-gray-400">
                    <span className="flex items-center gap-1 text-[#8DC63F] font-mono">
                      <Phone className="w-3 h-3" /> {item.phone}
                    </span>
                    <span className="flex items-center gap-1 truncate">
                      <Mail className="w-3 h-3" /> {item.email}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-gray-400">{new Date(item.createdAt).toLocaleDateString()}</span>
                  <button className="min-h-[36px] px-3 bg-[#0B65B3] hover:bg-[#0B65B3]/80 text-white font-bold rounded-lg flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Details</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop View: Table (>= lg) */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#050608] border-b border-[#1F2937] text-[11px] font-bold uppercase tracking-wider text-[#A9B4C0]">
                <th className="py-3.5 px-4">Reference</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Client / Company</th>
                <th className="py-3.5 px-4">Contact Info</th>
                <th className="py-3.5 px-4">
                  {type === 'product' ? 'Product Category' : 'Requested Service'}
                </th>
                <th className="py-3.5 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F2937] text-xs">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-[#0B65B3]" />
                    <span>Loading enquiries...</span>
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400">
                    No {type} enquiries found matching your filter criteria.
                  </td>
                </tr>
              ) : (
                data.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => setSelectedRecord(item)}
                    className="hover:bg-white/5 cursor-pointer transition-colors"
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-[#8DC63F]">
                      {item.reference}
                    </td>
                    <td className="py-3.5 px-4 text-gray-400 whitespace-nowrap">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-white">{item.name}</div>
                      <div className="text-[11px] text-gray-400">{item.company || '—'}</div>
                    </td>
                    <td className="py-3.5 px-4 space-y-0.5">
                      <div className="text-[#8DC63F] flex items-center gap-1 font-mono">
                        <Phone className="w-3 h-3" /> {item.phone}
                      </div>
                      <div className="text-gray-400 flex items-center gap-1">
                        <Mail className="w-3 h-3" /> {item.email}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      {type === 'product' ? (
                        <div>
                          <span className="font-bold text-[#0B65B3] mr-1">[{item.categoryCode}]</span>
                          <span className="text-white font-medium">{item.categoryTitle}</span>
                        </div>
                      ) : (
                        <div>
                          <span className="text-white font-semibold">{item.serviceTitle}</span>
                          <div className="text-[11px] text-[#8DC63F] font-mono">{item.emirate}</div>
                        </div>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={item.status} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 bg-[#050608] border-t border-[#1F2937] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div>
            Showing <span className="text-white font-bold">{data.length}</span> of{' '}
            <span className="text-white font-bold">{totalCount}</span> total records (Page {page} of {totalPages})
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2.5 bg-[#0D1117] border border-[#1F2937] rounded-lg disabled:opacity-40 hover:bg-white/5 text-white min-w-[40px] min-h-[40px] flex items-center justify-center"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-3 py-2 font-semibold text-white bg-[#0D1117] border border-[#1F2937] rounded-lg">
              {page}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="p-2.5 bg-[#0D1117] border border-[#1F2937] rounded-lg disabled:opacity-40 hover:bg-white/5 text-white min-w-[40px] min-h-[40px] flex items-center justify-center"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Detail Drawer */}
      <EnquiryDetailDrawer
        enquiry={selectedRecord}
        type={type}
        onClose={() => setSelectedRecord(null)}
        onRefresh={fetchData}
      />
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  if (status === 'NEW') {
    return (
      <span className="px-2.5 py-1 text-[11px] font-bold text-[#8DC63F] bg-[#8DC63F]/10 border border-[#8DC63F]/40 rounded-full pill-glow">
        NEW
      </span>
    );
  }
  if (status === 'CONTACTED') {
    return (
      <span className="px-2.5 py-1 text-[11px] font-bold text-[#F2C230] bg-[#F2C230]/10 border border-[#F2C230]/40 rounded-full">
        CONTACTED
      </span>
    );
  }
  return (
    <span className="px-2.5 py-1 text-[11px] font-bold text-gray-400 bg-gray-800 border border-gray-700 rounded-full">
      CLOSED
    </span>
  );
}
