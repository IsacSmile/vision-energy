"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import FormShell from "./FormShell";
import SeoPanel from "./SeoPanel";
import { showToast } from "./Toast";
import { Plus, Trash2, X, MoveUp, MoveDown, Check, HelpCircle, AlertCircle } from "lucide-react";

interface ServiceFormProps {
  initialData?: any;
  id?: string;
}

export default function ServiceForm({ initialData, id }: ServiceFormProps) {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<"basics" | "hero" | "systems" | "process" | "lists" | "faq" | "seo">("basics");

  // Form State
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(Boolean(initialData?.slug));
  const [summary, setSummary] = useState(initialData?.summary || "");
  const [icon, setIcon] = useState(initialData?.icon || "zap");
  const [metaChips, setMetaChips] = useState<string[]>(initialData?.metaChips || []);
  const [chipInput, setChipInput] = useState("");
  const [sortOrder, setSortOrder] = useState<number>(initialData?.sortOrder ?? 1);
  const [status, setStatus] = useState<"DRAFT" | "PUBLISHED">(initialData?.status || "DRAFT");
  const [seoTitle, setSeoTitle] = useState(initialData?.seoTitle || "");
  const [seoDescription, setSeoDescription] = useState(initialData?.seoDescription || "");

  // Content JSON sub-fields
  const content = initialData?.content || {};
  const [heroLead, setHeroLead] = useState(content.heroLead || content.hero?.lead || "");
  const [overview, setOverview] = useState(content.overview || "");

  const [systems, setSystems] = useState<Array<{ title: string; body: string; points: string[] }>>(
    content.systems || []
  );
  const [included, setIncluded] = useState<string[]>(content.included || []);
  const [whereWeInstall, setWhereWeInstall] = useState<string[]>(content.whereWeInstall || []);

  const [processSteps, setProcessSteps] = useState<Array<{ title: string; description: string; confirmed: boolean }>>(
    content.process || []
  );

  const [standards, setStandards] = useState<string[]>(content.standards || []);
  const [complianceNote, setComplianceNote] = useState(content.complianceNote || "");
  const [faq, setFaq] = useState<Array<{ q: string; a: string }>>(content.faq || []);
  const [relatedCategoryCodes, setRelatedCategoryCodes] = useState<string[]>(content.relatedCategoryCodes || []);

  const [allCategories, setAllCategories] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Fetch available published categories for related categories select
  useEffect(() => {
    fetch("/api/admin/products?limit=100")
      .then((res) => res.json())
      .then((data) => setAllCategories(data.items || []))
      .catch(() => {});
  }, []);

  // Auto generate slug from title
  useEffect(() => {
    if (!slugManuallyEdited && title) {
      const generated = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")
        .substring(0, 80);
      setSlug(generated);
    }
  }, [title, slugManuallyEdited]);

  const handleAddChip = () => {
    if (!chipInput.trim()) return;
    if (!metaChips.includes(chipInput.trim())) {
      setMetaChips((prev) => [...prev, chipInput.trim()]);
      setIsDirty(true);
    }
    setChipInput("");
  };

  const handleAddSystem = () => {
    setSystems((prev) => [...prev, { title: "New System Component", body: "", points: [] }]);
    setIsDirty(true);
  };

  const handleAddProcessStep = () => {
    setProcessSteps((prev) => [
      ...prev,
      { title: "New Process Step", description: "", confirmed: false },
    ]);
    setIsDirty(true);
  };

  const handleAddFaq = () => {
    setFaq((prev) => [...prev, { q: "", a: "" }]);
    setIsDirty(true);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!title || title.length < 3) newErrors.title = "Title must be at least 3 characters";
    if (!slug || slug.length < 3) newErrors.slug = "Slug must be at least 3 characters";
    if (!summary || summary.length < 10) newErrors.summary = "Summary must be at least 10 characters";
    if (!heroLead) newErrors.heroLead = "Hero lead text is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitForm = async (targetStatus: "DRAFT" | "PUBLISHED") => {
    if (!validate()) {
      showToast("Please fix validation errors before saving", "error");
      return;
    }

    setIsSubmitting(true);
    try {
      const formattedContent = {
        heroLead,
        overview,
        systems,
        included,
        whereWeInstall,
        process: processSteps,
        standards,
        complianceNote,
        faq,
        relatedCategoryCodes,
      };

      const payload = {
        title,
        slug,
        summary,
        icon,
        metaChips,
        sortOrder: Number(sortOrder),
        status: targetStatus,
        seoTitle: seoTitle || null,
        seoDescription: seoDescription || null,
        content: formattedContent,
        updatedAt: initialData?.updatedAt,
      };

      const url = id ? `/api/admin/services/${id}` : "/api/admin/services";
      const method = id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (!res.ok) {
        if (res.status === 409) {
          throw new Error("changed elsewhere");
        }
        showToast(json.error || "Save failed", "error");
        return;
      }

      showToast(`Service scope saved as ${targetStatus}`, "success");
      setIsDirty(false);
      router.push("/admin/services");
      router.refresh();
    } catch (err: any) {
      if (err.message === "changed elsewhere") throw err;
      showToast("Failed to save service scope", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const tabButtons = [
    { id: "basics", label: "Basics" },
    { id: "hero", label: "Hero & Overview" },
    { id: "systems", label: "Systems" },
    { id: "process", label: "Process Steps" },
    { id: "lists", label: "Scope & Install" },
    { id: "faq", label: "FAQ & Related" },
    { id: "seo", label: "SEO" },
  ];

  return (
    <FormShell
      title={id ? `Edit Service: ${title}` : "New Service Scope"}
      type="service"
      id={id}
      status={status}
      updatedAt={initialData?.updatedAt}
      isDirty={isDirty}
      isSubmitting={isSubmitting}
      errors={errors}
      requirePublishConfirmation={true}
      onSaveDraft={() => submitForm("DRAFT")}
      onPublish={() => submitForm("PUBLISHED")}
    >
      {/* Desktop Tabs / Mobile Navigation Bar */}
      <div className="flex border-b border-[#1F2937] gap-2 overflow-x-auto pb-px">
        {tabButtons.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`py-2.5 px-4 text-xs font-bold border-b-2 rounded-t-xl transition-colors shrink-0 min-h-[44px] ${
              activeTab === tab.id
                ? "border-[#A3E635] text-[#A3E635] bg-[#A3E635]/10"
                : "border-transparent text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Basics */}
      {activeTab === "basics" && (
        <div className="bg-[#0D1117] border border-[#1F2937] p-5 rounded-xl space-y-4">
          <h3 className="text-sm font-bold text-white border-b border-[#1F2937] pb-3">Basic Information</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1 sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-300">
                Service Title <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setIsDirty(true);
                }}
                placeholder="External Lightning Protection Installation"
                className="w-full bg-[#050608] border border-[#1F2937] text-white text-xs rounded-xl px-3 py-2.5 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-[#A3E635]"
              />
              {errors.title && <p className="text-[11px] text-red-400">{errors.title}</p>}
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-300">
                URL Slug <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => {
                  setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"));
                  setSlugManuallyEdited(true);
                  setIsDirty(true);
                }}
                placeholder="external-lightning-protection-installation"
                className="w-full bg-[#050608] border border-[#1F2937] text-white text-xs font-mono rounded-xl px-3 py-2.5 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-[#A3E635]"
              />
              {errors.slug && <p className="text-[11px] text-red-400 font-mono">{errors.slug}</p>}
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-300">
                Summary (Listing Subtitle) <span className="text-red-400">*</span>
              </label>
              <textarea
                rows={2}
                value={summary}
                onChange={(e) => {
                  setSummary(e.target.value);
                  setIsDirty(true);
                }}
                placeholder="Complete structural lightning protection system design, supply, and installation..."
                className="w-full bg-[#050608] border border-[#1F2937] text-white text-xs rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#A3E635] resize-none"
              />
              {errors.summary && <p className="text-[11px] text-red-400">{errors.summary}</p>}
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-gray-300">Lucide Icon Key</label>
              <select
                value={icon}
                onChange={(e) => {
                  setIcon(e.target.value);
                  setIsDirty(true);
                }}
                className="w-full bg-[#050608] border border-[#1F2937] text-white text-xs rounded-xl px-3 py-2.5 min-h-[44px]"
              >
                <option value="zap">zap (Lightning Bolt)</option>
                <option value="users">users (Manpower & Personnel)</option>
                <option value="shield">shield (Earthing & Protection)</option>
                <option value="activity">activity (Surge & Pulse)</option>
                <option value="wrench">wrench (Engineering Maintenance)</option>
                <option value="bolt">bolt (High Voltage)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-gray-300">Sort Order</label>
              <input
                type="number"
                value={sortOrder}
                onChange={(e) => {
                  setSortOrder(parseInt(e.target.value, 10) || 0);
                  setIsDirty(true);
                }}
                className="w-full bg-[#050608] border border-[#1F2937] text-white text-xs font-mono rounded-xl px-3 py-2.5 min-h-[44px]"
              />
            </div>
          </div>

          {/* Meta Chips */}
          <div className="space-y-2 pt-2 border-t border-[#1F2937]">
            <label className="block text-xs font-semibold text-gray-300">Meta Chips (Key Features Badges)</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={chipInput}
                onChange={(e) => setChipInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddChip();
                  }
                }}
                placeholder="e.g. Conventional mesh systems"
                className="flex-1 bg-[#050608] border border-[#1F2937] text-white text-xs rounded-xl px-3 py-2 min-h-[44px]"
              />
              <button
                type="button"
                onClick={handleAddChip}
                className="px-4 py-2 bg-[#0B65B3] text-white text-xs font-bold rounded-xl min-h-[44px]"
              >
                Add Chip
              </button>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {metaChips.map((chip, i) => (
                <span key={i} className="inline-flex items-center gap-1 px-3 py-1 bg-[#050608] border border-[#1F2937] rounded-xl text-xs text-gray-300">
                  <span>{chip}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setMetaChips((prev) => prev.filter((_, idx) => idx !== i));
                      setIsDirty(true);
                    }}
                    className="p-1 text-gray-400 hover:text-red-400 min-h-[44px] min-w-[44px] flex items-center justify-center -mr-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Hero & Overview */}
      {activeTab === "hero" && (
        <div className="bg-[#0D1117] border border-[#1F2937] p-5 rounded-xl space-y-4">
          <h3 className="text-sm font-bold text-white border-b border-[#1F2937] pb-3">Hero & Executive Overview</h3>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-gray-300">
              Hero Lead Text <span className="text-red-400">*</span>
            </label>
            <textarea
              rows={3}
              value={heroLead}
              onChange={(e) => {
                setHeroLead(e.target.value);
                setIsDirty(true);
              }}
              placeholder="Installation of external lightning protection systems for commercial buildings..."
              className="w-full bg-[#050608] border border-[#1F2937] text-white text-xs rounded-xl p-3 min-h-[80px] focus:outline-none focus:ring-2 focus:ring-[#A3E635] resize-none"
            />
            {errors.heroLead && <p className="text-[11px] text-red-400">{errors.heroLead}</p>}
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-gray-300">Full Overview Narrative</label>
            <textarea
              rows={6}
              value={overview}
              onChange={(e) => {
                setOverview(e.target.value);
                setIsDirty(true);
              }}
              placeholder="A lightning protection system is not simply a lightning rod on a roof. It is a complete engineered network..."
              className="w-full bg-[#050608] border border-[#1F2937] text-white text-xs rounded-xl p-3 min-h-[140px] focus:outline-none focus:ring-2 focus:ring-[#A3E635] leading-relaxed"
            />
          </div>
        </div>
      )}

      {/* Tab 3: Systems (Repeatable) */}
      {activeTab === "systems" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">System Component Modules</h3>
            <button
              type="button"
              onClick={handleAddSystem}
              className="px-3 py-2 bg-[#A3E635] text-[#050608] font-bold text-xs rounded-xl flex items-center gap-1 min-h-[44px]"
            >
              <Plus className="w-4 h-4" />
              <span>Add System Module</span>
            </button>
          </div>

          {systems.map((sys, idx) => (
            <div key={idx} className="bg-[#0D1117] border border-[#1F2937] p-5 rounded-xl space-y-3">
              <div className="flex items-center justify-between border-b border-[#1F2937] pb-2">
                <span className="font-mono text-xs font-bold text-[#A3E635]">Module #{idx + 1}</span>
                <button
                  type="button"
                  onClick={() => {
                    setSystems((prev) => prev.filter((_, i) => i !== idx));
                    setIsDirty(true);
                  }}
                  className="p-1 text-red-400 hover:text-red-300 min-h-[44px] min-w-[44px] flex items-center justify-center"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-1">
                <label className="block text-[11px] font-semibold text-gray-400">System Title</label>
                <input
                  type="text"
                  value={sys.title}
                  onChange={(e) => {
                    const updated = [...systems];
                    updated[idx].title = e.target.value;
                    setSystems(updated);
                    setIsDirty(true);
                  }}
                  className="w-full bg-[#050608] border border-[#1F2937] text-white text-xs rounded-xl px-3 py-2 min-h-[44px]"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[11px] font-semibold text-gray-400">Body Description</label>
                <textarea
                  rows={3}
                  value={sys.body}
                  onChange={(e) => {
                    const updated = [...systems];
                    updated[idx].body = e.target.value;
                    setSystems(updated);
                    setIsDirty(true);
                  }}
                  className="w-full bg-[#050608] border border-[#1F2937] text-white text-xs rounded-xl p-3 min-h-[80px] resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[11px] font-semibold text-gray-400">Key Points (Semicolon separated)</label>
                <input
                  type="text"
                  value={Array.isArray(sys.points) ? sys.points.join("; ") : ""}
                  onChange={(e) => {
                    const updated = [...systems];
                    updated[idx].points = e.target.value.split(";").map((s) => s.trim());
                    setSystems(updated);
                    setIsDirty(true);
                  }}
                  placeholder="Air terminals; Roof conductor mesh; Test joints"
                  className="w-full bg-[#050608] border border-[#1F2937] text-white text-xs rounded-xl px-3 py-2 min-h-[44px]"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Process Steps with Confirmed Switch */}
      {activeTab === "process" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 bg-[#0D1117] border border-[#1F2937] rounded-xl">
            <div>
              <h3 className="text-sm font-bold text-white">Execution Process Steps</h3>
              <p className="text-xs text-amber-400 flex items-center gap-1 mt-0.5">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Steps that are not confirmed by client are hidden from the public site.</span>
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddProcessStep}
              className="px-3 py-2 bg-[#A3E635] text-[#050608] font-bold text-xs rounded-xl flex items-center gap-1 min-h-[44px] self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Add Process Step</span>
            </button>
          </div>

          {processSteps.map((step, idx) => (
            <div key={idx} className="bg-[#0D1117] border border-[#1F2937] p-4 rounded-xl space-y-3">
              <div className="flex items-center justify-between border-b border-[#1F2937] pb-2">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-[#A3E635]">Step #{idx + 1}</span>
                  {/* Confirmed Switch */}
                  <label className="flex items-center gap-2 px-3 py-1 bg-[#050608] border border-[#1F2937] rounded-lg cursor-pointer">
                    <input
                      type="checkbox"
                      checked={step.confirmed}
                      onChange={(e) => {
                        const updated = [...processSteps];
                        updated[idx].confirmed = e.target.checked;
                        setProcessSteps(updated);
                        setIsDirty(true);
                      }}
                      className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-[#A3E635]"
                    />
                    <span className={`text-xs font-bold ${step.confirmed ? "text-[#A3E635]" : "text-gray-500"}`}>
                      {step.confirmed ? "Confirmed by Client (Public)" : "Unconfirmed (Hidden Public)"}
                    </span>
                  </label>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setProcessSteps((prev) => prev.filter((_, i) => i !== idx));
                    setIsDirty(true);
                  }}
                  className="p-1 text-red-400 hover:text-red-300 min-h-[44px] min-w-[44px] flex items-center justify-center"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1 sm:col-span-1">
                  <label className="block text-[11px] font-semibold text-gray-400">Step Title</label>
                  <input
                    type="text"
                    value={step.title}
                    onChange={(e) => {
                      const updated = [...processSteps];
                      updated[idx].title = e.target.value;
                      setProcessSteps(updated);
                      setIsDirty(true);
                    }}
                    className="w-full bg-[#050608] border border-[#1F2937] text-white text-xs rounded-xl px-3 py-2 min-h-[44px]"
                  />
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-gray-400">Step Description</label>
                  <input
                    type="text"
                    value={step.description}
                    onChange={(e) => {
                      const updated = [...processSteps];
                      updated[idx].description = e.target.value;
                      setProcessSteps(updated);
                      setIsDirty(true);
                    }}
                    className="w-full bg-[#050608] border border-[#1F2937] text-white text-xs rounded-xl px-3 py-2 min-h-[44px]"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 5: Lists (Included, Where We Install, Standards, Compliance) */}
      {activeTab === "lists" && (
        <div className="space-y-6">
          {/* Included Items */}
          <div className="bg-[#0D1117] border border-[#1F2937] p-5 rounded-xl space-y-3">
            <h3 className="text-sm font-bold text-white">What's Included List</h3>
            <textarea
              rows={4}
              value={included.join("\n")}
              onChange={(e) => {
                setIncluded(e.target.value.split("\n").filter(Boolean));
                setIsDirty(true);
              }}
              placeholder="Enter one item per line..."
              className="w-full bg-[#050608] border border-[#1F2937] text-white text-xs font-mono rounded-xl p-3 min-h-[100px] leading-relaxed"
            />
          </div>

          {/* Where We Install */}
          <div className="bg-[#0D1117] border border-[#1F2937] p-5 rounded-xl space-y-3">
            <h3 className="text-sm font-bold text-white">Where We Install List</h3>
            <textarea
              rows={4}
              value={whereWeInstall.join("\n")}
              onChange={(e) => {
                setWhereWeInstall(e.target.value.split("\n").filter(Boolean));
                setIsDirty(true);
              }}
              placeholder="Enter one facility type per line..."
              className="w-full bg-[#050608] border border-[#1F2937] text-white text-xs font-mono rounded-xl p-3 min-h-[100px] leading-relaxed"
            />
          </div>

          {/* Standards & Compliance */}
          <div className="bg-[#0D1117] border border-[#1F2937] p-5 rounded-xl space-y-4">
            <h3 className="text-sm font-bold text-white">Standards & Compliance Note</h3>
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-gray-300">Applicable Standards (Semicolon separated)</label>
              <input
                type="text"
                value={standards.join("; ")}
                onChange={(e) => {
                  setStandards(e.target.value.split(";").map((s) => s.trim()));
                  setIsDirty(true);
                }}
                placeholder="BS EN 62305; IEC 62305; NFC 17-102"
                className="w-full bg-[#050608] border border-[#1F2937] text-white text-xs rounded-xl px-3 py-2 min-h-[44px]"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-gray-300">Compliance Note</label>
              <textarea
                rows={2}
                value={complianceNote}
                onChange={(e) => {
                  setComplianceNote(e.target.value);
                  setIsDirty(true);
                }}
                className="w-full bg-[#050608] border border-[#1F2937] text-white text-xs rounded-xl p-3 min-h-[60px] resize-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 6: FAQ & Related Categories */}
      {activeTab === "faq" && (
        <div className="space-y-6">
          {/* FAQ Accordion Items */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">Frequently Asked Questions</h3>
              <button
                type="button"
                onClick={handleAddFaq}
                className="px-3 py-2 bg-[#A3E635] text-[#050608] font-bold text-xs rounded-xl flex items-center gap-1 min-h-[44px]"
              >
                <Plus className="w-4 h-4" />
                <span>Add FAQ Item</span>
              </button>
            </div>

            {faq.map((item, idx) => (
              <div key={idx} className="bg-[#0D1117] border border-[#1F2937] p-4 rounded-xl space-y-3">
                <div className="flex items-center justify-between border-b border-[#1F2937] pb-2">
                  <span className="font-mono text-xs font-bold text-gray-400">FAQ #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setFaq((prev) => prev.filter((_, i) => i !== idx));
                      setIsDirty(true);
                    }}
                    className="p-1 text-red-400 hover:text-red-300 min-h-[44px] min-w-[44px] flex items-center justify-center"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <input
                  type="text"
                  value={item.q}
                  onChange={(e) => {
                    const updated = [...faq];
                    updated[idx].q = e.target.value;
                    setFaq(updated);
                    setIsDirty(true);
                  }}
                  placeholder="Question?"
                  className="w-full bg-[#050608] border border-[#1F2937] text-white text-xs rounded-xl px-3 py-2 min-h-[44px]"
                />
                <textarea
                  rows={2}
                  value={item.a}
                  onChange={(e) => {
                    const updated = [...faq];
                    updated[idx].a = e.target.value;
                    setFaq(updated);
                    setIsDirty(true);
                  }}
                  placeholder="Answer..."
                  className="w-full bg-[#050608] border border-[#1F2937] text-white text-xs rounded-xl p-3 min-h-[60px] resize-none"
                />
              </div>
            ))}
          </div>

          {/* Related Product Category Codes */}
          <div className="bg-[#0D1117] border border-[#1F2937] p-5 rounded-xl space-y-3">
            <h3 className="text-sm font-bold text-white">Related Product Categories</h3>
            <p className="text-xs text-gray-400">
              Select product category codes to display as quick catalog links on this service page.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 pt-2">
              {allCategories.map((cat) => {
                const checked = relatedCategoryCodes.includes(cat.code);
                return (
                  <label
                    key={cat.id}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                      checked
                        ? "bg-[#0B65B3]/20 border-[#0B65B3] text-white font-semibold"
                        : "bg-[#050608] border-[#1F2937] text-gray-400 hover:text-white"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setRelatedCategoryCodes((prev) => [...prev, cat.code]);
                        } else {
                          setRelatedCategoryCodes((prev) => prev.filter((c) => c !== cat.code));
                        }
                        setIsDirty(true);
                      }}
                      className="rounded border-gray-600 bg-gray-800 text-[#0B65B3]"
                    />
                    <span className="font-mono">{cat.code}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Tab 7: SEO Panel */}
      {activeTab === "seo" && (
        <SeoPanel
          seoTitle={seoTitle}
          seoDescription={seoDescription}
          defaultTitle={`${title || "Service Scope"} UAE | Vision Energy`}
          defaultDescription={summary || "Specialist engineering and installation services in the UAE."}
          slug={`services/${slug}`}
          onTitleChange={(v) => {
            setSeoTitle(v);
            setIsDirty(true);
          }}
          onDescriptionChange={(v) => {
            setSeoDescription(v);
            setIsDirty(true);
          }}
        />
      )}
    </FormShell>
  );
}
