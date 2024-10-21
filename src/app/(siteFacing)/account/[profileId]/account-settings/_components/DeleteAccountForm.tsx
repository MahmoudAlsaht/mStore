"use client";
import SubmitButton from "@/components/SubmitButton";
import { useFormState } from "react-dom";
import { deleteAccount } from "../_actions/deleteAccount";
import PageHeader from "@/components/PageHeader";
import { CiWarning } from "react-icons/ci";

export default function DeleteAccountForm({
  profileId,
  isAdmin = false,
}: {
  profileId: string;
  isAdmin: boolean;
}) {
  const [error, action] = useFormState(deleteAccount.bind(null, profileId), {});

  return (
    <>
      <PageHeader title="حذف الحساب" />

      {isAdmin && (
        <div
          dir="ltr"
          className="mx-auto mb-4 flex h-16 w-4/12 rounded-md border border-mStoreWarning-dark bg-inherit p-2 text-center text-mStoreWarning-dark"
        >
          <CiWarning className="size-7" /> Sorry Because This is A Demo App You
          Cannot Change This Info
        </div>
      )}

      <form action={action} className="mx-4 max-w-sm sm:mx-auto">
        <div className="group relative z-0 mb-5 w-full">
          <input
            type="password"
            name="password"
            id="password"
            className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:focus:border-blue-500"
            placeholder=""
          />
          <label
            htmlFor="password"
            className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
          >
            كلمة المرور الحالية
          </label>
          {error?.password && (
            <div className="text-destructive">{error?.password}</div>
          )}
        </div>

        <SubmitButton
          disabled={isAdmin}
          destructive
          body={"تأكيد حذف الحساب"}
        />
      </form>
    </>
  );
}
