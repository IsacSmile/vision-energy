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

export interface EngagementOption {
  title: string;
  description: string;
}

export interface HowItWorksStep {
  step: number;
  title: string;
  description: string;
}

export interface ServiceContentConfig {
  hero?: {
    lead: string;
    image?: string;
    imageAlt?: string;
  };
  overview?: string;
  manpowerWeSupply?: string[];
  engagementOptions?: EngagementOption[];
  whatsIncluded?: string[];
  complianceAndSafety?: string[];
  whyChooseUs?: string[];
  howItWorks?: HowItWorksStep[];
  ctaButtonText?: string;
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
      lead: 'Skilled electrical, mechanical and solar manpower for projects across the UAE. We supply individual technicians or complete site teams, mobilized with their own tools, testing equipment and PPE, for short shutdowns or long-term contracts.',
      image: '/images/specialist-engineering-manpower-supply.jpg',
      imageAlt: 'Specialist engineering manpower and certified technicians on site in UAE',
    },
    metaChips: ['Specialist Manpower', 'Technical Support', 'MOHRE Compliant', 'Rapid Mobilization'],
    overview:
      'Skilled electrical, mechanical and solar manpower for projects across the UAE. We supply individual technicians or complete site teams, mobilized with their own tools, testing equipment and PPE, for short shutdowns or long-term contracts.',
    manpowerWeSupply: [
      'Electrical technicians and electricians',
      'Lightning protection and earthing installers',
      'Solar PV installation technicians',
      'Mechanical and MEP technicians',
      'Site engineers and site supervisors',
      'QA/QC inspectors',
      'Skilled helpers and installers',
    ],
    engagementOptions: [
      {
        title: 'Emergency / shutdown support',
        description: 'Rapid mobilization for urgent repairs and planned shutdowns',
      },
      {
        title: 'Testing & commissioning',
        description: 'Short-term teams for earth resistance, insulation and system testing',
      },
      {
        title: 'Project-based',
        description: 'A full crew for the duration of your installation',
      },
      {
        title: 'Long-term contracts',
        description: 'Dedicated manpower for ongoing operations and maintenance',
      },
    ],
    whatsIncluded: [
      'Calibrated testing meters with valid calibration certificates',
      'Specialized installation tooling',
      'Full PPE for every worker',
      'On-site supervision and QA/QC reporting',
    ],
    complianceAndSafety: [
      'Workers employed in line with UAE labour law and MOHRE regulations',
      'HSE-trained personnel following site safety requirements',
      'Midday work break rules observed during the summer months',
      'Third-party HSE cards and UAE authority approvals',
    ],
    whyChooseUs: [
      '10+ years supplying technical manpower in the UAE',
      'Mobilization within 24-48 hours for urgent requests',
      'Specialists in lightning protection and earthing, not generic labour supply',
      'One point of contact from mobilization to handover',
    ],
    howItWorks: [
      {
        step: 1,
        title: 'Share your requirement',
        description: 'Trades, headcount, location and duration',
      },
      {
        step: 2,
        title: 'Receive a quotation and CVs',
        description: 'Commercial proposal and CVs of the proposed team',
      },
      {
        step: 3,
        title: 'Mobilization to site',
        description: 'We mobilize the team to site with tools and PPE',
      },
      {
        step: 4,
        title: 'Supervised execution',
        description: 'Supervised execution with regular progress and QA/QC reports',
      },
    ],
    ctaButtonText: 'Request Manpower',
  },
  'specialist-engineering-manpower-supply': {
    hero: {
      lead: 'Skilled electrical, mechanical and solar manpower for projects across the UAE. We supply individual technicians or complete site teams, mobilized with their own tools, testing equipment and PPE, for short shutdowns or long-term contracts.',
      image: '/images/specialist-engineering-manpower-supply.jpg',
      imageAlt: 'Specialist engineering manpower and certified technicians on site in UAE',
    },
    metaChips: ['Specialist Manpower', 'Technical Support', 'MOHRE Compliant', 'Rapid Mobilization'],
    overview:
      'Skilled electrical, mechanical and solar manpower for projects across the UAE. We supply individual technicians or complete site teams, mobilized with their own tools, testing equipment and PPE, for short shutdowns or long-term contracts.',
    manpowerWeSupply: [
      'Electrical technicians and electricians',
      'Lightning protection and earthing installers',
      'Solar PV installation technicians',
      'Mechanical and MEP technicians',
      'Site engineers and site supervisors',
      'QA/QC inspectors',
      'Skilled helpers and installers',
    ],
    engagementOptions: [
      {
        title: 'Emergency / shutdown support',
        description: 'Rapid mobilization for urgent repairs and planned shutdowns',
      },
      {
        title: 'Testing & commissioning',
        description: 'Short-term teams for earth resistance, insulation and system testing',
      },
      {
        title: 'Project-based',
        description: 'A full crew for the duration of your installation',
      },
      {
        title: 'Long-term contracts',
        description: 'Dedicated manpower for ongoing operations and maintenance',
      },
    ],
    whatsIncluded: [
      'Calibrated testing meters with valid calibration certificates',
      'Specialized installation tooling',
      'Full PPE for every worker',
      'On-site supervision and QA/QC reporting',
    ],
    complianceAndSafety: [
      'Workers employed in line with UAE labour law and MOHRE regulations',
      'HSE-trained personnel following site safety requirements',
      'Midday work break rules observed during the summer months',
      'Third-party HSE cards and UAE authority approvals',
    ],
    whyChooseUs: [
      '10+ years supplying technical manpower in the UAE',
      'Mobilization within 24-48 hours for urgent requests',
      'Specialists in lightning protection and earthing, not generic labour supply',
      'One point of contact from mobilization to handover',
    ],
    howItWorks: [
      {
        step: 1,
        title: 'Share your requirement',
        description: 'Trades, headcount, location and duration',
      },
      {
        step: 2,
        title: 'Receive a quotation and CVs',
        description: 'Commercial proposal and CVs of the proposed team',
      },
      {
        step: 3,
        title: 'Mobilization to site',
        description: 'We mobilize the team to site with tools and PPE',
      },
      {
        step: 4,
        title: 'Supervised execution',
        description: 'Supervised execution with regular progress and QA/QC reports',
      },
    ],
    ctaButtonText: 'Request Manpower',
  },
  'earthing-and-grounding': {
    hero: {
      lead: 'Low-resistance earthing grids, chemical earth enhancement, and deep well earth electrodes.',
    },
    metaChips: ['Grounding Systems', 'Earth Pits'],
  },
  'earthing-grounding-system-design-installation': {
    hero: {
      lead: 'Low-resistance earthing grids, chemical earth enhancement, and deep well earth electrodes.',
    },
    metaChips: ['Grounding Systems', 'Earth Pits'],
  },
};
