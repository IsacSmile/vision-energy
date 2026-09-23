"use client";

import { useState, useEffect, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { upload } from "@vercel/blob/client";
import {
  Upload,
  AlertCircle,
  Plus,
  Trash2,
  Save,
  Archive,
  RotateCcw,
  CheckCircle2,
  Loader2,
  ShieldAlert,
  ArrowLeft,
  ImageIcon,
  RefreshCw,
} from "lucide-react";
import {
  productSchema,
  PRODUCT_CATEGORIES,
  type ProductFormValues,
} from "@/lib/schemas/product";
import { getCategoryPlaceholder } from "@/lib/utils/placeholders";

interface ProductFormProps {
  initialData?: {
    id: string;
    code: string;
    title: string;
    description: string;
    includes: string[];
    category: string;
    subcategoryGroup: string;
    sortOrder: number;
    status: "PUBLISHED" | "ARCHIVED";
    imageUrl: string | null;
    imageAlt: string | null;
    isPlaceholder: boolean;
  };
  isEdit?: boolean;
}

export function ProductForm({ initialData, isEdit = false }: ProductFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [serverError, setServerError] = useState<string | null>(null);
  const [serverSuccess, setServerSuccess] = useState<string | null>(null);

  // Single photo state
  const [imageUrl, setImageUrl] = useState<string>(
    initialData?.imageUrl ||
      getCategoryPlaceholder(initialData?.category, initialData?.subcategoryGroup, initialData?.title).imageUrl
  );
  const [imageAlt, setImageAlt] = useState<string>(
    initialData?.imageAlt ||
      getCategoryPlaceholder(initialData?.category, initialData?.subcategoryGroup, initialData?.title).imageAlt
  );
  const [isPlaceholder, setIsPlaceholder] = useState<boolean>(
    initialData?.isPlaceholder ?? true
  );

  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Danger zone confirmation state
  const [deleteConfirmCode, setDeleteConfirmCode] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Form setup
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isDirty },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema) as any,
    defaultValues: {
      code: initialData?.code || "",
      title: initialData?.title || "",
      description: initialData?.description || "",
      includes: initialData?.includes?.length ? initialData.includes : [""],
      category: (initialData?.category as any) || "Electrical",
      subcategoryGroup: initialData?.subcategoryGroup || "",
      sortOrder: initialData?.sortOrder ?? 0,
      imageUrl: initialData?.imageUrl || "",
      imageAlt: initialData?.imageAlt || "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "includes" as never,
  });

  const selectedCategory = watch("category");
  const selectedSubcategory = watch("subcategoryGroup");
  const selectedTitle = watch("title");

  // Keep placeholder synced if no real photo uploaded yet
  useEffect(() => {
    if (isPlaceholder) {
      const fallback = getCategoryPlaceholder(selectedCategory, selectedSubcategory, selectedTitle);
      setImageUrl(fallback.imageUrl);
      if (!imageAlt || imageAlt.includes("— sample image")) {
        setImageAlt(fallback.imageAlt);
      }
    }
  }, [selectedCategory, selectedSubcategory, selectedTitle, isPlaceholder]);

  // Unsaved changes beforeunload warning
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty || isUploading) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty, isUploading]);

  // Handle single photo upload
  const handleFileUpload = async (filesList: FileList | null) => {
    if (!filesList || filesList.length === 0) return;
    const file = filesList[0];
    setServerError(null);

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setServerError("Invalid image type. Only JPEG, PNG, and WebP images are allowed.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setServerError("Image size exceeds 5MB limit.");
      return;
    }

    setIsUploading(true);
    setUploadProgress(10);

    try {
      const newBlob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/admin/products/upload-token",
        clientPayload: JSON.stringify({
          productId: initialData?.id || "draft",
        }),
        onUploadProgress: (p) => setUploadProgress(Math.round(p.percentage)),
      });

      setImageUrl(newBlob.url);
      setIsPlaceholder(false);
      if (!imageAlt || imageAlt.includes("— sample image")) {
        setImageAlt(watch("title") || file.name.replace(/\.[^/.]+$/, ""));
      }
      setIsUploading(false);
      setServerSuccess("Photo uploaded. Save form to persist changes.");
    } catch (err: any) {
      setServerError(err.message || "Upload failed.");
      setIsUploading(false);
    }
  };

  // Revert real photo back to local category placeholder
  const handleRemovePhoto = async () => {
    setServerError(null);
    if (isEdit && initialData && !initialData.isPlaceholder) {
      startTransition(async () => {
        try {
          const res = await fetch(`/api/admin/products/${initialData.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "remove_image" }),
          });
          if (res.ok) {
            const fallback = getCategoryPlaceholder(
              watch("category"),
              watch("subcategoryGroup"),
              watch("title")
            );
            setImageUrl(fallback.imageUrl);
            setImageAlt(fallback.imageAlt);
            setIsPlaceholder(true);
            setServerSuccess("Real photo removed. Product reverted to sample placeholder.");
            router.refresh();
          } else {
            const data = await res.json();
            setServerError(data.error || "Failed to remove image.");
          }
        } catch (err: any) {
          setServerError(err.message || "Network error.");
        }
      });
    } else {
      const fallback = getCategoryPlaceholder(
        watch("category"),
        watch("subcategoryGroup"),
        watch("title")
      );
      setImageUrl(fallback.imageUrl);
      setImageAlt(fallback.imageAlt);
      setIsPlaceholder(true);
    }
  };

  // Form submission handler
  const onSubmit = async (values: ProductFormValues) => {
    if (isUploading) {
      setServerError("Please wait for photo upload to finish before saving.");
      return;
    }

    if (!imageAlt || imageAlt.trim().length < 3) {
      setServerError("Image Alt Text (at least 3 characters) is required.");
      return;
    }

    setServerError(null);
    setServerSuccess(null);

    const payload = {
      product: {
        ...values,
        includes: values.includes.filter(Boolean),
        status: initialData?.status || "PUBLISHED",
        imageUrl,
        imageAlt: imageAlt.trim(),
      },
    };

    startTransition(async () => {
      try {
        const url = isEdit
          ? `/api/admin/products/${initialData?.id}`
          : `/api/admin/products`;
        const method = isEdit ? "PUT" : "POST";

        const res = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await res.json();

        if (!res.ok) {
          setServerError(data.error || "Failed to save product.");
          return;
        }

        setServerSuccess(
          isEdit ? "Product updated successfully!" : "Product created successfully!"
        );
        router.push("/admin/products");
        router.refresh();
      } catch (err: any) {
        setServerError(err.message || "Network error occurred.");
      }
    });
  };

  // Archive / Restore handler
  const handleToggleArchive = async () => {
    if (!isEdit || !initialData) return;
    const newStatus = initialData.status === "PUBLISHED" ? "archive" : "restore";
    setServerError(null);

    startTransition(async () => {
      try {
        const res = await fetch(`/api/admin/products/${initialData.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: newStatus }),
        });
        const data = await res.json();
        if (!res.ok) {
          setServerError(data.error || "Action failed.");
          return;
        }
        router.push("/admin/products");
        router.refresh();
      } catch (err: any) {
        setServerError(err.message || "Failed to change product status.");
      }
    });
  };

  // Permanent Delete handler
  const handlePermanentDelete = async () => {
    if (!isEdit || !initialData) return;
    if (deleteConfirmCode.trim().toUpperCase() !== initialData.code.toUpperCase()) {
      setServerError(`Please type exact product code "${initialData.code}" to confirm deletion.`);
      return;
    }

    setIsDeleting(true);
    setServerError(null);

    try {
      const res = await fetch(
        `/api/admin/products/${initialData.id}?confirmCode=${encodeURIComponent(deleteConfirmCode)}`,
        { method: "DELETE" }
      );
      const data = await res.json();

      if (!res.ok) {
        setServerError(data.error || "Permanent deletion failed.");
        setIsDeleting(false);
        return;
      }

      setServerSuccess(`Product ${initialData.code} permanently deleted.`);
      router.push("/admin/products");
      router.refresh();
    } catch (err: any) {
      setServerError(err.message || "Deletion failed.");
      setIsDeleting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit as any)} className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">
              {isEdit ? `Edit Product ${initialData?.code}` : "Create New Product"}
            </h1>
            <p className="text-sm text-slate-400">
              Manage SKU details and product photo
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isEdit && (
            <button
              type="button"
              onClick={handleToggleArchive}
              disabled={isPending}
              className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition disabled:opacity-50"
            >
              {initialData?.status === "PUBLISHED" ? (
                <>
                  <Archive className="h-4 w-4 text-amber-400" />
                  <span>Archive Product</span>
                </>
              ) : (
                <>
                  <RotateCcw className="h-4 w-4 text-emerald-400" />
                  <span>Restore Product</span>
                </>
              )}
            </button>
          )}

          <button
            type="submit"
            disabled={isPending || isUploading}
            className="flex items-center gap-2 rounded-lg bg-emerald-500 px-5 py-2 text-sm font-bold text-slate-950 hover:bg-emerald-400 transition shadow-lg shadow-emerald-500/10 disabled:opacity-50"
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            <span>{isEdit ? "Update Product" : "Publish Product"}</span>
          </button>
        </div>
      </div>

      {/* Global Alerts */}
      {serverError && (
        <div className="flex items-start gap-3 rounded-xl border border-rose-500/50 bg-rose-950/40 p-4 text-rose-200">
          <AlertCircle className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
          <div className="flex-1 text-sm font-medium">{serverError}</div>
          <button
            type="button"
            onClick={() => setServerError(null)}
            className="text-rose-400 hover:text-rose-200 text-xs font-bold"
          >
            Dismiss
          </button>
        </div>
      )}

      {serverSuccess && (
        <div className="flex items-center gap-3 rounded-xl border border-emerald-500/50 bg-emerald-950/40 p-4 text-emerald-200">
          <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
          <div className="flex-1 text-sm font-medium">{serverSuccess}</div>
        </div>
      )}

      {/* Core Details Section */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-6">
        <h2 className="text-lg font-bold text-white border-b border-slate-800/80 pb-3">
          1. Basic SKU Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Code */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Product Code (SKU) <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              {...register("code")}
              placeholder="LP-01 or GEN-01"
              className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm font-mono text-emerald-400 uppercase placeholder-slate-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
            {errors.code && (
              <p className="mt-1 text-xs text-rose-400">{errors.code.message}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Category <span className="text-rose-400">*</span>
            </label>
            <select
              {...register("category")}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-slate-100 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              {PRODUCT_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-1 text-xs text-rose-400">{errors.category.message}</p>
            )}
          </div>

          {/* Subcategory Group */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Subcategory / Group <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              {...register("subcategoryGroup")}
              placeholder="e.g. Low Voltage Panels"
              className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
            {errors.subcategoryGroup && (
              <p className="mt-1 text-xs text-rose-400">{errors.subcategoryGroup.message}</p>
            )}
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2">
            Product Title <span className="text-rose-400">*</span>
          </label>
          <input
            type="text"
            {...register("title")}
            placeholder="e.g. Main Distribution Board (MDB 400A)"
            className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
          {errors.title && (
            <p className="mt-1 text-xs text-rose-400">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2">
            Description <span className="text-rose-400">*</span>
          </label>
          <textarea
            {...register("description")}
            rows={4}
            placeholder="Comprehensive description of specifications, engineering standards, and applications..."
            className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
          {errors.description && (
            <p className="mt-1 text-xs text-rose-400">{errors.description.message}</p>
          )}
        </div>

        {/* Includes / Key Specs */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-semibold text-slate-300">
              Includes / Features (1 to 15 items) <span className="text-rose-400">*</span>
            </label>
            <button
              type="button"
              onClick={() => append("")}
              disabled={fields.length >= 15}
              className="flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Item</span>
            </button>
          </div>

          <div className="space-y-2">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-2">
                <input
                  type="text"
                  {...register(`includes.${index}` as const)}
                  placeholder={`Feature / Included Spec #${index + 1}`}
                  className="flex-1 rounded-xl border border-slate-800 bg-slate-950 px-4 py-2 text-xs text-slate-100 placeholder-slate-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="p-2 text-slate-500 hover:text-rose-400 transition"
                    title="Remove item"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
          {errors.includes && (
            <p className="mt-1 text-xs text-rose-400">{errors.includes.message}</p>
          )}
        </div>
      </div>

      {/* Product Photo Management Section */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-800/80 pb-3">
          <div>
            <h2 className="text-lg font-bold text-white">2. Product Photo</h2>
            <p className="text-xs text-slate-400">
              Upload a real product photo or use the auto-assigned category placeholder.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                isPlaceholder
                  ? "bg-amber-500/15 text-amber-400 border-amber-500/30"
                  : "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
              }`}
            >
              {isPlaceholder ? "Currently showing: Sample image" : "Currently showing: Uploaded photo"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Preview Box */}
          <div className="space-y-3">
            <label className="block text-xs font-semibold text-slate-300">Image Preview</label>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-950 border border-slate-800">
              <Image
                src={imageUrl}
                alt={imageAlt || "Product image preview"}
                fill
                sizes="400px"
                className="object-cover"
              />
              {isPlaceholder && (
                <div className="absolute bottom-3 right-3 rounded-md bg-slate-950/85 px-2.5 py-1 text-xs font-semibold text-slate-300 border border-slate-800 backdrop-blur-sm">
                  Sample image
                </div>
              )}
            </div>
          </div>

          {/* Controls & Alt Text */}
          <div className="space-y-5">
            {/* File Upload Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Upload Real Photo (JPEG, PNG, WebP ≤ 5MB)
              </label>
              <div className="relative flex items-center justify-center rounded-xl border border-dashed border-slate-700 bg-slate-950 p-4 text-center transition hover:border-emerald-500/50">
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(e) => handleFileUpload(e.target.files)}
                  disabled={isUploading}
                  className="absolute inset-0 cursor-pointer opacity-0"
                />
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                  {isUploading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Uploading ({uploadProgress}%)...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4" />
                      <span>Choose file to replace sample photo</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Remove Real Image Action */}
            {!isPlaceholder && (
              <div>
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  disabled={isPending}
                  className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-950 px-4 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-950/30 transition"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span>Remove Uploaded Photo & Revert to Sample Image</span>
                </button>
              </div>
            )}

            {/* Alt Text Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Image Alt Text <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={imageAlt}
                onChange={(e) => setImageAlt(e.target.value)}
                placeholder="Descriptive alt text for accessibility & SEO"
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-xs text-slate-100 placeholder-slate-600 focus:border-emerald-500 focus:outline-none"
              />
              <p className="mt-1 text-[11px] text-slate-500">
                Alt text is required for accessible rendering and Google product structured data.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Danger Zone (Edit Mode Only) */}
      {isEdit && initialData && (
        <div className="rounded-2xl border border-rose-900/50 bg-rose-950/20 p-6 space-y-4">
          <div className="flex items-center gap-3 text-rose-400">
            <ShieldAlert className="h-6 w-6 shrink-0" />
            <div>
              <h3 className="text-base font-bold text-white">Danger Zone: Permanent Deletion</h3>
              <p className="text-xs text-rose-300">
                Permanently deletes product record and cleans up any uploaded Vercel Blob asset.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <input
              type="text"
              value={deleteConfirmCode}
              onChange={(e) => setDeleteConfirmCode(e.target.value)}
              placeholder={`Type "${initialData.code}" to confirm`}
              className="w-full sm:w-64 rounded-xl border border-rose-800/60 bg-slate-950 px-3.5 py-2 text-xs font-mono text-white placeholder-slate-600 focus:border-rose-500 focus:outline-none"
            />

            <button
              type="button"
              onClick={handlePermanentDelete}
              disabled={
                isDeleting ||
                deleteConfirmCode.trim().toUpperCase() !== initialData.code.toUpperCase()
              }
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-rose-600 px-5 py-2 text-xs font-bold text-white hover:bg-rose-500 transition disabled:opacity-40"
            >
              {isDeleting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
              <span>Delete Permanently</span>
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
