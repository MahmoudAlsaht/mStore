"use server";
import db from "@/db/db";

export const deleteDistrict = async (id: string) => {
  const district = await db.district.findUnique({
    where: { id },
    select: { id: true, contacts: { select: { profileId: true, id: true } } },
  });

  if (!district) return;

  if (district?.contacts)
    for (const contact of district.contacts) {
      if (contact.profileId)
        await db.profile.update({
          where: { id: contact.profileId },
          data: {
            contacts: {
              disconnect: { id: contact.id },
            },
          },
        });
    }

  await db.contact.deleteMany({
    where: { districtId: id },
  });

  await db.district.delete({
    where: { id: district.id as string },
  });
};
