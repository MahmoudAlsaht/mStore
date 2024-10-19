"use client";
import { useFormState } from "react-dom";
import SubmitButton from "@/components/SubmitButton";
import ClickableImageCard from "@/components/ClickableImageCard";
import { editBanner } from "../_actions/editBanner";
import { createNewBanner } from "../_actions/createNewBanner";
import { useState } from "react";

export function BannerForm({
  banner,
}: {
  banner?: {
    id: string;
    bannerType: string;
    images: {
      path: string;
      id: string;
    }[];
    mobileImages: {
      path: string;
      id: string;
    }[];
  } | null;
}) {
  const [error, action] = useFormState(
    banner == null
      ? createNewBanner
      : editBanner.bind(null, banner?.id as string),
    {},
  );
  const [bannerType, setBannerType] = useState<string | null>(
    banner?.bannerType || null,
  );

  return (
    <form action={action} className="mx-4 h-screen max-w-sm sm:mx-auto">
      {!banner && (
        <div className="group relative z-0 mb-5 w-full">
          <select
            name="bannerType"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            onChange={(e) => {
              setBannerType(e.target.value);
            }}
          >
            <option value="">اختر نوع اللافتة</option>
            <option value="main">للرئيسية</option>
            <option value="offers">للعروض</option>
            <option value="forHome">للمنزلية</option>
          </select>
          {error?.bannerType && (
            <div className="text-destructive">{error?.bannerType}</div>
          )}
        </div>
      )}

      <div className="group relative z-0 mb-5 w-full">
        <label className="mb-2 block text-gray-900" htmlFor="bannerImages">
          تحميل صورة اللافتة
        </label>
        <input
          className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
          id="bannerImages"
          name="bannerImages"
          type="file"
          multiple
        />
        {error?.bannerImages && (
          <div className="text-destructive">{error.bannerImages}</div>
        )}
        <p className="text-rayanWarning-dark">min width: 1336px</p>
        <p className="text-rayanWarning-dark">min height: 320px</p>
        <div className="mt-2 grid grid-cols-2 gap-1">
          {banner &&
            banner?.images.map((image) => (
              <ClickableImageCard
                key={image.id}
                image={image}
                imageAlt={`${banner.bannerType} banner's image`}
              />
            ))}
        </div>
      </div>

      <div className="group relative z-0 mb-5 w-full">
        <label className="mb-2 block text-gray-900" htmlFor="mobileImages">
          تحميل صور للهاتف
        </label>
        <input
          className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
          id="mobileImages"
          name="mobileImages"
          type="file"
          multiple
        />
        {error?.mobileImages && (
          <div className="text-destructive">{error.mobileImages}</div>
        )}
        <p className="text-rayanWarning-dark">min width: 378.4px</p>
        <p className="text-rayanWarning-dark">min height: 128px</p>

        <div className="mt-2 grid grid-cols-2 gap-1">
          {banner &&
            banner?.mobileImages.map((image) => (
              <ClickableImageCard
                key={image.id}
                image={image}
                imageAlt={`${banner.bannerType} banner's image`}
              />
            ))}
        </div>
      </div>
      <SubmitButton body={banner == null ? "إضافة" : "تعديل"} />
    </form>
  );
}
