"use server";

import db from "@/db/db";

export async function deleteContact(contactId: string) {
  const contact = await db.contact.findUnique({
    where: { id: contactId },
    select: { districtId: true, profileId: true },
  });

  await db.profile.update({
    where: { id: contact?.profileId as string },
    data: {
      contacts: {
        disconnect: { id: contactId },
      },
    },
  });

  await db.district.update({
    where: { id: contact?.districtId as string },
    data: {
      contacts: {
        delete: { id: contactId },
      },
    },
  });

  const latestContact = await db.contact.findMany({
    where: { profileId: contact?.profileId },
    orderBy: { createdAt: "desc" },
  });

  if (
    latestContact.length &&
    !latestContact.some((contact) => contact.defaultContact)
  )
    await db.contact.update({
      where: { id: latestContact[0]?.id },
      data: { defaultContact: true },
    });
}
