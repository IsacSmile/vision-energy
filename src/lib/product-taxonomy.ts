export interface SubcategoryDef {
  id: string;
  label: string;
  /** Exact product codes assigned to this subcategory (takes precedence over groupPrefixes). */
  codes?: string[];
  /** Group prefixes (e.g. 'LP', 'CB', 'LE') whose items belong here if not claimed by an exact code rule. */
  groupPrefixes?: string[];
}

export interface MainCategoryDef {
  id: string;
  label: string;
  description: string;
  iconGroup: string;
  isPriority?: boolean;
  subcategories: SubcategoryDef[];
}

export interface ResolvedTaxonomy {
  mainId: string;
  mainLabel: string;
  mainOrder: number;
  isPriority: boolean;
  iconGroup: string;
  subId: string;
  subLabel: string;
  subOrder: number;
}

export interface TaxonomySubNode<T> {
  id: string;
  label: string;
  mainId: string;
  mainLabel: string;
  order: number;
  items: T[];
  count: number;
}

export interface TaxonomyMainNode<T> {
  id: string;
  label: string;
  description: string;
  iconGroup: string;
  isPriority: boolean;
  order: number;
  subcategories: TaxonomySubNode<T>[];
  items: T[];
  totalCount: number;
}

/**
 * Single source of truth for the Main Category -> Subcategory hierarchy on /products.
 * Every existing product code (LP-01..SP-02) is explicitly assigned; future admin-created
 * products fall back cleanly by groupPrefix (or into Other Equipment & Supplies).
 */
export const MAIN_CATEGORIES: MainCategoryDef[] = [
  {
    id: 'lightning-protection',
    label: 'Lightning Protection',
    description:
      'External and internal lightning interception, down conductors, mounting hardware, and surge suppression engineered to IEC 62305 & NF C 17-102.',
    iconGroup: 'LP',
    isPriority: true,
    subcategories: [
      {
        id: 'conventional-ese-lightning',
        label: 'Conventional & ESE Systems',
        codes: ['LP-01', 'LP-02'],
      },
      {
        id: 'lightning-clamps-conductors',
        label: 'Clamps, Fixings & Conductors',
        codes: ['LP-03', 'LP-04'],
        groupPrefixes: ['LP'],
      },
      {
        id: 'surge-protection-devices',
        label: 'Surge Protection Devices (SPD)',
        codes: ['EL-06'],
      },
    ],
  },
  {
    id: 'earthing-bonding',
    label: 'Earthing & Bonding',
    description:
      'Low-resistance grounding electrodes, conductive backfill compounds, exothermic molecular welding, and test disconnecting links to BS 7430.',
    iconGroup: 'ER',
    isPriority: true,
    subcategories: [
      {
        id: 'earthing-enhancement-electrodes',
        label: 'Ground Enhancement & Electrodes',
        codes: ['ER-01', 'ER-04'],
      },
      {
        id: 'exothermic-earth-bars',
        label: 'Exothermic Welding & Earth Bars',
        codes: ['ER-02', 'ER-03'],
        groupPrefixes: ['ER', 'EB'],
      },
    ],
  },
  {
    id: 'wires-cables-conduits',
    label: 'Wires, Cables & Conduits',
    description:
      'Power, control, instrumentation, and fibre optic cables alongside cable glands, trays, cleats, markers, and protective conduit systems.',
    iconGroup: 'CB',
    subcategories: [
      {
        id: 'cables-and-wires',
        label: 'Power, Control & Fibre Cables',
        codes: ['CB-01', 'CB-02'],
      },
      {
        id: 'terminations-glands-lugs',
        label: 'Terminations, Glands & Lugs',
        codes: ['CB-03', 'CB-04'],
        groupPrefixes: ['CB'],
      },
      {
        id: 'cable-trays-supports',
        label: 'Cable Trays, Ladders & Cleats',
        codes: ['CM-01', 'CM-02'],
      },
      {
        id: 'cable-ties-markers',
        label: 'Cable Ties, Sleeves & Markers',
        codes: ['CM-03', 'CM-04'],
        groupPrefixes: ['CM'],
      },
      {
        id: 'conduits-and-trunking',
        label: 'Conduits & Trunking Systems',
        codes: ['CT-01', 'CT-02', 'CT-03'],
        groupPrefixes: ['CT'],
      },
    ],
  },
  {
    id: 'electrical-switchgear',
    label: 'Electrical & Switchgear',
    description:
      'Switches, industrial plugs, isolators, control panel gear, PLCs, sensors, transformers, enclosures, and hazardous-area electrical equipment.',
    iconGroup: 'EL',
    subcategories: [
      {
        id: 'wiring-accessories-sockets',
        label: 'Wiring Accessories & Industrial Plugs',
        codes: ['EL-01', 'EL-04'],
      },
      {
        id: 'switchgear-isolators-controls',
        label: 'Switchgear, Isolators & Control Panels',
        codes: ['EL-02', 'EL-03', 'EL-05'],
      },
      {
        id: 'automation-industrial-sensors',
        label: 'Automation & Industrial Sensors',
        codes: ['EL-08', 'EL-09'],
      },
      {
        id: 'transformers-power-quality',
        label: 'Transformers & Power Quality',
        codes: ['EL-07', 'EL-12'],
      },
      {
        id: 'enclosures-explosion-proof',
        label: 'Enclosures & Explosion-Proof Gear',
        codes: ['EL-10', 'EL-11'],
        groupPrefixes: ['EL'],
      },
    ],
  },
  {
    id: 'lighting-signalling',
    label: 'Lighting & Signalling',
    description:
      'Commercial LED luminaires, streetlighting masts, flagpoles, aviation obstruction lights, marine navigation lights, and industrial warning beacons.',
    iconGroup: 'LT',
    subcategories: [
      {
        id: 'led-luminaires-streetlights',
        label: 'LED Luminaires, Streetlights & Masts',
        codes: ['LT-02', 'LT-03'],
      },
      {
        id: 'aviation-marine-signal-beacons',
        label: 'Aviation, Marine & Signal Beacons',
        codes: ['LT-01', 'LT-04'],
        groupPrefixes: ['LT'],
      },
    ],
  },
  {
    id: 'energy-solar-power',
    label: 'Energy & Solar Power',
    description:
      'Solar PV balance-of-system components, autonomous solar lighting and thermal water heating, and industrial standby generator equipment.',
    iconGroup: 'EN',
    subcategories: [
      {
        id: 'solar-pv-heating',
        label: 'Solar PV, Lighting & Water Heating',
        codes: ['EN-01', 'EN-02'],
      },
      {
        id: 'industrial-generators',
        label: 'Industrial Generator Equipment',
        codes: ['EN-03'],
        groupPrefixes: ['EN'],
      },
    ],
  },
  {
    id: 'mechanical-hvac',
    label: 'Mechanical & HVAC',
    description:
      'Ventilation fans, HVAC refrigeration components, industrial pumps, air compressors, pneumatic systems, valves, gauges, and water heaters.',
    iconGroup: 'ME',
    subcategories: [
      {
        id: 'hvac-ventilation',
        label: 'HVAC & Ventilation Systems',
        codes: ['ME-01', 'ME-02'],
      },
      {
        id: 'pumps-water-heaters',
        label: 'Pumps, Fluid Handling & Water Heaters',
        codes: ['ME-03', 'ME-06'],
      },
      {
        id: 'compressors-valves-gauges',
        label: 'Compressors, Valves & Gauges',
        codes: ['ME-04', 'ME-05'],
        groupPrefixes: ['ME'],
      },
    ],
  },
  {
    id: 'hardware-tools',
    label: 'Hardware & Tools',
    description:
      'Construction fasteners, strut channel pipe supports, insulated electrical hand tools, testing instruments, welding equipment, and precision springs.',
    iconGroup: 'HW',
    subcategories: [
      {
        id: 'fasteners-clamps-supports',
        label: 'Fasteners, Clamps & Pipe Supports',
        codes: ['HW-01', 'HW-02', 'HW-05'],
      },
      {
        id: 'electrical-tools-welding',
        label: 'Electrical Tools & Welding',
        codes: ['HW-03', 'HW-04'],
        groupPrefixes: ['HW'],
      },
    ],
  },
  {
    id: 'safety-security-id',
    label: 'Safety, Security & Identification',
    description:
      'CCTV surveillance, emergency alarm systems, weather stations, fire protection gear, PPE, safety marking tapes, engraved nameplates, and packaging.',
    iconGroup: 'SG',
    subcategories: [
      {
        id: 'cctv-alarms-weather',
        label: 'CCTV, Alarms & Weather Monitoring',
        codes: ['SG-01', 'SG-02', 'SG-04'],
      },
      {
        id: 'fire-safety-ppe',
        label: 'Fire Protection, Marking & PPE',
        codes: ['SG-03', 'SF-01', 'SF-02'],
        groupPrefixes: ['SG', 'SF'],
      },
      {
        id: 'engraving-tagging-packaging',
        label: 'Engraved Plates, Tags & Packaging',
        codes: ['ID-01', 'PK-01'],
        groupPrefixes: ['ID', 'PK'],
      },
    ],
  },
  {
    id: 'laboratory',
    label: 'Laboratory Equipment & Supplies',
    description:
      'Analytical instruments, civil QC testing apparatus, benchtop gear, fume hoods, glassware, liquid handling, cold storage, water purification, and lab PPE.',
    iconGroup: 'LE',
    subcategories: [
      {
        id: 'lab-general',
        label: 'General Laboratory Equipment',
        groupPrefixes: ['LE'],
      },
      {
        id: 'lab-analytical',
        label: 'Analytical & Industrial Testing',
        groupPrefixes: ['AT'],
      },
      {
        id: 'lab-measurement',
        label: 'Measurement & Monitoring',
        groupPrefixes: ['LM'],
      },
      {
        id: 'lab-microscopes',
        label: 'Microscopes & Optical Instruments',
        groupPrefixes: ['MO'],
      },
      {
        id: 'lab-glassware',
        label: 'Glassware & Plasticware Essentials',
        groupPrefixes: ['LG'],
      },
      {
        id: 'lab-liquid-handling',
        label: 'Liquid Handling & Sample Prep',
        groupPrefixes: ['LH'],
      },
      {
        id: 'lab-consumables',
        label: 'Laboratory Consumables & Accessories',
        groupPrefixes: ['LC'],
      },
      {
        id: 'lab-safety',
        label: 'Lab Safety & Containment Systems',
        groupPrefixes: ['LS'],
      },
      {
        id: 'lab-ppe',
        label: 'Lab PPE & Safety Supplies',
        groupPrefixes: ['LPE'],
      },
      {
        id: 'lab-water',
        label: 'Water Purification & Sterilization',
        groupPrefixes: ['WS'],
      },
      {
        id: 'lab-cold-storage',
        label: 'Temperature-Controlled Storage',
        groupPrefixes: ['TS'],
      },
      {
        id: 'lab-furniture',
        label: 'Laboratory Furniture & Storage',
        groupPrefixes: ['LF'],
      },
    ],
  },
  {
    id: 'sports-fitness',
    label: 'Sports & Fitness Equipment',
    description:
      'Institutional multi-sport court accessories and heavy-duty commercial gym equipment, plates, barbells, flooring, and storage racks.',
    iconGroup: 'SP',
    subcategories: [
      {
        id: 'sports-athletic-accessories',
        label: 'Sports & Athletic Accessories',
        codes: ['SP-01'],
      },
      {
        id: 'commercial-gym-fitness',
        label: 'Commercial Gym & Fitness',
        codes: ['SP-02'],
        groupPrefixes: ['SP'],
      },
    ],
  },
];

// Precompute fast lookup maps
const CODE_LOOKUP = new Map<string, ResolvedTaxonomy>();
const PREFIX_LOOKUP = new Map<string, ResolvedTaxonomy>();
const MAIN_BY_ID = new Map<string, { def: MainCategoryDef; order: number }>();
const SUB_BY_ID = new Map<
  string,
  { mainDef: MainCategoryDef; mainOrder: number; subDef: SubcategoryDef; subOrder: number }
>();

MAIN_CATEGORIES.forEach((mainDef, mainIdx) => {
  MAIN_BY_ID.set(mainDef.id, { def: mainDef, order: mainIdx });

  mainDef.subcategories.forEach((subDef, subIdx) => {
    SUB_BY_ID.set(subDef.id, {
      mainDef,
      mainOrder: mainIdx,
      subDef,
      subOrder: subIdx,
    });

    const resolved: ResolvedTaxonomy = {
      mainId: mainDef.id,
      mainLabel: mainDef.label,
      mainOrder: mainIdx,
      isPriority: Boolean(mainDef.isPriority),
      iconGroup: mainDef.iconGroup,
      subId: subDef.id,
      subLabel: subDef.label,
      subOrder: subIdx,
    };

    subDef.codes?.forEach((code) => {
      CODE_LOOKUP.set(code.toUpperCase(), resolved);
    });

    subDef.groupPrefixes?.forEach((prefix) => {
      PREFIX_LOOKUP.set(prefix.toUpperCase(), resolved);
    });
  });
});

/**
 * Resolves the Main Category and Subcategory for any product item using exact code first,
 * then groupPrefix fallback, then a safe dynamic bucket for newly added admin prefixes.
 */
export function resolveProductTaxonomy(
  code: string,
  groupPrefix: string,
  fallbackGroupLabel?: string
): ResolvedTaxonomy {
  const normCode = (code || '').trim().toUpperCase();
  const byCode = CODE_LOOKUP.get(normCode);
  if (byCode) return byCode;

  const normPrefix = (groupPrefix || normCode.split('-')[0] || '').trim().toUpperCase();
  const byPrefix = PREFIX_LOOKUP.get(normPrefix);
  if (byPrefix) return byPrefix;

  const safePrefix = normPrefix || 'OTHER';
  const safeLabel = fallbackGroupLabel?.trim() || safePrefix;
  return {
    mainId: 'other-supplies',
    mainLabel: 'Other Engineering Supplies',
    mainOrder: MAIN_CATEGORIES.length,
    isPriority: false,
    iconGroup: safePrefix,
    subId: `group-${safePrefix.toLowerCase()}`,
    subLabel: safeLabel,
    subOrder: 0,
  };
}

export function getMainCategoryDef(mainId: string): MainCategoryDef | undefined {
  return MAIN_BY_ID.get(mainId)?.def;
}

export function getSubcategoryMeta(subId: string) {
  return SUB_BY_ID.get(subId);
}

/**
 * Maps a legacy ?group=XX query parameter to the matching Main Category (and Subcategory
 * when the group maps 1-to-1 to a single subcategory) so sidebar highlight/expansion stays synced.
 */
export function resolveLegacyGroupTarget(groupCode: string): {
  mainId: string | null;
  subId: string | null;
} {
  const norm = (groupCode || '').trim().toUpperCase();
  if (!norm || norm === 'ALL') return { mainId: null, subId: null };

  // Special-case groups spanning multiple subcategories within one main category vs exact 1:1
  const singleSubMap: Record<string, { mainId: string; subId: string | null }> = {
    LP: { mainId: 'lightning-protection', subId: null },
    ER: { mainId: 'earthing-bonding', subId: null },
    EB: { mainId: 'earthing-bonding', subId: null },
    CB: { mainId: 'wires-cables-conduits', subId: null },
    CM: { mainId: 'wires-cables-conduits', subId: null },
    CT: { mainId: 'wires-cables-conduits', subId: 'conduits-and-trunking' },
    EL: { mainId: 'electrical-switchgear', subId: null },
    LT: { mainId: 'lighting-signalling', subId: null },
    EN: { mainId: 'energy-solar-power', subId: null },
    ME: { mainId: 'mechanical-hvac', subId: null },
    HW: { mainId: 'hardware-tools', subId: null },
    SG: { mainId: 'safety-security-id', subId: null },
    SF: { mainId: 'safety-security-id', subId: 'fire-safety-ppe' },
    ID: { mainId: 'safety-security-id', subId: 'engraving-tagging-packaging' },
    PK: { mainId: 'safety-security-id', subId: 'engraving-tagging-packaging' },
    LE: { mainId: 'laboratory', subId: 'lab-general' },
    AT: { mainId: 'laboratory', subId: 'lab-analytical' },
    LM: { mainId: 'laboratory', subId: 'lab-measurement' },
    MO: { mainId: 'laboratory', subId: 'lab-microscopes' },
    LG: { mainId: 'laboratory', subId: 'lab-glassware' },
    LH: { mainId: 'laboratory', subId: 'lab-liquid-handling' },
    LC: { mainId: 'laboratory', subId: 'lab-consumables' },
    LS: { mainId: 'laboratory', subId: 'lab-safety' },
    LPE: { mainId: 'laboratory', subId: 'lab-ppe' },
    WS: { mainId: 'laboratory', subId: 'lab-water' },
    TS: { mainId: 'laboratory', subId: 'lab-cold-storage' },
    LF: { mainId: 'laboratory', subId: 'lab-furniture' },
    SP: { mainId: 'sports-fitness', subId: null },
  };

  return singleSubMap[norm] || { mainId: null, subId: null };
}

export interface TaxonomyItemBase {
  code: string;
  group: string;
  groupLabel: string;
  sortOrder: number;
  title: string;
}

/**
 * Groups an arbitrary list of product category items into the ordered
 * Main Category -> Subcategory -> Items tree, omitting empty nodes.
 */
export function buildTaxonomyTree<T extends TaxonomyItemBase>(
  items: T[],
  sortAZ = false
): TaxonomyMainNode<T>[] {
  const mainBuckets = new Map<
    string,
    {
      id: string;
      label: string;
      description: string;
      iconGroup: string;
      isPriority: boolean;
      order: number;
      subBuckets: Map<string, TaxonomySubNode<T>>;
    }
  >();

  for (const item of items) {
    const tax = resolveProductTaxonomy(item.code, item.group, item.groupLabel);
    const mainDef = MAIN_BY_ID.get(tax.mainId)?.def;

    let mainBucket = mainBuckets.get(tax.mainId);
    if (!mainBucket) {
      mainBucket = {
        id: tax.mainId,
        label: tax.mainLabel,
        description: mainDef?.description || '',
        iconGroup: tax.iconGroup,
        isPriority: tax.isPriority,
        order: tax.mainOrder,
        subBuckets: new Map(),
      };
      mainBuckets.set(tax.mainId, mainBucket);
    }

    let subBucket = mainBucket.subBuckets.get(tax.subId);
    if (!subBucket) {
      subBucket = {
        id: tax.subId,
        label: tax.subLabel,
        mainId: tax.mainId,
        mainLabel: tax.mainLabel,
        order: tax.subOrder,
        items: [],
        count: 0,
      };
      mainBucket.subBuckets.set(tax.subId, subBucket);
    }

    subBucket.items.push(item);
    subBucket.count += 1;
  }

  const mainNodes: TaxonomyMainNode<T>[] = Array.from(mainBuckets.values())
    .sort((a, b) => a.order - b.order)
    .map((mb) => {
      const subcategories = Array.from(mb.subBuckets.values())
        .sort((a, b) => a.order - b.order)
        .map((sb) => ({
          ...sb,
          items: [...sb.items].sort((x, y) =>
            sortAZ ? x.title.localeCompare(y.title) : x.sortOrder - y.sortOrder
          ),
        }));

      const allItems = subcategories.flatMap((s) => s.items);

      return {
        id: mb.id,
        label: mb.label,
        description: mb.description,
        iconGroup: mb.iconGroup,
        isPriority: mb.isPriority,
        order: mb.order,
        subcategories,
        items: allItems,
        totalCount: allItems.length,
      };
    });

  return mainNodes;
}

