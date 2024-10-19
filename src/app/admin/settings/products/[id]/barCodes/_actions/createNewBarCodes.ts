"use server";

import { trimAndNormalizeProductData } from "@/lib/trimAndNormalizeProductData";
import db from "@/db/db";

export async function createNewBarCodes(formData: FormData, productId: string) {
  const selectedBarCodes = formData.getAll("barCodes");

  for (const barCode of selectedBarCodes) {
    const dbBarCode = await db.barCode.findFirst({
      where: {
        value: (await trimAndNormalizeProductData(
          barCode.toString(),
        )) as string,
      },
    });
    if (dbBarCode != null) {
      const product = await db.product.findUnique({
        where: { id: productId },
        select: {
          barCode: { where: { id: dbBarCode.id } },
        },
      });
      if (product && product.barCode && product.barCode.length === 0) {
        await db.barCode.update({
          where: { id: dbBarCode.id },
          data: {
            product: {
              connect: { id: productId },
            },
          },
        });
      }
    } else
      await db.product.update({
        where: { id: productId },
        data: {
          barCode: {
            create: {
              value: (await trimAndNormalizeProductData(
                barCode.toString(),
              )) as string,
            },
          },
        },
      });
  }
}
