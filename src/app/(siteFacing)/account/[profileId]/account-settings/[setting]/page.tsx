import UsernameForm from "../_components/UsernameForm";
import PhoneForm from "../_components/PhoneForm";
import PasswordForm from "../_components/PasswordForm";
import DeleteAccountForm from "../_components/DeleteAccountForm";
import { checkUser } from "@/app/(siteFacing)/auth/_actions/isAuthenticated";

export default async function page({
  params: { profileId, setting },
}: {
  params: { profileId: string; setting: string };
}) {
  const user = await checkUser();
  const isAdmin = user?.role === "admin";

  return (
    <div dir="rtl">
      {setting === "username" && (
        <UsernameForm
          isAdmin={isAdmin}
          username={user?.username as string}
          profileId={profileId}
        />
      )}
      {setting === "phone" && (
        <PhoneForm
          isAdmin={isAdmin}
          currPhone={user?.phone as string}
          profileId={profileId}
        />
      )}
      {setting === "password" && (
        <PasswordForm isAdmin={isAdmin} profileId={profileId} />
      )}
      {setting === "account-deletion" && (
        <DeleteAccountForm isAdmin={isAdmin} profileId={profileId} />
      )}
    </div>
  );
}
