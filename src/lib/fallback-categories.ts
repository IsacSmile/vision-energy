export interface FallbackCategory {
  code: string;
  slug: string;
  groupPrefix: string;
  sortOrder: number;
  title: string;
  description: string;
  families: string;
}

export const FALLBACK_CATEGORIES: FallbackCategory[] = [
  {
    code: "LP-01",
    slug: "conventional-lightning-protection-systems",
    groupPrefix: "LP",
    sortOrder: 1,
    title: "Conventional Lightning Protection Systems",
    description: "Complete conventional lightning protection systems for buildings, industrial facilities and infrastructure, designed around air terminals, roof conductors, down conductors, test points and earth termination networks.",
    families: "Franklin air terminals; air rods; roof conductor tape; conductor clips; test joints; bimetallic connectors; inspection pits; mounting bases"
  },
  {
    code: "LP-02",
    slug: "early-streamer-emission-lightning-protection-systems",
    groupPrefix: "LP",
    sortOrder: 2,
    title: "Early Streamer Emission (ESE) Lightning Protection Systems",
    description: "Early Streamer Emission lightning protection solutions for specified projects requiring an ESE air terminal, mast, dedicated down conductor and engineered earthing arrangement.",
    families: "ESE terminals; lightning event counters; test equipment; support masts; guy-wire kits; copper and stainless-steel accessories"
  },
  {
    code: "LP-03",
    slug: "lightning-protection-clamps-fixings-and-accessories",
    groupPrefix: "LP",
    sortOrder: 3,
    title: "Lightning Protection Clamps, Fixings and Accessories",
    description: "Specialist connection and fixing accessories for lightning protection conductors, air terminals and earth electrodes.",
    families: "Tape clamps; cable clamps; roof conductor holders; cross connectors; tee connectors; bimetallic joints; saddles; fasteners"
  },
  {
    code: "LP-04",
    slug: "down-conductors-earthing-tapes-and-conductors",
    groupPrefix: "LP",
    sortOrder: 4,
    title: "Down Conductors, Earthing Tapes and Conductors",
    description: "Down conductor and earthing conductor products for carrying lightning current and fault current safely to the earth termination system.",
    families: "Bare copper conductor; stranded copper cable; copper tape; tinned copper braid; aluminium tape; GI strip; PVC insulated earth cable"
  },
  {
    code: "ER-01",
    slug: "earthing-enhancement-materials",
    groupPrefix: "ER",
    sortOrder: 5,
    title: "Earthing Enhancement Materials",
    description: "Engineered earth enhancement materials for improving soil conductivity and supporting stable earth resistance in difficult soil conditions.",
    families: "Conductive backfill; bentonite; earth enhancement compound; conductive concrete; chemical earth electrode compounds; installation tools"
  },
  {
    code: "ER-02",
    slug: "exothermic-welding-systems",
    groupPrefix: "ER",
    sortOrder: 6,
    title: "Exothermic Welding Systems",
    description: "Exothermic welding materials and tools for permanent, high-integrity electrical connections between copper conductors, earthing tapes, ground rods and steel reinforcement.",
    families: "Graphite moulds; weld metal charges; mould handles; ignition accessories; cable-to-cable connections; cable-to-rod connections"
  },
  {
    code: "ER-03",
    slug: "earth-bars-and-disconnecting-links",
    groupPrefix: "ER",
    sortOrder: 7,
    title: "Earth Bars and Disconnecting Links",
    description: "Customisable earth bars, earthing terminals and disconnecting links for inspection, testing and reliable bonding of electrical and lightning protection systems.",
    families: "Copper earth bars; tinned copper bars; stainless-steel earth bars; single disconnecting links; double disconnecting links; test links; braided bonds"
  },
  {
    code: "ER-04",
    slug: "earth-electrode-and-bonding-accessories",
    groupPrefix: "ER",
    sortOrder: 8,
    title: "Earth Electrode and Bonding Accessories",
    description: "Earth electrode accessories, conductor clamps and bonding connections for completing grounding and lightning protection installations.",
    families: "Earth rod clamps; tape-to-tape clamps; cable-to-tape clamps; rod couplers; inspection joints; bonding clamps; bimetallic connectors"
  },
  {
    code: "LT-01",
    slug: "aviation-helipad-and-marine-lighting",
    groupPrefix: "LT",
    sortOrder: 9,
    title: "Aviation, Helipad and Marine Lighting",
    description: "Special-purpose lighting and visual guidance equipment for aviation, helipad, marine and offshore applications.",
    families: "Obstacle lights; helipad lights; marine navigation lights; warning beacons; inset lights; LED signal lights; control boxes"
  },
  {
    code: "LT-02",
    slug: "led-light-fixtures-and-luminaires",
    groupPrefix: "LT",
    sortOrder: 10,
    title: "LED Light Fixtures and Luminaires",
    description: "Energy-efficient LED luminaires for commercial, industrial, architectural and outdoor lighting applications.",
    families: "LED floodlights; high-bay lights; panel lights; linear lights; downlights; streetlights; wall lights; weatherproof fittings"
  },
  {
    code: "LT-03",
    slug: "streetlights-high-masts-and-flagpoles",
    groupPrefix: "LT",
    sortOrder: 11,
    title: "Streetlights, High Masts and Flagpoles",
    description: "Street lighting poles, high-mast lighting structures, decorative poles and flagpoles for municipal, commercial and infrastructure projects.",
    families: "Streetlight poles; high-mast poles; solar streetlights; decorative poles; CCTV poles; flagpoles; base plates; anchor bolt assemblies"
  },
  {
    code: "LT-04",
    slug: "signal-beacons-and-tower-lights",
    groupPrefix: "LT",
    sortOrder: 12,
    title: "Signal Beacons and Tower Lights",
    description: "Industrial signalling lights, stack lights, beacons and audible-visual warning devices for equipment status indication, process control and safety communication.",
    families: "LED stack lights; rotating beacons; flashing beacons; signal towers; siren beacons; traffic signals; machine-status indicators"
  },
  {
    code: "CM-01",
    slug: "cable-management-systems-and-cable-trays",
    groupPrefix: "CM",
    sortOrder: 13,
    title: "Cable Management Systems and Cable Trays",
    description: "Cable tray, cable ladder and cable containment systems for routing, supporting and protecting power, control, instrumentation and data cables.",
    families: "Cable ladder; perforated tray; wire-mesh tray; trunking; tray bends; tees; reducers; tray covers; support channels"
  },
  {
    code: "CM-02",
    slug: "cable-cleats-and-cable-supports",
    groupPrefix: "CM",
    sortOrder: 14,
    title: "Cable Cleats and Cable Supports",
    description: "Cable cleats and support systems for secure cable retention in industrial, utility and infrastructure installations.",
    families: "Single cable cleats; trefoil cleats; multicore cleats; stainless-steel cleats; aluminium cleats; polymer cleats; cable clamps; support brackets"
  },
  {
    code: "CM-03",
    slug: "cable-ties-heat-sleeves-and-cable-management-accessories",
    groupPrefix: "CM",
    sortOrder: 15,
    title: "Cable Ties, Heat Sleeves and Cable Management Accessories",
    description: "Cable management accessories for bundling, protecting, routing and finishing electrical installations.",
    families: "Nylon cable ties; stainless-steel cable ties; heat-shrink sleeves; spiral wrap; split conduit; cable markers; cable glands; cable clips"
  },
  {
    code: "CM-04",
    slug: "cable-identification-tags-and-markers",
    groupPrefix: "CM",
    sortOrder: 16,
    title: "Cable Identification Tags and Markers",
    description: "Cable identification systems for clear, durable labelling of cables, wires, terminals, panels and equipment.",
    families: "Cable tags; stainless-steel markers; heat-shrink markers; clip-on markers; terminal markers; legend plates; marker carriers"
  },
  {
    code: "CB-01",
    slug: "industrial-power-control-and-instrumentation-cables",
    groupPrefix: "CB",
    sortOrder: 17,
    title: "Industrial Power, Control and Instrumentation Cables",
    description: "Industrial cable range for power distribution, control, instrumentation, communication and specialised applications.",
    families: "Single-core cable; multicore power cable; control cable; instrumentation cable; screened cable; armoured cable; fire-resistant cable; LSZH cable"
  },
  {
    code: "CB-02",
    slug: "fibre-optic-cables-patch-cords-and-connectivity",
    groupPrefix: "CB",
    sortOrder: 18,
    title: "Fibre Optic Cables, Patch Cords and Connectivity",
    description: "Optical fibre connectivity products for telecommunications, data networks, security, industrial automation and fibre-to-the-premises infrastructure.",
    families: "Single-mode fibre; multimode fibre; FTTH drop cable; armoured fibre cable; patch cords; pigtails; LC connectors; SC connectors; fibre termination boxes"
  },
  {
    code: "CB-03",
    slug: "cable-terminations-and-jointing-kits",
    groupPrefix: "CB",
    sortOrder: 19,
    title: "Cable Terminations and Jointing Kits",
    description: "Cable jointing and termination systems for low-voltage and medium-voltage cable installations.",
    families: "Heat-shrink terminations; cold-shrink terminations; straight-through joints; transition joints; screened cable accessories; stress-control components; breakout boots"
  },
  {
    code: "CB-04",
    slug: "cable-glands-lugs-and-connectors",
    groupPrefix: "CB",
    sortOrder: 20,
    title: "Cable Glands, Lugs and Connectors",
    description: "Cable entry, termination and connection accessories for safe, orderly electrical installations.",
    families: "Armoured cable glands; non-armoured glands; EMC glands; brass glands; cable lugs; bi-metallic lugs; copper lugs; ferrules; reducers"
  },
  {
    code: "CT-01",
    slug: "rigid-gi-and-stainless-steel-conduit-systems",
    groupPrefix: "CT",
    sortOrder: 21,
    title: "Rigid GI and Stainless-Steel Conduit Systems",
    description: "Rigid galvanised steel and stainless-steel conduit systems for mechanical protection of electrical wiring in commercial, industrial and demanding environments.",
    families: "GI conduit; stainless-steel conduit; threaded elbows; couplers; unions; inspection tees; junction boxes; locknuts; saddles"
  },
  {
    code: "CT-02",
    slug: "pvc-conduit-and-trunking-systems",
    groupPrefix: "CT",
    sortOrder: 22,
    title: "PVC Conduit and Trunking Systems",
    description: "PVC conduit, flexible conduit, trunking and accessory systems for electrical cable containment in building and light-industrial installations.",
    families: "PVC conduit; corrugated PVC conduit; PVC trunking; elbows; couplers; junction boxes; adaptable boxes; conduit clips; cable ducting"
  },
  {
    code: "CT-03",
    slug: "flexible-conduit-systems",
    groupPrefix: "CT",
    sortOrder: 23,
    title: "Flexible Conduit Systems",
    description: "Flexible metallic and non-metallic conduit systems for cable protection where vibration, movement, tight routing or mechanical flexibility is required.",
    families: "Liquid-tight flexible conduit; PVC-coated conduit; galvanized flexible conduit; conduit glands; connectors; elbows; flexible junction boxes"
  },
  {
    code: "EL-01",
    slug: "electrical-switches-and-wiring-accessories",
    groupPrefix: "EL",
    sortOrder: 24,
    title: "Electrical Switches and Wiring Accessories",
    description: "Electrical switches, socket outlets, dimmers, isolating switches, mounting boxes and wiring accessories for residential, commercial and industrial installations.",
    families: "Light switches; socket outlets; USB outlets; dimmers; fan regulators; weatherproof sockets; surface boxes; flush boxes; terminal blocks"
  },
  {
    code: "EL-02",
    slug: "electrical-isolators-and-disconnect-switches",
    groupPrefix: "EL",
    sortOrder: 25,
    title: "Electrical Isolators and Disconnect Switches",
    description: "Isolators and disconnect switches for safe circuit separation, maintenance isolation and local equipment control.",
    families: "Rotary isolators; load-break switches; switch disconnectors; enclosed isolators; lockable isolators; changeover switches; switch-fuse units"
  },
  {
    code: "EL-03",
    slug: "control-panel-components",
    groupPrefix: "EL",
    sortOrder: 26,
    title: "Control Panel Components",
    description: "Control-panel components for panel builders, machine control and industrial automation.",
    families: "Terminal blocks; contactors; relays; timers; pushbuttons; selector switches; pilot lamps; DIN rail; cable duct; panel meters"
  },
  {
    code: "EL-04",
    slug: "industrial-plugs-sockets-and-connectors",
    groupPrefix: "EL",
    sortOrder: 27,
    title: "Industrial Plugs, Sockets and Connectors",
    description: "Industrial plugs, sockets, couplers and interlocked socket outlets for dependable power connections in construction, manufacturing, events and utility environments.",
    families: "IEC 60309 plugs; industrial sockets; couplers; panel sockets; interlocked sockets; extension leads; cable connectors; IP-rated outlets"
  },
  {
    code: "EL-05",
    slug: "electrical-protection-and-control-components",
    groupPrefix: "EL",
    sortOrder: 28,
    title: "Electrical Protection and Control Components",
    description: "Protection and control components for electrical distribution and machinery, including fuses, relay products, current transformers, monitoring devices and terminal systems.",
    families: "Fuses; fuse holders; current transformers; monitoring relays; timers; terminal blocks; control relays; contactors; overload protection"
  },
  {
    code: "EL-06",
    slug: "surge-protection-devices",
    groupPrefix: "EL",
    sortOrder: 29,
    title: "Surge Protection Devices",
    description: "Surge protection devices for safeguarding power, data and control circuits from transient overvoltages caused by lightning activity and switching events.",
    families: "Type 1 SPD; Type 2 SPD; Type 3 SPD; DC surge protection; data-line surge protection; coaxial SPD; photovoltaic SPD; lightning arresters"
  },
  {
    code: "EL-07",
    slug: "electrical-transformers",
    groupPrefix: "EL",
    sortOrder: 30,
    title: "Electrical Transformers",
    description: "Electrical transformers for voltage transformation, isolation, control, metering and industrial power applications.",
    families: "Distribution transformers; dry-type transformers; isolation transformers; control transformers; current transformers; voltage transformers; toroidal transformers"
  },
  {
    code: "EL-08",
    slug: "industrial-automation-and-sensors",
    groupPrefix: "EL",
    sortOrder: 31,
    title: "Industrial Automation and Sensors",
    description: "Industrial automation products for machine control, process monitoring and connected operations.",
    families: "PLCs; HMI panels; VFDs; remote I/O; industrial Ethernet; safety controllers; power supplies; automation modules"
  },
  {
    code: "EL-09",
    slug: "industrial-sensors-encoders-and-connectors",
    groupPrefix: "EL",
    sortOrder: 32,
    title: "Industrial Sensors, Encoders and Connectors",
    description: "Industrial sensing and connectivity products for position, speed, presence, temperature and process monitoring.",
    families: "Proximity sensors; photoelectric sensors; limit switches; encoders; M8 connectors; M12 connectors; industrial Ethernet connectors; diodes"
  },
  {
    code: "EL-10",
    slug: "enclosures-and-junction-boxes",
    groupPrefix: "EL",
    sortOrder: 33,
    title: "Enclosures and Junction Boxes",
    description: "Electrical enclosures, cabinets and junction boxes for housing, protecting and organising electrical and control equipment.",
    families: "Wall-mount enclosures; floor-standing cabinets; junction boxes; terminal boxes; IP-rated enclosures; stainless-steel cabinets; viewing windows"
  },
  {
    code: "EL-11",
    slug: "explosion-proof-equipment-and-accessories",
    groupPrefix: "EL",
    sortOrder: 34,
    title: "Explosion-Proof Equipment and Accessories",
    description: "Explosion-protected electrical equipment for hazardous-area installations, including luminaires, junction boxes, control stations, glands and accessories.",
    families: "Ex lighting; Ex junction boxes; Ex control stations; Ex cable glands; Ex plugs and sockets; hazardous-area enclosures; Ex beacons"
  },
  {
    code: "EL-12",
    slug: "industrial-stabilizers-filters-and-rectifiers",
    groupPrefix: "EL",
    sortOrder: 35,
    title: "Industrial Stabilisers, Filters and Rectifiers",
    description: "Power-quality and power-conversion equipment for industrial electrical systems, including voltage stabilisers, harmonic filters, rectifiers, DC power supplies and related assemblies.",
    families: "Voltage stabilizers; servo stabilizers; harmonic filters; rectifiers; battery chargers; DC power systems; power-factor correction components"
  },
  {
    code: "EN-01",
    slug: "solar-pv-components",
    groupPrefix: "EN",
    sortOrder: 36,
    title: "Solar PV Components",
    description: "Solar photovoltaic balance-of-system components for commercial, industrial and off-grid installations.",
    families: "Solar PV modules; string inverters; combiner boxes; DC isolators; MC4 connectors; solar cable; mounting rails; fuses; SPDs"
  },
  {
    code: "EN-02",
    slug: "solar-lighting-and-solar-water-heating",
    groupPrefix: "EN",
    sortOrder: 37,
    title: "Solar Lighting and Solar Water Heating",
    description: "Solar-powered lighting and solar water-heating solutions for energy-efficient outdoor, residential and commercial applications.",
    families: "Solar streetlights; solar garden lights; solar floodlights; solar water heaters; solar collectors; batteries; charge controllers"
  },
  {
    code: "ME-01",
    slug: "ventilation-systems",
    groupPrefix: "ME",
    sortOrder: 38,
    title: "Ventilation Systems",
    description: "Ventilation equipment for air movement, extraction, fresh-air supply and smoke-control support in commercial and industrial settings.",
    families: "Axial fans; centrifugal fans; inline fans; exhaust fans; roof ventilators; air grilles; duct accessories; fan speed controls"
  },
  {
    code: "ME-02",
    slug: "hvac-and-refrigeration-components",
    groupPrefix: "ME",
    sortOrder: 39,
    title: "HVAC and Refrigeration Components",
    description: "HVAC and refrigeration components for cooling, air-conditioning and cold-room systems.",
    families: "Compressors; condensers; evaporators; fan motors; copper tubing; valves; filters; pressure gauges; refrigeration controls"
  },
  {
    code: "ME-03",
    slug: "industrial-pumps-and-fluid-handling",
    groupPrefix: "ME",
    sortOrder: 40,
    title: "Industrial Pumps and Fluid Handling",
    description: "Industrial pumps, valves and fluid-handling components for water, drainage, pressure boosting, process and transfer applications.",
    families: "Centrifugal pumps; submersible pumps; vertical multistage pumps; booster sets; diaphragm pumps; valves; impellers; fittings"
  },
  {
    code: "ME-04",
    slug: "industrial-air-compressors-and-pneumatic-systems",
    groupPrefix: "ME",
    sortOrder: 41,
    title: "Industrial Air Compressors and Pneumatic Systems",
    description: "Compressed-air equipment and pneumatic system components for workshops, manufacturing and industrial operations.",
    families: "Screw compressors; piston compressors; air receivers; air dryers; FRL units; pressure gauges; pneumatic valves; hoses; fittings"
  },
  {
    code: "ME-05",
    slug: "industrial-gauges-valves-and-fittings",
    groupPrefix: "ME",
    sortOrder: 42,
    title: "Industrial Gauges, Valves and Fittings",
    description: "Industrial valves, gauges, fittings and instrumentation accessories for fluid, gas and pneumatic systems.",
    families: "Ball valves; butterfly valves; gate valves; pressure gauges; safety valves; needle valves; stainless-steel fittings; brass fittings"
  },
  {
    code: "ME-06",
    slug: "electric-water-heaters-and-accessories",
    groupPrefix: "ME",
    sortOrder: 43,
    title: "Electric Water Heaters and Accessories",
    description: "Electric water heaters and associated safety, control and plumbing accessories for residential, commercial and light-industrial hot-water systems.",
    families: "Storage water heaters; instantaneous water heaters; heating elements; thermostats; safety valves; expansion vessels; flexible connectors"
  },
  {
    code: "SG-01",
    slug: "cctv-and-security-products",
    groupPrefix: "SG",
    sortOrder: 44,
    title: "CCTV and Security Products",
    description: "CCTV and security equipment for video surveillance, access monitoring and perimeter protection.",
    families: "IP cameras; dome cameras; PTZ cameras; NVRs; DVRs; CCTV monitors; PoE switches; access-control devices; brackets"
  },
  {
    code: "SG-02",
    slug: "industrial-alarm-and-alert-systems",
    groupPrefix: "SG",
    sortOrder: 45,
    title: "Industrial Alarm and Alert Systems",
    description: "Alarm, notification and emergency alert products for industrial, commercial and public-safety applications.",
    families: "Fire alarm sounders; strobe lights; manual call points; sirens; emergency call systems; evacuation indicators; warning horns"
  },
  {
    code: "SG-03",
    slug: "fire-protection-equipment",
    groupPrefix: "SG",
    sortOrder: 46,
    title: "Fire Protection Equipment",
    description: "Fire-protection equipment and accessories for first-response firefighting, hose systems and safety support.",
    families: "Fire extinguishers; hose reels; fire hoses; landing valves; hose cabinets; fire blankets; fire signs; firefighting accessories"
  },
  {
    code: "SG-04",
    slug: "weather-monitoring-systems",
    groupPrefix: "SG",
    sortOrder: 47,
    title: "Weather Monitoring Systems",
    description: "Weather monitoring instruments and stations for measuring wind, temperature, humidity, rainfall, solar radiation and other environmental parameters.",
    families: "Weather stations; anemometers; wind vanes; rain gauges; temperature sensors; humidity sensors; data loggers; solar-powered telemetry"
  },
  {
    code: "HW-01",
    slug: "hardware-accessories-and-fasteners",
    groupPrefix: "HW",
    sortOrder: 48,
    title: "Hardware Accessories and Fasteners",
    description: "Hardware accessories and fasteners for construction, electrical, mechanical and support-system installations.",
    families: "Bolts; nuts; washers; threaded rods; anchors; screws; channel nuts; brackets; U-bolts; clamps"
  },
  {
    code: "HW-02",
    slug: "heavy-duty-clamps-and-cable-tray-supports",
    groupPrefix: "HW",
    sortOrder: 49,
    title: "Heavy-Duty Clamps and Cable Tray Supports",
    description: "Heavy-duty pipe clamps, channel supports, threaded-rod systems and cable-tray support accessories for industrial and building-services installations.",
    families: "Pipe clamps; rubber-lined clamps; trapeze supports; strut channels; cantilever arms; threaded rods; anchors; channel brackets"
  },
  {
    code: "HW-03",
    slug: "tools-and-equipment",
    groupPrefix: "HW",
    sortOrder: 50,
    title: "Tools and Equipment",
    description: "Professional electrical, mechanical and installation tools for site work, maintenance and project execution.",
    families: "Insulated hand tools; crimping tools; cable cutters; measuring instruments; power tools; cable rollers; tool kits; test equipment"
  },
  {
    code: "HW-04",
    slug: "professional-welding-machines-and-accessories",
    groupPrefix: "HW",
    sortOrder: 51,
    title: "Professional Welding Machines and Accessories",
    description: "Professional welding equipment and consumables for fabrication, maintenance and site works.",
    families: "MIG welders; TIG welders; MMA welders; welding torches; electrodes; filler wire; welding cables; helmets; gloves"
  },
  {
    code: "HW-05",
    slug: "constant-force-springs-and-mechanical-components",
    groupPrefix: "HW",
    sortOrder: 52,
    title: "Constant-Force Springs and Mechanical Components",
    description: "Constant-force springs and precision mechanical components for controlled motion, retracting mechanisms, counterbalance systems and specialised equipment.",
    families: "Constant-force springs; spring reels; retractors; pulleys; tension springs; extension springs; mounting brackets; custom assemblies"
  },
  {
    code: "EN-03",
    slug: "industrial-generator-equipment",
    groupPrefix: "EN",
    sortOrder: 53,
    title: "Industrial Generator Equipment",
    description: "Generator sets, alternators, control panels and auxiliary equipment for standby, prime and industrial power-generation applications.",
    families: "Diesel generators; gas generators; alternators; automatic transfer switches; generator control panels; fuel tanks; battery chargers; exhaust systems"
  },
  {
    code: "SF-01",
    slug: "safety-marking-warning-tapes-and-traffic-equipment",
    groupPrefix: "SF",
    sortOrder: 54,
    title: "Safety Marking, Warning Tapes and Traffic Equipment",
    description: "Safety marking products for clearly identifying hazards, underground services, restricted areas and temporary work zones.",
    families: "Warning tape; detectable tape; barricade tape; floor marking tape; traffic cones; delineators; reflective markers; cable route markers"
  },
  {
    code: "SF-02",
    slug: "industrial-personal-protective-equipment-ppe",
    groupPrefix: "SF",
    sortOrder: 55,
    title: "Industrial Personal Protective Equipment (PPE)",
    description: "Personal protective equipment for site, industrial and maintenance work.",
    families: "Safety helmets; safety shoes; gloves; eye protection; hearing protection; high-visibility wear; fall-arrest harnesses; respiratory protection"
  },
  {
    code: "PK-01",
    slug: "industrial-packaging-supplies",
    groupPrefix: "PK",
    sortOrder: 56,
    title: "Industrial Packaging Supplies",
    description: "Industrial packaging supplies for protecting, securing and dispatching goods, equipment and project materials.",
    families: "Stretch film; bubble wrap; foam sheets; corrugated cartons; packing tape; strapping; edge protectors; pallet-wrap accessories"
  },
  {
    code: "ID-01",
    slug: "engraved-plates-and-equipment-identification",
    groupPrefix: "ID",
    sortOrder: 57,
    title: "Engraved Plates and Equipment Identification",
    description: "Custom engraved plates, cable tags, warning labels and equipment identification solutions for electrical, industrial and safety applications.",
    families: "Engraved labels; stainless-steel plates; aluminium tags; traffolyte labels; cable markers; danger signs; asset tags; equipment nameplates"
  }
];
