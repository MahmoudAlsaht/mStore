"use server";
import { trimAndNormalizeProductData } from "@/lib/trimAndNormalizeProductData";
import { deleteCloudinaryImage, upload } from "@/cloudinary";
import db from "@/db/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";

const SectionImageSchema = z
  .instanceof(File, { message: "الرجاء اختر صورة للقسم" })
  .refine((file) => file.size === 0 || file.type.startsWith("image/"));
const editSectionSchema = z.object({
  name: z.string().min(1, "الرجاء ادخال هذا الحقل").optional(),
  type: z.string().min(1, "الرجاء اختيار نوع القسم").optional(),
  sectionImage: SectionImageSchema.optional(),
});

export async function editSection(
  id: string,
  _prevState: unknown,
  formData: FormData,
) {
  const result = editSectionSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (result.success === false) return result.error.formErrors.fieldErrors;

  const data = result.data;

  const currentSection = await db.section.findUnique({
    where: { id },
    select: {
      name: true,
      type: true,
      coverId: true,
      id: true,
    },
  });

  if (data.sectionImage && data.sectionImage.size > 0) {
    const currentSectionImage = await db.image.findUnique({
      where: { id: currentSection?.coverId as string },
    });
    if (currentSectionImage && currentSectionImage.filename)
      deleteCloudinaryImage(currentSectionImage.filename);
    const sectionImage = await upload(data.sectionImage);
    await db.image.update({
      where: { id: currentSectionImage?.id as string },
      data: {
        filename: sectionImage?.filename,
        path: sectionImage?.path,
      },
    });
  }

  await db.section.update({
    where: { id },
    data: {
      name: data.name
        ? ((await trimAndNormalizeProductData(data.name)) as string)
        : currentSection?.name,
      type: data.type || currentSection?.type,
    },
  });

  const bannerFiles = formData.getAll("bannerImages") as File[] | null;
  const mobileBannerFiles = formData.getAll("mobileBannerImages") as
    | File[]
    | null;

  if (bannerFiles && bannerFiles.length > 0)
    updateBannerSection(bannerFiles, currentSection?.id as string, "web");

  if (mobileBannerFiles && mobileBannerFiles.length > 0)
    updateBannerSection(
      mobileBannerFiles,
      currentSection?.id as string,
      "mobile",
    );

  revalidatePath("/", "layout");
  redirect("/admin/settings/sections");
}

async function updateBannerSection(
  files: File[] | null,
  sectionId: string,
  type: "web" | "mobile",
) {
  if (files && files.length > 0) {
    for (const file of files) {
      if (file.size === 0) break;
      const bannerImage = await upload(file);
      await db.section.update({
        where: { id: sectionId },
        data: {
          sectionBanners:
            type === "web"
              ? {
                  create: {
                    imageType: "SectionBannerImage",
                    filename: bannerImage?.filename as string,
                    path: bannerImage?.path as string,
                  },
                }
              : undefined,
          mobileSectionBanners:
            type === "mobile"
              ? {
                  create: {
                    imageType: "SectionBannerImage",
                    filename: bannerImage?.filename as string,
                    path: bannerImage?.path as string,
                  },
                }
              : undefined,
        },
      });
    }
  }
}
