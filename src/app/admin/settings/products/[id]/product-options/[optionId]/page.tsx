import BackButtonNav from "@/components/BackButtonNav";
import PageHeader from "@/components/PageHeader";
import db from "@/db/db";
import { OptionForm } from "../_components/OptionForm";

export default async function EditOptionPage({
  params: { id, optionId },
}: {
  params: { id: string; optionId: string };
}) {
  const productOption = await db.productOptions.findUnique({
    where: { id: optionId },
    select: {
      id: true,
      name: true,
      price: true,
    },
  });

  const brands = await db.section.findMany({
    where: { type: "brands" },
    select: { name: true, id: true },
  });

  const categories = await db.section.findMany({
    where: { type: "categories" },
    select: { name: true, id: true },
  });

  return (
    <main dir="rtl">
      <BackButtonNav />
      <PageHeader title={`تعديل ${productOption?.name}`} />

      <OptionForm productOption={productOption} productId={id} />
    </main>
  );
}
