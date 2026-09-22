"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Loader2, ExternalLink, Save, Globe, AlertTriangle, RefreshCw } from "lucide-react";
import { showToast } from "./Toast";

interface FormShellProps {
  title: string;
  subtitle?: string;
  type: "product" | "service" | "blog";
  id?: string; // empty if creating
  status: "DRAFT" | "PUBLISHED";
  updatedAt?: string;
  isDirty?: boolean;
  isSubmitting?: boolean;
  errors?: Record<string, string>;
  onSaveDraft: () => Promise<void>;
  onPublish: () => Promise<void>;
  requirePublishConfirmation?: boolean;
  publishConfirmationText?: string;
  children: React.ReactNode;
}

export default function FormShell({
  title,
  subtitle,
  type,
  id,
  status,
  updatedAt,
  isDirty = false,
  isSubmitting = false,
  errors = {},
  onSaveDraft,
  onPublish,
  requirePublishConfirmation = false,
  publishConfirmationText = "Only publish services the client has confirmed they provide. This page will be public immediately.",
  children,
}: FormShellProps) {
  const [publishDialogOpen, setPublishDialogOpen] = useState(false);
  const [publishConfirmedCheckbox, setPublishConfirmedCheckbox] = useState(false);
  const [concurrencyError, setConcurrencyError] = useState(false);

  // Unsaved changes beforeunload handler
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  const handlePublishClick = () => {
    if (requirePublishConfirmation && status !== "PUBLISHED") {
      setPublishConfirmedCheckbox(false);
      setPublishDialogOpen(true);
    } else {
      executePublish();
    }
  };

  const executePublish = async () => {
    setPublishDialogOpen(false);
    try {
      await onPublish();
    } catch (err: any) {
      if (err?.message?.includes("changed elsewhere")) {
        setConcurrencyError(true);
      }
    }
  };

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <div className="space-y-6">
      {/* Top Header & Sticky Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1F2937] pb-5 sticky top-14 lg:top-0 z-20 bg-[#050608]/95 backdrop-blur-md pt-2">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{title}</h1>
            <span
              className={`px-2.5 py-0.5 text-xs font-mono font-bold rounded-full border ${
                status === "PUBLISHED"
                  ? "bg-[#A3E635]/10 text-[#A3E635] border-[#A3E635]/30"
                  : "bg-amber-500/10 text-amber-400 border-amber-500/30"
              }`}
            >
              {status}
            </span>
          </div>
          {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {id && (
            <a
              href={`/admin/preview/${type}/${id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 bg-[#0D1117] border border-[#1F2937] hover:border-gray-600 rounded-xl text-xs font-semibold text-gray-300 hover:text-white flex items-center gap-1.5 transition-colors min-h-[44px]"
            >
              <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
              <span>Preview</span>
            </a>
          )}

          <button
            type="button"
            onClick={onSaveDraft}
            disabled={isSubmitting}
            className="px-4 py-2 bg-[#0D1117] border border-[#1F2937] hover:border-gray-600 text-white font-semibold text-xs rounded-xl flex items-center gap-2 transition-colors disabled:opacity-50 min-h-[44px]"
          >
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 text-gray-400" />}
            <span>Save Draft</span>
          </button>

          <button
            type="button"
            onClick={handlePublishClick}
            disabled={isSubmitting}
            className="px-5 py-2 bg-[#A3E635] text-[#050608] font-bold text-xs rounded-xl hover:opacity-90 flex items-center gap-2 transition-opacity disabled:opacity-50 shadow-lg min-h-[44px]"
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin text-[#050608]" />
            ) : (
              <Globe className="w-4 h-4 text-[#050608]" />
            )}
            <span>{status === "PUBLISHED" ? "Update" : "Publish"}</span>
          </button>
        </div>
      </div>

      {/* Optimistic Concurrency Conflict Alert */}
      {concurrencyError && (
        <div className="p-4 bg-red-950/60 border border-red-500/40 rounded-xl flex items-center justify-between text-xs text-red-300">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
            <span>This item was changed elsewhere. Reload to see the latest version.</span>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-3 py-1.5 bg-red-900 border border-red-500/50 rounded-lg text-white font-bold flex items-center gap-1 min-h-[44px]"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reload</span>
          </button>
        </div>
      )}

      {/* Validation Errors Summary Header */}
      {hasErrors && (
        <div className="p-4 bg-red-950/40 border border-red-500/30 rounded-xl space-y-2">
          <div className="flex items-center gap-2 text-red-400 text-xs font-bold">
            <AlertTriangle className="w-4 h-4" />
            <span>Please correct the errors below before saving:</span>
          </div>
          <ul className="list-disc list-inside text-xs text-red-300 space-y-1 font-mono">
            {Object.entries(errors).map(([field, msg]) => (
              <li key={field}>{msg}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Form Content */}
      <div className="space-y-6">{children}</div>

      {/* Service Publish Confirmation Guard Dialog */}
      {publishDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0D1117] border border-[#1F2937] p-6 rounded-2xl max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-amber-400">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h3 className="text-base font-bold text-white">Publish Confirmation Required</h3>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed">{publishConfirmationText}</p>

            <label className="flex items-start gap-3 p-3 bg-[#050608] border border-[#1F2937] rounded-xl cursor-pointer">
              <input
                type="checkbox"
                checked={publishConfirmedCheckbox}
                onChange={(e) => setPublishConfirmedCheckbox(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-gray-600 bg-gray-800 text-[#A3E635] focus:ring-[#A3E635]"
              />
              <span className="text-xs font-medium text-gray-200">
                I confirm this service scope has been approved by the client
              </span>
            </label>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setPublishDialogOpen(false)}
                className="px-4 py-2.5 bg-[#050608] border border-[#1F2937] rounded-xl text-xs font-semibold text-gray-300 hover:text-white min-h-[44px]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={executePublish}
                disabled={!publishConfirmedCheckbox}
                className="px-5 py-2.5 bg-[#A3E635] text-[#050608] font-bold text-xs rounded-xl hover:opacity-90 disabled:opacity-40 transition-opacity min-h-[44px]"
              >
                Confirm & Publish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
