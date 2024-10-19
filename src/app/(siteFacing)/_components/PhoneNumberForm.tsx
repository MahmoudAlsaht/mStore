"use client";
import SubmitButton from "@/components/SubmitButton";
import { registerPhone } from "../_actions/registerPhone";
import VerifyPhoneForm from "./VerifyPhoneForm";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { sendVerificationCode } from "@/app/webhook/_actions/sendMessage";

export default function PhoneNumberForm({
  setPhoneNumber,
  type,
}: {
  setPhoneNumber: (value: string) => void;
  type: string;
}) {
  const [status, setStatus] = useState("");
  const [validity, setValidity] = useState(false);
  const phoneRef = useRef<HTMLInputElement>(null);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const error = await registerPhone(type, phoneRef.current?.value as string);
    setStatus(error);
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value || !e.target.value.match(/^(07[789]\d{7})$/)) {
      setValidity(false);
      return;
    }
    setValidity(true);
  };

  return status !== "success" ? (
    <form className="container mx-auto max-w-sm" onSubmit={handleSubmit}>
      <div className="group relative z-0 mb-5 w-full">
        <input
          type="tel"
          ref={phoneRef}
          id="phone"
          className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:focus:border-blue-500"
          placeholder=""
          onChange={handleOnChange}
        />
        <label
          htmlFor="phone"
          className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
        >
          الهاتف
        </label>
        {status && <div className="text-destructive">{status}</div>}
      </div>
      <SubmitButton disabled={!validity} body={"ارسل رمز التحقق"} />
    </form>
  ) : (
    <VerifyPhoneForm
      setPhoneNumber={setPhoneNumber}
      phoneNumber={phoneRef.current?.value}
    />
  );
}
