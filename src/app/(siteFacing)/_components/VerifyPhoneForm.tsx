"use client";
import { checkVerificationCode } from "@/app/webhook/_actions/sendMessage";
import SubmitButton from "@/components/SubmitButton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { FormEvent, useRef, useState } from "react";

export default function VerifyPhoneForm({
  phoneNumber,
  setPhoneNumber,
}: {
  setPhoneNumber: (value: string) => void;
  phoneNumber?: string;
}) {
  const codeRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState({ status: false, message: "" });
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const code = codeRef.current?.value;
    if (
      code &&
      phoneNumber &&
      (await checkVerificationCode(code, phoneNumber)) === "approved"
    ) {
      setPhoneNumber(phoneNumber);
      setError({ status: false, message: "" });
    }
    setError({ status: true, message: "رقم التحقق غير صحيح أعد المحاولة" });
  };

  return (
    <>
      <Alert className="mx-auto w-11/12 border-rayanPrimary-dark bg-inherit text-rayanPrimary-dark sm:w-8/12 lg:w-6/12">
        <Info className="h-4 w-4" style={{ color: "#14b8a6" }} />
        <AlertTitle>تم الإرسال بنجاح!</AlertTitle>
        <AlertDescription className="mt-2">
          لقد تم إرسال رمز التحقق إلى حساب ال whatsapp الخاص بك
        </AlertDescription>
      </Alert>
      <form className="container mx-auto max-w-sm" onSubmit={handleSubmit}>
        <div className="group relative z-0 mb-5 w-full">
          <input
            type="text"
            ref={codeRef}
            id="verificationCode"
            className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:focus:border-blue-500"
            placeholder=""
          />
          <label
            htmlFor="verificationCode"
            className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
          >
            رمز التحقق
          </label>
          {error.status && (
            <div className="text-destructive">{error.message}</div>
          )}
        </div>
        <SubmitButton body={"تحقق"} />
      </form>
    </>
  );
}
