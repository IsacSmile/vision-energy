export interface ProcessStepItem {
  step: number;
  stepLabel?: string;
  title: string;
  description: string;
}

export interface ServiceDetailSection {
  id?: string;
  title: string;
  content: string | string[];
}

export interface StandardServiceDetailPage {
  slug: string;
  aliases?: string[];
  badgeLabel: string;
  title: string;
  intro: string;
  sectionsBeforeProcess?: ServiceDetailSection[];
  processSection?: {
    title: string;
    description?: string;
    steps: ProcessStepItem[];
  };
  sectionsAfterProcess?: ServiceDetailSection[];
  contactSection?: {
    heading?: string;
    text: string;
    buttonText: string;
    buttonLink: string;
  };
  seo: {
    title: string;
    description: string;
  };
}

export const SERVICE_DETAIL_PAGES: Record<string, StandardServiceDetailPage> = {
  'earthing-grounding': {
    slug: 'earthing-grounding',
    aliases: ['earthing-and-grounding'],
    badgeLabel: 'EARTHING & BONDING',
    title: 'Earthing That Holds Up in UAE Ground: How Vision Energy Builds Systems That Pass the Test',
    intro:
      'Certified low-impedance earthing systems engineered for demanding UAE ground conditions.',
    sectionsBeforeProcess: [
      {
        id: 'why-uae-soil-is-a-challenge',
        title: 'Why UAE Soil Is a Challenge',
        content:
          'UAE ground varies widely within a single site. Dry desert sand has very high resistivity and resists carrying fault current into the earth. Rocky ground makes it hard to drive electrodes deep. Saline sabkha soil near the coast conducts well but corrodes buried metal quickly. A design that works on one site can fail on another, which is why we never use a one-size-fits-all approach.',
      },
    ],
    processSection: {
      title: 'Our Four-Step Process',
      description:
        'A systematic, engineering-led workflow ensuring low-resistance dissipation, permanent exothermic bonding, and full authority compliance.',
      steps: [
        {
          step: 1,
          stepLabel: 'Step 1',
          title: 'Soil Study',
          description:
            'Soil resistivity testing and site assessment, so the design is based on measured data, not assumptions.',
        },
        {
          step: 2,
          stepLabel: 'Step 2',
          title: 'Earth Electrodes',
          description:
            'Earth rods, deep-driven electrodes and earth pits, with ground enhancement materials where the soil needs it.',
        },
        {
          step: 3,
          stepLabel: 'Step 3',
          title: 'Bonding Network',
          description:
            'Earth bars, structural steel and metallic services connected into one network using exothermic welded joints.',
        },
        {
          step: 4,
          stepLabel: 'Step 4',
          title: 'Test & Record',
          description:
            'Earth resistance and continuity testing, handed over with full documented records.',
        },
      ],
    },
    sectionsAfterProcess: [
      {
        id: 'why-clients-choose-vision-energy',
        title: 'Why Clients Choose Vision Energy',
        content:
          'We cover the entire job, from soil testing to final certification, so you deal with one accountable contractor. Our systems are designed to BS 7430, IEEE 80, and UAE utility standards (DEWA, SEWA, FEWA), installed by trained technicians using calibrated test equipment, and documented to the standard consultants and authorities expect.',
      },
    ],
    contactSection: {
      heading: 'Ready to Plan Your Earthing Network?',
      text:
        'Planning a project? Contact Vision Energy for a site assessment and earthing design that is tested and proven before handover.',
      buttonText: 'Request a Site Assessment',
      buttonLink: '/contact',
    },
    seo: {
      title: 'Earthing & Grounding Systems UAE | Vision Energy International',
      description:
        'Certified earthing & grounding system design and installation in the UAE. Engineered for high-resistivity desert soil and coastal sabkha ground. BS 7430 and IEEE 80 compliant.',
    },
  },
  'system-design-and-installation': {
    slug: 'system-design-and-installation',
    aliases: ['system-design-installation'],
    badgeLabel: 'SYSTEM DESIGN & INSTALLATION',
    title: 'Complete Electrical & MEP System Design and Installation Across the UAE',
    intro:
      'Turnkey engineering design, authority approval coordination, and precision installation for mission-critical MEP, power, and earthing infrastructure.',
    sectionsBeforeProcess: [
      {
        id: 'integrated-engineering-approach',
        title: 'Integrated Engineering & Practical Delivery',
        content:
          'From initial project scope review to final consultant sign-off, Vision Energy coordinates all technical submittals, load schedules, single-line diagrams, and authority compliance. We ensure equipment selections align with client specifications, local utility circulars (DEWA, SEWA, DoE, EtihadWE), and international safety standards.',
      },
    ],
    processSection: {
      title: 'Our Four-Step Delivery Process',
      description:
        'A seamless engineering pipeline from specification review through to testing, commissioning, and final authority handover.',
      steps: [
        {
          step: 1,
          stepLabel: 'Step 1',
          title: 'Design & Modeling',
          description:
            'Detailed CAD/BIM modeling, load calculations, and technical submittals tailored to site constraints.',
        },
        {
          step: 2,
          stepLabel: 'Step 2',
          title: 'Authority Coordination',
          description:
            'Alignment with municipality, Civil Defence, and utility standards to secure streamlined milestone approvals.',
        },
        {
          step: 3,
          stepLabel: 'Step 3',
          title: 'Specialist Installation',
          description:
            'On-site installation executed by certified technicians using Gulf-grade materials and rigorous QA/QC.',
        },
        {
          step: 4,
          stepLabel: 'Step 4',
          title: 'Testing & Handover',
          description:
            'Calibrated continuity testing, baseline logs, and complete O&M documentation for transparent consultant sign-off.',
        },
      ],
    },
    sectionsAfterProcess: [
      {
        id: 'why-vision-energy-design',
        title: 'Why Choose Vision Energy for System Design',
        content:
          'One single point of contact coordinates technical queries, quotations, submittals, and physical delivery. Our engineers consider thermal shifts, humidity, and serviceability to guarantee equipment that is safer, more reliable, and easier to maintain over its operating lifespan.',
      },
    ],
    contactSection: {
      heading: 'Discuss Your System Design & Installation Requirements',
      text:
        'Connect with our engineering team for technical reviews, submittals, and tailored installation proposals across the UAE and GCC.',
      buttonText: 'Request System Consultation',
      buttonLink: '/contact',
    },
    seo: {
      title: 'System Design & Installation UAE | Vision Energy International',
      description:
        'Turnkey MEP, electrical, lightning, and earthing system design and installation across the UAE. Fully aligned with DEWA, SEWA, and Civil Defence standards.',
    },
  },
  'risk-assessment': {
    slug: 'risk-assessment',
    aliases: ['lightning-risk-assessment'],
    badgeLabel: 'RISK ASSESSMENT',
    title: 'Certified Lightning & Electrical Surge Risk Assessment for UAE Facilities',
    intro:
      'Rigorous risk calculation and mitigation studies compliant with BS EN / IEC 62305-2, NFPA 780, and UAE Civil Defence technical regulations.',
    sectionsBeforeProcess: [
      {
        id: 'why-risk-assessment-matters',
        title: 'Safeguarding People, Assets, and Uptime',
        content:
          'A certified risk assessment determines the necessity and optimal design of lightning and surge protection systems. We evaluate strike probability, structural dimensions, environmental exposure, and financial consequence to recommend proportional, cost-effective protection measures.',
      },
    ],
    processSection: {
      title: 'Our Assessment Methodology',
      description:
        'Standards-compliant risk modeling to identify critical vulnerability zones and deliver certified authority reports.',
      steps: [
        {
          step: 1,
          stepLabel: 'Step 1',
          title: 'Data Collection',
          description:
            'Structural dimensions, ground flash density, incoming service lines, and internal equipment sensitivity mapping.',
        },
        {
          step: 2,
          stepLabel: 'Step 2',
          title: 'Loss & Risk Computation',
          description:
            'Evaluation of risk components (R1: loss of human life, R2: loss of public service, R4: economic value) against tolerable limits.',
        },
        {
          step: 3,
          stepLabel: 'Step 3',
          title: 'Mitigation Engineering',
          description:
            'Specification of LPS protection level (Class I to IV), coordinated surge protection devices (SPDs), and bonding requirements.',
        },
        {
          step: 4,
          stepLabel: 'Step 4',
          title: 'Submittal Package',
          description:
            'Comprehensive technical report, calculations, and drawings ready for consultant and Civil Defence approval.',
        },
      ],
    },
    sectionsAfterProcess: [
      {
        id: 'authority-compliance-risk',
        title: 'Full Regulatory and Authority Compliance',
        content:
          'Our risk assessments are carried out by qualified protection specialists adhering strictly to IEC 62305 standards and local Civil Defence circulars, ensuring prompt project clearances and uncompromised safety.',
      },
    ],
    contactSection: {
      heading: 'Book a Certified Risk Assessment Study',
      text:
        'Need an authority-approved risk study for your project? Contact our engineering specialists for rapid turnaround and expert support.',
      buttonText: 'Request Risk Assessment',
      buttonLink: '/contact',
    },
    seo: {
      title: 'Lightning Risk Assessment UAE | Vision Energy International',
      description:
        'Certified lightning and surge risk assessment to IEC 62305-2 and UAE Civil Defence regulations. Protect buildings, industrial plants, and substations.',
    },
  },
  'heavy-equipment-rental': {
    slug: 'heavy-equipment-rental',
    aliases: ['equipment-rental'],
    badgeLabel: 'HEAVY EQUIPMENT RENTAL',
    title: 'Reliable Heavy Equipment & Machinery Rental for UAE Infrastructure Projects',
    intro:
      'Certified mobile plant, generators, drilling rigs, and construction equipment supplied with qualified operators across Dubai, Abu Dhabi, and the Northern Emirates.',
    sectionsBeforeProcess: [
      {
        id: 'equipment-reliability',
        title: 'Modern Fleet Built for Demanding Gulf Conditions',
        content:
          'Vision Energy provides well-maintained heavy equipment and machinery rentals tailored to civil, MEP, oil & gas, and infrastructure works. All machinery undergoes strict pre-mobilization inspection, third-party certification, and routine preventive servicing to guarantee continuous job-site productivity.',
      },
    ],
    processSection: {
      title: 'Our Rental & Support Process',
      description:
        'Fast mobilization, compliant documentation, and dedicated 24/7 technical support from inquiry to project demobilization.',
      steps: [
        {
          step: 1,
          stepLabel: 'Step 1',
          title: 'Scope & Sizing',
          description:
            'We review your project specs, operating environment, and capacity requirements to match the right equipment.',
        },
        {
          step: 2,
          stepLabel: 'Step 2',
          title: 'Certification & Inspection',
          description:
            'Complete third-party valid safety certificates, operator competency cards, and comprehensive maintenance logs.',
        },
        {
          step: 3,
          stepLabel: 'Step 3',
          title: 'Rapid Mobilization',
          description:
            'Direct on-site transport, setup, and operational briefing anywhere in Dubai, Abu Dhabi, or the Northern Emirates.',
        },
        {
          step: 4,
          stepLabel: 'Step 4',
          title: 'On-Site Technical Support',
          description:
            '24/7 technical backup, routine fluid and filter servicing, and immediate replacement sourcing if required.',
        },
      ],
    },
    sectionsAfterProcess: [
      {
        id: 'why-rent-with-vision-energy',
        title: 'Why Contractors Partner with Vision Energy',
        content:
          'Transparent rental terms, competitive short-term and long-term rates, fully certified machinery, and responsive field mechanics ensure zero site downtime and strict compliance with UAE safety regulations.',
      },
    ],
    contactSection: {
      heading: 'Inquire About Heavy Equipment Availability & Rates',
      text:
        'Looking for reliable equipment rentals for your next project? Get in touch with our fleet coordination team for fast availability confirmation.',
      buttonText: 'Request Equipment Quote',
      buttonLink: '/contact',
    },
    seo: {
      title: 'Heavy Equipment Rental UAE | Vision Energy International',
      description:
        'Certified heavy equipment, generator, and machinery rental across Dubai, Abu Dhabi, and the UAE. Third-party certified with 24/7 support.',
    },
  },
  'custom-engraving-and-identification': {
    slug: 'custom-engraving-and-identification',
    aliases: ['engraved-plates-and-equipment-identification', 'engraving'],
    badgeLabel: 'CUSTOM ENGRAVING',
    title: 'Custom Engraved Plates, Cable Tags & Equipment Identification in the UAE',
    intro:
      'Precision laser-engraved stainless steel, aluminium, and acrylic tags, warning plates, and cable labels engineered for harsh UAE industrial and MEP environments.',
    sectionsBeforeProcess: [
      {
        id: 'durable-industrial-identification',
        title: 'Built to Last in Gulf Operating Conditions',
        content:
          'Vision Energy manufactures custom engraved labels, valve tags, warning signs, earth pit labels, and cable markers. Designed for electrical switchgear, substations, solar plants, and oil & gas installations, our plates resist UV degradation, extreme heat, and coastal corrosion.',
      },
    ],
    processSection: {
      title: 'Our Custom Engraving Process',
      description:
        'Rapid turnaround from schedule verification to precision CNC laser engraving and site delivery.',
      steps: [
        {
          step: 1,
          stepLabel: 'Step 1',
          title: 'Schedule Review',
          description:
            'We review your equipment tag schedules, font specifications, text sizes, and hole punching requirements.',
        },
        {
          step: 2,
          stepLabel: 'Step 2',
          title: 'Material Selection',
          description:
            'Choice of 316 stainless steel, anodized aluminium, brass, or multi-layered traffolyte suited to indoor or outdoor exposure.',
        },
        {
          step: 3,
          stepLabel: 'Step 3',
          title: 'Precision Engraving',
          description:
            'High-contrast fiber laser and rotary engraving ensuring permanent, crisp legibility.',
        },
        {
          step: 4,
          stepLabel: 'Step 4',
          title: 'Quality Verification & Dispatch',
          description:
            'Every batch is verified against site schedules, packaged by panel / system, and delivered with compatible fixings and rivets.',
        },
      ],
    },
    sectionsAfterProcess: [
      {
        id: 'applications-and-materials',
        title: 'Comprehensive Material & Format Options',
        content:
          'We supply stainless steel cable tags with ball-lock ties, traffolyte panel labels, valve tags, warning & hazard signs, earth pit identification markers, and asset barcodes adhering to DEWA, SEWA, and Civil Defence standards.',
      },
    ],
    contactSection: {
      heading: 'Order Custom Engraved Plates & Tags',
      text:
        'Send us your schedule or drawings for immediate pricing, material samples, and fast delivery across the UAE.',
      buttonText: 'Request Engraving Quote',
      buttonLink: '/contact',
    },
    seo: {
      title: 'Custom Engraved Plates & Tags UAE | Vision Energy International',
      description:
        'Custom laser engraved stainless steel plates, aluminium tags, traffolyte labels, and warning signs across Dubai and UAE. Fast delivery for MEP and industrial projects.',
    },
  },
};

/**
 * Helper to retrieve a service detail configuration by slug or any registered alias
 */
export function getStandardServicePage(slug: string): StandardServiceDetailPage | null {
  if (!slug) return null;
  const normalized = slug.toLowerCase().trim();

  // Direct match
  if (SERVICE_DETAIL_PAGES[normalized]) {
    return SERVICE_DETAIL_PAGES[normalized];
  }

  // Alias lookup
  for (const page of Object.values(SERVICE_DETAIL_PAGES)) {
    if (page.aliases && page.aliases.includes(normalized)) {
      return page;
    }
  }

  return null;
}
