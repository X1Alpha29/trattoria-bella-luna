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

export async function createMenuCategory(formData: FormData) {
  const session = await auth();

  if (session?.user?.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  const name = formData.get("name");

  if (typeof name !== "string" || !name.trim()) {
    throw new Error("Category name is required.");
  }

  const slug = createSlug(name);

  if (!slug) {
    throw new Error("Category name must contain valid characters.");
  }

  const existing = await prisma.menuCategory.findFirst({
    where: {
      OR: [
        { name: { equals: name.trim(), mode: "insensitive" } },
        { slug },
      ],
    },
  });

  if (existing) {
    throw new Error("A category with this name already exists.");
  }

  const lastCategory = await prisma.menuCategory.findFirst({
    orderBy: {
      displayOrder: "desc",
    },
  });

  await prisma.menuCategory.create({
    data: {
      name: name.trim(),
      slug,
      displayOrder: (lastCategory?.displayOrder ?? -1) + 1,
    },
  });

  revalidatePath("/admin/menu");
  revalidatePath("/menu");
}
