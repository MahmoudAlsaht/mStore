"use server";

import { trimAndNormalizeProductData } from "@/lib/trimAndNormalizeProductData";
import { upload } from "@/cloudinary";
import db from "@/db/db";

export async function createSection(formData: FormData) {
  const name = formData.get("name")?.toString();
  const image = formData.get("image") as File | null;
  const type = formData.get("type")?.toString();

  if (name == null) return "nameError";
  if (type == null) return "typeError";
  if (image == null) return "imageError";

  const isSectionExists = await db.section.findFirst({
    where: {
      AND: [
        { name: (await trimAndNormalizeProductData(name)) as string },
        { type },
      ],
    },
  });

  if (isSectionExists) return "duplicate";

  const sectionCover = await upload(image);
  if (sectionCover == null) return "errorUpload";

  const { filename, path } = sectionCover;

  if (!filename || !path) return "errorUpload";

  const newSection = await db.section.create({
    data: {
      name: (await trimAndNormalizeProductData(name)) as string,
      type,
      cover: {
        create: {
          imageType: "SectionCover",
          filename,
          path,
        },
      },
    },
  });

  if (!newSection) return "errorCreateSection";

  return `${newSection.id} ${newSection.name}`;
}
