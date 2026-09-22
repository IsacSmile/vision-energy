"use client";

import React from "react";
import { Search } from "lucide-react";

interface SeoPanelProps {
  seoTitle: string;
  seoDescription: string;
  defaultTitle?: string;
  defaultDescription?: string;
  slug?: string;
  baseUrl?: string;
  onTitleChange: (val: string) => void;
  onDescriptionChange: (val: string) => void;
}

export default function SeoPanel({
  seoTitle,
  seoDescription,
  defaultTitle = "Vision Energy Technical Solutions",
  defaultDescription = "Specialist engineering, lightning protection, earthing and electrical supplies in the UAE.",
  slug = "",
  baseUrl = "https://vision-energy.nihatechsolutions.online",
  onTitleChange,
  onDescriptionChange,
}: SeoPanelProps) {
  const displayTitle = seoTitle.trim() || defaultTitle;
  const displayDesc = seoDescription.trim() || defaultDescription;
  const previewUrl = `${baseUrl}/${slug}`.replace(/\/+/g, "/").replace("https:/", "https://");

  return (
    <div className="space-y-4 bg-[#0D1117] border border-[#1F2937] p-5 rounded-xl">
      <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-[#1F2937] pb-3">
        <Search className="w-4 h-4 text-[#A3E635]" />
        <span>SEO & Search Snippet Metadata</span>
      </h3>

      {/* Live Google Search Result Preview */}
      <div className="p-4 bg-[#050608] border border-[#1F2937] rounded-xl space-y-1">
        <span className="text-[11px] font-semibold text-gray-500 block uppercase tracking-wider mb-1">
          Google Search Preview
        </span>
        <div className="text-[12px] text-gray-400 font-mono truncate">{previewUrl}</div>
        <div className="text-base font-semibold text-[#8AB4F8] hover:underline cursor-pointer truncate">
          {displayTitle}
        </div>
        <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed">{displayDesc}</p>
      </div>

      {/* SEO Title Input */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-xs">
          <label className="font-semibold text-gray-300">SEO Meta Title</label>
          <span
            className={`font-mono text-[11px] ${
              seoTitle.length > 60 ? "text-red-400 font-bold" : "text-gray-500"
            }`}
          >
            {seoTitle.length}/60
          </span>
        </div>
        <input
          type="text"
          value={seoTitle}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder={defaultTitle}
          maxLength={80}
          className="w-full bg-[#050608] border border-[#1F2937] text-white text-xs rounded-xl px-3 py-2.5 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-[#A3E635]"
        />
      </div>

      {/* SEO Description Input */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-xs">
          <label className="font-semibold text-gray-300">SEO Meta Description</label>
          <span
            className={`font-mono text-[11px] ${
              seoDescription.length > 155 ? "text-red-400 font-bold" : "text-gray-500"
            }`}
          >
            {seoDescription.length}/155
          </span>
        </div>
        <textarea
          rows={3}
          value={seoDescription}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder={defaultDescription}
          maxLength={200}
          className="w-full bg-[#050608] border border-[#1F2937] text-white text-xs rounded-xl p-3 min-h-[80px] focus:outline-none focus:ring-2 focus:ring-[#A3E635] resize-none"
        />
      </div>
    </div>
  );
}
