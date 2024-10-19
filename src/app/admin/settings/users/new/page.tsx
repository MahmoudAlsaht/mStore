import BackButtonNav from "@/components/BackButtonNav";
import { NewUserForm } from "./_components/NewUserForm";
import PageHeader from "@/components/PageHeader";

export default function NewUser() {
  return (
    <main dir="rtl">
      <BackButtonNav />
      <PageHeader title="إضافة مستخدم جديد" />

      <NewUserForm />
    </main>
  );
}
