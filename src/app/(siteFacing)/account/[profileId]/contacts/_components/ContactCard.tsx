"use client";

import { LoadingLink } from "@/app/(siteFacing)/_context/LoadingContext";
import { ReactNode, useState, useTransition } from "react";
import { editDefaultContacts } from "../_actions/editDefaultContacts";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function ContactCard({
  href,
  children,
  isEditable = false,
  isDefault = false,
  contactId,
  profileId,
  className,
}: {
  href: string;
  children: ReactNode;
  isEditable?: boolean;
  isDefault?: boolean;
  contactId?: string;
  profileId?: string;
  className?: string;
}) {
  const [pending, startTransition] = useTransition();
  const [isOptionsCard, setIsOptionsCard] = useState(false);

  const router = useRouter();
  const handleSetIsOptions = () => setIsOptionsCard(true);
  const handleCloseIsOptions = () => setIsOptionsCard(false);

  const handleUpdate = () => {
    if (isDefault) return;
    startTransition(async () => {
      profileId &&
        contactId &&
        (await editDefaultContacts(profileId, contactId));
      handleCloseIsOptions();
      router.refresh();
    });
  };

  return !isEditable ? (
    <LoadingLink
      href={href}
      className="h-32 cursor-pointer rounded-2xl bg-white p-4 duration-500 hover:scale-105"
    >
      {children}
    </LoadingLink>
  ) : !isOptionsCard ? (
    <div
      className={`flex h-32 cursor-pointer flex-col items-center justify-center rounded-2xl bg-white transition-all duration-500 ${isDefault && "scale-105 bg-slate-400 bg-opacity-30 shadow-lg"} ${className}`}
      onClick={handleSetIsOptions}
    >
      <div className="">{children}</div>
    </div>
  ) : (
    <div className={`flex h-32 items-center rounded-2xl bg-white ${className}`}>
      {!pending ? (
        <div className="mx-auto h-full cursor-pointer pt-6 text-center">
          {!isDefault && (
            <div
              onClick={handleUpdate}
              className={`h-8 rounded-lg px-2 pt-1 ${!isDefault ? "duration-200 hover:bg-rayanPrimary-dark hover:bg-opacity-20" : "cursor-text bg-rayanPrimary-dark bg-opacity-20"}`}
            >
              تعيين كافتراضي
            </div>
          )}
          <LoadingLink
            href={href}
            className="h-8 rounded-lg px-2 pt-1 duration-200 hover:bg-rayanPrimary-dark hover:bg-opacity-20"
          >
            تعديل العنوان
          </LoadingLink>
          <div
            className="h-8 rounded-lg px-2 pt-1 duration-200 hover:bg-rayanPrimary-dark hover:bg-opacity-20"
            onClick={handleCloseIsOptions}
          >
            إلغاء
          </div>
        </div>
      ) : (
        <Loader2 className="mx-auto size-20 animate-spin text-rayanPrimary-dark dark:text-rayanPrimary-light" />
      )}
    </div>
  );
}
