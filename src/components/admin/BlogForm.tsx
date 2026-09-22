"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import FormShell from "./FormShell";
import ImageUploader from "./ImageUploader";
import MarkdownEditor from "./MarkdownEditor";
import SeoPanel from "./SeoPanel";
import { showToast } from "./Toast";
import { X, Tag, Calendar, AlertCircle } from "lucide-react";

interface BlogFormProps {
  initialData?: any;
  id?: string;
}

export default function BlogForm({ initialData, id }: BlogFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(Boolean(initialData?.slug));
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [coverImage, setCoverImage] = useState(initialData?.coverImage || "");
  const [coverAlt, setCoverAlt] = useState(initialData?.coverAlt || "");
  const [category, setCategory] = useState(initialData?.category || "Technical Insights");
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [tagInput, setTagInput] = useState("");
  const [status, setStatus] = useState<"DRAFT" | "PUBLISHED">(initialData?.status || "DRAFT");
  const [publishedAt, setPublishedAt] = useState(
    initialData?.publishedAt
      ? new Date(initialData.publishedAt).toISOString().slice(0, 16)
      : new Date().toISOString().slice(0, 16)
  );
  const [isPlaceholder, setIsPlaceholder] = useState(Boolean(initialData?.isPlaceholder));
  const [seoTitle, setSeoTitle] = useState(initialData?.seoTitle || "");
  const [seoDescription, setSeoDescription] = useState(initialData?.seoDescription || "");

  const [existingCategories, setExistingCategories] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isScheduled = new Date(publishedAt).getTime() > Date.now();

  useEffect(() => {
    fetch("/api/admin/blog")
      .then((res) => res.json())
      .then((data) => {
        if (data.categories) setExistingCategories(data.categories);
      })
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

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (!trimmed) return;
    if (!tags.includes(trimmed)) {
      setTags((prev) => [...prev, trimmed]);
      setIsDirty(true);
    }
    setTagInput("");
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!title || title.length < 3) newErrors.title = "Title must be at least 3 characters";
    if (!slug || slug.length < 3) newErrors.slug = "Slug must be at least 3 characters";
    if (!content || content.length < 10) newErrors.content = "Markdown content must be at least 10 characters";
    if (coverImage && (!coverAlt || coverAlt.trim().length === 0)) {
      newErrors.coverAlt = "Alt text is required when a cover image exists";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitForm = async (targetStatus: "DRAFT" | "PUBLISHED") => {
    if (!validate()) {
      showToast("Please fix errors before saving", "error");
      return;
    }

    setIsSubmitting(true);
    try {
      const autoExcerpt = excerpt.trim() || content.replace(/[#*`>_-]/g, "").substring(0, 155).trim();

      const payload = {
        title,
        slug,
        excerpt: autoExcerpt,
        content,
        coverImage: coverImage || null,
        coverAlt: coverAlt || null,
        category,
        tags,
        status: targetStatus,
        publishedAt: new Date(publishedAt).toISOString(),
        isPlaceholder,
        seoTitle: seoTitle || null,
        seoDescription: seoDescription || null,
        updatedAt: initialData?.updatedAt,
      };

      const url = id ? `/api/admin/blog/${id}` : "/api/admin/blog";
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

      showToast(`Article saved as ${targetStatus}`, "success");
      setIsDirty(false);
      router.push("/admin/blog");
      router.refresh();
    } catch (err: any) {
      if (err.message === "changed elsewhere") throw err;
      showToast("Failed to save article", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormShell
      title={id ? `Edit Post: ${title}` : "New Blog Article"}
      type="blog"
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
        {/* Main Form Area (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#0D1117] border border-[#1F2937] p-5 rounded-xl space-y-4">
            <h3 className="text-sm font-bold text-white border-b border-[#1F2937] pb-3">Article Details</h3>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-gray-300">
                Article Title <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setIsDirty(true);
                }}
                placeholder="Understanding IEC/BS EN 62305 Lightning Protection Standards"
                className="w-full bg-[#050608] border border-[#1F2937] text-white text-xs rounded-xl px-3 py-2.5 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-[#A3E635]"
              />
              {errors.title && <p className="text-[11px] text-red-400">{errors.title}</p>}
            </div>

            <div className="space-y-1">
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
                placeholder="understanding-iec-62305-lightning-protection"
                className="w-full bg-[#050608] border border-[#1F2937] text-white text-xs font-mono rounded-xl px-3 py-2.5 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-[#A3E635]"
              />
              {errors.slug && <p className="text-[11px] text-red-400 font-mono">{errors.slug}</p>}
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-gray-300">
                Article Excerpt (Optional - auto-filled from content if left empty)
              </label>
              <textarea
                rows={3}
                value={excerpt}
                onChange={(e) => {
                  setExcerpt(e.target.value);
                  setIsDirty(true);
                }}
                placeholder="A technical overview of risk management and strike calculations..."
                className="w-full bg-[#050608] border border-[#1F2937] text-white text-xs rounded-xl p-3 min-h-[80px] focus:outline-none focus:ring-2 focus:ring-[#A3E635] resize-none"
              />
            </div>
          </div>

          {/* Markdown Content Editor */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-gray-300">
              Markdown Article Content <span className="text-red-400">*</span>
            </label>
            <MarkdownEditor
              value={content}
              onChange={(val) => {
                setContent(val);
                setIsDirty(true);
              }}
            />
            {errors.content && <p className="text-[11px] text-red-400">{errors.content}</p>}
          </div>

          {/* SEO Panel */}
          <SeoPanel
            seoTitle={seoTitle}
            seoDescription={seoDescription}
            defaultTitle={`${title || "Technical Article"} | Vision Energy`}
            defaultDescription={excerpt || "Technical insights and engineering articles."}
            slug={`blog/${slug}`}
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
          {/* Cover Image Uploader */}
          <ImageUploader
            value={coverImage}
            altValue={coverAlt}
            type="blog"
            label="Cover Image"
            onChange={(url, alt) => {
              setCoverImage(url);
              if (alt) setCoverAlt(alt);
              setIsDirty(true);
            }}
            onAltChange={(alt) => {
              setCoverAlt(alt);
              setIsDirty(true);
            }}
          />

          {/* Publishing Schedule & Settings */}
          <div className="bg-[#0D1117] border border-[#1F2937] p-4 rounded-xl space-y-4">
            <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider border-b border-[#1F2937] pb-2">
              Schedule & Taxonomy
            </h4>

            {/* Publication Date & Time */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-300 flex items-center justify-between">
                <span>Publish Date & Time</span>
                {isScheduled && (
                  <span className="text-[10px] font-mono font-bold text-amber-400 px-2 py-0.5 bg-amber-500/10 rounded border border-amber-500/20">
                    Scheduled
                  </span>
                )}
              </label>
              <input
                type="datetime-local"
                value={publishedAt}
                onChange={(e) => {
                  setPublishedAt(e.target.value);
                  setIsDirty(true);
                }}
                className="w-full bg-[#050608] border border-[#1F2937] text-white text-xs rounded-xl px-3 py-2.5 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-[#A3E635]"
              />
            </div>

            {/* Category with Datalist */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-gray-300">Category</label>
              <input
                type="text"
                list="category-suggestions"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setIsDirty(true);
                }}
                placeholder="Technical Insights"
                className="w-full bg-[#050608] border border-[#1F2937] text-white text-xs rounded-xl px-3 py-2.5 min-h-[44px]"
              />
              <datalist id="category-suggestions">
                {existingCategories.map((cat, i) => (
                  <option key={i} value={cat} />
                ))}
              </datalist>
            </div>

            {/* Tags Input */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-gray-300">Tags</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                  placeholder="Press Enter to add tag..."
                  className="flex-1 bg-[#050608] border border-[#1F2937] text-white text-xs rounded-xl px-3 py-2 min-h-[44px]"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-3 py-2 bg-[#0B65B3] text-white text-xs font-bold rounded-xl min-h-[44px]"
                >
                  Add
                </button>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {tags.map((tag, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1 px-3 py-1 bg-[#050608] border border-[#1F2937] rounded-xl text-xs text-gray-300 font-mono">
                    <Tag className="w-3 h-3 text-[#A3E635]" />
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setTags((prev) => prev.filter((_, i) => i !== idx));
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

            {/* Development-only Placeholder Switch */}
            {process.env.NODE_ENV === "development" && (
              <label className="flex items-center justify-between p-3 bg-[#050608] border border-[#1F2937] rounded-xl cursor-pointer pt-3">
                <span className="text-xs font-medium text-amber-400">Development Placeholder Post</span>
                <input
                  type="checkbox"
                  checked={isPlaceholder}
                  onChange={(e) => {
                    setIsPlaceholder(e.target.checked);
                    setIsDirty(true);
                  }}
                  className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-amber-400"
                />
              </label>
            )}
          </div>
        </div>
      </div>
    </FormShell>
  );
}
