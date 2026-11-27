import { EXPERTISE_FAQ_ITEMS, type ExpertiseFaqItem } from './faq.data';
import type { ExpertiseTabId } from './types';
import { SITE_URL, COMPANY_FACTS } from '@/lib/seo/company';

export interface ExpertiseSubpageConfig {
  id: ExpertiseTabId;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  eyebrow: string;
  h1: string;
  heroLead: string;
  heroImage: string;
  heroImageAlt: string;
  quickAnswer: string;
  lastUpdated: string;
  lastUpdatedIso: string;
  categoryPrefixes: string[];
  relatedServices: Array<{ slug: string; title: string; summary: string }>;
  localLinks: Array<{ href: string; label: string }>;
  faqItems: ExpertiseFaqItem[];
  serviceType: string;
}

export const EXPERTISE_SUBPAGES: Record<ExpertiseTabId, ExpertiseSubpageConfig> = {
  lightning: {
    id: 'lightning',
    seoTitle: 'Lightning Protection Expertise UAE & Qatar | Vision Energy',
    seoDescription:
      'IEC 62305, BS EN 62305 & NF C 17-102 lightning protection engineering, rolling sphere & ESE design for Dubai, Abu Dhabi, RAK & Qatar. Request a submittal.',
    keywords: [
      'Lightning Protection System UAE',
      'Lightning Protection Contractor Dubai',
      'IEC 62305 Risk Assessment Abu Dhabi',
      'ESE Lightning Protection NF C 17-102',
      'Faraday Cage Mesh Lightning Arrester',
      'Lightning Protection Qatar',
    ],
    eyebrow: 'Priority #1A · External & Internal Structural Protection',
    h1: 'Lightning Protection Engineering (IEC 62305 & ESE)',
    heroLead:
      'Risk assessment, rolling sphere, protection angle, Faraday mesh, and NF C 17-102 Early Streamer Emission systems engineered and supplied across Dubai, Abu Dhabi, Ras Al Khaimah, the UAE, and Qatar.',
    heroImage: '/images/expertise-hero-bg.webp',
    heroImageAlt:
      'Vision Energy electrical engineer inspecting rooftop copper lightning protection rods and earthing conductors',
    quickAnswer:
      'Vision Energy International engineers and supplies complete lightning protection systems aligned with IEC 62305, BS EN 62305, IEC 62561, NFPA 780, and NF C 17-102. Serving Dubai, Abu Dhabi, Ras Al Khaimah, and Qatar since 2018 (160+ projects), our deliverables cover Protection Levels I–IV, Franklin air terminals, ESE masts, down conductors, and submittal drawings.',
    lastUpdated: 'November 27, 2026',
    lastUpdatedIso: '2026-11-27',
    categoryPrefixes: ['LP'],
    relatedServices: [
      {
        slug: 'external-lightning-protection-installation',
        title: 'External Lightning Protection Installation',
        summary: 'Conventional Faraday mesh and ESE installation, testing, and authority-ready handover dossiers.',
      },
      {
        slug: 'earthing-and-grounding',
        title: 'Earthing & Grounding Systems',
        summary: 'Low-impedance earth electrode grids, Wenner soil testing, and exothermic bonding networks.',
      },
      {
        slug: 'specialist-engineering-manpower-supply',
        title: 'Specialist Engineering Manpower Supply',
        summary: 'Experienced UAE lightning protection technicians and site supervision engineers.',
      },
    ],
    localLinks: [
      { href: '/services/external-lightning-protection-installation', label: 'External LPS Installation' },
      { href: '/services/risk-assessment', label: 'Lightning Risk Assessment' },
      { href: '/products?group=LP', label: 'Browse All LP Catalog Hardware' },
      { href: '/contact', label: 'Request Submittal in UAE or Qatar' },
    ],
    faqItems: EXPERTISE_FAQ_ITEMS.filter((item) => item.topic === 'Lightning'),
    serviceType: 'IEC 62305, BS EN 62305 & NF C 17-102 Lightning Protection Engineering',
  },
  earthing: {
    id: 'earthing',
    seoTitle: 'Earthing & Surge Protection Expertise UAE | Vision Energy',
    seoDescription:
      'BS 7430 earthing design, Wenner soil resistivity testing, exothermic welding & Type 1/2/3 SPD systems in Dubai, Abu Dhabi, RAK & Qatar. Enquire today.',
    keywords: [
      'Earthing System Contractor UAE',
      'Soil Resistivity Testing Dubai',
      'BS 7430 Grounding Abu Dhabi',
      'Exothermic Welding Earth Pit RAK',
      'Surge Protection Devices Type 1 2 3',
      'Earthing and Grounding Qatar',
    ],
    eyebrow: 'Priority #1B · Grounding, Bonding & Surge Mitigation',
    h1: 'Earthing, Grounding & Surge Protection Systems',
    heroLead:
      'Soil resistivity studies, deep copper electrodes, ground enhancement compounds, exothermic joints, equipotential earth bars, and coordinated Type 1/2/3 SPDs across Dubai, Abu Dhabi, Ras Al Khaimah, the UAE, and Qatar.',
    heroImage: '/images/earthing-grounding-hero.webp',
    heroImageAlt:
      'High-conductivity copper earthing rods, grounding tapes, and exothermic connections engineered for UAE desert soil',
    quickAnswer:
      'Vision Energy designs and supplies BS 7430 and BS 7671 / IEC 60364 earthing and surge protection networks across the UAE and Qatar. Starting with Wenner soil resistivity surveys, our engineers combine copper-bonded electrodes, conductive enhancement backfill, exothermic joints, equipotential earth bars, and cascaded Type 1/2/3 SPDs backed by fall-of-potential test documentation.',
    lastUpdated: 'November 27, 2026',
    lastUpdatedIso: '2026-11-27',
    categoryPrefixes: ['ER', 'EL'],
    relatedServices: [
      {
        slug: 'earthing-and-grounding',
        title: 'Earthing & Grounding System Design & Installation',
        summary: 'Soil testing, deep well earthing, exothermic welding, and resistance verification.',
      },
      {
        slug: 'external-lightning-protection-installation',
        title: 'External Lightning Protection Installation',
        summary: 'Coordinated lightning down conductors bonded seamlessly to perimeter earth loops.',
      },
      {
        slug: 'risk-assessment',
        title: 'Lightning & Electrical Risk Assessment',
        summary: 'IEC 62305 structural exposure modeling and SPD surge risk evaluation.',
      },
    ],
    localLinks: [
      { href: '/services/earthing-and-grounding', label: 'Earthing & Grounding Service' },
      { href: '/products?group=ER', label: 'Browse All ER Earthing Hardware' },
      { href: '/products/surge-protection-devices', label: 'Type 1/2/3 Surge Protection (EL-06)' },
      { href: '/contact', label: 'Book Soil Testing or SPD Quote' },
    ],
    faqItems: EXPERTISE_FAQ_ITEMS.filter(
      (item) => item.topic === 'Earthing' || item.topic === 'Surge & Testing'
    ),
    serviceType: 'BS 7430 Earthing Networks, Equipotential Bonding & SPD Coordination',
  },
  gym: {
    id: 'gym',
    seoTitle: 'Gym & Sports Equipment Supplier UAE & Qatar | Vision Energy',
    seoDescription:
      'Commercial gym & athletic accessories (SP-01, SP-02) supplied across Dubai, Abu Dhabi, Ras Al Khaimah & Qatar. Request BOQ pricing and technical datasheets.',
    keywords: [
      'Commercial Gym Equipment Supplier UAE',
      'Gym Accessories Dubai Abu Dhabi',
      'Sports Court Equipment Supplier UAE',
      'Bumper Plates Barbells Flooring Supplier',
      'Fitness Facility Supply Qatar',
      'Vision Energy Gym Equipment',
    ],
    eyebrow: 'Priority #2A · Commercial Fitness & Institutional Athletics',
    h1: 'Commercial Gym & Sports Equipment Supplier (UAE & Qatar)',
    heroLead:
      'Indexed catalog supply for commercial fitness clubs, residential compounds, hotels, schools, and sports facilities—covering strength accessories (SP-02) and institutional athletic gear (SP-01) across the UAE and Qatar.',
    heroImage: '/images/gym-equipment-maintenance-hero.webp',
    heroImageAlt:
      'Commercial fitness studio and gym flooring equipped with weight racks, bumper plates, and Olympic barbells',
    quickAnswer:
      'Vision Energy International supplies commercial fitness accessories (SP-02: cast iron & bumper plates, Olympic barbells, kettlebells, studio dumbbells, flooring tiles, racks) and institutional sports equipment (SP-01: football goals, basketball hoops, tennis/padel accessories, netting) across Dubai, Abu Dhabi, Ras Al Khaimah, the UAE, and Qatar. Technical datasheets are available on request.',
    lastUpdated: 'November 27, 2026',
    lastUpdatedIso: '2026-11-27',
    categoryPrefixes: ['SP'],
    relatedServices: [
      {
        slug: 'heavy-equipment-rental',
        title: 'Project Equipment & Logistics Support',
        summary: 'Site handling and coordinated regional supply support across the UAE.',
      },
    ],
    localLinks: [
      { href: '/products?group=SP', label: 'Browse All Sports & Gym Categories' },
      { href: '/contact', label: 'Request Commercial Gym BOQ Quote' },
    ],
    faqItems: [
      ...EXPERTISE_FAQ_ITEMS.filter((item) => item.topic === 'Gym & Laboratory'),
      {
        id: 'faq-gym-catalog-items',
        topic: 'Gym & Laboratory',
        priority: 2,
        question: 'Which commercial gym and sports categories does Vision Energy supply in the UAE and Qatar?',
        answer:
          'Vision Energy supplies Category SP-02 (Commercial Fitness & Gym Accessories: cast iron and bumper plates, Olympic barbells, kettlebells, dumbbells, resistance bands, gym flooring tiles, storage racks) and Category SP-01 (Sports Equipment & Athletic Accessories: football goal systems, basketball hoops and backboards, tennis/padel court accessories, and sports netting).',
      },
      {
        id: 'faq-gym-datasheets',
        topic: 'Gym & Laboratory',
        priority: 2,
        question: 'Can Vision Energy supply project datasheets and custom equipment configurations for fit-outs?',
        answer:
          'Yes. Technical datasheets and CAD layout references are available on request, items are supplied ex-stock subject to prior sale, and customised equipment finishes or configurations can be arranged subject to manufacturer approval and lead times.',
      },
    ],
    serviceType: 'Commercial Gym & Sports Equipment Supply',
  },
  laboratory: {
    id: 'laboratory',
    seoTitle: 'Laboratory Equipment Supplier UAE & Qatar | Vision Energy',
    seoDescription:
      'Balances, spectroscopy, chromatography, fume cupboards, glassware & soil testing gear supplied in Dubai, Abu Dhabi, RAK & Qatar. Request datasheets.',
    keywords: [
      'Laboratory Equipment Supplier UAE',
      'Analytical Instruments Supplier Dubai',
      'Soil & Concrete Testing Equipment UAE',
      'Fume Cupboards Biological Safety Cabinets',
      'Laboratory Glassware Consumables Supplier Qatar',
      'Vision Energy Laboratory Equipment',
    ],
    eyebrow: 'Priority #2B · Analytical, Scientific & Materials Testing Labs',
    h1: 'Laboratory Equipment & Instrumentation Supplier (UAE & Qatar)',
    heroLead:
      'Consolidated equipment, containment, glassware, cold-chain storage, and civil QC apparatus across 11 indexed laboratory catalog groups serving Dubai, Abu Dhabi, Ras Al Khaimah, the UAE, and Qatar.',
    heroImage: '/images/laboratory-equipment-hero.webp',
    heroImageAlt:
      'Industrial and academic laboratory outfitted with precision analytical balances, glassware, and containment workstations',
    quickAnswer:
      'Vision Energy International supplies 11 indexed laboratory product groups across Dubai, Abu Dhabi, Ras Al Khaimah, the UAE, and Qatar: benchtop equipment (LE), analytical and civil QC instruments (AT), containment & safety cabinets (LS), glassware (LG), pipettes (LH), consumables (LC), meters (LM), furniture (LF), cold storage (TS), water/sterilization (WS), and lab PPE (LPE).',
    lastUpdated: 'November 27, 2026',
    lastUpdatedIso: '2026-11-27',
    categoryPrefixes: ['LE', 'AT', 'LS', 'LG', 'LH', 'LC', 'LM', 'LF', 'TS', 'WS', 'LPE'],
    relatedServices: [
      {
        slug: 'earthing-and-grounding',
        title: 'Clean Laboratory Instrument Earthing',
        summary: 'Low-impedance reference grounding and Type 3 SPDs protecting sensitive analytical benches.',
      },
    ],
    localLinks: [
      { href: '/products?group=LE', label: 'Browse Laboratory Benchtop Equipment (LE)' },
      { href: '/products?group=AT', label: 'Browse Analytical & Soil Testing Systems (AT)' },
      { href: '/products?group=LS', label: 'Browse Fume Hoods & Lab Safety Cabinets (LS)' },
      { href: '/contact', label: 'Submit Laboratory BOQ for Quotation' },
    ],
    faqItems: [
      ...EXPERTISE_FAQ_ITEMS.filter((item) => item.topic === 'Gym & Laboratory'),
      {
        id: 'faq-lab-instruments-scope',
        topic: 'Gym & Laboratory',
        priority: 2,
        question: 'Does Vision Energy supply both analytical instrumentation and construction soil/concrete testing lab gear?',
        answer:
          'Yes. Our AT catalog group covers UV-Vis/FTIR spectroscopy (AT-01), HPLC/GC chromatography (AT-02), atomic absorption elemental analyzers (AT-03), particle analyzers (AT-04), alongside concrete & cement compression testing (AT-05), soil & aggregate sieve shakers (AT-06), and industrial inspection gauges (AT-07), complemented by LE benchtop units, LS fume hoods, LG glassware, and LPE protective wear.',
      },
      {
        id: 'faq-lab-delivery-uae-qatar',
        topic: 'Gym & Laboratory',
        priority: 2,
        question: 'How does Vision Energy handle technical submittals for laboratory equipment orders in UAE & Qatar?',
        answer:
          'Upon receiving your laboratory equipment BOQ or inquiry, our technical desk provides product datasheets, manufacturer configurations, and ex-stock vs. factory lead-time schedules from our Ras Al Khaimah head office and Dubai/Abu Dhabi branches, coordinating delivery across all UAE emirates and Qatar.',
      },
    ],
    serviceType: 'Laboratory Equipment, Analytical Instruments & Consumables Supply',
  },
};

export function getExpertiseSubpage(id: string): ExpertiseSubpageConfig | null {
  if (id === 'lightning' || id === 'earthing' || id === 'gym' || id === 'laboratory') {
    return EXPERTISE_SUBPAGES[id];
  }
  return null;
}

export function buildExpertiseSubpageJsonLd(config: ExpertiseSubpageConfig) {
  const pageUrl = `${SITE_URL}/expertise/${config.id}`;
  const ogImage = `${SITE_URL}${config.heroImage}`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: config.seoTitle,
        headline: config.h1,
        description: config.seoDescription,
        inLanguage: 'en-AE',
        datePublished: '2026-11-26',
        dateModified: config.lastUpdatedIso,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${pageUrl}#service` },
        publisher: { '@id': `${SITE_URL}/#organization` },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: ogImage,
          caption: config.heroImageAlt,
        },
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: [
            '#subpage-hero h1',
            '#subpage-hero p',
            '#quick-answer-box',
            '#subpage-faq [data-aeo-answer]',
          ],
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Expertise', item: `${SITE_URL}/expertise` },
          { '@type': 'ListItem', position: 3, name: config.h1, item: pageUrl },
        ],
      },
      {
        '@type': 'Service',
        '@id': `${pageUrl}#service`,
        name: config.h1,
        serviceType: config.serviceType,
        description: config.quickAnswer,
        url: pageUrl,
        areaServed: COMPANY_FACTS.areaServedSchema,
        provider: { '@id': `${SITE_URL}/#organization` },
      },
      ...(config.faqItems.length > 0
        ? [
            {
              '@type': 'FAQPage',
              '@id': `${pageUrl}#faq`,
              mainEntity: config.faqItems.map((item) => ({
                '@type': 'Question',
                name: item.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: item.answer,
                },
              })),
            },
          ]
        : []),
    ],
  };
}
