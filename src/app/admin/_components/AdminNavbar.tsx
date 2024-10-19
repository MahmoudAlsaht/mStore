import Image from "next/image";
import Logo from "../../rayan.marketLogo.png";
import AdminSideBar from "./AdminSideBar";
import { getUserPermission } from "./UserPermissions";
import { LoadingLink } from "@/app/(siteFacing)/_context/LoadingContext";

export default async function AdminNavbar() {
  const user = await getUserPermission();

  return (
    <>
      <nav
        className="z-50 mx-auto max-w-[1481.6px] border-gray-200 bg-slate-100"
        dir="rtl"
      >
        <div className="mx-auto flex flex-wrap items-center justify-between p-4">
          <LoadingLink
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <Image
              src={Logo}
              className="h-[50px] w-[80px]"
              alt="Al Rayan Logo"
            />
          </LoadingLink>

          <AdminSideBar {...user} />
        </div>
      </nav>
    </>
  );
}
