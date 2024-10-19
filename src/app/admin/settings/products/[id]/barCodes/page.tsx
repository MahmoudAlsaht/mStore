import PageHeader from "@/components/PageHeader";
import db from "@/db/db";
import BackButtonNav from "@/components/BackButtonNav";
import BarCodeForm from "../../_components/BarCodeForm";

export default async function BarCodesPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await db.product.findUnique({
    where: { id },
    select: {
      name: true,
      barCode: true,
    },
  });

  return (
    <div dir="rtl">
      <BackButtonNav />
      <PageHeader title={` كود المنتج ${product?.name}`} />
      <BarCodeForm barCodes={product?.barCode} productId={id} />
    </div>
  );
}
