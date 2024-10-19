import BackButtonNav from "@/components/BackButtonNav";
import PageHeader from "@/components/PageHeader";
import db from "@/db/db";
import { PromoForm } from "../_components/PromoForm";

export default async function EditPromoPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const promo = await db.promoCode.findUnique({
    where: { id },
    select: {
      id: true,
      code: true,
      active: true,
      discount: true,
      startDate: true,
      endDate: true,
      promoType: true,
      minPrice: true,
    },
  });

  return (
    <main dir="rtl">
      <BackButtonNav />
      <PageHeader title={`تعديل ${promo?.code}`} />

      <PromoForm promo={promo} />
    </main>
  );
}
