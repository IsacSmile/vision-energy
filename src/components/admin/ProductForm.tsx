"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import FormShell from "./FormShell";
import ImageUploader from "./ImageUploader";
import SeoPanel from "./SeoPanel";
import { showToast } from "./Toast";
import { X, Plus, Tag } from "lucide-react";

interface ProductFormProps {
  initialData?: any;
  id?: string;
}

export default function ProductForm({ initialData, id }: ProductFormProps) {
  const router = useRouter();

  const [code, setCode] = useState(initialData?.code || "LP-05");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(Boolean(initialData?.slug));
  const [group, setGroup] = useState(initialData?.group || "LP");
  const [groupLabel, setGroupLabel] = useState(initialData?.groupLabel || "Lightning Protection");
  const [isNewGroup, setIsNewGroup] = useState(false);
  const [sortOrder, setSortOrder] = useState<number>(initialData?.sortOrder ?? 1);
  const [priority, setPriority] = useState(Boolean(initialData?.priority));
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [productFamilies, setProductFamilies] = useState<string[]>(initialData?.productFamilies || []);
  const [familyInput, setFamilyInput] = useState("");
  const [image, setImage] = useState(initialData?.image || "");
  const [imageAlt, setImageAlt] = useState(initialData?.imageAlt || "");
  const [status, setStatus] = useState<"DRAFT" | "PUBLISHED">(initialData?.status || "DRAFT");
  const [reviewNote, setReviewNote] = useState(initialData?.reviewNote || "");
  const [seoTitle, setSeoTitle] = useState(initialData?.seoTitle || "");
  const [seoDescription, setSeoDescription] = useState(initialData?.seoDescription || "");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Auto generate slug from title if not manually edited
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

  const handleAddFamily = () => {
    const trimmed = familyInput.trim();
    if (!trimmed) return;
    if (productFamilies.includes(trimmed)) {
      showToast("Duplicate tag ignored", "info");
      setFamilyInput("");
      return;
    }
    if (productFamilies.length >= 20) {
      showToast("Maximum 20 product family tags allowed", "error");
      return;
    }
    setProductFamilies((prev) => [...prev, trimmed]);
    setFamilyInput("");
    setIsDirty(true);
  };

  const handleRemoveFamily = (index: number) => {
    setProductFamilies((prev) => prev.filter((_, i) => i !== index));
    setIsDirty(true);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!code || !/^[A-Z]{2}-\d{2,3}$/.test(code)) {
      newErrors.code = "Code is required and must follow pattern like LP-01 or ER-02";
    }
    if (!slug || slug.length < 3) {
      newErrors.slug = "Slug must be at least 3 characters";
    }
    if (!title || title.length < 2) {
      newErrors.title = "Title must be at least 2 characters";
    }
    if (!description || description.length < 20 || description.length > 600) {
      newErrors.description = "Description must be between 20 and 600 characters";
    }
    if (image && (!imageAlt || imageAlt.trim().length === 0)) {
      newErrors.imageAlt = "Alt text is required when an image exists";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitForm = async (targetStatus: "DRAFT" | "PUBLISHED") => {
    if (!validate()) {
      showToast("Please fix the errors before saving", "error");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        code,
        slug,
        group,
        groupLabel,
        sortOrder: Number(sortOrder),
        priority,
        title,
        description,
        productFamilies,
        image: image || null,
        imageAlt: imageAlt || null,
        status: targetStatus,
        reviewNote: reviewNote || null,
        seoTitle: seoTitle || null,
        seoDescription: seoDescription || null,
        updatedAt: initialData?.updatedAt,
      };

      const url = id ? `/api/admin/products/${id}` : "/api/admin/products";
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

      showToast(`Product category saved successfully as ${targetStatus}`, "success");
      setIsDirty(false);
      router.push("/admin/products");
      router.refresh();
    } catch (err: any) {
      if (err.message === "changed elsewhere") throw err;
      showToast("Failed to save product category", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormShell
      title={id ? `Edit Product ${code}` : "New Product Category"}
      type="product"
      id={id}
      status={status}
      updatedAt={initialData?.updatedAt}
      isDirty={isDirty}
      isSubmitting={isSubmitting}
      errors={errors}
      onSaveDraft={() => submitForm("DRAFT")}
      onPublish={() => submitForm("PUBLISHED")}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Fields Box */}
          <div className="bg-[#0D1117] border border-[#1F2937] p-5 rounded-xl space-y-4">
            <h3 className="text-sm font-bold text-white border-b border-[#1F2937] pb-3">Category Details</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Category Code */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-gray-300">
                  Category Code <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value.toUpperCase());
                    setIsDirty(true);
                  }}
                  placeholder="LP-01"
                  className="w-full bg-[#050608] border border-[#1F2937] text-white text-xs font-mono font-bold rounded-xl px-3 py-2.5 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-[#A3E635]"
                />
                {errors.code && <p className="text-[11px] text-red-400 font-mono">{errors.code}</p>}
              </div>

              {/* Group Selection */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-gray-300">
                  Group Prefix <span className="text-red-400">*</span>
                </label>
                {isNewGroup ? (
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={group}
                      onChange={(e) => setGroup(e.target.value.toUpperCase())}
                      placeholder="Prefix (LP)"
                      className="bg-[#050608] border border-[#1F2937] text-white text-xs rounded-xl px-3 py-2 min-h-[44px]"
                    />
                    <input
                      type="text"
                      value={groupLabel}
                      onChange={(e) => setGroupLabel(e.target.value)}
                      placeholder="Label (Lightning Protection)"
                      className="bg-[#050608] border border-[#1F2937] text-white text-xs rounded-xl px-3 py-2 min-h-[44px]"
                    />
                  </div>
                ) : (
                  <select
                    value={group}
                    onChange={(e) => {
                      if (e.target.value === "NEW") {
                        setIsNewGroup(true);
                        setGroup("");
                        setGroupLabel("");
                      } else {
                        setGroup(e.target.value);
                      }
                      setIsDirty(true);
                    }}
                    className="w-full bg-[#050608] border border-[#1F2937] text-white text-xs rounded-xl px-3 py-2.5 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-[#A3E635]"
                  >
                    <option value="LP">LP - Lightning Protection</option>
                    <option value="ER">ER - Earthing & Grounding</option>
                    <option value="LT">LT - Specialist & LED Lighting</option>
                    <option value="CM">CM - Cable Management</option>
                    <option value="CB">CB - Industrial & Optic Cables</option>
                    <option value="CT">CT - Conduits & Trunking</option>
                    <option value="EL">EL - Electrical & Control</option>
                    <option value="EN">EN - Energy & Renewable Systems</option>
                    <option value="ME">ME - Mechanical & HVAC</option>
                    <option value="SG">SG - Security & Fire Systems</option>
                    <option value="HW">HW - Hardware & Fasteners</option>
                    <option value="SF">SF - Safety & Traffic Equipment</option>
                    <option value="PK">PK - Industrial Packaging</option>
                    <option value="ID">ID - Identification & Marking</option>
                    <option value="NEW">+ Create New Group...</option>
                  </select>
                )}
              </div>
            </div>

            {/* Title */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-gray-300">
                Category Title <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setIsDirty(true);
                }}
                placeholder="Conventional Lightning Protection Systems"
                className="w-full bg-[#050608] border border-[#1F2937] text-white text-xs rounded-xl px-3 py-2.5 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-[#A3E635]"
              />
              {errors.title && <p className="text-[11px] text-red-400">{errors.title}</p>}
            </div>

            {/* Slug */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold text-gray-300">
                  URL Slug <span className="text-red-400">*</span>
                </label>
                {initialData?.status === "PUBLISHED" && slug !== initialData?.slug && (
                  <span className="text-[11px] text-amber-400 font-semibold">
                    Warning: Slug change will 301 redirect from old URL
                  </span>
                )}
              </div>
              <input
                type="text"
                value={slug}
                onChange={(e) => {
                  setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"));
                  setSlugManuallyEdited(true);
                  setIsDirty(true);
                }}
                placeholder="conventional-lightning-protection-systems"
                className="w-full bg-[#050608] border border-[#1F2937] text-white text-xs font-mono rounded-xl px-3 py-2.5 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-[#A3E635]"
              />
              {errors.slug && <p className="text-[11px] text-red-400 font-mono">{errors.slug}</p>}
            </div>

            {/* Description */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold text-gray-300">
                  Category Description <span className="text-red-400">*</span>
                </label>
                <span
                  className={`font-mono text-[11px] ${
                    description.length < 20 || description.length > 600 ? "text-amber-400" : "text-gray-500"
                  }`}
                >
                  {description.length}/600 chars (min 20)
                </span>
              </div>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setIsDirty(true);
                }}
                placeholder="Complete conventional lightning protection systems for buildings..."
                className="w-full bg-[#050608] border border-[#1F2937] text-white text-xs rounded-xl p-3 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-[#A3E635] leading-relaxed resize-none"
              />
              {errors.description && <p className="text-[11px] text-red-400">{errors.description}</p>}
            </div>

            {/* Product Families Tag Input */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-gray-300">Product Families (Tag Input)</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={familyInput}
                  onChange={(e) => setFamilyInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === ",") {
                      e.preventDefault();
                      handleAddFamily();
                    }
                  }}
                  placeholder="Type product family and press Enter..."
                  className="flex-1 bg-[#050608] border border-[#1F2937] text-white text-xs rounded-xl px-3 py-2 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-[#A3E635]"
                />
                <button
                  type="button"
                  onClick={handleAddFamily}
                  className="px-4 py-2 bg-[#0B65B3] text-white font-bold text-xs rounded-xl hover:opacity-90 min-h-[44px]"
                >
                  Add Tag
                </button>
              </div>

              {/* Tag Badges */}
              <div className="flex flex-wrap gap-2 pt-1">
                {productFamilies.map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#050608] border border-[#1F2937] rounded-xl text-xs font-mono text-gray-200"
                  >
                    <Tag className="w-3 h-3 text-[#A3E635]" />
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFamily(idx)}
                      className="p-1 text-gray-400 hover:text-red-400 min-h-[44px] min-w-[44px] flex items-center justify-center -mr-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* SEO Panel Component */}
          <SeoPanel
            seoTitle={seoTitle}
            seoDescription={seoDescription}
            defaultTitle={`${title || "Product Category"} UAE | Vision Energy`}
            defaultDescription={description || "Specialist electrical and lightning protection category."}
            slug={`products/${slug}`}
            onTitleChange={(v) => {
              setSeoTitle(v);
              setIsDirty(true);
            }}
            onDescriptionChange={(v) => {
              setSeoDescription(v);
              setIsDirty(true);
            }}
          />
        </div>

        {/* Sidebar Controls (1 col) */}
        <div className="space-y-6">
          {/* Image Uploader */}
          <ImageUploader
            value={image}
            altValue={imageAlt}
            type="products"
            label="Category Image"
            onChange={(url, alt) => {
              setImage(url);
              if (alt) setImageAlt(alt);
              setIsDirty(true);
            }}
            onAltChange={(alt) => {
              setImageAlt(alt);
              setIsDirty(true);
            }}
          />

          {/* Settings & Priority Switch */}
          <div className="bg-[#0D1117] border border-[#1F2937] p-4 rounded-xl space-y-4">
            <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider border-b border-[#1F2937] pb-2">
              Display & Priority
            </h4>

            {/* Priority Switch */}
            <label className="flex items-center justify-between p-3 bg-[#050608] border border-[#1F2937] rounded-xl cursor-pointer">
              <span className="text-xs font-medium text-gray-200">Show first on the site (Priority)</span>
              <input
                type="checkbox"
                checked={priority}
                onChange={(e) => {
                  setPriority(e.target.checked);
                  setIsDirty(true);
                }}
                className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-[#A3E635] focus:ring-[#A3E635]"
              />
            </label>

            {/* Sort Order */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-gray-300">Sort Order</label>
              <input
                type="number"
                value={sortOrder}
                onChange={(e) => {
                  setSortOrder(parseInt(e.target.value, 10) || 0);
                  setIsDirty(true);
                }}
                className="w-full bg-[#050608] border border-[#1F2937] text-white text-xs font-mono rounded-xl px-3 py-2.5 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-[#A3E635]"
              />
            </div>
          </div>

          {/* Internal Review Note */}
          <div className="bg-[#0D1117] border border-[#1F2937] p-4 rounded-xl space-y-2">
            <label className="block text-xs font-bold text-amber-400 uppercase tracking-wider">
              Internal Review Note (Never shown on site)
            </label>
            <textarea
              rows={3}
              value={reviewNote}
              onChange={(e) => {
                setReviewNote(e.target.value);
                setIsDirty(true);
              }}
              placeholder="Internal team notes, photo updates needed..."
              className="w-full bg-[#050608] border border-[#1F2937] text-white text-xs rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
            />
          </div>
        </div>
      </div>
    </FormShell>
  );
}
