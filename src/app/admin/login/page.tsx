'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { adminLoginSchema, AdminLoginInput } from '@/lib/validation';
import { Lock, AlertCircle, Loader2 } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminLoginInput>({
    resolver: zodResolver(adminLoginSchema),
  });

  const onSubmit = async (data: AdminLoginInput) => {
    setSubmitting(true);
    setLoginError(null);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || 'Authentication failed');
      }

      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      setLoginError(err.message || 'Invalid email or password');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050608] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#0D1117] border border-[#1F2937] rounded-2xl shadow-2xl p-8 space-y-6">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 bg-[#050608] border border-[#0B65B3]/50 rounded-2xl mx-auto flex items-center justify-center pill-glow">
            <Image src="/site-main-logo.png" alt="Logo" width={40} height={40} style={{ width: "auto", height: "auto" }} />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Admin Portal Access</h1>
          <p className="text-xs text-[#A9B4C0]">
            VISION ENERGY INTERNATIONAL • Enquiries Management
          </p>
        </div>

        {loginError && (
          <div className="p-3 bg-red-950/60 border border-red-500/50 rounded-lg text-red-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{loginError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Admin Email</label>
            <input
              {...register('email')}
              type="email"
              placeholder="admin@visionenergyme.com"
              className="w-full bg-[#050608] border border-[#1F2937] rounded-xl px-4 py-2.5 text-white focus:border-[#8DC63F] text-sm"
            />
            {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Password</label>
            <input
              {...register('password')}
              type="password"
              placeholder="••••••••••••"
              className="w-full bg-[#050608] border border-[#1F2937] rounded-xl px-4 py-2.5 text-white focus:border-[#8DC63F] text-sm"
            />
            {errors.password && <p className="text-xs text-red-400 mt-1">{errors.password.message}</p>}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 bg-gradient-brand text-white font-bold text-sm rounded-full hover:opacity-90 transition-opacity flex items-center justify-center gap-2 pill-glow"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  Sign In to Dashboard
                </>
              )}
            </button>
          </div>
        </form>

        <p className="text-[11px] text-center text-gray-500 pt-2">
          Protected administrative route. Session cookie signed with httpOnly encryption.
        </p>
      </div>
    </div>
  );
}
