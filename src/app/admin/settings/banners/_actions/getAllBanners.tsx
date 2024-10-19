"use server";

import db from "@/db/db";

export const getAllBanners = async () => {
  const banners = await db.banner.findMany({
    select: {
      id: true,
      bannerType: true,
      images: {
        select: {
          path: true,
        },
      },
    },
  });

  const selectedBanners = banners.map((banner, index) => ({
    id: banner.id,
    index: index + 1,
    bannerType: banner.bannerType,
    bannerImage:
      banner?.images && banner?.images?.length > 0
        ? banner?.images[0].path
        : "no image",
  }));
  return selectedBanners;
};
