"use client";

import BackButtonNav from "@/components/BackButtonNav";
import { usePathname } from "next/navigation";

export default function CustomBackButtonNav() {
  const pathname = usePathname();
  return pathname === "/admin/settings/sections" ||
    pathname === "/admin/settings/sections/categories" ||
    pathname === "/admin/settings/sections/brands" ? (
    <BackButtonNav href="/admin" />
  ) : (
    <BackButtonNav />
  );
}
