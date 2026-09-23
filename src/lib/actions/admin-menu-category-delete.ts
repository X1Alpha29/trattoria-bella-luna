"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function deleteMenuCategory(formData: FormData) {
  const session = await auth();

  if (session?.user?.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  const categoryId = formData.get("categoryId");

  if (typeof categoryId !== "string" || !categoryId) {
    throw new Error("Invalid category.");
  }

  const dishCount = await prisma.menuItem.count({
    where: {
      categoryId,
    },
  });

  if (dishCount > 0) {
    throw new Error(
      "This category cannot be deleted while it contains dishes.",
    );
  }

  await prisma.menuCategory.delete({
    where: {
      id: categoryId,
    },
  });

  revalidatePath("/admin/menu");
  revalidatePath("/menu");
}