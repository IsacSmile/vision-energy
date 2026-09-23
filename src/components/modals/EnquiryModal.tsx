'use client';

import React, { useEffect, useState } from 'react';
import { useEnquiryModal } from './EnquiryModalProvider';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { serviceEnquirySchema, productEnquirySchema, ServiceEnquiryInput, ProductEnquiryInput } from '@/lib/validation';
import { dictionary } from '@/lib/dictionary';
import { X, CheckCircle2, AlertCircle, Loader2, Copy, Phone, ChevronDown, ChevronUp } from 'lucide-react';
import LightningButton from '@/components/ui/LightningButton';

export default function EnquiryModal() {
  const { modalType, serviceContext, productContext, closeModal } = useEnquiryModal();
  const [submitting, setSubmitting] = useState(false);
  const [successRef, setSuccessRef] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Lock body & html scroll when modal is active
  useEffect(() => {
    if (modalType) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      document.documentElement.style.overflow = '';
      setSuccessRef(null);
      setServerError(null);
      setCopied(false);
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      document.documentElement.style.overflow = '';
    };
  }, [modalType]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modalType) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalType, closeModal]);

  const handleCopyReference = () => {
    if (successRef && typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(successRef);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (!modalType) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="relative w-full sm:max-w-xl max-h-[92svh] sm:max-h-[88vh] flex flex-col bg-[#0D1117] border border-[#1F2937] rounded-t-2xl sm:rounded-2xl shadow-2xl text-white overflow-hidden pb-safe">
        {/* Mobile Drag Handle Indicator */}
        <div className="w-12 h-1.5 bg-gray-600/60 rounded-full mx-auto my-2 shrink-0 sm:hidden" aria-hidden="true" />

        {/* Sticky Header */}
        <div className="sticky top-0 z-10 bg-[#0D1117]/95 backdrop-blur-md px-5 py-3 sm:py-4 border-b border-[#1F2937] flex items-center justify-between">
          <h2 id="modal-title" className="text-sm sm:text-base font-semibold text-white truncate pr-4">
            {successRef
              ? 'Submission Confirmation'
              : modalType === 'SERVICE'
              ? `Book Service: ${serviceContext?.serviceTitle}`
              : productContext?.categoryCode && productContext.categoryCode !== 'GENERAL'
              ? `Enquire: [${productContext.categoryCode}] ${productContext.categoryTitle}`
              : `Product Enquiry`}
          </h2>
          <button
            onClick={closeModal}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 text-gray-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors active-press"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-5 sm:p-6 overflow-y-auto custom-scrollbar grow space-y-4">
          {successRef ? (
            <div className="text-center py-6 space-y-5">
              <CheckCircle2 className="w-16 h-16 mx-auto text-[#8DC63F] animate-bounce" />
              <h3 className="text-xl sm:text-2xl font-bold text-white">Enquiry Submitted Successfully</h3>
              <p className="text-gray-300 max-w-md mx-auto text-xs sm:text-sm">
                Thank you for contacting Vision Energy International. Your enquiry reference ID is:
              </p>
              <div className="inline-block bg-[#050608] border border-[#8DC63F]/40 px-6 py-3 rounded-full text-base sm:text-lg font-mono text-[#8DC63F] font-bold pill-glow">
                {successRef}
              </div>

              {/* Copy Reference & Direct Call Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleCopyReference}
                  className="w-full sm:w-auto h-12 px-6 bg-[#0B65B3] hover:bg-[#0B65B3]/80 text-white font-bold rounded-full transition-colors flex items-center justify-center gap-2 text-sm active-press"
                >
                  <Copy className="w-4 h-4" />
                  <span>{copied ? 'Copied to Clipboard!' : 'Copy Reference'}</span>
                </button>

                <a
                  href={`tel:${dictionary.company.primaryPhone}`}
                  className="w-full sm:w-auto h-12 px-6 bg-white text-[#050608] font-bold rounded-full transition-colors flex items-center justify-center gap-2 text-sm active-press"
                >
                  <Phone className="w-4 h-4 text-[#0B65B3]" />
                  <span>Call Us Now: {dictionary.company.primaryPhone}</span>
                </a>
              </div>
            </div>
          ) : modalType === 'SERVICE' ? (
            <ServiceForm
              context={serviceContext!}
              setSubmitting={setSubmitting}
              submitting={submitting}
              setSuccessRef={setSuccessRef}
              setServerError={setServerError}
              serverError={serverError}
            />
          ) : (
            <ProductForm
              context={productContext!}
              setSubmitting={setSubmitting}
              submitting={submitting}
              setSuccessRef={setSuccessRef}
              setServerError={setServerError}
              serverError={serverError}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// Service Booking Form Component (Progressive Disclosure)
// ----------------------------------------------------------------------
function ServiceForm({
  context,
  submitting,
  setSubmitting,
  setSuccessRef,
  setServerError,
  serverError,
}: {
  context: { serviceSlug: string; serviceTitle: string };
  submitting: boolean;
  setSubmitting: (val: boolean) => void;
  setSuccessRef: (ref: string) => void;
  setServerError: (err: string | null) => void;
  serverError: string | null;
}) {
  const [showExtraDetails, setShowExtraDetails] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ServiceEnquiryInput>({
    resolver: zodResolver(serviceEnquirySchema),
    defaultValues: {
      serviceSlug: context.serviceSlug,
      serviceTitle: context.serviceTitle,
      phone: '+971 ',
      sourceUrl: '',
      consent: false,
    },
  });

  const onSubmit = async (data: ServiceEnquiryInput) => {
    setSubmitting(true);
    setServerError(null);
    try {
      const payload = {
        ...data,
        sourceUrl: typeof window !== 'undefined' ? window.location.href : '',
      };
      const res = await fetch('/api/enquiries/service', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || 'Failed to submit service booking request');
      }
      setSuccessRef(result.reference);
    } catch (err: any) {
      setServerError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {serverError && (
        <div className="p-3 bg-red-950/60 border border-red-500/50 rounded-xl text-red-200 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
          <span>{serverError}</span>
        </div>
      )}

      {/* Hidden honeypot */}
      <input type="text" {...register('website')} tabIndex={-1} autoComplete="off" className="hidden" />

      {/* PRIMARY REQUIRED FIELDS (Name, Phone, Email, Message) */}
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1">Full Name *</label>
          <input
            {...register('name')}
            type="text"
            autoComplete="name"
            inputMode="text"
            placeholder="e.g. Engineer Ahmed Mansoor"
            className="w-full bg-[#050608] border border-[#1F2937] rounded-xl px-3.5 h-12 text-white focus:outline-none focus:ring-0 focus:border-[#8DC63F] text-base transition-colors"
          />
          {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1">Phone Number (UAE) *</label>
          <input
            {...register('phone')}
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="+971 50 123 4567"
            className="w-full bg-[#050608] border border-[#1F2937] rounded-xl px-3.5 h-12 text-white focus:outline-none focus:ring-0 focus:border-[#8DC63F] text-base transition-colors"
          />
          {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1">Email Address *</label>
          <input
            {...register('email')}
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="ahmed@company.ae"
            className="w-full bg-[#050608] border border-[#1F2937] rounded-xl px-3.5 h-12 text-white focus:outline-none focus:ring-0 focus:border-[#8DC63F] text-base transition-colors"
          />
          {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1">Message & Scope Details *</label>
          <textarea
            {...register('message')}
            rows={3}
            placeholder="Describe your project scope or building requirements..."
            className="w-full bg-[#050608] border border-[#1F2937] rounded-xl px-3.5 py-3 text-white focus:outline-none focus:ring-0 focus:border-[#8DC63F] text-base transition-colors"
          />
          {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message.message}</p>}
        </div>
      </div>

      {/* PROGRESSIVE DISCLOSURE TOGGLE */}
      <div>
        <button
          type="button"
          onClick={() => setShowExtraDetails(!showExtraDetails)}
          className="text-xs font-bold text-[#8DC63F] hover:underline flex items-center gap-1.5 py-1 active-press"
        >
          <span>{showExtraDetails ? 'Hide optional details' : '+ Add more details (Company, Emirate, Start Date)'}</span>
          {showExtraDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* OPTIONAL FIELDS (Collapsed by default) */}
      {showExtraDetails && (
        <div className="space-y-3 pt-2 border-t border-[#1F2937] animate-in fade-in duration-200">
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">Company / Organization</label>
            <input
              {...register('company')}
              type="text"
              autoComplete="organization"
              inputMode="text"
              placeholder="e.g. Al Habtoor Contracting"
              className="w-full bg-[#050608] border border-[#1F2937] rounded-xl px-3.5 h-12 text-white focus:outline-none focus:ring-0 focus:border-[#8DC63F] text-base transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Emirate / Location</label>
              <div className="relative">
                <select
                  {...register('emirate')}
                  className="w-full bg-[#050608] border border-[#1F2937] rounded-xl px-3.5 pr-10 h-12 text-white focus:outline-none focus:ring-0 focus:border-[#8DC63F] text-base appearance-none cursor-pointer transition-colors"
                >
                  <option value="" className="bg-[#0D1117] text-white">-- Select Emirate --</option>
                  {dictionary.emirates.map((em) => (
                    <option key={em} value={em} className="bg-[#0D1117] text-white">
                      {em}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-[#8DC63F] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Project Type</label>
              <div className="relative">
                <select
                  {...register('projectType')}
                  className="w-full bg-[#050608] border border-[#1F2937] rounded-xl px-3.5 pr-10 h-12 text-white focus:outline-none focus:ring-0 focus:border-[#8DC63F] text-base appearance-none cursor-pointer transition-colors"
                >
                  <option value="" className="bg-[#0D1117] text-white">-- Select Project Type --</option>
                  {dictionary.projectTypes.map((pt) => (
                    <option key={pt} value={pt} className="bg-[#0D1117] text-white">
                      {pt}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-[#8DC63F] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">Preferred Start Date</label>
            <input
              {...register('preferredDate')}
              type="date"
              className="w-full bg-[#050608] border border-[#1F2937] rounded-xl px-3.5 h-12 text-white focus:outline-none focus:ring-0 focus:border-[#8DC63F] text-base transition-colors"
            />
          </div>
        </div>
      )}

      {/* Consent Checkbox */}
      <div className="flex items-start gap-2.5 pt-1">
        <input
          {...register('consent')}
          id="service-consent"
          type="checkbox"
          className="mt-1 accent-[#8DC63F] w-5 h-5 rounded shrink-0"
        />
        <label htmlFor="service-consent" className="text-xs text-gray-300 leading-normal">
          I consent to Vision Energy International storing my details for processing this service booking enquiry. *
        </label>
      </div>
      {errors.consent && <p className="text-xs text-red-400">{errors.consent.message}</p>}

      {/* STICKY SUBMIT BUTTON */}
      <div className="sticky bottom-0 bg-[#0D1117] py-2 border-t border-[#1F2937]/50">
        <LightningButton
          type="submit"
          variant="primary"
          size="md"
          fullWidth
          disabled={submitting}
        >
          {submitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Processing Request...</span>
            </>
          ) : (
            <span>Submit Service Booking Request</span>
          )}
        </LightningButton>
      </div>
    </form>
  );
}

// ----------------------------------------------------------------------
// Product Enquiry Form Component (Progressive Disclosure)
// ----------------------------------------------------------------------
function ProductForm({
  context,
  submitting,
  setSubmitting,
  setSuccessRef,
  setServerError,
  serverError,
}: {
  context: { categoryCode?: string; categoryTitle?: string; prefillMessage?: string };
  submitting: boolean;
  setSubmitting: (val: boolean) => void;
  setSuccessRef: (ref: string) => void;
  setServerError: (err: string | null) => void;
  serverError: string | null;
}) {
  const [showExtraDetails, setShowExtraDetails] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductEnquiryInput>({
    resolver: zodResolver(productEnquirySchema),
    defaultValues: {
      categoryCode: context.categoryCode || 'GENERAL',
      categoryTitle: context.categoryTitle || 'General Product Enquiry',
      message: context.prefillMessage || '',
      phone: '+971 ',
      sourceUrl: '',
      consent: false,
    },
  });

  const onSubmit = async (data: ProductEnquiryInput) => {
    setSubmitting(true);
    setServerError(null);
    try {
      const payload = {
        ...data,
        sourceUrl: typeof window !== 'undefined' ? window.location.href : '',
      };
      const res = await fetch('/api/enquiries/product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || 'Failed to submit product enquiry request');
      }
      setSuccessRef(result.reference);
    } catch (err: any) {
      setServerError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {serverError && (
        <div className="p-3 bg-red-950/60 border border-red-500/50 rounded-xl text-red-200 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
          <span>{serverError}</span>
        </div>
      )}

      {/* Hidden honeypot */}
      <input type="text" {...register('website')} tabIndex={-1} autoComplete="off" className="hidden" />

      {/* PRIMARY REQUIRED FIELDS (Name, Phone, Email, Message) */}
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1">Full Name *</label>
          <input
            {...register('name')}
            type="text"
            autoComplete="name"
            inputMode="text"
            placeholder="e.g. Engineer Rashid Al Suwaidi"
            className="w-full bg-[#050608] border border-[#1F2937] rounded-xl px-3.5 h-12 text-white focus:outline-none focus:ring-0 focus:border-[#8DC63F] text-base transition-colors"
          />
          {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1">Phone Number (UAE) *</label>
          <input
            {...register('phone')}
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="+971 50 123 4567"
            className="w-full bg-[#050608] border border-[#1F2937] rounded-xl px-3.5 h-12 text-white focus:outline-none focus:ring-0 focus:border-[#8DC63F] text-base transition-colors"
          />
          {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1">Email Address *</label>
          <input
            {...register('email')}
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="rashid@company.ae"
            className="w-full bg-[#050608] border border-[#1F2937] rounded-xl px-3.5 h-12 text-white focus:outline-none focus:ring-0 focus:border-[#8DC63F] text-base transition-colors"
          />
          {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1">Message & Material Specifications *</label>
          <textarea
            {...register('message')}
            rows={3}
            placeholder="Specify sizes, material grades, or delivery timelines required..."
            className="w-full bg-[#050608] border border-[#1F2937] rounded-xl px-3.5 py-3 text-white focus:outline-none focus:ring-0 focus:border-[#8DC63F] text-base transition-colors"
          />
          {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message.message}</p>}
        </div>
      </div>

      {/* PROGRESSIVE DISCLOSURE TOGGLE */}
      <div>
        <button
          type="button"
          onClick={() => setShowExtraDetails(!showExtraDetails)}
          className="text-xs font-bold text-[#8DC63F] hover:underline flex items-center gap-1.5 py-1 active-press"
        >
          <span>{showExtraDetails ? 'Hide optional details' : '+ Add more details (Company, Quantity, Delivery Location)'}</span>
          {showExtraDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* OPTIONAL FIELDS (Collapsed by default) */}
      {showExtraDetails && (
        <div className="space-y-3 pt-2 border-t border-[#1F2937] animate-in fade-in duration-200">
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">Company / Organization</label>
            <input
              {...register('company')}
              type="text"
              autoComplete="organization"
              inputMode="text"
              placeholder="e.g. Emirates Industrial Construction"
              className="w-full bg-[#050608] border border-[#1F2937] rounded-xl px-3.5 h-12 text-white focus:outline-none focus:ring-0 focus:border-[#8DC63F] text-base transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Category Code (Pre-filled)</label>
              <input
                {...register('categoryCode')}
                type="text"
                readOnly
                className="w-full bg-[#161B22] border border-[#1F2937] rounded-xl px-3.5 h-12 text-[#8DC63F] font-mono text-base focus:outline-none focus:ring-0"
              />
              <input type="hidden" {...register('categoryTitle')} />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Estimated Quantity</label>
              <input
                {...register('quantity')}
                type="text"
                placeholder="e.g. 500 meters tape / 20 ESE rods"
                className="w-full bg-[#050608] border border-[#1F2937] rounded-xl px-3.5 h-12 text-white focus:outline-none focus:ring-0 focus:border-[#8DC63F] text-base transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">Delivery Location / Site Emirate</label>
            <input
              {...register('deliveryLocation')}
              type="text"
              placeholder="e.g. ICAD III Abu Dhabi / KIZAD / JAFZA Dubai"
              className="w-full bg-[#050608] border border-[#1F2937] rounded-xl px-3.5 h-12 text-white focus:outline-none focus:ring-0 focus:border-[#8DC63F] text-base transition-colors"
            />
          </div>
        </div>
      )}

      {/* Consent Checkbox */}
      <div className="flex items-start gap-2.5 pt-1">
        <input
          {...register('consent')}
          id="product-consent"
          type="checkbox"
          className="mt-1 accent-[#8DC63F] w-5 h-5 rounded shrink-0"
        />
        <label htmlFor="product-consent" className="text-xs text-gray-300 leading-normal">
          I consent to Vision Energy International storing my details for processing this product enquiry. *
        </label>
      </div>
      {errors.consent && <p className="text-xs text-red-400">{errors.consent.message}</p>}

      {/* STICKY SUBMIT BUTTON */}
      <div className="sticky bottom-0 bg-[#0D1117] py-2 border-t border-[#1F2937]/50">
        <LightningButton
          type="submit"
          variant="primary"
          size="md"
          fullWidth
          disabled={submitting}
        >
          {submitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Submitting Product Enquiry...</span>
            </>
          ) : (
            <span>Submit Product Enquiry</span>
          )}
        </LightningButton>
      </div>
    </form>
  );
}
