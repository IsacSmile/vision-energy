"use client";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";
import { GripVertical, Trash2, Star, Check } from "lucide-react";
import { useState } from "react";

export interface EditableProductImage {
  id?: string;
  tempId: string;
  blobUrl: string;
  blobPath: string;
  altText: string;
  isPrimary: boolean;
  sortOrder: number;
  checksum: string;
  isNew?: boolean;
}

interface ProductImageSortableGridProps {
  images: EditableProductImage[];
  onChange: (images: EditableProductImage[]) => void;
  onRemoveImage: (tempId: string) => void;
}

function SortableImageCard({
  item,
  index,
  onAltTextChange,
  onSetPrimary,
  onRemove,
}: {
  item: EditableProductImage;
  index: number;
  onAltTextChange: (tempId: string, altText: string) => void;
  onSetPrimary: (tempId: string) => void;
  onRemove: (tempId: string) => void;
}) {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.tempId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 30 : 1,
    opacity: isDragging ? 0.6 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative flex flex-col overflow-hidden rounded-xl border bg-slate-900/90 transition-all ${
        item.isPrimary
          ? "border-emerald-500/80 ring-2 ring-emerald-500/20 shadow-md shadow-emerald-500/5"
          : "border-slate-800 hover:border-slate-700"
      }`}
    >
      {/* Top Controls Bar */}
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950/80 px-3 py-2">
        {/* Drag Handle */}
        <button
          type="button"
          {...attributes}
          {...listeners}
          className="cursor-grab text-slate-400 hover:text-slate-200 active:cursor-grabbing p-1 rounded"
          title="Drag to reorder"
        >
          <GripVertical className="h-4 w-4" />
        </button>

        {/* Primary Badge / Radio Selector */}
        <button
          type="button"
          onClick={() => onSetPrimary(item.tempId)}
          className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded transition ${
            item.isPrimary
              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
          }`}
        >
          <Star className={`h-3.5 w-3.5 ${item.isPrimary ? "fill-emerald-400 text-emerald-400" : ""}`} />
          <span>{item.isPrimary ? "Primary" : "Set Primary"}</span>
        </button>

        {/* Delete Image Button */}
        {showConfirmDelete ? (
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => onRemove(item.tempId)}
              className="rounded bg-rose-600 px-2 py-0.5 text-[11px] font-bold text-white hover:bg-rose-500"
            >
              Delete
            </button>
            <button
              type="button"
              onClick={() => setShowConfirmDelete(false)}
              className="rounded bg-slate-800 px-1.5 py-0.5 text-[11px] text-slate-400 hover:text-slate-200"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setShowConfirmDelete(true)}
            className="text-slate-500 hover:text-rose-400 p-1 rounded transition"
            title="Delete this image"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Thumbnail Display */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950">
        <Image
          src={item.blobUrl}
          alt={item.altText || `Product image ${index + 1}`}
          fill
          sizes="240px"
          className="object-cover"
        />
        {item.isNew && (
          <span className="absolute bottom-2 left-2 z-10 rounded bg-blue-600/90 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur">
            New
          </span>
        )}
      </div>

      {/* Alt Text Input */}
      <div className="p-3 bg-slate-900">
        <label className="block text-[11px] font-semibold text-slate-400 mb-1">
          Alt Text <span className="text-rose-400">*</span>
        </label>
        <input
          type="text"
          value={item.altText}
          onChange={(e) => onAltTextChange(item.tempId, e.target.value)}
          placeholder="Descriptive alt text for accessibility & SEO"
          className={`w-full rounded-lg border bg-slate-950 px-2.5 py-1.5 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-1 ${
            item.altText.trim().length >= 3
              ? "border-slate-800 focus:border-emerald-500 focus:ring-emerald-500"
              : "border-amber-500/50 focus:border-amber-500 focus:ring-amber-500"
          }`}
        />
        {item.altText.trim().length < 3 && (
          <p className="mt-1 text-[10px] text-amber-400">Min 3 characters required</p>
        )}
      </div>
    </div>
  );
}

export function ProductImageSortableGrid({
  images,
  onChange,
  onRemoveImage,
}: ProductImageSortableGridProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = images.findIndex((item) => item.tempId === active.id);
      const newIndex = images.findIndex((item) => item.tempId === over.id);

      const newOrdered = arrayMove(images, oldIndex, newIndex).map((img, idx) => ({
        ...img,
        sortOrder: idx,
      }));

      onChange(newOrdered);
    }
  };

  const handleAltTextChange = (tempId: string, altText: string) => {
    const updated = images.map((img) =>
      img.tempId === tempId ? { ...img, altText } : img
    );
    onChange(updated);
  };

  const handleSetPrimary = (tempId: string) => {
    const updated = images.map((img) => ({
      ...img,
      isPrimary: img.tempId === tempId,
    }));
    onChange(updated);
  };

  if (images.length === 0) return null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={images.map((img) => img.tempId)}
        strategy={rectSortingStrategy}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((item, index) => (
            <SortableImageCard
              key={item.tempId}
              item={item}
              index={index}
              onAltTextChange={handleAltTextChange}
              onSetPrimary={handleSetPrimary}
              onRemove={onRemoveImage}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
