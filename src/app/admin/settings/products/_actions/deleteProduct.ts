"use server";

import { deleteCloudinaryImage } from "@/cloudinary";
import db from "@/db/db";
import { revalidatePath } from "next/cache";

export async function deleteProduct(id: string) {
  const product = await db.product.findUnique({
    where: { id },
    select: {
      labelIds: true,
      imageId: true,
      image: {
        select: {
          filename: true,
        },
      },
    },
  });

  if (product == null) return;

  if (product.labelIds && product.labelIds.length > 0) {
    for (const labelId of product.labelIds) {
      const label = await db.label.findUnique({
        where: { id: labelId },
        select: {
          productIds: true,
        },
      });

      await db.label.update({
        where: { id: labelId },
        data: {
          productIds: label?.productIds.filter((p) => p !== id),
        },
      });
    }
  }

  await db.product.delete({ where: { id } });

  if (product?.image?.filename)
    deleteCloudinaryImage(product?.image.filename as string);
  await db.image.delete({
    where: { id: product?.imageId as string },
  });

  revalidatePath("/", "layout");
}
