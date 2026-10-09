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
      "Every electrical system depends on one thing most people never see: the earthing network beneath it. When a fault or lightning strike happens, that network decides whether the current goes safely into the ground or through equipment and people. As an earthing and lightning protection contractor in the UAE, Vision Energy International designs and installs earthing systems built for the region's demanding ground conditions.",
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
