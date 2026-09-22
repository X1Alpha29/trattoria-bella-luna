"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";

const allowedCategories = [
  "FOOD",
  "INTERIOR",
  "PEOPLE",
  "EVENTS",
] as const;

function createSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function createMenuItem(formData: FormData) {
  const session = await auth();

  if (session?.user?.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  const categoryId = formData.get("categoryId");
  const name = formData.get("name");
  const description = formData.get("description");
  const price = formData.get("price");
  const imageUrl = formData.get("imageUrl");
  const dietaryTags = formData.get("dietaryTags");
  const displayOrder = formData.get("displayOrder");
  const isAvailable = formData.get("isAvailable");
  const isFeatured = formData.get("isFeatured");
  const featuredOrder = formData.get("featuredOrder");

  if (
    typeof categoryId !== "string" ||
    typeof name !== "string" ||
    typeof description !== "string" ||
    typeof price !== "string" ||
    typeof imageUrl !== "string" ||
    typeof dietaryTags !== "string" ||
    typeof displayOrder !== "string" ||
    typeof featuredOrder !== "string"
  ) {
    throw new Error("Invalid menu item data.");
  }

  if (!name.trim()) {
    throw new Error("Dish name is required.");
  }

  const parsedPrice = Number(price);
  const parsedDisplayOrder = Number.parseInt(displayOrder, 10);
  const parsedFeaturedOrder = featuredOrder.trim()
    ? Number.parseInt(featuredOrder, 10)
    : null;

  if (!Number.isFinite(parsedPrice) || parsedPrice < 0) {
    throw new Error("Price must be a valid number.");
  }

  if (Number.isNaN(parsedDisplayOrder) || parsedDisplayOrder < 0) {
    throw new Error("Display order must be 0 or greater.");
  }

  if (
    parsedFeaturedOrder !== null &&
    (Number.isNaN(parsedFeaturedOrder) || parsedFeaturedOrder < 1)
  ) {
    throw new Error("Featured order must be 1 or greater.");
  }

  const category = await prisma.menuCategory.findUnique({
    where: { id: categoryId },
  });

  if (!category) {
    throw new Error("Menu category not found.");
  }

  const tags = dietaryTags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  const baseSlug = createSlug(name);

  if (!baseSlug) {
    throw new Error("Dish name must contain valid characters.");
  }

  let slug = baseSlug;
  let counter = 2;

  while (await prisma.menuItem.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${counter}`;
    counter += 1;
  }

  await prisma.menuItem.create({
    data: {
      categoryId,
      name: name.trim(),
      slug,
      description: description.trim() || null,
      price: new Prisma.Decimal(parsedPrice),
      imageUrl: imageUrl.trim() || null,
      dietaryTags: tags,
      displayOrder: parsedDisplayOrder,
      isAvailable: isAvailable === "true",
      isFeatured: isFeatured === "true",
      featuredOrder:
        isFeatured === "true" ? parsedFeaturedOrder : null,
    },
  });

  revalidatePath("/admin/menu");
  revalidatePath("/menu");
  revalidatePath("/");
  revalidatePath("/admin");
}