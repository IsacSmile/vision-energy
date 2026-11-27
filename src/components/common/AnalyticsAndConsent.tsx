'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ShieldCheck, X } from 'lucide-react';
import {
  CLARITY_PROJECT_ID,
  getConsentStatus,
  setConsentStatus,
  trackConversion,
  type ConsentStatus,
} from '@/lib/analytics';

function loadClarityScript() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  if (document.getElementById('microsoft-clarity-script')) return;

  const win = window as unknown as Record<string, unknown>;
  if (typeof win.clarity !== 'function') {
    const queueFn = function (...args: unknown[]) {
      const q = (queueFn as unknown as { q: unknown[] }).q || [];
      q.push(args);
      (queueFn as unknown as { q: unknown[] }).q = q;
    };
    win.clarity = queueFn;
  }

  const script = document.createElement('script');
  script.id = 'microsoft-clarity-script';
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${CLARITY_PROJECT_ID}`;
  const firstScript = document.getElementsByTagName('script')[0];
  if (firstScript?.parentNode) {
    firstScript.parentNode.insertBefore(script, firstScript);
  } else {
    document.head.appendChild(script);
  }
}

export default function AnalyticsAndConsent() {
  const pathname = usePathname() || '';
  const isAdmin = pathname.startsWith('/admin');
  const [consent, setConsent] = useState<ConsentStatus>(null);
  const [mounted, setMounted] = useState(false);

  // Read persisted preference cleanly after mount
  useEffect(() => {
    const rafId = window.requestAnimationFrame(() => {
      setConsent(getConsentStatus());
      setMounted(true);
    });
    return () => window.cancelAnimationFrame(rafId);
  }, []);

  // Load Clarity strictly after explicit consent AND after idle/interaction
  useEffect(() => {
    if (isAdmin || consent !== 'granted') return;

    let loaded = false;
    const triggerLoad = () => {
      if (loaded) return;
      loaded = true;
      loadClarityScript();
    };

    const idleTimer = window.setTimeout(triggerLoad, 1800);
    window.addEventListener('pointerdown', triggerLoad, { once: true, passive: true });
    window.addEventListener('scroll', triggerLoad, { once: true, passive: true });

    return () => {
      window.clearTimeout(idleTimer);
      window.removeEventListener('pointerdown', triggerLoad);
      window.removeEventListener('scroll', triggerLoad);
    };
  }, [consent, isAdmin]);

  // Global delegated conversion click tracking (tel:, wa.me, mailto:, brochures/specs)
  useEffect(() => {
    if (isAdmin) return;

    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest('a') as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = (anchor.getAttribute('href') || '').trim();
      if (!href) return;

      const label = anchor.getAttribute('aria-label') || anchor.textContent?.trim().slice(0, 60) || '';
      if (href.startsWith('tel:')) {
        trackConversion('phone_click', { target: href.replace('tel:', ''), label });
      } else if (href.includes('wa.me/')) {
        trackConversion('whatsapp_click', { target: href, label });
      } else if (href.startsWith('mailto:')) {
        trackConversion('email_click', { target: href.replace('mailto:', ''), label });
      } else if (href.endsWith('.pdf') || href.endsWith('.md')) {
        trackConversion('brochure_click', { target: href, label });
      }
    };

    document.addEventListener('click', handleLinkClick, { passive: true });
    return () => document.removeEventListener('click', handleLinkClick);
  }, [isAdmin]);

  if (isAdmin || !mounted || consent !== null) {
    return null;
  }

  const accept = () => {
    setConsentStatus('granted');
    setConsent('granted');
  };

  const decline = () => {
    setConsentStatus('denied');
    setConsent('denied');
  };

  return (
    <aside
      aria-label="Privacy and analytics preferences"
      className="fixed bottom-[4.5rem] sm:bottom-5 left-3.5 right-3.5 sm:right-auto sm:max-w-[390px] z-40 rounded-2xl bg-white/95 dark:bg-[#0D131F]/95 backdrop-blur-md border border-slate-200 dark:border-white/15 shadow-[0_16px_40px_-10px_rgba(10,25,47,0.28)] dark:shadow-[0_20px_48px_-10px_rgba(0,0,0,0.75)] p-3.5 sm:p-4 text-left"
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#0B65B3]/10 dark:bg-[#0B65B3]/25 border border-[#0B65B3]/20 text-[#0B65B3] dark:text-[#60A5FA] flex items-center justify-center shrink-0 mt-0.5">
          <ShieldCheck className="w-4 h-4" aria-hidden="true" />
        </div>
        <div className="flex-1 min-w-0 space-y-2.5">
          <div className="flex items-start justify-between gap-2">
            <p className="text-xs leading-relaxed text-[#334155] dark:text-[#CBD5E1]">
              We use optional analytics to improve site speed and engineering enquiry journeys. Essential site functionality works without cookies.
            </p>
            <button
              type="button"
              onClick={decline}
              aria-label="Close privacy banner with essential cookies only"
              className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded shrink-0 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={accept}
              data-preserve-contrast="true"
              className="px-3.5 py-1.5 rounded-lg bg-[#0B65B3] hover:bg-[#084c88] text-white text-xs font-bold transition-colors cursor-pointer"
              style={{ color: '#FFFFFF' }}
            >
              Accept Analytics
            </button>
            <button
              type="button"
              onClick={decline}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.06] dark:hover:bg-white/[0.12] text-[#334155] dark:text-[#CBD5E1] text-xs font-semibold transition-colors cursor-pointer"
            >
              Essential Only
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
