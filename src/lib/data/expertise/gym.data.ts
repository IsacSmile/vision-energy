import type { ExpertiseTabConfig } from './types';

export const gymData: ExpertiseTabConfig = {
  id: 'gym',
  label: 'Gym',
  eyebrow: 'Gym Equipment & Solutions',
  heading: 'Commercial Gym & Sports Equipment Solutions',
  description:
    'Project equipment supply and technical schedule coordination for commercial fitness centres, hospitality health clubs, residential compounds, and institutional athletic facilities across Dubai, Abu Dhabi, Ras Al Khaimah, the wider UAE, and Qatar.',
  steps: [
    {
      id: 'gym-categories',
      stepNumber: 1,
      title: 'Commercial Fitness & Athletic Equipment Categories',
      intro:
        'Vision Energy International supplies structured commercial gym accessories (SP-02) and multi-sport institutional equipment (SP-01) backed by manufacturer datasheets, ex-stock availability subject to prior sale, and configurable supply schedules.',
      cards: [
        {
          id: 'gym-sp-02',
          title: 'Commercial Fitness & Gym Accessories (SP-02)',
          subtitle: 'Strength, conditioning & studio fit-out',
          description:
            'Heavy-duty cast iron and bumper plates, Olympic barbells, resistance bands, protective gym flooring tiles, kettlebells, studio dumbbells, and structural equipment storage racks engineered for high-traffic fitness centres and sports clubs.',
        },
        {
          id: 'gym-sp-01',
          title: 'Sports Equipment & Athletic Accessories (SP-01)',
          subtitle: 'Institutional courts & multi-sport grounds',
          description:
            'Football goal systems, basketball hoops and backboards, tennis and padel court accessories, athletic training cones, boundary markers, sports netting, and referee gear aligned with school, community, and commercial facility specifications.',
        },
      ],
      cardColumns: 2,
      images: [
        {
          src: '/images/gym-equipment-maintenance-hero.webp',
          alt: 'Commercial fitness centre strength training zone outfitted with durable weight racks and gym flooring in the UAE',
          width: 1920,
          height: 1080,
          surface: 'photo',
          caption:
            'Commercial gym and athletic equipment supply coordinated with project BOQs across Dubai, Abu Dhabi, Ras Al Khaimah, and Qatar.',
        },
      ],
    },
    {
      id: 'gym-schedule',
      stepNumber: 2,
      title: 'Catalog Categories & Facility Applications',
      intro:
        'Equipment lines from our SP-01 and SP-02 product groups support strength suites, multipurpose studios, and outdoor recreational courts with documented product specifications.',
      subTabs: [
        {
          id: 'gym-matrix',
          label: 'Equipment Schedule',
          tables: [
            {
              id: 'gym-categories-table',
              caption: 'Verified Vision Energy Gym & Sports Product Scope (SP-01 & SP-02)',
              headers: ['Catalog Code', 'Category', 'Included Product Families', 'Primary Facility Types'],
              rows: [
                [
                  'SP-02',
                  'Commercial Fitness & Gym Accessories',
                  'Cast iron & bumper plates, Olympic barbells, kettlebells, studio dumbbells, resistance bands, gym flooring tiles, storage racks',
                  'Commercial gyms, hotel health clubs, residential towers, corporate wellness rooms',
                ],
                [
                  'SP-01',
                  'Sports Equipment & Athletic Accessories',
                  'Football goal systems, basketball hoops & backboards, tennis & padel court accessories, training cones, boundary markers, sports netting',
                  'Schools, universities, villas & compounds, sports clubs, municipal recreation facilities',
                ],
              ],
              footnote:
                'Technical datasheets and custom configuration options are available on request across Dubai, Abu Dhabi, Ras Al Khaimah, the UAE, and Qatar.',
            },
          ],
        },
      ],
    },
    {
      id: 'gym-workflow',
      stepNumber: 3,
      title: 'Gym & Sports Facility Procurement Workflow',
      intro:
        'Our sales and technical coordination desk aligns equipment lists with project schedules, site access requirements, and documentation submittals.',
      processFlow: {
        heading: 'Facility Supply Delivery Sequence',
        subheading: 'Structured supply coordination across the UAE and Qatar',
        stages: [
          {
            id: 'gym-brief',
            stepCode: '01',
            title: 'Project Brief & BOQ Intake',
            description:
              'Review room count, functional zones (free weights, turf, courts), target delivery window, and project emirate or country (UAE or Qatar).',
            iconKey: 'enquiry',
          },
          {
            id: 'gym-docs',
            stepCode: '02',
            title: 'Specification & Datasheet Submittal',
            description:
              'Prepare itemized SP-01 and SP-02 category schedules with product family options and technical sheets for client or consultant sign-off.',
            iconKey: 'documents',
          },
          {
            id: 'gym-coord',
            stepCode: '03',
            title: 'Lead-Time & Dispatch Planning',
            description:
              'Confirm ex-stock allocations or manufacturer lead times for custom configurations prior to staged site mobilization.',
            iconKey: 'design',
          },
          {
            id: 'gym-handover',
            stepCode: '04',
            title: 'Site Delivery & Support',
            description:
              'Coordinate commercial delivery paperwork, packing verification, and post-supply technical coordination across UAE & Qatar projects.',
            iconKey: 'handover',
          },
        ],
        footnote:
          'Direct technical support available via +971 7 204 2763, WhatsApp +971 54 700 4616, or info@visionenergyme.com.',
      },
    },
  ],
};
