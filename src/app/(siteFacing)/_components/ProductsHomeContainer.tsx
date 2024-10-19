import React from "react";
import { ArrowLeftCircle } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { searchProducts } from "../_actions/product";
import { Button } from "@/components/ui/button";
import { LoadingLink } from "@/app/(siteFacing)/_context/LoadingContext";
import ProductCard from "../products/_components/ProductCard";
import { ProductCardProps } from "../products/[productType]/[id]/page";
import { ProductCartProvider } from "@/app/(siteFacing)/_context/ProductCartContext";

const getProducts = async (
  productType: string,
  orderBy?: string,
  search?: string,
) =>
  await searchProducts({ inputQuery: search, orderBy, productType, limit: 10 });

export default async function SectionsHomeContainer({
  type,
}: {
  type: string;
}) {
  const data = await getProducts(
    type === "newest offers" ? "offers" : "any",
    type,
  );

  return data?.products?.length ? (
    <section className="my-6 sm:container">
      <hr className="my-2 border-slate-300" />
      <div className="mx-2 mb-3 flex items-center justify-between gap-2 sm:mb-6 sm:mt-4">
        <h2 className="text-xs font-semibold capitalize text-rayanPrimary-dark sm:text-2xl">
          {type === "views"
            ? "الأكثر مشاهدة"
            : type === "purchases"
              ? "الأكثر مبيعا"
              : "آخر العروض"}
        </h2>

        <LoadingLink
          className="flex gap-2 rounded-3xl bg-rayanPrimary-dark px-3 py-1 text-xs font-medium capitalize leading-6 text-white transition sm:text-sm"
          href={`/products${type === "views" || type === "purchases" ? `/any?orderBy=${type}` : "/offers?orderBy=createdAt"}`}
        >
          <span>المزيد</span>
          <ArrowLeftCircle />
        </LoadingLink>
      </div>

      <Carousel
        opts={{
          align: "center",
          loop: true,
          dragFree: true,
          slidesToScroll: "auto",
          duration: 3500,
          direction: "rtl",
        }}
        className="w-11/12"
      >
        <CarouselContent>
          {data.products.map(
            (product) =>
              product.quantity > 0 && (
                <CarouselItem
                  key={product.id}
                  className="basis-3/4 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
                >
                  <ProductCartProvider id={product.id as string}>
                    <ProductCard product={product as ProductCardProps} />
                  </ProductCartProvider>
                </CarouselItem>
              ),
          )}
        </CarouselContent>
      </Carousel>
    </section>
  ) : null;
}

export function HomeProductSkeleton() {
  return (
    <section className="flex h-96 w-full flex-col p-2">
      <div className="flex justify-between px-2">
        <Button
          disabled
          className="h-5 w-1/4 animate-pulse rounded-lg bg-gray-400"
        ></Button>
        <Button
          disabled
          className="h-5 w-1/4 animate-pulse rounded-lg bg-gray-400"
        ></Button>
      </div>
      <div className="mt-4 flex h-full w-full basis-3/4 gap-2 p-2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6">
        <div className="h-72 w-1/12 animate-pulse rounded-lg bg-gray-400 sm:hidden" />

        <div className="mx-auto h-72 w-9/12 animate-pulse rounded-2xl bg-gray-400 sm:h-80 sm:w-full" />

        <div className="h-72 w-1/12 animate-pulse rounded-lg bg-gray-400 sm:h-80 sm:w-full sm:rounded-2xl" />

        <div className="hidden h-80 w-full animate-pulse rounded-2xl bg-gray-400 md:block" />
        <div className="hidden h-80 w-full animate-pulse rounded-2xl bg-gray-400 lg:block" />
        <div className="hidden h-80 w-full animate-pulse rounded-2xl bg-gray-400 xl:block" />
        <div className="hidden h-80 w-full animate-pulse rounded-2xl bg-gray-400 lg:block" />
      </div>
    </section>
  );
}
