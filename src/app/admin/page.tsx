import {
  adminPermissions,
  editorPermissions,
  getUserPermission,
  staffPermissions,
} from "./_components/UserPermissions";
import Widget from "./_components/Widget";

export default async function AdminHome() {
  const { admin, editor, staff, profile } = await getUserPermission();

  return (
    <div
      className="mt-4 grid h-full grid-cols-1 gap-4 sm:mt-8 md:grid-cols-2 lg:grid-cols-3"
      dir="rtl"
    >
      {admin &&
        adminPermissions(profile || "unRegisteredUser").map(
          (setting) =>
            setting && (
              <Widget
                key={setting.displayName}
                title={setting.displayName}
                href={setting.href}
              />
            ),
        )}

      {editor &&
        editorPermissions(profile || "unRegisteredUser").map(
          (setting) =>
            setting && (
              <Widget
                key={setting.displayName}
                title={setting.displayName}
                href={setting.href}
              />
            ),
        )}

      {staff &&
        staffPermissions(profile || "unRegisteredUser").map(
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
