"use client";

import { useTransition } from "react";
import { deleteContact } from "../_actions/deleteContact";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function DeleteContact({ contactId }: { contactId: string }) {
  const [pending, startDelete] = useTransition();
  const router = useRouter();
  const handleDelete = () => {
    startDelete(async () => {
      await deleteContact(contactId);
      router.refresh();
    });
  };
  return (
    <Button
      variant="destructive"
      size="sm"
      className="mt-1 h-8 w-full rounded-lg md:mr-5 md:w-9/12"
      onClick={handleDelete}
    >
      {pending ? (
        <Loader2 className="animate-spin text-rayanPrimary-dark dark:text-rayanPrimary-light" />
      ) : (
        "حذف"
      )}
    </Button>
  );
}
