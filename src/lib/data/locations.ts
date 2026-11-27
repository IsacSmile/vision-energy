import { COMPANY_FACTS } from '@/lib/seo/company';

export type Wave1ServiceSlug = 'lightning-protection' | 'earthing-grounding';
export type Wave1LocationSlug = 'dubai' | 'abu-dhabi' | 'ras-al-khaimah' | 'qatar';

export interface LocationServiceContent {
  locationSlug: Wave1LocationSlug;
  locationName: string;
  countryName: 'United Arab Emirates' | 'Qatar';
  isUae: boolean;
  serviceSlug: Wave1ServiceSlug;
  serviceTitle: string;
  canonicalPath: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  h1: string;
  eyebrow: string;
  heroImage: string;
  heroImageAlt: string;
  quickAnswer: string;
  localContextHeading: string;
  localContextParagraphs: string[];
  technicalScopeHeading: string;
  technicalScopeItems: string[];
  authoritiesOrStandardsNote: string;
  applicableStandards: string[];
  catalogGroupPrefixes: string[];
  parentExpertiseHref: string;
  parentExpertiseLabel: string;
  parentServiceHref: string;
  parentServiceLabel: string;
  faqs: Array<{ id: string; question: string; answer: string }>;
}

const WAVE1_DATA: Record<`${Wave1LocationSlug}:${Wave1ServiceSlug}`, LocationServiceContent> = {
  'dubai:lightning-protection': {
    locationSlug: 'dubai',
    locationName: 'Dubai',
    countryName: 'United Arab Emirates',
    isUae: true,
    serviceSlug: 'lightning-protection',
    serviceTitle: 'Lightning Protection Systems',
    canonicalPath: '/uae/dubai/lightning-protection',
    seoTitle: 'Lightning Protection System Dubai UAE | Vision Energy',
    seoDescription:
      'IEC 62305 & NF C 17-102 lightning protection engineering, Rolling Sphere design & LPS hardware supply in Dubai. Est. 2018. Request a submittal.',
    keywords: [
      'Lightning Protection System Dubai',
      'Lightning Protection Contractor Dubai',
      'ESE Lightning Arrester Dubai',
      'IEC 62305 Risk Assessment Dubai',
      'DEWA LPS Submittals Dubai',
    ],
    h1: 'Lightning Protection Systems in Dubai, UAE',
    eyebrow: 'Dubai Branch Coordination · Priority #1 Engineering',
    heroImage: '/images/expertise-hero-bg.webp',
    heroImageAlt: 'Lightning protection engineering and copper air terminal inspection for Dubai commercial buildings',
    quickAnswer:
      'Vision Energy International supplies and engineers IEC 62305, BS EN 62305, NF C 17-102 ESE, and NFPA 780 lightning protection systems in Dubai, backed by over 160 completed projects since 2018. Deliverables include structural risk assessment (Levels I–IV), Rolling Sphere and Faraday mesh layouts, copper conductors, test clamps, and coordinated Type 1/2/3 SPDs.',
    localContextHeading: 'Engineered Structural Protection Across Dubai Developments',
    localContextParagraphs: [
      'Dubai commercial towers, logistics hubs, industrial zones, mixed-use developments, and critical infrastructure assets require documented external and internal lightning protection tailored to tall profiles, rooftop MEP equipment, and metallic curtain walls.',
      'Supported by our Dubai branch and Ras Al Khaimah engineering headquarters, Vision Energy prepares project submittals aligned with IEC 62305, BS EN 62305, BS EN / IEC 62561, NF C 17-102 (where ESE is specified), and applicable DEWA and UAE authority requirements.',
      'Whether protecting a single utility structure with Protection Angle sizing or an expansive warehouse roof via 5×5 m to 20×20 m Faraday conductor grids, every down conductor terminates at accessible test clamps bonded to dedicated low-impedance earth pits.',
    ],
    technicalScopeHeading: 'Dubai LPS Design & Supply Scope',
    technicalScopeItems: [
      'IEC 62305-2 lightning risk assessment defining Protection Levels Class I (20 m) through Class IV (60 m)',
      'Conventional Franklin copper air rods, saddles, roof conductor tapes, and bimetallic clamps (LP-01, LP-03)',
      'NF C 17-102 Early Streamer Emission (ESE) ionizing air terminals, elevated masts, and strike counters (LP-02)',
      'Bare and PVC-insulated copper down conductors, test clamps, and structural steel bonding leads (LP-04)',
      'Type 1, Type 2, and Type 3 Surge Protection Device (SPD) coordination for LV switchgear & automation (EL-06)',
    ],
    authoritiesOrStandardsNote:
      'Dubai project documentation is structured around international standards (IEC 62305, BS EN 62305, IEC 62561, NF C 17-102) and UAE review guidelines referenced across DEWA and Civil Defence submittals.',
    applicableStandards: ['IEC 62305', 'BS EN 62305', 'IEC 62561', 'NF C 17-102', 'DEWA'],
    catalogGroupPrefixes: ['LP'],
    parentExpertiseHref: '/expertise/lightning',
    parentExpertiseLabel: 'Full Lightning Protection Engineering Guide',
    parentServiceHref: '/services/external-lightning-protection-installation',
    parentServiceLabel: 'External LPS Installation Service',
    faqs: [
      {
        id: 'faq-dubai-lps-standards',
        question: 'Which lightning protection standards apply to Dubai construction submittals?',
        answer:
          'Dubai lightning protection designs commonly reference IEC 62305 and BS EN 62305 (Parts 1–4) for structural risk assessment, Rolling Sphere, and Faraday mesh layouts, IEC 62561 for tested components, BS 7430/BS 7671 for earthing and surge coordination, and NF C 17-102 where ESE air terminals are approved by project consultants.',
      },
      {
        id: 'faq-dubai-ese-vs-mesh',
        question: 'Can Vision Energy supply both Conventional Faraday Mesh and ESE systems in Dubai?',
        answer:
          'Yes. Vision Energy stocks and engineers both Conventional LPS hardware (LP-01 Franklin rods, copper tapes, clamps) and Early Streamer Emission systems (LP-02 ESE terminals, masts, strike counters), matching the project consultant specification.',
      },
      {
        id: 'faq-dubai-submittal-support',
        question: 'What project documentation is provided for Dubai MEP contractors and consultants?',
        answer:
          'Vision Energy provides protection zone layouts, risk level references, bill of quantities, product datasheets, CAD details, and earth-resistance/continuity testing schedules from our Dubai branch and RAK engineering team.',
      },
    ],
  },
  'dubai:earthing-grounding': {
    locationSlug: 'dubai',
    locationName: 'Dubai',
    countryName: 'United Arab Emirates',
    isUae: true,
    serviceSlug: 'earthing-grounding',
    serviceTitle: 'Earthing, Grounding & Surge Protection',
    canonicalPath: '/uae/dubai/earthing-grounding',
    seoTitle: 'Earthing & Grounding Systems Dubai UAE | Vision Energy',
    seoDescription:
      'BS 7430 earthing design, Wenner soil resistivity testing, exothermic welding & SPD supply in Dubai, UAE. Ex-stock copper grids. Request a quote.',
    keywords: [
      'Earthing System Contractor Dubai',
      'Earthing and Grounding Dubai',
      'Soil Resistivity Testing Dubai',
      'Exothermic Welding Dubai',
      'Earth Pit Materials Supplier UAE',
    ],
    h1: 'Earthing, Grounding & SPD Systems in Dubai, UAE',
    eyebrow: 'Dubai Branch Coordination · Priority #1 Engineering',
    heroImage: '/images/earthing-grounding-hero.webp',
    heroImageAlt: 'Low-impedance copper earthing rods, inspection pits, and exothermic welding grids in Dubai',
    quickAnswer:
      'Vision Energy International designs, tests, and supplies BS 7430 and IEC 60364 earthing and equipotential bonding systems in Dubai. Our scope covers on-site Wenner 4-pin soil resistivity testing, copper-bonded and solid copper earth electrodes, ground enhancement compounds, exothermic welded joints, disconnecting earth bars, and Type 1/2/3 SPDs.',
    localContextHeading: 'Achieving Verified Earth Resistance Across Dubai Soil Strata',
    localContextParagraphs: [
      'Sandy inland corridors and high-salinity coastal reclaimed soils in Dubai create variable electrical resistivity that quickly undermines undersized grounding loops or mechanically clamped underground joints.',
      'Vision Energy begins Dubai earthing projects with Wenner soil resistivity testing to quantify subterranean soil layers before calculating electrode spacing, rod depth, conductive enhancement backfill volumes, and grid mesh geometry.',
      'Permanent molecular exothermic welds (ER-02) prevent corrosion inside buried trenches, while copper earth bars with disconnecting links (ER-03) and inspection pits allow rapid periodic fall-of-potential verification.',
    ],
    technicalScopeHeading: 'Dubai Earthing & Bonding Scope',
    technicalScopeItems: [
      'Wenner 4-point soil resistivity measurement and geological strata profiling prior to excavation',
      'High-purity earth enhancement compounds stabilizing moisture and soil conductivity (ER-01)',
      'Permanent exothermic welding graphite moulds, metal charges, and handle clamps (ER-02)',
      'Copper and tinned earth bars with single or double disconnecting links for testing (ER-03)',
      'Heavy-duty copper-bonded earth rods, driving heads, clamps, and inspection earth pits (ER-04)',
    ],
    authoritiesOrStandardsNote:
      'Engineered and documented to BS 7430, BS 7671 / IEC 60364, and IEC 62561 standards with handover test sheets aligned for Dubai utility and consultant inspections.',
    applicableStandards: ['BS 7430', 'IEC 60364', 'BS 7671', 'IEC 62561', 'DEWA'],
    catalogGroupPrefixes: ['ER', 'EL'],
    parentExpertiseHref: '/expertise/earthing',
    parentExpertiseLabel: 'Full Earthing & Surge Protection Guide',
    parentServiceHref: '/services/earthing-and-grounding',
    parentServiceLabel: 'Earthing & Grounding Design Service',
    faqs: [
      {
        id: 'faq-dubai-soil-resistivity',
        question: 'Why is Wenner soil resistivity testing recommended before installing earth pits in Dubai?',
        answer:
          'Dry sand and coastal fill across Dubai can vary dramatically in ohm-metre resistivity. Performing on-site Wenner 4-pin testing prevents over-excavation and ensures electrode length and enhancement compound quantities hit target ohmic values reliably.',
      },
      {
        id: 'faq-dubai-cadweld',
        question: 'Why does Vision Energy specify exothermic welding for buried copper earth grids in Dubai?',
        answer:
          'Unlike mechanical bolted clamps that oxidize or loosen in saline soil, exothermic welding creates a permanent molecular copper-to-copper bond resistant to corrosion and high fault current surges.',
      },
      {
        id: 'faq-dubai-stock',
        question: 'Does Vision Energy hold earthing materials and earth bars in stock for Dubai deliveries?',
        answer:
          'Core copper rods, earthing tapes, enhancement materials, exothermic moulds, and earth bars (ER-01 to ER-04, LP-04) are held ex-stock subject to prior sale, with custom earth bars manufactured on request.',
      },
    ],
  },
  'abu-dhabi:lightning-protection': {
    locationSlug: 'abu-dhabi',
    locationName: 'Abu Dhabi',
    countryName: 'United Arab Emirates',
    isUae: true,
    serviceSlug: 'lightning-protection',
    serviceTitle: 'Lightning Protection Systems',
    canonicalPath: '/uae/abu-dhabi/lightning-protection',
    seoTitle: 'Lightning Protection System Abu Dhabi | Vision Energy',
    seoDescription:
      'IEC 62305 & NF C 17-102 lightning protection engineering & hardware for ADDC, DoE & ADCDA submittals in Abu Dhabi. Est. 2018. Get a quote.',
    keywords: [
      'Lightning Protection Abu Dhabi',
      'ADDC Lightning Protection Compliance',
      'ADCDA LPS Contractor Abu Dhabi',
      'IEC 62305 Risk Assessment Abu Dhabi',
      'ESE Lightning Protection Abu Dhabi',
    ],
    h1: 'Lightning Protection Systems in Abu Dhabi, UAE',
    eyebrow: 'Abu Dhabi Branch Coordination · Priority #1 Engineering',
    heroImage: '/images/expertise-hero-bg.webp',
    heroImageAlt: 'Electrical engineer inspecting rooftop copper lightning protection and test points for Abu Dhabi asset',
    quickAnswer:
      'Vision Energy International provides IEC 62305, BS EN 62305, NF C 17-102, and NFPA 780 lightning protection engineering and hardware across Abu Dhabi. Supported by our Abu Dhabi branch and RAK headquarters since 2018 (160+ projects), we prepare Rolling Sphere, Protection Angle, Faraday Mesh, ESE, and SPD packages aligned with ADDC, DoE, ADCDA, and Abu Dhabi Municipality review criteria.',
    localContextHeading: 'Authority-Aligned Lightning Protection for Abu Dhabi Facilities',
    localContextParagraphs: [
      'Energy assets, substations, institutional campuses, waterfront towers, and industrial plants in Abu Dhabi face strict design audit expectations covering lightning interception coverage, structural bonding separation distances, and surge cascade coordination.',
      'Through our Abu Dhabi branch supported by our Ras Al Khaimah technical headquarters, Vision Energy supplies certified air terminals, copper and stainless 316L hardware, down-conductor accessories, and full engineering calculation dossiers aligned with ADDC, DoE, ADCDA, and Abu Dhabi Municipality requirements.',
      'Where structures include sensitive plant controls, telecom masts, or rooftop solar PV arrays, our engineers integrate coordinated Type 1/2/3 SPDs so transient strikes do not propagate into downstream panels.',
    ],
    technicalScopeHeading: 'Abu Dhabi LPS Engineering & Supply Scope',
    technicalScopeItems: [
      'Structural Risk Assessment & Protection Level classification (IEC / BS EN 62305 Class I–IV)',
      'Faraday Cage Mesh (5×5 m to 20×20 m), Rolling Sphere & Protection Angle CAD roof layouts (LP-01)',
      'Early Streamer Emission (ESE) active air terminal assemblies & mast engineering (LP-02)',
      'Corrosion-resistant copper, tinned copper, aluminium, and stainless fixing hardware (LP-03, LP-04)',
      'Testing, continuity logging, earth-pit tie-in, and complete as-built submittal binders',
    ],
    authoritiesOrStandardsNote:
      'Designed with reference to IEC 62305, BS EN 62305, IEC 62561, NF C 17-102, and NFPA 780 for ADDC, DoE, ADCDA, and Abu Dhabi Municipality project reviews.',
    applicableStandards: ['IEC 62305', 'ADDC', 'DoE', 'ADCDA', 'Abu Dhabi Municipality'],
    catalogGroupPrefixes: ['LP'],
    parentExpertiseHref: '/expertise/lightning',
    parentExpertiseLabel: 'Full Lightning Protection Engineering Guide',
    parentServiceHref: '/services/external-lightning-protection-installation',
    parentServiceLabel: 'External LPS Installation Service',
    faqs: [
      {
        id: 'faq-ad-authorities',
        question: 'Which Abu Dhabi authorities are referenced in Vision Energy LPS submittals?',
        answer:
          'Vision Energy technical documentation references international standards (IEC 62305, BS EN 62305, IEC 62561, NF C 17-102, NFPA 780) alongside UAE criteria used by ADDC, DoE, ADCDA, and Abu Dhabi Municipality.',
      },
      {
        id: 'faq-ad-coastal-materials',
        question: 'What conductor materials are suited for Abu Dhabi coastal and industrial zones?',
        answer:
          'We supply bare and PVC-sheathed high-conductivity copper, tinned copper conductors, bimetallic transition clamps, and stainless-steel fixings engineered to limit galvanic corrosion in coastal humidity.',
      },
      {
        id: 'faq-ad-branch',
        question: 'Does Vision Energy support project execution directly in Abu Dhabi?',
        answer:
          'Yes. Vision Energy operates an Abu Dhabi branch supported by our Ras Al Khaimah headquarters for on-site surveys, soil studies, engineering submittals, and material supply across Abu Dhabi emirate.',
      },
    ],
  },
  'abu-dhabi:earthing-grounding': {
    locationSlug: 'abu-dhabi',
    locationName: 'Abu Dhabi',
    countryName: 'United Arab Emirates',
    isUae: true,
    serviceSlug: 'earthing-grounding',
    serviceTitle: 'Earthing, Grounding & Surge Protection',
    canonicalPath: '/uae/abu-dhabi/earthing-grounding',
    seoTitle: 'Earthing & Grounding Abu Dhabi | ADDC/DoE | Vision Energy',
    seoDescription:
      'BS 7430 earthing grids, soil resistivity surveys, deep electrodes & exothermic joints for Abu Dhabi ADDC, DoE & industrial facilities. Enquire.',
    keywords: [
      'Earthing Contractor Abu Dhabi',
      'ADDC Approved Earthing Design',
      'Soil Resistivity Survey Abu Dhabi',
      'Exothermic Welding Grounding Abu Dhabi',
      'Deep Bore Earthing Abu Dhabi',
    ],
    h1: 'Earthing, Grounding & Surge Protection in Abu Dhabi',
    eyebrow: 'Abu Dhabi Branch Coordination · Priority #1 Engineering',
    heroImage: '/images/earthing-grounding-hero.webp',
    heroImageAlt: 'Copper earthing tape, exothermic weld joints, and deep electrode test assembly for Abu Dhabi sites',
    quickAnswer:
      'Vision Energy International engineers and supplies BS 7430 and IEC 60364 earthing networks across Abu Dhabi, aligned with ADDC, DoE, ADCDA, and Abu Dhabi Municipality requirements. Our scope spans Wenner 4-pin soil resistivity surveys, deep-bore copper electrodes, earth enhancement backfill, exothermic joints, copper earth bars, and coordinated Type 1/2/3 SPDs.',
    localContextHeading: 'Low-Impedance Grounding for Abu Dhabi Coastal & Sabkha Terrain',
    localContextParagraphs: [
      'High-salinity coastal sabkha flats, rocky limestone substrata, and arid inland desert sites across Abu Dhabi require site-measured soil resistivity data prior to finalizing grounding layouts.',
      'Vision Energy combines on-site Wenner soil resistivity testing with multi-rod arrays, deep-bore copper electrodes, conductive ground enhancement materials (ER-01), and molecular exothermic welded connections (ER-02) to keep contact impedance low across seasonal ground moisture changes.',
      'Dedicated inspection pits and custom-drilled disconnecting earth bars (ER-03) bond structural steelwork, LV/HV transformer neutrals, and LPS down conductors into an equipotential reference verified at commissioning.',
    ],
    technicalScopeHeading: 'Abu Dhabi Earthing & SPD Deliverables',
    technicalScopeItems: [
      'Four-point Wenner soil resistivity testing across sandy, rocky, and coastal Abu Dhabi plots',
      'Deep-bore electrode scheduling, copper-bonded earth rods, and enhancement backfill compounds (ER-01, ER-04)',
      'Permanent exothermic welded grid intersections resistant to saline groundwater attack (ER-02)',
      'Custom copper earth bars and disconnecting test links for facility maintenance audits (ER-03)',
      'Coordinated Type 1, Type 2, and Type 3 SPDs defending switchgear, BMS, and PLC instrumentation (EL-06)',
    ],
    authoritiesOrStandardsNote:
      'Documentation compiled to BS 7430, BS 7671 / IEC 60364, and IEC 62561 standards supporting ADDC, DoE, ADCDA, and Abu Dhabi Municipality review criteria.',
    applicableStandards: ['BS 7430', 'IEC 60364', 'ADDC', 'DoE', 'ADCDA'],
    catalogGroupPrefixes: ['ER', 'EL'],
    parentExpertiseHref: '/expertise/earthing',
    parentExpertiseLabel: 'Full Earthing & Surge Protection Guide',
    parentServiceHref: '/services/earthing-and-grounding',
    parentServiceLabel: 'Earthing & Grounding Design Service',
    faqs: [
      {
        id: 'faq-ad-deep-earthing',
        question: 'How does Vision Energy handle high-resistivity desert or rocky soil in Abu Dhabi?',
        answer:
          'After measuring strata resistivity via the Wenner method, our engineers apply coupled deep electrodes, deep-bore earthing wells where soil strata permit, ground enhancement compounds, and interconnected copper perimeter loops bonded exothermically.',
      },
      {
        id: 'faq-ad-custom-earthbars',
        question: 'Can copper earth bars and disconnecting links be customised for Abu Dhabi substations?',
        answer:
          'Yes. Category ER-03 supports custom hole configurations, single/double disconnecting links, tinned copper finishes, and insulated standoffs subject to project drawings and lead times.',
      },
      {
        id: 'faq-ad-test-records',
        question: 'What commissioning test records are delivered after earthing installation?',
        answer:
          'Handover packages include fall-of-potential earth resistance readings, conductor continuity measurements, visual joint inspection checklists, and marked-up as-built earth pit locations.',
      },
    ],
  },
  'ras-al-khaimah:lightning-protection': {
    locationSlug: 'ras-al-khaimah',
    locationName: 'Ras Al Khaimah',
    countryName: 'United Arab Emirates',
    isUae: true,
    serviceSlug: 'lightning-protection',
    serviceTitle: 'Lightning Protection Systems',
    canonicalPath: '/uae/ras-al-khaimah/lightning-protection',
    seoTitle: 'Lightning Protection System Ras Al Khaimah | Vision Energy',
    seoDescription:
      'RAK HQ lightning protection contractor (Est. 2018): IEC 62305 & NF C 17-102 engineering & ex-stock LPS supply from Al Nakheel. Request quote.',
    keywords: [
      'Lightning Protection Ras Al Khaimah',
      'LPS Supplier RAK FTZ UAE',
      'Lightning Arrester Ras Al Khaimah',
      'IEC 62305 Contractor Northern Emirates',
      'Etihad WE SEWA Lightning Protection',
    ],
    h1: 'Lightning Protection Systems in Ras Al Khaimah, UAE',
    eyebrow: 'Ras Al Khaimah Head Office · Direct Local Dispatch & Engineering',
    heroImage: '/images/expertise-hero-bg.webp',
    heroImageAlt: 'Electrical engineer conducting lightning protection system testing for Ras Al Khaimah facilities',
    quickAnswer:
      'Headquartered in Al Nakheel, Ras Al Khaimah (RAK Business Centre BC4, RAK FTZ Business Park) since 2018, Vision Energy International delivers complete IEC 62305, BS EN 62305, and NF C 17-102 lightning protection systems across RAK and the Northern Emirates. Over 160 projects completed with ex-stock copper hardware and full submittal support.',
    localContextHeading: 'Direct Technical Engineering from Our Ras Al Khaimah HQ',
    localContextParagraphs: [
      'Operating our head office directly inside RAK FTZ Business Park (Al Nakheel, P.O Box 17111), Vision Energy supports industrial zones, manufacturing plants, port facilities, hospitality resorts, and commercial buildings throughout Ras Al Khaimah and neighbouring Northern Emirates.',
      'Our engineers execute physical site surveys, roof geometry assessments, risk classification calculations under IEC 62305, and turnkey supply of both Conventional Faraday Mesh and ESE active terminals.',
      'Project documentation and material submittals are coordinated for regional utility and engineering reviews across Etihad WE and SEWA service areas.',
    ],
    technicalScopeHeading: 'Ras Al Khaimah LPS Engineering & Supply Scope',
    technicalScopeItems: [
      'Rapid on-site roof and building survey dispatched directly from Al Nakheel, Ras Al Khaimah HQ',
      'Conventional copper air rods, roof mesh conductors, and structural clips (LP-01, LP-03)',
      'Early Streamer Emission (ESE) terminals, masts, guy-wire kits, and lightning event counters (LP-02)',
      'Copper and aluminium down conductors bonded to accessible inspection test points (LP-04)',
      'Coordinated Type 1, Type 2, and Type 3 Surge Protection Devices shielding plant electronics (EL-06)',
    ],
    authoritiesOrStandardsNote:
      'Submittals engineered to IEC 62305, BS EN 62305, IEC 62561, and NF C 17-102 standards with regional project experience spanning Etihad WE and SEWA.',
    applicableStandards: ['IEC 62305', 'BS EN 62305', 'NF C 17-102', 'Etihad WE', 'SEWA'],
    catalogGroupPrefixes: ['LP'],
    parentExpertiseHref: '/expertise/lightning',
    parentExpertiseLabel: 'Full Lightning Protection Engineering Guide',
    parentServiceHref: '/services/external-lightning-protection-installation',
    parentServiceLabel: 'External LPS Installation Service',
    faqs: [
      {
        id: 'faq-rak-hq',
        question: 'Where is Vision Energy International located in Ras Al Khaimah?',
        answer:
          'Our head office is located at RAK Business Centre BC4, RAK FTZ Business Park, P.O Box 17111, Al Nakheel, Ras Al Khaimah, UAE. Reach our desk on +971 7 204 2763 or WhatsApp +971 54 700 4616.',
      },
      {
        id: 'faq-rak-industrial',
        question: 'What Ras Al Khaimah facility types does Vision Energy protect against lightning?',
        answer:
          'We engineer and supply lightning protection for industrial factories, warehouses, substations, resorts, commercial complexes, and isolated elevated structures requiring IEC 62305 or ESE protection.',
      },
      {
        id: 'faq-rak-turnaround',
        question: 'Can we collect or arrange direct dispatch of LP hardware from Ras Al Khaimah?',
        answer:
          'Many core LP-01 to LP-04 components and clamps are available ex-stock subject to prior sale, with rapid coordination for urgent RAK and Northern Emirates project deliveries.',
      },
    ],
  },
  'ras-al-khaimah:earthing-grounding': {
    locationSlug: 'ras-al-khaimah',
    locationName: 'Ras Al Khaimah',
    countryName: 'United Arab Emirates',
    isUae: true,
    serviceSlug: 'earthing-grounding',
    serviceTitle: 'Earthing, Grounding & Surge Protection',
    canonicalPath: '/uae/ras-al-khaimah/earthing-grounding',
    seoTitle: 'Earthing & Grounding Ras Al Khaimah HQ | Vision Energy',
    seoDescription:
      'RAK HQ earthing contractor (Est. 2018): BS 7430 earthing grids, soil resistivity testing, exothermic welding & SPDs for Northern Emirates.',
    keywords: [
      'Earthing Contractor Ras Al Khaimah',
      'Soil Resistivity Testing RAK',
      'Ground Rods Supplier Ras Al Khaimah',
      'Exothermic Welding RAK FTZ',
      'Earthing Systems Northern Emirates',
    ],
    h1: 'Earthing, Grounding & Surge Protection in Ras Al Khaimah',
    eyebrow: 'Ras Al Khaimah Head Office · Direct Local Dispatch & Engineering',
    heroImage: '/images/earthing-grounding-hero.webp',
    heroImageAlt: 'Exothermic copper grounding connections and soil testing setup in Ras Al Khaimah',
    quickAnswer:
      'From our head office in Al Nakheel, Ras Al Khaimah, Vision Energy International provides BS 7430 earthing design, on-site Wenner soil resistivity surveys, earth enhancement materials, exothermic welding kits, custom copper earth bars, and coordinated SPDs across RAK industrial estates, rocky foothill sites, and Northern Emirates developments.',
    localContextHeading: 'Solving High-Resistivity Gravel, Mountain & Coastal Soils in RAK',
    localContextParagraphs: [
      'Ras Al Khaimah spans contrasting ground conditions—from coastal Al Nakheel fill and industrial parks to high-resistivity compacted limestone and rocky quarry zones inland.',
      'Our RAK engineering team conducts calibrated Wenner 4-point soil resistivity tests on site before specifying electrode depth, low-resistivity ground enhancement compounds (ER-01), permanent exothermic welded meshes (ER-02), and equipotential copper busbars (ER-03).',
      'Being headquartered directly in RAK enables rapid consultation, responsive site testing scheduling, and ex-stock grounding hardware fulfillment subject to prior sale.',
    ],
    technicalScopeHeading: 'Ras Al Khaimah Earthing & SPD Deliverables',
    technicalScopeItems: [
      'Calibrated Wenner 4-pin soil resistivity field surveys for RAK & Northern Emirates sites',
      'Ground enhancement compounds and deep-bore copper electrode scheduling (ER-01, ER-04)',
      'Exothermic welding moulds, weld charges, and permanent copper-to-steel structural bonds (ER-02)',
      'Custom copper earth bars with single or double disconnecting test links (ER-03)',
      'Full Type 1, Type 2, and Type 3 SPD surge protection and fall-of-potential test reports (EL-06)',
    ],
    authoritiesOrStandardsNote:
      'Engineered to BS 7430, BS 7671 / IEC 60364, and IEC 62561 standards supporting Etihad WE, SEWA, and industrial consultant inspections.',
    applicableStandards: ['BS 7430', 'IEC 60364', 'IEC 62561', 'Etihad WE', 'SEWA'],
    catalogGroupPrefixes: ['ER', 'EL'],
    parentExpertiseHref: '/expertise/earthing',
    parentExpertiseLabel: 'Full Earthing & Surge Protection Guide',
    parentServiceHref: '/services/earthing-and-grounding',
    parentServiceLabel: 'Earthing & Grounding Design Service',
    faqs: [
      {
        id: 'faq-rak-rocky-soil',
        question: 'How does Vision Energy design earthing for rocky terrain in Ras Al Khaimah?',
        answer:
          'Using on-site Wenner soil resistivity readings, our engineers design interconnected copper grid trenches backfilled with enhancement materials, supplemented by deep-drilled electrodes where surface driving is obstructed by rock.',
      },
      {
        id: 'faq-rak-inspection-bars',
        question: 'Do you supply heavy-duty earth pits and copper test links from RAK?',
        answer:
          'Yes. Earth bars, disconnecting links, inspection pits, copper tape, and earthing rods (ER-01 to ER-04, LP-04) are coordinated directly via our Ras Al Khaimah office.',
      },
      {
        id: 'faq-rak-contact',
        question: 'How can contractors in RAK book an urgent earthing survey or BOQ review?',
        answer:
          'Call our Ras Al Khaimah landline directly at +971 7 204 2763, message +971 54 700 4616 on WhatsApp, or email drawings to info@visionenergyme.com.',
      },
    ],
  },
  'qatar:lightning-protection': {
    locationSlug: 'qatar',
    locationName: 'Qatar',
    countryName: 'Qatar',
    isUae: false,
    serviceSlug: 'lightning-protection',
    serviceTitle: 'Lightning Protection Systems',
    canonicalPath: '/qatar/lightning-protection',
    seoTitle: 'Lightning Protection Supplier Qatar | IEC 62305 | Vision',
    seoDescription:
      'IEC 62305 & NF C 17-102 lightning protection engineering design support & hardware supply for Qatar projects from UAE HQ. Request datasheets.',
    keywords: [
      'Lightning Protection Supplier Qatar',
      'Lightning Arrester Qatar',
      'IEC 62305 Lightning Protection Qatar',
      'ESE Terminal Supply Qatar',
      'Faraday Mesh Lightning System Qatar',
    ],
    h1: 'Lightning Protection Engineering & Supply for Qatar',
    eyebrow: 'Qatar Project Market · Engineering Design & Export Supply from UAE HQ',
    heroImage: '/images/expertise-hero-bg.webp',
    heroImageAlt: 'Lightning protection engineering hardware and design documentation prepared for Qatar projects',
    quickAnswer:
      'Vision Energy International supplies IEC 62305, BS EN 62305, IEC 62561, NFPA 780, and NF C 17-102 lightning protection hardware and engineering design packages for commercial, industrial, and infrastructure developments in Qatar. All Qatar orders are coordinated from our Ras Al Khaimah, UAE headquarters (160+ projects completed since 2018; no local office in Qatar).',
    localContextHeading: 'International-Standard LPS Supply & Submittals for Qatar Projects',
    localContextParagraphs: [
      'Contractors and MEP procurement teams across Qatar require consistent lead times, full manufacturer datasheets, and standards-compliant calculation schedules covering conventional air-termination networks and active ESE systems.',
      'Coordinated from our Ras Al Khaimah head office (UAE) with Dubai and Abu Dhabi technical teams, Vision Energy supports Qatar projects through hardware supply, CAD/Rolling Sphere engineering calculations, and coordinated SPD schedules.',
      'All Qatari project deliverables strictly align to applicable international specifications (IEC 62305, BS EN 62305, IEC 62561, NF C 17-102, NFPA 780) and project-specific local regulatory review criteria submitted by the appointed site consultant.',
    ],
    technicalScopeHeading: 'Qatar LPS Engineering & Export Supply Scope',
    technicalScopeItems: [
      'IEC 62305 / BS EN 62305 Protection Level risk calculations and Rolling Sphere roof CAD layouts',
      'Ex-stock supply coordination of Franklin rods, copper/aluminium conductors, and test clamps (LP-01 to LP-04)',
      'NF C 17-102 Early Streamer Emission (ESE) terminals, support masts, and strike counters (LP-02)',
      'Type 1, Type 2, and Type 3 Surge Protection Devices (SPDs) for switchgear and instrumentation (EL-06)',
      'Technical datasheets, custom fabrication schedules, and commercial export documentation from UAE HQ',
    ],
    authoritiesOrStandardsNote:
      'Engineering schedules follow international codes (IEC 62305, BS EN 62305, IEC 62561, NF C 17-102, NFPA 780). Final approval compliance is confirmed against project specifications and applicable Qatar local authority requirements supplied by your project consultant.',
    applicableStandards: ['IEC 62305', 'BS EN 62305', 'IEC 62561', 'NF C 17-102', 'NFPA 780'],
    catalogGroupPrefixes: ['LP'],
    parentExpertiseHref: '/expertise/lightning',
    parentExpertiseLabel: 'Full Lightning Protection Engineering Guide',
    parentServiceHref: '/services/external-lightning-protection-installation',
    parentServiceLabel: 'LPS Design & Submittal Overview',
    faqs: [
      {
        id: 'faq-qatar-office',
        question: 'Does Vision Energy maintain a physical office inside Qatar?',
        answer:
          'No. Vision Energy International is headquartered in Ras Al Khaimah, UAE, with branches in Dubai and Abu Dhabi. We serve Qatar as a project engineering support and equipment supply market directly from our UAE hubs.',
      },
      {
        id: 'faq-qatar-standards',
        question: 'Which lightning protection standards are covered for Qatar tenders?',
        answer:
          'Hardware and technical submittals are structured around IEC 62305, BS EN 62305, IEC 62561, NF C 17-102, and NFPA 780, aligned with project consultant drawings and applicable local Qatari project specifications.',
      },
      {
        id: 'faq-qatar-quotes',
        question: 'How do Qatar contractors request LPS datasheets or BOQ pricing?',
        answer:
          'Send your project drawings or bill of quantities to info@visionenergyme.com, call +971 7 204 2763, or message +971 54 700 4616 on WhatsApp with Qatar specified as the delivery location.',
      },
    ],
  },
  'qatar:earthing-grounding': {
    locationSlug: 'qatar',
    locationName: 'Qatar',
    countryName: 'Qatar',
    isUae: false,
    serviceSlug: 'earthing-grounding',
    serviceTitle: 'Earthing, Grounding & Surge Protection',
    canonicalPath: '/qatar/earthing-grounding',
    seoTitle: 'Earthing & Grounding Supplier Qatar | BS 7430 | Vision',
    seoDescription:
      'BS 7430 & IEC 60364 earthing rods, exothermic welding, copper earth bars & SPDs supplied for Qatar projects from UAE HQ. Request datasheets.',
    keywords: [
      'Earthing Materials Supplier Qatar',
      'Grounding Hardware Export Qatar',
      'Exothermic Welding Kit Qatar',
      'Copper Earth Bars Disconnecting Links Qatar',
      'Surge Protection Devices Supply Qatar',
    ],
    h1: 'Earthing, Grounding & SPD Supply for Qatar Projects',
    eyebrow: 'Qatar Project Market · Engineering Design & Export Supply from UAE HQ',
    heroImage: '/images/earthing-grounding-hero.webp',
    heroImageAlt: 'Copper earthing conductors, exothermic welding moulds, and earth bars supplied to Qatar projects',
    quickAnswer:
      'Vision Energy International supplies BS 7430, BS 7671 / IEC 60364, and IEC 62561 earthing and surge protection hardware for projects in Qatar—covering earth enhancement materials, exothermic welding systems, custom copper earth bars, copper-bonded electrodes, and Type 1/2/3 SPDs coordinated from our Ras Al Khaimah, UAE HQ (no local Qatar office).',
    localContextHeading: 'Ground Grid Hardware & Design Coordination for Qatar Projects',
    localContextParagraphs: [
      'Large industrial facilities, energy compounds, commercial buildings, and infrastructure sites in Qatar rely on durable corrosion-resistant grounding components capable of handling high soil salinity and thermal fault stress.',
      'From our Ras Al Khaimah headquarters in the UAE, Vision Energy prepares coordinated earthing material schedules, custom earth bar drawings (ER-03), exothermic welding bills of material (ER-02), and Type 1/2/3 SPD selections (EL-06) with full datasheets ready for consultant approval.',
      'While we do not operate a physical branch inside Qatar, our logistics and engineering desk coordinates documented project supply across Qatar with clear stock status and manufacturer lead times.',
    ],
    technicalScopeHeading: 'Qatar Earthing & Bonding Supply Scope',
    technicalScopeItems: [
      'Conductive earth enhancement compounds improving rod-to-soil conductivity (ER-01)',
      'Exothermic welding graphite moulds, metal charges, handles, and ignition kits (ER-02)',
      'Custom copper, tinned-copper, and stainless earth bars with disconnecting links (ER-03)',
      'Earth electrode driving couplings, clamps, copper tape, and inspection earth pits (ER-04, LP-04)',
      'Type 1, Type 2, and Type 3 SPDs with international test datasheets (EL-06)',
    ],
    authoritiesOrStandardsNote:
      'Supplies and design assistance reference BS 7430, BS 7671 / IEC 60364, and IEC 62561; final regulatory compliance for Qatar is confirmed against project requirements provided by the client consultant.',
    applicableStandards: ['BS 7430', 'BS 7671', 'IEC 60364', 'IEC 62561'],
    catalogGroupPrefixes: ['ER', 'EL'],
    parentExpertiseHref: '/expertise/earthing',
    parentExpertiseLabel: 'Full Earthing & Surge Protection Guide',
    parentServiceHref: '/services/earthing-and-grounding',
    parentServiceLabel: 'Earthing Engineering Overview',
    faqs: [
      {
        id: 'faq-qatar-earthing-dispatch',
        question: 'How does Vision Energy fulfill earthing and grounding orders for Qatar projects?',
        answer:
          'All Qatar enquiries are handled directly by our Ras Al Khaimah HQ and Dubai/Abu Dhabi engineering teams, providing ex-stock availability checks, custom bar lead times, and commercial export schedules.',
      },
      {
        id: 'faq-qatar-spds',
        question: 'Are Surge Protection Devices (SPDs) supplied alongside earthing grids for Qatar?',
        answer:
          'Yes. Category EL-06 includes Type 1, Type 2, Type 3, DC/photovoltaic, and data-line surge arresters designed to coordinate with main equipotential earthing bars.',
      },
      {
        id: 'faq-qatar-custom-bars',
        question: 'Can earth bars be manufactured to project-specific dimensions before export to Qatar?',
        answer:
          'Yes. Custom earth bar lengths, hole drilling, tinned finishes, and disconnecting links (ER-03) are fabricated on request subject to approved drawings and factory lead times.',
      },
    ],
  },
};

export const WAVE1_UAE_ROUTES: Array<{ city: 'dubai' | 'abu-dhabi' | 'ras-al-khaimah'; service: Wave1ServiceSlug }> = [
  { city: 'dubai', service: 'lightning-protection' },
  { city: 'dubai', service: 'earthing-grounding' },
  { city: 'abu-dhabi', service: 'lightning-protection' },
  { city: 'abu-dhabi', service: 'earthing-grounding' },
  { city: 'ras-al-khaimah', service: 'lightning-protection' },
  { city: 'ras-al-khaimah', service: 'earthing-grounding' },
];

export const WAVE1_QATAR_ROUTES: Array<{ service: Wave1ServiceSlug }> = [
  { service: 'lightning-protection' },
  { service: 'earthing-grounding' },
];

export const ALL_WAVE1_PAGES: LocationServiceContent[] = Object.values(WAVE1_DATA);

export function getWave1Page(
  locationSlug: string,
  serviceSlug: string
): LocationServiceContent | null {
  const key = `${locationSlug}:${serviceSlug}` as `${Wave1LocationSlug}:${Wave1ServiceSlug}`;
  return WAVE1_DATA[key] || null;
}

export function buildWave1JsonLd(page: LocationServiceContent) {
  const pageUrl = `${COMPANY_FACTS.headOffice.locality ? 'https://www.visionenergyme.com' : ''}${page.canonicalPath}`;
  const fullUrl = pageUrl.startsWith('http')
    ? pageUrl
    : `https://www.visionenergyme.com${page.canonicalPath}`;

  const areaServed = page.isUae
    ? [
        { '@type': 'City', name: page.locationName },
        { '@type': 'Country', name: 'United Arab Emirates' },
      ]
    : [{ '@type': 'Country', name: 'Qatar' }];

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${fullUrl}#webpage`,
        url: fullUrl,
        name: page.seoTitle,
        headline: page.h1,
        description: page.seoDescription,
        inLanguage: 'en-AE',
        datePublished: '2026-11-26',
        dateModified: COMPANY_FACTS.lastUpdatedIso,
        isPartOf: { '@id': 'https://www.visionenergyme.com/#website' },
        about: { '@id': `${fullUrl}#service` },
        publisher: { '@id': 'https://www.visionenergyme.com/#organization' },
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['#location-hero h1', '#location-quick-answer', '#location-faq [data-aeo-answer]'],
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${fullUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.visionenergyme.com' },
          { '@type': 'ListItem', position: 2, name: 'Expertise', item: 'https://www.visionenergyme.com/expertise' },
          { '@type': 'ListItem', position: 3, name: `${page.serviceTitle} in ${page.locationName}`, item: fullUrl },
        ],
      },
      {
        '@type': 'Service',
        '@id': `${fullUrl}#service`,
        name: `${page.serviceTitle} in ${page.locationName}`,
        serviceType: page.serviceTitle,
        description: page.quickAnswer,
        url: fullUrl,
        areaServed,
        provider: { '@id': 'https://www.visionenergyme.com/#organization' },
      },
      {
        '@type': 'FAQPage',
        '@id': `${fullUrl}#faq`,
        mainEntity: page.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };
}

