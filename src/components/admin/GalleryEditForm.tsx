"use client";

import { FormEvent, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { updateGalleryImage } from "@/lib/actions/admin-gallery";

type GalleryCategory = "FOOD" | "INTERIOR" | "PEOPLE" | "EVENTS";

type Props = {
  imageId: string;
  initialTitle: string;
  initialCaption: string;
  initialCategory: GalleryCategory;
  initialDisplayOrder: number;
  initialIsFeatured: boolean;
};

export default function GalleryEditForm({
  imageId,
  initialTitle,
  initialCaption,
  initialCategory,
  initialDisplayOrder,
  initialIsFeatured,
}: Props) {
  const router = useRouter();

  const [title, setTitle] = useState(initialTitle);
  const [caption, setCaption] = useState(initialCaption);
  const [category, setCategory] = useState<GalleryCategory>(initialCategory);
  const [displayOrder, setDisplayOrder] = useState(String(initialDisplayOrder));
  const [isFeatured, setIsFeatured] = useState(initialIsFeatured);
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSaved(false);

    const formData = new FormData();
    formData.set("imageId", imageId);
    formData.set("title", title);
    formData.set("caption", caption);
    formData.set("category", category);
    formData.set("displayOrder", displayOrder);
    formData.set("isFeatured", String(isFeatured));

    startTransition(async () => {
      try {
        await updateGalleryImage(formData);

        setSaved(true);
        router.refresh();
      } catch {
        setError("We could not save this gallery image.");
      }
    });
  }

  return (
    <div className="min-w-0">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-body text-xs uppercase tracking-[0.18em] text-bella-olive">
            Edit image
          </p>

          <h2 className="mt-1 font-display text-3xl tracking-[-0.03em] text-bella-charcoal">
            {title || "Untitled"}
          </h2>
        </div>

        {isFeatured && (
          <span className="shrink-0 border border-bella-olive/20 bg-bella-olive/10 px-3 py-1 font-body text-[10px] uppercase tracking-[0.12em] text-bella-olive">
            Featured
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-7">
        {error && (
          <div
            className="mb-6 border border-bella-terracotta/30 bg-bella-terracotta/10 p-4 font-body text-sm text-bella-terracotta"
            role="alert"
          >
            {error}
          </div>
        )}

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label
              htmlFor={`gallery-title-${imageId}`}
              className="block font-body text-xs uppercase tracking-[0.15em] text-bella-muted"
            >
              Title
            </label>

            <input
              id={`gallery-title-${imageId}`}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              disabled={isPending}
              className="mt-2 w-full border border-bella-line bg-bella-cream px-3 py-2.5 font-body text-sm text-bella-charcoal outline-none focus:border-bella-olive"
            />
          </div>

          <div>
            <label
              htmlFor={`gallery-category-${imageId}`}
              className="block font-body text-xs uppercase tracking-[0.15em] text-bella-muted"
            >
              Category
            </label>

            <select
              id={`gallery-category-${imageId}`}
              value={category}
              onChange={(event) =>
                setCategory(event.target.value as GalleryCategory)
              }
              disabled={isPending}
              className="mt-2 w-full border border-bella-line bg-bella-cream px-3 py-2.5 font-body text-sm text-bella-charcoal outline-none focus:border-bella-olive"
            >
              <option value="FOOD">Food</option>
              <option value="INTERIOR">Interior</option>
              <option value="PEOPLE">People</option>
              <option value="EVENTS">Events</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor={`gallery-caption-${imageId}`}
              className="block font-body text-xs uppercase tracking-[0.15em] text-bella-muted"
            >
              Caption
            </label>

            <textarea
              id={`gallery-caption-${imageId}`}
              value={caption}
              onChange={(event) => setCaption(event.target.value)}
              disabled={isPending}
              rows={3}
              className="mt-2 w-full resize-none border border-bella-line bg-bella-cream px-3 py-2.5 font-body text-sm leading-6 text-bella-charcoal outline-none focus:border-bella-olive"
            />
          </div>

          <div>
            <label
              htmlFor={`gallery-order-${imageId}`}
              className="block font-body text-xs uppercase tracking-[0.15em] text-bella-muted"
            >
              Display order
            </label>

            <input
              id={`gallery-order-${imageId}`}
              type="number"
              min="0"
              value={displayOrder}
              onChange={(event) => setDisplayOrder(event.target.value)}
              disabled={isPending}
              className="mt-2 w-full border border-bella-line bg-bella-cream px-3 py-2.5 font-body text-sm text-bella-charcoal outline-none focus:border-bella-olive"
            />
          </div>

          <label className="flex items-center gap-3 self-end pb-2 font-body text-sm text-bella-charcoal">
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(event) => setIsFeatured(event.target.checked)}
              disabled={isPending}
              className="h-4 w-4"
            />

            Featured image
          </label>

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-bella-charcoal px-4 py-3 font-body text-xs uppercase tracking-[0.15em] text-bella-cream transition hover:bg-bella-olive disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPending ? "Saving..." : saved ? "Saved" : "Save changes"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}