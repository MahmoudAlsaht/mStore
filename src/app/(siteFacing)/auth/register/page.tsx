import { redirect } from "next/navigation";
import { checkUser } from "../_actions/isAuthenticated";
import { RegisterForm } from "./_components/RegisterForm";
import BackButtonNav from "@/components/BackButtonNav";
import PageHeader from "@/components/PageHeader";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "التسجيل",
};

export default async function RegisterPage() {
  const user = await checkUser();
  if (user) redirect("/");

  return (
    <main dir="rtl">
      <BackButtonNav />
      <PageHeader title="التسجيل" />
      <RegisterForm />
    </main>
  );
}
