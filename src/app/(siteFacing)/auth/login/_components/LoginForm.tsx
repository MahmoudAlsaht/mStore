"use client";

import { useFormState, useFormStatus } from "react-dom";
import { login } from "../../_actions/login";
import SubmitButton from "@/components/SubmitButton";
import { LoadingLink } from "@/app/(siteFacing)/_context/LoadingContext";

export function LoginForm() {
  const [error, action] = useFormState(login, {});

  return (
    <form action={action} className="container mx-auto max-w-sm">
      <div className="group relative z-0 mb-5 w-full">
        <input
          type="tel"
          name="phone"
          id="phone"
          className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:focus:border-blue-500"
          placeholder=""
        />
        <label
          htmlFor="phone"
          className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
        >
          الهاتف
        </label>
        {error?.phone && <div className="text-destructive">{error.phone}</div>}
      </div>

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
          كلمة المرور
        </label>
        {error?.password && (
          <div className="text-destructive">{error?.password}</div>
        )}
      </div>

      <div className="mb-4 text-sm">
        ليس لديك حساب؟
        <LoadingLink href="/auth/register" className="underline">
          التسجيل
        </LoadingLink>
        <LoadingLink href="/auth/reset-password" className="underline">
          نسيت كلمة المرور؟ اعادة تعيين
        </LoadingLink>
      </div>
      <SubmitButton body={"تسجيل الدخول"} />
    </form>
  );
}
