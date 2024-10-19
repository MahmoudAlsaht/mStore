import PageHeader from "@/components/PageHeader";
import db from "@/db/db";
import LabelForm from "../../_components/LabelForm";
import BackButtonNav from "@/components/BackButtonNav";

export default async function LabelsPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await db.product.findUnique({
    where: { id },
    select: {
      name: true,
      labels: true,
    },
  });

  return (
    <div dir="rtl">
      <BackButtonNav />
      <PageHeader title={`الكلمات المفتاحية للمنتج ${product?.name}`} />
      <LabelForm labels={product?.labels} productId={id} />
    </div>
  );
}
