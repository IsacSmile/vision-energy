export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.visionenergyme.com'
).replace(/\/$/, '');

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const COMPANY_FACTS = {
  name: 'Vision Energy International',
  legalName: 'VISION ENERGY INTERNATIONAL',
  established: '2018',
  projectsCompletedCount: '160+',
  projectsCompletedSummary: 'More than 160 projects completed',
  headOffice: {
    label: 'Ras Al Khaimah (Head Office)',
    streetAddress: 'RAK Business Centre BC4, RAK FTZ Business Park, P.O Box 17111, Al Nakheel',
    poBox: '17111',
    locality: 'Ras Al Khaimah',
    region: 'Ras Al Khaimah',
    countryName: 'UAE',
    countryCode: 'AE',
    fullAddress:
      'RAK Business Centre BC4, RAK FTZ Business Park, P.O Box 17111, Al Nakheel, Ras Al Khaimah, UAE',
    mapsUrl:
      'https://maps.google.com/?q=RAK+Business+Centre+BC4+RAK+FTZ+Business+Park+Al+Nakheel+Ras+Al+Khaimah+UAE',
  },
  branches: [
    { city: 'Dubai', label: 'Dubai Branch (address not published — contact office desk)' },
    { city: 'Abu Dhabi', label: 'Abu Dhabi Branch (address not published — contact office desk)' },
  ],
  phones: {
    landline: '+971 7 204 2763',
    landlineHref: 'tel:+97172042763',
    mobile: '+971 54 700 4616',
    mobileHref: 'tel:+971547004616',
    whatsappUrl: 'https://wa.me/971547004616',
  },
  email: 'info@visionenergyme.com',
  emailHref: 'mailto:info@visionenergyme.com',
  marketsServed: [
    'Dubai',
    'Abu Dhabi',
    'Ras Al Khaimah',
    'United Arab Emirates',
    'Qatar',
  ],
  areaServedSchema: [
    { '@type': 'City', name: 'Dubai' },
    { '@type': 'City', name: 'Abu Dhabi' },
    { '@type': 'City', name: 'Ras Al Khaimah' },
    { '@type': 'Country', name: 'United Arab Emirates' },
    { '@type': 'Country', name: 'Qatar' },
  ],
  lastUpdatedDisplay: 'November 27, 2026',
  lastUpdatedIso: '2026-11-27',
} as const;

export function truncateSeo(text: string, maxLen: number): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= maxLen) return clean;
  const cut = clean.slice(0, maxLen - 1);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > maxLen * 0.6 ? cut.slice(0, lastSpace) : cut).trimEnd() + '…';
}

