"use server";

import db from "@/db/db";

export async function editDefaultContacts(
  profileId: string,
  contactId: string,
) {
  await db.contact.update({
    where: {
      id: contactId,
    },
    data: { defaultContact: true },
  });
  await db.profile.update({
    where: { id: profileId },
    data: {
      contacts: {
        updateMany: {
          where: {
            NOT: {
              id: contactId,
            },
          },
          data: {
            defaultContact: false,
          },
        },
      },
    },
  });
}
