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

  return (
    <div dir="rtl">
      {setting === "username" && (
        <UsernameForm
          username={user?.username as string}
          profileId={profileId}
        />
      )}
      {setting === "phone" && (
        <PhoneForm currPhone={user?.phone as string} profileId={profileId} />
      )}
      {setting === "password" && <PasswordForm profileId={profileId} />}
      {setting === "account-deletion" && (
        <DeleteAccountForm profileId={profileId} />
      )}
    </div>
  );
}
