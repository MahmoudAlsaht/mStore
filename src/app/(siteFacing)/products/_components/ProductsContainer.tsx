"use client";
import { ProductCartProvider } from "@/app/(siteFacing)/_context/ProductCartContext";
import { ProductCardProps } from "../[productType]/[id]/page";
import ProductCard from "./ProductCard";
import { ProductCardSkeleton } from "./ProductCardSkeleton";
import { InfiniteData } from "@tanstack/react-query";
import React from "react";

export default function ProductsContainer({
  products,
  data,
  handleClose,
}: {
  handleClose?: () => void;
  products?: ProductCardProps[];
  data?: InfiniteData<
    {
      products: ProductCardProps[];
      hasNextPage: boolean;
      totalCount: number;
    },
    unknown
  >;
}) {
  return (
    <main dir="rtl">
      <section className="mb-5 grid w-full grid-cols-2 gap-x-0 gap-y-5 bg-inherit py-6 sm:mx-auto sm:grid-cols-3 sm:gap-x-2 sm:gap-y-5 md:grid-cols-4 md:gap-2 lg:grid-cols-5">
        {data?.pages.map((pages, i) => (
          <React.Fragment key={i}>
            {pages.products?.map((product) => (
              <ProductCartProvider key={product.id} id={product.id as string}>
                <ProductCard handleClose={handleClose} product={product} />
              </ProductCartProvider>
            ))}
          </React.Fragment>
        ))}
        {products &&
          products?.map((product) => (
            <ProductCartProvider key={product.id} id={product.id as string}>
              <ProductCard handleClose={handleClose} product={product} />
            </ProductCartProvider>
          ))}
      </section>
    </main>
  );
}

export function ProductsContainerSkeleton() {
  return (
    <section className="mb-5 grid w-full grid-cols-2 gap-x-0 gap-y-5 bg-inherit py-6 pt-2 sm:mx-auto sm:grid-cols-3 sm:gap-x-2 sm:gap-y-5 md:grid-cols-4 md:gap-2 lg:grid-cols-5">
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
    </section>
  );
}
