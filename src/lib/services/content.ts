// SEED SOURCE ONLY - The public site and admin read from the database via lib/data/services.ts
export interface SystemItem {
  title: string;
  body: string;
  points: string[];
}

export interface ProcessStep {
  title: string;
  description: string;
  confirmed: boolean;
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface ServiceContentConfig {
  hero?: {
    lead: string;
  };
  overview?: string;
  systems?: SystemItem[];
  included?: string[];
  whereWeInstall?: string[];
  process?: ProcessStep[];
  standards?: string[];
  complianceNote?: string;
  faq?: FAQItem[];
  relatedCategoryCodes?: string[];
  metaChips?: string[];
}

// Typed configuration for services keyed by slug
export const SERVICES_CONTENT: Record<string, ServiceContentConfig> = {
  'external-lightning-protection-installation': {
    hero: {
      lead: 'Installation of external lightning protection systems for commercial buildings, industrial plants, warehouses, substations, infrastructure, hospitality facilities, schools, villas and critical installations.',
    },
    overview:
      'A lightning protection system is not simply a lightning rod on a roof. It is a complete engineered protection network that gives lightning energy a controlled path to earth, reducing risk to people, structures and electrical equipment. Vision Energy installs external lightning protection using conventional mesh systems and, for suitable structures, ESE terminals.',
    systems: [
      {
        title: 'Conventional Mesh / Faraday Cage Systems',
        body: 'For buildings requiring multiple controlled paths for lightning energy, Vision Energy provides conventional protection using air terminals, roof conductor mesh, connected down conductors, test joints and a coordinated earthing network.',
        points: [
          'Air terminals',
          'Roof conductor mesh',
          'Continuous down conductors',
          'Test joints',
          'Earth pits',
        ],
      },
      {
        title: 'ESE Coverage Concept',
        body: 'For suitable structures, an ESE terminal can be incorporated into a complete external lightning protection solution. The terminal is installed on a mast above the highest protected plane, with PVC-covered copper down conductors, test points, equipotential bonding and a dedicated lightning earthing system. Protection coverage is confirmed through the final engineering assessment, installation height and applicable standards.',
        points: [
          'ESE terminal on a mast',
          'PVC-covered copper down conductors',
          'Test points',
          'Dedicated earth pits',
        ],
      },
    ],
    whereWeInstall: [
      'Commercial and residential developments',
      'High-rise and mixed-use buildings',
      'Warehouses and logistics facilities',
      'Industrial plants and manufacturing facilities',
      'Oil and gas support facilities',
      'Substations, utility infrastructure and telecom sites',
      'Hotels, schools, healthcare facilities and government buildings',
      'Villas, compounds and community facilities',
      'Data, security and communication-critical installations',
    ],
    process: [
      {
        title: 'Enquiry and project brief',
        description: 'Scope, location, building type and protection objective.',
        confirmed: true,
      },
      {
        title: 'Documents and initial review',
        description: 'Drawings, layouts, specifications and available records.',
        confirmed: true,
      },
      {
        title: 'Site visit and building survey',
        description: 'Roof, facade, access, services, structure and exposure.',
        confirmed: true,
      },
      {
        title: 'Installation and supervision',
        description: 'Specified routing, connections, earth pit execution and quality control.',
        confirmed: true,
      },
      {
        title: 'Testing and commissioning',
        description: 'Continuity, earth resistance and inspection verification.',
        confirmed: false,
      },
      {
        title: 'Handover and future support',
        description: 'Reports, photographs, completion records and maintenance support.',
        confirmed: false,
      },
    ],
    standards: [
      'BS EN 62305',
      'IEC 62305',
      'IEC 62561',
      'NFC 17-102 (ESE systems, where applicable)',
      'NFPA 780 (where applicable)',
    ],
    complianceNote:
      'Final technical and test criteria are confirmed against project requirements, actual site conditions and applicable authority requirements.',
    relatedCategoryCodes: ['LP-01', 'LP-02', 'LP-03', 'LP-04', 'ER-02', 'ER-04'],
    metaChips: ['Conventional mesh systems', 'ESE systems'],
    faq: [],
  },
  'manpower-supply': {
    hero: {
      lead: 'Vision Energy can also provide manpower services for your project.',
    },
    metaChips: ['Specialist Manpower', 'Technical Support'],
    // TODO: Client to provide manpower service details (trades, engagement terms, coverage).
  },
};
