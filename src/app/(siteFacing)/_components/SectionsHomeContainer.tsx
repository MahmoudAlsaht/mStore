import React from "react";
import db from "@/db/db";
import { cache } from "@/lib/cache";
import { ArrowLeftCircle } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import SectionCarouselCard from "./SectionCarouselCard";
import { SectionCardProps } from "../sections/_components/SectionCard";
import { LoadingLink } from "@/app/(siteFacing)/_context/LoadingContext";

const getSections = cache(
  (type: string) => {
    return db.section.findMany({
      where: { type },
      select: {
        id: true,
        name: true,
        type: true,
        cover: {
          select: {
            path: true,
          },
        },
      },
    });
  },
  ["/sections", "getSections"],
);

export default async function SectionsHomeContainer({
  type,
}: {
  type: string;
}) {
  const sections = await getSections(type);

  return sections.length ? (
    <section className="my-4 sm:container">
      <div className="mx-2 mb-3 flex items-center justify-between gap-2 sm:mx-0 sm:mb-6 sm:mt-4">
        <small className="text-xs font-semibold capitalize text-rayanPrimary-dark sm:text-2xl">
          {type === "brands" ? "العلامات التجارية" : "الفئات"}
        </small>
        <LoadingLink
          className="flex gap-2 rounded-3xl bg-rayanPrimary-dark px-3 py-1 text-xs font-medium capitalize leading-6 text-white transition sm:text-sm"
          href={`/sections/${type}`}
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
          direction: "rtl",
          duration: 4000,
        }}
        className="w-11/12"
      >
        <CarouselContent>
          {sections.map((section, index) => (
            <CarouselItem
              key={section.id}
              className="basis-1/3 sm:basis-1/4 md:basis-1/6"
            >
              <SectionCarouselCard section={section as SectionCardProps} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  ) : null;
}
