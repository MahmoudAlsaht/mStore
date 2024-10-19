"use client";
import React from "react";
import { Button } from "../../../../components/ui/button";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import Privacy from "../../../../components/Privacy";

export default function PrivacyDialog() {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  return (
    <dialog
      ref={dialogRef}
      onClose={() => router.back()}
      className="w-full rounded border bg-white p-6 text-rayanPrimary-dark backdrop:bg-slate-300/50 sm:w-6/12"
    >
      <Button
        onClick={() => {
          dialogRef.current?.close();
        }}
        className="bg-inherit text-rayanPrimary-dark"
      >
        <X />
      </Button>
      <Privacy />
      <Button
        onClick={() => {
          dialogRef.current?.close();
        }}
        className="mt-2 w-full"
      >
        تأكيد
      </Button>
    </dialog>
  );
}
