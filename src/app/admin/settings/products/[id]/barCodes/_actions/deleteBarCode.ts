"use server";

import db from "@/db/db";

export async function deleteBarCode(productId: string, barCodeId: string) {
  await db.product.update({
    where: { id: productId },
    data: {
      barCode: {
        delete: { id: barCodeId },
      },
    },
  });

  await db.barCode.delete({ where: { id: barCodeId } });
}
