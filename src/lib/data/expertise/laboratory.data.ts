import type { ExpertiseTabConfig } from './types';

export const laboratoryData: ExpertiseTabConfig = {
  id: 'laboratory',
  label: 'Laboratory',
  eyebrow: 'Laboratory Equipment & Solutions',
  heading: 'Laboratory Equipment, Instrumentation & Supply Solutions',
  description:
    'Comprehensive technical sourcing and scheduled project supply spanning 11 specialized laboratory catalog groups—from analytical instruments, balances, fume cupboards, and biological safety cabinets to glassware, PPE, and construction materials testing apparatus across the UAE and Qatar.',
  steps: [
    {
      id: 'lab-disciplines',
      stepNumber: 1,
      title: 'Core Laboratory Equipment & Analytical Disciplines',
      intro:
        'Vision Energy supports industrial quality-control labs, civil and geotechnical testing laboratories, academic research centres, and healthcare facilities across Dubai, Abu Dhabi, Ras Al Khaimah, the UAE, and Qatar.',
      cards: [
        {
          id: 'lab-card-benchtop',
          title: 'Core Benchtop & Thermal Equipment (LE-01 to LE-06)',
          subtitle: 'Balances, ovens, incubators & centrifuges',
          description:
            'Analytical and precision balances, hotplates, magnetic stirrers, dry block heaters, vortex mixers, orbital shakers, bench centrifuges, ultrasonic cleaners, drying ovens, incubators, vacuum pumps, and desiccators.',
        },
        {
          id: 'lab-card-analytical',
          title: 'Analytical & Materials Testing Systems (AT-01 to AT-07)',
          subtitle: 'Spectroscopy, chromatography & civil QC',
          description:
            'UV-Visible and FTIR spectroscopy systems, HPLC and gas chromatography, atomic absorption spectrometers, moisture and particle analyzers, concrete and cement compression machines, soil and aggregate sieve shakers, and inspection gauges.',
        },
        {
          id: 'lab-card-containment',
          title: 'Safety, Furniture & Clean Water Systems (LS, LF, TS, WS)',
          subtitle: 'Containment cabinets, benches & sterilization',
          description:
            'Fume cupboards, biological safety cabinets, emergency safety equipment, chemical storage cabinets, chemical-resistant laboratory benches, lab refrigerators, ultra-low freezers, water purification, glassware washers, and sterilizers.',
        },
      ],
      cardColumns: 3,
      images: [
        {
          src: '/images/laboratory-equipment-hero.webp',
          alt: 'Scientific testing laboratory equipped with analytical benchtop instruments, safety enclosures, and precision glassware',
          width: 1920,
          height: 1080,
          surface: 'photo',
          caption:
            'Turnkey laboratory equipment and consumable schedules tailored to industrial QA/QC, civil engineering, and academic testing facilities.',
        },
        {
          src: '/product-catalouge/AT-01.png',
          alt: 'Analytical spectroscopy and laboratory testing instrumentation family supplied by Vision Energy',
          width: 1024,
          height: 576,
          surface: 'dark',
          caption:
            'Precision spectroscopy (AT-01), chromatography (AT-02), elemental (AT-03), and materials testing apparatus.',
        },
      ],
    },
    {
      id: 'lab-catalog-groups',
      stepNumber: 2,
      title: 'Complete 11-Group Laboratory Supply Catalog',
      intro:
        'Every laboratory discipline is organized into indexed product codes with technical datasheets available on request for tender submittals and facility commissioning.',
      subTabs: [
        {
          id: 'lab-matrix-table',
          label: 'Catalog Groups',
          tables: [
            {
              id: 'laboratory-groups-table',
              caption: 'Vision Energy Laboratory Product Groups Across UAE & Qatar',
              headers: ['Group', 'Range', 'Focus Area', 'Key Product Families Included'],
              rows: [
                [
                  'LE',
                  'LE-01 to LE-06',
                  'Laboratory Equipment',
                  'Analytical & precision balances, hotplates, stirrers, shakers, bench centrifuges, drying ovens, incubators, vacuum pumps',
                ],
                [
                  'AT',
                  'AT-01 to AT-07',
                  'Analytical & Testing',
                  'UV-Vis/FTIR spectroscopy, HPLC/GC chromatography, AAS elemental analyzers, concrete/cement/soil testing, inspection gauges',
                ],
                [
                  'LS',
                  'LS-01 to LS-05',
                  'Laboratory Safety & Containment',
                  'Fume cupboards, biological safety cabinets, emergency eyewash/showers, chemical storage cabinets, spill & waste kits',
                ],
                [
                  'LG',
                  'LG-01 to LG-04',
                  'Glassware & Plasticware',
                  'Beakers, flasks, measuring cylinders, reagent & sample bottles, Petri dishes, wash bottles, tube racks & storage boxes',
                ],
                [
                  'LH',
                  'LH-01 to LH-04',
                  'Liquid Handling & Prep',
                  'Manual & adjustable micropipettes, pipette tips, centrifuge tubes, bottle-top dispensers, cuvettes, weighing boats',
                ],
                [
                  'LC',
                  'LC-01 to LC-04',
                  'Consumables & Filtration',
                  'Microscope slides & cover slips, membrane filter papers, laboratory sealing & sample labelling consumables',
                ],
                [
                  'LM',
                  'LM-01 to LM-04',
                  'Measurement & Monitoring',
                  'pH & conductivity meters, temperature & humidity instruments, continuous data loggers, precision laboratory timers',
                ],
                [
                  'LF / TS',
                  'LF-01..04 & TS-01..04',
                  'Furniture & Cold Storage',
                  'Chemical-resistant benches, instrument tables, lab cabinets, refrigerators, freezers, ultra-low temperature units',
                ],
                [
                  'WS / LPE',
                  'WS-01..05 & LPE-01..06',
                  'Water, Sterilization & PPE',
                  'Water purification systems, glassware washers, sterilizers, drying cabinets, nitrile/chemical gloves, lab coats, N95/FFP3 masks, goggles',
                ],
              ],
              footnote:
                'Customised schedules and product datasheets for all 11 laboratory groups are available on request.',
            },
          ],
        },
      ],
    },
    {
      id: 'lab-sectors',
      stepNumber: 3,
      title: 'Geotechnical, Construction QC & Personal Protection Coverage',
      intro:
        'Alongside general research equipment, Vision Energy stocks heavy-duty geotechnical test equipment and protective gear essential to engineering contractors and site laboratories.',
      checklist: [
        'AT-05 Concrete and Cement Testing: compression testing machines and cement testing apparatus for structural QA laboratories.',
        'AT-06 Soil and Aggregate Testing: sieve shakers, compaction tools, and aggregate classification equipment supporting construction quality checks.',
        'AT-07 Industrial Inspection Instruments: coating thickness gauges, hardness testers, and portable evaluation instruments.',
        'LPE-01 to LPE-06 Laboratory PPE: chemical-resistant and heat-resistant gloves, lab coats, FFP2/FFP3 respirators, safety goggles, and anti-slip lab footwear.',
      ],
    },
    {
      id: 'lab-procurement-workflow',
      stepNumber: 4,
      title: 'Laboratory Procurement & Submittal Coordination',
      intro:
        'Streamlined vendor coordination for greenfield laboratory fit-outs and recurring replenishment across Dubai, Abu Dhabi, Ras Al Khaimah, the UAE, and Qatar.',
      processFlow: {
        heading: 'Laboratory Supply Delivery Process',
        subheading: 'Consolidated documentation, lead-time visibility, and regional dispatch',
        stages: [
          {
            id: 'lab-req',
            stepCode: '01',
            title: 'BOQ & Discipline Review',
            description:
              'Map equipment schedules across LE, AT, LS, LF, TS, WS, LG, LH, LC, LM, and LPE catalog codes.',
            iconKey: 'enquiry',
          },
          {
            id: 'lab-datasheet',
            stepCode: '02',
            title: 'Datasheet & Spec Compilation',
            description:
              'Issue model datasheets, voltage/utility checks (e.g., ovens, fume hoods, chillers), and compliance records for technical sign-off.',
            iconKey: 'documents',
          },
          {
            id: 'lab-stock',
            stepCode: '03',
            title: 'Stock Allocation & Custom Orders',
            description:
              'Confirm ex-stock glassware/PPE quantities and manufacturer lead times for calibrated analytical systems.',
            iconKey: 'approval',
          },
          {
            id: 'lab-delivery',
            stepCode: '04',
            title: 'Regional Delivery & After-Sales',
            description:
              'Deliver consolidated shipments across Dubai, Abu Dhabi, Ras Al Khaimah, the UAE, and Qatar with post-delivery coordination.',
            iconKey: 'handover',
          },
        ],
        footnote:
          'Request consolidated lab equipment quotes via info@visionenergyme.com or +971 7 204 2763.',
      },
    },
  ],
};
