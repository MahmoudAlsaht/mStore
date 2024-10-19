import { checkUser } from "@/app/(siteFacing)/auth/_actions/isAuthenticated";
import {
  Barcode,
  Columns3,
  Home,
  LayoutPanelTop,
  Locate,
  SlidersHorizontal,
  TicketCheck,
  Truck,
  Users,
} from "lucide-react";
import { ReactNode } from "react";

export type Permission = {
  displayName: string;
  href: string;
  icon: ReactNode;
};

export type UserPermission = {
  admin: boolean;
  editor: boolean;
  staff: boolean;
  customer: boolean;
  unRegisteredUser: boolean;
  profile: string;
};

export const getUserPermission = async () => {
  const user = await checkUser();

  return {
    admin: user?.role === "admin",
    editor: user?.role === "editor",
    staff: user?.role === "staff",
    customer: user?.role === "customer",
    unRegisteredUser: user == null,
    profile: user?.profile?.id as string,
  };
};

export const authorizedUserPermissions = (profileId: string) =>
  [
    {
      displayName: "المتجر",
      href: "/",
      icon: (
        <Home className="h-6 w-6 flex-shrink-0 transition duration-75 group-hover:text-white" />
      ),
    },
    {
      displayName: "المستخدمين",
      href: "/admin/settings/users",
      icon: (
        <Users className="h-6 w-6 flex-shrink-0 transition duration-75 group-hover:text-white" />
      ),
    },
    {
      displayName: "إعدادات الحساب",
      href: `/account/${profileId}/account-settings`,
      icon: (
        <SlidersHorizontal className="h-6 w-6 flex-shrink-0 transition duration-75 group-hover:text-white" />
      ),
    },
    {
      displayName: "الأقسام",
      href: "/admin/settings/sections",
      icon: (
        <LayoutPanelTop className="h-6 w-6 flex-shrink-0 transition duration-75 group-hover:text-white" />
      ),
    },
    {
      displayName: "المنتجات",
      href: "/admin/settings/products",
      icon: (
        <Barcode className="h-6 w-6 flex-shrink-0 transition duration-75 group-hover:text-white" />
      ),
    },
    {
      displayName: "كوبونات الخصم",
      href: "/admin/settings/promo-codes",
      icon: (
        <TicketCheck className="h-6 w-6 flex-shrink-0 transition duration-75 group-hover:text-white" />
      ),
    },
    {
      displayName: "اللافتات",
      href: "/admin/settings/banners",
      icon: (
        <Columns3 className="h-6 w-6 flex-shrink-0 transition duration-75 group-hover:text-white" />
      ),
    },
    {
      displayName: "المناطق المدعومة",
      href: "/admin/settings/districts",
      icon: (
        <Locate className="h-6 w-6 flex-shrink-0 transition duration-75 group-hover:text-white" />
      ),
    },
    {
      displayName: "الطلبات",
      href: "/orders/all",
      icon: (
        <Truck className="h-6 w-6 flex-shrink-0 transition duration-75 group-hover:text-white" />
      ),
    },
  ] as Permission[];

export const customerPermissions = (profileId: string) =>
  [
    {
      displayName: "إعدادات الحساب",
      href: `/account/${profileId}/account-settings`,
      icon: (
        <SlidersHorizontal className="h-6 w-6 flex-shrink-0 transition duration-75 group-hover:text-white" />
      ),
    },
    {
      displayName: "عناويني",
      href: `/account/${profileId}/contacts`,
      icon: (
        <Locate className="h-6 w-6 flex-shrink-0 transition duration-75 group-hover:text-white" />
      ),
    },
    {
      displayName: "طلباتي",
      href: `/all`,
      icon: (
        <Truck className="h-6 w-6 flex-shrink-0 transition duration-75 group-hover:text-white" />
      ),
    },
  ] as Permission[];

export const adminPermissions = (profileId: string, showStore = false) =>
  authorizedUserPermissions(profileId).map((setting) => {
    return !showStore
      ? setting.displayName !== "المتجر"
        ? setting
        : null
      : setting;
  });

export const editorPermissions = (profileId: string, showStore = false) =>
  adminPermissions(profileId, showStore).map((setting) => {
    return setting?.displayName !== "المستخدمين" ? setting : null;
  });

export const staffPermissions = (profileId: string, showStore = false) =>
  authorizedUserPermissions(profileId).map((setting) => {
    return (showStore && setting.displayName === "المتجر") ||
      setting.displayName === "إعدادات الحساب" ||
      setting.displayName === "الطلبات"
      ? setting
      : null;
  });
