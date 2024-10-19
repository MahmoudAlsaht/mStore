import db from "@/db/db";
import { ContactForm } from "../_components/ContactForm";

export default async function NewContactPage({
  params: { profileId },
}: {
  params: { profileId: string };
}) {
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
        redirectUrl={`/account/${profileId}/contacts`}
        user={user}
        districts={districts}
      />
    </main>
  );
}
