"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

function createSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function updateMenuCategory(formData: FormData) {
  const session = await auth();

  if (session?.user?.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  const categoryId = formData.get("categoryId");
  const name = formData.get("name");
  const displayOrder = formData.get("displayOrder");

  if (
    typeof categoryId !== "string" ||
    typeof name !== "string" ||
    typeof displayOrder !== "string"
  ) {
    throw new Error("Invalid category data.");
  }

  const trimmedName = name.trim();

  if (!trimmedName) {
    throw new Error("Category name is required.");
  }

  const parsedDisplayOrder = Number.parseInt(displayOrder, 10);

  if (Number.isNaN(parsedDisplayOrder) || parsedDisplayOrder < 0) {
    throw new Error("Display order must be 0 or greater.");
  }

  const slug = createSlug(trimmedName);

  if (!slug) {
    throw new Error("Category name must contain valid characters.");
  }

  const existingCategory = await prisma.menuCategory.findFirst({
    where: {
      OR: [
        {
          name: {
            equals: trimmedName,
            mode: "insensitive",
          },
        },
        { slug },
      ],
      NOT: {
        id: categoryId,
      },
    },
  });

  if (existingCategory) {
    throw new Error("A category with this name already exists.");
  }

  await prisma.menuCategory.update({
    where: {
      id: categoryId,
    },
    data: {
      name: trimmedName,
      slug,
      displayOrder: parsedDisplayOrder,
    },
  });

  revalidatePath("/admin/menu");
  revalidatePath("/menu");
}