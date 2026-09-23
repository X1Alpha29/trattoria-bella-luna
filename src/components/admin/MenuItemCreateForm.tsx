"use client";

import { FormEvent, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { createMenuItem } from "@/lib/actions/admin-menu-create";

type Category = {
  id: string;
  name: string;
};

type Props = {
  categories: Category[];
};

export default function MenuItemCreateForm({ categories }: Props) {
  const router = useRouter();

  const [categoryId, setCategoryId] = useState(categories[0]?.id ?? "");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [dietaryTags, setDietaryTags] = useState("");
  const [displayOrder, setDisplayOrder] = useState("0");
  const [isAvailable, setIsAvailable] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);
  const [featuredOrder, setFeaturedOrder] = useState("");
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSaved(false);

    const formData = new FormData();
    formData.set("categoryId", categoryId);
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
        await createMenuItem(formData);

        setName("");
        setDescription("");
        setPrice("");
        setImageUrl("");
        setDietaryTags("");
        setDisplayOrder("0");
        setIsAvailable(true);
        setIsFeatured(false);
        setFeaturedOrder("");
        setSaved(true);

        router.refresh();
      } catch {
        setError("We could not add this menu item.");
      }
    });
  }

  return (
    <details className="max-w-4xl border border-bella-line bg-bella-white">
      <summary className="flex cursor-pointer list-none items-center justify-between px-6 py-5 sm:px-8">
        <div>
          <p className="font-body text-xs uppercase tracking-[0.2em] text-bella-olive">
            Add dish
          </p>

          <h2 className="mt-1 font-display text-2xl text-bella-charcoal">
            New menu item
          </h2>
        </div>

        <span className="font-body text-2xl text-bella-charcoal">
          +
        </span>
      </summary>

      <form
        onSubmit={handleSubmit}
        className="border-t border-bella-line p-6 sm:p-8"
      >
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
              htmlFor="menu-category"
              className="block font-body text-xs uppercase tracking-[0.15em] text-bella-muted"
            >
              Category
            </label>

            <select
              id="menu-category"
              value={categoryId}
              onChange={(event) => setCategoryId(event.target.value)}
              disabled={isPending}
              className="mt-2 w-full border border-bella-line bg-bella-cream px-3 py-3 font-body text-sm text-bella-charcoal outline-none focus:border-bella-olive"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="menu-name"
              className="block font-body text-xs uppercase tracking-[0.15em] text-bella-muted"
            >
              Name
            </label>

            <input
              id="menu-name"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              disabled={isPending}
              className="mt-2 w-full border border-bella-line bg-bella-cream px-3 py-3 font-body text-sm text-bella-charcoal outline-none focus:border-bella-olive"
            />
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="menu-description"
              className="block font-body text-xs uppercase tracking-[0.15em] text-bella-muted"
            >
              Description
            </label>

            <textarea
              id="menu-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              disabled={isPending}
              rows={3}
              className="mt-2 w-full resize-none border border-bella-line bg-bella-cream px-3 py-3 font-body text-sm leading-6 text-bella-charcoal outline-none focus:border-bella-olive"
            />
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="menu-image"
              className="block font-body text-xs uppercase tracking-[0.15em] text-bella-muted"
            >
              Image URL
            </label>

            <input
              id="menu-image"
              type="url"
              value={imageUrl}
              onChange={(event) => setImageUrl(event.target.value)}
              disabled={isPending}
              placeholder="https://..."
              className="mt-2 w-full border border-bella-line bg-bella-cream px-3 py-3 font-body text-sm text-bella-charcoal outline-none focus:border-bella-olive"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2 md:col-span-2">
            <div>
              <label
                htmlFor="menu-price"
                className="block font-body text-xs uppercase tracking-[0.15em] text-bella-muted"
              >
                Price
              </label>

              <input
                id="menu-price"
                type="number"
                min="0"
                step="0.01"
                required
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                disabled={isPending}
                className="mt-2 w-full border border-bella-line bg-bella-cream px-3 py-3 font-body text-sm text-bella-charcoal outline-none focus:border-bella-olive"
              />
            </div>

            <div>
              <label
                htmlFor="menu-order"
                className="block font-body text-xs uppercase tracking-[0.15em] text-bella-muted"
              >
                Display order
              </label>

              <input
                id="menu-order"
                type="number"
                min="0"
                value={displayOrder}
                onChange={(event) => setDisplayOrder(event.target.value)}
                disabled={isPending}
                className="mt-2 w-full border border-bella-line bg-bella-cream px-3 py-3 font-body text-sm text-bella-charcoal outline-none focus:border-bella-olive"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="menu-tags"
              className="block font-body text-xs uppercase tracking-[0.15em] text-bella-muted"
            >
              Dietary tags
            </label>

            <input
              id="menu-tags"
              value={dietaryTags}
              onChange={(event) => setDietaryTags(event.target.value)}
              disabled={isPending}
              placeholder="vegetarian, vegan, gluten-free"
              className="mt-2 w-full border border-bella-line bg-bella-cream px-3 py-3 font-body text-sm text-bella-charcoal outline-none focus:border-bella-olive"
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
              <label
                htmlFor="menu-featured-order"
                className="block font-body text-xs uppercase tracking-[0.15em] text-bella-muted"
              >
                Featured order
              </label>

              <input
                id="menu-featured-order"
                type="number"
                min="1"
                value={featuredOrder}
                onChange={(event) => setFeaturedOrder(event.target.value)}
                disabled={isPending}
                className="mt-2 w-full border border-bella-line bg-bella-cream px-3 py-3 font-body text-sm text-bella-charcoal outline-none focus:border-bella-olive"
              />
            </div>
          )}

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={isPending || categories.length === 0}
              className="bg-bella-charcoal px-6 py-3 font-body text-xs uppercase tracking-[0.15em] text-bella-cream transition hover:bg-bella-olive disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPending ? "Adding..." : saved ? "Added" : "Add dish"}
            </button>
          </div>
        </div>
      </form>
    </details>
  );
}