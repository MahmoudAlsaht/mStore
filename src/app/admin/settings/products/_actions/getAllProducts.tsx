"use server";

import db from "@/db/db";
import { Product } from "@prisma/client";
import { addHours } from "date-fns";

export const getAllProducts = async () => {
  await db.product.updateMany({
    where: {
      offerEndsAt: {
        lt: addHours(new Date(), 3),
      },
    },
    data: {
      newPrice: null,
      isOffer: false,
      offerStartsAt: null,
      offerEndsAt: null,
    },
  });

  const products = await db.product.findMany({
    select: {
      id: true,
      name: true,
      productType: true,
      categoryId: true,
      brandId: true,
      barCode: true,
      image: {
        select: {
          path: true,
        },
      },
    },
  });

  const selectedProducts = products.map((product, index) => ({
    id: product.id,
    index: index + 1,
    name: product.name,
    image: product.image?.path,
    barCodes: product.barCode.map((barCode) => ({
      code: barCode.value,
      id: barCode.id,
    })),
  }));

  return selectedProducts;
};
