"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function updateRestaurantSettings(formData: FormData) {
  const session = await auth();

  if (session?.user?.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  const restaurantName = formData.get("restaurantName");
  const tagline = formData.get("tagline");
  const description = formData.get("description");
  const address = formData.get("address");
  const phone = formData.get("phone");
  const email = formData.get("email");
  const instagramUrl = formData.get("instagramUrl");
  const facebookUrl = formData.get("facebookUrl");

  if (
    typeof restaurantName !== "string" ||
    typeof tagline !== "string" ||
    typeof description !== "string" ||
    typeof address !== "string" ||
    typeof phone !== "string" ||
    typeof email !== "string" ||
    typeof instagramUrl !== "string" ||
    typeof facebookUrl !== "string"
  ) {
    throw new Error("Invalid restaurant settings.");
  }

  if (!restaurantName.trim()) {
    throw new Error("Restaurant name is required.");
  }

  if (!address.trim()) {
    throw new Error("Address is required.");
  }

  if (!phone.trim()) {
    throw new Error("Phone number is required.");
  }

  if (!email.trim()) {
    throw new Error("Email address is required.");
  }

  const existingSettings = await prisma.restaurantSettings.findFirst();

  if (existingSettings) {
    await prisma.restaurantSettings.update({
      where: { id: existingSettings.id },
      data: {
        restaurantName: restaurantName.trim(),
        tagline: tagline.trim() || null,
        description: description.trim() || null,
        address: address.trim(),
        phone: phone.trim(),
        email: email.trim(),
        instagramUrl: instagramUrl.trim() || null,
        facebookUrl: facebookUrl.trim() || null,
      },
    });
  } else {
    await prisma.restaurantSettings.create({
      data: {
        restaurantName: restaurantName.trim(),
        tagline: tagline.trim() || null,
        description: description.trim() || null,
        address: address.trim(),
        phone: phone.trim(),
        email: email.trim(),
        instagramUrl: instagramUrl.trim() || null,
        facebookUrl: facebookUrl.trim() || null,
      },
    });
  }

  revalidatePath("/admin/settings");
  revalidatePath("/");
  revalidatePath("/contact");
}

export async function updateOpeningHour(formData: FormData) {
  const session = await auth();

  if (session?.user?.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  const id = formData.get("id");
  const openTime = formData.get("openTime");
  const closeTime = formData.get("closeTime");
  const isClosed = formData.get("isClosed");

  if (
    typeof id !== "string" ||
    typeof openTime !== "string" ||
    typeof closeTime !== "string"
  ) {
    throw new Error("Invalid opening hour data.");
  }

  await prisma.openingHour.update({
    where: { id },
    data: {
      openTime: openTime.trim() || null,
      closeTime: closeTime.trim() || null,
      isClosed: isClosed === "true",
    },
  });

  revalidatePath("/admin/settings");
  revalidatePath("/");
  revalidatePath("/contact");
}