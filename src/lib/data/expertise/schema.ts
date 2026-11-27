import { earthingData } from './earthing.data';
import { EXPERTISE_FAQ_ITEMS } from './faq.data';

const SITE_URL = 'https://www.visionenergyme.com';
const EXPERTISE_URL = `${SITE_URL}/expertise`;

export function buildExpertiseJsonLd() {
  const workflowStep = earthingData.steps?.find((s) => s.id === 'how-we-work');
  const workflowStages = workflowStep?.processFlow?.stages || [];

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${EXPERTISE_URL}#webpage`,
        url: EXPERTISE_URL,
        name: 'Lightning & Earthing Engineering Expertise | Vision Energy International',
        headline: 'Lightning & Earthing Engineering Expertise',
        description:
          'Authority-compliant lightning protection and earthing systems engineered for UAE and GCC critical infrastructure, alongside specialized gym and laboratory technical solutions.',
        inLanguage: 'en-AE',
        isPartOf: {
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          url: SITE_URL,
          name: 'Vision Energy International',
        },
        publisher: {
          '@type': 'Organization',
          '@id': `${SITE_URL}/#organization`,
          name: 'VISION ENERGY INTERNATIONAL',
          url: SITE_URL,
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
                'Risk assessment (Levels I–IV), rolling sphere & protection angle design, conventional Faraday cage mesh, ESE terminals, air terminals, down conductors, and UAE authority submittals.',
              areaServed: 'AE',
              provider: { '@type': 'Organization', name: 'VISION ENERGY INTERNATIONAL' },
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
                'Soil resistivity testing, deep copper electrodes, ground enhancement compounds, exothermic joints, equipotential earth bars, DEWA/SEWA compliance, and earth-resistance testing.',
              areaServed: 'AE',
              provider: { '@type': 'Organization', name: 'VISION ENERGY INTERNATIONAL' },
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
                'Technical specifications, layout coordination, and commercial gym equipment supply support across the UAE and GCC.',
              areaServed: 'AE',
              provider: { '@type': 'Organization', name: 'VISION ENERGY INTERNATIONAL' },
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
                'Analytical instruments, precision glassware, laboratory consumables, and procurement engineering support across the UAE and GCC.',
              areaServed: 'AE',
              provider: { '@type': 'Organization', name: 'VISION ENERGY INTERNATIONAL' },
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': `${EXPERTISE_URL}#workflow`,
        name: 'How Vision Energy Delivers Compliant Lightning & Earthing Projects',
        description:
          'Ten-stage technical delivery process from customer enquiry and soil resistivity study through engineering design, authority approval, supervised installation, and tested handover.',
        step: workflowStages.map((stage, idx) => ({
          '@type': 'HowToStep',
          position: idx + 1,
          name: stage.title,
          text: stage.description,
          url: `${EXPERTISE_URL}#step-how-we-work`,
        })),
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

