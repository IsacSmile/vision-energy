'use client';

import React, { useState, useEffect } from 'react';
import { X, Phone, Mail, ExternalLink, Trash2, Save, CheckCircle2, Clock } from 'lucide-react';

interface EnquiryDetailDrawerProps {
  enquiry: any | null;
  type: 'product' | 'service';
  onClose: () => void;
  onRefresh: () => void;
}

export default function EnquiryDetailDrawer({
  enquiry,
  type,
  onClose,
  onRefresh,
}: EnquiryDetailDrawerProps) {
  const [status, setStatus] = useState<string>('NEW');
  const [notes, setNotes] = useState<string>('');
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (enquiry) {
      setStatus(enquiry.status || 'NEW');
      setNotes(enquiry.notes || '');
      setSaveSuccess(false);
      setShowConfirmDelete(false);
    }
  }, [enquiry]);

  if (!enquiry) return null;

  const handleSave = async () => {
    setSaving(true);
    setSaveSuccess(false);
    try {
      const res = await fetch(`/api/admin/enquiries/${enquiry.id}?type=${type}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, notes }),
      });
      if (res.ok) {
        setSaveSuccess(true);
        onRefresh();
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (err) {
      console.error('Failed to update enquiry', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/enquiries/${enquiry.id}?type=${type}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        onRefresh();
        onClose();
      }
    } catch (err) {
      console.error('Failed to delete enquiry', err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-xl bg-[#0D1117] border-l border-[#1F2937] text-white p-6 sm:p-8 flex flex-col justify-between overflow-y-auto shadow-2xl">
          {/* Top Header */}
          <div className="space-y-6">
            <div className="flex items-start justify-between border-b border-[#1F2937] pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-[#8DC63F] bg-[#8DC63F]/10 px-2.5 py-1 rounded-full border border-[#8DC63F]/30">
                  {enquiry.reference}
                </span>
                <h2 className="text-xl font-bold text-white mt-2">
                  {type === 'product'
                    ? `[${enquiry.categoryCode}] ${enquiry.categoryTitle}`
                    : enquiry.serviceTitle}
                </h2>
                <p className="text-xs text-[#A9B4C0] mt-1 flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-gray-400" />
                  Received: {new Date(enquiry.createdAt).toLocaleString()}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/10"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Quick Status Pill */}
            <div className="bg-[#050608] p-4 rounded-xl border border-[#1F2937] flex items-center justify-between">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  Enquiry Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="bg-[#0D1117] border border-[#1F2937] text-sm text-white font-bold rounded-lg px-3 py-1.5 focus:border-[#8DC63F]"
                >
                  <option value="NEW">🟢 NEW (Unprocessed)</option>
                  <option value="CONTACTED">🟡 CONTACTED (In Progress)</option>
                  <option value="CLOSED">⚪ CLOSED (Resolved)</option>
                </select>
              </div>

              {saveSuccess && (
                <span className="text-xs text-[#8DC63F] font-semibold flex items-center gap-1 animate-pulse">
                  <CheckCircle2 className="w-4 h-4" /> Updated!
                </span>
              )}
            </div>

            {/* Contact Details */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 border-l-2 border-[#0B65B3] pl-2">
                Client Information
              </h3>
              <div className="bg-[#050608] p-4 rounded-xl border border-[#1F2937] space-y-2 text-sm">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-xs text-gray-400 block">Full Name:</span>
                    <span className="font-semibold text-white">{enquiry.name}</span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 block">Company:</span>
                    <span className="font-semibold text-white">{enquiry.company || 'N/A'}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#1F2937]">
                  <div>
                    <span className="text-xs text-gray-400 block">Phone:</span>
                    <a
                      href={`tel:${enquiry.phone}`}
                      className="text-[#8DC63F] font-semibold hover:underline flex items-center gap-1"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      {enquiry.phone}
                    </a>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 block">Email:</span>
                    <a
                      href={`mailto:${enquiry.email}`}
                      className="text-[#0B65B3] font-semibold hover:underline flex items-center gap-1 truncate"
                    >
                      <Mail className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{enquiry.email}</span>
                    </a>
                  </div>
                </div>

                {type === 'service' ? (
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#1F2937]">
                    <div>
                      <span className="text-xs text-gray-400 block">Emirate:</span>
                      <span className="font-semibold text-white">{enquiry.emirate}</span>
                    </div>
                    <div>
                      <span className="text-xs text-gray-400 block">Project Type:</span>
                      <span className="font-semibold text-white">{enquiry.projectType}</span>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#1F2937]">
                    <div>
                      <span className="text-xs text-gray-400 block">Quantity:</span>
                      <span className="font-semibold text-white">{enquiry.quantity || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-xs text-gray-400 block">Delivery Location:</span>
                      <span className="font-semibold text-white">{enquiry.deliveryLocation || 'N/A'}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Client Message */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 border-l-2 border-[#8DC63F] pl-2">
                Full Message & Requirements
              </h3>
              <div className="bg-[#050608] p-4 rounded-xl border border-[#1F2937] text-sm text-gray-200 whitespace-pre-wrap">
                {enquiry.message}
              </div>
            </div>

            {/* Source Page URL */}
            <div className="text-xs text-gray-400">
              <span className="block font-semibold mb-1">Source URL:</span>
              <a
                href={enquiry.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[#0B65B3] hover:underline flex items-center gap-1 truncate"
              >
                <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{enquiry.sourceUrl}</span>
              </a>
            </div>

            {/* Internal Notes Editor */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 border-l-2 border-[#F2C230] pl-2">
                Internal Admin Notes
              </h3>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Add internal follow-up notes, assigned engineer, or quotation status..."
                className="w-full bg-[#050608] border border-[#1F2937] rounded-xl px-3 py-2 text-xs text-white focus:border-[#8DC63F]"
              />
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="pt-6 border-t border-[#1F2937] flex items-center justify-between gap-4">
            {showConfirmDelete ? (
              <div className="flex items-center gap-2">
                <span className="text-xs text-red-400 font-semibold">Confirm delete?</span>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-lg"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={() => setShowConfirmDelete(false)}
                  className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white font-bold text-xs rounded-lg"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowConfirmDelete(true)}
                className="px-4 py-2 bg-red-950/60 border border-red-500/40 text-red-300 hover:bg-red-900/60 font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Delete Record
              </button>
            )}

            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2 bg-gradient-brand text-white font-bold text-sm rounded-full hover:opacity-90 transition-opacity flex items-center gap-2 pill-glow"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
