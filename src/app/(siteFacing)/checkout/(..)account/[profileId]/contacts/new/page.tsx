import { ContactForm } from "@/app/(siteFacing)/account/[profileId]/contacts/_components/ContactForm";
import db from "@/db/db";

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
    <main dir="rtl" className="w-full">
      <ContactForm
        redirectUrl="/checkout/contact"
        user={user}
        districts={districts}
      />
    </main>
  );
}
