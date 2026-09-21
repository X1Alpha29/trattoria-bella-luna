import { prisma } from "@/lib/prisma";

export type GalleryImageView = {
  id: string;
  url: string;
  title: string;
  caption: string;
  category: string;
};

export async function getGalleryImages(): Promise<GalleryImageView[]> {
  const images = await prisma.galleryImage.findMany({
    orderBy: [
      {
        isFeatured: "desc",
      },
      {
        displayOrder: "asc",
      },
    ],
    take: 6,
  });

  return images.map((image) => ({
    id: image.id,
    url: image.url,
    title: image.title ?? "Bella Luna",
    caption: image.caption ?? "",
    category: image.category,
  }));
}