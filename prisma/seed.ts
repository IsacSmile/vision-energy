import { PrismaClient, ContentStatus } from "@prisma/client";

const prisma = new PrismaClient();

const GROUP_LABELS: Record<string, string> = {
  LP: "Lightning Protection",
  ER: "Earthing & Grounding",
  LT: "Specialist & LED Lighting",
  CM: "Cable Management",
  CB: "Industrial & Optic Cables",
  CT: "Conduits & Trunking",
  EL: "Electrical & Control",
  EN: "Energy & Renewable Systems",
  ME: "Mechanical & HVAC",
  SG: "Security & Fire Systems",
  HW: "Hardware & Fasteners",
  SF: "Safety & Traffic Equipment",
  PK: "Industrial Packaging",
  ID: "Identification & Marking",
};

async function main() {
  console.log("Seeding Vision Energy database (PostgreSQL)...");

  // 1. Seed Services (idempotent upserts)
  const servicesData = [
    {
      slug: "external-lightning-protection-installation",
      title: "External Lightning Protection Installation",
      summary:
        "Complete structural lightning protection system design, supply, and installation compliant with IEC/BS EN 62305 standards.",
      icon: "zap",
      metaChips: ["Conventional mesh systems", "ESE systems"],
      status: ContentStatus.PUBLISHED,
      publishedAt: new Date("2026-01-01T00:00:00Z"),
      sortOrder: 1,
      seoTitle: "External Lightning Protection Installation UAE | Vision Energy",
      seoDescription:
        "Complete structural lightning protection system design, supply, and installation compliant with IEC/BS EN 62305 standards in Abu Dhabi and Dubai.",
      content: {
        heroLead:
          "Installation of external lightning protection systems for commercial buildings, industrial plants, warehouses, substations, infrastructure, hospitality facilities, schools, villas and critical installations.",
        overview:
          "A lightning protection system is not simply a lightning rod on a roof. It is a complete engineered protection network that gives lightning energy a controlled path to earth, reducing risk to people, structures and electrical equipment. Vision Energy installs external lightning protection using conventional mesh systems and, for suitable structures, ESE terminals.",
        systems: [
          {
            title: "Conventional Mesh / Faraday Cage Systems",
            body: "For buildings requiring multiple controlled paths for lightning energy, Vision Energy provides conventional protection using air terminals, roof conductor mesh, connected down conductors, test joints and a coordinated earthing network.",
            points: ["Air terminals", "Roof conductor mesh", "Continuous down conductors", "Test joints", "Earth pits"],
          },
          {
            title: "ESE Coverage Concept",
            body: "For suitable structures, an ESE terminal can be incorporated into a complete external lightning protection solution. The terminal is installed on a mast above the highest protected plane, with PVC-covered copper down conductors, test points, equipotential bonding and a dedicated lightning earthing system.",
            points: ["ESE terminal on a mast", "PVC-covered copper down conductors", "Test points", "Dedicated earth pits"],
          },
        ],
        included: [
          "Franklin Air Rods & ESE System Installation",
          "Down Conductor Routing & Heavy-Duty Fastening",
          "Test Joint & Inspection Pit Assembly",
          "Earth Termination Network Connection",
          "Integrity & Continuity Testing",
          "As-Built Documentation & Compliance Certification",
        ],
        whereWeInstall: [
          "Commercial and residential developments",
          "High-rise and mixed-use buildings",
          "Warehouses and logistics facilities",
          "Industrial plants and manufacturing facilities",
          "Oil and gas support facilities",
          "Substations, utility infrastructure and telecom sites",
          "Hotels, schools, healthcare facilities and government buildings",
          "Villas, compounds and community facilities",
          "Data, security and communication-critical installations",
        ],
        process: [
          { title: "Enquiry and project brief", description: "Scope, location, building type and protection objective.", confirmed: true },
          { title: "Documents and initial review", description: "Drawings, layouts, specifications and available records.", confirmed: true },
          { title: "Site visit and building survey", description: "Roof, facade, access, services, structure and exposure.", confirmed: true },
          { title: "Installation and supervision", description: "Specified routing, connections, earth pit execution and quality control.", confirmed: true },
          { title: "Testing and commissioning", description: "Continuity, earth resistance and inspection verification.", confirmed: false },
          { title: "Handover and future support", description: "Reports, photographs, completion records and maintenance support.", confirmed: false },
        ],
        standards: [
          "BS EN 62305",
          "IEC 62305",
          "IEC 62561",
          "NFC 17-102 (ESE systems, where applicable)",
          "NFPA 780 (where applicable)",
        ],
        complianceNote:
          "Final technical and test criteria are confirmed against project requirements, actual site conditions and applicable authority requirements.",
        faq: [],
        relatedCategoryCodes: ["LP-01", "LP-02", "LP-03", "LP-04", "ER-02", "ER-04"],
      },
    },
    {
      slug: "manpower-supply",
      title: "Specialist Engineering Manpower Supply",
      summary:
        "Certified electrical, mechanical, and solar technicians, site engineers, and installers for project execution across UAE.",
      icon: "users",
      metaChips: ["Specialist Manpower", "Technical Support"],
      status: ContentStatus.PUBLISHED,
      publishedAt: new Date("2026-01-01T00:00:00Z"),
      sortOrder: 2,
      seoTitle: "Engineering Manpower Supply UAE | Vision Energy",
      seoDescription:
        "Certified electrical, mechanical, and solar technicians, site engineers, and installers for project execution across UAE.",
      content: {
        heroLead: "Vision Energy can also provide manpower services for your project.",
        overview:
          "Vision Energy International provides highly skilled, site-tested engineering personnel for short-term and long-term project deployments across Abu Dhabi, Dubai, Ras Al Khaimah, and the Northern Emirates.",
        systems: [],
        included: [
          "Certified High & Low Voltage Electricians",
          "Lightning Protection & Earthing System Specialists",
          "Solar PV & Renewable Energy Technicians",
          "Mechanical & HVAC Maintenance Technicians",
          "HSE Compliant Site Supervisors & QA/QC Officers",
        ],
        whereWeInstall: [],
        process: [
          { title: "Evaluation", description: "Project Scope & Technical Skill Requirement Evaluation", confirmed: true },
          { title: "Verification", description: "Candidate Trade Testing & HSE Certification Verification", confirmed: true },
          { title: "Mobilisation", description: "Mobilisation, Site Induction & Tooling Provision", confirmed: true },
          { title: "Support", description: "Dedicated On-Site Supervisory Support & Performance Audits", confirmed: false },
        ],
        standards: [],
        complianceNote: "Personnel undergo rigorous technical and HSE safety evaluations before site placement.",
        faq: [],
        relatedCategoryCodes: [],
      },
    },
    {
      slug: "earthing-and-grounding",
      title: "Earthing & Grounding System Design & Installation",
      summary:
        "Low-resistance earthing grids, chemical earth enhancement, and deep well earth electrodes for industrial facilities.",
      icon: "shield",
      metaChips: ["Grounding Systems", "Earth Pits"],
      status: ContentStatus.DRAFT,
      publishedAt: null,
      sortOrder: 3,
      seoTitle: "Earthing & Grounding System Design | Vision Energy",
      seoDescription: "Low-resistance earthing grids and chemical earth enhancement systems for industrial facilities.",
      content: {
        heroLead: "Low-resistance earthing grids, chemical earth enhancement, and deep well earth electrodes.",
        overview:
          "Scope and client confirmation in progress. Low-impedance earthing networks are essential for personnel safety and fault-current dissipation.",
        systems: [],
        included: [
          "Earth Resistance Testing & Soil Resistivity Analysis",
          "Copper Bonded & Pure Copper Earth Rod Installation",
          "Exothermic Welding & Permanent Molecular Connections",
          "Earth Inspection Pits & Disconnecting Link Setup",
        ],
        whereWeInstall: ["Industrial Facilities", "Substations"],
        process: [
          { title: "Survey", description: "Soil Resistivity Survey", confirmed: false },
          { title: "Design", description: "Grid Simulation & BOQ Design", confirmed: false },
          { title: "Execution", description: "Electrode Installation & Soil Backfill", confirmed: false },
        ],
        standards: ["BS 7430", "IEEE Std 80"],
        complianceNote: "Draft scope pending client approval.",
        faq: [],
        relatedCategoryCodes: ["ER-01", "ER-02", "ER-03", "ER-04"],
      },
    },
    {
      slug: "surge-protection-and-bonding",
      title: "Surge Protection Devices (SPD) & Equipotential Bonding",
      summary:
        "Type 1, Type 2, and Type 3 surge arrester installation and equipotential bonding for sensitive electrical/electronic equipment.",
      icon: "activity",
      metaChips: ["Surge Protection", "Bonding"],
      status: ContentStatus.DRAFT,
      publishedAt: null,
      sortOrder: 4,
      seoTitle: "Surge Protection Devices & Bonding | Vision Energy",
      seoDescription: "Type 1, Type 2, and Type 3 surge arrester installation and equipotential bonding.",
      content: {
        heroLead: "Type 1, Type 2, and Type 3 surge arrester installation and equipotential bonding.",
        overview:
          "Scope and client confirmation in progress. Protection against transient overvoltages induced by lightning strikes and power switching operations.",
        systems: [],
        included: [
          "Main Distribution Board (MDB) Type 1+2 SPD Fitting",
          "Sub-Distribution Board (SMDB/DB) Type 2 SPD Fitting",
          "Telecom & Data Line Surge Protection",
          "Main Equipotential Bonding Bar (MEBB) Interconnection",
        ],
        whereWeInstall: ["Commercial Buildings", "Data Centers"],
        process: [
          { title: "Analysis", description: "Transient Overvoltage Risk Analysis", confirmed: false },
          { title: "Placement", description: "SPD Rating & Coordinated Placement", confirmed: false },
        ],
        standards: ["IEC 61643"],
        complianceNote: "Draft scope pending client approval.",
        faq: [],
        relatedCategoryCodes: ["EL-06"],
      },
    },
  ];

  for (const item of servicesData) {
    await prisma.service.upsert({
      where: { slug: item.slug },
      update: {
        title: item.title,
        summary: item.summary,
        icon: item.icon,
        metaChips: item.metaChips,
        content: item.content,
        status: item.status,
        publishedAt: item.publishedAt,
        sortOrder: item.sortOrder,
        seoTitle: item.seoTitle,
        seoDescription: item.seoDescription,
      },
      create: {
        slug: item.slug,
        title: item.title,
        summary: item.summary,
        icon: item.icon,
        metaChips: item.metaChips,
        content: item.content,
        status: item.status,
        publishedAt: item.publishedAt,
        sortOrder: item.sortOrder,
        seoTitle: item.seoTitle,
        seoDescription: item.seoDescription,
      },
    });
  }
  console.log(`Seeded ${servicesData.length} services (upsert).`);

  // 2. Seed Product Categories (57 items from fallback categories with PUBLISHED status)
  const categoriesRaw = [
    { code: "LP-01", slug: "conventional-lightning-protection-systems", title: "Conventional Lightning Protection Systems", description: "Complete conventional lightning protection systems for buildings, industrial facilities and infrastructure, designed around air terminals, roof conductors, down conductors, test points and earth termination networks.", families: ["Franklin air terminals", "air rods", "roof conductor tape", "conductor clips", "test joints", "bimetallic connectors", "inspection pits", "mounting bases"], sortOrder: 1 },
    { code: "LP-02", slug: "early-streamer-emission-lightning-protection-systems", title: "Early Streamer Emission (ESE) Lightning Protection Systems", description: "Early Streamer Emission lightning protection solutions for specified projects requiring an ESE air terminal, mast, dedicated down conductor and engineered earthing arrangement.", families: ["ESE terminals", "lightning event counters", "test equipment", "support masts", "guy-wire kits", "copper and stainless-steel accessories"], sortOrder: 2 },
    { code: "LP-03", slug: "lightning-protection-clamps-fixings-and-accessories", title: "Lightning Protection Clamps, Fixings and Accessories", description: "Specialist connection and fixing accessories for lightning protection conductors, air terminals and earth electrodes.", families: ["Tape clamps", "cable clamps", "roof conductor holders", "cross connectors", "tee connectors", "bimetallic joints", "saddles", "fasteners"], sortOrder: 3 },
    { code: "LP-04", slug: "down-conductors-earthing-tapes-and-conductors", title: "Down Conductors, Earthing Tapes and Conductors", description: "Down conductor and earthing conductor products for carrying lightning current and fault current safely to the earth termination system.", families: ["Bare copper conductor", "stranded copper cable", "copper tape", "tinned copper braid", "aluminium tape", "GI strip", "PVC insulated earth cable"], sortOrder: 4 },
    { code: "ER-01", slug: "earthing-enhancement-materials", title: "Earthing Enhancement Materials", description: "Engineered earth enhancement materials for improving soil conductivity and supporting stable earth resistance in difficult soil conditions.", families: ["Conductive backfill", "bentonite", "earth enhancement compound", "conductive concrete", "chemical earth electrode compounds", "installation tools"], sortOrder: 5 },
    { code: "ER-02", slug: "exothermic-welding-systems", title: "Exothermic Welding Systems", description: "Exothermic welding materials and tools for permanent, high-integrity electrical connections between copper conductors, earthing tapes, ground rods and steel reinforcement.", families: ["Graphite moulds", "weld metal charges", "mould handles", "ignition accessories", "cable-to-cable connections", "cable-to-rod connections"], sortOrder: 6 },
    { code: "ER-03", slug: "earth-bars-and-disconnecting-links", title: "Earth Bars and Disconnecting Links", description: "Customisable earth bars, earthing terminals and disconnecting links for inspection, testing and reliable bonding of electrical and lightning protection systems.", families: ["Copper earth bars", "tinned copper bars", "stainless-steel earth bars", "single disconnecting links", "double disconnecting links", "test links", "braided bonds"], sortOrder: 7 },
    { code: "ER-04", slug: "earth-electrode-and-bonding-accessories", title: "Earth Electrode and Bonding Accessories", description: "Earth electrode accessories, conductor clamps and bonding connections for completing grounding and lightning protection installations.", families: ["Earth rod clamps", "tape-to-tape clamps", "cable-to-tape clamps", "rod couplers", "inspection joints", "bonding clamps", "bimetallic connectors"], sortOrder: 8 },
    { code: "LT-01", slug: "aviation-helipad-and-marine-lighting", title: "Aviation, Helipad and Marine Lighting", description: "Special-purpose lighting and visual guidance equipment for aviation, helipad, marine and offshore applications.", families: ["Obstacle lights", "helipad lights", "marine navigation lights", "warning beacons", "inset lights", "LED signal lights", "control boxes"], sortOrder: 9 },
    { code: "LT-02", slug: "led-light-fixtures-and-luminaires", title: "LED Light Fixtures and Luminaires", description: "Energy-efficient LED luminaires for commercial, industrial, architectural and outdoor lighting applications.", families: ["LED floodlights", "high-bay lights", "panel lights", "linear lights", "downlights", "streetlights", "wall lights", "weatherproof fittings"], sortOrder: 10 },
    { code: "LT-03", slug: "streetlights-high-masts-and-flagpoles", title: "Streetlights, High Masts and Flagpoles", description: "Street lighting poles, high-mast lighting structures, decorative poles and flagpoles for municipal, commercial and infrastructure projects.", families: ["Streetlight poles", "high-mast poles", "solar streetlights", "decorative poles", "CCTV poles", "flagpoles", "base plates", "anchor bolt assemblies"], sortOrder: 11 },
    { code: "LT-04", slug: "signal-beacons-and-tower-lights", title: "Signal Beacons and Tower Lights", description: "Industrial signalling lights, stack lights, beacons and audible-visual warning devices for equipment status indication, process control and safety communication.", families: ["LED stack lights", "rotating beacons", "flashing beacons", "signal towers", "siren beacons", "traffic signals", "machine-status indicators"], sortOrder: 12 },
    { code: "CM-01", slug: "cable-management-systems-and-cable-trays", title: "Cable Management Systems and Cable Trays", description: "Cable tray, cable ladder and cable containment systems for routing, supporting and protecting power, control, instrumentation and data cables.", families: ["Cable ladder", "perforated tray", "wire-mesh tray", "trunking", "tray bends", "tees", "reducers", "tray covers", "support channels"], sortOrder: 13 },
    { code: "CM-02", slug: "cable-cleats-and-cable-supports", title: "Cable Cleats and Cable Supports", description: "Cable cleats and support systems for secure cable retention in industrial, utility and infrastructure installations.", families: ["Single cable cleats", "trefoil cleats", "multicore cleats", "stainless-steel cleats", "aluminium cleats", "polymer cleats", "cable clamps", "support brackets"], sortOrder: 14 },
    { code: "CM-03", slug: "cable-ties-heat-sleeves-and-cable-management-accessories", title: "Cable Ties, Heat Sleeves and Cable Management Accessories", description: "Cable management accessories for bundling, protecting, routing and finishing electrical installations.", families: ["Nylon cable ties", "stainless-steel cable ties", "heat-shrink sleeves", "spiral wrap", "split conduit", "cable markers", "cable glands", "cable clips"], sortOrder: 15 },
    { code: "CM-04", slug: "cable-identification-tags-and-markers", title: "Cable Identification Tags and Markers", description: "Cable identification systems for clear, durable labelling of cables, wires, terminals, panels and equipment.", families: ["Cable tags", "stainless-steel markers", "heat-shrink markers", "clip-on markers", "terminal markers", "legend plates", "marker carriers"], sortOrder: 16 },
    { code: "CB-01", slug: "industrial-power-control-and-instrumentation-cables", title: "Industrial Power, Control and Instrumentation Cables", description: "Industrial cable range for power distribution, control, instrumentation, communication and specialised applications.", families: ["Single-core cable", "multicore power cable", "control cable", "instrumentation cable", "screened cable", "armoured cable", "fire-resistant cable", "LSZH cable"], sortOrder: 17 },
    { code: "CB-02", slug: "fibre-optic-cables-patch-cords-and-connectivity", title: "Fibre Optic Cables, Patch Cords and Connectivity", description: "Optical fibre connectivity products for telecommunications, data networks, security, industrial automation and fibre-to-the-premises infrastructure.", families: ["Single-mode fibre", "multimode fibre", "FTTH drop cable", "armoured fibre cable", "patch cords", "pigtails", "LC connectors", "SC connectors", "fibre termination boxes"], sortOrder: 18 },
    { code: "CB-03", slug: "cable-terminations-and-jointing-kits", title: "Cable Terminations and Jointing Kits", description: "Cable jointing and termination systems for low-voltage and medium-voltage cable installations.", families: ["Heat-shrink terminations", "cold-shrink terminations", "straight-through joints", "transition joints", "screened cable accessories", "stress-control components", "breakout boots"], sortOrder: 19 },
    { code: "CB-04", slug: "cable-glands-lugs-and-connectors", title: "Cable Glands, Lugs and Connectors", description: "Cable entry, termination and connection accessories for safe, orderly electrical installations.", families: ["Armoured cable glands", "non-armoured glands", "EMC glands", "brass glands", "cable lugs", "bi-metallic lugs", "copper lugs", "ferrules", "reducers"], sortOrder: 20 },
    { code: "CT-01", slug: "rigid-gi-and-stainless-steel-conduit-systems", title: "Rigid GI and Stainless-Steel Conduit Systems", description: "Rigid galvanised steel and stainless-steel conduit systems for mechanical protection of electrical wiring in commercial, industrial and demanding environments.", families: ["GI conduit", "stainless-steel conduit", "threaded elbows", "couplers", "unions", "inspection tees", "junction boxes", "locknuts", "saddles"], sortOrder: 21 },
    { code: "CT-02", slug: "pvc-conduit-and-trunking-systems", title: "PVC Conduit and Trunking Systems", description: "PVC conduit, flexible conduit, trunking and accessory systems for electrical cable containment in building and light-industrial installations.", families: ["PVC conduit", "corrugated PVC conduit", "PVC trunking", "elbows", "couplers", "junction boxes", "adaptable boxes", "conduit clips", "cable ducting"], sortOrder: 22 },
    { code: "CT-03", slug: "flexible-conduit-systems", title: "Flexible Conduit Systems", description: "Flexible metallic and non-metallic conduit systems for cable protection where vibration, movement, tight routing or mechanical flexibility is required.", families: ["Liquid-tight flexible conduit", "PVC-coated conduit", "galvanized flexible conduit", "conduit glands", "connectors", "elbows", "flexible junction boxes"], sortOrder: 23 },
    { code: "EL-01", slug: "electrical-switches-and-wiring-accessories", title: "Electrical Switches and Wiring Accessories", description: "Electrical switches, socket outlets, dimmers, isolating switches, mounting boxes and wiring accessories for residential, commercial and industrial installations.", families: ["Light switches", "socket outlets", "USB outlets", "dimmers", "fan regulators", "weatherproof sockets", "surface boxes", "flush boxes", "terminal blocks"], sortOrder: 24 },
    { code: "EL-02", slug: "electrical-isolators-and-disconnect-switches", title: "Electrical Isolators and Disconnect Switches", description: "Isolators and disconnect switches for safe circuit separation, maintenance isolation and local equipment control.", families: ["Rotary isolators", "load-break switches", "switch disconnectors", "enclosed isolators", "lockable isolators", "changeover switches", "switch-fuse units"], sortOrder: 25 },
    { code: "EL-03", slug: "control-panel-components", title: "Control Panel Components", description: "Control-panel components for panel builders, machine control and industrial automation.", families: ["Terminal blocks", "contactors", "relays", "timers", "pushbuttons", "selector switches", "pilot lamps", "DIN rail", "cable duct", "panel meters"], sortOrder: 26 },
    { code: "EL-04", slug: "industrial-plugs-sockets-and-connectors", title: "Industrial Plugs, Sockets and Connectors", description: "Industrial plugs, sockets, couplers and interlocked socket outlets for dependable power connections in construction, manufacturing, events and utility environments.", families: ["IEC 60309 plugs", "industrial sockets", "couplers", "panel sockets", "interlocked sockets", "extension leads", "cable connectors", "IP-rated outlets"], sortOrder: 27 },
    { code: "EL-05", slug: "electrical-protection-and-control-components", title: "Electrical Protection and Control Components", description: "Protection and control components for electrical distribution and machinery, including fuses, relay products, current transformers, monitoring devices and terminal systems.", families: ["Fuses", "fuse holders", "current transformers", "monitoring relays", "timers", "terminal blocks", "control relays", "contactors", "overload protection"], sortOrder: 28 },
    { code: "EL-06", slug: "surge-protection-devices", title: "Surge Protection Devices", description: "Surge protection devices for safeguarding power, data and control circuits from transient overvoltages caused by lightning activity and switching events.", families: ["Type 1 SPD", "Type 2 SPD", "Type 3 SPD", "DC surge protection", "data-line surge protection", "coaxial SPD", "photovoltaic SPD", "lightning arresters"], sortOrder: 29 },
    { code: "EL-07", slug: "electrical-transformers", title: "Electrical Transformers", description: "Electrical transformers for voltage transformation, isolation, control, metering and industrial power applications.", families: ["Distribution transformers", "dry-type transformers", "isolation transformers", "control transformers", "current transformers", "voltage transformers", "toroidal transformers"], sortOrder: 30 },
    { code: "EL-08", slug: "industrial-automation-and-sensors", title: "Industrial Automation and Sensors", description: "Industrial automation products for machine control, process monitoring and connected operations.", families: ["PLCs", "HMI panels", "VFDs", "remote I/O", "industrial Ethernet", "safety controllers", "power supplies", "automation modules"], sortOrder: 31 },
    { code: "EL-09", slug: "industrial-sensors-encoders-and-connectors", title: "Industrial Sensors, Encoders and Connectors", description: "Industrial sensing and connectivity products for position, speed, presence, temperature and process monitoring.", families: ["Proximity sensors", "photoelectric sensors", "limit switches", "encoders", "M8 connectors", "M12 connectors", "industrial Ethernet connectors", "diodes"], sortOrder: 32 },
    { code: "EL-10", slug: "enclosures-and-junction-boxes", title: "Enclosures and Junction Boxes", description: "Electrical enclosures, cabinets and junction boxes for housing, protecting and organising electrical and control equipment.", families: ["Wall-mount enclosures", "floor-standing cabinets", "junction boxes", "terminal boxes", "IP-rated enclosures", "stainless-steel cabinets", "viewing windows"], sortOrder: 33 },
    { code: "EL-11", slug: "explosion-proof-equipment-and-accessories", title: "Explosion-Proof Equipment and Accessories", description: "Explosion-protected electrical equipment for hazardous-area installations, including luminaires, junction boxes, control stations, glands and accessories.", families: ["Ex lighting", "Ex junction boxes", "Ex control stations", "Ex cable glands", "Ex plugs and sockets", "hazardous-area enclosures", "Ex beacons"], sortOrder: 34 },
    { code: "EL-12", slug: "industrial-stabilizers-filters-and-rectifiers", title: "Industrial Stabilisers, Filters and Rectifiers", description: "Power-quality and power-conversion equipment for industrial electrical systems, including voltage stabilisers, harmonic filters, rectifiers, DC power supplies and related assemblies.", families: ["Voltage stabilizers", "servo stabilizers", "harmonic filters", "rectifiers", "battery chargers", "DC power systems", "power-factor correction components"], sortOrder: 35 },
    { code: "EN-01", slug: "solar-pv-components", title: "Solar PV Components", description: "Solar photovoltaic balance-of-system components for commercial, industrial and off-grid installations.", families: ["Solar PV modules", "string inverters", "combiner boxes", "DC isolators", "MC4 connectors", "solar cable", "mounting rails", "fuses", "SPDs"], sortOrder: 36 },
    { code: "EN-02", slug: "solar-lighting-and-solar-water-heating", title: "Solar Lighting and Solar Water Heating", description: "Solar-powered lighting and solar water-heating solutions for energy-efficient outdoor, residential and commercial applications.", families: ["Solar streetlights", "solar garden lights", "solar floodlights", "solar water heaters", "solar collectors", "batteries", "charge controllers"], sortOrder: 37 },
    { code: "ME-01", slug: "ventilation-systems", title: "Ventilation Systems", description: "Ventilation equipment for air movement, extraction, fresh-air supply and smoke-control support in commercial and industrial settings.", families: ["Axial fans", "centrifugal fans", "inline fans", "exhaust fans", "roof ventilators", "air grilles", "duct accessories", "fan speed controls"], sortOrder: 38 },
    { code: "ME-02", slug: "hvac-and-refrigeration-components", title: "HVAC and Refrigeration Components", description: "HVAC and refrigeration components for cooling, air-conditioning and cold-room systems.", families: ["Compressors", "condensers", "evaporators", "fan motors", "copper tubing", "valves", "filters", "pressure gauges", "refrigeration controls"], sortOrder: 39 },
    { code: "ME-03", slug: "industrial-pumps-and-fluid-handling", title: "Industrial Pumps and Fluid Handling", description: "Industrial pumps, valves and fluid-handling components for water, drainage, pressure boosting, process and transfer applications.", families: ["Centrifugal pumps", "submersible pumps", "vertical multistage pumps", "booster sets", "diaphragm pumps", "valves", "impellers", "fittings"], sortOrder: 40 },
    { code: "ME-04", slug: "industrial-air-compressors-and-pneumatic-systems", title: "Industrial Air Compressors and Pneumatic Systems", description: "Compressed-air equipment and pneumatic system components for workshops, manufacturing and industrial operations.", families: ["Screw compressors", "piston compressors", "air receivers", "air dryers", "FRL units", "pressure gauges", "pneumatic valves", "hoses", "fittings"], sortOrder: 41 },
    { code: "ME-05", slug: "industrial-gauges-valves-and-fittings", title: "Industrial Gauges, Valves and Fittings", description: "Industrial valves, gauges, fittings and instrumentation accessories for fluid, gas and pneumatic systems.", families: ["Ball valves", "butterfly valves", "gate valves", "pressure gauges", "safety valves", "needle valves", "stainless-steel fittings", "brass fittings"], sortOrder: 42 },
    { code: "ME-06", slug: "electric-water-heaters-and-accessories", title: "Electric Water Heaters and Accessories", description: "Electric water heaters and associated safety, control and plumbing accessories for residential, commercial and light-industrial hot-water systems.", families: ["Storage water heaters", "instantaneous water heaters", "heating elements", "thermostats", "safety valves", "expansion vessels", "flexible connectors"], sortOrder: 43 },
    { code: "SG-01", slug: "cctv-and-security-products", title: "CCTV and Security Products", description: "CCTV and security equipment for video surveillance, access monitoring and perimeter protection.", families: ["IP cameras", "dome cameras", "PTZ cameras", "NVRs", "DVRs", "CCTV monitors", "PoE switches", "access-control devices", "brackets"], sortOrder: 44 },
    { code: "SG-02", slug: "industrial-alarm-and-alert-systems", title: "Industrial Alarm and Alert Systems", description: "Alarm, notification and emergency alert products for industrial, commercial and public-safety applications.", families: ["Fire alarm sounders", "strobe lights", "manual call points", "sirens", "emergency call systems", "evacuation indicators", "warning horns"], sortOrder: 45 },
    { code: "SG-03", slug: "fire-protection-equipment", title: "Fire Protection Equipment", description: "Fire-protection equipment and accessories for first-response firefighting, hose systems and safety support.", families: ["Fire extinguishers", "hose reels", "fire hoses", "landing valves", "hose cabinets", "fire blankets", "fire signs", "firefighting accessories"], sortOrder: 46 },
    { code: "SG-04", slug: "weather-monitoring-systems", title: "Weather Monitoring Systems", description: "Weather monitoring instruments and stations for measuring wind, temperature, humidity, rainfall, solar radiation and other environmental parameters.", families: ["Weather stations", "anemometers", "wind vanes", "rain gauges", "temperature sensors", "humidity sensors", "data loggers", "solar-powered telemetry"], sortOrder: 47 },
    { code: "HW-01", slug: "hardware-accessories-and-fasteners", title: "Hardware Accessories and Fasteners", description: "Hardware accessories and fasteners for construction, electrical, mechanical and support-system installations.", families: ["Bolts", "nuts", "washers", "threaded rods", "anchors", "screws", "channel nuts", "brackets", "U-bolts", "clamps"], sortOrder: 48 },
    { code: "HW-02", slug: "heavy-duty-clamps-and-cable-tray-supports", title: "Heavy-Duty Clamps and Cable Tray Supports", description: "Heavy-duty pipe clamps, channel supports, threaded-rod systems and cable-tray support accessories for industrial and building-services installations.", families: ["Pipe clamps", "rubber-lined clamps", "trapeze supports", "strut channels", "cantilever arms", "threaded rods", "anchors", "channel brackets"], sortOrder: 49 },
    { code: "HW-03", slug: "tools-and-equipment", title: "Tools and Equipment", description: "Professional electrical, mechanical and installation tools for site work, maintenance and project execution.", families: ["Insulated hand tools", "crimping tools", "cable cutters", "measuring instruments", "power tools", "cable rollers", "tool kits", "test equipment"], sortOrder: 50 },
    { code: "HW-04", slug: "professional-welding-machines-and-accessories", title: "Professional Welding Machines and Accessories", description: "Professional welding equipment and consumables for fabrication, maintenance and site works.", families: ["MIG welders", "TIG welders", "MMA welders", "welding torches", "electrodes", "filler wire", "welding cables", "helmets", "gloves"], sortOrder: 51 },
    { code: "HW-05", slug: "constant-force-springs-and-mechanical-components", title: "Constant-Force Springs and Mechanical Components", description: "Constant-force springs and precision mechanical components for controlled motion, retracting mechanisms, counterbalance systems and specialised equipment.", families: ["Constant-force springs", "spring reels", "retractors", "pulleys", "tension springs", "extension springs", "mounting brackets", "custom assemblies"], sortOrder: 52 },
    { code: "EN-03", slug: "industrial-generator-equipment", title: "Industrial Generator Equipment", description: "Generator sets, alternators, control panels and auxiliary equipment for standby, prime and industrial power-generation applications.", families: ["Diesel generators", "gas generators", "alternators", "automatic transfer switches", "generator control panels", "fuel tanks", "battery chargers", "exhaust systems"], sortOrder: 53 },
    { code: "SF-01", slug: "safety-marking-warning-tapes-and-traffic-equipment", title: "Safety Marking, Warning Tapes and Traffic Equipment", description: "Safety marking products for clearly identifying hazards, underground services, restricted areas and temporary work zones.", families: ["Warning tape", "detectable tape", "barricade tape", "floor marking tape", "traffic cones", "delineators", "reflective markers", "cable route markers"], sortOrder: 54 },
    { code: "SF-02", slug: "industrial-personal-protective-equipment-ppe", title: "Industrial Personal Protective Equipment (PPE)", description: "Personal protective equipment for site, industrial and maintenance work.", families: ["Safety helmets", "safety shoes", "gloves", "eye protection", "hearing protection", "high-visibility wear", "fall-arrest harnesses", "respiratory protection"], sortOrder: 55 },
    { code: "PK-01", slug: "industrial-packaging-supplies", title: "Industrial Packaging Supplies", description: "Industrial packaging supplies for protecting, securing and dispatching goods, equipment and project materials.", families: ["Stretch film", "bubble wrap", "foam sheets", "corrugated cartons", "packing tape", "strapping", "edge protectors", "pallet-wrap accessories"], sortOrder: 56 },
    { code: "ID-01", slug: "engraved-plates-and-equipment-identification", title: "Engraved Plates and Equipment Identification", description: "Custom engraved plates, cable tags, warning labels and equipment identification solutions for electrical, industrial and safety applications.", families: ["Engraved labels", "stainless-steel plates", "aluminium tags", "traffolyte labels", "cable markers", "danger signs", "asset tags", "equipment nameplates"], sortOrder: 57 },
  ];

  for (const cat of categoriesRaw) {
    const groupPrefix = cat.code.split("-")[0];
    const groupLabel = GROUP_LABELS[groupPrefix] || groupPrefix;

    await prisma.productCategory.upsert({
      where: { code: cat.code },
      update: {
        slug: cat.slug,
        group: groupPrefix,
        groupLabel,
        sortOrder: cat.sortOrder,
        priority: cat.sortOrder <= 4,
        title: cat.title,
        description: cat.description,
        productFamilies: cat.families,
        status: ContentStatus.PUBLISHED,
        seoTitle: `${cat.title} UAE | Vision Energy`,
        seoDescription: cat.description,
      },
      create: {
        code: cat.code,
        slug: cat.slug,
        group: groupPrefix,
        groupLabel,
        sortOrder: cat.sortOrder,
        priority: cat.sortOrder <= 4,
        title: cat.title,
        description: cat.description,
        productFamilies: cat.families,
        status: ContentStatus.PUBLISHED,
        seoTitle: `${cat.title} UAE | Vision Energy`,
        seoDescription: cat.description,
      },
    });
  }
  console.log(`Seeded ${categoriesRaw.length} product categories (upsert).`);

  // 3. Seed Blog Posts (3 placeholder posts, status DRAFT, isPlaceholder true)
  const blogPostsData = [
    {
      slug: "lightning-protection-standards-uae",
      title: "Understanding IEC/BS EN 62305 Lightning Protection Standards in the UAE",
      excerpt:
        "A technical overview of risk management, strike probability calculations, and structural protection requirements for UAE buildings.",
      content: `Lightning protection in the United Arab Emirates requires strict adherence to international safety codes, primarily IEC/BS EN 62305 and NF C 17-102. Given the high-rise architectural landscape and harsh coastal environmental conditions in emirates like Dubai, Abu Dhabi, and Ras Al Khaimah, selecting high-grade materials (such as electrolytic copper, stainless steel 316L, and hot-dip galvanized steel) is paramount.

Key technical considerations include:
1. Risk Assessment (Part 2): Evaluating structural damage risks, loss of human life, and economic loss.
2. Physical Damage to Structures (Part 3): Calculating air termination protection angles, mesh sizes, and down conductor spacing.
3. Electrical Systems Protection (Part 4): Implementing coordinated Surge Protective Devices (SPDs) to prevent equipment failure.

Vision Energy International provides complete engineering support, material supply, and site installation for compliant lightning protection systems.`,
      category: "Technical Insights",
      tags: ["IEC 62305", "Lightning Protection", "UAE Standards"],
      status: ContentStatus.DRAFT,
      isPlaceholder: true,
      publishedAt: new Date("2026-02-15T00:00:00Z"),
      readingMinutes: 4,
      seoTitle: "IEC/BS EN 62305 Lightning Protection UAE | Vision Energy",
      seoDescription:
        "A technical overview of risk management, strike probability calculations, and structural protection requirements for UAE buildings.",
    },
    {
      slug: "importance-of-low-resistance-earthing",
      title: "The Critical Role of Low-Resistance Earthing in Industrial Safety",
      excerpt:
        "Why achieving an earth resistance under 10 ohms (or under 1 ohm for substations) is non-negotiable for system protection.",
      content: `An effective earthing (grounding) system is the backbone of electrical safety in any industrial or commercial facility. It serves two primary functions: providing a low-impedance path for fault currents and stabilizing system voltages during normal and transient conditions.

Soil resistivity in the UAE varies significantly between coastal saline regions and inland arid desert soil. Utilizing earth enhancement compounds (marconite, bentonite, low-resistance carbon gels) alongside molecular exothermic welding ensures long-term low resistance without degradation over time.

Vision Energy International supplies certified earthing materials including copper bonded earth rods, earth pits, lattice copper mats, and exothermic welding kits.`,
      category: "Engineering & Safety",
      tags: ["Earthing", "Grounding", "Electrical Safety"],
      status: ContentStatus.DRAFT,
      isPlaceholder: true,
      publishedAt: new Date("2026-03-01T00:00:00Z"),
      readingMinutes: 3,
      seoTitle: "Low-Resistance Earthing in Industrial Safety | Vision Energy",
      seoDescription: "Why achieving low earth resistance is non-negotiable for industrial system protection in the UAE.",
    },
    {
      slug: "ese-vs-conventional-lightning-protection",
      title: "Early Streamer Emission (ESE) vs Conventional Air Terminals: A Technical Comparison",
      excerpt:
        "Evaluating coverage radius, installation efficiency, and structural aesthetics when choosing between ESE and Franklin rod systems.",
      content: `When designing lightning protection for expansive open areas, sports arenas, or complex roof geometries, engineers often compare Early Streamer Emission (ESE) technology with traditional Franklin rod mesh networks.

- Conventional Systems (IEC 62305): Rely on Faraday cage principles, requiring multiple air rods, extensive roof tape routing, and frequent down conductors.
- ESE Technology (NF C 17-102 / UNE 21186): Utilizes an ionized streamer launch mechanism to capture strikes from a greater height, offering a substantially larger radius of protection (up to 107m depending on protection level).

Both technologies are backed by rigorous international testing. Vision Energy International assists consultants and contractors in selecting the optimal protection strategy based on structural geometry, site constraints, and local authority requirements.`,
      category: "Product Comparison",
      tags: ["ESE", "Franklin Rods", "Protection Systems"],
      status: ContentStatus.DRAFT,
      isPlaceholder: true,
      publishedAt: new Date("2026-03-10T00:00:00Z"),
      readingMinutes: 4,
      seoTitle: "ESE vs Conventional Lightning Protection | Vision Energy",
      seoDescription:
        "Evaluating coverage radius, installation efficiency, and structural aesthetics when choosing between ESE and Franklin rod systems.",
    },
  ];

  for (const post of blogPostsData) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        tags: post.tags,
        status: post.status,
        isPlaceholder: post.isPlaceholder,
        publishedAt: post.publishedAt,
        readingMinutes: post.readingMinutes,
        seoTitle: post.seoTitle,
        seoDescription: post.seoDescription,
      },
      create: {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        tags: post.tags,
        status: post.status,
        isPlaceholder: post.isPlaceholder,
        publishedAt: post.publishedAt,
        readingMinutes: post.readingMinutes,
        seoTitle: post.seoTitle,
        seoDescription: post.seoDescription,
      },
    });
  }
  console.log(`Seeded ${blogPostsData.length} blog posts (upsert).`);
  console.log("Database seeding completed successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
