import React from "react";
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
  } else if (slug === "manpower-supply") {
    pageTitle = "Manpower Services UAE | Vision Energy International";
    pageDesc = "Manpower services from Vision Energy International for engineering and installation projects across the UAE.";
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
    const redirectRow = await db.slugRedirect.findUnique({ where: { fromPath } });
    if (redirectRow) {
      redirect(redirectRow.toPath);
    }
    notFound();
  }

  const content = service.content || {};
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

      {/* Sticky Scrollspy Navigation */}
      {navSections.length > 0 && (
        <ServiceScrollspy sections={navSections} serviceSlug={service.slug} serviceTitle={service.title} />
      )}

      {/* CONTENT SECTIONS */}
      <div className="divide-y divide-white/10">
        {content.overview && (
          <section id="overview" className="bg-[#0D1117] py-16 lg:py-20 scroll-mt-[calc(var(--header-offset,0px)+56px)]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
              <span className="text-xs font-semibold text-[#8DC63F] uppercase tracking-widest block">Overview</span>
              <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">System Concept & Scope</h2>
              <p className="text-base sm:text-lg text-[#A9B4C0] leading-relaxed">{content.overview}</p>
            </div>
          </section>
        )}

        {content.systems && content.systems.length > 0 && (
          <section id="systems" className="bg-[#050608] py-16 lg:py-20 scroll-mt-[calc(var(--header-offset,0px)+56px)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <div className="space-y-2">
                <span className="text-xs font-semibold text-[#8DC63F] uppercase tracking-widest block">Systems</span>
                <h2 className="text-2xl sm:text-3xl font-semibold text-white">Protection Network Modules</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {content.systems.map((sys: any, idx: number) => (
                  <div key={idx} className="p-6 bg-[#0D1117] border border-white/10 rounded-2xl space-y-4">
                    <h3 className="text-xl font-bold text-white">{sys.title}</h3>
                    <p className="text-sm text-[#A9B4C0] leading-relaxed">{sys.body}</p>
                    {sys.points && sys.points.length > 0 && (
                      <ul className="space-y-2 pt-2 border-t border-white/10 text-xs text-gray-300">
                        {sys.points.map((pt: string, pIdx: number) => (
                          <li key={pIdx} className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-[#8DC63F] shrink-0" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {slug === "external-lightning-protection-installation" && (
          <section id="visual" className="bg-[#0D1117] py-16 lg:py-20 scroll-mt-[calc(var(--header-offset,0px)+56px)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ProtectionDiagram />
            </div>
          </section>
        )}

        {content.whereWeInstall && content.whereWeInstall.length > 0 && (
          <section id="where-we-install" className="bg-[#050608] py-16 lg:py-20 scroll-mt-[calc(var(--header-offset,0px)+56px)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              <span className="text-xs font-semibold text-[#8DC63F] uppercase tracking-widest block">Deployment</span>
              <h2 className="text-2xl sm:text-3xl font-semibold text-white">Where We Install</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {content.whereWeInstall.map((item: string, i: number) => (
                  <div key={i} className="p-4 bg-[#0D1117] border border-white/10 rounded-xl flex items-center gap-3">
                    <Check className="w-4 h-4 text-[#8DC63F] shrink-0" />
                    <span className="text-xs text-gray-200 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {confirmedProcessSteps.length > 0 && (
          <section id="process" className="bg-[#0D1117] py-16 lg:py-20 scroll-mt-[calc(var(--header-offset,0px)+56px)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <span className="text-xs font-semibold text-[#8DC63F] uppercase tracking-widest block">Workflow</span>
              <h2 className="text-2xl sm:text-3xl font-semibold text-white">Execution Process</h2>
              <ProcessStepper steps={confirmedProcessSteps} />
            </div>
          </section>
        )}

        {relatedCategories.length > 0 && (
          <section id="related-products" className="bg-[#050608] py-16 lg:py-20 scroll-mt-[calc(var(--header-offset,0px)+56px)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              <span className="text-xs font-semibold text-[#8DC63F] uppercase tracking-widest block">Products</span>
              <h2 className="text-2xl sm:text-3xl font-semibold text-white">Related Product Categories</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {relatedCategories.map((cat: any) => (
                  <Link
                    key={cat.id}
                    href={`/products/${cat.slug}`}
                    className="p-5 bg-[#0D1117] border border-white/10 hover:border-[#8DC63F]/50 rounded-2xl space-y-2 block group transition-all"
                  >
                    <span className="text-xs font-mono font-bold text-[#8DC63F]">{cat.code}</span>
                    <h3 className="text-base font-bold text-white group-hover:text-[#8DC63F] transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-gray-400 line-clamp-2">{cat.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {content.faq && content.faq.length > 0 && (
          <section id="faq" className="bg-[#0D1117] py-16 lg:py-20 scroll-mt-[calc(var(--header-offset,0px)+56px)]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              <span className="text-xs font-semibold text-[#8DC63F] uppercase tracking-widest block">Support</span>
              <h2 className="text-2xl sm:text-3xl font-semibold text-white">Frequently Asked Questions</h2>
              <FAQAccordion items={content.faq} />
            </div>
          </section>
        )}
      </div>

      <FinalCTA bgClass="bg-[#050608]" />
    </div>
  );
}
