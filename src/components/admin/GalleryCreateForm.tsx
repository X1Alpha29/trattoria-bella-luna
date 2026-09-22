"use client";

import { FormEvent, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { createGalleryImage } from "@/lib/actions/admin-gallery-create";

type GalleryCategory = "FOOD" | "INTERIOR" | "PEOPLE" | "EVENTS";

export default function GalleryCreateForm() {
  const router = useRouter();

  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState<GalleryCategory>("FOOD");
  const [displayOrder, setDisplayOrder] = useState("0");
  const [isFeatured, setIsFeatured] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSaved(false);

    const formData = new FormData();
    formData.set("url", url);
    formData.set("title", title);
    formData.set("caption", caption);
    formData.set("category", category);
    formData.set("displayOrder", displayOrder);
    formData.set("isFeatured", String(isFeatured));

    startTransition(async () => {
      try {
        await createGalleryImage(formData);

        setUrl("");
        setTitle("");
        setCaption("");
        setCategory("FOOD");
        setDisplayOrder("0");
        setIsFeatured(false);
        setSaved(true);

        router.refresh();
      } catch {
        setError("We could not add the gallery image.");
      }
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-bella-line bg-bella-white p-6 sm:p-8"
    >
      <p className="font-body text-xs uppercase tracking-[0.2em] text-bella-olive">
        Add image
      </p>

      <h2 className="mt-2 font-display text-3xl text-bella-charcoal">
        New gallery image
      </h2>

      {error && (
        <div
          className="mt-6 border border-bella-terracotta/30 bg-bella-terracotta/10 p-4 font-body text-sm text-bella-terracotta"
          role="alert"
        >
          {error}
        </div>
      )}

      <div className="mt-8 space-y-5">
        <div>
          <label
            htmlFor="gallery-url"
            className="block font-body text-xs uppercase tracking-[0.15em] text-bella-muted"
          >
            Image URL
          </label>

          <input
            id="gallery-url"
            type="url"
            required
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            disabled={isPending}
            placeholder="https://..."
            className="mt-2 w-full border border-bella-line bg-bella-cream px-3 py-3 font-body text-sm text-bella-charcoal outline-none focus:border-bella-olive"
          />
        </div>

        <div>
          <label
            htmlFor="gallery-title"
            className="block font-body text-xs uppercase tracking-[0.15em] text-bella-muted"
          >
            Title
          </label>

          <input
            id="gallery-title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            disabled={isPending}
            className="mt-2 w-full border border-bella-line bg-bella-cream px-3 py-3 font-body text-sm text-bella-charcoal outline-none focus:border-bella-olive"
          />
        </div>

        <div>
          <label
            htmlFor="gallery-caption"
            className="block font-body text-xs uppercase tracking-[0.15em] text-bella-muted"
          >
            Caption
          </label>

          <textarea
            id="gallery-caption"
            value={caption}
            onChange={(event) => setCaption(event.target.value)}
            disabled={isPending}
            rows={3}
            className="mt-2 w-full resize-none border border-bella-line bg-bella-cream px-3 py-3 font-body text-sm leading-6 text-bella-charcoal outline-none focus:border-bella-olive"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="gallery-category"
              className="block font-body text-xs uppercase tracking-[0.15em] text-bella-muted"
            >
              Category
            </label>

            <select
              id="gallery-category"
              value={category}
              onChange={(event) =>
                setCategory(event.target.value as GalleryCategory)
              }
              disabled={isPending}
              className="mt-2 w-full border border-bella-line bg-bella-cream px-3 py-3 font-body text-sm text-bella-charcoal outline-none focus:border-bella-olive"
            >
              <option value="FOOD">Food</option>
              <option value="INTERIOR">Interior</option>
              <option value="PEOPLE">People</option>
              <option value="EVENTS">Events</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="gallery-order"
              className="block font-body text-xs uppercase tracking-[0.15em] text-bella-muted"
            >
              Display order
            </label>

            <input
              id="gallery-order"
              type="number"
              min="0"
              value={displayOrder}
              onChange={(event) => setDisplayOrder(event.target.value)}
              disabled={isPending}
              className="mt-2 w-full border border-bella-line bg-bella-cream px-3 py-3 font-body text-sm text-bella-charcoal outline-none focus:border-bella-olive"
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
          className="bg-bella-charcoal px-6 py-3 font-body text-xs uppercase tracking-[0.15em] text-bella-cream transition hover:bg-bella-olive disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? "Adding..." : saved ? "Added" : "Add image"}
        </button>
      </div>
    </form>
  );
}