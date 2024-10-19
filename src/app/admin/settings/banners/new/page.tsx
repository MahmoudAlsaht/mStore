import BackButtonNav from "@/components/BackButtonNav";
import PageHeader from "@/components/PageHeader";
import { BannerForm } from "../_components/BannerForm";

export default function NewBanner() {
  return (
    <main dir="rtl">
      <BackButtonNav />
      <PageHeader title="إضافة لافتة جديدة" />

      <BannerForm />
    </main>
  );
}
