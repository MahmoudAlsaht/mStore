// import { getProducts } from "@/app/(siteFacing)/_actions/product";
import Banner from "@/app/(siteFacing)/_components/Banner";
import { ProductCardProps } from "@/app/(siteFacing)/products/[productType]/[id]/page";
import { ProductsContainerSkeleton } from "@/app/(siteFacing)/products/_components/ProductsContainer";
import ProductsInfiniteScrolling from "@/app/(siteFacing)/products/_components/ProductsInfiniteScrolling";
import BackButtonNav from "@/components/BackButtonNav";
import db from "@/db/db";
import { Section } from "@prisma/client";
import React from "react";
import { Suspense } from "react";

const getSectionBanners = (id: string) => {
  return db.section.findUnique({
    where: { id },
    select: {
      name: true,
      sectionBanners: {
        select: {
          id: true,
          path: true,
          link: true,
        },
      },
      mobileSectionBanners: {
        select: {
          id: true,
          path: true,
          link: true,
        },
      },
    },
  });
};

export default function SectionProducts({
  params: { id, type },
}: {
  params: { id: string; type: string };
}) {
  return (
    <section>
      <BackButtonNav />
      <Suspense>
        <SectionBannersSuspense id={id} type={type} />
      </Suspense>
      <Suspense fallback={<ProductsContainerSkeleton />}>
        <SectionProductsSuspense id={id} type={type} />
      </Suspense>
      <div className="h-20"></div>
    </section>
  );
}

type SectionProducts = Partial<Section> & {
  name: string;
  brandProducts: ProductCardProps[];
  categoryProducts: ProductCardProps[];
  sectionBanners: {
    id: string;
    path: string;
    link: string;
  }[];
  mobileSectionBanners: {
    id: string;
    path: string;
    link: string;
  }[];
};

async function SectionBannersSuspense({
  id,
  type,
}: {
  id: string;
  type: string;
}) {
  const section = (await getSectionBanners(id)) as any;

  return (
    <>
      <div className="hidden sm:block">
        <Banner
          type={`${type === "categories" ? "category" : "brand"}'s Banner`}
          sectionId={id}
          sectionBanners={(section as SectionProducts)?.sectionBanners?.map(
            (banner, index) => ({
              id: `${index}-${section.name}-${type}`,
              path: banner.path,
              link: banner.link as string,
            }),
          )}
        />
        <h1 className="mt-4 text-center text-4xl">{section?.name}</h1>
      </div>

      <div className="sm:hidden">
        <Banner
          type={`${type === "categories" ? "category" : "brand"}'s Banner`}
          sectionId={id}
          sectionBanners={(
            section as SectionProducts
          )?.mobileSectionBanners?.map((banner, index) => ({
            id: `${index}-${section.name}-${type}`,
            path: banner.path,
            link: banner.link as string,
          }))}
        />
        <h1 className="mt-4 text-center text-4xl">{section?.name}</h1>
      </div>
    </>
  );
}

function SectionProductsSuspense({ id, type }: { id: string; type: string }) {
  return (
    <ProductsInfiniteScrolling
      productType={"forSectionPage"}
      sectionId={id}
      sectionType={type}
    />
  );
}
