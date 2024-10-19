import db from "@/db/db";
import { ContactForm } from "../_components/ContactForm";

export default async function EditContactPage({
  params: { profileId, contactId },
}: {
  params: { profileId: string; contactId: string };
}) {
  const contact = await db.contact.findUnique({
    where: { id: contactId },
    select: {
      district: true,
      id: true,
      contactNumber: true,
    },
  });

  const user = await db.user.findFirst({
    where: { profile: { id: profileId } },
    select: { phone: true, profile: { select: { id: true } } },
  });
  const districts = await db.district.findMany({
    select: { id: true, name: true },
  });

  return (
    <main dir="rtl">
      <ContactForm
        redirectUrl={`/account/${profileId}/contacts/`}
        contact={contact}
        user={user}
        districts={districts}
      />
    </main>
  );
}
