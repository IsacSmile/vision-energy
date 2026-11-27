export interface GlossaryTerm {
  id: string;
  term: string;
  standardRef: string;
  discipline: 'Lightning Protection' | 'Earthing & Grounding' | 'Surge Protection';
  definition: string;
  relatedHref: string;
  relatedLabel: string;
}

export const GLOSSARY_LAST_UPDATED_LABEL = 'November 27, 2026';
export const GLOSSARY_LAST_UPDATED_ISO = '2026-11-27';

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    id: 'lightning-protection-system-lps',
    term: 'Lightning Protection System (LPS)',
    standardRef: 'IEC 62305 / BS EN 62305 / NFPA 780',
    discipline: 'Lightning Protection',
    definition:
      'An engineered assembly comprising air termination networks, down conductors, earth termination grids, and internal equipotential bonding designed to intercept direct lightning strikes, conduct discharge currents safely to ground, and limit thermal, mechanical, and surge hazards across buildings and industrial infrastructure.',
    relatedHref: '/expertise/lightning',
    relatedLabel: 'Lightning Engineering Guide',
  },
  {
    id: 'early-streamer-emission-ese',
    term: 'Early Streamer Emission (ESE) Terminal',
    standardRef: 'NF C 17-102',
    discipline: 'Lightning Protection',
    definition:
      'An active lightning air terminal mounted on an elevated mast that ionizes surrounding air under storm electric-field conditions to launch an earlier upward leader (measured by advancing trigger time Delta T), providing a calculated protection radius Rp(h) where specified alongside dedicated down conductors and earth pits.',
    relatedHref: '/products/early-streamer-emission-lightning-protection-systems',
    relatedLabel: 'ESE Systems (LP-02)',
  },
  {
    id: 'rolling-sphere-method',
    term: 'Rolling Sphere Method',
    standardRef: 'IEC 62305-3 (Levels I–IV)',
    discipline: 'Lightning Protection',
    definition:
      'A three-dimensional geometric design method where an imaginary sphere of standardized radius—20 m (Class I), 30 m (Class II), 45 m (Class III), or 60 m (Class IV)—is rolled over structural elevations and roof parapets to verify where air terminals must be positioned so lightning cannot bypass protection.',
    relatedHref: '/expertise/lightning',
    relatedLabel: 'Risk Criteria & Levels I–IV',
  },
  {
    id: 'protection-angle-method',
    term: 'Protection Angle Method',
    standardRef: 'IEC 62305-3',
    discipline: 'Lightning Protection',
    definition:
      'A geometric lightning air-termination sizing rule for simple structures, rooftops, masts, and smaller zones where the protective volume below an air rod is defined by an angle alpha derived from structure height and Lightning Protection Level.',
    relatedHref: '/products/conventional-lightning-protection-systems',
    relatedLabel: 'Conventional LPS (LP-01)',
  },
  {
    id: 'faraday-mesh-cage',
    term: 'Meshed Cage (Faraday Mesh) System',
    standardRef: 'IEC 62305-3 (5×5 m to 20×20 m)',
    discipline: 'Lightning Protection',
    definition:
      'A roof-level conductive grid of copper or aluminium conductor tapes connected to distributed Franklin air rods and perimeter down conductors, partitioning lightning strike current across multiple parallel low-impedance paths around flat-roofed industrial, commercial, and utility facilities.',
    relatedHref: '/services/external-lightning-protection-installation',
    relatedLabel: 'External LPS Installation',
  },
  {
    id: 'down-conductor-test-joint',
    term: 'Down Conductor & Test Clamp',
    standardRef: 'IEC 62561 / IEC 62305',
    discipline: 'Lightning Protection',
    definition:
      'Bare or PVC-insulated high-conductivity copper or aluminium conductors routed vertically from roof air-termination networks down to test joints (typically installed at accessible testing height above finished grade) before terminating at dedicated inspection earth pits.',
    relatedHref: '/products/down-conductors-earthing-tapes-and-conductors',
    relatedLabel: 'Conductors & Tapes (LP-04)',
  },
  {
    id: 'earthing-and-grounding-grid',
    term: 'Earthing & Grounding Network',
    standardRef: 'BS 7430 / IEC 60364',
    discipline: 'Earthing & Grounding',
    definition:
      'An intentional low-impedance electrical connection between metallic enclosures, electrical system neutrals, lightning down conductors, and buried copper or copper-bonded electrodes, dispersing fault and lightning currents into the earth mass while limiting step and touch voltages.',
    relatedHref: '/expertise/earthing',
    relatedLabel: 'Earthing Engineering Guide',
  },
  {
    id: 'soil-resistivity-testing',
    term: 'Soil Resistivity Survey (Wenner 4-Pin Method)',
    standardRef: 'BS 7430',
    discipline: 'Earthing & Grounding',
    definition:
      'An on-site four-electrode geological measurement measuring apparent soil resistivity in ohm-metres across dry sand, sabkha coastal strata, or rock before earthing layout calculation, determining optimal rod depth, chemical enhancement compounds, and grid geometry.',
    relatedHref: '/services/earthing-and-grounding',
    relatedLabel: 'Soil Testing & Earthing Design',
  },
  {
    id: 'exothermic-welding',
    term: 'Exothermic Welding Connection',
    standardRef: 'IEC 62561 / BS 7430',
    discipline: 'Earthing & Grounding',
    definition:
      'A permanent molecular copper-to-copper or copper-to-steel bonding process carried out inside calibrated graphite moulds using weld metal powder, yielding corrosion-resistant joints that do not loosen under thermal cycling or high fault current.',
    relatedHref: '/products/exothermic-welding-systems',
    relatedLabel: 'Exothermic Welding (ER-02)',
  },
  {
    id: 'equipotential-bonding-earth-bar',
    term: 'Equipotential Bonding & Disconnecting Earth Bar',
    standardRef: 'BS 7671 / IEC 60364 / BS 7430',
    discipline: 'Earthing & Grounding',
    definition:
      'The electrical interconnection of structural steel, metallic pipework, cable armour, and electrical earth references via copper earth bars with removable test links, eliminating hazardous potential differences during lightning events or system earth faults.',
    relatedHref: '/products/earth-bars-and-disconnecting-links',
    relatedLabel: 'Earth Bars & Links (ER-03)',
  },
  {
    id: 'surge-protection-device-spd',
    term: 'Surge Protection Device (Type 1, Type 2 & Type 3 SPD)',
    standardRef: 'BS 7671 / IEC 60364 / IEC 61643',
    discipline: 'Surge Protection',
    definition:
      'A coordinated transient overvoltage arrester cascade protecting incoming LV service entrances (Type 1), sub-distribution switchboards (Type 2), and sensitive automation, BMS, laboratory, or ICT terminal loads (Type 3 / data-line SPDs) against direct and switching surges.',
    relatedHref: '/products/surge-protection-devices',
    relatedLabel: 'Surge Protection Devices (EL-06)',
  },
  {
    id: 'ground-enhancement-material',
    term: 'Earth Enhancement Material',
    standardRef: 'BS 7430 / IEC 62561-7',
    discipline: 'Earthing & Grounding',
    definition:
      'Conductive mineral or carbon-based backfill compounds placed around driven earth rods or buried strips inside high-resistivity desert or rocky UAE soil to lower contact impedance and stabilize resistance readings across seasonal moisture shifts.',
    relatedHref: '/products/earthing-enhancement-materials',
    relatedLabel: 'Enhancement Materials (ER-01)',
  },
];

