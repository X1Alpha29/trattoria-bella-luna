"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { deleteMenuItem } from "@/lib/actions/admin-menu-delete";

type Props = {
  itemId: string;
  itemName: string;
};

export default function MenuItemDeleteButton({
  itemId,
  itemName,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${itemName}"? This cannot be undone.`,
    );

    if (!confirmed) {
      return;
    }

    const formData = new FormData();
    formData.set("itemId", itemId);

    startTransition(async () => {
      await deleteMenuItem(formData);
      router.refresh();
    });
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      className="w-full border border-bella-terracotta/30 px-4 py-3 font-body text-xs uppercase tracking-[0.15em] text-bella-terracotta transition hover:bg-bella-terracotta/10 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isPending ? "Deleting..." : "Delete dish"}
    </button>
  );
}