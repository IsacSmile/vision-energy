// SEED SOURCE ONLY - The public site and admin read from the database via lib/data/products.ts
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
    title: "LED Lights & Luminaires",
    description: "Illuminate your space with energy-efficient LED lights from different international and local manufacturers. Our extensive range of lighting solutions offers superior brightness and longevity, contributing to reduced energy consumption and cost savings for both indoor and outdoor environments.",
    families: "LED floodlights; high-bay lights; panel lights; linear lights; downlights; streetlights; wall lights; weatherproof fittings; indoor and outdoor LED lighting"
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
    title: "Automation Items & Industrial Sensors",
    description: "Cutting-edge automation items for efficient control and management systems, offering a comprehensive range of controls and switchgear accessories ensuring seamless operation and enhanced safety across various industries.",
    families: "PLCs; HMI panels; VFDs; remote I/O; industrial Ethernet; safety controllers; power supplies; automation modules; control systems"
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
  },
  {
    code: "LE-01",
    slug: "laboratory-balances",
    groupPrefix: "LE",
    sortOrder: 58,
    title: "Laboratory Balances",
    description: "Laboratory balances are precision weighing instruments designed to measure the mass of samples and materials accurately for research, testing, educational and industrial laboratory applications.",
    families: "Analytical balances; precision balances; weighing scale"
  },
  {
    code: "LE-02",
    slug: "heating-and-stirring-equipment",
    groupPrefix: "LE",
    sortOrder: 59,
    title: "Heating and Stirring Equipment",
    description: "Heating and stirring equipment are essential laboratory instruments used to heat, mix and maintain substances at controlled temperatures",
    families: "Hotplates; magnetic stirrers; dry block heaters"
  },
  {
    code: "LE-03",
    slug: "mixing-and-shaking-equipment",
    groupPrefix: "LE",
    sortOrder: 60,
    title: "Mixing and Shaking Equipment",
    description: "Mixing and shaking equipment are laboratory instruments used to blend, agitate and homogenize samples and solutions",
    families: "Vortex mixers; orbital shakers; laboratory mixers"
  },
  {
    code: "LE-04",
    slug: "centrifuges-and-cleaning-equipment",
    groupPrefix: "LE",
    sortOrder: 61,
    title: "Centrifuges and Cleaning Equipment",
    description: "Equipment used for sample separation and cleaning laboratory instruments, glassware and accessories.",
    families: "Bench centrifuges; ultrasonic cleaners"
  },
  {
    code: "LE-05",
    slug: "ovens-and-incubators",
    groupPrefix: "LE",
    sortOrder: 62,
    title: "Ovens and Incubators",
    description: "Laboratory ovens and incubators provide precise temperature control for drying, heating, sterilization and sample incubation across research, testing and industrial applications.",
    families: "Drying ovens; laboratory incubators; heating chambers"
  },
  {
    code: "LE-06",
    slug: "vacuum-equipment",
    groupPrefix: "LE",
    sortOrder: 63,
    title: "Vacuum Equipment",
    description: "Equipment designed for vacuum filtration, drying, degassing and sample preparation in laboratory applications.",
    families: "Vacuum pumps; desiccators; vacuum accessories"
  },
  {
    code: "LPE-01",
    slug: "laboratory-gloves",
    groupPrefix: "LPE",
    sortOrder: 64,
    title: "Laboratory Gloves",
    description: "Protective gloves designed for safe handling of laboratory materials and substances.",
    families: "Nitrile; latex; chemical-resistant; heat-resistant gloves"
  },
  {
    code: "LPE-02",
    slug: "protective-clothing",
    groupPrefix: "LPE",
    sortOrder: 65,
    title: "Protective Clothing",
    description: "Protective clothing designed to ensure safety and hygiene in laboratory environments.",
    families: "Lab coats; gowns; coveralls; protective aprons"
  },
  {
    code: "LPE-03",
    slug: "masks-and-respirators",
    groupPrefix: "LPE",
    sortOrder: 66,
    title: "Masks and Respirators",
    description: "Protective masks and respirators designed to reduce exposure to airborne particles and contaminants.",
    families: "Surgical masks; N95; FFP2; FFP3; respirators"
  },
  {
    code: "LPE-04",
    slug: "eye-and-face-protection",
    groupPrefix: "LPE",
    sortOrder: 67,
    title: "Eye and Face Protection",
    description: "Protective eyewear and face shields designed to safeguard against chemical splashes, particles and laboratory hazards.",
    families: "Safety goggles; glasses; face shields"
  },
  {
    code: "LPE-05",
    slug: "foot-protection",
    groupPrefix: "LPE",
    sortOrder: 68,
    title: "Foot Protection",
    description: "Protective footwear designed to safeguard against spills, impact and workplace hazards in laboratory environments.",
    families: "Safety shoes; chemical-resistant boots; shoe covers"
  },
  {
    code: "LPE-06",
    slug: "head-protection",
    groupPrefix: "LPE",
    sortOrder: 69,
    title: "Head Protection",
    description: "Protective headwear engineered for reliable impact protection and workplace safety.",
    families: "Bouffant caps; hair covers; hoods; beard covers"
  },
  {
    code: "LG-01",
    slug: "laboratory-glassware",
    groupPrefix: "LG",
    sortOrder: 70,
    title: "Laboratory Glassware",
    description: "High-quality laboratory glassware designed for accurate measurements, reliable experimentation, and safe handling of chemicals.",
    families: "Beakers; flasks; measuring cylinders; funnels"
  },
  {
    code: "LG-02",
    slug: "tubes-and-bottles",
    groupPrefix: "LG",
    sortOrder: 71,
    title: "Tubes and Bottles",
    description: "Durable, high-quality laboratory tubes and bottles designed for secure sample storage, handling, and reliable laboratory applications.",
    families: "Test tubes; reagent bottles; sample bottles"
  },
  {
    code: "LG-03",
    slug: "laboratory-plasticware",
    groupPrefix: "LG",
    sortOrder: 72,
    title: "Laboratory Plasticware",
    description: "High-quality laboratory plasticware designed for safe sample handling, storage, and efficient everyday laboratory applications.",
    families: "Petri dishes; plastic containers; wash bottles"
  },
  {
    code: "LG-04",
    slug: "storage-and-handling-accessories",
    groupPrefix: "LG",
    sortOrder: 73,
    title: "Storage and Handling Accessories",
    description: "Reliable laboratory storage and handling solutions designed for organized sample management, secure storage, and efficient laboratory workflows.",
    families: "Tube racks; bottle carriers; laboratory storage boxes"
  },
  {
    code: "LH-01",
    slug: "pipettes-and-micropipettes",
    groupPrefix: "LH",
    sortOrder: 74,
    title: "Pipettes and Micropipettes",
    description: "Precision-engineered pipettes and micropipettes designed for accurate liquid measurement, controlled dispensing, and reliable laboratory applications.",
    families: "Manual pipettes; adjustable micropipettes; accessories"
  },
  {
    code: "LH-02",
    slug: "pipette-tips-and-tubes",
    groupPrefix: "LH",
    sortOrder: 75,
    title: "Pipette Tips and Tubes",
    description: "High-quality pipette tips and tubes designed for precise liquid handling, secure sample collection, and contamination-free laboratory workflows.",
    families: "Pipette tips; centrifuge tubes; microtubes"
  },
  {
    code: "LH-03",
    slug: "liquid-dispensing-equipment",
    groupPrefix: "LH",
    sortOrder: 76,
    title: "Liquid Dispensing Equipment",
    description: "Reliable liquid dispensing solutions designed for precise volume control, consistent delivery, and efficient laboratory operations.",
    families: "Bottle-top dispensers; pipette controllers"
  },
  {
    code: "LH-04",
    slug: "sample-preparation-accessories",
    groupPrefix: "LH",
    sortOrder: 77,
    title: "Sample Preparation Accessories",
    description: "Essential laboratory accessories designed for efficient sample preparation, accurate processing, and reliable results across various testing applications.",
    families: "Cuvettes; weighing boats; sample handling accessories"
  },
  {
    code: "LC-01",
    slug: "microscope-slides-and-cover-slips",
    groupPrefix: "LC",
    sortOrder: 78,
    title: "Microscope Slides and Cover Slips",
    description: "High-quality microscope slides and cover slips designed for clear specimen observation, precise microscopy, and reliable laboratory analysis.",
    families: "Glass slides; cover slips; slide accessories"
  },
  {
    code: "LC-02",
    slug: "filter-papers-and-membranes",
    groupPrefix: "LC",
    sortOrder: 79,
    title: "Filter Papers and Membranes",
    description: "High-performance filtration solutions designed for efficient particle separation, sample purification, and consistent laboratory results.",
    families: "Filter papers; membrane filters; filtration accessories"
  },
  {
    code: "LC-03",
    slug: "sealing-and-labelling-products",
    groupPrefix: "LC",
    sortOrder: 80,
    title: "Sealing and Labelling Products",
    description: "Reliable sealing and labelling solutions designed for secure sample protection, clear identification, and organized laboratory storage.",
    families: "Sealing films; laboratory labels; identification accessories"
  },
  {
    code: "LC-04",
    slug: "general-laboratory-consumables",
    groupPrefix: "LC",
    sortOrder: 81,
    title: "General Laboratory Consumables",
    description: "Essential laboratory consumables designed to support everyday testing, sample handling, and smooth, efficient laboratory operations.",
    families: "Laboratory wipes; disposable accessories; cleaning supplies"
  },
  {
    code: "LM-01",
    slug: "ph-and-conductivity-meters",
    groupPrefix: "LM",
    sortOrder: 82,
    title: "pH and Conductivity Meters",
    description: "Precision measuring instruments designed for accurate pH and conductivity testing, reliable monitoring, and consistent laboratory analysis.",
    families: "Digital pH meters; conductivity measurement instruments"
  },
  {
    code: "LM-02",
    slug: "temperature-and-humidity-instruments",
    groupPrefix: "LM",
    sortOrder: 83,
    title: "Temperature and Humidity Instruments",
    description: "Reliable monitoring instruments designed for accurate temperature and humidity measurement, environmental control, and consistent laboratory conditions.",
    families: "Thermometers; temperature meters; humidity meters"
  },
  {
    code: "LM-03",
    slug: "data-loggers-and-monitoring-systems",
    groupPrefix: "LM",
    sortOrder: 84,
    title: "Data Loggers and Monitoring Systems",
    description: "Advanced monitoring solutions designed for continuous data recording, accurate measurement tracking, and reliable environmental monitoring.",
    families: "Data loggers; temperature monitors; alarms"
  },
  {
    code: "LM-04",
    slug: "timers-and-measuring-accessories",
    groupPrefix: "LM",
    sortOrder: 85,
    title: "Timers and Measuring Accessories",
    description: "Precision timing and measuring tools designed for accurate measurements, controlled laboratory procedures, and efficient experimental workflows.",
    families: "Digital timers; stopwatches; measurement accessories"
  },
  {
    code: "MO-01",
    slug: "optical-microscopes",
    groupPrefix: "MO",
    sortOrder: 86,
    title: "Optical Microscopes",
    description: "High-performance optical microscopes designed for clear magnification, detailed specimen observation, and precise laboratory examination.",
    families: "Compound; binocular; monocular microscopes"
  },
  {
    code: "MO-02",
    slug: "digital-microscopes",
    groupPrefix: "MO",
    sortOrder: 87,
    title: "Digital Microscopes",
    description: "Advanced digital microscopes designed for high-resolution imaging, real-time specimen viewing, and accurate analysis with enhanced visual clarity.",
    families: "Digital microscopes; imaging systems"
  },
  {
    code: "MO-03",
    slug: "microscope-accessories",
    groupPrefix: "MO",
    sortOrder: 88,
    title: "Microscope Accessories",
    description: "Essential microscope accessories designed to enhance imaging performance, improve functionality, and support accurate specimen observation.",
    families: "Objective lenses; eyepieces; illumination systems"
  },
  {
    code: "LF-01",
    slug: "laboratory-benches-and-worktops",
    groupPrefix: "LF",
    sortOrder: 89,
    title: "Laboratory Benches and Worktops",
    description: "Durable, chemical-resistant laboratory work surfaces designed for safe experimentation, efficient workflows, and long-lasting performance.",
    families: "Wall benches; island benches; worktops"
  },
  {
    code: "LF-02",
    slug: "laboratory-cabinets",
    groupPrefix: "LF",
    sortOrder: 90,
    title: "Laboratory Cabinets",
    description: "Durable laboratory storage cabinets designed for safe equipment organization, secure chemical storage, and efficient use of workspace.",
    families: "Storage cabinets; mobile pedestals; cupboards"
  },
  {
    code: "LF-03",
    slug: "instrument-tables-and-workstations",
    groupPrefix: "LF",
    sortOrder: 91,
    title: "Instrument Tables and Workstations",
    description: "Sturdy, ergonomic workstations designed to support laboratory instruments, optimize workspace organization, and ensure stable, efficient operations.",
    families: "Instrument tables; balance tables; workstations"
  },
  {
    code: "LF-04",
    slug: "laboratory-furniture-accessories",
    groupPrefix: "LF",
    sortOrder: 92,
    title: "Laboratory Furniture Accessories",
    description: "Functional laboratory accessories designed to enhance workspace organization, improve furniture usability, and support safe, efficient laboratory operations.",
    families: "Stools; shelving; sinks; taps; drying racks"
  },
  {
    code: "TS-01",
    slug: "laboratory-refrigerators",
    groupPrefix: "TS",
    sortOrder: 93,
    title: "Laboratory Refrigerators",
    description: "High-performance laboratory refrigeration systems designed for precise temperature control and safe storage of samples, reagents, and sensitive materials.",
    families: "Laboratory refrigerators; sample storage refrigerators"
  },
  {
    code: "TS-02",
    slug: "laboratory-freezers",
    groupPrefix: "TS",
    sortOrder: 94,
    title: "Laboratory Freezers",
    description: "Reliable laboratory freezing systems designed for stable low-temperature storage and preservation of sensitive samples, biological materials, and reagents.",
    families: "Upright; chest laboratory freezers"
  },
  {
    code: "TS-03",
    slug: "ultra-low-temperature-storage",
    groupPrefix: "TS",
    sortOrder: 95,
    title: "Ultra-Low Temperature Storage",
    description: "Advanced ultra-low temperature storage solutions designed for long-term preservation of sensitive biological samples, vaccines, and laboratory materials.",
    families: "Ultra-low-temperature freezers; storage systems"
  },
  {
    code: "TS-04",
    slug: "storage-monitoring-accessories",
    groupPrefix: "TS",
    sortOrder: 96,
    title: "Storage Monitoring Accessories",
    description: "Reliable monitoring accessories designed to track storage conditions, maintain temperature stability, and ensure the safe preservation of laboratory materials.",
    families: "Temperature alarms; monitoring systems; storage racks"
  },
  {
    code: "LS-01",
    slug: "fume-cupboards",
    groupPrefix: "LS",
    sortOrder: 97,
    title: "Fume Cupboards",
    description: "High-performance fume cupboards designed to safely extract hazardous fumes,  vapours , and airborne contaminants, ensuring a safer laboratory working environment.",
    families: "Laboratory fume hoods; exhaust containment systems"
  },
  {
    code: "LS-02",
    slug: "biological-safety-cabinets",
    groupPrefix: "LS",
    sortOrder: 98,
    title: "Biological Safety Cabinets",
    description: "Advanced containment systems designed to protect personnel, samples, and the laboratory environment from biological hazards during sensitive procedures.",
    families: "Biological safety cabinets; containment workstations"
  },
  {
    code: "LS-03",
    slug: "emergency-safety-equipment",
    groupPrefix: "LS",
    sortOrder: 99,
    title: "Emergency Safety Equipment",
    description: "Essential emergency safety solutions designed for rapid response, hazard control, and protection of laboratory personnel in critical situations.",
    families: "Eyewash stations; safety showers; eyewash bottles"
  },
  {
    code: "LS-04",
    slug: "chemical-storage-and-safety-cabinets",
    groupPrefix: "LS",
    sortOrder: 100,
    title: "Chemical Storage and Safety Cabinets",
    description: "Specialized safety cabinets designed for secure chemical storage, hazardous material containment, and improved laboratory safety and organization.",
    families: "Chemical storage cabinets; hazardous material storage"
  },
  {
    code: "LS-05",
    slug: "spill-and-waste-management-supplies",
    groupPrefix: "LS",
    sortOrder: 101,
    title: "Spill and Waste Management Supplies",
    description: "Essential spill control and waste management solutions designed for safe hazardous material handling, effective spill containment, and responsible laboratory waste disposal.",
    families: "Spill kits; biohazard bags; sharps containers"
  },
  {
    code: "WS-01",
    slug: "water-purification-systems",
    groupPrefix: "WS",
    sortOrder: 102,
    title: "Water Purification Systems",
    description: "Advanced water purification solutions designed to deliver high-quality purified water for accurate testing, reliable experiments, and diverse laboratory applications.",
    families: "Laboratory water purification; ultrapure water systems"
  },
  {
    code: "WS-02",
    slug: "filtration-systems",
    groupPrefix: "WS",
    sortOrder: 103,
    title: "Filtration Systems",
    description: "Advanced filtration solutions designed to remove impurities, separate contaminants, and deliver clean, high-quality water for reliable laboratory applications.",
    families: "Water filtration units; laboratory filtration equipment"
  },
  {
    code: "WS-03",
    slug: "glassware-washing-equipment",
    groupPrefix: "WS",
    sortOrder: 104,
    title: "Glassware Washing Equipment",
    description: "Efficient glassware cleaning systems designed to remove residues, ensure thorough washing, and maintain hygiene for reliable laboratory use.",
    families: "Automatic laboratory glassware washers"
  },
  {
    code: "WS-04",
    slug: "sterilization-equipment",
    groupPrefix: "WS",
    sortOrder: 105,
    title: "Sterilization Equipment",
    description: "Reliable sterilization solutions designed to eliminate microorganisms, ensure effective decontamination, and maintain safe, hygienic laboratory environments.",
    families: "Laboratory autoclaves; steam sterilizers"
  },
  {
    code: "WS-05",
    slug: "laboratory-drying-systems",
    groupPrefix: "WS",
    sortOrder: 106,
    title: "Laboratory Drying Systems",
    description: "High-performance drying solutions designed for efficient moisture removal, controlled drying processes, and reliable preparation of laboratory equipment and materials.",
    families: "Glassware drying cabinets; drying accessories"
  },
  {
    code: "AT-01",
    slug: "spectroscopy-instruments",
    groupPrefix: "AT",
    sortOrder: 107,
    title: "Spectroscopy Instruments",
    description: "Advanced analytical instruments designed for precise material identification, chemical composition analysis, and accurate measurement across diverse laboratory applications.",
    families: "UV-Visible; FTIR spectroscopy systems"
  },
  {
    code: "AT-02",
    slug: "chromatography-systems",
    groupPrefix: "AT",
    sortOrder: 108,
    title: "Chromatography Systems",
    description: "Advanced chromatography solutions designed for precise compound separation, chemical analysis, and reliable identification of components in complex samples.",
    families: "HPLC; gas chromatography systems"
  },
  {
    code: "AT-03",
    slug: "elemental-analysis-instruments",
    groupPrefix: "AT",
    sortOrder: 109,
    title: "Elemental Analysis Instruments",
    description: "High-precision analytical instruments designed to determine elemental composition, measure chemical concentrations, and deliver accurate results for laboratory testing and research.",
    families: "Atomic absorption spectrometers; related instruments"
  },
  {
    code: "AT-04",
    slug: "physical-and-particle-analysis",
    groupPrefix: "AT",
    sortOrder: 110,
    title: "Physical and Particle Analysis",
    description: "Advanced analytical instruments designed to measure physical properties, characterize particle size and distribution, and ensure accurate material analysis across laboratory applications.",
    families: "Moisture  analysers; particle measurement instruments"
  },
  {
    code: "AT-05",
    slug: "concrete-and-cement-testing",
    groupPrefix: "AT",
    sortOrder: 111,
    title: "Concrete and Cement Testing",
    description: "Reliable testing equipment designed to evaluate concrete strength, cement properties, durability, and quality to ensure compliance with construction standards.",
    families: "Compression testing machines; cement testing apparatus"
  },
  {
    code: "AT-06",
    slug: "soil-and-aggregate-testing",
    groupPrefix: "AT",
    sortOrder: 112,
    title: "Soil and Aggregate Testing",
    description: "Precision testing equipment designed to evaluate soil properties, aggregate characteristics, compaction, and strength for reliable geotechnical and construction quality assessments.",
    families: "Soil testing apparatus; aggregate testing; sieve shakers"
  },
  {
    code: "AT-07",
    slug: "industrial-inspection-instruments",
    groupPrefix: "AT",
    sortOrder: 113,
    title: "Industrial Inspection Instruments",
    description: "Advanced inspection instruments designed for accurate defect detection, material evaluation, and quality assessment to ensure industrial safety and operational reliability.",
    families: "Coating thickness gauges; hardness testers; inspection tools"
  }
];
