"use client";
import React, { useCallback, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import ProductsContainer, {
  ProductsContainerSkeleton,
} from "./ProductsContainer";
import { getProductsForSection, searchProducts } from "../../_actions/product";

export default function ProductsInfiniteScrolling({
  sectionType,
  sectionId,
  productType,
  orderBy,
  query,
  sortPrice,
  handleClose,
}: {
  query?: string;
  sectionType?: string;
  sectionId?: string;
  productType?: string;
  orderBy?: string;
  sortPrice?: string;
  handleClose?: () => void;
}) {
  const { ref, inView } = useInView();

  const fetchProducts = useCallback(
    async ({ pageParam = 0 }) => {
      if (productType === "forSectionPage")
        return getProductsForSection(
          pageParam,
          12,
          sectionType,
          sectionId,
          productType,
          orderBy,
        );

      return searchProducts({
        inputQuery: query,
        page: pageParam,
        limit: 12,
        productType,
        orderBy,
        sortPrice,
      });
    },
    [orderBy, productType, query, sectionId, sectionType, sortPrice],
  );

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch,
  } = useInfiniteQuery({
    queryKey: [
      "products",
      sectionType,
      sectionId,
      productType,
      orderBy,
      query,
      sortPrice,
    ],
    queryFn: fetchProducts,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.hasNextPage) {
        return allPages.length;
      }
      return undefined;
    },
  });

  useEffect(() => {
    refetch();
  }, [sectionType, sectionId, productType, orderBy, query, sortPrice, refetch]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  if (status === "pending") return <ProductsContainerSkeleton />;
  if (status === "error") return <div>Error: {(error as Error).message}</div>;

  return (
    <>
      <ProductsContainer handleClose={handleClose} data={data} />

      <div ref={ref}>
        {isFetchingNextPage ? (
          <div className="flex items-center justify-center space-x-2">
            <span className="sr-only">Loading...</span>
            <div className="h-4 w-4 animate-bounce rounded-full bg-black [animation-delay:-0.3s] sm:h-8 sm:w-8"></div>
            <div className="h-4 w-4 animate-bounce rounded-full bg-black [animation-delay:-0.15s] sm:h-8 sm:w-8"></div>
            <div className="h-4 w-4 animate-bounce rounded-full bg-black sm:h-8 sm:w-8"></div>
          </div>
        ) : hasNextPage ? (
          ""
        ) : (
          <div className="py-4 text-center">لا يوجد المزيد من المنتجات</div>
        )}
      </div>
    </>
  );
}
