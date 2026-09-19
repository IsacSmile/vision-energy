export interface WhyChooseUsItem {
  id: string;
  number: string;
  iconName: 'BadgeCheck' | 'Layers' | 'ClipboardCheck' | 'ScrollText' | 'SlidersHorizontal' | 'ShieldCheck';
  title: string;
  description: string;
}

export const WHY_CHOOSE_US_ITEMS: WhyChooseUsItem[] = [
  {
    id: 'specialised-expertise',
    number: '01',
    iconName: 'BadgeCheck',
    title: 'Specialised Expertise',
    description:
      'Benefit from our deep understanding of lightning protection systems, with trained specialists and regular technical updates.',
  },
  {
    id: 'multi-brand-support',
    number: '02',
    iconName: 'Layers',
    title: 'Multi-brand Support',
    description:
      'Access solutions from a range of leading brands and origins, matched to your coverage requirements and budget.',
  },
  {
    id: 'complete-project-support',
    number: '03',
    iconName: 'ClipboardCheck',
    title: 'Complete Project Support',
    description:
      'End-to-end support, from consultation and product selection through installation support and after-sales service.',
  },
  {
    id: 'regulatory-awareness',
    number: '04',
    iconName: 'ScrollText',
    title: 'Regulatory Awareness',
    description:
      'Solutions selected to align with recognised international standards and applicable authority requirements.',
  },
  {
    id: 'customised-solutions',
    number: '05',
    iconName: 'SlidersHorizontal',
    title: 'Customised Solutions',
    description:
      'Tailor-made approaches to suit the unique requirements of your project.',
  },
  {
    id: 'quality-assurance',
    number: '06',
    iconName: 'ShieldCheck',
    title: 'Quality Assurance',
    description:
      'Quality-assured products for reliable protection, selected with environmental responsibility in mind.',
  },
];
