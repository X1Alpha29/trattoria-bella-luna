"use client";

import { FormEvent, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { createMenuCategory } from "@/lib/actions/admin-menu-category";

export default function MenuCategoryCreateForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSaved(false);

    const formData = new FormData();
    formData.set("name", name);

    startTransition(async () => {
      try {
        await createMenuCategory(formData);

        setName("");
        setSaved(true);
        router.refresh();
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "We could not create the category.",
        );
      }
    });
  }

  return (
    <details className="max-w-4xl border border-bella-line bg-bella-white">
      <summary className="flex cursor-pointer list-none items-center justify-between px-6 py-5 sm:px-8">
        <div>
          <p className="font-body text-xs uppercase tracking-[0.2em] text-bella-olive">
            Categories
          </p>

          <h2 className="mt-1 font-display text-2xl text-bella-charcoal">
            Add menu category
          </h2>
        </div>

        <span className="font-body text-2xl text-bella-charcoal">+</span>
      </summary>

      <form
        onSubmit={handleSubmit}
        className="border-t border-bella-line p-6 sm:p-8"
      >
        {error && (
          <div
            className="mb-5 border border-bella-terracotta/30 bg-bella-terracotta/10 p-4 font-body text-sm text-bella-terracotta"
            role="alert"
          >
            {error}
          </div>
        )}

        <div className="flex gap-3">
          <input
            type="text"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            disabled={isPending}
            placeholder="e.g. Risotto"
            className="min-w-0 flex-1 border border-bella-line bg-bella-cream px-3 py-3 font-body text-sm text-bella-charcoal outline-none focus:border-bella-olive"
          />

          <button
            type="submit"
            disabled={isPending}
            className="shrink-0 bg-bella-charcoal px-5 py-3 font-body text-xs uppercase tracking-[0.15em] text-bella-cream transition hover:bg-bella-olive disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? "Adding..." : saved ? "Added" : "Add"}
          </button>
        </div>
      </form>
    </details>
  );
}