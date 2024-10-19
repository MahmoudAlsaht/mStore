import db from "@/db/db";
import React from "react";
import { CollapsibleContacts } from "./_components/CollapsibleContacts";

export default async function ContactsPage({
  params: { profileId },
}: {
  params: { profileId: string };
}) {
  const contacts = await db.contact.findMany({
    where: { profileId },
    select: {
      id: true,
      contactNumber: true,
      defaultContact: true,
      district: { select: { name: true } },
    },
  });

  return <CollapsibleContacts profileId={profileId} contacts={contacts} />;
}
