import BackButtonNav from "@/components/BackButtonNav";
import PageHeader from "@/components/PageHeader";
import { PromoForm } from "../_components/PromoForm";

export default function NewPromo() {
  return (
    <main dir="rtl">
      <BackButtonNav />
      <PageHeader title="إضافة كوبون جديد" />

      <PromoForm />
    </main>
  );
}
