import BackButtonNav from "@/components/BackButtonNav";
import PageHeader from "@/components/PageHeader";
import db from "@/db/db";
import OptionsTable from "./_components/OptionsTable";

export default async function ProductOptionsSettingsPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await db.product.findUnique({
    where: { id },
    select: {
      name: true,
      options: { select: { id: true, name: true } },
    },
  });

  return (
    <main dir="rtl">
      <BackButtonNav href="/admin" />
      <PageHeader title={`إعدادات ${product?.name}`} />

      <OptionsTable data={product?.options ?? []} id={id} />
      <div className="h-20"></div>
    </main>
  );
}
