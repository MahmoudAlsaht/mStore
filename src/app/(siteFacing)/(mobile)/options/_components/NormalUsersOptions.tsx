"use client";
import { customerPermissions } from "@/app/admin/_components/UserPermissions";
import { OptionLink } from "../../_components/OptionLink";

export default function NormalUsersOptions({ profile }: { profile: string }) {
  return (
    <>
      {customerPermissions(profile || "unRegisteredUser").map(
        (setting) =>
          setting.displayName !== "المتجر" && (
            <OptionLink
              key={setting.displayName}
              href={setting.href}
              icon={setting.icon}
              displayName={setting.displayName}
            />
          ),
      )}
    </>
  );
}
