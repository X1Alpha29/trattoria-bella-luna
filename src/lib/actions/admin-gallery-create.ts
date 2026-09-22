"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const allowedCategories = [
  "FOOD",
  "INTERIOR",
  "PEOPLE",
  "EVENTS",
] as const;

export async function createGalleryImage(formData: FormData) {
  const session = await auth();

  if (session?.user?.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  const url = formData.get("url");
  const title = formData.get("title");
  const caption = formData.get("caption");
  const category = formData.get("category");
  const displayOrder = formData.get("displayOrder");
  const isFeatured = formData.get("isFeatured");

  if (
    typeof url !== "string" ||
    typeof title !== "string" ||
    typeof caption !== "string" ||
    typeof category !== "string" ||
    typeof displayOrder !== "string"
  ) {
    throw new Error("Invalid gallery image data.");
  }

  if (!url.trim()) {
    throw new Error("Image URL is required.");
  }

  if (
    !allowedCategories.includes(
      category as (typeof allowedCategories)[number],
    )
  ) {
    throw new Error("Invalid gallery category.");
  }

  const parsedDisplayOrder = Number.parseInt(displayOrder, 10);

  if (Number.isNaN(parsedDisplayOrder) || parsedDisplayOrder < 0) {
    throw new Error("Display order must be 0 or greater.");
  }

  await prisma.galleryImage.create({
    data: {
      url: url.trim(),
      title: title.trim() || null,
      caption: caption.trim() || null,
      category: category as (typeof allowedCategories)[number],
      displayOrder: parsedDisplayOrder,
      isFeatured: isFeatured === "true",
    },
  });

  revalidatePath("/admin/gallery");
  revalidatePath("/");
}
