import db from "@/db/db";
import { cache } from "@/lib/cache";
import Link from "next/link";
import { Suspense } from "react";
import { checkUser } from "../auth/_actions/isAuthenticated";
import { Button } from "@/components/ui/button";
import ImageCarousel from "./ImageCarousel";

const getBanner = cache(
  (type: string) => {
    return db.banner.findUnique({
      where: { bannerType: type },
      select: {
        id: true,
        images: {
          select: {
            bannerId: true,
            id: true,
            path: true,
            link: true,
          },
        },
        mobileImages: {
          select: {
            bannerId: true,
            id: true,
            path: true,
            link: true,
          },
        },
      },
    });
  },
  ["/", "getBanner"],
);

export default function Banner({
  type,
  sectionBanners,
  sectionId,
}: {
  type: string;
  sectionId?: string;
  sectionBanners?: {
    id: string;
    path: string;
    link: string;
  }[];
}) {
  return (
    <Suspense fallback={<BannerSkeleton />}>
      <BannerSuspense
        type={type}
        sectionBanners={sectionBanners}
        sectionId={sectionId}
      />
    </Suspense>
  );
}

async function BannerSuspense({
  type,
  sectionBanners,
  sectionId,
}: {
  type: string;
  sectionId?: string;
  sectionBanners?: {
    id: string;
    path: string;
    link: string;
  }[];
}) {
  const user = await checkUser();

  const banner =
    (type === "main" || type === "offers" || type === "forHome") &&
    (await getBanner(type));

  const images = banner ? banner?.images : sectionBanners;

  const mobileImages = banner ? banner?.mobileImages : sectionBanners;

  return (
    images && (
      <div>
        {user && (user.role === "admin" || user.role === "editor") && (
          <Link
            href={`/admin/settings/${
              !banner ? `sections/${type}/${sectionId}` : `banners/${banner.id}`
            }`}
            target="_blank"
          >
            <Button className="w-full">
              {type === "offers" || type === "main" || type === "forHome"
                ? "تعديل اللافتة"
                : "تعديل القسم"}
            </Button>
          </Link>
        )}
        <div className="hidden sm:block">
          <ImageCarousel
            images={images.map((image) => ({
              id: image.id,
              path: image.path,
              link: image.link,
            }))}
          />
        </div>
        <div className="sm:hidden">
          <ImageCarousel
            images={(mobileImages || images).map((image) => ({
              id: image.id,
              path: image.path,
              link: image.link,
            }))}
          />
        </div>
      </div>
    )
  );
}

function BannerSkeleton() {
  return (
    <div className="container">
      <div className="mb-6 mt-4 animate-pulse rounded-3xl bg-gray-400 sm:mt-8">
        <div className="h-32 w-full cursor-pointer object-cover opacity-100 transition-opacity duration-700 ease-in sm:h-52 md:h-80" />
      </div>
    </div>
  );
}
