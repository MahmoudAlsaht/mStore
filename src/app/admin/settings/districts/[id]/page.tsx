import BackButtonNav from "@/components/BackButtonNav";
import { DistrictForm } from "../_components/DistrictForm";
import PageHeader from "@/components/PageHeader";
import db from "@/db/db";

export default async function EditDistrict({
  params: { id },
}: {
  params: { id: string };
}) {
  const district = await db.district.findUnique({
    where: { id },
    select: { id: true, name: true, shippingFees: true },
  });

  return (
    <main dir="rtl">
      <BackButtonNav />
      <PageHeader title="إضافة منطقة" />

      <DistrictForm district={district} />
    </main>
  );
}
