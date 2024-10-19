import { redirect } from "next/navigation";
import { checkUser } from "../_actions/isAuthenticated";
import { ResetForm } from "./_components/ResetForm";
import BackButtonNav from "@/components/BackButtonNav";
import PageHeader from "@/components/PageHeader";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "إعادة تعيين كلمة المرور",
};

export default async function ResetPasswordPage() {
  const user = await checkUser();
  if (user) redirect("/");

  return (
    <main dir="rtl">
      <BackButtonNav />
      <PageHeader title="إعادة تعيين كلمة المرور" />
      <ResetForm />
    </main>
  );
}
