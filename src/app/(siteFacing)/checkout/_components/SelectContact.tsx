import db from "@/db/db";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CollapsibleContacts } from "../../account/[profileId]/contacts/_components/CollapsibleContacts";

export default async function SelectContact({
  profileId,
}: {
  profileId: string;
}) {
  const contacts = await db.contact.findMany({
    where: { profileId },
    select: {
      id: true,
      contactNumber: true,
      defaultContact: true,
      district: { select: { name: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <CollapsibleContacts profileId={profileId} contacts={contacts} />
      {contacts?.some((contact) => contact.defaultContact) && (
        <Button>
          <Link href="/checkout/payment-method">متابعة للدفع</Link>
        </Button>
      )}
    </>
  );
}
