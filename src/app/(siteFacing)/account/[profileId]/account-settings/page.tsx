import Widget from "@/app/admin/_components/Widget";
import BackButtonNav from "@/components/BackButtonNav";
import PageHeader from "@/components/PageHeader";

const accountSettings = (profileId: string) => [
  {
    displayName: "اسم المستخدم",
    href: `/account/${profileId}/account-settings/username`,
  },
  {
    displayName: "الهاتف",
    href: `/account/${profileId}/account-settings/phone`,
  },
  {
    displayName: "كلمة المرور",
    href: `/account/${profileId}/account-settings/password`,
  },
  {
    displayName: "حذف الحساب",
    href: `/account/${profileId}/account-settings/account-deletion`,
  },
];

export default function AccountSettings({
  params: { profileId },
}: {
  params: { profileId: string };
}) {
  return (
    <main dir="rtl">
      <PageHeader title="إعدادات الحساب" />

      <div className="mt-4 grid h-dvh grid-cols-1 gap-4 sm:mt-8 md:grid-cols-2 lg:grid-cols-3">
        {accountSettings(profileId || "unRegisteredUser").map(
          (setting) =>
            setting &&
            setting.displayName !== "المتجر" && (
              <Widget
                key={setting.displayName}
                title={setting.displayName}
                href={setting.href}
                danger={setting.displayName === "حذف الحساب"}
              />
            ),
        )}
        <div className="h-20"></div>;
      </div>
    </main>
  );
}
