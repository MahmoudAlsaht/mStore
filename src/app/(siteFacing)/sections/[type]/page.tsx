import db from "@/db/db";
import { cache } from "@/lib/cache";
import { notFound } from "next/navigation";
import { SectionCardProps } from "../_components/SectionCard";
import BackButtonNav from "@/components/BackButtonNav";
import SectionsContainer, {
  SectionsContainerSkeleton,
} from "../_components/SectionsContainer";
import { Suspense } from "react";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "الأقسام و العلامات التجارية",
};

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

export default function SectionsPage({
  params: { type },
}: {
  params: { type: string };
}) {
  if (type !== "categories" && type !== "brands") return notFound();

  return (
    <div dir="rtl" className="mx-auto h-screen pb-16 sm:px-6">
      <BackButtonNav goHome />
      <h1 className="mb-4 mt-10 text-center text-4xl">
        {type === "categories" ? "الفئات" : "العلامات التجارية"}
      </h1>
      <Suspense fallback={<SectionsContainerSkeleton />}>
        <SectionsPageSuspense type={type} />
      </Suspense>
      <div className="h-20"></div>
    </div>
  );
}

async function SectionsPageSuspense({ type }: { type: string }) {
  const sections = await getSections(type);
  return <SectionsContainer sections={sections as SectionCardProps[]} />;
}
