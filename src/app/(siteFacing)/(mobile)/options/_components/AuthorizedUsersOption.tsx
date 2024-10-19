"use client";
import {
  adminPermissions,
  editorPermissions,
  staffPermissions,
  UserPermission,
} from "@/app/admin/_components/UserPermissions";
import { OptionLink } from "../../_components/OptionLink";

export default function AuthorizedUsersOption({
  admin,
  editor,
  staff,
  profile,
}: Partial<UserPermission>) {
  return (
    <>
      {admin &&
        adminPermissions(profile || "unRegisteredUser")?.map(
          (setting) =>
            setting && (
              <OptionLink
                icon={setting.icon}
                key={setting.displayName}
                href={setting.href}
                displayName={setting.displayName}
              />
            ),
        )}

      {editor &&
        editorPermissions(profile || "unRegisteredUser")?.map(
          (setting) =>
            setting && (
              <OptionLink
                icon={setting.icon}
                key={setting.displayName}
                href={setting.href}
                displayName={setting.displayName}
              />
            ),
        )}

      {staff &&
        staffPermissions(profile || "unRegisteredUser")?.map(
          (setting) =>
            setting && (
              <OptionLink
                icon={setting.icon}
                key={setting.displayName}
                href={setting.href}
                displayName={setting.displayName}
              />
            ),
        )}
    </>
  );
}
