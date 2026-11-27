import type { ExpertiseTabConfig } from './types';

export const earthingData: ExpertiseTabConfig = {
  id: 'earthing',
  label: 'Earthing',
  eyebrow: 'Earthing & Bonding Systems',
  heading: 'Earthing, Grounding & Surge Protection Engineering',
  description:
    'Design, supply, supervision, testing, and commissioning of earthing, equipotential bonding, and surge protection systems suited to UAE ground conditions.',
  steps: [
    {
      id: 'earthing-bonding',
      stepNumber: 1,
      title: 'Earthing, Grounding & Equipotential Bonding',
      intro:
        "An effective earthing network is fundamental to personnel safety and reliable operation of electrical systems. Vision Energy designs and installs earthing systems suited to the UAE's variable soil conditions, including dry, rocky and high-resistivity environments.",
      processFlow: {
        heading: 'Earthing & Bonding System',
        subheading: 'From soil investigation to tested and documented earth network',
        stages: [
          {
            id: 'soil-study',
            stepCode: '01',
            title: 'Soil Study',
            description: 'Soil resistivity test and site assessment',
            iconKey: 'soil',
          },
          {
            id: 'earth-electrodes',
            stepCode: '02',
            title: 'Earth Electrodes',
            description: 'Rods, deep electrodes, pits and ground enhancement',
            iconKey: 'electrode',
          },
          {
            id: 'bonding-network',
            stepCode: '03',
            title: 'Bonding Network',
            description: 'Earth bars, structural bonding and exothermic joints',
            iconKey: 'bonding',
          },
          {
            id: 'test-record',
            stepCode: '04',
            title: 'Test & Record',
            description: 'Earth resistance, continuity and completion records',
            iconKey: 'test',
          },
        ],
        footnote:
          'Earthing design is determined by project requirements, soil conditions and final test criteria.',
      },
    },
    {
      id: 'earthing-grounding-systems',
      stepNumber: 2,
      title: 'Earthing & Grounding Systems',
      intro:
        'Deep earthing bore preparation and post-installation earth-resistance testing at an accessible inspection chamber.',
      images: [
        {
          src: '/images/expertise/earthing/deep-earthing-bore-testing.webp',
          alt: 'Deep earthing bore drilling preparation with copper electrodes, enhancement compound, and earth-resistance testing at an inspection chamber',
          width: 1200,
          height: 675,
          caption:
            'Deep earthing bore preparation and post-installation earth-resistance testing at an accessible inspection chamber.',
          surface: 'photo',
        },
      ],
    },
    {
      id: 'surge-commissioning',
      stepNumber: 3,
      title: 'Surge Protection & Commissioning',
      intro:
        'External protection should be supported by internal protection wherever sensitive electrical or electronic equipment is present. Vision Energy can provide coordinated surge protection and bonding solutions for electrical distribution systems and critical services.',
      processFlow: {
        heading: 'Surge Protection & Equipotential Bonding',
        subheading: 'Coordinated internal protection for distribution systems and sensitive equipment',
        stages: [
          {
            id: 'incoming-energy',
            stepCode: '01',
            title: 'Incoming Energy',
            description: 'Type 1 SPD at the main incoming supply',
            iconKey: 'incoming',
          },
          {
            id: 'distribution',
            stepCode: '02',
            title: 'Distribution',
            description: 'Type 2 SPD at distribution level',
            iconKey: 'distribution',
          },
          {
            id: 'sensitive-circuits',
            stepCode: '03',
            title: 'Sensitive Circuits',
            description: 'Type 3 / data protection at critical equipment',
            iconKey: 'circuit',
          },
          {
            id: 'bonding',
            stepCode: '04',
            title: 'Bonding',
            description: 'Equipotential bonding provides a coordinated reference',
            iconKey: 'bonding',
          },
        ],
        footnote:
          'Select and coordinate surge protective devices in accordance with the electrical installation and project requirements.',
      },
      images: [
        {
          src: '/images/expertise/earthing/surge-protection-commissioning.webp',
          alt: 'Engineers testing and commissioning surge protection devices and equipotential earth bar inside an electrical distribution panel',
          width: 1200,
          height: 675,
          caption: 'Surge-protection and distribution-panel commissioning by qualified engineers.',
          surface: 'photo',
        },
      ],
    },
    {
      id: 'how-we-work',
      stepNumber: 4,
      title: 'How We Work: From Enquiry to Tested System Handover',
      intro: 'Project delivery process for new construction and existing-building projects.',
      processFlow: {
        heading: 'How We Work',
        subheading: 'From Customer Enquiry to Tested System Handover',
        layout: 'paired',
        stages: [
          {
            id: 'step-01',
            stepCode: '01',
            title: 'Customer Enquiry & Project Brief',
            description: 'Scope, location, building type and protection objective',
            iconKey: 'enquiry',
          },
          {
            id: 'step-02',
            stepCode: '02',
            title: 'Documents & Initial Review',
            description: 'Drawings, layouts, specifications and available records',
            iconKey: 'documents',
          },
          {
            id: 'step-03',
            stepCode: '03',
            title: 'Site Visit & Building Survey',
            description: 'Roof, facade, access, services, structure and exposure',
            iconKey: 'survey',
          },
          {
            id: 'step-04',
            stepCode: '04',
            title: 'New / Existing Earthing Survey',
            description: 'New: mark earth pits. Existing: verify available earth network',
            iconKey: 'earthing',
          },
          {
            id: 'step-05',
            stepCode: '05',
            title: 'Risk Assessment & Soil Study',
            description: 'Lightning risk evaluation and soil-resistivity study',
            iconKey: 'risk',
          },
          {
            id: 'step-06',
            stepCode: '06',
            title: 'Engineering Design Stage',
            description: 'Air terminals, mesh, down conductors, bonding and earth system',
            iconKey: 'design',
          },
          {
            id: 'step-07',
            stepCode: '07',
            title: 'Design / Consultant Approval',
            description: 'Drawings, calculations, material schedule and method statement',
            iconKey: 'approval',
          },
          {
            id: 'step-08',
            stepCode: '08',
            title: 'Installation & Supervision',
            description: 'Approved routing, connections, earth pit execution and quality control',
            iconKey: 'installation',
          },
          {
            id: 'step-09',
            stepCode: '09',
            title: 'Testing & Commissioning',
            description: 'Continuity, earth resistance and inspection verification',
            iconKey: 'commissioning',
          },
          {
            id: 'step-10',
            stepCode: '10',
            title: 'Handover & Future Support',
            description: 'Reports, photographs, completion records and maintenance support',
            iconKey: 'handover',
          },
        ],
        footnote: 'New construction and existing-building projects.',
      },
    },
    {
      id: 'standards-references',
      stepNumber: 5,
      title: 'Standards & Technical References',
      intro:
        'Final design and test criteria are confirmed against approved project requirements, actual site conditions and applicable authority requirements.',
      standardsReference: {
        heading: 'Technical Standards & References',
        subheading: 'Key standards relevant to earthing and lightning protection systems',
        blocks: [
          {
            id: 'bs-en',
            badge: 'BS EN',
            codes: ['BS EN 62305', 'BS EN 62561'],
            description: 'Lightning protection and system components',
          },
          {
            id: 'iec',
            badge: 'IEC',
            codes: ['IEC 62305', 'IEC 62561', 'IEC 60364'],
            description: 'Lightning protection, components and LV installations',
          },
          {
            id: 'nfc',
            badge: 'NFC',
            codes: ['NFC 17-102'],
            description: 'ESE lightning protection systems where applicable',
          },
          {
            id: 'nfpa',
            badge: 'NFPA',
            codes: ['NFPA 780'],
            description: 'Installation of lightning protection systems where applicable',
          },
        ],
        footnote:
          'System design and test criteria follow approved project requirements and site conditions.',
      },
      processFlow: {
        heading: 'Technical Competence',
        subheading: 'Engineered design, verified installation and documented handover',
        stages: [
          {
            id: 'competence-risk',
            stepCode: '01',
            title: 'Risk Assessment',
            description: 'Building exposure, occupancy, geometry and services',
            iconKey: 'risk',
          },
          {
            id: 'competence-design',
            stepCode: '02',
            title: 'Engineering Design',
            description: 'Rolling sphere, protective angle and mesh methods',
            iconKey: 'design',
          },
          {
            id: 'competence-installation',
            stepCode: '03',
            title: 'Quality Installation',
            description: 'Air terminals, down conductors, bonding and earth pits',
            iconKey: 'installation',
          },
          {
            id: 'competence-handover',
            stepCode: '04',
            title: 'Testing & Handover',
            description: 'Continuity, earth resistance, reports and photographs',
            iconKey: 'handover',
          },
        ],
        footnote:
          'Key standards: BS EN 62305 | IEC 62305 | NFC 17-102 where applicable | NFPA 780 where applicable',
      },
    },
  ],
};

