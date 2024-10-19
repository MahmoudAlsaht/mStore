"use client";
import { useFormState } from "react-dom";
import SubmitButton from "@/components/SubmitButton";
import { createNewSection } from "../_actions/createNewSection";
import Image from "next/image";
import ClickableImageCard from "@/components/ClickableImageCard";
import { editSection } from "../_actions/editSection";

export function SectionForm({
  section,
}: {
  section?: {
    id: string;
    name: string;
    type: string;
    cover: {
      path: string;
    } | null;
    sectionBanners: {
      id: string;
      path: string;
      link: string | null;
    }[];
    mobileSectionBanners: {
      id: string;
      path: string;
      link: string | null;
    }[];
  } | null;
}) {
  const [error, action] = useFormState(
    section == null
      ? createNewSection
      : editSection.bind(null, section?.id as string),
    {},
  );

  return (
    <form action={action} className="mx-4 h-screen max-w-sm sm:mx-auto">
      <div className="group relative z-0 mb-5 w-full">
        <select
          name="type"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        >
          <option value={section ? section?.type : ""}>
            {section
              ? section?.type === "categories"
                ? "فئة"
                : "علامة تجارية"
              : "اختر نوع القسم"}
          </option>

          {section ? (
            section?.type !== "categories" && (
              <option value={"categories"}>فئة</option>
            )
          ) : (
            <option value={"categories"}>فئة</option>
          )}

          {section ? (
            section?.type !== "brands" && (
              <option value={"brands"}>علامة تجارية</option>
            )
          ) : (
            <option value={"brands"}>علامة تجارية</option>
          )}
        </select>
        {error?.type && <div className="text-destructive">{error?.type}</div>}
      </div>
      <div className="group relative z-0 mb-5 w-full">
        <input
          type="text"
          name="name"
          id="name"
          className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:focus:border-blue-500"
          placeholder=""
          defaultValue={section?.name}
        />
        <label
          htmlFor="name"
          className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
        >
          الاسم
        </label>
        {error?.name && <div className="text-destructive">{error.name}</div>}
      </div>

      <div className="group relative z-0 mb-5 w-full">
        <label className="mb-2 block text-gray-900" htmlFor="sectionImage">
          تحميل صورة القسم
        </label>
        <input
          className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
          id="sectionImage"
          name="sectionImage"
          type="file"
        />
        {section && (
          <Image
            alt={section?.name as string}
            src={section?.cover?.path.replace("/upload", "/upload/w_100") || ""}
            width={100}
            height={100}
            className="mt-2 h-full w-1/6"
          />
        )}
        {error?.sectionImage && (
          <div className="text-destructive">{error.sectionImage}</div>
        )}
        <p className="text-rayanWarning-dark">min width: 241.33px</p>
        <p className="text-rayanWarning-dark">min height: 176px</p>
      </div>

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
        <p className="text-rayanWarning-dark">min width: 1336px</p>
        <p className="text-rayanWarning-dark">min height: 320px</p>

        <div className="mt-2 grid grid-cols-2 gap-1">
          {section &&
            section.sectionBanners?.map((image) => (
              <ClickableImageCard
                key={image.id}
                image={image}
                imageAlt={`${section.name} banner's image`}
              />
            ))}
        </div>
      </div>

      <div className="group relative z-0 mb-5 w-full">
        <label
          className="mb-2 block text-gray-900"
          htmlFor="mobileBannerImages"
        >
          تحميل صورة للهاتف
        </label>
        <input
          className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
          id="mobileBannerImages"
          name="mobileBannerImages"
          type="file"
          multiple
        />
        <p className="text-rayanWarning-dark">min width: 378.4px</p>
        <p className="text-rayanWarning-dark">min height: 128px</p>

        <div className="mt-2 grid grid-cols-2 gap-1">
          {section &&
            section.mobileSectionBanners?.map((image) => (
              <ClickableImageCard
                key={image.id}
                image={image}
                imageAlt={`${section.name} banner's image`}
              />
            ))}
        </div>
      </div>
      <SubmitButton body={section == null ? "إضافة" : "تعديل"} />
    </form>
  );
}
