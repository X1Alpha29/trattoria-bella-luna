"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";

export async function updateMenuItem(formData: FormData) {
  const session = await auth();

  if (session?.user?.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  const itemId = formData.get("itemId");
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
    typeof itemId !== "string" ||
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

  const parsedPrice = Number(price);
  const parsedDisplayOrder = Number.parseInt(displayOrder, 10);
  const parsedFeaturedOrder = featuredOrder.trim()
    ? Number.parseInt(featuredOrder, 10)
    : null;

  if (!name.trim()) {
    throw new Error("Dish name is required.");
  }

  if (!Number.isFinite(parsedPrice) || parsedPrice < 0) {
    throw new Error("Price must be a valid positive number.");
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

  const tags = dietaryTags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  await prisma.menuItem.update({
    where: { id: itemId },
    data: {
      name: name.trim(),
      description: description.trim() || null,
      price: new Prisma.Decimal(parsedPrice),
      imageUrl: imageUrl.trim() || null,
      dietaryTags: tags,
      displayOrder: parsedDisplayOrder,
      isAvailable: isAvailable === "true",
      isFeatured: isFeatured === "true",
      featuredOrder: parsedFeaturedOrder,
    },
  });

  revalidatePath("/admin/menu");
  revalidatePath("/menu");
  revalidatePath("/");
  revalidatePath("/admin");
}