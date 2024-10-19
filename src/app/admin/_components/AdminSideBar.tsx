"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LogOut, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";
import logout from "@/app/(siteFacing)/auth/_actions/logout";
import {
  adminPermissions,
  editorPermissions,
  staffPermissions,
  UserPermission,
} from "./UserPermissions";
import { LoadingLink } from "@/app/(siteFacing)/_context/LoadingContext";

export default function AdminSideBar({
  admin,
  editor,
  staff,
  profile,
}: UserPermission) {
  const [show, setShow] = useState(false);

  const toggleShow = () => setShow(!show);

  return (
    <>
      <div className="text-center">
        <Button
          variant="ghost"
          className="h-10 w-10 rounded-lg p-2 text-sm"
          type="button"
          data-drawer-target="drawer-navigation"
          data-drawer-show="drawer-navigation"
          aria-controls="drawer-navigation"
          onClick={toggleShow}
        >
          <Menu className="text-rayanPrimary-dark" />
        </Button>
      </div>

      <aside
        id="default-sidebar"
        className={`${
          !show && "hidden"
        } fixed left-0 top-0 z-40 h-dvh w-full transition-transform sm:w-64 sm:translate-x-0`}
      >
        <div className="h-full overflow-y-auto border-r border-gray-300 bg-white px-3 py-5">
          <ul className="space-y-2">
            <li>
              <Button
                variant="ghost"
                className="group flex items-center rounded-lg p-2 pl-0 text-base font-normal text-gray-900 hover:bg-gray-700 hover:text-white"
                onClick={toggleShow}
              >
                <span className="ml-3">
                  <X className="text-rayanPrimary-dark" />
                </span>
              </Button>
            </li>

            {admin &&
              adminPermissions(profile || "unRegisteredUser", true).map(
                (setting) =>
                  setting && (
                    <SideLink key={setting.displayName} href={setting.href}>
                      {setting.icon}

                      <span className="ml-3 mr-2">{setting.displayName}</span>
                    </SideLink>
                  ),
              )}

            {editor &&
              editorPermissions(profile || "unRegisteredUser", true).map(
                (setting) =>
                  setting && (
                    <SideLink key={setting.displayName} href={setting.href}>
                      {setting.icon}

                      <span className="ml-3 mr-2">{setting.displayName}</span>
                    </SideLink>
                  ),
              )}

            {staff &&
              staffPermissions(profile || "unRegisteredUser", true).map(
                (setting) =>
                  setting && (
                    <SideLink key={setting.displayName} href={setting.href}>
                      {setting.icon}

                      <span className="ml-3 mr-2">{setting.displayName}</span>
                    </SideLink>
                  ),
              )}
          </ul>

          <ul className="mt-5 space-y-2 border-t border-gray-700 pt-5">
            <SideLink href={logout}>
              <LogOut className="h-6 w-6 flex-shrink-0 transition duration-75 group-hover:text-white" />

              <span className="ml-3 mr-2">تسجيل الخروج</span>
            </SideLink>
          </ul>
        </div>
      </aside>
    </>
  );
}

function SideLink({
  href,
  children,
}: {
  href: string | (() => void);
  children: ReactNode;
}) {
  const pathname = usePathname();

  return (
    <li>
      <LoadingLink
        href={href}
        className={cn(
          "group flex items-center rounded-lg p-2 text-base font-normal transition duration-75 hover:bg-gray-700 hover:text-white",
          pathname === href && "bg-gray-700 text-white",
        )}
      >
        {children}
      </LoadingLink>
    </li>
  );
}
