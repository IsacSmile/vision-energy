'use client';

import { useEffect } from 'react';
import { trackConversion } from '@/lib/analytics';

export default function ThankYouTracker({
  reference,
  enquiryType,
}: {
  reference?: string;
  enquiryType?: string;
}) {
  useEffect(() => {
    trackConversion('thank_you_view', {
      ref: reference || 'none',
      type: enquiryType || 'general',
    });
  }, [reference, enquiryType]);

  return null;
}

