import { ProductsContainerSkeleton } from "../_components/ProductsContainer";
import BackButtonNav from "@/components/BackButtonNav";
import Banner from "../../_components/Banner";
import ProductMobileNav from "../_components/ProductMobileNav";
import { Suspense } from "react";
import db from "@/db/db";
import type { Metadata } from "next";
import ProductsInfiniteScrolling from "../_components/ProductsInfiniteScrolling";

export const metadata: Metadata = {
  title: "منتجاتنا",
};

export default async function Products({
  params: { productType },
  searchParams: { orderBy, search, sortPrice },
}: {
  params: { productType: string };
  searchParams: { orderBy: string; search: string; sortPrice: string };
}) {
  return (
    <div dir="rtl" className="h-screen">
      <div className="sm:hidden">
        <BackButtonNav goHome />
      </div>

      <ProductsMobileSuspense
        productType={productType}
        search={search}
        sortPrice={sortPrice}
      />

      <Suspense fallback={<ProductsContainerSkeleton />}>
        <ProductsSuspense
          productType={productType}
          orderBy={orderBy}
          search={search}
          sortPrice={sortPrice}
        />
      </Suspense>

      <div className="h-20"></div>
    </div>
  );
}

async function ProductsMobileSuspense({
  productType,
  search,
  sortPrice,
}: {
  productType?: string;
  search: string;
  sortPrice: string;
}) {
  const forHomeProducts = await db.product.findFirst({
    where: { productType: "forHome" },
  });
  const offers = await db.product.findFirst({ where: { isOffer: true } });

  return (
    <>
      <ProductMobileNav
        sortPrice={sortPrice}
        offersExists={offers !== null}
        forHomeExists={forHomeProducts !== null}
        query={search}
        banner={
          (productType === "offers" || productType === "for-home") && (
            <Banner type={productType === "for-home" ? "forHome" : "offers"} />
          )
        }
      />
    </>
  );
}

async function ProductsSuspense({
  productType,
  orderBy,
  search,
  sortPrice,
}: {
  productType?: string;
  orderBy?: string;
  search?: string;
  sortPrice?: string;
}) {
  return (
    <>
      <ProductsInfiniteScrolling
        productType={productType}
        orderBy={orderBy}
        query={search}
        sortPrice={sortPrice}
      />
    </>
  );
}
