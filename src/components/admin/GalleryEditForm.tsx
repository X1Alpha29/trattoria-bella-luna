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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSaved(false);

    const formData = new FormData();
    formData.set("imageId", imageId);
    formData.set("title", title);
    formData.set("caption", caption);
    formData.set("category", category);
    formData.set("displayOrder", displayOrder);
    formData.set("isFeatured", String(isFeatured));

    startTransition(async () => {
      await updateGalleryImage(formData);

      setSaved(true);
      router.refresh();
    });
  }

  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl text-bella-charcoal">
            {title || "Untitled"}
          </h2>

          <p className="mt-1 font-body text-xs uppercase tracking-[0.15em] text-bella-olive">
            {category}
          </p>
        </div>

        {isFeatured && (
          <span className="border border-bella-olive/20 bg-bella-olive/10 px-3 py-1 font-body text-[10px] uppercase tracking-[0.12em] text-bella-olive">
            Featured
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div>
          <label
            htmlFor={`title-${imageId}`}
            className="block font-body text-xs uppercase tracking-[0.15em] text-bella-muted"
          >
            Title
          </label>

          <input
            id={`title-${imageId}`}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            disabled={isPending}
            className="mt-2 w-full border border-bella-line bg-bella-cream px-3 py-2 font-body text-sm text-bella-charcoal outline-none focus:border-bella-olive"
          />
        </div>

        <div>
          <label
            htmlFor={`caption-${imageId}`}
            className="block font-body text-xs uppercase tracking-[0.15em] text-bella-muted"
          >
            Caption
          </label>

          <textarea
            id={`caption-${imageId}`}
            value={caption}
            onChange={(event) => setCaption(event.target.value)}
            disabled={isPending}
            rows={3}
            className="mt-2 w-full resize-none border border-bella-line bg-bella-cream px-3 py-2 font-body text-sm leading-6 text-bella-charcoal outline-none focus:border-bella-olive"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor={`category-${imageId}`}
              className="block font-body text-xs uppercase tracking-[0.15em] text-bella-muted"
            >
              Category
            </label>

            <select
              id={`category-${imageId}`}
              value={category}
              onChange={(event) =>
                setCategory(event.target.value as GalleryCategory)
              }
              disabled={isPending}
              className="mt-2 w-full border border-bella-line bg-bella-cream px-3 py-2 font-body text-sm text-bella-charcoal outline-none focus:border-bella-olive"
            >
              <option value="FOOD">Food</option>
              <option value="INTERIOR">Interior</option>
              <option value="PEOPLE">People</option>
              <option value="EVENTS">Events</option>
            </select>
          </div>

          <div>
            <label
              htmlFor={`order-${imageId}`}
              className="block font-body text-xs uppercase tracking-[0.15em] text-bella-muted"
            >
              Display order
            </label>

            <input
              id={`order-${imageId}`}
              type="number"
              min="0"
              value={displayOrder}
              onChange={(event) => setDisplayOrder(event.target.value)}
              disabled={isPending}
              className="mt-2 w-full border border-bella-line bg-bella-cream px-3 py-2 font-body text-sm text-bella-charcoal outline-none focus:border-bella-olive"
            />
          </div>
        </div>

        <label className="flex items-center gap-3 font-body text-sm text-bella-charcoal">
          <input
            type="checkbox"
            checked={isFeatured}
            onChange={(event) => setIsFeatured(event.target.checked)}
            disabled={isPending}
            className="h-4 w-4"
          />
          Featured image
        </label>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-bella-charcoal px-4 py-3 font-body text-xs uppercase tracking-[0.15em] text-bella-cream transition hover:bg-bella-olive disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? "Saving..." : saved ? "Saved" : "Save changes"}
        </button>
      </form>
    </>
  );
}