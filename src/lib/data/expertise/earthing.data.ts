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
      images: [
        {
          src: '/images/expertise/earthing/earthing-bonding-flow.webp',
          alt: 'Earthing and bonding system flow: Soil Study, Earth Electrodes, Bonding Network, and Test & Record',
          width: 1200,
          height: 675,
          caption: 'Earthing and bonding system flow.',
          surface: 'light',
        },
      ],
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
      cardColumns: 2,
      images: [
        {
          src: '/images/expertise/earthing/surge-protection-bonding-flow.webp',
          alt: 'Surge protection and equipotential bonding flow: Incoming Energy, Distribution, Sensitive Circuits, and Bonding',
          width: 1200,
          height: 675,
          caption: 'Surge protection and equipotential bonding flow.',
          surface: 'light',
        },
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
      images: [
        {
          src: '/images/expertise/earthing/project-delivery-workflow.webp',
          alt: 'Ten-stage project delivery workflow from 01 Customer Enquiry & Project Brief through 10 Handover & Future Support',
          width: 1200,
          height: 675,
          caption: 'Project delivery process for new construction and existing-building projects.',
          surface: 'light',
        },
      ],
      cardColumns: 2,
      cards: [
        {
          id: 'step-01',
          title: '01 Customer Enquiry & Project Brief',
          description: 'Scope, location, building type and protection objective',
        },
        {
          id: 'step-02',
          title: '02 Documents & Initial Review',
          description: 'Drawings, layouts, specifications and available records',
        },
        {
          id: 'step-03',
          title: '03 Site Visit & Building Survey',
          description: 'Roof, facade, access, services, structure and exposure',
        },
        {
          id: 'step-04',
          title: '04 New / Existing Earthing Survey',
          description: 'New: mark earth pits. Existing: verify available earth network',
        },
        {
          id: 'step-05',
          title: '05 Risk Assessment & Soil Study',
          description: 'Lightning risk evaluation and soil-resistivity study',
        },
        {
          id: 'step-06',
          title: '06 Engineering Design Stage',
          description: 'Air terminals, mesh, down conductors, bonding and earth system',
        },
        {
          id: 'step-07',
          title: '07 Design / Consultant Approval',
          description: 'Drawings, calculations, material schedule and method statement',
        },
        {
          id: 'step-08',
          title: '08 Installation & Supervision',
          description: 'Approved routing, connections, earth pit execution and quality control',
        },
        {
          id: 'step-09',
          title: '09 Testing & Commissioning',
          description: 'Continuity, earth resistance and inspection verification',
        },
        {
          id: 'step-10',
          title: '10 Handover & Future Support',
          description: 'Reports, photographs, completion records and maintenance support',
        },
      ],
    },
    {
      id: 'standards-references',
      stepNumber: 5,
      title: 'Standards & Technical References',
      intro:
        'Final design and test criteria are confirmed against approved project requirements, actual site conditions and applicable authority requirements.',
      images: [
        {
          src: '/images/expertise/earthing/standards-reference-blocks.webp',
          alt: 'Standards reference blocks covering BS EN 62305, BS EN 62561, IEC 62305, IEC 62561, IEC 60364, NFC 17-102, and NFPA 780',
          width: 1200,
          height: 675,
          caption: 'Standards reference blocks.',
          surface: 'light',
        },
        {
          src: '/images/expertise/earthing/technical-competence-overview.webp',
          alt: 'Technical competence overview across Risk Assessment, Engineering Design, Quality Installation, and Testing & Handover',
          width: 1200,
          height: 675,
          caption: 'Technical competence overview.',
          surface: 'light',
        },
      ],
    },
  ],
};

