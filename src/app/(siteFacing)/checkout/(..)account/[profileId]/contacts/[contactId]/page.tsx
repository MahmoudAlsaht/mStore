import { ContactForm } from "@/app/(siteFacing)/account/[profileId]/contacts/_components/ContactForm";
import db from "@/db/db";

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
    <main dir="rtl" className="w-full">
      <ContactForm
        redirectUrl="/checkout/contact"
        contact={contact}
        user={user}
        districts={districts}
      />
    </main>
  );
}
