"use server";

import { trimAndNormalizeProductData } from "@/lib/trimAndNormalizeProductData";
import db from "@/db/db";

export async function createNewLabels(formData: FormData, productId: string) {
  const selectedLabels = formData.getAll("labels");

  for (const label of selectedLabels) {
    const dbLabel = await db.label.findFirst({
      where: {
        value: (await trimAndNormalizeProductData(label.toString())) as string,
      },
    });
    if (dbLabel != null) {
      const product = await db.product.findUnique({
        where: { id: productId },
        select: {
          labels: { where: { id: dbLabel.id } },
        },
      });
      if (product && product.labels && product.labels.length === 0) {
        await db.label.update({
          where: { id: dbLabel.id },
          data: {
            products: {
              connect: [{ id: productId }],
            },
          },
        });
      }
    } else
      await db.product.update({
        where: { id: productId },
        data: {
          labels: {
            create: {
              value: (await trimAndNormalizeProductData(
                label.toString(),
              )) as string,
            },
          },
        },
      });
  }
}
