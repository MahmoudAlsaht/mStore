"use client";
import { useFormState } from "react-dom";
import SubmitButton from "@/components/SubmitButton";
import { createNewPromo } from "../_actions/createNewPromo";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { editPromo } from "../_actions/editPromo";
import OfferDatePicker from "../../products/_components/OfferDatePicker";

export function PromoForm({
  promo,
}: {
  promo?: {
    id: string;
    promoType: string;
    code: string;
    discount: number;
    active: boolean;
    startDate: Date | null;
    endDate: Date | null;
    minPrice: number | null;
  } | null;
}) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: promo?.startDate || undefined,
    to: promo?.endDate || undefined,
  });

  const [active, setActive] = useState(promo?.active);
  const [isMinPrice, setIsMinPrice] = useState(true);
  const [promoType, setPromoType] = useState<string | null>(
    promo?.promoType || null,
  );

  const [error, action] = useFormState(
    promo == null
      ? createNewPromo.bind(null, date)
      : editPromo.bind(null, date, promo.id),
    {},
  );

  return (
    <form action={action} className="mx-4 h-screen max-w-sm sm:mx-auto">
      <label className="inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          className="peer sr-only"
          name="isMinPrice"
          onChange={(e) => setIsMinPrice(e.target.checked)}
          checked={isMinPrice}
        />
        <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800 rtl:peer-checked:after:-translate-x-full"></div>
        <span className="ms-3 text-sm font-medium text-gray-900">
          {isMinPrice ? "تم تطبيق الحد الأدنى" : "الحد الأدنى غير مطبق"}
        </span>
      </label>

      <div className="group relative z-0 mb-5 w-full">
        <select
          name="promoType"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          onChange={(e) => setPromoType(e.target.value)}
        >
          {promo ? (
            <option value={promo.promoType}>
              {promo.promoType === "shippingFees"
                ? "خصم على التوصيل"
                : "خصم على سعر المنتج"}
            </option>
          ) : (
            <option value="">اختر نوع الخصم</option>
          )}
          {promo?.promoType !== "productPrice" && (
            <option value="productPrice">خصم على سعر المنتجات</option>
          )}
          {promo?.promoType !== "shippingFees" && (
            <option value="shippingFees">خصم على التوصيل</option>
          )}
        </select>
        {error?.promoType && (
          <div className="text-destructive">{error?.promoType}</div>
        )}
      </div>

      <div className="group relative z-0 mb-5 w-full">
        <input
          type="text"
          name="code"
          id="code"
          className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:focus:border-blue-500"
          placeholder=""
          defaultValue={promo?.code}
        />
        <label
          htmlFor="code"
          className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
        >
          كود الخصم
        </label>
        {error?.code && <div className="text-destructive">{error.code}</div>}
      </div>

      {promoType !== "shippingFees" && (
        <div className="group relative z-0 mb-5 w-full">
          <input
            type="number"
            name="discount"
            id="discount"
            className="no-arrows peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:focus:border-blue-500"
            placeholder=""
            defaultValue={promo?.discount || ""}
          />
          <label
            htmlFor="discount"
            className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
          >
            قيمة الخصم
          </label>
          {error?.discount && (
            <div className="text-destructive">{error.discount}</div>
          )}
        </div>
      )}

      {isMinPrice && (
        <div className="group relative z-0 mb-5 w-full">
          <input
            type="number"
            name="minPrice"
            id="minPrice"
            className="no-arrows peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:focus:border-blue-500"
            placeholder=""
            defaultValue={promo?.minPrice || "off"}
          />
          <label
            htmlFor="minPrice"
            className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
          >
            الحد الأدنى لتطبيق الخصم
          </label>
          {error?.minPrice && (
            <div className="text-destructive">{error.minPrice}</div>
          )}
        </div>
      )}

      <label className="inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          className="peer sr-only"
          name="active"
          onChange={(e) => setActive(e.target.checked)}
          checked={active}
        />
        <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800 rtl:peer-checked:after:-translate-x-full"></div>
        <span className="ms-3 text-sm font-medium text-gray-900">
          {!active ? "تفعيل الكود" : "الغاء التفعيل"}
        </span>
      </label>

      <div className="group relative z-0 mb-5 w-full">
        <OfferDatePicker date={date} setDate={setDate} />
      </div>

      <SubmitButton body={promo == null ? "إضافة" : "تعديل"} />
    </form>
  );
}
