export type ConsentStatus = 'granted' | 'denied' | null;

export type ConversionEventName =
  | 'phone_click'
  | 'whatsapp_click'
  | 'email_click'
  | 'brochure_click'
  | 'enquiry_submit'
  | 'thank_you_view';

export const CONSENT_STORAGE_KEY = 've_analytics_consent';
export const CLARITY_PROJECT_ID = 'yktp18a9bf';

declare global {
  interface Window {
    clarity?: (...args: unknown[]) => void;
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function getConsentStatus(): ConsentStatus {
  if (typeof window === 'undefined') return null;
  try {
    const val = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (val === 'granted' || val === 'denied') return val;
    return null;
  } catch {
    return null;
  }
}

export function setConsentStatus(status: Exclude<ConsentStatus, null>) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, status);
    window.dispatchEvent(new CustomEvent('ve-consent-change', { detail: status }));
  } catch {
    // Ignore storage quota / private mode failures gracefully
  }
}

export function trackConversion(
  eventName: ConversionEventName,
  metadata: Record<string, string | number | boolean | undefined> = {}
) {
  if (typeof window === 'undefined') return;

  const pagePath = window.location.pathname;
  const searchParams = new URLSearchParams(window.location.search);
  const utmSource = searchParams.get('utm_source') || undefined;
  const utmMedium = searchParams.get('utm_medium') || undefined;
  const utmCampaign = searchParams.get('utm_campaign') || undefined;

  const payload = {
    event: eventName,
    page: pagePath,
    ...(utmSource ? { utm_source: utmSource } : {}),
    ...(utmMedium ? { utm_medium: utmMedium } : {}),
    ...(utmCampaign ? { utm_campaign: utmCampaign } : {}),
    ...metadata,
  };

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push(payload);
  }

  // Forward key tags & event trigger to Microsoft Clarity when user granted consent
  if (getConsentStatus() === 'granted' && typeof window.clarity === 'function') {
    try {
      window.clarity('set', 'last_conversion_page', pagePath);
      if (metadata.service) window.clarity('set', 'service_context', String(metadata.service));
      if (metadata.location) window.clarity('set', 'location_context', String(metadata.location));
      window.clarity('event', eventName);
    } catch {
      // Never allow analytics telemetry errors to impact user navigation
    }
  }
}

