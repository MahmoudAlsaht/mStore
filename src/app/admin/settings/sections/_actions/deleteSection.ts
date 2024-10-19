"use server";

import { deleteCloudinaryImage } from "@/cloudinary";
import db from "@/db/db";
import { revalidatePath } from "next/cache";

export async function deleteSection(id: string) {
  const section = await db.section.findUnique({
    where: { id },
    select: {
      type: true,
      coverId: true,
      cover: {
        select: {
          filename: true,
        },
      },
      sectionBanners: {
        select: {
          id: true,
          filename: true,
        },
      },
      mobileSectionBanners: {
        select: {
          id: true,
          filename: true,
        },
      },
    },
  });

  if (section == null) return;

  await db.section.delete({ where: { id } });

  if (section?.cover?.filename)
    deleteCloudinaryImage(section?.cover.filename as string);
  await db.image.delete({
    where: { id: section?.coverId as string },
  });

  if (section?.sectionBanners && section?.sectionBanners.length) {
    for (const image of section?.sectionBanners) {
      image.filename && deleteCloudinaryImage(image.filename as string);
      await db.image.delete({
        where: { id: image.id as string },
      });
    }
  }

  if (section?.mobileSectionBanners && section?.mobileSectionBanners.length) {
    for (const image of section?.mobileSectionBanners) {
      image.filename && deleteCloudinaryImage(image.filename as string);
      await db.image.delete({
        where: { id: image.id as string },
      });
    }
  }

  revalidatePath("/", "layout");
}
