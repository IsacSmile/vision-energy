import type { ExpertiseTabConfig } from './types';

export const lightningData: ExpertiseTabConfig = {
  id: 'lightning',
  label: 'Lightning',
  eyebrow: 'Lightning Protection Systems',
  heading: 'Lightning Protection Engineering & Technical Guide',
  description:
    'Understand lightning formation, structural risk assessment, system components, conventional and ESE methodologies, and thunderstorm safety.',
  steps: [
    {
      id: 'formation',
      stepNumber: 1,
      title: 'Formation of Lightning',
      intro:
        'Lightning is a rapid discharge of energy between charged regions in the atmosphere or ground, formed by convective air masses creating cumulonimbus clouds. Most lightning occurs within clouds, with around 10% forming cloud-to-ground strikes up to 100 million volts.',
      cardColumns: 2,
      cards: [
        {
          id: 'stage-1',
          title: 'Stage 1',
          description: 'Positive and negative charges get separated in a cloud.',
          image: {
            src: '/images/expertise/lightning/formation-stage-1.webp',
            alt: 'Stage 1 of lightning formation showing positive charges at the top of the cloud and negative charges at the base',
            width: 266,
            height: 205,
            surface: 'photo',
          },
        },
        {
          id: 'stage-2',
          title: 'Stage 2',
          description:
            'The step leader is a flow of negative charges (electrons) towards positive charges.',
          image: {
            src: '/images/expertise/lightning/formation-stage-2.webp',
            alt: 'Stage 2 of lightning formation showing a negative step leader descending from the cloud',
            width: 271,
            height: 193,
            surface: 'photo',
          },
        },
        {
          id: 'stage-3',
          title: 'Stage 3',
          description: 'A flow of positive charges moves towards the step leader.',
          image: {
            src: '/images/expertise/lightning/formation-stage-3.webp',
            alt: 'Stage 3 of lightning formation showing positive charges rising from the ground towards the step leader',
            width: 267,
            height: 206,
            surface: 'photo',
          },
        },
        {
          id: 'stage-4',
          title: 'Stage 4',
          description: 'As the positive and negative charges combine, the lightning stroke is seen.',
          image: {
            src: '/images/expertise/lightning/formation-stage-4.webp',
            alt: 'Stage 4 of lightning formation showing the visible lightning stroke connecting cloud and ground',
            width: 269,
            height: 194,
            surface: 'photo',
          },
        },
      ],
    },
    {
      id: 'risks',
      stepNumber: 2,
      title: 'Risks Associated with Lightning',
      intro:
        'The lightning phenomenon highlights the raw power of nature and the importance of preparedness, mitigation measures, and resilient infrastructure to minimize their impact.',
      cardColumns: 3,
      cards: [
        {
          id: 'human-safety',
          title: 'Human Safety',
          description:
            'Direct strikes can result in electrocution, cardiac arrest, burns, and other serious injuries. Indirect strikes hitting nearby objects or traveling through the ground can also injure or kill individuals.',
        },
        {
          id: 'animals-wildlife',
          title: 'Animals & Wildlife',
          description:
            'Animals are vulnerable to lightning strikes, particularly in open fields or exposed environments. Livestock, wildlife, and pets can suffer injuries or fatalities from direct or indirect strikes.',
        },
        {
          id: 'buildings-infrastructure',
          title: 'Buildings & Infrastructure',
          description:
            'Strikes can cause structural damage to buildings, especially without lightning protection systems. Fires ignited by lightning further exacerbate damage, leading to extensive property loss.',
        },
        {
          id: 'equipment-damages',
          title: 'Equipment & Device Damages',
          description:
            'Lightning-induced power surges can damage electrical and electronic equipment, appliances, and electrical systems, causing costly repairs and disruptions to essential services and communication networks.',
        },
        {
          id: 'cultural-heritage',
          title: 'Cultural & Heritage Impacts',
          description:
            'Lightning threatens cultural buildings, artifacts, and heritage sites, risking irreversible damage and jeopardizing their historical significance for future generations.',
        },
        {
          id: 'economic-impacts',
          title: 'Economic Impacts',
          description:
            'Disruption to manufacturing processes, interruption of critical services, property damage, and insurance claims contribute to significant financial losses for businesses and communities.',
        },
      ],
    },
    {
      id: 'effects-requirement',
      stepNumber: 3,
      title: 'Effects & Requirement of an LPS',
      intro:
        'Occupied spaces—including government buildings, educational institutions, medical facilities, businesses, malls, recreational areas, and residences—require external and internal lightning protection systems, surge protectors, and emergency response plans to reduce damage, injury, and loss.',
      cardColumns: 3,
      cards: [
        {
          id: 'personnel-safety',
          title: 'Personnel Safety',
          description:
            'Ensuring occupant safety during a storm is a crucial objective. By directing lightning current away from the structure via a low-risk path to ground, an LPS reduces injury or electrocution.',
        },
        {
          id: 'direct-strike-protection',
          title: 'Direct Strike Protection',
          description:
            'Lightning rods, air terminals, and conductors intercept the lightning strike and provide a safe path for lightning current to travel to ground, preventing damage to the structure and occupants.',
        },
        {
          id: 'fire-prevention',
          title: 'Fire Prevention',
          description:
            'Lightning strikes can ignite fires in buildings, especially near flammable materials or electrical wiring. A properly designed LPS dissipates electrical energy and minimizes sparks or arcs.',
        },
        {
          id: 'structural-protection',
          title: 'Structural Protection',
          description:
            'Lightning strikes can cause roof damage, fragmentation of masonry, and cracks in walls. Providing a low-resistance path to ground helps mitigate structural damage.',
        },
        {
          id: 'equipment-protection',
          title: 'Equipment Protection',
          description:
            'Electrical, mechanical, and electronic equipment are vulnerable to power surges. Surge protection devices and grounding systems safeguard sensitive equipment from voltage spikes and transient overvoltages.',
        },
      ],
    },
    {
      id: 'engineered-network',
      stepNumber: 4,
      title: 'Components - We have used',
      intro:
        'A lightning protection system is not simply a lightning rod on a roof. It is a complete engineered protection network comprising air terminals, down conductors, bonding connections, earth electrodes and, where required, surge protection devices.',
      paragraphs: [
        'Vision Energy assesses each structure according to its height, use, exposure, roof layout, surrounding buildings, electrical services and soil conditions. We then develop a practical, technically compliant solution that protects the building while respecting architectural, access and maintenance requirements.',
      ],
      cardColumns: 3,
      cards: [
        {
          id: 'air-terminals',
          title: 'Air Terminals',
          subtitle: 'Lightning Rods',
          image: {
            src: '/images/expertise/lightning/component-air-terminals.webp',
            alt: 'Air terminals and lightning rods for intercepting direct lightning strikes',
            width: 454,
            height: 261,
            surface: 'light',
          },
        },
        {
          id: 'conductors',
          title: 'Conductors',
          subtitle: 'Down Conductors',
          image: {
            src: '/images/expertise/lightning/component-conductors.webp',
            alt: 'Copper and aluminium down conductors and tapes for channeling lightning current',
            width: 581,
            height: 334,
            surface: 'light',
          },
        },
        {
          id: 'accessories',
          title: 'Accessories',
          subtitle: 'Bonding & Fixtures',
          image: {
            src: '/images/expertise/lightning/component-accessories.webp',
            alt: 'Brass and copper bonding clamps, saddles, and LPS fixing accessories',
            width: 581,
            height: 334,
            surface: 'light',
          },
        },
        {
          id: 'grounding-system',
          title: 'Grounding System',
          subtitle: 'Earthing',
          image: {
            src: '/images/expertise/lightning/component-grounding-system.webp',
            alt: 'Earthing rods, inspection pits, earth bars, and ground enhancement compound',
            width: 581,
            height: 334,
            surface: 'light',
          },
        },
        {
          id: 'weather-monitoring',
          title: 'Weather Monitoring',
          subtitle: 'Preventive',
          image: {
            src: '/images/expertise/lightning/component-weather-monitoring.webp',
            alt: 'Preventive thunderstorm warning and weather monitoring station equipment',
            width: 690,
            height: 420,
            surface: 'light',
          },
        },
        {
          id: 'surge-protection',
          title: 'Surge Protection Devices',
          subtitle: "SPD's",
          image: {
            src: '/images/expertise/lightning/component-surge-protection.webp',
            alt: 'Modular DIN-rail surge protection devices for electrical panels',
            width: 581,
            height: 334,
            surface: 'light',
          },
        },
      ],
    },
    {
      id: 'functionality',
      stepNumber: 5,
      title: 'Functionality of an LPS',
      intro:
        'A Lightning Protection System performs six core operational functions from early storm detection through compliant energy dissipation.',
      cardColumns: 3,
      cards: [
        {
          id: 'detection',
          title: 'Detection',
          description:
            'Ability to promptly identify nearby lightning activity and maintain a state of constant preparedness, ensuring continuous vigilance and readiness for any potential event.',
        },
        {
          id: 'interception',
          title: 'Interception',
          description:
            'Capture and intercept electrical discharge by guiding it along a designated path using conventional or advanced terminals integrated with the LPS.',
        },
        {
          id: 'dissipation',
          title: 'Dissipation',
          description:
            'Safely dispersing the electrical energy from lightning strikes into the ground to prevent damage to the protected structure and avoid secondary effects.',
        },
        {
          id: 'prevention',
          title: 'Prevention',
          description:
            'Minimizing the risk of fire, structural damage, and injury caused by lightning strikes, ensuring protection to the structure and its occupants.',
        },
        {
          id: 'continuity',
          title: 'Continuity',
          description:
            'Guaranteeing uninterrupted operation of critical systems, ensuring continuity of operations in designated areas and the functionality of essential equipment.',
        },
        {
          id: 'compliance',
          title: 'Compliance',
          description:
            'In accordance with industry standards and regulations essential to ensure optimal functionality and safety of protected areas against risks while maintaining effectiveness.',
        },
      ],
    },
    {
      id: 'risk-assessment',
      stepNumber: 6,
      title: 'Risk Assessment & Level of Protection',
      intro:
        'Risk assessment involves evaluating key site factors to determine the required Lightning Protection System category and protection level.',
      checklist: [
        'Large concentrations of people in public areas.',
        'Areas with high lightning density, indicating elevated strike probabilities, and presence of very tall or isolated buildings vulnerable to lightning strikes.',
        'Structures housing irreplaceable heritage or valuable assets requiring protection.',
        'Requirement for continuity in production or public services to prevent disruptions.',
        'Buildings containing explosive or inflammable materials, posing fire risks during lightning events.',
        'Presence of installations and machinery used for work purposes.',
        'Buildings meeting specific risk index criteria, as determined by standards, indicating the necessity for lightning protection systems within specified protection levels.',
      ],
      paragraphs: [
        'Compliance with risk assessment criteria ensures the implementation of appropriate lightning protection measures to safeguard lives, property, and critical infrastructure.',
      ],
      images: [
        {
          src: '/images/expertise/lightning/protection-levels-chart.webp',
          alt: 'Protection Levels I to IV chart mapping probability of lightning against consequences of a strike',
          width: 1200,
          height: 623,
          caption: 'Protection Levels I (Highest Protection) through Level IV.',
          surface: 'light',
        },
      ],
    },
    {
      id: 'system-types',
      stepNumber: 7,
      title: 'Types of Lightning Protection Systems',
      intro:
        'Explore Conventional methodologies (Rolling Sphere, Protection Angle, and Mesh / Faraday Cage), Early Streamer Emission (ESE) systems, and a direct technical comparison.',
      subTabs: [
        {
          id: 'conventional',
          label: 'Conventional',
          paragraphs: [
            'This system comprises ordinary lightning rods, down conductors, and grounding systems. Lightning rods intercept strikes, down conductors channel the current, and the grounding system disperses energy safely. It is a standardized system designed to mitigate lightning-related risks effectively.',
          ],
          images: [
            {
              src: '/images/expertise/lightning/conventional-lps-overview.webp',
              alt: 'Isometric schematic of a conventional lightning protection system across roof, facade, and grounding network',
              width: 1200,
              height: 675,
              caption: 'Conventional Lightning Protection System architecture.',
              surface: 'light',
            },
          ],
          methodologies: [
            {
              id: 'rolling-sphere',
              title: 'Rolling Sphere',
              paragraphs: [
                'This technique involves rolling an imaginary sphere over a structure to identify potential lightning strike points. It helps determine areas of vulnerability, allowing for the placement of lightning rods or protective measures to mitigate lightning-related risks.',
              ],
              formula: 'Rp = √(2·D·h − h²)',
              images: [
                {
                  src: '/images/expertise/lightning/rolling-sphere-diagram.webp',
                  alt: 'Rolling sphere protection radius diagram showing sphere radius D, terminal height h, and protection radius Rp',
                  width: 356,
                  height: 358,
                  surface: 'light',
                },
              ],
              table: {
                id: 'rolling-sphere-table',
                caption: 'Rolling Sphere Radius by Protection Level',
                headers: ['Protection Level', 'D'],
                rows: [
                  ['LEVEL 1', '20 Meters'],
                  ['LEVEL 2', '30 Meters'],
                  ['LEVEL 3', '45 Meters'],
                  ['LEVEL 4', '60 Meters'],
                ],
                compact: true,
              },
            },
            {
              id: 'protection-angle',
              title: 'Protection Angle',
              paragraphs: [
                'This involves calculating the angle of protection provided by lightning rods on structures to enable engineers to strategically position lightning rods based on factors such as structure height and lightning risk, optimizing protection against lightning-induced damage.',
              ],
              images: [
                {
                  src: '/images/expertise/lightning/protection-angle-cone.webp',
                  alt: 'Protection angle cone diagram showing angle alpha and rod height h',
                  width: 292,
                  height: 307,
                  surface: 'light',
                },
                {
                  src: '/images/expertise/lightning/protection-angle-building.webp',
                  alt: 'Protection angle geometry on building elevation with angles alpha 1 and alpha 2',
                  width: 691,
                  height: 376,
                  surface: 'light',
                },
              ],
              table: {
                id: 'protection-angle-table',
                caption: 'Protection Angle α by Protection Level and Height h (m)',
                headers: ['Protection Level', 'D (m)', 'h = 20 m (α)', 'h = 30 m (α)', 'h = 45 m (α)', 'h = 60 m (α)'],
                rows: [
                  ['I', '20', '25', '*', '*', '*'],
                  ['II', '30', '35', '25', '*', '*'],
                  ['III', '45', '45', '35', '25', '*'],
                  ['IV', '60', '55', '45', '35', '25'],
                ],
              },
            },
            {
              id: 'mesh-system',
              title: 'Conventional Mesh / Faraday Cage Systems',
              paragraphs: [
                'For buildings requiring multiple controlled paths for lightning energy, Vision Energy provides conventional protection using air terminals, roof conductor mesh, connected down conductors, test joints and a coordinated earthing network.',
              ],
              images: [
                {
                  src: '/images/expertise/lightning/conventional-mesh-faraday-cage.webp',
                  alt: 'Conventional mesh system with air terminals, roof mesh, continuous down conductors, test joints, and earth pits',
                  width: 1200,
                  height: 675,
                  caption:
                    'Conventional mesh system: air terminals, roof mesh, continuous down conductors, test joints and earth pits.',
                  surface: 'photo',
                },
                {
                  src: '/images/expertise/lightning/mesh-system-diagram.webp',
                  alt: 'Conductive Faraday cage roof mesh layout diagram illustrating mesh dimension W',
                  width: 575,
                  height: 455,
                  caption: 'Faraday cage conductive mesh sizing (W).',
                  surface: 'light',
                },
              ],
              table: {
                id: 'mesh-system-table',
                caption: 'Mesh Size and Rolling Sphere Radius by LPS Class',
                headers: [
                  'Protection Level Class of LPS',
                  'Radius of Rolling Sphere D (in mtrs.)',
                  'Size of Mesh W (in mtrs.)',
                ],
                rows: [
                  ['LEVEL 1', '20 Meters', '5x5'],
                  ['LEVEL 2', '30 Meters', '10x10'],
                  ['LEVEL 3', '45 Meters', '15x15'],
                  ['LEVEL 4', '60 Meters', '20x20'],
                ],
              },
            },
          ],
        },
        {
          id: 'ese',
          label: 'ESE',
          paragraphs: [
            'For suitable structures, an ESE terminal can be incorporated into a complete external lightning protection solution. The terminal is installed on a mast above the highest protected plane, with PVC-covered copper down conductors, test points, equipotential bonding and a dedicated lightning earthing system. Protection coverage is confirmed through the final engineering assessment, installation height and applicable standards.',
            'The ESE (Early Streamer Emission), also known as an advanced Lightning Protection System, utilizes a triggering device to ionize surrounding air, emitting an early streamer that intercepts lightning strikes before they reach conventional lightning rods, improving structural safety and minimizing potential damage.',
          ],
          images: [
            {
              src: '/images/expertise/lightning/ese-coverage-concept.webp',
              alt: 'ESE coverage concept showing protected volume dome, PVC-covered copper down conductors, and dedicated earth pits',
              width: 1200,
              height: 675,
              caption:
                'ESE coverage concept: protected volume, PVC-covered copper down conductors and dedicated earth pits.',
              surface: 'dark',
            },
            {
              src: '/images/expertise/lightning/ese-concept-diagram.webp',
              alt: 'ESE terminal emitting an upward streamer above a building with protection height h',
              width: 970,
              height: 726,
              caption: 'Upward streamer interception over the protected structure.',
              surface: 'dark',
            },
            {
              src: '/images/expertise/lightning/ese-four-modes-diagram.webp',
              alt: 'Four operating modes of an ESE system: Neutral Mode, Ionization Mode, Upward Leader Emission Mode, and Interception Mode',
              width: 1200,
              height: 353,
              caption:
                'Operating sequence: Neutral Mode, Ionization Mode, Upward Leader Emission Mode, and Interception Mode.',
              surface: 'light',
            },
          ],
          formulaBlock: {
            title: 'ESE Protection Radius Formulas',
            formulas: [
              { condition: 'For 2m ≤ h ≤ 5m', expression: 'Rp(h) = h × Rp(5) / 5' },
              { condition: 'For h ≥ 5m', expression: 'Rp(h) = √(h(2r − h) + Δ(2r + Δ))' },
              { condition: 'Efficiency gain', expression: 'Δ (m) = ΔT(μs) × 10⁶' },
            ],
            notes: [
              'Rp(h) (m) corresponds to the protection radius for a stated height (h).',
              'h (m) corresponds to the height of the tip of the ESE air terminal in relation to the horizontal point passing through the top of the element to be protected.',
              'r (m) = 20m for protection level I [Very High Protection], 30m for level II [High Protection], 45m for level III [Medium Protection], and 60m for level IV [Standard Protection].',
              'Δ is equal to the efficiency obtained during evaluation tests of the ESE air terminal; ΔT is the early streamer emission time obtained in laboratory tests.',
            ],
          },
          methodologies: [
            {
              id: 'ese-radius-geometry',
              title: 'Protection Radius Elevation Geometry',
              images: [
                {
                  src: '/images/expertise/lightning/ese-protection-radius-diagram.webp',
                  alt: 'Building elevation showing ESE terminal protection radii Rp1, Rp2, Rp3 at heights h1, h2, h3',
                  width: 492,
                  height: 639,
                  surface: 'dark',
                },
              ],
            },
          ],
          tables: [
            {
              id: 'ese-protection-radius-table',
              caption: 'ESE Protection Radius Rp (m) by Protection Level and ΔT Rating',
              columnGroups: [
                { label: '', colSpan: 1 },
                { label: 'Protection Level I (D = 20 m)', colSpan: 4 },
                { label: 'Protection Level II (D = 30 m)', colSpan: 4 },
                { label: 'Protection Level III (D = 45 m)', colSpan: 4 },
                { label: 'Protection Level IV (D = 60 m)', colSpan: 4 },
              ],
              headers: [
                'h (m)',
                'Δ15', 'Δ30', 'Δ45', 'Δ60',
                'Δ15', 'Δ30', 'Δ45', 'Δ60',
                'Δ15', 'Δ30', 'Δ45', 'Δ60',
                'Δ15', 'Δ30', 'Δ45', 'Δ60',
              ],
              rows: [
                ['2', '13', '19', '25', '31', '15', '22', '28', '35', '18', '25', '32', '39', '20', '28', '36', '43'],
                ['4', '25', '38', '51', '63', '30', '44', '57', '69', '36', '51', '64', '78', '41', '57', '72', '85'],
                ['6', '32', '48', '63', '79', '38', '55', '71', '87', '46', '64', '81', '97', '52', '72', '90', '107'],
                ['8', '33', '49', '64', '79', '39', '56', '72', '87', '47', '65', '82', '98', '54', '73', '91', '108'],
                ['10', '34', '49', '64', '79', '40', '57', '72', '88', '49', '66', '83', '99', '56', '75', '92', '109'],
                ['20', '35', '50', '65', '80', '44', '59', '74', '89', '55', '71', '86', '102', '63', '81', '97', '113'],
                ['60', '35', '50', '65', '80', '45', '60', '75', '90', '60', '75', '90', '105', '75', '90', '105', '120'],
              ],
              footnote:
                'h (m): Height of the air terminal over the surface to be protected (in meters). D: Rolling sphere radius.',
            },
          ],
        },
        {
          id: 'comparison',
          label: 'Comparison',
          images: [
            {
              src: '/images/expertise/lightning/comparison-systems-overview.webp',
              alt: 'Comparison of protection zones for ESE System, Single Point Lightning rod, and Meshed Cage',
              width: 1185,
              height: 525,
              caption: 'Protected volume comparison: ESE System, Single Point Lightning Rod, and Meshed Cage.',
              surface: 'light',
            },
            {
              src: '/images/expertise/lightning/comparison-interception-sequence.webp',
              alt: 'Four-frame comparison of upward leader interception between ESE and Conventional terminals',
              width: 1200,
              height: 291,
              caption: 'Upward leader and interception comparison between ESE and Conventional terminals.',
              surface: 'dark',
            },
          ],
          tables: [
            {
              id: 'lps-comparison-table',
              caption: 'Comparison of Lightning Protection System Types (Green = Favorable · Red = Unfavorable)',
              headers: ['Criteria', 'ESE System', 'Single Point Lightning rod', 'Meshed Cage'],
              rows: [
                [
                  'Protection Area',
                  { type: 'rating', count: 5, tone: 'positive', label: '5 green rating dots' },
                  { type: 'rating', count: 5, tone: 'negative', label: '5 red rating dots' },
                  { type: 'rating', count: 3, tone: 'negative', label: '3 red rating dots' },
                ],
                [
                  'Protection of Open Area',
                  { type: 'rating', count: 5, tone: 'positive', label: '5 green rating dots' },
                  { type: 'rating', count: 5, tone: 'negative', label: '5 red rating dots' },
                  { type: 'rating', count: 5, tone: 'negative', label: '5 red rating dots' },
                ],
                [
                  'Feasibility of Study',
                  { type: 'rating', count: 5, tone: 'positive', label: '5 green rating dots' },
                  { type: 'rating', count: 3, tone: 'positive', label: '3 green rating dots' },
                  { type: 'rating', count: 5, tone: 'negative', label: '5 red rating dots' },
                ],
                [
                  'Implementation of System',
                  { type: 'rating', count: 5, tone: 'positive', label: '5 green rating dots' },
                  { type: 'rating', count: 5, tone: 'positive', label: '5 green rating dots' },
                  { type: 'rating', count: 5, tone: 'negative', label: '5 red rating dots' },
                ],
                [
                  'Implementation Qualification',
                  { type: 'rating', count: 3, tone: 'positive', label: '3 green rating dots' },
                  { type: 'rating', count: 5, tone: 'positive', label: '5 green rating dots' },
                  { type: 'rating', count: 5, tone: 'negative', label: '5 red rating dots' },
                ],
                [
                  'Aesthetics',
                  { type: 'rating', count: 5, tone: 'positive', label: '5 green rating dots' },
                  { type: 'rating', count: 3, tone: 'positive', label: '3 green rating dots' },
                  { type: 'rating', count: 5, tone: 'negative', label: '5 red rating dots' },
                ],
                [
                  'Budget',
                  { type: 'rating', count: 4, tone: 'positive', label: '4 green rating dots' },
                  { type: 'rating', count: 5, tone: 'positive', label: '5 green rating dots' },
                  { type: 'rating', count: 5, tone: 'negative', label: '5 red rating dots' },
                ],
                [
                  'Maintenance Charges',
                  { type: 'rating', count: 5, tone: 'positive', label: '5 green rating dots' },
                  { type: 'rating', count: 5, tone: 'positive', label: '5 green rating dots' },
                  { type: 'rating', count: 5, tone: 'negative', label: '5 red rating dots' },
                ],
                [
                  'Applicable Standards',
                  'IEC 62305, BS EN 62305, NFC 17-102',
                  'IEC 62305, BS EN 62305',
                  'IEC 62305, BS EN 62305',
                ],
                [
                  'Suitable Structures for Proposal',
                  'Any structures including open structures',
                  'Small structures, towers and antennas',
                  'Structures, including open areas where high masts can be erected',
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'uae-impact',
      stepNumber: 8,
      title: 'Impact of Lightning in the UAE & Qatar',
      intro:
        'High-rise towers, coastal industrial facilities, energy assets, and large infrastructure campuses across the UAE and Qatar face seasonal electrical storm activity and surge hazards.',
      paragraphs: [
        'Engineered Lightning Protection Systems (LPS) and periodic maintenance inspections help safeguard occupants, structures, and sensitive building systems from direct lightning strikes and transient overvoltages.',
        'These systems help safeguard buildings, infrastructure, and individuals from the destructive power of lightning. By incorporating lightning rods, surge protectors, and grounding systems, structures can be better equipped to withstand lightning strikes and mitigate potential damage.',
        'Moreover, steps have been initiated for the latest advancement in lightning protection and lightning detection technologies, alongside public education on lightning safety protocols essential to reducing the impact of lightning-related incidents in the UAE.',
      ],
    },
    {
      id: 'safety-precautions',
      stepNumber: 9,
      title: 'Safety Precautions for Lightning & Thunderstorms',
      intro:
        'Thunderstorms bring with them a host of associated dangers, including tornadoes, powerful winds, hail, and flash flooding. Lightning strikes can also reach the ground, potentially igniting wildfires.',
      subTabs: [
        {
          id: 'before',
          label: 'Before',
          iconItems: [
            { id: 'avoid-open-area', title: 'Avoid open area', iconName: 'trees' },
            {
              id: 'remove-dead-trees',
              title: 'Remove dead or decaying trees and branches',
              iconName: 'axe',
            },
            { id: 'find-shelter', title: 'Find shelter in building', iconName: 'building' },
            { id: 'close-windows', title: 'Close windows', iconName: 'window' },
            { id: 'unplug-appliances', title: 'Unplug appliances', iconName: 'unplug' },
            {
              id: 'check-lps',
              title: 'Check if the LPS devices are installed',
              iconName: 'shield-zap',
            },
          ],
        },
        {
          id: 'during',
          label: 'During',
          iconItems: [
            { id: 'get-inside-car', title: 'Get inside a car', iconName: 'car' },
            { id: 'avoid-metals', title: 'Avoid metals', iconName: 'ban-metal' },
            { id: 'stay-away-windows', title: 'Stay away from windows', iconName: 'window-alert' },
            { id: 'refrain-lps', title: 'Refrain from LPS systems', iconName: 'zap-off' },
            { id: 'do-not-lean-walls', title: 'Do not lean on walls', iconName: 'wall-ban' },
            {
              id: 'avoid-plumbing',
              title: 'Avoid contact with plumbing fixtures',
              iconName: 'droplets',
            },
            { id: 'avoid-corded-phones', title: 'Avoid corded phones', iconName: 'phone-off' },
            {
              id: 'battery-radio',
              title: 'Utilize a battery operated radio',
              iconName: 'radio',
            },
          ],
        },
        {
          id: 'after',
          label: 'After',
          iconItems: [
            {
              id: 'call-emergency',
              title: 'Call emergency services for medical assistance',
              iconName: 'ambulance',
            },
            {
              id: 'avoid-flooded-roads',
              title: 'Avoid driving through flooded roads',
              iconName: 'waves',
            },
            {
              id: 'steer-clear-damaged',
              title: 'Steer clear of storm-damaged areas',
              iconName: 'alert-triangle',
            },
            {
              id: 'assist-special-attention',
              title: 'Assist individuals requiring special attention',
              iconName: 'accessibility',
            },
            {
              id: 'report-power-lines',
              title: 'Report downed power lines',
              iconName: 'utility-pole',
            },
            { id: 'monitor-pets', title: 'Monitor your pets closely', iconName: 'paw-print' },
          ],
        },
      ],
    },
  ],
};

