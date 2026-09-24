"use client";

import { FormEvent, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { updateMenuCategory } from "@/lib/actions/admin-menu-category-update";

type Props = {
  categoryId: string;
  initialName: string;
  initialDisplayOrder: number;
};

export default function MenuCategoryEditForm({
  categoryId,
  initialName,
  initialDisplayOrder,
}: Props) {
  const router = useRouter();

  const [name, setName] = useState(initialName);
  const [displayOrder, setDisplayOrder] = useState(
    String(initialDisplayOrder),
  );
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
    formData.set("displayOrder", displayOrder);

    startTransition(async () => {
      try {
        await updateMenuCategory(formData);

        setSaved(true);
        router.refresh();
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "We could not save the category.",
        );
      }
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 border-t border-bella-line pt-6"
    >
      {error && (
        <div
          className="mb-5 border border-bella-terracotta/30 bg-bella-terracotta/10 p-4 font-body text-sm text-bella-terracotta"
          role="alert"
        >
          {error}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-[1fr_140px_auto] sm:items-end">
        <div>
          <label
            htmlFor={`category-name-${categoryId}`}
            className="block font-body text-xs uppercase tracking-[0.15em] text-bella-muted"
          >
            Category name
          </label>

          <input
            id={`category-name-${categoryId}`}
            value={name}
            onChange={(event) => setName(event.target.value)}
            disabled={isPending}
            className="mt-2 w-full border border-bella-line bg-bella-cream px-3 py-2.5 font-body text-sm text-bella-charcoal outline-none focus:border-bella-olive"
          />
        </div>

        <div>
          <label
            htmlFor={`category-order-${categoryId}`}
            className="block font-body text-xs uppercase tracking-[0.15em] text-bella-muted"
          >
            Order
          </label>

          <input
            id={`category-order-${categoryId}`}
            type="number"
            min="0"
            value={displayOrder}
            onChange={(event) => setDisplayOrder(event.target.value)}
            disabled={isPending}
            className="mt-2 w-full border border-bella-line bg-bella-cream px-3 py-2.5 font-body text-sm text-bella-charcoal outline-none focus:border-bella-olive"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="bg-bella-charcoal px-5 py-2.5 font-body text-xs uppercase tracking-[0.12em] text-bella-cream transition hover:bg-bella-olive disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? "Saving..." : saved ? "Saved" : "Save"}
        </button>
      </div>
    </form>
  );
}