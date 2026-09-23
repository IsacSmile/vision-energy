'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { serviceEnquirySchema, ServiceEnquiryInput } from '@/lib/validation';
import { dictionary } from '@/lib/dictionary';
import { CheckCircle2, AlertCircle, Loader2, Send } from 'lucide-react';

export default function ContactFormClient() {
  const [submitting, setSubmitting] = useState(false);
  const [successRef, setSuccessRef] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ServiceEnquiryInput>({
    resolver: zodResolver(serviceEnquirySchema),
    defaultValues: {
      serviceSlug: 'general-contact-enquiry',
      serviceTitle: 'General Contact Us Enquiry',
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
        throw new Error(result.error || 'Failed to submit contact enquiry');
      }
      setSuccessRef(result.reference);
    } catch (err: any) {
      setServerError(err.message || 'An unexpected error occurred.');
    } finally {
      setSubmitting(false);
    }
  };

  if (successRef) {
    return (
      <div className="bg-[#050608] border border-[#8DC63F]/40 p-8 rounded-2xl text-center space-y-4">
        <CheckCircle2 className="w-16 h-16 text-[#8DC63F] mx-auto animate-bounce" />
        <h3 className="text-xl font-bold text-white">Message Received</h3>
        <p className="text-xs text-gray-300">
          Thank you for contacting Vision Energy International. Your enquiry reference is:
        </p>
        <div className="inline-block px-4 py-2 bg-[#0D1117] border border-[#8DC63F] rounded-full text-base font-mono text-[#8DC63F] font-bold pill-glow">
          {successRef}
        </div>
        <p className="text-xs text-[#A9B4C0]">
          Our technical sales team will review your message and reply via email/phone shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {serverError && (
        <div className="p-3 bg-red-950/60 border border-red-500/50 rounded-lg text-red-200 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
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
            placeholder="e.g. Engineer Tariq Al Hashimi"
            className="w-full bg-[#050608] border border-[#1F2937] rounded-xl px-3 py-2 text-white focus:border-[#8DC63F] text-xs"
          />
          {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1">Company / Organization</label>
          <input
            {...register('company')}
            type="text"
            placeholder="e.g. Gulf Contracting Co."
            className="w-full bg-[#050608] border border-[#1F2937] rounded-xl px-3 py-2 text-white focus:border-[#8DC63F] text-xs"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1">Phone Number (UAE) *</label>
          <input
            {...register('phone')}
            type="tel"
            placeholder="+971 50 123 4567"
            className="w-full bg-[#050608] border border-[#1F2937] rounded-xl px-3 py-2 text-white focus:border-[#8DC63F] text-xs"
          />
          {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1">Email Address *</label>
          <input
            {...register('email')}
            type="email"
            placeholder="tariq@gulfcontracting.ae"
            className="w-full bg-[#050608] border border-[#1F2937] rounded-xl px-3 py-2 text-white focus:border-[#8DC63F] text-xs"
          />
          {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1">Emirate / Location *</label>
          <select
            {...register('emirate')}
            className="w-full bg-[#050608] border border-[#1F2937] rounded-xl px-3 py-2 text-white focus:border-[#8DC63F] text-xs"
          >
            <option value="">-- Select Location --</option>
            {dictionary.emirates.map((em) => (
              <option key={em} value={em}>
                {em}
              </option>
            ))}
          </select>
          {errors.emirate && <p className="text-xs text-red-400 mt-1">{errors.emirate.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1">Enquiry Type *</label>
          <select
            {...register('projectType')}
            className="w-full bg-[#050608] border border-[#1F2937] rounded-xl px-3 py-2 text-white focus:border-[#8DC63F] text-xs"
          >
            <option value="">-- Select Type --</option>
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
        <label className="block text-xs font-medium text-gray-300 mb-1">Message Details *</label>
        <textarea
          {...register('message')}
          rows={4}
          placeholder="How can Vision Energy International assist with your product or engineering requirements?"
          className="w-full bg-[#050608] border border-[#1F2937] rounded-xl px-3 py-2 text-white focus:border-[#8DC63F] text-xs"
        />
        {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message.message}</p>}
      </div>

      <div className="flex items-start gap-2 pt-1">
        <input
          {...register('consent')}
          id="contact-consent"
          type="checkbox"
          className="mt-0.5 accent-[#8DC63F] w-4 h-4 rounded"
        />
        <label htmlFor="contact-consent" className="text-xs text-gray-300">
          I consent to Vision Energy International processing my contact information. *
        </label>
      </div>
      {errors.consent && <p className="text-xs text-red-400">{errors.consent.message}</p>}

      <div className="pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 bg-gradient-brand text-white font-bold text-xs rounded-full hover:opacity-90 transition-opacity flex items-center justify-center gap-2 pill-glow"
        >
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Sending Message...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Send Contact Message
            </>
          )}
        </button>
      </div>
    </form>
  );
}
