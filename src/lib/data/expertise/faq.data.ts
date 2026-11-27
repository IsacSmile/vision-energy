export interface ExpertiseFaqItem {
  id: string;
  topic: 'Lightning' | 'Earthing' | 'Surge & Testing' | 'Gym & Laboratory';
  priority: 1 | 2;
  question: string;
  answer: string;
}

export const EXPERTISE_FAQ_ITEMS: ExpertiseFaqItem[] = [
  {
    id: 'faq-uae-standards',
    topic: 'Lightning',
    priority: 1,
    question:
      'What lightning protection and earthing standards apply to UAE & Qatar projects?',
    answer:
      'Projects across Dubai, Abu Dhabi, Ras Al Khaimah, and the wider UAE follow IEC 62305 and BS EN 62305 (Parts 1–4) for structural risk assessment and external/internal protection, BS EN / IEC 62561 for certified components, BS 7430 and IEC 60364 for earthing and surge coordination, plus NF C 17-102 (ESE) or NFPA 780 where specified—prepared for DEWA, SEWA, Etihad WE, ADDC, DoE, ADCDA, and Abu Dhabi Municipality alignment. For Qatar projects, designs follow applicable IEC/BS international project specifications.',
  },
  {
    id: 'faq-rolling-sphere-levels',
    topic: 'Lightning',
    priority: 1,
    question:
      'What Rolling Sphere radii and Faraday mesh grid sizes correspond to Protection Levels I to IV?',
    answer:
      'Under IEC / BS EN 62305, Class I (Very High Protection) requires a 20 m rolling sphere radius and 5 × 5 m mesh; Class II requires a 30 m sphere and 10 × 10 m mesh; Class III uses a 45 m sphere and 15 × 15 m mesh; and Class IV uses a 60 m rolling sphere and 20 × 20 m mesh.',
  },
  {
    id: 'faq-conventional-vs-ese',
    topic: 'Lightning',
    priority: 1,
    question:
      'How do Conventional Faraday Mesh and Early Streamer Emission (ESE) systems differ?',
    answer:
      'Conventional IEC 62305 systems distribute multiple passive air terminals, roof mesh conductors, and parallel down conductors across a structure. An NF C 17-102 ESE system mounts an active ionization terminal above the highest protected point to trigger an earlier upward leader, achieving a wider calculated protection radius Rp(h) with reduced roof clutter where approved by the project consultant.',
  },
  {
    id: 'faq-high-resistivity-soil',
    topic: 'Earthing',
    priority: 1,
    question:
      'How does Vision Energy achieve low earth resistance in dry, coastal, or rocky UAE soils?',
    answer:
      'Every earthing project starts with on-site soil resistivity measurement and geological survey. Depending on soil strata, our engineers combine pure or copper-bonded rods, deep-bore earthing wells, conductive ground enhancement compounds, corrosion-resistant exothermic welded joints, and equipotential earth bars to achieve verified test readings.',
  },
  {
    id: 'faq-spd-coordination',
    topic: 'Surge & Testing',
    priority: 1,
    question:
      'Why must Surge Protection Devices (SPDs) be installed alongside external lightning rods?',
    answer:
      'External air terminals and down conductors intercept and ground direct strikes, but transient overvoltages still couple inductively or conductively onto incoming power and data lines. Coordinated cascading of Type 1 SPDs (main incoming supply), Type 2 SPDs (sub-distribution panels), and Type 3 / data SPDs (sensitive instrumentation) bonded to a common reference protects electronics.',
  },
  {
    id: 'faq-delivery-workflow',
    topic: 'Earthing',
    priority: 1,
    question:
      'What deliverables are included from initial engineering enquiry through system handover?',
    answer:
      'Vision Energy executes a structured 10-stage workflow: brief review, drawing and layout audit, roof/facade and earthing site survey, risk assessment and soil study, full CAD/calculation engineering design, consultant approval submittal, supervised installation, continuity and fall-of-potential testing, and complete as-built handover certification.',
  },
  {
    id: 'faq-gym-laboratory-scope',
    topic: 'Gym & Laboratory',
    priority: 2,
    question:
      'What technical and procurement support does Vision Energy offer for commercial Gym and Laboratory facilities?',
    answer:
      'Alongside our core lightning protection and earthing engineering practice, Vision Energy supports commercial gym facilities and scientific or industrial laboratories across Dubai, Abu Dhabi, Ras Al Khaimah, the UAE, and Qatar with specialist equipment sourcing, analytical glassware and instruments, project compliance guidance, and regional supply scheduling.',
  },
];

