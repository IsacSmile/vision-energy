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
      lead: 'Certified external and internal lightning protection systems (LPS) engineered to safeguard commercial buildings, high-rises, industrial plants, warehouses, substations, healthcare facilities, schools, villas, and critical installations across the UAE.',
    },
    overview:
      'Lightning can cause structural damage and severe electrical hazards to buildings and critical infrastructure. Vision Energy delivers comprehensive end-to-end Lightning Protection Systems (LPS)—from project risk assessment and multi-brand engineering design aligned with IEC 62305 and BS EN 62305 to installation and ongoing testing—supporting structural safety, fire mitigation, and equipment surge protection.',
    systems: [
      {
        title: 'Conventional Lightning Protection Systems',
        body: 'A standardized system comprising Franklin air rods, roof conductors, down conductors, and grounding networks. Engineered using the Rolling Sphere method, Protection Angle technique, or Faraday Mesh Cage system to intercept direct strikes, safely conduct current down the building, and disperse high-voltage electrical energy into the earth without sparking or side-flashing.',
        points: [
          'Franklin air terminals & elevated roof rods',
          'Conductor mesh layout & protection angle sizing',
          'Rolling sphere risk verification (Class I - IV)',
          'Continuous bare copper & PVC-sheathed down conductors',
          'Disconnect test links & deep-driven earth pits',
        ],
      },
      {
        title: 'Early Streamer Emission (ESE) Systems',
        body: 'Advanced active lightning protection utilizing an ionizing triggering terminal to emit an early upward streamer before conventional rods, intercepting lightning strikes at higher altitudes for a larger protective radius. Incorporates 4 operational modes: Neutral mode during normal conditions, Ionization mode during storm buildup, Upward Leader emission upon strike detection, and Interception capture mode above the protected zone.',
        points: [
          'Advanced ESE ionization terminals (tested to NFC 17-102)',
          'Rigid support masts & aerodynamic mounting fixtures',
          'High-conductivity PVC insulated down conductors',
          'Lightning event strike counters & test boxes',
          'Dedicated low-impedance earth termination grids',
        ],
      },
      {
        title: 'Surge Protection Devices & Grounding Systems',
        body: 'Secondary surge mitigation safeguarding electrical, mechanical, and electronic equipment against lightning-induced power surges, transient overvoltage, and step-and-touch potentials across electrical switchgear, electronic control units, and building automation panels.',
        points: [
          'Type 1, Type 2 & Type 3 surge protection devices (SPDs)',
          'Equipotential bonding busbars & test links',
          'Exothermic welded connections & copper earth electrodes',
          'Preventive weather monitoring sensors & detection units',
        ],
      },
    ],
    whereWeInstall: [
      'Commercial and residential developments',
      'High-rise and mixed-use towers',
      'Warehouses and logistics facilities',
      'Industrial plants and manufacturing facilities',
      'Oil and gas support facilities',
      'Substations, utility infrastructure and telecom sites',
      'Government buildings, hospitals, schools and universities',
      'Ports, stadiums, malls and recreational beach areas',
      'Data centers, security and communication-critical installations',
    ],
    process: [
      {
        title: 'Risk assessment & criteria evaluation',
        description: 'IEC 62305-2 risk evaluation calculating strike probabilities, human safety (R1), and required protection level (Level 1 to 4).',
        confirmed: true,
      },
      {
        title: 'Methodology & system engineering',
        description: 'Method selection (Rolling Sphere, Mesh, or ESE), structural modeling, CAD submittals, and consultant review coordination.',
        confirmed: true,
      },
      {
        title: 'Multi-brand supply & QA inspection',
        description: 'Sourcing certified components from leading global brands tailored to site specifications, authority codes, and client budget.',
        confirmed: true,
      },
      {
        title: 'Precision on-site installation',
        description: 'Air terminals, down conductor routing, test disconnect joints, and exothermic welded ground connections by trained technicians.',
        confirmed: true,
      },
      {
        title: 'Testing, verification & commissioning',
        description: 'Continuity checks, earth resistance testing with calibrated meters, baseline strike counter logging, and handover sign-off.',
        confirmed: true,
      },
      {
        title: 'Ongoing maintenance & inspection support',
        description: 'Periodic audits, post-storm verification, spare parts coordination, and preventative maintenance ensuring lasting system readiness.',
        confirmed: true,
      },
    ],
    standards: [
      'IEC 62305 (Protection against lightning - Parts 1 to 4)',
      'BS EN 62305 (Structural protection & surge suppression code)',
      'NFC 17-102 (Early Streamer Emission ESE systems)',
      'NFPA 780 (Standard for the Installation of Lightning Protection Systems)',
      'IEC 62561 (Lightning protection system components & clamps)',
      'UAE Civil Defence & Local Utility Authority Regulations',
    ],
    complianceNote:
      'All lightning protection systems are designed, installed, and certified in strict accordance with IEC 62305, NFPA 780, NFC 17-102, and UAE Civil Defence technical regulations.',
    relatedCategoryCodes: ['LP-01', 'LP-02', 'LP-03', 'LP-04', 'ER-02', 'ER-04'],
    metaChips: ['Conventional mesh systems', 'ESE systems', 'Surge Protection', 'Civil Defence Compliant'],
    faq: [
      {
        q: 'Why is a Lightning Protection System (LPS) recommended for UAE buildings?',
        a: 'High-rise towers, industrial facilities, and open installations face lightning strike exposure across the UAE. An engineered LPS supports personnel safety, helps reduce structural damage and fire hazards, and protects sensitive electrical equipment when coordinated with earthing and surge suppression.'
      },
      {
        q: 'What is the difference between Conventional and ESE lightning protection?',
        a: 'Conventional systems use Franklin air rods and Faraday mesh conductors to intercept strikes at the roof level. Early Streamer Emission (ESE) systems use an active ionizing terminal to emit an upward leader earlier, providing a wider protective radius with fewer roof penetrations for suitable structures.'
      },
      {
        q: 'What protection levels are used in lightning risk assessment?',
        a: 'Under IEC 62305, protection levels range from Level 1 (highest protection for explosive, chemical, hospital, and critical facilities) down to Level 4 (standard protection), based on strike density, occupancy, structural height, and consequence analysis.'
      },
    ],
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
      'Established 2018 with more than 160 projects completed across the UAE',
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
      'Established 2018 with more than 160 projects completed across the UAE',
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
