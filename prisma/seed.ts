import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Vision Energy database with official category data...');

  // 1. Seed Services
  await prisma.service.deleteMany();
  
  const services = [
    {
      slug: 'external-lightning-protection-installation',
      title: 'External Lightning Protection Installation',
      summary: 'Complete structural lightning protection system design, supply, and installation compliant with IEC/BS EN 62305 standards.',
      content: 'Vision Energy International delivers end-to-end external lightning protection installation across the UAE. Our engineering team ensures full compliance with international safety codes (IEC/BS EN 62305 and NFC 17-102). We provide both Conventional Franklin rod air terminal networks and Early Streamer Emission (ESE) technologies tailored for commercial towers, industrial plants, substations, and residential developments.',
      whatsIncluded: JSON.stringify([
        'Franklin Air Rods & ESE System Installation',
        'Down Conductor Routing & Heavy-Duty Fastening',
        'Test Joint & Inspection Pit Assembly',
        'Earth Termination Network Connection',
        'Integrity & Continuity Testing',
        'As-Built Documentation & Compliance Certification'
      ]),
      processSteps: JSON.stringify([
        'Initial Site Survey & Technical Risk Assessment',
        'System Design, Standard Selection & BOQ Preparation',
        'Structural Installation & Non-Invasive Fixings',
        'Earthing Grid Integration & Exothermic Connections',
        'Commissioning, Resistance Testing & Handover'
      ]),
      published: true
    },
    {
      slug: 'manpower-supply',
      title: 'Specialist Engineering Manpower Supply',
      summary: 'Certified electrical, mechanical, and solar technicians, site engineers, and installers for project execution across UAE.',
      content: 'Vision Energy International provides highly skilled, site-tested engineering personnel for short-term and long-term project deployments across Abu Dhabi, Dubai, Ras Al Khaimah, and the Northern Emirates. Our personnel undergo rigorous technical and HSE safety evaluations before site placement.',
      whatsIncluded: JSON.stringify([
        'Certified High & Low Voltage Electricians',
        'Lightning Protection & Earthing System Specialists',
        'Solar PV & Renewable Energy Technicians',
        'Mechanical & HVAC Maintenance Technicians',
        'HSE Compliant Site Supervisors & QA/QC Officers'
      ]),
      processSteps: JSON.stringify([
        'Project Scope & Technical Skill Requirement Evaluation',
        'Candidate Trade Testing & HSE Certification Verification',
        'Mobilisation, Site Induction & Tooling Provision',
        'Dedicated On-Site Supervisory Support & Performance Audits'
      ]),
      published: true
    },
    {
      slug: 'earthing-and-grounding',
      title: 'Earthing & Grounding System Design & Installation',
      summary: 'Low-resistance earthing grids, chemical earth enhancement, and deep well earth electrodes for industrial facilities.',
      content: 'Scope and client confirmation in progress. Low-impedance earthing networks are essential for personnel safety and fault-current dissipation.',
      whatsIncluded: JSON.stringify([
        'Earth Resistance Testing & Soil Resistivity Analysis',
        'Copper Bonded & Pure Copper Earth Rod Installation',
        'Exothermic Welding & Permanent Molecular Connections',
        'Earth Inspection Pits & Disconnecting Link Setup'
      ]),
      processSteps: JSON.stringify([
        'Soil Resistivity Survey',
        'Grid Simulation & BOQ Design',
        'Electrode Installation & Soil Backfill',
        'Exothermic Jointing & Final Resistance Certification'
      ]),
      published: false
    },
    {
      slug: 'surge-protection-and-bonding',
      title: 'Surge Protection Devices (SPD) & Equipotential Bonding',
      summary: 'Type 1, Type 2, and Type 3 surge arrester installation and equipotential bonding for sensitive electrical/electronic equipment.',
      content: 'Scope and client confirmation in progress. Protection against transient overvoltages induced by lightning strikes and power switching operations.',
      whatsIncluded: JSON.stringify([
        'Main Distribution Board (MDB) Type 1+2 SPD Fitting',
        'Sub-Distribution Board (SMDB/DB) Type 2 SPD Fitting',
        'Telecom & Data Line Surge Protection',
        'Main Equipotential Bonding Bar (MEBB) Interconnection'
      ]),
      processSteps: JSON.stringify([
        'Transient Overvoltage Risk Analysis',
        'SPD Rating & Coordinated Placement',
        'Low-Impedance Wiring & Fuse Integration',
        'System Commissioning & Diagnostic Audit'
      ]),
      published: false
    }
  ];

  for (const s of services) {
    await prisma.service.create({ data: s });
  }
  console.log(`Seeded ${services.length} services.`);

  // 2. Seed Official Product Categories
  await prisma.productCategory.deleteMany();

  await prisma.productCategory.create({
    data: {
      code: "LP-01",
      slug: "conventional-lightning-protection-systems",
      groupPrefix: "LP",
      title: "Conventional Lightning Protection Systems",
      description: "Complete conventional lightning protection systems for buildings, industrial facilities and infrastructure, designed around air terminals, roof conductors, down conductors, test points and earth termination networks. Components can be supplied in copper, aluminium, galvanised steel and stainless steel to suit the installation environment.",
      families: "Franklin air terminals; air rods; roof conductor tape; conductor clips; test joints; bimetallic connectors; inspection pits; mounting bases",
      image: null,
      sortOrder: 1
    }
  });
  await prisma.productCategory.create({
    data: {
      code: "LP-02",
      slug: "early-streamer-emission-lightning-protection-systems",
      groupPrefix: "LP",
      title: "Early Streamer Emission (ESE) Lightning Protection Systems",
      description: "Early Streamer Emission lightning protection solutions for specified projects requiring an ESE air terminal, mast, dedicated down conductor and engineered earthing arrangement. System selection, protection radius and installation details should be coordinated with the applicable project standard and manufacturer documentation.",
      families: "ESE terminals; lightning event counters; test equipment; support masts; guy-wire kits; copper and stainless-steel accessories",
      image: null,
      sortOrder: 2
    }
  });
  // TODO Review Note: Catalogue uses the same image as ER-04. Replace with a distinct image.
  await prisma.productCategory.create({
    data: {
      code: "LP-03",
      slug: "lightning-protection-clamps-fixings-and-accessories",
      groupPrefix: "LP",
      title: "Lightning Protection Clamps, Fixings and Accessories",
      description: "Specialist connection and fixing accessories for lightning protection conductors, air terminals and earth electrodes. Available for copper, aluminium, galvanised steel and stainless-steel conductors, with project-specific sizes and mounting arrangements.",
      families: "Tape clamps; cable clamps; roof conductor holders; cross connectors; tee connectors; bimetallic joints; saddles; fasteners",
      image: null,
      sortOrder: 3
    }
  });
  await prisma.productCategory.create({
    data: {
      code: "LP-04",
      slug: "down-conductors-earthing-tapes-and-conductors",
      groupPrefix: "LP",
      title: "Down Conductors, Earthing Tapes and Conductors",
      description: "Down conductor and earthing conductor products for carrying lightning current and fault current safely to the earth termination system. Offered as solid, stranded and braided conductors, copper tape, tinned copper tape, aluminium tape, galvanised steel strip and insulated green-yellow earth cable.",
      families: "Bare copper conductor; stranded copper cable; copper tape; tinned copper braid; aluminium tape; GI strip; PVC insulated earth cable",
      image: null,
      sortOrder: 4
    }
  });
  await prisma.productCategory.create({
    data: {
      code: "ER-01",
      slug: "earthing-enhancement-materials",
      groupPrefix: "ER",
      title: "Earthing Enhancement Materials",
      description: "Engineered earth enhancement materials for improving soil conductivity and supporting stable earth resistance in difficult soil conditions. Products are selected according to soil resistivity, installation method, environmental conditions and project requirements.",
      families: "Conductive backfill; bentonite; earth enhancement compound; conductive concrete; chemical earth electrode compounds; installation tools",
      image: null,
      sortOrder: 5
    }
  });
  await prisma.productCategory.create({
    data: {
      code: "ER-02",
      slug: "exothermic-welding-systems",
      groupPrefix: "ER",
      title: "Exothermic Welding Systems",
      description: "Exothermic welding materials and tools for permanent, high-integrity electrical connections between copper conductors, earthing tapes, ground rods and steel reinforcement. Suitable joint design and manufacturer instructions are essential for safe installation.",
      families: "Graphite moulds; weld metal charges; mould handles; ignition accessories; cable-to-cable connections; cable-to-rod connections",
      image: null,
      sortOrder: 6
    }
  });
  await prisma.productCategory.create({
    data: {
      code: "ER-03",
      slug: "earth-bars-and-disconnecting-links",
      groupPrefix: "ER",
      title: "Earth Bars and Disconnecting Links",
      description: "Customisable earth bars, earthing terminals and disconnecting links for inspection, testing and reliable bonding of electrical and lightning protection systems. Manufactured to suit connection count, conductor size, mounting position and material requirements.",
      families: "Copper earth bars; tinned copper bars; stainless-steel earth bars; single disconnecting links; double disconnecting links; test links; braided bonds",
      image: null,
      sortOrder: 7
    }
  });
  // TODO Review Note: Catalogue uses the same image as LP-03. Replace with a distinct image.
  await prisma.productCategory.create({
    data: {
      code: "ER-04",
      slug: "earth-electrode-and-bonding-accessories",
      groupPrefix: "ER",
      title: "Earth Electrode and Bonding Accessories",
      description: "Earth electrode accessories, conductor clamps and bonding connections for completing grounding and lightning protection installations. Material compatibility is considered to help manage corrosion risk at dissimilar-metal interfaces.",
      families: "Earth rod clamps; tape-to-tape clamps; cable-to-tape clamps; rod couplers; inspection joints; bonding clamps; bimetallic connectors",
      image: null,
      sortOrder: 8
    }
  });
  await prisma.productCategory.create({
    data: {
      code: "LT-01",
      slug: "aviation-helipad-and-marine-lighting",
      groupPrefix: "LT",
      title: "Aviation, Helipad and Marine Lighting",
      description: "Special-purpose lighting and visual guidance equipment for aviation, helipad, marine and offshore applications. Product selection can be tailored for obstruction marking, navigation guidance, helipad perimeter lighting and marine signalling requirements.",
      families: "Obstacle lights; helipad lights; marine navigation lights; warning beacons; inset lights; LED signal lights; control boxes",
      image: null,
      sortOrder: 9
    }
  });
  // TODO Review Note: Streetlights also listed in LT-03.
  await prisma.productCategory.create({
    data: {
      code: "LT-02",
      slug: "led-light-fixtures-and-luminaires",
      groupPrefix: "LT",
      title: "LED Light Fixtures and Luminaires",
      description: "Energy-efficient LED luminaires for commercial, industrial, architectural and outdoor lighting applications. The range includes indoor, outdoor and specialty fixtures with selectable wattage, colour temperature, beam angle and mounting options.",
      families: "LED floodlights; high-bay lights; panel lights; linear lights; downlights; streetlights; wall lights; weatherproof fittings",
      image: null,
      sortOrder: 10
    }
  });
  // TODO Review Note: Solar streetlights also listed in EN-02. Avoid duplicate content on the website.
  await prisma.productCategory.create({
    data: {
      code: "LT-03",
      slug: "streetlights-high-masts-and-flagpoles",
      groupPrefix: "LT",
      title: "Streetlights, High Masts and Flagpoles",
      description: "Street lighting poles, high-mast lighting structures, decorative poles and flagpoles for municipal, commercial and infrastructure projects. Supply can include brackets, base plates, anchor bolts, foundation accessories and solar lighting configurations.",
      families: "Streetlight poles; high-mast poles; solar streetlights; decorative poles; CCTV poles; flagpoles; base plates; anchor bolt assemblies",
      image: null,
      sortOrder: 11
    }
  });
  await prisma.productCategory.create({
    data: {
      code: "LT-04",
      slug: "signal-beacons-and-tower-lights",
      groupPrefix: "LT",
      title: "Signal Beacons and Tower Lights",
      description: "Industrial signalling lights, stack lights, beacons and audible-visual warning devices for equipment status indication, process control and safety communication.",
      families: "LED stack lights; rotating beacons; flashing beacons; signal towers; siren beacons; traffic signals; machine-status indicators",
      image: null,
      sortOrder: 12
    }
  });
  await prisma.productCategory.create({
    data: {
      code: "CM-01",
      slug: "cable-management-systems-and-cable-trays",
      groupPrefix: "CM",
      title: "Cable Management Systems and Cable Trays",
      description: "Cable tray, cable ladder and cable containment systems for routing, supporting and protecting power, control, instrumentation and data cables. Available with bends, tees, reducers, covers, supports and project-matched finishes.",
      families: "Cable ladder; perforated tray; wire-mesh tray; trunking; tray bends; tees; reducers; tray covers; support channels",
      image: null,
      sortOrder: 13
    }
  });
  await prisma.productCategory.create({
    data: {
      code: "CM-02",
      slug: "cable-cleats-and-cable-supports",
      groupPrefix: "CM",
      title: "Cable Cleats and Cable Supports",
      description: "Cable cleats and support systems for secure cable retention in industrial, utility and infrastructure installations. Designs are available for single-core, multicore and trefoil formations, with material and fixing options selected for the duty and installation environment.",
      families: "Single cable cleats; trefoil cleats; multicore cleats; stainless-steel cleats; aluminium cleats; polymer cleats; cable clamps; support brackets",
      image: null,
      sortOrder: 14
    }
  });
  // TODO Review Note: Cable markers and glands also listed in CM-04 and CB-04.
  await prisma.productCategory.create({
    data: {
      code: "CM-03",
      slug: "cable-ties-heat-sleeves-and-cable-management-accessories",
      groupPrefix: "CM",
      title: "Cable Ties, Heat Sleeves and Cable Management Accessories",
      description: "Cable management accessories for bundling, protecting, routing and finishing electrical installations. Suitable product types can be selected for indoor, outdoor, UV-exposed, high-temperature and industrial-duty applications.",
      families: "Nylon cable ties; stainless-steel cable ties; heat-shrink sleeves; spiral wrap; split conduit; cable markers; cable glands; cable clips",
      image: null,
      sortOrder: 15
    }
  });
  // TODO Review Note: Overlaps ID-01 (cable markers and tags). Client to decide whether to merge.
  await prisma.productCategory.create({
    data: {
      code: "CM-04",
      slug: "cable-identification-tags-and-markers",
      groupPrefix: "CM",
      title: "Cable Identification Tags and Markers",
      description: "Cable identification systems for clear, durable labelling of cables, wires, terminals, panels and equipment. Solutions can be supplied for printed, engraved, heat-shrink, clip-on and stainless-steel identification requirements.",
      families: "Cable tags; stainless-steel markers; heat-shrink markers; clip-on markers; terminal markers; legend plates; marker carriers",
      image: null,
      sortOrder: 16
    }
  });
  await prisma.productCategory.create({
    data: {
      code: "CB-01",
      slug: "industrial-power-control-and-instrumentation-cables",
      groupPrefix: "CB",
      title: "Industrial Power, Control and Instrumentation Cables",
      description: "Industrial cable range for power distribution, control, instrumentation, communication and specialised applications. Configurations can include copper or aluminium conductors, PVC, XLPE, LSZH, EPR or other specified insulation and sheath systems.",
      families: "Single-core cable; multicore power cable; control cable; instrumentation cable; screened cable; armoured cable; fire-resistant cable; LSZH cable",
      image: null,
      sortOrder: 17
    }
  });
  await prisma.productCategory.create({
    data: {
      code: "CB-02",
      slug: "fibre-optic-cables-patch-cords-and-connectivity",
      groupPrefix: "CB",
      title: "Fibre Optic Cables, Patch Cords and Connectivity",
      description: "Optical fibre connectivity products for telecommunications, data networks, security, industrial automation and fibre-to-the-premises infrastructure. Offered in single-mode and multimode options with indoor, outdoor, armoured and ruggedised constructions.",
      families: "Single-mode fibre; multimode fibre; FTTH drop cable; armoured fibre cable; patch cords; pigtails; LC connectors; SC connectors; fibre termination boxes",
      image: null,
      sortOrder: 18
    }
  });
  await prisma.productCategory.create({
    data: {
      code: "CB-03",
      slug: "cable-terminations-and-jointing-kits",
      groupPrefix: "CB",
      title: "Cable Terminations and Jointing Kits",
      description: "Cable jointing and termination systems for low-voltage and medium-voltage cable installations. Product selection is matched to cable construction, voltage class, conductor material, shielding arrangement and indoor or outdoor installation conditions.",
      families: "Heat-shrink terminations; cold-shrink terminations; straight-through joints; transition joints; screened cable accessories; stress-control components; breakout boots",
      image: null,
      sortOrder: 19
    }
  });
  await prisma.productCategory.create({
    data: {
      code: "CB-04",
      slug: "cable-glands-lugs-and-connectors",
      groupPrefix: "CB",
      title: "Cable Glands, Lugs and Connectors",
      description: "Cable entry, termination and connection accessories for safe, orderly electrical installations. Available in brass, nickel-plated brass, stainless steel, aluminium and polyamide, with compatible lugs, ferrules, washers and accessories.",
      families: "Armoured cable glands; non-armoured glands; EMC glands; brass glands; cable lugs; bi-metallic lugs; copper lugs; ferrules; reducers",
      image: null,
      sortOrder: 20
    }
  });
  await prisma.productCategory.create({
    data: {
      code: "CT-01",
      slug: "rigid-gi-and-stainless-steel-conduit-systems",
      groupPrefix: "CT",
      title: "Rigid GI and Stainless-Steel Conduit Systems",
      description: "Rigid galvanised steel and stainless-steel conduit systems for mechanical protection of electrical wiring in commercial, industrial and demanding environments. Matching fittings support threaded, coupled and adaptable routing arrangements.",
      families: "GI conduit; stainless-steel conduit; threaded elbows; couplers; unions; inspection tees; junction boxes; locknuts; saddles",
      image: null,
      sortOrder: 21
    }
  });
  await prisma.productCategory.create({
    data: {
      code: "CT-02",
      slug: "pvc-conduit-and-trunking-systems",
      groupPrefix: "CT",
      title: "PVC Conduit and Trunking Systems",
      description: "PVC conduit, flexible conduit, trunking and accessory systems for electrical cable containment in building and light-industrial installations. Available in multiple diameters, profiles and colour options with compatible boxes and fittings.",
      families: "PVC conduit; corrugated PVC conduit; PVC trunking; elbows; couplers; junction boxes; adaptable boxes; conduit clips; cable ducting",
      image: null,
      sortOrder: 22
    }
  });
  await prisma.productCategory.create({
    data: {
      code: "CT-03",
      slug: "flexible-conduit-systems",
      groupPrefix: "CT",
      title: "Flexible Conduit Systems",
      description: "Flexible metallic and non-metallic conduit systems for cable protection where vibration, movement, tight routing or mechanical flexibility is required. Accessories are selected to provide secure entries and appropriate environmental sealing.",
      families: "Liquid-tight flexible conduit; PVC-coated conduit; galvanized flexible conduit; conduit glands; connectors; elbows; flexible junction boxes",
      image: null,
      sortOrder: 23
    }
  });
  await prisma.productCategory.create({
    data: {
      code: "EL-01",
      slug: "electrical-switches-and-wiring-accessories",
      groupPrefix: "EL",
      title: "Electrical Switches and Wiring Accessories",
      description: "Electrical switches, socket outlets, dimmers, isolating switches, mounting boxes and wiring accessories for residential, commercial and industrial installations. Available in conventional, weatherproof and modular ranges.",
      families: "Light switches; socket outlets; USB outlets; dimmers; fan regulators; weatherproof sockets; surface boxes; flush boxes; terminal blocks",
      image: null,
      sortOrder: 24
    }
  });
  await prisma.productCategory.create({
    data: {
      code: "EL-02",
      slug: "electrical-isolators-and-disconnect-switches",
      groupPrefix: "EL",
      title: "Electrical Isolators and Disconnect Switches",
      description: "Isolators and disconnect switches for safe circuit separation, maintenance isolation and local equipment control. Available in enclosed, rotary, load-break, switch-fuse and lockable configurations, subject to the required electrical rating.",
      families: "Rotary isolators; load-break switches; switch disconnectors; enclosed isolators; lockable isolators; changeover switches; switch-fuse units",
      image: null,
      sortOrder: 25
    }
  });
  // TODO Review Note: Overlaps EL-05 (contactors, relays, timers, terminal blocks). Client to decide whether to merge.
  await prisma.productCategory.create({
    data: {
      code: "EL-03",
      slug: "control-panel-components",
      groupPrefix: "EL",
      title: "Control Panel Components",
      description: "Control-panel components for panel builders, machine control and industrial automation. Supply can include DIN-rail equipment, terminals, pushbuttons, pilot lights, relays, timers, cable ducting and panel accessories.",
      families: "Terminal blocks; contactors; relays; timers; pushbuttons; selector switches; pilot lamps; DIN rail; cable duct; panel meters",
      image: null,
      sortOrder: 26
    }
  });
  await prisma.productCategory.create({
    data: {
      code: "EL-04",
      slug: "industrial-plugs-sockets-and-connectors",
      groupPrefix: "EL",
      title: "Industrial Plugs, Sockets and Connectors",
      description: "Industrial plugs, sockets, couplers and interlocked socket outlets for dependable power connections in construction, manufacturing, events and utility environments. Options include different pin configurations, voltages, currents and ingress-protection levels.",
      families: "IEC 60309 plugs; industrial sockets; couplers; panel sockets; interlocked sockets; extension leads; cable connectors; IP-rated outlets",
      image: null,
      sortOrder: 27
    }
  });
  // TODO Review Note: Overlaps EL-03 (contactors, relays, timers, terminal blocks). Client to decide whether to merge.
  await prisma.productCategory.create({
    data: {
      code: "EL-05",
      slug: "electrical-protection-and-control-components",
      groupPrefix: "EL",
      title: "Electrical Protection and Control Components",
      description: "Protection and control components for electrical distribution and machinery, including fuses, relay products, current transformers, monitoring devices and terminal systems. Final product selection is based on the electrical design and applicable standards.",
      families: "Fuses; fuse holders; current transformers; monitoring relays; timers; terminal blocks; control relays; contactors; overload protection",
      image: null,
      sortOrder: 28
    }
  });
  await prisma.productCategory.create({
    data: {
      code: "EL-06",
      slug: "surge-protection-devices",
      groupPrefix: "EL",
      title: "Surge Protection Devices",
      description: "Surge protection devices for safeguarding power, data and control circuits from transient overvoltages caused by lightning activity and switching events. Selection is coordinated with the system voltage, network arrangement and protection zone concept.",
      families: "Type 1 SPD; Type 2 SPD; Type 3 SPD; DC surge protection; data-line surge protection; coaxial SPD; photovoltaic SPD; lightning arresters",
      image: null,
      sortOrder: 29
    }
  });
  await prisma.productCategory.create({
    data: {
      code: "EL-07",
      slug: "electrical-transformers",
      groupPrefix: "EL",
      title: "Electrical Transformers",
      description: "Electrical transformers for voltage transformation, isolation, control, metering and industrial power applications. Product selection can include oil-filled, dry-type, control, isolation, current and voltage transformer solutions.",
      families: "Distribution transformers; dry-type transformers; isolation transformers; control transformers; current transformers; voltage transformers; toroidal transformers",
      image: null,
      sortOrder: 30
    }
  });
  // TODO Review Note: Overlaps EL-09 (industrial sensors). Client to decide whether to merge.
  await prisma.productCategory.create({
    data: {
      code: "EL-08",
      slug: "industrial-automation-and-sensors",
      groupPrefix: "EL",
      title: "Industrial Automation and Sensors",
      description: "Industrial automation products for machine control, process monitoring and connected operations. The range can include PLCs, HMIs, drives, remote I/O, industrial networking products and field devices.",
      families: "PLCs; HMI panels; VFDs; remote I/O; industrial Ethernet; safety controllers; power supplies; automation modules",
      image: null,
      sortOrder: 31
    }
  });
  // TODO Review Note: Overlaps EL-08 (industrial sensors). Client to decide whether to merge.
  await prisma.productCategory.create({
    data: {
      code: "EL-09",
      slug: "industrial-sensors-encoders-and-connectors",
      groupPrefix: "EL",
      title: "Industrial Sensors, Encoders and Connectors",
      description: "Industrial sensing and connectivity products for position, speed, presence, temperature and process monitoring. Suitable product types are selected according to sensing principle, output, mounting, environmental rating and control system interface.",
      families: "Proximity sensors; photoelectric sensors; limit switches; encoders; M8 connectors; M12 connectors; industrial Ethernet connectors; diodes",
      image: null,
      sortOrder: 32
    }
  });
  await prisma.productCategory.create({
    data: {
      code: "EL-10",
      slug: "enclosures-and-junction-boxes",
      groupPrefix: "EL",
      title: "Enclosures and Junction Boxes",
      description: "Electrical enclosures, cabinets and junction boxes for housing, protecting and organising electrical and control equipment. Available in sheet steel, stainless steel, aluminium and engineering plastic, with indoor, outdoor and corrosion-resistant options.",
      families: "Wall-mount enclosures; floor-standing cabinets; junction boxes; terminal boxes; IP-rated enclosures; stainless-steel cabinets; viewing windows",
      image: null,
      sortOrder: 33
    }
  });
  await prisma.productCategory.create({
    data: {
      code: "EL-11",
      slug: "explosion-proof-equipment-and-accessories",
      groupPrefix: "EL",
      title: "Explosion-Proof Equipment and Accessories",
      description: "Explosion-protected electrical equipment for hazardous-area installations, including luminaires, junction boxes, control stations, glands and accessories. Selection must match the area classification, gas or dust group, temperature class and certification requirements.",
      families: "Ex lighting; Ex junction boxes; Ex control stations; Ex cable glands; Ex plugs and sockets; hazardous-area enclosures; Ex beacons",
      image: null,
      sortOrder: 34
    }
  });
  await prisma.productCategory.create({
    data: {
      code: "EL-12",
      slug: "industrial-stabilizers-filters-and-rectifiers",
      groupPrefix: "EL",
      title: "Industrial Stabilisers, Filters and Rectifiers",
      description: "Power-quality and power-conversion equipment for industrial electrical systems, including voltage stabilisers, harmonic filters, rectifiers, DC power supplies and related assemblies.",
      families: "Voltage stabilizers; servo stabilizers; harmonic filters; rectifiers; battery chargers; DC power systems; power-factor correction components",
      image: null,
      sortOrder: 35
    }
  });
  await prisma.productCategory.create({
    data: {
      code: "EN-01",
      slug: "solar-pv-components",
      groupPrefix: "EN",
      title: "Solar PV Components",
      description: "Solar photovoltaic balance-of-system components for commercial, industrial and off-grid installations. Solutions can include solar modules, inverters, combiner boxes, DC isolators, connectors, cables and mounting accessories.",
      families: "Solar PV modules; string inverters; combiner boxes; DC isolators; MC4 connectors; solar cable; mounting rails; fuses; SPDs",
      image: null,
      sortOrder: 36
    }
  });
  // TODO Review Note: Solar streetlights also listed in LT-03. Avoid duplicate content on the website.
  await prisma.productCategory.create({
    data: {
      code: "EN-02",
      slug: "solar-lighting-and-solar-water-heating",
      groupPrefix: "EN",
      title: "Solar Lighting and Solar Water Heating",
      description: "Solar-powered lighting and solar water-heating solutions for energy-efficient outdoor, residential and commercial applications. Systems can be selected for local solar conditions, autonomy requirements and load profile.",
      families: "Solar streetlights; solar garden lights; solar floodlights; solar water heaters; solar collectors; batteries; charge controllers",
      image: null,
      sortOrder: 37
    }
  });
  await prisma.productCategory.create({
    data: {
      code: "ME-01",
      slug: "ventilation-systems",
      groupPrefix: "ME",
      title: "Ventilation Systems",
      description: "Ventilation equipment for air movement, extraction, fresh-air supply and smoke-control support in commercial and industrial settings. Selection is based on airflow, static pressure, installation location, sound criteria and environmental conditions.",
      families: "Axial fans; centrifugal fans; inline fans; exhaust fans; roof ventilators; air grilles; duct accessories; fan speed controls",
      image: null,
      sortOrder: 38
    }
  });
  await prisma.productCategory.create({
    data: {
      code: "ME-02",
      slug: "hvac-and-refrigeration-components",
      groupPrefix: "ME",
      title: "HVAC and Refrigeration Components",
      description: "HVAC and refrigeration components for cooling, air-conditioning and cold-room systems. The range covers essential equipment and controls used in residential, commercial and industrial installations.",
      families: "Compressors; condensers; evaporators; fan motors; copper tubing; valves; filters; pressure gauges; refrigeration controls",
      image: null,
      sortOrder: 39
    }
  });
  await prisma.productCategory.create({
    data: {
      code: "ME-03",
      slug: "industrial-pumps-and-fluid-handling",
      groupPrefix: "ME",
      title: "Industrial Pumps and Fluid Handling",
      description: "Industrial pumps, valves and fluid-handling components for water, drainage, pressure boosting, process and transfer applications. Pump selection is determined by flow, head, fluid properties, materials and operating conditions.",
      families: "Centrifugal pumps; submersible pumps; vertical multistage pumps; booster sets; diaphragm pumps; valves; impellers; fittings",
      image: null,
      sortOrder: 40
    }
  });
  await prisma.productCategory.create({
    data: {
      code: "ME-04",
      slug: "industrial-air-compressors-and-pneumatic-systems",
      groupPrefix: "ME",
      title: "Industrial Air Compressors and Pneumatic Systems",
      description: "Compressed-air equipment and pneumatic system components for workshops, manufacturing and industrial operations. Complete packages can be configured with compressors, receivers, dryers, filters, regulators and distribution accessories.",
      families: "Screw compressors; piston compressors; air receivers; air dryers; FRL units; pressure gauges; pneumatic valves; hoses; fittings",
      image: null,
      sortOrder: 41
    }
  });
  await prisma.productCategory.create({
    data: {
      code: "ME-05",
      slug: "industrial-gauges-valves-and-fittings",
      groupPrefix: "ME",
      title: "Industrial Gauges, Valves and Fittings",
      description: "Industrial valves, gauges, fittings and instrumentation accessories for fluid, gas and pneumatic systems. Materials, pressure rating and connection type can be selected to suit the medium and service conditions.",
      families: "Ball valves; butterfly valves; gate valves; pressure gauges; safety valves; needle valves; stainless-steel fittings; brass fittings",
      image: null,
      sortOrder: 42
    }
  });
  await prisma.productCategory.create({
    data: {
      code: "ME-06",
      slug: "electric-water-heaters-and-accessories",
      groupPrefix: "ME",
      title: "Electric Water Heaters and Accessories",
      description: "Electric water heaters and associated safety, control and plumbing accessories for residential, commercial and light-industrial hot-water systems.",
      families: "Storage water heaters; instantaneous water heaters; heating elements; thermostats; safety valves; expansion vessels; flexible connectors",
      image: null,
      sortOrder: 43
    }
  });
  await prisma.productCategory.create({
    data: {
      code: "SG-01",
      slug: "cctv-and-security-products",
      groupPrefix: "SG",
      title: "CCTV and Security Products",
      description: "CCTV and security equipment for video surveillance, access monitoring and perimeter protection. Systems may include cameras, recorders, storage, monitors, power supplies, network switches and mounting accessories.",
      families: "IP cameras; dome cameras; PTZ cameras; NVRs; DVRs; CCTV monitors; PoE switches; access-control devices; brackets",
      image: null,
      sortOrder: 44
    }
  });
  await prisma.productCategory.create({
    data: {
      code: "SG-02",
      slug: "industrial-alarm-and-alert-systems",
      groupPrefix: "SG",
      title: "Industrial Alarm and Alert Systems",
      description: "Alarm, notification and emergency alert products for industrial, commercial and public-safety applications. System design can integrate audible, visual and voice notification equipment as required.",
      families: "Fire alarm sounders; strobe lights; manual call points; sirens; emergency call systems; evacuation indicators; warning horns",
      image: null,
      sortOrder: 45
    }
  });
  await prisma.productCategory.create({
    data: {
      code: "SG-03",
      slug: "fire-protection-equipment",
      groupPrefix: "SG",
      title: "Fire Protection Equipment",
      description: "Fire-protection equipment and accessories for first-response firefighting, hose systems and safety support. Supply selection should be coordinated with the approved fire strategy, local authority requirements and relevant standards.",
      families: "Fire extinguishers; hose reels; fire hoses; landing valves; hose cabinets; fire blankets; fire signs; firefighting accessories",
      image: null,
      sortOrder: 46
    }
  });
  await prisma.productCategory.create({
    data: {
      code: "SG-04",
      slug: "weather-monitoring-systems",
      groupPrefix: "SG",
      title: "Weather Monitoring Systems",
      description: "Weather monitoring instruments and stations for measuring wind, temperature, humidity, rainfall, solar radiation and other environmental parameters. Suitable for facilities, construction, agriculture, aviation and research applications.",
      families: "Weather stations; anemometers; wind vanes; rain gauges; temperature sensors; humidity sensors; data loggers; solar-powered telemetry",
      image: null,
      sortOrder: 47
    }
  });
  // TODO Review Note: Overlaps HW-02 (clamps, anchors, threaded rods, channel brackets). Client to decide whether to merge.
  await prisma.productCategory.create({
    data: {
      code: "HW-01",
      slug: "hardware-accessories-and-fasteners",
      groupPrefix: "HW",
      title: "Hardware Accessories and Fasteners",
      description: "Hardware accessories and fasteners for construction, electrical, mechanical and support-system installations. Materials and finishes can be selected for corrosion resistance, loading and environmental suitability.",
      families: "Bolts; nuts; washers; threaded rods; anchors; screws; channel nuts; brackets; U-bolts; clamps",
      image: null,
      sortOrder: 48
    }
  });
  // TODO Review Note: Overlaps HW-01 (clamps, anchors, threaded rods, channel brackets). Client to decide whether to merge.
  await prisma.productCategory.create({
    data: {
      code: "HW-02",
      slug: "heavy-duty-clamps-and-cable-tray-supports",
      groupPrefix: "HW",
      title: "Heavy-Duty Clamps and Cable Tray Supports",
      description: "Heavy-duty pipe clamps, channel supports, threaded-rod systems and cable-tray support accessories for industrial and building-services installations.",
      families: "Pipe clamps; rubber-lined clamps; trapeze supports; strut channels; cantilever arms; threaded rods; anchors; channel brackets",
      image: null,
      sortOrder: 49
    }
  });
  await prisma.productCategory.create({
    data: {
      code: "HW-03",
      slug: "tools-and-equipment",
      groupPrefix: "HW",
      title: "Tools and Equipment",
      description: "Professional electrical, mechanical and installation tools for site work, maintenance and project execution.",
      families: "Insulated hand tools; crimping tools; cable cutters; measuring instruments; power tools; cable rollers; tool kits; test equipment",
      image: null,
      sortOrder: 50
    }
  });
  await prisma.productCategory.create({
    data: {
      code: "HW-04",
      slug: "professional-welding-machines-and-accessories",
      groupPrefix: "HW",
      title: "Professional Welding Machines and Accessories",
      description: "Professional welding equipment and consumables for fabrication, maintenance and site works. Products can be supplied for MIG, TIG, MMA and cutting applications, with compatible consumables and safety accessories.",
      families: "MIG welders; TIG welders; MMA welders; welding torches; electrodes; filler wire; welding cables; helmets; gloves",
      image: null,
      sortOrder: 51
    }
  });
  await prisma.productCategory.create({
    data: {
      code: "HW-05",
      slug: "constant-force-springs-and-mechanical-components",
      groupPrefix: "HW",
      title: "Constant-Force Springs and Mechanical Components",
      description: "Constant-force springs and precision mechanical components for controlled motion, retracting mechanisms, counterbalance systems and specialised equipment.",
      families: "Constant-force springs; spring reels; retractors; pulleys; tension springs; extension springs; mounting brackets; custom assemblies",
      image: null,
      sortOrder: 52
    }
  });
  await prisma.productCategory.create({
    data: {
      code: "EN-03",
      slug: "industrial-generator-equipment",
      groupPrefix: "EN",
      title: "Industrial Generator Equipment",
      description: "Generator sets, alternators, control panels and auxiliary equipment for standby, prime and industrial power-generation applications. System configuration depends on load demand, fuel type, duty rating and site conditions.",
      families: "Diesel generators; gas generators; alternators; automatic transfer switches; generator control panels; fuel tanks; battery chargers; exhaust systems",
      image: null,
      sortOrder: 53
    }
  });
  await prisma.productCategory.create({
    data: {
      code: "SF-01",
      slug: "safety-marking-warning-tapes-and-traffic-equipment",
      groupPrefix: "SF",
      title: "Safety Marking, Warning Tapes and Traffic Equipment",
      description: "Safety marking products for clearly identifying hazards, underground services, restricted areas and temporary work zones.",
      families: "Warning tape; detectable tape; barricade tape; floor marking tape; traffic cones; delineators; reflective markers; cable route markers",
      image: null,
      sortOrder: 54
    }
  });
  await prisma.productCategory.create({
    data: {
      code: "SF-02",
      slug: "industrial-personal-protective-equipment-ppe",
      groupPrefix: "SF",
      title: "Industrial Personal Protective Equipment (PPE)",
      description: "Personal protective equipment for site, industrial and maintenance work. Product choice should be based on a task-specific risk assessment and applicable safety requirements.",
      families: "Safety helmets; safety shoes; gloves; eye protection; hearing protection; high-visibility wear; fall-arrest harnesses; respiratory protection",
      image: null,
      sortOrder: 55
    }
  });
  await prisma.productCategory.create({
    data: {
      code: "PK-01",
      slug: "industrial-packaging-supplies",
      groupPrefix: "PK",
      title: "Industrial Packaging Supplies",
      description: "Industrial packaging supplies for protecting, securing and dispatching goods, equipment and project materials.",
      families: "Stretch film; bubble wrap; foam sheets; corrugated cartons; packing tape; strapping; edge protectors; pallet-wrap accessories",
      image: null,
      sortOrder: 56
    }
  });
  // TODO Review Note: Overlaps CM-04 (cable markers and tags). Client to decide whether to merge.
  await prisma.productCategory.create({
    data: {
      code: "ID-01",
      slug: "engraved-plates-and-equipment-identification",
      groupPrefix: "ID",
      title: "Engraved Plates and Equipment Identification",
      description: "Custom engraved plates, cable tags, warning labels and equipment identification solutions for electrical, industrial and safety applications. Manufactured to suit required material, size, fixing method, text and project format.",
      families: "Engraved labels; stainless-steel plates; aluminium tags; traffolyte labels; cable markers; danger signs; asset tags; equipment nameplates",
      image: null,
      sortOrder: 57
    }
  });

  console.log('Seeded 57 official product categories.');

  // 3. Seed Blog Posts
  await prisma.blogPost.deleteMany();

  const blogPosts = [
    {
      slug: 'lightning-protection-standards-uae',
      title: 'Understanding IEC/BS EN 62305 Lightning Protection Standards in the UAE',
      excerpt: 'A technical overview of risk management, strike probability calculations, and structural protection requirements for UAE buildings.',
      content: `Lightning protection in the United Arab Emirates requires strict adherence to international safety codes, primarily IEC/BS EN 62305 and NF C 17-102. Given the high-rise architectural landscape and harsh coastal environmental conditions in emirates like Dubai, Abu Dhabi, and Ras Al Khaimah, selecting high-grade materials (such as electrolytic copper, stainless steel 316L, and hot-dip galvanized steel) is paramount.

Key technical considerations include:
1. Risk Assessment (Part 2): Evaluating structural damage risks, loss of human life, and economic loss.
2. Physical Damage to Structures (Part 3): Calculating air termination protection angles, mesh sizes, and down conductor spacing.
3. Electrical Systems Protection (Part 4): Implementing coordinated Surge Protective Devices (SPDs) to prevent equipment failure.

Vision Energy International provides complete engineering support, material supply, and site installation for compliant lightning protection systems.`,
      author: 'Vision Energy Technical Team',
      category: 'Technical Insights',
      published: true,
      publishedAt: new Date('2026-02-15')
    },
    {
      slug: 'importance-of-low-resistance-earthing',
      title: 'The Critical Role of Low-Resistance Earthing in Industrial Safety',
      excerpt: 'Why achieving an earth resistance under 10 ohms (or under 1 ohm for substations) is non-negotiable for system protection.',
      content: `An effective earthing (grounding) system is the backbone of electrical safety in any industrial or commercial facility. It serves two primary functions: providing a low-impedance path for fault currents and stabilizing system voltages during normal and transient conditions.

Soil resistivity in the UAE varies significantly between coastal saline regions and inland arid desert soil. Utilizing earth enhancement compounds (marconite, bentonite, low-resistance carbon gels) alongside molecular exothermic welding ensures long-term low resistance without degradation over time.

Vision Energy International supplies certified earthing materials including copper bonded earth rods, earth pits, lattice copper mats, and exothermic welding kits.`,
      author: 'Vision Energy Technical Team',
      category: 'Engineering & Safety',
      published: true,
      publishedAt: new Date('2026-03-01')
    },
    {
      slug: 'ese-vs-conventional-lightning-protection',
      title: 'Early Streamer Emission (ESE) vs Conventional Air Terminals: A Technical Comparison',
      excerpt: 'Evaluating coverage radius, installation efficiency, and structural aesthetics when choosing between ESE and Franklin rod systems.',
      content: `When designing lightning protection for expansive open areas, sports arenas, or complex roof geometries, engineers often compare Early Streamer Emission (ESE) technology with traditional Franklin rod mesh networks.

- Conventional Systems (IEC 62305): Rely on Faraday cage principles, requiring multiple air rods, extensive roof tape routing, and frequent down conductors.
- ESE Technology (NF C 17-102 / UNE 21186): Utilizes an ionized streamer launch mechanism to capture strikes from a greater height, offering a substantially larger radius of protection (up to 107m depending on protection level).

Both technologies are backed by rigorous international testing. Vision Energy International assists consultants and contractors in selecting the optimal protection strategy based on structural geometry, site constraints, and local authority requirements.`,
      author: 'Vision Energy Technical Team',
      category: 'Product Comparison',
      published: true,
      publishedAt: new Date('2026-03-10')
    }
  ];

  for (const post of blogPosts) {
    await prisma.blogPost.create({ data: post });
  }

  console.log(`Seeded ${blogPosts.length} blog posts.`);
  console.log('Database seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
