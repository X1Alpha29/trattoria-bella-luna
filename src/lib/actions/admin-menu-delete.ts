"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function deleteMenuItem(formData: FormData) {
  const session = await auth();

  if (session?.user?.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  const itemId = formData.get("itemId");

  if (typeof itemId !== "string" || !itemId) {
    throw new Error("Invalid menu item.");
  }

  await prisma.menuItem.delete({
    where: {
      id: itemId,
    },
  });

  revalidatePath("/admin/menu");
  revalidatePath("/menu");
  revalidatePath("/");
  revalidatePath("/admin");
}