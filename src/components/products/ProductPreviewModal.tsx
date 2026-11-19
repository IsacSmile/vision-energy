'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { X, Send, CheckCircle2, AlertCircle, Loader2, Copy, Check, ArrowLeft, Phone } from 'lucide-react';
import { CategoryExplorerItem } from './ProductsExplorer';
import { getGroupIcon } from '@/lib/group-icons';
import { getCategoryPlaceholder } from '@/lib/utils/placeholders';
import { dictionary } from '@/lib/dictionary';

interface ProductPreviewModalProps {
  category: CategoryExplorerItem | null;
  isOpen: boolean;
  onClose: () => void;
  initialShowForm?: boolean;
}

export default function ProductPreviewModal({
  category,
  isOpen,
  onClose,
  initialShowForm = false,
}: ProductPreviewModalProps) {
  const [showEnquiryForm, setShowEnquiryForm] = useState(initialShowForm);
  const [submitting, setSubmitting] = useState(false);
  const [successRef, setSuccessRef] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('Dubai');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(true);
  const [honeypot, setHoneypot] = useState('');

  const scrollableRef = useRef<HTMLDivElement>(null);

  // Reset or initialize state when modal opens or category changes
  useEffect(() => {
    if (isOpen && category) {
      setShowEnquiryForm(initialShowForm);
      setSuccessRef(null);
      setServerError(null);
      setCopied(false);
      setMessage(
        `I would like to enquire about ${category.title} (${category.code}). Please share pricing, technical data sheets, and authority compliance documentation.`
      );
    }
  }, [isOpen, category, initialShowForm]);

  // Block background scroll on html and body when modal is open
  useEffect(() => {
    if (!isOpen) return;

    const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
    const originalBodyPosition = document.body.style.position;
    const originalBodyTop = document.body.style.top;
    const originalBodyWidth = document.body.style.width;
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.documentElement.classList.add('modal-open');
    document.body.classList.add('modal-open');
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.documentElement.classList.remove('modal-open');
      document.body.classList.remove('modal-open');
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.overflow = originalBodyOverflow;
      document.body.style.position = originalBodyPosition;
      document.body.style.top = originalBodyTop;
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = originalBodyWidth;
      window.scrollTo(0, scrollY);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !category) return null;

  const GroupIcon = getGroupIcon(category.group);
  const placeholder = getCategoryPlaceholder(category.group, category.groupLabel, category.title);
  const photoUrl = category.imageUrl || placeholder.imageUrl;
  const photoAlt = category.imageAlt || placeholder.imageAlt;
  const isPlaceholder = category.isPlaceholder ?? !category.imageUrl;

  const handleSubmitEnquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    // Basic frontend checks
    if (!fullName.trim() || fullName.trim().length < 2) {
      setServerError('Please enter your full name (at least 2 characters).');
      return;
    }
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email.trim())) {
      setServerError('Please enter a valid work email address.');
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 7) {
      setServerError('Please enter a valid phone number (at least 7 digits).');
      return;
    }
    if (!message.trim() || message.trim().length < 5) {
      setServerError('Please enter your requirement specifications (at least 5 characters).');
      return;
    }
    if (!consent) {
      setServerError('Please accept the privacy policy consent to proceed.');
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        name: fullName.trim(),
        company: company.trim() || undefined,
        phone: phone.trim(),
        email: email.trim(),
        categoryCode: category.code,
        categoryTitle: category.title,
        deliveryLocation: deliveryLocation || undefined,
        message: message.trim(),
        consent: true,
        sourceUrl: typeof window !== 'undefined' ? window.location.href : '/products',
        website: honeypot || undefined,
      };

      const res = await fetch('/api/enquiries/product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || 'Failed to submit enquiry. Please try again.');
      }

      setSuccessRef(json.reference || 'PRD-SUCCESS');
      // Scroll to top of content view
      if (scrollableRef.current) {
        scrollableRef.current.scrollTop = 0;
      }
    } catch (err: any) {
      setServerError(err.message || 'Network error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const copyReference = () => {
    if (!successRef) return;
    navigator.clipboard.writeText(successRef);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-preview-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 lg:p-8 animate-in fade-in duration-200"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Window */}
      <div
        className="relative w-full max-w-6xl max-h-[92vh] bg-[#0D1117] border border-[#1F2937] rounded-[24px] shadow-2xl flex flex-col lg:flex-row overflow-hidden z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button (Top Right Cross Icon) */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-40 w-10 h-10 rounded-full bg-[#050608]/90 hover:bg-[#1F2937] border border-white/15 text-white/80 hover:text-white flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#8DC63F] shadow-lg active-press"
          title="Close modal"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LEFT SIDE: Bigger Image Showcase Container */}
        <div className="relative w-full lg:w-[54%] xl:w-[56%] bg-[#161B22] border-b lg:border-b-0 lg:border-r border-[#1F2937] flex flex-col items-center justify-center shrink-0 min-h-[280px] sm:min-h-[380px] lg:min-h-[540px] p-2 sm:p-3 lg:p-4 overflow-hidden group">
          {/* Subtle Ambient Radial Highlight */}
          <div
            className="absolute inset-0 bg-radial-gradient from-[#0B65B3]/10 via-transparent to-transparent pointer-events-none"
            aria-hidden="true"
          />

          {/* Top Floating Badges */}
          <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 z-20 flex items-center gap-2 pointer-events-none">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#050608]/90 backdrop-blur-md border border-[#0B65B3]/40 text-[#8DC63F] flex items-center justify-center shadow-lg">
              <GroupIcon className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-[#050608]/90 backdrop-blur-md border border-white/15 shadow-lg">
              <span className="text-xs sm:text-[13px] font-bold text-[#8DC63F] tabular-nums tracking-wide">
                {category.code}
              </span>
            </div>
          </div>

          {/* Prominent Large Product Image */}
          <div className="relative w-full h-[280px] sm:h-[380px] lg:h-[480px] xl:h-[520px] flex items-center justify-center">
            <Image
              src={photoUrl}
              alt={photoAlt}
              fill
              className="object-contain transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 60vw"
              quality={95}
              priority
            />
          </div>

          {/* Bottom Sample Badge if placeholder */}
          {isPlaceholder && (
            <span className="absolute bottom-3 left-3 px-2 py-0.5 text-[10px] font-medium text-white/70 bg-[#050608]/90 backdrop-blur-md rounded border border-white/10 pointer-events-none">
              Sample image
            </span>
          )}
        </div>

        {/* RIGHT SIDE: Heading, Text Content & Requirement Form */}
        <div
          ref={scrollableRef}
          className="flex-1 flex flex-col overflow-y-auto max-h-[92vh] p-5 sm:p-7 lg:p-8 text-white modal-scrollable-content"
        >
          {successRef ? (
            /* SUCCESS STATE (Immediately shown after database insertion) */
            <div className="my-auto py-8 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-[#8DC63F]/15 border border-[#8DC63F]/40 text-[#8DC63F] flex items-center justify-center mx-auto shadow-[0_0_24px_rgba(141,198,63,0.3)]">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-xs uppercase tracking-wider text-[#8DC63F] font-bold">
                  Requirement Recorded
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  Enquiry Submitted Successfully!
                </h3>
                <p className="text-sm text-[#A9B4C0] max-w-md mx-auto leading-relaxed">
                  Your requirement for{' '}
                  <strong className="text-white">
                    [{category.code}] {category.title}
                  </strong>{' '}
                  has been submitted into our system. Our engineering technical team will review your specifications and contact you shortly.
                </p>
              </div>

              {/* Reference Number Box with 1-Click Copy */}
              <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#161B22] border border-[#1F2937] text-sm">
                <span className="text-xs text-[#A9B4C0]">Reference ID:</span>
                <span className="font-mono font-bold text-white tracking-wider">{successRef}</span>
                <button
                  type="button"
                  onClick={copyReference}
                  className="p-1.5 hover:bg-white/10 rounded text-[#8DC63F] transition-colors"
                  title="Copy reference code"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Done Button */}
              <div className="pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-8 py-3 rounded-xl bg-[#0B65B3] hover:bg-[#0c72ca] text-white font-bold text-sm border border-[#8DC63F]/50 transition-all shadow-lg active-press"
                >
                  Done / Close
                </button>
              </div>
            </div>
          ) : !showEnquiryForm ? (
            /* VIEW 1: PRODUCT DETAILS & BIG 'ENQUIRE NOW' BUTTON */
            <div className="space-y-6 my-auto">
              {/* Category Meta & Heading */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs uppercase tracking-wider text-[#8DC63F] font-bold">
                    {category.groupLabel}
                  </span>
                  <span className="text-white/30">·</span>
                  <span className="text-xs font-mono font-semibold text-[#CBD5E1]">
                    Code: {category.code}
                  </span>
                </div>

                <h2
                  id="product-preview-title"
                  className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-white leading-tight"
                >
                  {category.title}
                </h2>
              </div>

              {/* Full Text Content (Paragraphs) */}
              <div className="space-y-3 text-sm sm:text-[15px] text-[#CBD5E1] leading-relaxed border-t border-b border-white/[0.08] py-4">
                <p>{category.description}</p>
              </div>

              {/* Product Families (What's Included) */}
              {category.productFamilies.length > 0 && (
                <div className="space-y-2.5">
                  <h3 className="text-xs uppercase tracking-wider font-bold text-[#8DC63F]">
                    What's Included / Product Scope:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.productFamilies.map((fam, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#161B22] border border-[#1F2937] text-xs sm:text-[13px] text-white/90"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#8DC63F] shrink-0" />
                        <span>{fam}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Verified Engineering Badges */}
              <div className="grid grid-cols-2 gap-2 text-xs text-[#A9B4C0] pt-1">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8DC63F]" />
                  <span>Authority NOC Compliance Ready</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8DC63F]" />
                  <span>Full Technical Submittals &amp; CAD</span>
                </div>
              </div>

              {/* Enquire Now Call to Action */}
              <div className="pt-4 space-y-3">
                <button
                  type="button"
                  onClick={() => setShowEnquiryForm(true)}
                  className="w-full h-12 sm:h-13 py-3 px-6 rounded-xl bg-[#0B65B3] hover:bg-[#0c72ca] border border-[#8DC63F]/50 hover:border-[#8DC63F] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-[0_0_20px_rgba(11,101,179,0.35)] transition-all duration-200 active-press"
                >
                  <Send className="w-4 h-4 text-[#8DC63F] -rotate-45" />
                  <span>Enquire Now for {category.code}</span>
                </button>

                <div className="flex items-center justify-between text-xs text-[#A9B4C0] px-1">
                  <span>Fast response within 24 hours</span>
                  <a
                    href="tel:+971501234567"
                    className="inline-flex items-center gap-1.5 text-[#8DC63F] hover:underline font-semibold"
                  >
                    <Phone className="w-3 h-3" />
                    <span>Call: +971 50 123 4567</span>
                  </a>
                </div>
              </div>
            </div>
          ) : (
            /* VIEW 2: REQUIREMENT SUBMISSION FORM (Submits to DB & shows in Admin Panel) */
            <form onSubmit={handleSubmitEnquiry} className="space-y-4 my-auto">
              {/* Form Navigation Header */}
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#8DC63F] font-bold block">
                    Submit Requirement
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
                    {category.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowEnquiryForm(false)}
                  className="inline-flex items-center gap-1 text-xs text-[#A9B4C0] hover:text-[#8DC63F] transition-colors font-medium p-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to details</span>
                </button>
              </div>

              {serverError && (
                <div
                  role="alert"
                  className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2"
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{serverError}</span>
                </div>
              )}

              {/* Form Input Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-[#CBD5E1] mb-1">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Ahmed Al Mansoori"
                    className="w-full h-10 px-3.5 rounded-lg bg-[#161B22] border border-[#1F2937] focus:border-[#8DC63F] text-white text-xs sm:text-sm focus:outline-none transition-colors"
                  />
                </div>

                {/* Work Email */}
                <div>
                  <label className="block text-xs font-semibold text-[#CBD5E1] mb-1">
                    Work Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. name@company.ae"
                    className="w-full h-10 px-3.5 rounded-lg bg-[#161B22] border border-[#1F2937] focus:border-[#8DC63F] text-white text-xs sm:text-sm focus:outline-none transition-colors"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-semibold text-[#CBD5E1] mb-1">
                    Phone / Mobile <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +971 50 123 4567"
                    className="w-full h-10 px-3.5 rounded-lg bg-[#161B22] border border-[#1F2937] focus:border-[#8DC63F] text-white text-xs sm:text-sm focus:outline-none transition-colors"
                  />
                </div>

                {/* Company Name */}
                <div>
                  <label className="block text-xs font-semibold text-[#CBD5E1] mb-1">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. MEP Contracting LLC"
                    className="w-full h-10 px-3.5 rounded-lg bg-[#161B22] border border-[#1F2937] focus:border-[#8DC63F] text-white text-xs sm:text-sm focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Delivery / Project Location Dropdown */}
              <div>
                <label className="block text-xs font-semibold text-[#CBD5E1] mb-1">
                  Project Emirate / Delivery Location
                </label>
                <select
                  value={deliveryLocation}
                  onChange={(e) => setDeliveryLocation(e.target.value)}
                  className="w-full h-10 px-3.5 rounded-lg bg-[#161B22] border border-[#1F2937] focus:border-[#8DC63F] text-white text-xs sm:text-sm focus:outline-none transition-colors"
                >
                  {dictionary.emirates.map((em) => (
                    <option key={em} value={em} className="bg-[#0D1117] text-white">
                      {em}
                    </option>
                  ))}
                </select>
              </div>

              {/* Requirement Details */}
              <div>
                <label className="block text-xs font-semibold text-[#CBD5E1] mb-1">
                  Requirement Details &amp; Specifications <span className="text-red-400">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Specify quantities, delivery timelines, project drawing details or BOQ requirements..."
                  className="w-full p-3 rounded-lg bg-[#161B22] border border-[#1F2937] focus:border-[#8DC63F] text-white text-xs sm:text-sm focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Anti-spam honeypot (hidden from real users) */}
              <input
                type="text"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                className="sr-only"
                aria-hidden="true"
              />

              {/* Privacy Consent */}
              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="modal-privacy-consent"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 rounded border-[#1F2937] bg-[#161B22] text-[#8DC63F] focus:ring-[#8DC63F]"
                />
                <label htmlFor="modal-privacy-consent" className="text-[11px] text-[#A9B4C0]">
                  I consent to Vision Energy processing this project requirement in accordance with the{' '}
                  <span className="text-white/80">Privacy Policy</span>.
                </label>
              </div>

              {/* Form Submission Buttons */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 h-11 px-5 rounded-xl bg-[#0B65B3] hover:bg-[#0c72ca] border border-[#8DC63F]/50 hover:border-[#8DC63F] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_0_18px_rgba(11,101,179,0.3)] transition-all disabled:opacity-50 active-press"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving to Database...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-[#8DC63F] -rotate-45" />
                      <span>Submit Requirement</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setShowEnquiryForm(false)}
                  className="px-4 h-11 rounded-xl bg-transparent hover:bg-white/5 border border-white/10 text-xs font-semibold text-[#CBD5E1] transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

