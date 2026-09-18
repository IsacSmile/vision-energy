'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useEnquiryModal } from '@/components/modals/EnquiryModalProvider';
import { Package, ArrowRight, MessageSquare, Search } from 'lucide-react';

interface CategoryItem {
  id: string;
  code: string;
  slug: string;
  groupPrefix: string;
  title: string;
  description: string;
  families: string;
  image: string | null;
  sortOrder: number;
}

export default function ProductsClientPage({ categories }: { categories: CategoryItem[] }) {
  const { openProductModal } = useEnquiryModal();
  const [selectedGroup, setSelectedGroup] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const groupLabels: Record<string, string> = {
    ALL: 'All Categories (57)',
    LP: 'Lightning Protection (LP)',
    ER: 'Earthing and Bonding (ER)',
    LT: 'Lighting and Signalling (LT)',
    CM: 'Cable Management (CM)',
    CB: 'Cables and Connectivity (CB)',
    CT: 'Conduit Systems (CT)',
    EL: 'Electrical Equipment (EL)',
    EN: 'Energy and Power (EN)',
    ME: 'Mechanical and HVAC (ME)',
    SG: 'Security, Alarm & Fire (SG)',
    HW: 'Hardware and Tools (HW)',
    SF: 'Safety Marking and PPE (SF)',
    PK: 'Packaging (PK)',
    ID: 'Identification & Engraving (ID)',
  };

  const filteredCategories = categories.filter((cat) => {
    const matchesGroup = selectedGroup === 'ALL' || cat.groupPrefix === selectedGroup;
    const matchesSearch =
      searchQuery === '' ||
      cat.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.families.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGroup && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Category Group Tabs & Search Bar */}
      <div className="bg-[#0D1117] border border-[#1F2937] p-4 sm:p-6 rounded-2xl space-y-4">
        {/* Search Input */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by code (e.g. LP-01), keyword, or title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#050608] border border-[#1F2937] rounded-xl pl-10 pr-4 py-2 text-xs text-white focus:border-[#8DC63F]"
          />
        </div>

        {/* Group Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#1F2937]/60">
          {Object.keys(groupLabels).map((prefix) => {
            const isSelected = selectedGroup === prefix;
            const isPriority = prefix === 'LP' || prefix === 'ER';
            return (
              <button
                key={prefix}
                onClick={() => setSelectedGroup(prefix)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-gradient-brand text-white shadow-md pill-glow font-bold'
                    : isPriority
                    ? 'bg-[#050608] text-[#8DC63F] border border-[#8DC63F]/40 hover:border-[#8DC63F]'
                    : 'bg-[#050608] text-gray-400 border border-[#1F2937] hover:text-white hover:bg-white/5'
                }`}
              >
                {groupLabels[prefix]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Product Category Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((cat) => {
          const isPriority = cat.groupPrefix === 'LP' || cat.groupPrefix === 'ER';
          const familiesList = cat.families
            .split(';')
            .map((f) => f.trim())
            .filter(Boolean);

          return (
            <div
              key={cat.id}
              className={`bg-[#0D1117] border rounded-2xl p-6 flex flex-col justify-between transition-all group hover:bg-[#161B22] ${
                isPriority
                  ? 'border-[#0B65B3]/50 hover:border-[#8DC63F]'
                  : 'border-[#1F2937] hover:border-[#0B65B3]'
              }`}
            >
              <div className="space-y-4">
                {/* Category Code Header */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#8DC63F] bg-[#8DC63F]/10 px-3 py-1 rounded-full border border-[#8DC63F]/30">
                    [{cat.code}]
                  </span>
                  {isPriority && (
                    <span className="text-[10px] uppercase font-bold text-[#0B65B3] bg-[#0B65B3]/10 px-2.5 py-0.5 rounded-full border border-[#0B65B3]/30">
                      Priority Focus
                    </span>
                  )}
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-white group-hover:text-[#8DC63F] transition-colors leading-snug">
                  <Link href={`/products/${cat.slug}`}>{cat.title}</Link>
                </h2>

                {/* Description */}
                <p className="text-xs text-[#A9B4C0] line-clamp-3 leading-relaxed">
                  {cat.description}
                </p>

                {/* Product Families List */}
                <div className="space-y-1.5 pt-2">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                    Product Families ({familiesList.length}):
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {familiesList.slice(0, 5).map((fam, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-mono text-gray-300 bg-[#050608] px-2.5 py-1 rounded-lg border border-[#1F2937]"
                      >
                        {fam}
                      </span>
                    ))}
                    {familiesList.length > 5 && (
                      <span className="text-[11px] font-mono text-[#8DC63F] bg-[#050608] px-2 py-1 rounded-lg border border-[#1F2937]">
                        +{familiesList.length - 5} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* TWO BUTTON CTAS */}
              <div className="pt-6 border-t border-[#1F2937] mt-6 grid grid-cols-2 gap-3">
                <button
                  onClick={() =>
                    openProductModal({
                      categoryCode: cat.code,
                      categoryTitle: cat.title,
                    })
                  }
                  className="py-2.5 px-3 bg-[#0B65B3] hover:bg-[#0B65B3]/90 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 blue-glow"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Enquire</span>
                </button>

                <Link
                  href={`/products/${cat.slug}`}
                  className="py-2.5 px-3 bg-[#050608] hover:bg-white/10 text-white border border-[#1F2937] font-semibold text-xs rounded-xl transition-all flex items-center justify-center gap-1"
                >
                  <span>Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {filteredCategories.length === 0 && (
        <div className="text-center py-16 bg-[#0D1117] border border-[#1F2937] rounded-2xl space-y-3">
          <Package className="w-12 h-12 text-gray-500 mx-auto" />
          <h3 className="text-lg font-bold text-white">No Product Categories Found</h3>
          <p className="text-xs text-[#A9B4C0]">
            No categories matched &quot;{searchQuery}&quot;. Please try a different search term or clear the filter.
          </p>
          <button
            onClick={() => {
              setSelectedGroup('ALL');
              setSearchQuery('');
            }}
            className="px-4 py-2 bg-[#0B65B3] text-white text-xs font-bold rounded-full"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
