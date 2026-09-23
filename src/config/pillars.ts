export interface PillarConfig {
  id: string;
  index: string;
  title: string;
  iconName: 'Zap' | 'Wrench' | 'Sun' | 'ShieldCheck' | 'ClipboardCheck';
  description: string;
  categoryCodes?: string[];
  metaOverride?: string;
  href: string;
  highlightBorder?: boolean;
}

export const PILLARS_CONFIG: PillarConfig[] = [
  {
    id: 'electrical',
    index: '01',
    title: 'Electrical Solutions',
    iconName: 'Zap',
    description:
      'Power your project with reliable electrical solutions engineered for safety, efficiency, and long-term performance. Explore our range of quality products for MEP, industrial, commercial, and infrastructure applications.',
    categoryCodes: [
      'EL-01',
      'EL-02',
      'EL-03',
      'EL-04',
      'EL-05',
      'EL-07',
      'EL-08',
      'EL-09',
      'EL-10',
      'EL-12',
      'CB-01',
      'CB-02',
      'CB-03',
      'CB-04',
      'CT-01',
      'CT-02',
      'CT-03',
      'CM-01',
      'CM-02',
      'CM-03',
      'CM-04',
      'LT-02',
      'LT-03',
      'LT-04',
      'SG-01',
      'SG-02',
    ],
    href: '/products?codes=EL-01,EL-02,EL-03,EL-04,EL-05,EL-07,EL-08,EL-09,EL-10,EL-12,CB-01,CB-02,CB-03,CB-04,CT-01,CT-02,CT-03,CM-01,CM-02,CM-03,CM-04,LT-02,LT-03,LT-04,SG-01,SG-02&name=Electrical%20Solutions',
  },
  {
    id: 'mechanical',
    index: '02',
    title: 'Mechanical Solutions',
    iconName: 'Wrench',
    description:
      'Built for demanding environments, our mechanical solutions combine proven products with practical technical expertise. Discover dependable systems for HVAC, plumbing, fire protection, and industrial projects.',
    categoryCodes: [
      'ME-01',
      'ME-02',
      'ME-03',
      'ME-04',
      'ME-05',
      'ME-06',
      'HW-01',
      'HW-02',
      'HW-03',
      'HW-04',
      'HW-05',
      'SG-03',
    ],
    href: '/products?codes=ME-01,ME-02,ME-03,ME-04,ME-05,ME-06,HW-01,HW-02,HW-03,HW-04,HW-05,SG-03&name=Mechanical%20Solutions',
  },
  {
    id: 'renewable',
    index: '03',
    title: 'Renewable Energy Solutions',
    iconName: 'Sun',
    description:
      'Advance your energy strategy with smart renewable-energy solutions designed to reduce operating costs, improve energy independence, and support sustainable performance across modern buildings, industrial facilities, and infrastructure projects.',
    categoryCodes: ['EN-01', 'EN-02', 'EN-03'],
    href: '/products?codes=EN-01,EN-02,EN-03&name=Renewable%20Energy%20Solutions',
  },
  {
    id: 'technical',
    index: '04',
    title: 'Technical Solutions',
    iconName: 'ShieldCheck',
    description:
      'Complex requirements need the right technical response. Explore specialized products, engineered system solutions, and expert support tailored to your project’s performance and compliance needs.',
    categoryCodes: [
      'LP-01',
      'LP-02',
      'LP-03',
      'LP-04',
      'ER-01',
      'ER-02',
      'ER-03',
      'ER-04',
      'EL-06',
      'EL-11',
      'LT-01',
      'SG-04',
    ],
    href: '/products?codes=LP-01,LP-02,LP-03,LP-04,ER-01,ER-02,ER-03,ER-04,EL-06,EL-11,LT-01,SG-04&name=Technical%20Solutions',
  },
  {
    id: 'support',
    index: '05',
    title: 'Project Installation & Support',
    iconName: 'ClipboardCheck',
    description:
      'Beyond supply, we help deliver results. From product selection and technical coordination to installation guidance and after-sales support, our team keeps your project moving with confidence. We coordinate with trusted partners and provide installation support to ensure every solution is delivered, installed, and commissioned to the required standard.',
    metaOverride: 'Installation & after-sales support',
    href: '/services',
    highlightBorder: true,
  },
];
