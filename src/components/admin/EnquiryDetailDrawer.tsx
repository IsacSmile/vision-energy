'use client';

import React, { useState, useEffect } from 'react';
import { X, Phone, Mail, ExternalLink, Trash2, Save, CheckCircle2, Clock, ArrowLeft, Building2, MapPin, Package } from 'lucide-react';

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
        setTimeout(() => setSaveSuccess(false), 2500);
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

  const statusOptions = [
    { value: 'NEW', label: 'New', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' },
    { value: 'CONTACTED', label: 'In Progress', color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' },
    { value: 'CLOSED', label: 'Closed', color: 'text-gray-400 bg-gray-500/10 border-gray-500/30' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Background click to close */}
      <div className="hidden lg:block absolute inset-0" onClick={onClose} />

      {/* Drawer */}
      <div className="absolute inset-0 lg:inset-y-0 lg:left-auto lg:right-0 lg:w-screen lg:max-w-lg bg-[#0D1117] border-l border-white/10 text-white p-5 sm:p-6 flex flex-col justify-between overflow-y-auto shadow-2xl pt-safe pb-safe">
        {/* Main Content */}
        <div className="space-y-5">
          {/* Header */}
          <div className="flex items-start justify-between border-b border-white/10 pb-4 gap-3">
            <div className="space-y-1.5 min-w-0">
              <div className="flex items-center gap-2">
                <button
                  onClick={onClose}
                  className="lg:hidden p-1.5 text-gray-400 hover:text-white rounded-lg bg-white/5"
                  aria-label="Back"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <span className="text-[11px] font-mono font-bold text-[#8DC63F] bg-[#8DC63F]/10 px-2 py-0.5 rounded border border-[#8DC63F]/30">
                  {enquiry.reference}
                </span>
                <span className="text-[11px] text-gray-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {new Date(enquiry.createdAt).toLocaleDateString()} {new Date(enquiry.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug truncate">
                {type === 'product'
                  ? `${enquiry.categoryCode ? `[${enquiry.categoryCode}] ` : ''}${enquiry.categoryTitle}`
                  : enquiry.serviceTitle}
              </h2>
            </div>

            <button
              onClick={onClose}
              className="hidden lg:flex p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors shrink-0"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Status Segmented Control */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Status</span>
              {saveSuccess && (
                <span className="text-xs text-[#8DC63F] font-semibold flex items-center gap-1 animate-pulse">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Saved
                </span>
              )}
            </div>
            <div className="grid grid-cols-3 gap-2 bg-[#050608] p-1.5 rounded-xl border border-white/10">
              {statusOptions.map((opt) => {
                const isActive = status === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setStatus(opt.value)}
                    className={`py-2 px-3 rounded-lg text-xs font-bold transition-all text-center ${
                      isActive
                        ? `${opt.color} border shadow-sm`
                        : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Client Info Card */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Contact</span>
            <div className="bg-[#050608] p-4 rounded-xl border border-white/10 space-y-3">
              {/* Name & Company */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-bold text-white">{enquiry.name}</span>
                {enquiry.company && enquiry.company !== 'N/A' && (
                  <span className="text-xs text-gray-400 bg-white/5 px-2 py-0.5 rounded border border-white/10 flex items-center gap-1">
                    <Building2 className="w-3 h-3 text-gray-400" />
                    <span className="truncate max-w-[140px]">{enquiry.company}</span>
                  </span>
                )}
              </div>

              {/* Direct Action Chips */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-white/10">
                <a
                  href={`tel:${enquiry.phone}`}
                  className="flex items-center gap-2 px-3 py-2 bg-white/[0.03] hover:bg-[#8DC63F]/10 border border-white/10 hover:border-[#8DC63F]/40 rounded-lg text-xs text-gray-200 hover:text-[#8DC63F] font-semibold transition-colors truncate"
                >
                  <Phone className="w-3.5 h-3.5 text-[#8DC63F] shrink-0" />
                  <span className="truncate">{enquiry.phone}</span>
                </a>

                <a
                  href={`mailto:${enquiry.email}`}
                  className="flex items-center gap-2 px-3 py-2 bg-white/[0.03] hover:bg-[#0B65B3]/10 border border-white/10 hover:border-[#0B65B3]/40 rounded-lg text-xs text-gray-200 hover:text-[#0B65B3] font-semibold transition-colors truncate"
                >
                  <Mail className="w-3.5 h-3.5 text-[#0B65B3] shrink-0" />
                  <span className="truncate">{enquiry.email}</span>
                </a>
              </div>

              {/* Specific Metadata */}
              {type === 'service' ? (
                (enquiry.emirate || enquiry.projectType) && (
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-xs text-gray-300">
                    {enquiry.emirate && (
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        <span className="truncate">{enquiry.emirate}</span>
                      </div>
                    )}
                    {enquiry.projectType && (
                      <div className="truncate text-gray-400 text-right">
                        {enquiry.projectType}
                      </div>
                    )}
                  </div>
                )
              ) : (
                ((enquiry.quantity && enquiry.quantity !== 'N/A') || (enquiry.deliveryLocation && enquiry.deliveryLocation !== 'N/A')) && (
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-xs text-gray-300">
                    {enquiry.quantity && enquiry.quantity !== 'N/A' && (
                      <div className="flex items-center gap-1.5">
                        <Package className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        <span>Qty: <strong className="text-white">{enquiry.quantity}</strong></span>
                      </div>
                    )}
                    {enquiry.deliveryLocation && enquiry.deliveryLocation !== 'N/A' && (
                      <div className="flex items-center gap-1.5 text-right justify-end">
                        <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        <span className="truncate">{enquiry.deliveryLocation}</span>
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
          </div>

          {/* Message */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Message</span>
              {enquiry.sourceUrl && (
                <a
                  href={enquiry.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-[#0B65B3] hover:text-[#8DC63F] flex items-center gap-1 transition-colors"
                >
                  <span>Source page</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
            <div className="bg-[#050608] p-3.5 rounded-xl border border-white/10 text-xs text-gray-200 whitespace-pre-wrap leading-relaxed min-h-[64px]">
              {enquiry.message || 'No message provided.'}
            </div>
          </div>

          {/* Admin Notes */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Internal Notes</span>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              placeholder="Add follow-up notes or assignment..."
              className="w-full bg-[#050608] border border-white/10 focus:border-[#8DC63F] rounded-xl p-3 text-xs text-white resize-none outline-none leading-relaxed placeholder:text-gray-600"
            />
          </div>
        </div>

        {/* Bottom Action Footer */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3 mt-4">
          {showConfirmDelete ? (
            <div className="flex items-center gap-2">
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-lg min-h-[38px] transition-colors"
              >
                {deleting ? 'Deleting...' : 'Confirm'}
              </button>
              <button
                onClick={() => setShowConfirmDelete(false)}
                className="px-3 py-2 bg-white/10 hover:bg-white/15 text-gray-300 text-xs rounded-lg min-h-[38px] transition-colors"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowConfirmDelete(true)}
              className="px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors min-h-[38px]"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete</span>
            </button>
          )}

          <button
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2 bg-[#8DC63F] hover:bg-[#9fe046] text-[#050608] font-bold text-xs rounded-xl transition-all shadow-md shadow-[#8DC63F]/10 flex items-center gap-1.5 min-h-[38px]"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{saving ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
