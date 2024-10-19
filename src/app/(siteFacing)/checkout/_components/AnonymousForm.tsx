"use client";

import { District } from "@prisma/client";
import { useFormState } from "react-dom";
import { createAnonymous } from "../_actions/createAnonymous";
import SubmitButton from "@/components/SubmitButton";
import { useState } from "react";
import PhoneNumberForm from "../../_components/PhoneNumberForm";

export default function AnonymousForm({
  districts,
}: {
  districts: Partial<District>[] | null;
}) {
  const [phone, setPhone] = useState<string | null>(null);

  const [error, contactAction] = useFormState(
    createAnonymous.bind(null, phone),
    {},
  );

  return !phone ? (
    <PhoneNumberForm type="contactNumber" setPhoneNumber={setPhone} />
  ) : (
    <form className="mx-4 w-10/12 sm:mx-auto md:w-5/12" action={contactAction}>
      {error?.phone && (
        <div className="mb-4 text-destructive">{error.phone}</div>
      )}
      <div className="group relative z-0 mb-1 w-full">
        <input
          type="text"
          name="name"
          id="name"
          className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:focus:border-blue-500"
          placeholder=""
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
        <select
          name="district"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">اختر منطقة</option>
          {districts?.map((district) => (
            <option key={district.id} value={district.id}>
              {district.name}
            </option>
          ))}
        </select>
        {error?.district && (
          <div className="text-destructive">{error?.district}</div>
        )}
      </div>

      <SubmitButton body="اضافة" />
    </form>
  );
}
