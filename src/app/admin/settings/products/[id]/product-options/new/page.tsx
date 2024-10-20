import BackButtonNav from "@/components/BackButtonNav";
import PageHeader from "@/components/PageHeader";
import db from "@/db/db";
import { OptionForm } from "../_components/OptionForm";

export default async function NewOption({
  params: { id },
}: {
  params: { id: string };
}) {
  return (
    <main dir="rtl">
      <BackButtonNav />
      <PageHeader title="إضافة منتج" />

      <OptionForm productId={id} />
    </main>
  );
}
