import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { getPublishedServices, getServiceBySlug } from "@/lib/services/get-services";
import { getPublishedCategoryByCode } from "@/lib/data/products";
import { db } from "@/lib/db";

import ServiceCTAGroup from "@/components/services/ServiceCTAGroup";
import ServiceScrollspy, { NavSection } from "@/components/services/ServiceScrollspy";
import ProcessStepper from "@/components/services/ProcessStepper";
import FAQAccordion from "@/components/services/FAQAccordion";
import ProtectionDiagram from "@/components/home/ProtectionDiagram";
import FinalCTA from "@/components/home/FinalCTA";
import Reveal from "@/components/ui/Reveal";
import HeroLightning from "@/components/HeroLightning";
import ManpowerServiceDetail from "@/components/services/ManpowerServiceDetail";

interface ServiceDetailPageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

async function resolveParams(params: ServiceDetailPageProps["params"]) {
  if (!params) return { slug: "" };
  try {
    if (typeof (params as any).then === "function") {
      return (await params) || { slug: "" };
    }
    return (params as any) || { slug: "" };
  } catch (e) {
    return { slug: "" };
  }
}

export async function generateStaticParams() {
  try {
    const publishedServices = await getPublishedServices();
    return publishedServices.map((service) => ({
      slug: service.slug,
    }));
  } catch {
    return [];
  }
}

const SYSTEM_MODULE_MEDIA: Record<
  string,
  {
    eyebrow: string;
    body: string;
    image: string;
    caption: string;
  }
> = {
  "Conventional Mesh / Faraday Cage Systems": {
    eyebrow: "EXTERNAL PROTECTION",
    body: "For buildings requiring multiple controlled paths for lightning energy, Vision Energy provides conventional protection using air terminals, roof conductor mesh, connected down conductors, test joints and a coordinated earthing network.",
    image: "/images/conventional-mesh-faraday-cage-system.png",
    caption:
      "Conventional mesh system: air terminals, roof mesh, continuous down conductors, test joints and earth pits.",
  },
  "ESE Coverage Concept": {
    eyebrow: "EXTERNAL PROTECTION",
    body: "For suitable structures, an ESE terminal can be incorporated into a complete external lightning protection solution. The terminal is installed on a mast above the highest protected plane, with PVC-covered copper down conductors, test points, equipotential bonding and a dedicated lightning earthing system. Protection coverage is confirmed through the final engineering assessment, installation height and applicable standards.",
    image: "/images/ese-coverage-concept.png",
    caption:
      "ESE coverage concept: protected volume, PVC-covered copper down conductors and dedicated earth pits.",
  },
};

function getSystemModuleMedia(title: string) {
  if (!title) return null;
  const key = Object.keys(SYSTEM_MODULE_MEDIA).find(
    (k) =>
      k.toLowerCase().trim() === title.toLowerCase().trim() ||
      title.toLowerCase().includes(k.toLowerCase()) ||
      k.toLowerCase().includes(title.toLowerCase())
  );
  return key ? SYSTEM_MODULE_MEDIA[key] : null;
}

export const dynamicParams = true;
export const revalidate = 300;

export async function generateMetadata({ params }: ServiceDetailPageProps) {
  const { slug } = await resolveParams(params);
  const service = await getServiceBySlug(slug);

  if (!service) {
    return { title: "Service Not Found" };
  }

  const content = service.content || {};
  let pageTitle = `${service.title} | Vision Energy International`;
  let pageDesc = service.summary;

  if (slug === "external-lightning-protection-installation") {
    pageTitle = "External Lightning Protection Installation UAE | Vision Energy International";
    if (content.heroLead) {
      pageDesc = content.heroLead;
    }
  } else if (slug === "manpower-supply" || slug === "specialist-engineering-manpower-supply") {
    pageTitle = "Specialist Engineering Manpower Supply UAE";
    pageDesc = "Skilled electrical, mechanical and solar manpower for engineering and installation projects across the UAE. Rapid mobilization with certified tools, testing equipment and PPE.";
  }

  return {
    title: pageTitle,
    description: pageDesc,
    alternates: {
      canonical: `https://www.visionenergyme.com/services/${slug}`,
    },
    openGraph: {
      title: pageTitle,
      description: pageDesc,
      url: `https://www.visionenergyme.com/services/${slug}`,
      type: "article",
    },
  };
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await resolveParams(params);
  const service = await getServiceBySlug(slug);

  // STRICT RULE: Unknown or unpublished services must check redirect then 404
  if (!service) {
    const fromPath = `/services/${slug}`;
    try {
      const redirectRow = await db.slugRedirect.findUnique({ where: { fromPath } });
      if (redirectRow) {
        redirect(redirectRow.toPath);
      }
    } catch (err) {
      console.error("Slug redirect query error:", err);
    }
    notFound();
  }

  const content = service.content || {};

  // DEDICATED DATA-DRIVEN VIEW FOR MANPOWER SUPPLY SERVICE
  if (
    slug === "manpower-supply" ||
    slug === "specialist-engineering-manpower-supply" ||
    Boolean(content.manpowerWeSupply)
  ) {
    return <ManpowerServiceDetail service={service} content={content} />;
  }

  // DEDICATED VIEW FOR EXTERNAL LIGHTNING PROTECTION INSTALLATION
  // Renders exclusively the content & images uploaded by the client
  if (slug === "external-lightning-protection-installation") {
    return (
      <div className="w-full bg-[#050608] text-white">
        {/* HEADER SECTION */}
        <section className="relative overflow-hidden bg-[#050608] pt-[calc(var(--header-offset,0px)+40px)] lg:pt-[calc(var(--header-offset,0px)+64px)] pb-12 lg:pb-16 border-b border-white/10">
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#8DC63F_1px,transparent_1px)] [background-size:24px_24px]" />

          {/* Thunder Lightning Animation */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden z-0" aria-hidden="true">
            <HeroLightning
              hue={210}
              speed={0.7}
              intensity={0.9}
              boltPosition={0.8}
              opacityClass="opacity-60 lg:opacity-85"
            />
          </div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-[13px] text-[#A9B4C0]">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true" className="opacity-40">/</li>
                <li>
                  <Link href="/services" className="hover:text-white transition-colors">
                    Services
                  </Link>
                </li>
                <li aria-hidden="true" className="opacity-40">/</li>
                <li className="text-white font-medium truncate" aria-current="page">
                  External Lightning Protection Installation
                </li>
              </ol>
            </nav>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-3">
                <span className="text-xs font-semibold text-[#8DC63F] uppercase tracking-widest block">
                  Vision Energy International · Specialist Engineering
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase">
                  External Lightning Protection Installation
                </h1>
              </div>

              <div className="shrink-0">
                <ServiceCTAGroup serviceTitle={service.title} serviceSlug={service.slug} />
              </div>
            </div>
          </div>
        </section>

        {/* UPLOADED CONTENT: ONE UNIFIED PRESENTATION CONTAINER */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          <section className="bg-[#0D1117] border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl space-y-10">
            {/* Unified Top Header Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center px-3 py-1 rounded bg-[#F39C12]/15 border border-[#F39C12]/30 text-[#F39C12] text-xs font-bold tracking-wider uppercase">
                  EXTERNAL PROTECTION
                </span>
                <span className="text-xs text-gray-400 font-medium hidden sm:inline-block">
                  Engineered Protection Solutions
                </span>
              </div>
              <span className="text-[11px] sm:text-xs font-mono font-medium tracking-wider text-[#A9B4C0] uppercase">
                VISION ENERGY INTERNATIONAL | EARTHING &amp; LIGHTNING PROTECTION
              </span>
            </div>

            {/* Two Complementary Systems Side by Side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
              {/* System 1: Conventional Mesh / Faraday Cage Systems */}
              <div className="flex flex-col space-y-6">
                <div className="space-y-3">
                  <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    Conventional Mesh / Faraday Cage Systems
                  </h2>
                  <p className="text-sm sm:text-base text-slate-700 dark:text-[#C9D1D9] leading-relaxed">
                    For buildings requiring multiple controlled paths for lightning energy, Vision Energy provides conventional protection using air terminals, roof conductor mesh, connected down conductors, test joints and a coordinated earthing network.
                  </p>
                </div>

                <div className="space-y-3 pt-2 mt-auto">
                  <div className="relative w-full aspect-[16/9.8] rounded-xl sm:rounded-2xl overflow-hidden bg-[#050608] border border-white/10 shadow-xl">
                    <Image
                      src="/images/conventional-mesh-faraday-cage-system.png"
                      alt="Conventional Mesh / Faraday Cage Systems"
                      fill
                      sizes="(max-width: 1024px) 100vw, 550px"
                      className="object-cover object-center"
                      priority
                    />
                  </div>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-gray-200 leading-relaxed italic px-1">
                    Conventional mesh system: air terminals, roof mesh, continuous down conductors, test joints and earth pits.
                  </p>
                </div>
              </div>

              {/* System 2: ESE Coverage Concept */}
              <div className="flex flex-col space-y-6 lg:pl-10 lg:border-l lg:border-white/10 pt-8 lg:pt-0 border-t lg:border-t-0 border-white/10">
                <div className="space-y-3">
                  <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    ESE Coverage Concept
                  </h2>
                  <p className="text-sm sm:text-base text-slate-700 dark:text-[#C9D1D9] leading-relaxed">
                    For suitable structures, an ESE terminal can be incorporated into a complete external lightning protection solution. The terminal is installed on a mast above the highest protected plane, with PVC-covered copper down conductors, test points, equipotential bonding and a dedicated lightning earthing system. Protection coverage is confirmed through the final engineering assessment, installation height and applicable standards.
                  </p>
                </div>

                <div className="space-y-3 pt-2 mt-auto">
                  <div className="relative w-full aspect-[16/9.8] rounded-xl sm:rounded-2xl overflow-hidden bg-[#050608] border border-white/10 shadow-xl">
                    <Image
                      src="/images/ese-coverage-concept.png"
                      alt="ESE Coverage Concept"
                      fill
                      sizes="(max-width: 1024px) 100vw, 550px"
                      className="object-cover object-center"
                      priority
                    />
                  </div>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-gray-200 leading-relaxed italic px-1">
                    ESE coverage concept: protected volume, PVC-covered copper down conductors and dedicated earth pits.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>

        <FinalCTA bgClass="bg-[#050608]" />
      </div>
    );
  }

  const metaChips = content.metaChips || [];

  const headerH1 =
    slug === "external-lightning-protection-installation"
      ? "External Lightning Protection Installation in the UAE"
      : service.title;

  const leadText = content.heroLead || content.hero?.lead || service.summary;

  // Resolve related categories from database
  const relatedCodes: string[] = content.relatedCategoryCodes || [];
  const relatedCategoriesRaw = await Promise.all(
    relatedCodes.map((code) => getPublishedCategoryByCode(code))
  );
  const relatedCategories = relatedCategoriesRaw.filter(Boolean);

  // Confirmed process steps (unconfirmed filtered out by data layer)
  const confirmedProcessSteps = (content.process || []).filter((s: any) => s.confirmed !== false);

  // Build Scrollspy sections
  const navSections: NavSection[] = [];
  if (content.overview) navSections.push({ id: "overview", label: "Overview" });
  if (content.systems && content.systems.length > 0) navSections.push({ id: "systems", label: "Systems" });
  if (slug === "external-lightning-protection-installation") navSections.push({ id: "visual", label: "Visual System" });
  if (content.whereWeInstall && content.whereWeInstall.length > 0) navSections.push({ id: "where-we-install", label: "Where We Install" });
  if (confirmedProcessSteps.length > 0) navSections.push({ id: "process", label: "Process" });
  if (content.standards && content.standards.length > 0) navSections.push({ id: "standards", label: "Standards" });
  if (relatedCategories.length > 0) navSections.push({ id: "related-products", label: "Related Products" });
  if (content.faq && content.faq.length > 0) navSections.push({ id: "faq", label: "FAQ" });

  return (
    <div className="w-full bg-[#050608] text-white">
      {/* HEADER SECTION */}
      <section className="relative overflow-hidden bg-[#050608] pt-[calc(var(--header-offset,0px)+40px)] lg:pt-[calc(var(--header-offset,0px)+72px)] pb-16 lg:pb-24 border-b border-white/10">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#8DC63F_1px,transparent_1px)] [background-size:24px_24px]" />
        
        {/* Thunder Lightning Animation in Service Detail Hero */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden z-0" aria-hidden="true">
          <HeroLightning
            hue={210}
            speed={0.7}
            intensity={0.9}
            boltPosition={0.8}
            opacityClass="opacity-60 lg:opacity-85"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <nav aria-label="Breadcrumb" className="mb-2">
            <ol className="flex items-center gap-2 text-[13px] text-[#A9B4C0]">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="opacity-40">/</li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li aria-hidden="true" className="opacity-40">/</li>
              <li className="text-white font-medium truncate max-w-[24ch]" aria-current="page">
                {service.title}
              </li>
            </ol>
          </nav>

          {metaChips.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {metaChips.map((chip: string, i: number) => (
                <span key={i} className="px-3 py-1 bg-[#8DC63F]/10 text-[#8DC63F] border border-[#8DC63F]/30 rounded-full text-xs font-semibold">
                  {chip}
                </span>
              ))}
            </div>
          )}

          <h1 className="text-[clamp(2.25rem,5vw,3.75rem)] font-semibold text-white leading-[1.08] tracking-[-0.02em] max-w-[32ch]">
            {headerH1}
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-[#A9B4C0] leading-relaxed max-w-[54ch]">
            {leadText}
          </p>

          <div className="pt-4">
            <ServiceCTAGroup serviceTitle={service.title} serviceSlug={service.slug} />
          </div>
        </div>
      </section>

      {/* MAIN CONTENT + STICKY SIDEBAR CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] xl:grid-cols-[1fr_320px] gap-10 lg:gap-14 items-start">

          {/* LEFT: CONTENT SECTIONS */}
          <div className="min-w-0 space-y-14 lg:space-y-18">
            {content.overview && (
              <section id="overview" className="scroll-mt-28 space-y-4">
                <span className="text-xs font-semibold text-[#8DC63F] uppercase tracking-widest block">Overview</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">System Concept & Scope</h2>
                <p className="text-base sm:text-lg text-[#A9B4C0] leading-relaxed">{content.overview}</p>
              </section>
            )}

            {content.systems && content.systems.length > 0 && (
              <section id="systems" className="scroll-mt-28 space-y-6">
                <div className="space-y-1.5">
                  <span className="text-xs font-semibold text-[#8DC63F] uppercase tracking-widest block">Systems</span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">Protection Network Modules</h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {content.systems.map((sys: any, idx: number) => {
                    const media = getSystemModuleMedia(sys.title);
                    return (
                      <div
                        key={idx}
                        className="group flex flex-col p-6 sm:p-7 bg-[#0D1117] border border-white/10 hover:border-[#8DC63F]/40 rounded-2xl transition-all duration-300 space-y-4"
                      >
                        {media?.eyebrow && (
                          <div className="inline-flex items-center self-start px-2.5 py-1 rounded bg-[#F39C12]/15 border border-[#F39C12]/30 text-[#F39C12] text-[11px] font-bold tracking-wider uppercase">
                            {media.eyebrow}
                          </div>
                        )}

                        <div className="space-y-2">
                          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                            {sys.title}
                          </h3>
                          <p className="text-sm text-[#A9B4C0] leading-relaxed">
                            {media?.body || sys.body}
                          </p>
                        </div>

                        {media?.image && (
                          <div className="space-y-2.5 pt-1">
                            <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-[#050608] border border-white/10 group-hover:border-[#8DC63F]/30 transition-all duration-300">
                              <Image
                                src={media.image}
                                alt={sys.title}
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                              />
                            </div>
                            {media.caption && (
                              <p className="text-xs text-[#9BA3AF] leading-relaxed italic px-0.5">
                                {media.caption}
                              </p>
                            )}
                          </div>
                        )}

                        {sys.points && sys.points.length > 0 && (
                          <ul className="space-y-2 pt-3 border-t border-white/10 text-xs text-gray-300 mt-auto">
                            {sys.points.map((pt: string, pIdx: number) => (
                              <li key={pIdx} className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-[#8DC63F] shrink-0" />
                                <span>{pt}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {slug === "external-lightning-protection-installation" && (
              <section id="visual" className="scroll-mt-28 space-y-4">
                <span className="text-xs font-semibold text-[#8DC63F] uppercase tracking-widest block">Interactive Schematic</span>
                <ProtectionDiagram />
              </section>
            )}

            {content.whereWeInstall && content.whereWeInstall.length > 0 && (
              <section id="where-we-install" className="scroll-mt-28 space-y-5">
                <span className="text-xs font-semibold text-[#8DC63F] uppercase tracking-widest block">Deployment</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">Where We Install</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {content.whereWeInstall.map((item: string, i: number) => (
                    <div key={i} className="p-4 bg-[#0D1117] border border-white/10 rounded-xl flex items-center gap-3">
                      <Check className="w-4 h-4 text-[#8DC63F] shrink-0" />
                      <span className="text-xs sm:text-sm text-gray-200 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {confirmedProcessSteps.length > 0 && (
              <section id="process" className="scroll-mt-28 space-y-6">
                <span className="text-xs font-semibold text-[#8DC63F] uppercase tracking-widest block">Workflow</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">Execution Process</h2>
                <ProcessStepper steps={confirmedProcessSteps} />
              </section>
            )}

            {content.standards && content.standards.length > 0 && (
              <section id="standards" className="scroll-mt-28 space-y-5">
                <span className="text-xs font-semibold text-[#8DC63F] uppercase tracking-widest block">Compliance</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">Applicable Standards & Certifications</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {content.standards.map((std: string, i: number) => (
                    <div key={i} className="p-4 bg-[#0D1117] border border-white/10 rounded-xl flex items-center gap-3">
                      <Check className="w-4 h-4 text-[#8DC63F] shrink-0" />
                      <span className="text-xs sm:text-sm text-gray-200 font-medium">{std}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {relatedCategories.length > 0 && (
              <section id="related-products" className="scroll-mt-28 space-y-5">
                <span className="text-xs font-semibold text-[#8DC63F] uppercase tracking-widest block">Products</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">Related Product Categories</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedCategories.map((cat: any) => (
                    <Link
                      key={cat.id}
                      href={`/products/${cat.slug}`}
                      className="p-5 bg-[#0D1117] border border-white/10 hover:border-[#8DC63F]/50 rounded-2xl space-y-2 block group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#8DC63F]/5"
                    >
                      <span className="text-xs font-mono font-bold text-[#8DC63F]">{cat.code}</span>
                      <h3 className="text-base font-bold text-white group-hover:text-[#8DC63F] transition-colors">
                        {cat.title}
                      </h3>
                      <p className="text-xs text-gray-400 line-clamp-2">{cat.description}</p>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {content.faq && content.faq.length > 0 && (
              <section id="faq" className="scroll-mt-28 space-y-5">
                <span className="text-xs font-semibold text-[#8DC63F] uppercase tracking-widest block">Support</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">Frequently Asked Questions</h2>
                <FAQAccordion items={content.faq} />
              </section>
            )}
          </div>

          {/* RIGHT: STICKY SCROLLSPY SIDEBAR */}
          {navSections.length > 0 && (
            <div className="hidden lg:block sticky top-28 self-start">
              <ServiceScrollspy sections={navSections} serviceSlug={service.slug} serviceTitle={service.title} />
            </div>
          )}

        </div>
      </div>

      <FinalCTA bgClass="bg-[#050608]" />
    </div>
  );
}
