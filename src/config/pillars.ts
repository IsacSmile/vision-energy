export interface PillarConfig {
  id: string;
  index: string;
  title: string;
  iconName: 'Zap' | 'Wrench' | 'Sun' | 'ShieldCheck' | 'ClipboardCheck';
  description: string;
  imageUrl: string;
  imageAlt: string;
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
    imageUrl:
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'Industrial electrical cabling and grounding installation',
    description:
      'Engineered electrical solutions for safety, efficiency, and performance across MEP and industrial projects.',
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
    imageUrl:
      'https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'Mechanical piping, HVAC, and industrial plant installation',
    description:
      'Dependable HVAC, plumbing, fire protection, and piping systems built for demanding environments.',
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
    imageUrl:
      'https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'Solar PV renewable energy installation and clean power systems',
    description:
      'Smart solar and clean energy systems designed to reduce costs and advance energy independence.',
    categoryCodes: ['EN-01', 'EN-02', 'EN-03'],
    href: '/products?codes=EN-01,EN-02,EN-03&name=Renewable%20Energy%20Solutions',
  },
  {
    id: 'technical',
    index: '04',
    title: 'Technical Solutions',
    iconName: 'ShieldCheck',
    imageUrl:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'High-tech electrical power distribution and surge protection infrastructure',
    description:
      'Engineered protection systems and specialized compliance support for critical infrastructure.',
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
    imageUrl:
      'https://plus.unsplash.com/premium_photo-1678766819199-5660bab7085b?q=80&w=1200&auto=format&fit=crop',
    imageAlt: 'Project installation and electrical engineering technician support',
    description:
      'End-to-end technical coordination, installation guidance, and testing to certified standards.',
    metaOverride: 'Installation & after-sales support',
    href: '/services',
    highlightBorder: true,
  },
];
