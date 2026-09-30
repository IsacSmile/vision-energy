export interface WhyChooseUsItem {
  id: string;
  number: string;
  title: string;
  description: string;
}

export const WHY_CHOOSE_US_HEADER = {
  eyebrow: 'Why Vision Energy',
  title: 'A Partner You Can Rely On',
  description:
    'Combining specialist knowledge, quality products, and responsive support for your project.',
};

export const OUR_COMMITMENT_PULL_QUOTE =
  'We only supply certified, eco-conscious products meeting recognized international standards to protect people, assets, and the environment.';

export const WHY_CHOOSE_US_ITEMS: WhyChooseUsItem[] = [
  {
    id: 'specialised-expertise',
    number: '01',
    title: 'Specialised Expertise',
    description:
      'Deep engineering knowledge in lightning protection and low-impedance earthing.',
  },
  {
    id: 'multi-brand-support',
    number: '02',
    title: 'Multi-brand Support',
    description:
      'Access top global brands matched to your technical specifications and budget.',
  },
  {
    id: 'complete-project-support',
    number: '03',
    title: 'Complete Project Support',
    description:
      'End-to-end guidance from consultation through installation support and testing.',
  },
  {
    id: 'regulatory-awareness',
    number: '04',
    title: 'Regulatory Awareness',
    description:
      'Full compliance with IEC, BS EN, NFPA, and UAE local authority requirements.',
  },
  {
    id: 'customised-solutions',
    number: '05',
    title: 'Customised Solutions',
    description:
      'Tailored engineering designs to suit specific site geology and project demands.',
  },
  {
    id: 'quality-assurance',
    number: '06',
    title: 'Quality Assurance',
    description:
      'Certified, high-durability products engineered for long-term reliability.',
  },
];
