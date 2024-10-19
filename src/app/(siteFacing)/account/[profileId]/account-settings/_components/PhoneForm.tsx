"use client";
import SubmitButton from "@/components/SubmitButton";
import { useFormState } from "react-dom";
import { updatePhone } from "../_actions/updatePhone";
import PageHeader from "@/components/PageHeader";
import { useState } from "react";
import PhoneNumberForm from "@/app/(siteFacing)/_components/PhoneNumberForm";
import { Button } from "@/components/ui/button";

export default function PhoneForm({
  currPhone,
  profileId,
}: {
  currPhone: string;
  profileId: string;
}) {
  const [phone, setPhone] = useState<string | null>(null);
  const [edit, setEdit] = useState(false);

  const [error, action] = useFormState(
    updatePhone.bind(null, phone, profileId),
    undefined,
  );

  const handleSetEdit = () => setEdit(true);

  return !phone && edit ? (
    <PhoneNumberForm type="userPhone" setPhoneNumber={setPhone} />
  ) : (
    <>
      <PageHeader title="إعدادات الهاتف" />

      <form action={action} className="mx-4 max-w-sm sm:mx-auto">
        {error && <div className="text-destructive">{error}</div>}

        <div className="mt-2 flex">
          <Button type="button" size="sm" onClick={handleSetEdit}>
            تعديل
          </Button>
          <div className="group relative z-0 mb-5 w-full">
            <input
              type="tel"
              id="phone"
              disabled
              className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:focus:border-blue-500"
              defaultValue={phone || currPhone}
            />
          </div>
        </div>

        <div className="group relative z-0 mb-5 w-full">
          <input
            type="password"
            name="password"
            id="password"
            className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:focus:border-blue-500"
            placeholder=""
            disabled={!phone}
          />
          <label
            htmlFor="password"
            className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
          >
            كلمة المرور
          </label>
        </div>

        <SubmitButton body={"حفظ"} />
      </form>
    </>
  );
}
