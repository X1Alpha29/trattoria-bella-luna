"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { deleteMenuCategory } from "@/lib/actions/admin-menu-category-delete";

type Props = {
  categoryId: string;
  categoryName: string;
  hasDishes: boolean;
};

export default function MenuCategoryDeleteButton({
  categoryId,
  categoryName,
  hasDishes,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (hasDishes) {
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete "${categoryName}"? This cannot be undone.`,
    );

    if (!confirmed) {
      return;
    }

    const formData = new FormData();
    formData.set("categoryId", categoryId);

    startTransition(async () => {
      try {
        await deleteMenuCategory(formData);
        router.refresh();
      } catch (error) {
        window.alert(
          error instanceof Error
            ? error.message
            : "We could not delete the category.",
        );
      }
    });
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending || hasDishes}
      title={
        hasDishes
          ? "Remove all dishes from this category before deleting it."
          : undefined
      }
      className="border border-bella-terracotta/30 px-4 py-2 font-body text-xs uppercase tracking-[0.12em] text-bella-terracotta transition hover:bg-bella-terracotta/10 disabled:cursor-not-allowed disabled:opacity-40"
    >
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
}