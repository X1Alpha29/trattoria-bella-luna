"use client";

import { FormEvent, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { updateMenuItem } from "@/lib/actions/admin-menu";

type Props = {
  itemId: string;
  initialName: string;
  initialDescription: string;
  initialPrice: string;
  initialImageUrl: string;
  initialDietaryTags: string[];
  initialDisplayOrder: number;
  initialIsAvailable: boolean;
  initialIsFeatured: boolean;
  initialFeaturedOrder: number | null;
};

export default function MenuItemEditForm({
  itemId,
  initialName,
  initialDescription,
  initialPrice,
  initialImageUrl,
  initialDietaryTags,
  initialDisplayOrder,
  initialIsAvailable,
  initialIsFeatured,
  initialFeaturedOrder,
}: Props) {
  const router = useRouter();

  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription);
  const [price, setPrice] = useState(initialPrice);
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const [dietaryTags, setDietaryTags] = useState(initialDietaryTags.join(", "));
  const [displayOrder, setDisplayOrder] = useState(
    String(initialDisplayOrder),
  );
  const [isAvailable, setIsAvailable] = useState(initialIsAvailable);
  const [isFeatured, setIsFeatured] = useState(initialIsFeatured);
  const [featuredOrder, setFeaturedOrder] = useState(
    initialFeaturedOrder === null ? "" : String(initialFeaturedOrder),
  );

  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSaved(false);

    const formData = new FormData();
    formData.set("itemId", itemId);
    formData.set("name", name);
    formData.set("description", description);
    formData.set("price", price);
    formData.set("imageUrl", imageUrl);
    formData.set("dietaryTags", dietaryTags);
    formData.set("displayOrder", displayOrder);
    formData.set("isAvailable", String(isAvailable));
    formData.set("isFeatured", String(isFeatured));
    formData.set("featuredOrder", featuredOrder);

    startTransition(async () => {
      try {
        await updateMenuItem(formData);
        setSaved(true);
        router.refresh();
      } catch {
        setError("We could not save this menu item.");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-5">
      {error && (
        <div
          className="border border-bella-terracotta/30 bg-bella-terracotta/10 p-4 font-body text-sm text-bella-terracotta"
          role="alert"
        >
          {error}
        </div>
      )}

      <div>
        <label className="block font-body text-xs uppercase tracking-[0.15em] text-bella-muted">
          Name
        </label>

        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          disabled={isPending}
          className="mt-2 w-full border border-bella-line bg-bella-cream px-3 py-2 font-body text-sm text-bella-charcoal outline-none focus:border-bella-olive"
        />
      </div>

      <div>
        <label className="block font-body text-xs uppercase tracking-[0.15em] text-bella-muted">
          Description
        </label>

        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          disabled={isPending}
          rows={3}
          className="mt-2 w-full resize-none border border-bella-line bg-bella-cream px-3 py-2 font-body text-sm leading-6 text-bella-charcoal outline-none focus:border-bella-olive"
        />
      </div>

      <div>
        <label className="block font-body text-xs uppercase tracking-[0.15em] text-bella-muted">
          Image URL
        </label>

        <input
          type="url"
          value={imageUrl}
          onChange={(event) => setImageUrl(event.target.value)}
          disabled={isPending}
          className="mt-2 w-full border border-bella-line bg-bella-cream px-3 py-2 font-body text-sm text-bella-charcoal outline-none focus:border-bella-olive"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block font-body text-xs uppercase tracking-[0.15em] text-bella-muted">
            Price
          </label>

          <input
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            disabled={isPending}
            className="mt-2 w-full border border-bella-line bg-bella-cream px-3 py-2 font-body text-sm text-bella-charcoal outline-none focus:border-bella-olive"
          />
        </div>

        <div>
          <label className="block font-body text-xs uppercase tracking-[0.15em] text-bella-muted">
            Display order
          </label>

          <input
            type="number"
            min="0"
            value={displayOrder}
            onChange={(event) => setDisplayOrder(event.target.value)}
            disabled={isPending}
            className="mt-2 w-full border border-bella-line bg-bella-cream px-3 py-2 font-body text-sm text-bella-charcoal outline-none focus:border-bella-olive"
          />
        </div>
      </div>

      <div>
        <label className="block font-body text-xs uppercase tracking-[0.15em] text-bella-muted">
          Dietary tags
        </label>

        <input
          value={dietaryTags}
          onChange={(event) => setDietaryTags(event.target.value)}
          disabled={isPending}
          placeholder="vegetarian, vegan, gluten-free"
          className="mt-2 w-full border border-bella-line bg-bella-cream px-3 py-2 font-body text-sm text-bella-charcoal outline-none focus:border-bella-olive"
        />
      </div>

      <label className="flex items-center gap-3 font-body text-sm text-bella-charcoal">
        <input
          type="checkbox"
          checked={isAvailable}
          onChange={(event) => setIsAvailable(event.target.checked)}
          disabled={isPending}
          className="h-4 w-4"
        />
        Available
      </label>

      <label className="flex items-center gap-3 font-body text-sm text-bella-charcoal">
        <input
          type="checkbox"
          checked={isFeatured}
          onChange={(event) => setIsFeatured(event.target.checked)}
          disabled={isPending}
          className="h-4 w-4"
        />
        Featured dish
      </label>

      {isFeatured && (
        <div>
          <label className="block font-body text-xs uppercase tracking-[0.15em] text-bella-muted">
            Featured order
          </label>

          <input
            type="number"
            min="1"
            value={featuredOrder}
            onChange={(event) => setFeaturedOrder(event.target.value)}
            disabled={isPending}
            className="mt-2 w-full border border-bella-line bg-bella-cream px-3 py-2 font-body text-sm text-bella-charcoal outline-none focus:border-bella-olive"
          />
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-bella-charcoal px-4 py-3 font-body text-xs uppercase tracking-[0.15em] text-bella-cream transition hover:bg-bella-olive disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? "Saving..." : saved ? "Saved" : "Save changes"}
      </button>
    </form>
  );
}