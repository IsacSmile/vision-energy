'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  X,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Copy,
  Check,
  ArrowLeft,
  ZoomIn,
  ZoomOut,
  ShieldCheck,
  FileText,
  PackageCheck,
  SlidersHorizontal,
} from 'lucide-react';
import { FaPhoneIcon } from '@/components/ui/FaIcons';
import { CategoryExplorerItem } from './ProductsExplorer';
import { getGroupIcon } from '@/lib/group-icons';
import { getCategoryPlaceholder } from '@/lib/utils/placeholders';
import { dictionary } from '@/lib/dictionary';
import { trackConversion } from '@/lib/analytics';

const PRODUCT_PREVIEW_HIGHLIGHTS = [
  {
    text: 'Complies with applicable international standards and local authority regulations.',
    icon: ShieldCheck,
    accent: 'blue' as const,
  },
  {
    text: 'Technical datasheets and CAD drawings available on request.',
    icon: FileText,
    accent: 'green' as const,
  },
  {
    text: 'Available ex-stock, subject to prior sale.',
    icon: PackageCheck,
    accent: 'green' as const,
  },
  {
    text: 'Customisation available on request, subject to manufacturer approval and lead times.',
    icon: SlidersHorizontal,
    accent: 'blue' as const,
  },
] as const;

const ZOOM_FACTOR = 2.5;
const LENS_RATIO = 1 / ZOOM_FACTOR; // 0.40 => 40% lens matches 2.5x viewport

interface ProductPreviewModalProps {
  category: CategoryExplorerItem | null;
  isOpen: boolean;
  onClose: () => void;
  initialShowForm?: boolean;
}

function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val));
}

export default function ProductPreviewModal({
  category,
  isOpen,
  onClose,
  initialShowForm = false,
}: ProductPreviewModalProps) {
  if (!isOpen || !category) return null;

  return (
    <ProductPreviewDialog
      key={`${category.code}:${initialShowForm ? 'form' : 'view'}`}
      category={category}
      onClose={onClose}
      initialShowForm={initialShowForm}
    />
  );
}

function ProductPreviewDialog({
  category,
  onClose,
  initialShowForm,
}: {
  category: CategoryExplorerItem;
  onClose: () => void;
  initialShowForm: boolean;
}) {
  const router = useRouter();
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
  const [message, setMessage] = useState(
    () =>
      `I would like to enquire about ${category.title} (${category.code}). Please share pricing, technical data sheets, and authority compliance documentation.`
  );
  const [consent, setConsent] = useState(true);
  const [honeypot, setHoneypot] = useState('');

  // Flipkart-style interactive magnifier state
  const stageRef = useRef<HTMLDivElement>(null);
  const [isDesktopHovering, setIsDesktopHovering] = useState(false);
  const [isMobileZoomed, setIsMobileZoomed] = useState(false);
  // lensOrigin: normalized top-left of lens inside [0, 1 - LENS_RATIO]
  const [lensPos, setLensPos] = useState({ leftFrac: 0.3, topFrac: 0.3 });

  const scrollableRef = useRef<HTMLDivElement>(null);

  // Block background scroll on html and body when modal is open
  useEffect(() => {
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
  }, [onClose]);

  const updateLensFromClientXY = useCallback((clientX: number, clientY: number) => {
    const el = stageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;

    const relX = (clientX - rect.left) / rect.width;
    const relY = (clientY - rect.top) / rect.height;

    const maxFrac = 1 - LENS_RATIO;
    const leftFrac = clamp(relX - LENS_RATIO / 2, 0, maxFrac);
    const topFrac = clamp(relY - LENS_RATIO / 2, 0, maxFrac);

    setLensPos({ leftFrac, topFrac });
  }, []);

  const handleStageMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (typeof window !== 'undefined' && window.innerWidth < 1024) return;
      updateLensFromClientXY(e.clientX, e.clientY);
      setIsDesktopHovering(true);
    },
    [updateLensFromClientXY]
  );

  const handleStageMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (typeof window !== 'undefined' && window.innerWidth < 1024) return;
      if (!isDesktopHovering) setIsDesktopHovering(true);
      updateLensFromClientXY(e.clientX, e.clientY);
    },
    [isDesktopHovering, updateLensFromClientXY]
  );

  const handleStageMouseLeave = useCallback(() => {
    setIsDesktopHovering(false);
  }, []);

  const handleStageClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (typeof window === 'undefined' || window.innerWidth >= 1024) return;
      if (!isMobileZoomed) {
        updateLensFromClientXY(e.clientX, e.clientY);
        setIsMobileZoomed(true);
      } else {
        setIsMobileZoomed(false);
      }
    },
    [isMobileZoomed, updateLensFromClientXY]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (!isMobileZoomed || e.touches.length === 0) return;
      const t = e.touches[0];
      updateLensFromClientXY(t.clientX, t.clientY);
    },
    [isMobileZoomed, updateLensFromClientXY]
  );

  const placeholder = getCategoryPlaceholder(category.group, category.groupLabel, category.title);
  const photoUrl = category.imageUrl || placeholder.imageUrl;
  const photoAlt = category.imageAlt || placeholder.imageAlt;
  const isPlaceholder = category.isPlaceholder ?? !category.imageUrl;

  const handleSubmitEnquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

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

      const refCode = String(json.reference || 'PRD-SUCCESS');
      trackConversion('enquiry_submit', {
        form: 'product_preview_modal',
        ref: refCode,
        category: category.code,
        location: deliveryLocation || '',
      });
      setSuccessRef(refCode);
      onClose();
      router.push(`/thank-you?ref=${encodeURIComponent(refCode)}&type=product`);
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : 'Network error occurred. Please try again.';
      setServerError(errMsg);
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
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-5 lg:p-8 animate-in fade-in duration-200"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/75 dark:bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Window */}
      <div
        className="relative w-full max-w-6xl max-h-[92vh] bg-white dark:bg-[#0B0F17] border border-slate-200/90 dark:border-white/12 rounded-[24px] shadow-[0_25px_70px_-15px_rgba(10,25,47,0.35)] dark:shadow-[0_25px_70px_-15px_rgba(0,0,0,0.85)] flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden z-10 modal-scrollable-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top-Right Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="sticky lg:absolute top-3.5 right-3.5 sm:top-4 sm:right-4 self-end shrink-0 z-50 -mb-10 lg:mb-0 mr-3.5 lg:mr-0 mt-3.5 lg:mt-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 dark:bg-[#131B29]/95 hover:bg-slate-100 dark:hover:bg-[#1E293B] border border-slate-200/90 dark:border-white/15 text-[#0A192F] dark:text-white flex items-center justify-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B65B3] shadow-sm active:scale-95 cursor-pointer"
          title="Close modal"
          aria-label="Close modal"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* LEFT COLUMN: Premium Studio Showcase + Flipkart-Style Hover Lens */}
        <div className="relative w-full lg:w-[48%] xl:w-[49%] bg-gradient-to-br from-[#F4F8FC] via-[#F8FAFC] to-[#EBF2FA] dark:from-[#0E1523] dark:via-[#0A0F1A] dark:to-[#070B12] border-b lg:border-b-0 lg:border-r border-slate-200/90 dark:border-white/10 flex flex-col justify-between shrink-0 p-4 sm:p-5 lg:p-6 gap-3.5 sm:gap-4">
          {/* Structured Studio Meta Bar (replaces awkward corner floats) */}
          <div className="flex items-center justify-between gap-2 pr-12 lg:pr-0">
            <div className="inline-flex items-center gap-2 min-w-0">
              <span className="w-8 h-8 rounded-lg bg-white dark:bg-[#131B29] border border-slate-200/90 dark:border-white/15 text-[#0B65B3] dark:text-[#8DC63F] flex items-center justify-center shrink-0 shadow-xs">
                {React.createElement(getGroupIcon(category.group), {
                  className: 'w-4 h-4',
                  'aria-hidden': true,
                })}
              </span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-white dark:bg-[#131B29] border border-slate-200/90 dark:border-white/15 text-xs font-mono font-bold text-[#0A192F] dark:text-[#8DC63F] tracking-wide shadow-xs">
                {category.code}
              </span>
            </div>

            {/* Interactive Zoom Hint / Mobile Toggle */}
            <button
              type="button"
              onClick={() => {
                if (typeof window !== 'undefined' && window.innerWidth < 1024) {
                  setIsMobileZoomed((z) => !z);
                }
              }}
              aria-label={isMobileZoomed ? 'Reset image zoom' : 'Zoom product image'}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 dark:bg-[#131B29]/90 border border-slate-200/90 dark:border-white/15 text-[11px] font-semibold text-[#0B65B3] dark:text-[#60A5FA] shadow-xs lg:cursor-default"
            >
              {isMobileZoomed ? (
                <>
                  <ZoomOut className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span className="lg:hidden">Reset Zoom</span>
                </>
              ) : (
                <>
                  <ZoomIn className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span className="hidden lg:inline">Hover image to zoom</span>
                  <span className="lg:hidden">Tap to zoom</span>
                </>
              )}
            </button>
          </div>

          {/* Framed Product Showcase Stage (Interactive Hover Lens Target) */}
          <div className="relative flex-1 flex items-center justify-center">
            <div
              ref={stageRef}
              data-testid="product-zoom-stage"
              onMouseEnter={handleStageMouseEnter}
              onMouseMove={handleStageMouseMove}
              onMouseLeave={handleStageMouseLeave}
              onClick={handleStageClick}
              onTouchMove={handleTouchMove}
              className={`relative w-full aspect-video rounded-2xl overflow-hidden bg-[#060910] border border-slate-200/90 dark:border-white/15 shadow-[0_14px_34px_-10px_rgba(10,25,47,0.28)] dark:shadow-[0_18px_40px_-10px_rgba(0,0,0,0.7)] select-none ${
                isMobileZoomed ? 'cursor-zoom-out' : 'lg:cursor-crosshair cursor-zoom-in'
              }`}
            >
              {/* Base Product Photo or Interactive Mobile Inline Zoom */}
              <div
                className="relative w-full h-full transition-transform duration-150 ease-out"
                style={
                  isMobileZoomed
                    ? {
                        width: `${ZOOM_FACTOR * 100}%`,
                        height: `${ZOOM_FACTOR * 100}%`,
                        transform: `translate3d(-${lensPos.leftFrac * 100}%, -${lensPos.topFrac * 100}%, 0)`,
                      }
                    : undefined
                }
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photoUrl}
                  alt={photoAlt}
                  loading="eager"
                  decoding="async"
                  draggable={false}
                  className="w-full h-full object-contain pointer-events-none select-none"
                />
              </div>

              {/* Flipkart-Style Tracking Lens Overlay (Desktop Hover Only) */}
              {isDesktopHovering && (
                <div
                  data-testid="product-zoom-lens"
                  aria-hidden="true"
                  className="hidden lg:block pointer-events-none absolute z-20 rounded-lg border-2 border-[#0B65B3] bg-[#0B65B3]/18 shadow-[0_0_0_9999px_rgba(5,9,17,0.34),inset_0_0_0_1px_rgba(141,198,63,0.7)] backdrop-brightness-110 transition-none"
                  style={{
                    width: `${LENS_RATIO * 100}%`,
                    height: `${LENS_RATIO * 100}%`,
                    left: `${lensPos.leftFrac * 100}%`,
                    top: `${lensPos.topFrac * 100}%`,
                  }}
                >
                  {/* Crisp center reticle crosshair */}
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border border-[#8DC63F] bg-[#0B65B3]/60" />
                </div>
              )}

              {/* Subtle Placeholder Badge */}
              {isPlaceholder && (
                <span className="absolute bottom-2.5 left-2.5 z-20 px-2 py-0.5 text-[10px] font-medium text-white/80 bg-black/75 backdrop-blur-md rounded border border-white/15 pointer-events-none">
                  Sample image
                </span>
              )}
            </div>
          </div>

          {/* Crisp Left Studio Footer Trust Strip */}
          <div className="hidden sm:grid grid-cols-3 gap-2 pt-0.5">
            <div className="rounded-xl bg-white/85 dark:bg-[#131B29]/90 border border-slate-200/80 dark:border-white/10 px-3 py-2">
              <div className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#5B8C1E] dark:text-[#8DC63F]">
                Inspection
              </div>
              <div className="text-xs font-semibold text-[#0A192F] dark:text-white truncate">
                {ZOOM_FACTOR}× Lens View
              </div>
            </div>
            <div className="rounded-xl bg-white/85 dark:bg-[#131B29]/90 border border-slate-200/80 dark:border-white/10 px-3 py-2">
              <div className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#0B65B3] dark:text-[#60A5FA]">
                Submittals
              </div>
              <div className="text-xs font-semibold text-[#0A192F] dark:text-white truncate">
                CAD &amp; Datasheets
              </div>
            </div>
            <div className="rounded-xl bg-white/85 dark:bg-[#131B29]/90 border border-slate-200/80 dark:border-white/10 px-3 py-2">
              <div className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#0B65B3] dark:text-[#60A5FA]">
                Region
              </div>
              <div className="text-xs font-semibold text-[#0A192F] dark:text-white truncate">
                UAE &amp; Qatar Supply
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Non-scrolling host for fixed Flipkart Zoom Portal + scrollable detail body */}
        <div className="relative flex-1 min-w-0 flex flex-col lg:overflow-hidden bg-white dark:bg-[#0B0F17] text-[#0A192F] dark:text-white">
          {/* FLIPKART-STYLE FLOATING ZOOM VIEWPORT (Fixed over Right Column on Desktop Hover) */}
          {isDesktopHovering && (
            <div
              data-testid="product-zoom-portal"
              data-preserve-contrast="true"
              aria-hidden="true"
              className="hidden lg:flex flex-col justify-between absolute inset-3 z-40 rounded-2xl bg-[#070B12] border border-[#0B65B3]/45 shadow-[0_24px_60px_-10px_rgba(10,25,47,0.45)] overflow-hidden p-4 animate-in fade-in duration-100 pointer-events-none"
            >
              <div className="flex items-center justify-between gap-3 pb-2.5 pr-12 border-b border-white/10">
                <div className="inline-flex items-center gap-2 min-w-0">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#0B65B3] text-white text-[11px] font-bold">
                    <ZoomIn className="w-3 h-3 text-[#8DC63F]" />
                    <span>{ZOOM_FACTOR}× Magnified Detail</span>
                  </span>
                  <span className="text-xs font-medium text-slate-300 truncate">
                    {category.title}
                  </span>
                </div>
                <span className="text-[11px] font-mono font-bold text-[#8DC63F] shrink-0">
                  {category.code}
                </span>
              </div>

              <div className="relative flex-1 flex items-center justify-center my-2">
                <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-[#05080E] border border-white/15">
                  <div
                    className="relative will-change-transform"
                    style={{
                      width: `${ZOOM_FACTOR * 100}%`,
                      height: `${ZOOM_FACTOR * 100}%`,
                      transform: `translate3d(-${lensPos.leftFrac * 100}%, -${lensPos.topFrac * 100}%, 0)`,
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={photoUrl}
                      alt={photoAlt}
                      className="w-full h-full object-contain select-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-white/10">
                <span>Move pointer across the showcase frame to inspect hardware finish</span>
                <span className="font-mono text-[#8DC63F]">Live Loupe Active</span>
              </div>
            </div>
          )}

          <div
            ref={scrollableRef}
            className="flex-1 min-h-0 flex flex-col lg:overflow-y-auto p-5 sm:p-6 lg:p-7 modal-scrollable-content"
          >

          {successRef ? (
            /* SUCCESS STATE */
            <div className="my-auto py-8 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-[#8DC63F]/15 border border-[#8DC63F]/40 text-[#5B8C1E] dark:text-[#8DC63F] flex items-center justify-center mx-auto shadow-[0_0_24px_rgba(141,198,63,0.25)]">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-xs uppercase tracking-wider text-[#5B8C1E] dark:text-[#8DC63F] font-bold">
                  Requirement Recorded
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#0A192F] dark:text-white">
                  Enquiry Submitted Successfully!
                </h3>
                <p className="text-sm text-[#475569] dark:text-[#A9B4C0] max-w-md mx-auto leading-relaxed">
                  Your requirement for{' '}
                  <strong className="text-[#0A192F] dark:text-white">
                    [{category.code}] {category.title}
                  </strong>{' '}
                  has been submitted into our system. Our engineering technical team will review your specifications and contact you shortly.
                </p>
              </div>

              <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#131B29] border border-slate-200 dark:border-white/10 text-sm">
                <span className="text-xs text-[#475569] dark:text-[#A9B4C0]">Reference ID:</span>
                <span className="font-mono font-bold text-[#0A192F] dark:text-white tracking-wider">
                  {successRef}
                </span>
                <button
                  type="button"
                  onClick={copyReference}
                  className="p-1.5 hover:bg-slate-200/70 dark:hover:bg-white/10 rounded text-[#0B65B3] dark:text-[#8DC63F] transition-colors"
                  title="Copy reference code"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  data-preserve-contrast="true"
                  className="px-8 py-3 rounded-xl bg-[#0B65B3] hover:bg-[#084c88] text-white font-bold text-sm border border-[#8DC63F]/60 transition-all shadow-lg active:scale-[0.99] cursor-pointer"
                >
                  Done / Close
                </button>
              </div>
            </div>
          ) : !showEnquiryForm ? (
            /* VIEW 1: PREMIUM PRODUCT DETAILS */
            <div className="space-y-4 sm:space-y-5 my-auto">
              {/* Category Header */}
              <div className="pr-8 sm:pr-10 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#8DC63F]/15 dark:bg-[#8DC63F]/20 text-[11px] font-bold uppercase tracking-[0.1em] text-[#3F6E0C] dark:text-[#8DC63F]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#689F1B] dark:bg-[#8DC63F]" />
                    {category.groupLabel}
                  </span>
                  <span className="text-xs font-mono font-semibold text-[#475569] dark:text-[#CBD5E1] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/[0.06] border border-slate-200/80 dark:border-white/10">
                    Code: {category.code}
                  </span>
                </div>

                <h2
                  id="product-preview-title"
                  className="text-2xl sm:text-[28px] font-bold text-[#0A192F] dark:text-white leading-[1.18] tracking-[-0.02em]"
                >
                  {category.title}
                </h2>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-[15px] text-[#334155] dark:text-[#CBD5E1] leading-[1.65] border-y border-slate-200/80 dark:border-white/10 py-3.5">
                {category.description}
              </p>

              {/* Product Scope Chips */}
              {category.productFamilies.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-[11px] uppercase tracking-[0.12em] font-bold text-[#5B8C1E] dark:text-[#8DC63F]">
                    What&apos;s Included / Product Scope
                  </h3>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {category.productFamilies.map((fam, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-white/[0.04] border border-slate-200/90 dark:border-white/10 text-xs font-medium text-[#0A192F] dark:text-slate-100"
                      >
                        <CheckCircle2
                          className="w-3.5 h-3.5 text-[#689F1B] dark:text-[#8DC63F] shrink-0"
                          aria-hidden="true"
                        />
                        <span>{fam}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Engineering Standards, Documentation & Supply Highlights (Exact Verbatim Text, Premium 2x2 Grid) */}
              <div className="space-y-2 pt-0.5">
                <h3 className="text-[11px] uppercase tracking-[0.12em] font-bold text-[#0B65B3] dark:text-[#60A5FA]">
                  Standards &amp; Supply Assurances
                </h3>
                <ul
                  aria-label="Standards and supply assurances"
                  className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 list-none"
                >
                  {PRODUCT_PREVIEW_HIGHLIGHTS.map(({ text, icon: Icon, accent }) => (
                    <li
                      key={text}
                      className="group/item relative overflow-hidden flex items-start gap-2.5 p-3 rounded-xl bg-slate-50/90 dark:bg-white/[0.03] border border-slate-200/90 dark:border-white/10 hover:border-[#0B65B3]/45 dark:hover:border-[#8DC63F]/45 transition-colors"
                    >
                      <span
                        aria-hidden="true"
                        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border ${
                          accent === 'blue'
                            ? 'bg-[#0B65B3]/10 dark:bg-[#0B65B3]/25 border-[#0B65B3]/20 dark:border-[#0B65B3]/40 text-[#0B65B3] dark:text-[#60A5FA]'
                            : 'bg-[#8DC63F]/15 dark:bg-[#8DC63F]/15 border-[#8DC63F]/30 dark:border-[#8DC63F]/35 text-[#4D7E10] dark:text-[#8DC63F]'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </span>
                      <span className="min-w-0 text-xs font-medium text-[#1E293B] dark:text-[#E2E8F0] leading-[1.45]">
                        {text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Primary CTA & Support Meta */}
              <div className="pt-2 space-y-3">
                <button
                  type="button"
                  onClick={() => setShowEnquiryForm(true)}
                  data-preserve-contrast="true"
                  className="w-full h-12 sm:h-[52px] py-3 px-6 rounded-xl bg-[linear-gradient(135deg,#0B65B3_0%,#095292_100%)] hover:bg-[linear-gradient(135deg,#095292_0%,#074175_100%)] border border-[#8DC63F]/60 hover:border-[#8DC63F] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-[0_10px_24px_-6px_rgba(11,101,179,0.45)] transition-all duration-200 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] cursor-pointer"
                  style={{ color: '#FFFFFF' }}
                >
                  <Send className="w-4 h-4 text-[#8DC63F] -rotate-45 shrink-0" aria-hidden="true" />
                  <span style={{ color: '#FFFFFF' }}>Enquire Now for {category.code}</span>
                </button>

                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#475569] dark:text-[#A9B4C0] px-0.5">
                  <span className="inline-flex items-center gap-1.5 font-medium">
                    <span className="w-2 h-2 rounded-full bg-[#8DC63F]" aria-hidden="true" />
                    Fast response within 24 hours
                  </span>
                  <a
                    href="tel:+97172042763"
                    className="inline-flex items-center gap-1.5 text-[#0B65B3] dark:text-[#8DC63F] hover:underline font-bold"
                  >
                    <FaPhoneIcon className="w-3 h-3" />
                    <span>Call: +971 7 204 2763</span>
                  </a>
                </div>
              </div>
            </div>
          ) : (
            /* VIEW 2: REQUIREMENT SUBMISSION FORM */
            <form onSubmit={handleSubmitEnquiry} className="space-y-4 my-auto">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3 pr-8 sm:pr-10">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#5B8C1E] dark:text-[#8DC63F] font-bold block">
                    Submit Requirement
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-[#0A192F] dark:text-white leading-snug">
                    {category.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowEnquiryForm(false)}
                  className="inline-flex items-center gap-1 whitespace-nowrap shrink-0 text-xs text-[#475569] dark:text-[#A9B4C0] hover:text-[#0B65B3] dark:hover:text-[#8DC63F] transition-colors font-semibold p-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to details</span>
                </button>
              </div>

              {serverError && (
                <div
                  role="alert"
                  className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs flex items-center gap-2"
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{serverError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-[#1E293B] dark:text-[#CBD5E1] mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Ahmed Al Mansoori"
                    className="w-full h-10 px-3.5 rounded-lg bg-slate-50 dark:bg-[#131B29] border border-slate-200 dark:border-white/15 focus:border-[#0B65B3] dark:focus:border-[#8DC63F] text-[#0A192F] dark:text-white text-xs sm:text-sm focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1E293B] dark:text-[#CBD5E1] mb-1">
                    Work Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. name@company.ae"
                    className="w-full h-10 px-3.5 rounded-lg bg-slate-50 dark:bg-[#131B29] border border-slate-200 dark:border-white/15 focus:border-[#0B65B3] dark:focus:border-[#8DC63F] text-[#0A192F] dark:text-white text-xs sm:text-sm focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1E293B] dark:text-[#CBD5E1] mb-1">
                    Phone / Mobile <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +971 50 123 4567"
                    className="w-full h-10 px-3.5 rounded-lg bg-slate-50 dark:bg-[#131B29] border border-slate-200 dark:border-white/15 focus:border-[#0B65B3] dark:focus:border-[#8DC63F] text-[#0A192F] dark:text-white text-xs sm:text-sm focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1E293B] dark:text-[#CBD5E1] mb-1">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. MEP Contracting LLC"
                    className="w-full h-10 px-3.5 rounded-lg bg-slate-50 dark:bg-[#131B29] border border-slate-200 dark:border-white/15 focus:border-[#0B65B3] dark:focus:border-[#8DC63F] text-[#0A192F] dark:text-white text-xs sm:text-sm focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1E293B] dark:text-[#CBD5E1] mb-1">
                  Project Emirate / Delivery Location
                </label>
                <select
                  value={deliveryLocation}
                  onChange={(e) => setDeliveryLocation(e.target.value)}
                  className="w-full h-10 px-3.5 rounded-lg bg-slate-50 dark:bg-[#131B29] border border-slate-200 dark:border-white/15 focus:border-[#0B65B3] dark:focus:border-[#8DC63F] text-[#0A192F] dark:text-white text-xs sm:text-sm focus:outline-none transition-colors"
                >
                  {dictionary.emirates.map((em) => (
                    <option key={em} value={em} className="bg-white dark:bg-[#0D1117] text-[#0A192F] dark:text-white">
                      {em}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1E293B] dark:text-[#CBD5E1] mb-1">
                  Requirement Details &amp; Specifications <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Specify quantities, delivery timelines, project drawing details or BOQ requirements..."
                  className="w-full p-3 rounded-lg bg-slate-50 dark:bg-[#131B29] border border-slate-200 dark:border-white/15 focus:border-[#0B65B3] dark:focus:border-[#8DC63F] text-[#0A192F] dark:text-white text-xs sm:text-sm focus:outline-none transition-colors resize-none"
                />
              </div>

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

              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="modal-privacy-consent"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 rounded border-slate-300 dark:border-white/20 bg-white dark:bg-[#131B29] text-[#0B65B3] focus:ring-[#0B65B3]"
                />
                <label htmlFor="modal-privacy-consent" className="text-[11px] text-[#475569] dark:text-[#A9B4C0]">
                  I consent to Vision Energy processing this project requirement in accordance with the{' '}
                  <span className="font-semibold text-[#0A192F] dark:text-white/90">Privacy Policy</span>.
                </label>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  data-preserve-contrast="true"
                  className="flex-1 h-11 px-5 rounded-xl bg-[#0B65B3] hover:bg-[#084c88] border border-[#8DC63F]/60 hover:border-[#8DC63F] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_6px_18px_rgba(11,101,179,0.3)] transition-all disabled:opacity-50 active:scale-[0.99] cursor-pointer"
                  style={{ color: '#FFFFFF' }}
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
                  className="px-4 h-11 rounded-xl bg-slate-100 hover:bg-slate-200/80 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/10 text-xs font-semibold text-[#334155] dark:text-[#CBD5E1] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}
