import { PrismaClient, ContentStatus } from "@prisma/client";
import { FALLBACK_CATEGORIES } from "../src/lib/fallback-categories";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

/**
 * Resolves the catalogue image URL for a category/product code, preferring
 * optimized WebP over PNG and JPEG when present on disk.
 */
function resolveCatalogueImageUrl(code: string): string {
  const dir = path.join(process.cwd(), "public/product-catalouge");
  for (const ext of ["webp", "png", "jpeg"]) {
    if (fs.existsSync(path.join(dir, `${code}.${ext}`))) {
      return `/product-catalouge/${code}.${ext}`;
    }
  }
  return `/product-catalouge/${code}.jpeg`;
}

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
  LE: "General Laboratory Equipment",
  LPE: "PPE & Safety Supplies Equipments",
  LG: "Glassware and Plasticware Essentials",
  LH: "Liquid Handling & Sample Preparation",
  LC: "Laboratory Consumables & Accessories",
  LM: "Measurement & Monitoring Instruments",
  MO: "Microscopes & Optical Instruments",
  LF: "Laboratory Furniture & Storage",
  TS: "Temperature-Controlled Storage",
  LS: "Laboratory Safety & Containment Systems",
  WS: "Water Purification & Sterilization",
  AT: "Analytical & Industrial Testing Instruments",
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
          "Certified external and internal lightning protection systems (LPS) engineered to safeguard commercial buildings, high-rises, industrial plants, warehouses, substations, healthcare facilities, schools, villas, and critical installations across the UAE.",
        overview:
          "Lightning, a powerful force of nature, can cause significant damage and pose severe threats to life and property. In response to regional thunderstorm activity and atmospheric shifts, UAE authorities mandate robust Lightning Protection Systems (LPS) for all constructions. Vision Energy delivers comprehensive end-to-end solutions—from certified risk assessment and multi-brand engineering design to installation and ongoing maintenance—ensuring optimal structural protection, fire prevention, personnel safety, and equipment surge security.",
        systems: [
          {
            title: "Conventional Lightning Protection Systems",
            body: "A standardized system comprising Franklin air rods, roof conductors, down conductors, and grounding networks. Engineered using the Rolling Sphere method, Protection Angle technique, or Faraday Mesh Cage system to intercept direct strikes, safely conduct current down the building, and disperse high-voltage electrical energy into the earth without sparking or side-flashing.",
            points: [
              "Franklin air terminals & elevated roof rods",
              "Conductor mesh layout & protection angle sizing",
              "Rolling sphere risk verification (Class I - IV)",
              "Continuous bare copper & PVC-sheathed down conductors",
              "Disconnect test links & deep-driven earth pits",
            ],
          },
          {
            title: "Early Streamer Emission (ESE) Systems",
            body: "Advanced active lightning protection utilizing an ionizing triggering terminal to emit an early upward streamer before conventional rods, intercepting lightning strikes at higher altitudes for a larger protective radius. Incorporates 4 operational modes: Neutral mode during normal conditions, Ionization mode during storm buildup, Upward Leader emission upon strike detection, and Interception capture mode above the protected zone.",
            points: [
              "Advanced ESE ionization terminals (tested to NFC 17-102)",
              "Rigid support masts & aerodynamic mounting fixtures",
              "High-conductivity PVC insulated down conductors",
              "Lightning event strike counters & test boxes",
              "Dedicated low-impedance earth termination grids",
            ],
          },
          {
            title: "Surge Protection Devices & Grounding Systems",
            body: "Secondary surge mitigation safeguarding electrical, mechanical, and electronic equipment against lightning-induced power surges, transient overvoltage, and step-and-touch potentials across electrical switchgear, electronic control units, and building automation panels.",
            points: [
              "Type 1, Type 2 & Type 3 surge protection devices (SPDs)",
              "Equipotential bonding busbars & test links",
              "Exothermic welded connections & copper earth electrodes",
              "Preventive weather monitoring sensors & detection units",
            ],
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
          "High-rise and mixed-use towers",
          "Warehouses and logistics facilities",
          "Industrial plants and manufacturing facilities",
          "Oil and gas support facilities",
          "Substations, utility infrastructure and telecom sites",
          "Government buildings, hospitals, schools and universities",
          "Ports, stadiums, malls and recreational beach areas",
          "Data centers, security and communication-critical installations",
        ],
        process: [
          { title: "Risk assessment & criteria evaluation", description: "IEC 62305-2 risk evaluation calculating strike probabilities, human safety (R1), and required protection level (Level 1 to 4).", confirmed: true },
          { title: "Methodology & system engineering", description: "Method selection (Rolling Sphere, Mesh, or ESE), structural modeling, CAD submittals, and consultant review coordination.", confirmed: true },
          { title: "Multi-brand supply & QA inspection", description: "Sourcing certified components from leading global brands tailored to site specifications, authority codes, and client budget.", confirmed: true },
          { title: "Precision on-site installation", description: "Air terminals, down conductor routing, test disconnect joints, and exothermic welded ground connections by trained technicians.", confirmed: true },
          { title: "Testing, verification & commissioning", description: "Continuity checks, earth resistance testing with calibrated meters, baseline strike counter logging, and handover sign-off.", confirmed: true },
          { title: "Ongoing maintenance & inspection support", description: "Periodic audits, post-storm verification, spare parts coordination, and preventative maintenance ensuring lasting system readiness.", confirmed: true },
        ],
        standards: [
          "IEC 62305 (Protection against lightning - Parts 1 to 4)",
          "BS EN 62305 (Structural protection & surge suppression code)",
          "NFC 17-102 (Early Streamer Emission ESE systems)",
          "NFPA 780 (Standard for the Installation of Lightning Protection Systems)",
          "IEC 62561 (Lightning protection system components & clamps)",
          "UAE Civil Defence & Local Utility Authority Regulations",
        ],
        complianceNote:
          "All lightning protection systems are designed, installed, and certified in strict accordance with IEC 62305, NFPA 780, NFC 17-102, and UAE Civil Defence technical regulations.",
        faq: [
          {
            q: "Why is a Lightning Protection System (LPS) essential for UAE buildings?",
            a: "Due to towering skyscrapers, extensive open terrain, and increased thunderstorm activity, UAE authorities mandate LPS for all construction. A certified LPS provides personnel safety, prevents structural damage and fires, and safeguards sensitive equipment from destructive surges.",
          },
          {
            q: "What is the difference between Conventional and ESE lightning protection?",
            a: "Conventional systems use Franklin air rods and Faraday mesh conductors to intercept strikes at the roof level. Early Streamer Emission (ESE) systems use an active ionizing terminal to emit an upward leader earlier, providing a wider protective radius with fewer roof penetrations for suitable structures.",
          },
          {
            q: "What protection levels are used in lightning risk assessment?",
            a: "Under IEC 62305, protection levels range from Level 1 (highest protection for explosive, chemical, hospital, and critical facilities) down to Level 4 (standard protection), based on strike density, occupancy, structural height, and consequence analysis.",
          },
        ],
        relatedCategoryCodes: ["LP-01", "LP-02", "LP-03", "LP-04", "ER-02", "ER-04"],
      },
    },
    {
      slug: "earthing-and-grounding",
      title: "Earthing & Grounding System Design & Installation",
      summary:
        "Low-resistance earthing grids, chemical earth enhancement, and deep well earth electrodes for industrial facilities.",
      icon: "shield",
      metaChips: ["Grounding Systems", "Earth Pits"],
      status: ContentStatus.PUBLISHED,
      publishedAt: new Date("2026-01-01T00:00:00Z"),
      sortOrder: 2,
      seoTitle: "Earthing & Grounding System Design | Vision Energy",
      seoDescription: "Low-resistance earthing grids and chemical earth enhancement systems for industrial facilities.",
      content: {
        image: "https://plus.unsplash.com/premium_photo-1682148175448-8e418fcfbaa7?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        imageAlt: "Earthing & Grounding System Design & Installation",
        hero: {
          imageUrl: "https://plus.unsplash.com/premium_photo-1682148175448-8e418fcfbaa7?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          imageAlt: "Earthing & Grounding System Design & Installation",
          lead: "Low-resistance earthing grids, chemical earth enhancement, and deep well earth electrodes.",
        },
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
      slug: "manpower-supply",
      title: "Specialist Engineering Manpower Supply",
      summary:
        "Certified electrical, mechanical, and solar technicians, site engineers, and installers for project execution across UAE.",
      icon: "users",
      metaChips: ["Specialist Manpower", "Technical Support"],
      status: ContentStatus.PUBLISHED,
      publishedAt: new Date("2026-01-01T00:00:00Z"),
      sortOrder: 3,
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

  // 2. Seed Product Categories (from FALLBACK_CATEGORIES with PUBLISHED status)
  const categoriesRaw = FALLBACK_CATEGORIES.map((c) => ({
    code: c.code,
    slug: c.slug,
    title: c.title,
    description: c.description,
    families: c.families.split(";").map((f) => f.trim()).filter(Boolean),
    sortOrder: c.sortOrder,
  }));

  for (const cat of categoriesRaw) {
    const groupPrefix = cat.code.split("-")[0];
    const groupLabel = GROUP_LABELS[groupPrefix] || groupPrefix;
    const imageUrl = resolveCatalogueImageUrl(cat.code);
    const imageAlt = `${cat.title} (${cat.code})`;

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
        image: imageUrl,
        imageAlt,
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
        image: imageUrl,
        imageAlt,
        status: ContentStatus.PUBLISHED,
        seoTitle: `${cat.title} UAE | Vision Energy`,
        seoDescription: cat.description,
      },
    });
  }
  console.log(`Seeded ${categoriesRaw.length} product categories (upsert).`);

  // SEED CONTENT: Draft content grounded in technical project copy, flagged for client review before live publication.
  const blogPostsData = [
    {
      slug: "conventional-mesh-vs-ese-lightning-protection",
      title: "Conventional Mesh vs ESE Systems for Structural Lightning Protection",
      subheading: "A technical evaluation of Franklin rod mesh arrays versus Early Streamer Emission technology under IEC 62305 and NFC 17-102 standards.",
      content: `Structural lightning protection in the United Arab Emirates requires strict adherence to international safety codes, primarily IEC/BS EN 62305 and NF C 17-102. Given the high-rise architectural landscape and harsh coastal environmental conditions across Abu Dhabi, Dubai, and Ras Al Khaimah, selecting high-grade materials—such as electrolytic copper, stainless steel 316L, and hot-dip galvanized steel—is paramount to ensure long-term structural integrity.

Conventional Franklin rod protection systems rely on Faraday cage principles. They incorporate air terminals, roof conductor mesh, continuous down conductors, test joints, and a coordinated earth termination network. This method is ideal for structures requiring multiple controlled discharge paths for lightning energy.

In contrast, Early Streamer Emission (ESE) technology utilizes an ionized streamer launch mechanism to capture strikes from an elevated position. This significantly extends the protection radius (up to 107 meters depending on the protection level), offering an efficient solution for large open roof areas, warehouses, and complex architectural geometries.

Vision Energy International provides complete engineering support, material supply, site installation, and continuity testing for compliant external lightning protection systems across commercial, industrial, and infrastructure facilities.`,
      coverImage: "/product-catalouge/LP-01.jpeg",
      coverAlt: "Conventional lightning protection mesh installation",
      bodyImage: "/product-catalouge/LP-02.jpeg",
      bodyAlt: "Early Streamer Emission air terminal mast assembly",
      category: "Lightning Protection",
      status: "PUBLISHED" as const,
      publishedAt: new Date("2026-02-15T00:00:00Z"),
    },
    {
      slug: "earthing-and-grounding-fundamentals-high-resistivity-soil",
      title: "Earthing & Grounding Fundamentals for High-Resistivity Soil Conditions",
      subheading: "Designing low-impedance earth termination networks using chemical enhancement materials, deep well electrodes, and exothermic molecular welds.",
      content: `An effective earthing (grounding) system is the backbone of electrical safety for industrial plants, substations, and commercial facilities across the Middle East. It fulfills two essential functions: providing a low-impedance path for fault currents to dissipate safely into earth and stabilizing system neutral voltages during transient disturbances.

Soil resistivity in the UAE varies dramatically between hyper-saline coastal flats and arid, high-resistance inland desert terrain. Relying solely on standard copper earth rods in dry soil often fails to meet the target resistance threshold of under 10 ohms (or under 1 ohm for power substations).

To achieve stable low resistance, Vision Energy utilizes engineered earth enhancement backfills—such as conductive carbon compounds and bentonite clay—that maintain moisture retention and ionic conductivity over time. When combined with molecular exothermic welding, these materials deliver permanent, maintenance-free electrical connections resistant to ground corrosion.

Our specialist engineering team executes soil resistivity testing, earth grid simulation, deep well electrode installation, and certified earth pit resistance verification across Abu Dhabi, Dubai, and the Northern Emirates.`,
      coverImage: "/product-catalouge/ER-01.jpeg",
      coverAlt: "Copper bonded earth rod and chemical backfill installation",
      bodyImage: "/product-catalouge/ER-02.jpeg",
      bodyAlt: "Exothermic molecular weld connection for earth conductors",
      category: "Earthing & Bonding",
      status: "PUBLISHED" as const,
      publishedAt: new Date("2026-03-01T00:00:00Z"),
    },
    {
      slug: "transient-overvoltage-protection-surge-arrester-placement",
      title: "Transient Overvoltage Protection: Coordinated Surge Arrester Placement",
      subheading: "Implementing Type 1, Type 2, and Type 3 surge protection devices across main switchboards and sub-distribution panels.",
      content: `Transient overvoltages resulting from direct or indirect lightning strikes and high-power utility switching operations represent one of the primary causes of premature failure in electronic controllers, automation systems, and building management networks.

Coordinated surge protection requires a cascading multi-stage defense strategy compliant with IEC 61643 standards:

1. Type 1 (Class I) SPDs: Installed at the Main Distribution Board (MDB) service entrance to divert high-energy lightning impulse currents (10/350 µs waveform).
2. Type 2 (Class II) SPDs: Positioned at Sub-Distribution Boards (SMDB/DB) to suppress residual voltage spikes (8/20 µs waveform) induced along internal cabling.
3. Type 3 (Class III) SPDs: Fitted adjacent to sensitive terminal equipment, telecommunications lines, and data infrastructure.

Equipotential bonding bars (MEBB) interconnected with low-impedance down conductors complete the surge mitigation matrix. Vision Energy International supplies and installs certified surge protective devices engineered specifically for regional grid stability requirements.`,
      coverImage: "/product-catalouge/EL-06.jpeg",
      coverAlt: "Type 1 and Type 2 surge protection device array",
      bodyImage: null,
      bodyAlt: null,
      category: "Surge Protection",
      status: "PUBLISHED" as const,
      publishedAt: new Date("2026-03-10T00:00:00Z"),
    },
  ];

  for (const post of blogPostsData) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {
        title: post.title,
        subheading: post.subheading,
        content: post.content,
        coverImage: post.coverImage,
        coverAlt: post.coverAlt,
        bodyImage: post.bodyImage,
        bodyAlt: post.bodyAlt,
        category: post.category,
        status: post.status,
        publishedAt: post.publishedAt,
      },
      create: {
        slug: post.slug,
        title: post.title,
        subheading: post.subheading,
        content: post.content,
        coverImage: post.coverImage,
        coverAlt: post.coverAlt,
        bodyImage: post.bodyImage,
        bodyAlt: post.bodyAlt,
        category: post.category,
        status: post.status,
        publishedAt: post.publishedAt,
      },
    });
  }
  console.log(`Seeded ${blogPostsData.length} blog posts (upsert).`);

  // 4. Seed Product SKUs for all categories (PUBLISHED status)
  for (const cat of categoriesRaw) {
    const groupPrefix = cat.code.split("-")[0];
    const groupLabel = GROUP_LABELS[groupPrefix] || groupPrefix;
    const mainCategory =
      ["LP", "ER", "LT", "CM", "CB", "CT", "EL"].includes(groupPrefix)
        ? "Electrical"
        : ["ME", "HW"].includes(groupPrefix)
        ? "Mechanical"
        : ["EN"].includes(groupPrefix)
        ? "Solar"
        : ["LE", "LPE", "LG", "LH", "LC", "LM", "MO", "LF", "TS", "LS", "WS", "AT"].includes(groupPrefix)
        ? "Laboratory"
        : groupLabel;

    const imageUrl = resolveCatalogueImageUrl(cat.code);
    const imageAlt = `${cat.title} (${cat.code})`;

    await (prisma as any).product.upsert({
      where: { code: cat.code },
      update: {
        title: cat.title,
        description: cat.description,
        includes: cat.families,
        category: mainCategory,
        subcategoryGroup: groupLabel,
        sortOrder: cat.sortOrder,
        status: "PUBLISHED",
        imageUrl,
        imageAlt,
        isPlaceholder: false,
      },
      create: {
        code: cat.code,
        title: cat.title,
        description: cat.description,
        includes: cat.families,
        category: mainCategory,
        subcategoryGroup: groupLabel,
        sortOrder: cat.sortOrder,
        status: "PUBLISHED",
        imageUrl,
        imageAlt,
        isPlaceholder: false,
      },
    });
  }
  console.log(`Seeded ${categoriesRaw.length} product SKUs into Product table (upsert).`);
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
