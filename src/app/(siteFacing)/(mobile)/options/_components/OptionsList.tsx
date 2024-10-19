"use client";
import { OptionLink } from "../../_components/OptionLink";
import NormalUsersOptions from "./NormalUsersOptions";
import AuthorizedUsersOption from "./AuthorizedUsersOption";
import { LogInIcon, UserPlus } from "lucide-react";
import logout from "@/app/(siteFacing)/auth/_actions/logout";
import { LogOut } from "lucide-react";
import { UserPermission } from "@/app/admin/_components/UserPermissions";
import { GrLocation } from "react-icons/gr";
import { LoadingLink } from "@/app/(siteFacing)/_context/LoadingContext";

export default function OptionsList({
  admin,
  editor,
  customer,
  staff,
  unRegisteredUser,
  profile,
}: UserPermission) {
  return (
    <>
      <div className="flex h-screen w-full flex-col bg-inherit text-2xl text-rayanPrimary-dark">
        {unRegisteredUser && (
          <>
            <OptionLink
              href="/auth/register"
              displayName="التسجيل"
              icon={<UserPlus />}
            />
            <OptionLink
              href="/auth/login"
              displayName="تسجيل الدخول"
              icon={<LogInIcon />}
            />
          </>
        )}

        {customer && <NormalUsersOptions profile={profile} />}

        {!customer && (
          <AuthorizedUsersOption
            admin={admin}
            editor={editor}
            staff={staff}
            profile={profile}
          />
        )}

        {!unRegisteredUser && (
          <OptionLink
            href={logout}
            icon={<LogOut />}
            displayName="تسجيل الخروج"
          />
        )}

        <LoadingLink
          href="/contact-us"
          className={
            "fixed bottom-14 flex h-24 w-full items-center justify-center bg-slate-200/40 px-4 py-3"
          }
        >
          <span className="ml-4">
            <GrLocation />
          </span>
          تواصل معنا
        </LoadingLink>
      </div>
    </>
  );
}
