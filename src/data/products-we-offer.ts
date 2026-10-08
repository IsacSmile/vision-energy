export interface ProductCardItem {
  id: string;
  name: string;
  description: string;
  image: string;
  alt: string;
  slug?: string;
  code?: string;
}

export interface ProductRowGroup {
  row: number;
  label: string;
  products: ProductCardItem[];
}

export const PRODUCTS_WE_OFFER_ROWS: ProductRowGroup[] = [
  {
    row: 1,
    label: 'Protection & Earthing',
    products: [
      {
        id: 'p-01',
        name: 'Lightning Protection System',
        description: 'Safely conducts lightning current to ground, protecting structures and equipment.',
        image: '/product-catalouge/LP-01.jpeg',
        alt: 'Vision Energy Lightning Protection System',
        slug: 'conventional-lightning-protection-systems',
        code: 'LP-01',
      },
      {
        id: 'p-02',
        name: 'Earthing System & Accessories',
        description: 'Reliable earth connections, from copper conductors to complete earth pits.',
        image: '/product-catalouge/ER-04.jpeg',
        alt: 'Vision Energy Earthing System & Accessories',
        slug: 'earth-electrode-and-bonding-accessories',
        code: 'ER-04',
      },
      {
        id: 'p-03',
        name: 'Surge Protection Systems',
        description: 'Protects equipment from power surges and transient voltage spikes.',
        image: '/product-catalouge/EL-06.jpeg',
        alt: 'Vision Energy Surge Protection Systems',
        slug: 'surge-protection-devices',
        code: 'EL-06',
      },
    ],
  },
  {
    row: 2,
    label: 'Weather & Aviation',
    products: [
      {
        id: 'p-04',
        name: 'Weather Monitoring System',
        description: 'Real-time weather data and analytics for site and operations planning.',
        image: '/product-catalouge/SG-04.jpeg',
        alt: 'Vision Energy Weather Monitoring System',
        slug: 'weather-monitoring-systems',
        code: 'SG-04',
      },
      {
        id: 'p-05',
        name: 'Weather Warning Sensors',
        description: 'Early alerts for severe weather, lightning and high winds.',
        image: '/product-catalouge/EL-09.jpeg',
        alt: 'Vision Energy Weather Warning Sensors',
        slug: 'industrial-sensors-encoders-and-connectors',
        code: 'EL-09',
      },
      {
        id: 'p-06',
        name: 'Aircraft Warning Lights',
        description: 'Obstruction lights making tall structures visible to aircraft, day and night.',
        image: '/product-catalouge/LT-01.jpeg',
        alt: 'Vision Energy Aircraft Warning Lights',
        slug: 'aviation-helipad-and-marine-lighting',
        code: 'LT-01',
      },
    ],
  },
  {
    row: 3,
    label: 'Safety & Hazardous Areas',
    products: [
      {
        id: 'p-07',
        name: 'Signaling Beacons & Towers',
        description: 'Visual and audible signaling for industrial and offshore sites.',
        image: '/product-catalouge/LT-04.jpeg',
        alt: 'Vision Energy Signaling Beacons & Towers',
        slug: 'signal-beacons-and-tower-lights',
        code: 'LT-04',
      },
      {
        id: 'p-08',
        name: 'Explosion Proof Devices',
        description: 'Certified equipment for hazardous areas that prevents ignition.',
        image: '/product-catalouge/EL-11.jpeg',
        alt: 'Vision Energy Explosion Proof Devices',
        slug: 'explosion-proof-equipment-and-accessories',
        code: 'EL-11',
      },
      {
        id: 'p-09',
        name: 'Safety Items',
        description: 'PPE, fire safety equipment and signage for personnel and sites.',
        image: '/product-catalouge/SF-02.jpeg',
        alt: 'Vision Energy Safety Items & PPE',
        slug: 'industrial-personal-protective-equipment-ppe',
        code: 'SF-02',
      },
    ],
  },
  {
    row: 4,
    label: 'Panels & Controls',
    products: [
      {
        id: 'p-10',
        name: 'Panel Components',
        description: 'Switches, push buttons, indicators and meters for control panels.',
        image: '/product-catalouge/EL-03.jpeg',
        alt: 'Vision Energy Panel Components',
        slug: 'control-panel-components',
        code: 'EL-03',
      },
      {
        id: 'p-11',
        name: 'Automation Items',
        description: 'PLCs, HMIs and control modules for industrial automation.',
        image: '/product-catalouge/EL-08.jpeg',
        alt: 'Vision Energy Automation Items & Sensors',
        slug: 'industrial-automation-and-sensors',
        code: 'EL-08',
      },
      {
        id: 'p-12',
        name: 'Controls & Switchgear Accessories',
        description: 'Breakers, contactors and relays for safe current management.',
        image: '/product-catalouge/EL-05.jpeg',
        alt: 'Vision Energy Controls & Switchgear Accessories',
        slug: 'electrical-protection-and-control-components',
        code: 'EL-05',
      },
    ],
  },
  {
    row: 5,
    label: 'Solar & Renewable Energy',
    products: [
      {
        id: 'p-13',
        name: 'Solar Panels',
        description: 'High-quality panels for residential, commercial and industrial use.',
        image: '/product-catalouge/EN-01.jpeg',
        alt: 'Vision Energy Solar Panels',
        slug: 'solar-pv-components',
        code: 'EN-01',
      },
      {
        id: 'p-14',
        name: 'Solar Water Heaters & Coolers',
        description: 'Solar heating and cooling systems that cut energy costs.',
        image: '/product-catalouge/ME-06.jpeg',
        alt: 'Vision Energy Solar Water Heaters & Coolers',
        slug: 'electric-water-heaters-and-accessories',
        code: 'ME-06',
      },
      {
        id: 'p-15',
        name: 'Solar Lights',
        description: 'Eco-friendly solar lighting for pathways, gardens and outdoor areas.',
        image: '/product-catalouge/EN-02.jpeg',
        alt: 'Vision Energy Solar Lights',
        slug: 'solar-lighting-and-solar-water-heating',
        code: 'EN-02',
      },
    ],
  },
  {
    row: 6,
    label: 'Lighting & Infrastructure',
    products: [
      {
        id: 'p-16',
        name: 'LED Lights',
        description: 'Energy-efficient indoor and outdoor LED lighting solutions.',
        image: '/product-catalouge/LT-02.jpeg',
        alt: 'Vision Energy LED Lights',
        slug: 'led-light-fixtures-and-luminaires',
        code: 'LT-02',
      },
      {
        id: 'p-17',
        name: 'Street Light Poles & Masts',
        description: 'Durable poles and masts for roads and public spaces.',
        image: '/product-catalouge/LT-03.jpeg',
        alt: 'Vision Energy Street Light Poles & Masts',
        slug: 'streetlights-high-masts-and-flagpoles',
        code: 'LT-03',
      },
      {
        id: 'p-18',
        name: 'Flag Poles',
        description: 'Durable flag poles and feather flags for outdoor and events.',
        image: '/product-catalouge/LT-03.jpeg',
        alt: 'Vision Energy Flag Poles',
        slug: 'streetlights-high-masts-and-flagpoles',
        code: 'LT-03',
      },
    ],
  },
  {
    row: 7,
    label: 'Cables & Wiring',
    products: [
      {
        id: 'p-19',
        name: 'Cables & Wires',
        description: 'Cables and wires from trusted brands for every application.',
        image: '/product-catalouge/CB-01.jpeg',
        alt: 'Vision Energy Cables & Wires',
        slug: 'industrial-power-control-and-instrumentation-cables',
        code: 'CB-01',
      },
      {
        id: 'p-20',
        name: 'Wiring Accessories',
        description: 'Sockets, switches and accessories built to high safety standards.',
        image: '/product-catalouge/EL-01.jpeg',
        alt: 'Vision Energy Wiring Accessories',
        slug: 'electrical-switches-and-wiring-accessories',
        code: 'EL-01',
      },
      {
        id: 'p-21',
        name: 'Electrical Fittings',
        description: 'Connectors and fittings for residential to industrial installations.',
        image: '/product-catalouge/CB-04.jpeg',
        alt: 'Vision Energy Electrical Fittings & Connectors',
        slug: 'cable-glands-lugs-and-connectors',
        code: 'CB-04',
      },
    ],
  },
  {
    row: 8,
    label: 'Enclosures & Cable Routing',
    products: [
      {
        id: 'p-22',
        name: 'Junction Boxes & Enclosures',
        description: 'Rugged enclosures protecting components in harsh environments.',
        image: '/product-catalouge/EL-10.jpeg',
        alt: 'Vision Energy Junction Boxes & Enclosures',
        slug: 'enclosures-and-junction-boxes',
        code: 'EL-10',
      },
      {
        id: 'p-23',
        name: 'Conduits & Fittings',
        description: 'Durable conduits and fittings for protected, organized wiring.',
        image: '/product-catalouge/CT-01.jpeg',
        alt: 'Vision Energy Conduits & Fittings',
        slug: 'rigid-gi-and-stainless-steel-conduit-systems',
        code: 'CT-01',
      },
      {
        id: 'p-24',
        name: 'Cable Tray Solutions',
        description: 'Cable trays for safe, organized and accessible cable runs.',
        image: '/product-catalouge/CM-01.jpeg',
        alt: 'Vision Energy Cable Tray Solutions',
        slug: 'cable-management-systems-and-cable-trays',
        code: 'CM-01',
      },
    ],
  },
  {
    row: 9,
    label: 'Cable Management & Tools',
    products: [
      {
        id: 'p-25',
        name: 'Cable Management System',
        description: 'Ladders, trunking and routing for efficient cable infrastructure.',
        image: '/product-catalouge/CM-03.jpeg',
        alt: 'Vision Energy Cable Management System',
        slug: 'cable-ties-heat-sleeves-and-cable-management-accessories',
        code: 'CM-03',
      },
      {
        id: 'p-26',
        name: 'Electrical Tools',
        description: 'Cutters, strippers, testers and precision installation tools.',
        image: '/product-catalouge/HW-03.jpeg',
        alt: 'Vision Energy Electrical Tools & Testers',
        slug: 'tools-and-equipment',
        code: 'HW-03',
      },
      {
        id: 'p-27',
        name: 'Ventilation Fans',
        description: 'Exhaust, inline and industrial fans for better air quality.',
        image: '/product-catalouge/ME-01.jpeg',
        alt: 'Vision Energy Ventilation Fans',
        slug: 'ventilation-systems',
        code: 'ME-01',
      },
    ],
  },
];
