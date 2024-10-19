import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { checkUser } from "../../auth/_actions/isAuthenticated";
import BackButtonNav from "@/components/BackButtonNav";

// export const dynamic = "force-dynamic";

export default async function AccountLayout({
  children,
  params: { profileId },
}: {
  children: ReactNode;
  params: { profileId: string };
}) {
  if (profileId === "unRegisteredUser") redirect("/auth/login");

  const user = await checkUser();

  if (user == null) redirect("/auth/login");

  if (user.profile?.id !== profileId) redirect("/auth/login");

  return (
    <div>
      <BackButtonNav />
      {children}
    </div>
  );
}
