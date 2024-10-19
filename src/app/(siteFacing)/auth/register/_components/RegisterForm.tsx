"use client";
import { useFormState } from "react-dom";
import { register } from "../../_actions/register";
import SubmitButton from "@/components/SubmitButton";
import { LoadingLink } from "@/app/(siteFacing)/_context/LoadingContext";
import { useState } from "react";
import PhoneNumberForm from "@/app/(siteFacing)/_components/PhoneNumberForm";
import Link from "next/link";

export function RegisterForm() {
  const [phone, setPhone] = useState<string | null>(null);

  const [error, action] = useFormState(register.bind(null, phone), {});

  return !phone ? (
    <PhoneNumberForm type="userPhone" setPhoneNumber={setPhone} />
  ) : (
    <form action={action} className="container mx-auto max-w-sm">
      {error?.phone && <div className="text-destructive">{error?.phone}</div>}
      <div className="group relative z-0 mb-5 w-full">
        <input
          type="text"
          name="username"
          id="username"
          className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:focus:border-blue-500"
          placeholder=""
        />
        <label
          htmlFor="username"
          className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
        >
          الاسم
        </label>
        {error?.username && (
          <div className="text-destructive">{error?.username}</div>
        )}
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

      <div className="group relative z-0 mb-5 w-full">
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:focus:border-blue-500"
          placeholder=""
        />
        <label
          htmlFor="confirmPassword"
          className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
        >
          تأكيد كلمة المرور
        </label>
        {error?.confirmPassword && (
          <div className="text-destructive">{error?.confirmPassword}</div>
        )}
      </div>
      <div className="mb-4 text-sm">
        هل أنت مسجل بالفعل؟
        <LoadingLink href="/auth/login" className="underline">
          تسجيل الدخول
        </LoadingLink>
      </div>
      <Link href="/privacy-policy">بتسجيلك أنت توافق على سياسة الخصوصية</Link>
      <SubmitButton body={"التسجيل"} />
    </form>
  );
}
