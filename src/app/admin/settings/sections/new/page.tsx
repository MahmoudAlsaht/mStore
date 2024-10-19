import PageHeader from "@/components/PageHeader";
import { SectionForm } from "../_components/SectionForm";

export default function NewSection() {
  return (
    <main dir="rtl">
      <PageHeader title="إضافة قسم جديد" />

      <SectionForm />
    </main>
  );
}
