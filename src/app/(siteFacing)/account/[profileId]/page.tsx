import { customerPermissions } from "@/app/admin/_components/UserPermissions";
import Widget from "@/app/admin/_components/Widget";

export default async function Profile({
  params: { profileId },
}: {
  params: { profileId: string };
}) {
  return (
    <div
      className="mt-4 grid h-dvh grid-cols-1 gap-4 sm:mt-8 md:grid-cols-2 lg:grid-cols-3"
      dir="rtl"
    >
      {customerPermissions(profileId || "unRegisteredUser").map(
        (setting) =>
          setting && (
            <Widget
              key={setting.displayName}
              title={setting.displayName}
              href={setting.href}
            />
          ),
      )}

      <div className="h-20"></div>
    </div>
  );
}
