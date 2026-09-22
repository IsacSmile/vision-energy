"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Upload, X, Loader2, Image as ImageIcon, Link as LinkIcon } from "lucide-react";
import { showToast } from "./Toast";

interface ImageUploaderProps {
  value: string;
  altValue?: string;
  onChange: (url: string, alt?: string) => void;
  onAltChange?: (alt: string) => void;
  type?: "products" | "services" | "blog";
  label?: string;
  requiredAlt?: boolean;
}

export default function ImageUploader({
  value,
  altValue = "",
  onChange,
  onAltChange,
  type = "products",
  label = "Cover Image",
  requiredAlt = true,
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [mode, setMode] = useState<"upload" | "url">("upload");
  const [urlInput, setUrlInput] = useState(value);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 3 * 1024 * 1024) {
      showToast("Image size must be less than 3 MB", "error");
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", type);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      if (!res.ok) {
        if (json.error?.includes("BLOB_READ_WRITE_TOKEN")) {
          setMode("url");
          showToast("Vercel Blob token missing. Switched to URL input.", "info");
        } else {
          showToast(json.error || "Image upload failed", "error");
        }
        return;
      }

      onChange(json.url, altValue);
      setUrlInput(json.url);
      showToast("Image uploaded successfully", "success");
    } catch (err) {
      showToast("Upload failed", "error");
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = async () => {
    if (value && value.includes("public.blob.vercel-storage.com")) {
      try {
        await fetch("/api/admin/upload", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: value }),
        });
      } catch (err) {
        // ignore delete failure
      }
    }
    onChange("", "");
    setUrlInput("");
    if (onAltChange) onAltChange("");
  };

  const handleUrlSubmit = () => {
    if (!urlInput.startsWith("http://") && !urlInput.startsWith("https://")) {
      showToast("URL must start with http:// or https://", "error");
      return;
    }
    onChange(urlInput, altValue);
    showToast("Image URL set", "success");
  };

  return (
    <div className="space-y-3 bg-[#0D1117] border border-[#1F2937] p-4 rounded-xl">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">{label}</label>
        <div className="flex items-center gap-1 text-[11px]">
          <button
            type="button"
            onClick={() => setMode("upload")}
            className={`px-2.5 py-1 rounded-md flex items-center gap-1 font-medium transition-colors ${
              mode === "upload" ? "bg-[#A3E635]/10 text-[#A3E635]" : "text-gray-400 hover:text-white"
            }`}
          >
            <Upload className="w-3 h-3" />
            <span>Upload</span>
          </button>
          <button
            type="button"
            onClick={() => setMode("url")}
            className={`px-2.5 py-1 rounded-md flex items-center gap-1 font-medium transition-colors ${
              mode === "url" ? "bg-[#A3E635]/10 text-[#A3E635]" : "text-gray-400 hover:text-white"
            }`}
          >
            <LinkIcon className="w-3 h-3" />
            <span>URL</span>
          </button>
        </div>
      </div>

      {value ? (
        <div className="relative rounded-xl overflow-hidden border border-[#1F2937] bg-[#050608] p-2 flex items-center gap-4">
          <div className="w-20 h-20 relative bg-black/40 rounded-lg overflow-hidden shrink-0 border border-[#1F2937]">
            <Image src={value} alt={altValue || "Preview"} fill className="object-cover" />
          </div>
          <div className="flex-1 min-w-0 space-y-1">
            <p className="text-xs font-mono text-gray-300 truncate">{value}</p>
            <span className="text-[10px] text-gray-500 block">Accepted format: JPG, PNG, WEBP, AVIF</span>
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-red-400 hover:text-red-300 hover:bg-red-950/40 border border-red-500/20 rounded-xl transition-colors shrink-0"
            title="Remove Image"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      ) : mode === "upload" ? (
        <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-[#1F2937] hover:border-[#A3E635]/50 rounded-xl bg-[#050608] cursor-pointer transition-colors text-center group min-h-[120px]">
          {uploading ? (
            <div className="flex items-center gap-2 text-xs text-[#A3E635]">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Uploading & verifying image signature...</span>
            </div>
          ) : (
            <>
              <ImageIcon className="w-8 h-8 text-gray-500 group-hover:text-[#A3E635] mb-2 transition-colors" />
              <span className="text-xs font-semibold text-gray-300 group-hover:text-white">
                Click to upload image (max 3 MB)
              </span>
              <span className="text-[10px] text-gray-500 mt-1">JPEG, PNG, WEBP, AVIF only</span>
              <input type="file" accept="image/jpeg,image/png,image/webp,image/avif" onChange={handleFileUpload} className="hidden" />
            </>
          )}
        </label>
      ) : (
        <div className="flex gap-2">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="flex-1 bg-[#050608] border border-[#1F2937] text-white text-xs rounded-xl px-3 py-2 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-[#A3E635]"
          />
          <button
            type="button"
            onClick={handleUrlSubmit}
            className="px-4 py-2 bg-[#A3E635] text-[#050608] font-bold text-xs rounded-xl hover:opacity-90 min-h-[44px] shrink-0"
          >
            Set URL
          </button>
        </div>
      )}

      {/* Alt text field */}
      {(value || mode === "url") && (
        <div className="space-y-1 pt-1">
          <label className="block text-[11px] font-medium text-gray-400">
            Image Alt Text {requiredAlt && <span className="text-red-400">*</span>}
          </label>
          <input
            type="text"
            value={altValue}
            onChange={(e) => onAltChange && onAltChange(e.target.value)}
            placeholder="Descriptive alt text for accessibility"
            required={requiredAlt}
            className="w-full bg-[#050608] border border-[#1F2937] text-white text-xs rounded-xl px-3 py-2 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-[#A3E635]"
          />
        </div>
      )}
    </div>
  );
}
