'use client';

import React, { useEffect, useState } from 'react';
import { useEnquiryModal } from './EnquiryModalProvider';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { serviceEnquirySchema, productEnquirySchema, ServiceEnquiryInput, ProductEnquiryInput } from '@/lib/validation';
import { dictionary } from '@/lib/dictionary';
import { X, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function EnquiryModal() {
  const { modalType, serviceContext, productContext, closeModal } = useEnquiryModal();
  const [submitting, setSubmitting] = useState(false);
  const [successRef, setSuccessRef] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (modalType) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setSuccessRef(null);
      setServerError(null);
    }
    return () => {
      document.body.style.overflow = 'unset';
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

  if (!modalType) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0D1117] border border-[#1F2937] rounded-2xl shadow-2xl p-6 sm:p-8 text-white">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        {successRef ? (
          <div className="text-center py-8 space-y-4">
            <CheckCircle2 className="w-16 h-16 mx-auto text-[#8DC63F] animate-bounce" />
            <h3 className="text-2xl font-bold text-white">Enquiry Submitted Successfully</h3>
            <p className="text-gray-300 max-w-md mx-auto">
              Thank you for contacting Vision Energy International. Your enquiry reference ID is:
            </p>
            <div className="inline-block bg-[#050608] border border-[#8DC63F]/40 px-6 py-3 rounded-full text-lg font-mono text-[#8DC63F] font-bold pill-glow">
              {successRef}
            </div>
            <p className="text-sm text-[#A9B4C0] pt-2">
              Our engineering team will review your specifications and get in touch shortly.
            </p>
            <div className="pt-4">
              <button
                onClick={closeModal}
                className="px-8 py-3 bg-[#0B65B3] hover:bg-[#0B65B3]/80 text-white font-semibold rounded-full transition-colors"
              >
                Close Window
              </button>
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
  );
}

// ----------------------------------------------------------------------
// Service Booking Form Component
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ServiceEnquiryInput>({
    resolver: zodResolver(serviceEnquirySchema),
    defaultValues: {
      serviceSlug: context.serviceSlug,
      serviceTitle: context.serviceTitle,
      sourceUrl: typeof window !== 'undefined' ? window.location.href : '',
      consent: false,
    },
  });

  const onSubmit = async (data: ServiceEnquiryInput) => {
    setSubmitting(true);
    setServerError(null);
    try {
      const res = await fetch('/api/enquiries/service', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
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
      <div>
        <span className="inline-block px-3 py-1 text-xs font-semibold text-[#8DC63F] bg-[#8DC63F]/10 border border-[#8DC63F]/30 rounded-full mb-2">
          Service Booking Mode
        </span>
        <h2 id="modal-title" className="text-2xl font-bold text-white">
          Book Service: {context.serviceTitle}
        </h2>
        <p className="text-sm text-[#A9B4C0] mt-1">
          Submit your project requirements and preferred timeline for engineering review.
        </p>
      </div>

      {serverError && (
        <div className="p-3 bg-red-950/60 border border-red-500/50 rounded-lg text-red-200 text-sm flex items-center gap-2">
          <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
          <span>{serverError}</span>
        </div>
      )}

      {/* Hidden honeypot & context */}
      <input type="text" {...register('website')} tabIndex={-1} autoComplete="off" className="hidden" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1">Full Name *</label>
          <input
            {...register('name')}
            type="text"
            placeholder="e.g. Engineer Ahmed Mansoor"
            className="w-full bg-[#050608] border border-[#1F2937] rounded-lg px-3 py-2 text-white focus:border-[#0B65B3] text-sm"
          />
          {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1">Company / Organization</label>
          <input
            {...register('company')}
            type="text"
            placeholder="e.g. Al Habtoor Contracting"
            className="w-full bg-[#050608] border border-[#1F2937] rounded-lg px-3 py-2 text-white focus:border-[#0B65B3] text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1">Phone Number (UAE) *</label>
          <input
            {...register('phone')}
            type="tel"
            placeholder="+971 50 123 4567"
            className="w-full bg-[#050608] border border-[#1F2937] rounded-lg px-3 py-2 text-white focus:border-[#0B65B3] text-sm"
          />
          {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1">Email Address *</label>
          <input
            {...register('email')}
            type="email"
            placeholder="ahmed@company.ae"
            className="w-full bg-[#050608] border border-[#1F2937] rounded-lg px-3 py-2 text-white focus:border-[#0B65B3] text-sm"
          />
          {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1">Emirate / Location *</label>
          <select
            {...register('emirate')}
            className="w-full bg-[#050608] border border-[#1F2937] rounded-lg px-3 py-2 text-white focus:border-[#0B65B3] text-sm"
          >
            <option value="">-- Select Emirate --</option>
            {dictionary.emirates.map((em) => (
              <option key={em} value={em}>
                {em}
              </option>
            ))}
          </select>
          {errors.emirate && <p className="text-xs text-red-400 mt-1">{errors.emirate.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1">Project Type *</label>
          <select
            {...register('projectType')}
            className="w-full bg-[#050608] border border-[#1F2937] rounded-lg px-3 py-2 text-white focus:border-[#0B65B3] text-sm"
          >
            <option value="">-- Select Project Type --</option>
            {dictionary.projectTypes.map((pt) => (
              <option key={pt} value={pt}>
                {pt}
              </option>
            ))}
          </select>
          {errors.projectType && <p className="text-xs text-red-400 mt-1">{errors.projectType.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-300 mb-1">Preferred Start Date (Optional)</label>
        <input
          {...register('preferredDate')}
          type="date"
          className="w-full bg-[#050608] border border-[#1F2937] rounded-lg px-3 py-2 text-white focus:border-[#0B65B3] text-sm"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-300 mb-1">Message & Technical Details *</label>
        <textarea
          {...register('message')}
          rows={3}
          placeholder="Describe your project scope, building dimensions, or specific technical specs..."
          className="w-full bg-[#050608] border border-[#1F2937] rounded-lg px-3 py-2 text-white focus:border-[#0B65B3] text-sm"
        />
        {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message.message}</p>}
      </div>

      <div className="flex items-start gap-2 pt-1">
        <input
          {...register('consent')}
          id="service-consent"
          type="checkbox"
          className="mt-1 accent-[#8DC63F] w-4 h-4 rounded"
        />
        <label htmlFor="service-consent" className="text-xs text-gray-300">
          I consent to Vision Energy International storing my details for processing this service enquiry. *
        </label>
      </div>
      {errors.consent && <p className="text-xs text-red-400">{errors.consent.message}</p>}

      <div className="pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 bg-gradient-brand text-white font-bold rounded-full hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        >
          {submitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing Request...
            </>
          ) : (
            'Submit Service Booking Request'
          )}
        </button>
      </div>
    </form>
  );
}

// ----------------------------------------------------------------------
// Product Enquiry Form Component
// ----------------------------------------------------------------------
function ProductForm({
  context,
  submitting,
  setSubmitting,
  setSuccessRef,
  setServerError,
  serverError,
}: {
  context: { categoryCode: string; categoryTitle: string };
  submitting: boolean;
  setSubmitting: (val: boolean) => void;
  setSuccessRef: (ref: string) => void;
  setServerError: (err: string | null) => void;
  serverError: string | null;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductEnquiryInput>({
    resolver: zodResolver(productEnquirySchema),
    defaultValues: {
      categoryCode: context.categoryCode,
      categoryTitle: context.categoryTitle,
      sourceUrl: typeof window !== 'undefined' ? window.location.href : '',
      consent: false,
    },
  });

  const onSubmit = async (data: ProductEnquiryInput) => {
    setSubmitting(true);
    setServerError(null);
    try {
      const res = await fetch('/api/enquiries/product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
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
      <div>
        <span className="inline-block px-3 py-1 text-xs font-semibold text-[#0B65B3] bg-[#0B65B3]/10 border border-[#0B65B3]/30 rounded-full mb-2">
          Product Enquiry Mode
        </span>
        <h2 id="modal-title" className="text-2xl font-bold text-white">
          Enquire: [{context.categoryCode}] {context.categoryTitle}
        </h2>
        <p className="text-sm text-[#A9B4C0] mt-1">
          Request technical datasheets, bulk pricing, or availability for this product category.
        </p>
      </div>

      {serverError && (
        <div className="p-3 bg-red-950/60 border border-red-500/50 rounded-lg text-red-200 text-sm flex items-center gap-2">
          <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
          <span>{serverError}</span>
        </div>
      )}

      {/* Hidden honeypot */}
      <input type="text" {...register('website')} tabIndex={-1} autoComplete="off" className="hidden" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1">Full Name *</label>
          <input
            {...register('name')}
            type="text"
            placeholder="e.g. Engineer Rashid Al Suwaidi"
            className="w-full bg-[#050608] border border-[#1F2937] rounded-lg px-3 py-2 text-white focus:border-[#0B65B3] text-sm"
          />
          {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1">Company / Organization</label>
          <input
            {...register('company')}
            type="text"
            placeholder="e.g. Emirates Industrial Construction"
            className="w-full bg-[#050608] border border-[#1F2937] rounded-lg px-3 py-2 text-white focus:border-[#0B65B3] text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1">Phone Number (UAE) *</label>
          <input
            {...register('phone')}
            type="tel"
            placeholder="+971 50 123 4567"
            className="w-full bg-[#050608] border border-[#1F2937] rounded-lg px-3 py-2 text-white focus:border-[#0B65B3] text-sm"
          />
          {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1">Email Address *</label>
          <input
            {...register('email')}
            type="email"
            placeholder="rashid@company.ae"
            className="w-full bg-[#050608] border border-[#1F2937] rounded-lg px-3 py-2 text-white focus:border-[#0B65B3] text-sm"
          />
          {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1">Category Code / Title (Pre-filled)</label>
          <input
            {...register('categoryCode')}
            type="text"
            readOnly
            className="w-full bg-[#161B22] border border-[#1F2937] rounded-lg px-3 py-2 text-[#8DC63F] font-mono text-sm"
          />
          <input type="hidden" {...register('categoryTitle')} />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1">Estimated Quantity / Requirement</label>
          <input
            {...register('quantity')}
            type="text"
            placeholder="e.g. 500 meters tape / 20 ESE rods"
            className="w-full bg-[#050608] border border-[#1F2937] rounded-lg px-3 py-2 text-white focus:border-[#0B65B3] text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-300 mb-1">Delivery Location / Site Emirate</label>
        <input
          {...register('deliveryLocation')}
          type="text"
          placeholder="e.g. ICAD III Abu Dhabi / KIZAD / JAFZA Dubai"
          className="w-full bg-[#050608] border border-[#1F2937] rounded-lg px-3 py-2 text-white focus:border-[#0B65B3] text-sm"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-300 mb-1">Message & Material Specifications *</label>
        <textarea
          {...register('message')}
          rows={3}
          placeholder="Specify exact sizes, material grades (e.g. Copper 25x3mm), or delivery timelines required..."
          className="w-full bg-[#050608] border border-[#1F2937] rounded-lg px-3 py-2 text-white focus:border-[#0B65B3] text-sm"
        />
        {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message.message}</p>}
      </div>

      <div className="flex items-start gap-2 pt-1">
        <input
          {...register('consent')}
          id="product-consent"
          type="checkbox"
          className="mt-1 accent-[#8DC63F] w-4 h-4 rounded"
        />
        <label htmlFor="product-consent" className="text-xs text-gray-300">
          I consent to Vision Energy International storing my details for processing this product enquiry. *
        </label>
      </div>
      {errors.consent && <p className="text-xs text-red-400">{errors.consent.message}</p>}

      <div className="pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 bg-gradient-brand text-white font-bold rounded-full hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        >
          {submitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Submitting Product Enquiry...
            </>
          ) : (
            'Submit Product Enquiry'
          )}
        </button>
      </div>
    </form>
  );
}
