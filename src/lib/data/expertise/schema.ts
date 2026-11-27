import { EXPERTISE_FAQ_ITEMS } from './faq.data';

const SITE_URL = 'https://www.visionenergyme.com';
const EXPERTISE_URL = `${SITE_URL}/expertise`;

const EXPERTISE_AREA_SERVED = [
  { '@type': 'City', name: 'Dubai' },
  { '@type': 'City', name: 'Abu Dhabi' },
  { '@type': 'City', name: 'Ras Al Khaimah' },
  { '@type': 'Country', name: 'United Arab Emirates' },
  { '@type': 'Country', name: 'Qatar' },
];

export function buildExpertiseJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${EXPERTISE_URL}#webpage`,
        url: EXPERTISE_URL,
        name: 'Lightning & Earthing Expertise UAE & Qatar | Vision Energy',
        headline: 'Lightning & Earthing Engineering Expertise',
        description:
          'Lightning protection and earthing systems aligned with IEC 62305, BS 7430 and UAE authorities, plus commercial gym and laboratory equipment.',
        inLanguage: 'en-AE',
        isPartOf: {
          '@id': `${SITE_URL}/#website`,
        },
        publisher: {
          '@id': `${SITE_URL}/#organization`,
        },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/images/expertise-hero-bg.webp`,
          width: 1920,
          height: 1072,
          caption:
            'Vision Energy electrical engineer testing earthing resistance beneath rooftop copper lightning protection rods',
        },
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: [
            '#expertise-hero h1',
            '#expertise-hero p',
            '#expertise-faq h2',
            '#expertise-faq [data-aeo-answer]',
          ],
        },
        about: [
          { '@type': 'Thing', name: 'Lightning Protection Systems (IEC 62305 / BS EN 62305)' },
          { '@type': 'Thing', name: 'Earthing and Grounding Systems (BS 7430 / IEC 60364)' },
          { '@type': 'Thing', name: 'Early Streamer Emission (NF C 17-102)' },
          { '@type': 'Thing', name: 'Surge Protection Devices (Type 1, Type 2, Type 3 SPD)' },
          { '@type': 'Thing', name: 'Commercial Gym Equipment Solutions' },
          { '@type': 'Thing', name: 'Laboratory Equipment Solutions' },
        ],
        mainEntity: { '@id': `${EXPERTISE_URL}#catalog` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${EXPERTISE_URL}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: SITE_URL,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Expertise',
            item: EXPERTISE_URL,
          },
        ],
      },
      {
        '@type': 'OfferCatalog',
        '@id': `${EXPERTISE_URL}#catalog`,
        name: 'Vision Energy Technical & Engineering Expertise',
        itemListElement: [
          {
            '@type': 'Offer',
            position: 1,
            itemOffered: {
              '@type': 'Service',
              name: 'Lightning Protection Engineering Systems',
              serviceType: 'IEC 62305, BS EN 62305, BS EN 62561, NF C 17-102 & NFPA 780 Lightning Protection',
              description:
                'Risk assessment (Levels I–IV), rolling sphere & protection angle design, conventional Faraday cage mesh, ESE terminals, air terminals, down conductors, and UAE & Qatar project submittals.',
              areaServed: EXPERTISE_AREA_SERVED,
              provider: { '@id': `${SITE_URL}/#organization` },
            },
          },
          {
            '@type': 'Offer',
            position: 2,
            itemOffered: {
              '@type': 'Service',
              name: 'Earthing, Grounding & Surge Protection Engineering',
              serviceType: 'BS 7430 & IEC 60364 Earthing, Equipotential Bonding & Type 1/2/3 SPD Coordination',
              description:
                'Soil resistivity testing, deep copper electrodes, ground enhancement compounds, exothermic joints, equipotential earth bars, DEWA/SEWA compliance, and earth-resistance testing across the UAE & Qatar.',
              areaServed: EXPERTISE_AREA_SERVED,
              provider: { '@id': `${SITE_URL}/#organization` },
            },
          },
          {
            '@type': 'Offer',
            position: 3,
            itemOffered: {
              '@type': 'Service',
              name: 'Commercial Gym Equipment & Technical Solutions',
              serviceType: 'Specialist Gym & Athletic Facility Supply Support',
              description:
                'Technical specifications, layout coordination, and commercial gym equipment supply support across the UAE and Qatar.',
              areaServed: EXPERTISE_AREA_SERVED,
              provider: { '@id': `${SITE_URL}/#organization` },
            },
          },
          {
            '@type': 'Offer',
            position: 4,
            itemOffered: {
              '@type': 'Service',
              name: 'Laboratory Equipment & Technical Solutions',
              serviceType: 'Laboratory Instrumentation, Glassware & Consumables Supply Support',
              description:
                'Analytical instruments, precision glassware, laboratory consumables, and procurement engineering support across the UAE and Qatar.',
              areaServed: EXPERTISE_AREA_SERVED,
              provider: { '@id': `${SITE_URL}/#organization` },
            },
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${EXPERTISE_URL}#faq`,
        mainEntity: EXPERTISE_FAQ_ITEMS.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
    ],
  };
}

