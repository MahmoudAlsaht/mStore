"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  LoadingLink,
  useStartLoading,
} from "@/app/(siteFacing)/_context/LoadingContext";
import { FormEvent, ReactNode, useEffect, useState } from "react";
import { Search } from "lucide-react";
import BackButtonNav from "@/components/BackButtonNav";
import { useCart } from "../../_context/cart/CartContext";

const statuses: {
  value: string;
  displayName: string;
  color?: string;
}[] = [
  {
    value: "all",
    displayName: "جميع الطلبات",
    color: "",
  },
  {
    value: "pending",
    displayName: "قيد المعالجة",
    color: "text-rayanWarning-dark",
  },
  {
    value: "finished",
    displayName: "تمت",
    color: "text-sky-600",
  },
  {
    value: "rejected",
    displayName: "مرفوضة",
    color: "text-pink-700",
  },
  {
    value: "canceled",
    displayName: "ملغية",
    color: "text-destructive",
  },
];

export default function OrdersTabs({
  search,
  children,
  userRole,
}: {
  search?: string;
  children: ReactNode;
  userRole: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { checkCart } = useCart();
  const { startLoading } = useStartLoading();
  const [queryValue, setQueryValue] = useState<string>(search ? search : "");
  const [isAuthorized, setIsAuthorized] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    startLoading(() => router.push(`/orders/all/?search=${queryValue}`));
  };

  useEffect(() => {
    setIsAuthorized(userRole !== "customer" && userRole !== "anonymous");
    checkCart();
  }, [isAuthorized, userRole, checkCart]);

  return (
    <>
      <header className="mt-4 bg-inherit p-2 text-center" dir="rtl">
        <BackButtonNav
          href={pathname === "/orders/all" && !search ? pathname : ""}
        />
        {statuses.map((status) => (
          <TabLink
            key={status.value}
            className={`rounded-lg text-sm sm:text-xl ${
              pathname.includes(status.value) &&
              `text-md bg-background ${status.color} shadow-sm sm:text-2xl`
            }`}
            href={`/orders/${status.value}`}
          >
            {status.displayName}
          </TabLink>
        ))}
        {isAuthorized && (
          <div className="mx-auto my-3 w-10/12 sm:w-9/12 md:w-5/12">
            <form
              onSubmit={handleSubmit}
              className="relative flex basis-10/12 items-center"
            >
              <input
                type="text"
                id="search-navbar"
                name="query"
                className="order-2 w-full rounded-lg border border-gray-300 bg-gray-50 p-2 ps-14 text-sm text-gray-900 focus:outline-none"
                placeholder="اكتب رقم الطلب..."
                value={queryValue}
                onChange={(e) => setQueryValue(e.target.value)}
              />
              <LoadingLink
                href="#"
                type="submit"
                className="absolute mr-2 bg-inherit text-rayanPrimary-dark hover:bg-slate-50"
              >
                <Search />
              </LoadingLink>
            </form>
          </div>
        )}
      </header>

      {children}
    </>
  );
}

function TabLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const pathname = usePathname();
  return (
    <LoadingLink
      href={href}
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${className}`}
    >
      {children}
    </LoadingLink>
  );
}
