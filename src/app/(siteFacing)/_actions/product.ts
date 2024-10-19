"use server";

import db from "@/db/db";
import { addHours } from "date-fns";
import { ProductCardProps } from "../products/[productType]/[id]/page";
import { Prisma } from "@prisma/client";
import { trimAndNormalizeProductData } from "@/lib/trimAndNormalizeProductData";

function escapeRegExp(str: string) {
  return str?.replace(/[.@&*+?^${}()|[\]\\]/g, ""); // $& means the whole matched string
}

const selectProduct = {
  id: true,
  name: true,
  labels: true,
  description: true,
  body: true,
  price: true,
  newPrice: true,
  productType: true,
  weights: true,
  flavors: true,
  isOffer: true,
  quantity: true,
  image: {
    select: {
      path: true,
    },
  },
};

const orderProductBy = (
  orderBy,
  productType,
  filterSortPrice,
):
  | Prisma.ProductOrderByWithRelationInput
  | Prisma.ProductOrderByWithRelationInput[]
  | undefined =>
  orderBy === "views"
    ? {
        views: "desc",
        newPrice: productType === "offers" ? filterSortPrice : undefined,
        price: productType !== "offers" ? filterSortPrice : undefined,
      }
    : orderBy === "purchases"
      ? {
          numberOfPurchases: "desc",
          newPrice: productType === "offers" ? filterSortPrice : undefined,
          price: productType !== "offers" ? filterSortPrice : undefined,
        }
      : {
          newPrice: productType === "offers" ? filterSortPrice : undefined,
          price: productType !== "offers" ? filterSortPrice : undefined,
        };

export async function handleSearchInput(
  _prevState: unknown,
  formData: FormData,
): Promise<{
  products: ProductCardProps[];
  hasNextPage: boolean;
  totalCount: number;
}> {
  const query = escapeRegExp(formData.get("query") as string);

  if (query === "" || query == null) return await getMostProducts();

  const data = await searchProducts({ inputQuery: query });

  return data;
}

export async function updateProductViews(id: string) {
  const product = await db.product.findUnique({
    where: { id },
    select: { views: true },
  });
  await db.product.update({
    where: { id },
    data: { views: (product?.views as number) + 1 },
  });
}

export async function sortBasedOnPrice(
  products: ProductCardProps[],
  orderBy: string,
) {
  return orderBy === "highest"
    ? products?.toSorted(
        (a, b) =>
          ((b?.newPrice as number) || (b?.price as number)) -
          ((a.newPrice as number) || (a?.price as number)),
      )
    : orderBy === "lowest"
      ? products?.toSorted(
          (a, b) =>
            ((a?.newPrice as number) || (a?.price as number)) -
            ((b.newPrice as number) || (b?.price as number)),
        )
      : products;
}

async function checkProductsOffer() {
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

  await db.product.updateMany({
    where: {
      offerStartsAt: {
        gt: addHours(new Date(), 3),
      },
    },
    data: {
      isOffer: false,
    },
  });

  await db.product.updateMany({
    where: {
      AND: [
        {
          offerStartsAt: {
            lte: addHours(new Date(), 3),
          },
        },
        {
          offerEndsAt: {
            gt: addHours(new Date(), 3),
          },
        },
      ],
    },
    data: {
      isOffer: true,
    },
  });
}

async function getMostProducts() {
  const mostViewedProducts = await db.product.findMany({
    orderBy: { views: "desc" },
    select: selectProduct,
    take: 10,
  });
  const mostPurchasedProducts = await db.product.findMany({
    orderBy: { numberOfPurchases: "desc" },
    take: 10,
    select: selectProduct,
  });
  const mostResentProducts = await db.product.findMany({
    orderBy: {},
    select: selectProduct,
    take: 10,
  });

  const totalCount =
    mostPurchasedProducts.length +
    mostResentProducts.length +
    mostViewedProducts.length;

  return {
    products: [
      ...new Map(
        [
          ...mostPurchasedProducts,
          ...mostViewedProducts,
          ...mostResentProducts,
        ].map((product) => [product["id"], product]),
      ).values(),
    ] as ProductCardProps[],
    hasNextPage: 12 < totalCount,
    totalCount,
  };
}

async function getMatchedProducts(
  baseWhere,
  orderBy,
  productType,
  filterSortPrice,
  limit,
  skip,
) {
  const [products, totalCount] = await Promise.all([
    db.product.findMany({
      where: baseWhere,
      orderBy: orderProductBy(orderBy, productType, filterSortPrice),
      select: selectProduct,
      take: limit + 1,
      skip,
    }),
    db.product.count({ where: baseWhere }),
  ]);

  const hasNextPage = products.length > limit;

  return { products: products as ProductCardProps[], hasNextPage, totalCount };
}

async function getSectionProducts(
  query: string,
  orderBy,
  productType,
  skip,
  limit,
  filterSortPrice,
) {
  const [section, totalCount] = await Promise.all([
    await db.section.findFirst({
      where: {
        name: {
          contains: query as string,
          mode: "insensitive",
        },
      },
      select: {
        categoryProducts: {
          where:
            productType === "for-home"
              ? { productType: "forHome" }
              : productType === "offers"
                ? { isOffer: true }
                : {},
          orderBy: orderProductBy(orderBy, productType, filterSortPrice),
          select: selectProduct,
          take: limit + 1,
          skip,
        },
        brandProducts: {
          where:
            productType === "for-home"
              ? { productType: "forHome" }
              : productType === "offers"
                ? { isOffer: true }
                : {},
          orderBy: orderProductBy(orderBy, productType, filterSortPrice),
          select: selectProduct,
          take: limit + 1,
          skip,
        },
      },
    }),
    await db?.product.count({
      where: {
        OR: [{ category: { name: query } }, { brand: { name: query } }],
      },
    }),
  ]);

  const hasNextPage = skip + limit < (totalCount || 0);

  return {
    products: section
      ? ([
          ...section.brandProducts,
          ...section.categoryProducts,
        ] as ProductCardProps[])
      : [],
    hasNextPage,
    totalCount,
  };
}

export async function searchProducts({
  inputQuery,
  page = 0,
  limit = 12,
  productType,
  orderBy,
  sortPrice,
}: {
  inputQuery?: string;
  page?: number;
  limit?: number;
  productType?: string;
  orderBy?: string;
  sortPrice?: string;
}) {
  const query = escapeRegExp(inputQuery || "");
  const skip = page * limit;

  const filterSortPrice =
    sortPrice === "lowest"
      ? "asc"
      : sortPrice === "highest"
        ? "desc"
        : undefined;

  await checkProductsOffer();

  const baseWhere: Prisma.ProductWhereInput = {
    ...(productType === "for-home" ? { productType: "forHome" } : {}),
    ...(productType === "offers" ? { isOffer: true } : {}),
    ...(query !== "all" && query !== ""
      ? {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { body: { contains: query, mode: "insensitive" } },
          ],
        }
      : {}),
  };

  return (
    await getMatchedProducts(
      baseWhere,
      orderBy,
      productType,
      filterSortPrice,
      limit,
      skip,
    )
  ).products.length > 0
    ? await getMatchedProducts(
        baseWhere,
        orderBy,
        productType,
        filterSortPrice,
        limit,
        skip,
      )
    : await getSectionProducts(
        query,
        orderBy,
        productType,
        skip,
        limit,
        filterSortPrice,
      );
}

export async function getProductsForSection(
  page = 0,
  limit = 12,
  sectionType?: string,
  sectionId?: string,
  productType?: string,
  orderBy?: string,
) {
  const skip = page * limit;

  const baseWhere: Prisma.ProductWhereInput = {
    ...(sectionType === "brands" ? { brandId: sectionId } : {}),
    ...(sectionType === "categories" ? { categoryId: sectionId } : {}),
    ...(productType === "for-home" ? { productType: "forHome" } : {}),
    ...(productType === "offers" ? { isOffer: true } : {}),
  };

  const [products, totalCount] = await Promise.all([
    db.product.findMany({
      where: baseWhere,
      take: limit + 1,
      skip,
      orderBy: orderProductBy(orderBy, productType, "desc"),
      select: selectProduct,
    }),
    db.product.count({ where: baseWhere }),
  ]);

  const hasNextPage = products.length > limit;

  return {
    products: products.slice(0, limit) as ProductCardProps[],
    hasNextPage,
    totalCount,
  };
}
