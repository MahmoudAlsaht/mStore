"use client";
import {
  FormEvent,
  ReactNode,
  Suspense,
  useState,
  SyntheticEvent,
  ChangeEvent,
  MouseEventHandler,
  FormEventHandler,
} from "react";
import { Tabs, TabsList } from "@/components/ui/tabs";
import { usePathname, useRouter } from "next/navigation";
import { ArrowDownUpIcon, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter } from "lucide-react";
import {
  LoadingLink,
  useStartLoading,
} from "@/app/(siteFacing)/_context/LoadingContext";

export default function ProductMobileNav({
  query,
  banner,
  offersExists = false,
  forHomeExists = false,
  sortPrice,
}: {
  query: string;
  banner?: ReactNode;
  offersExists?: boolean;
  forHomeExists?: boolean;
  sortPrice: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { startLoading } = useStartLoading();
  const [queryValue, setQueryValue] = useState<string>(query || "");
  const [sortPriceValue, setSortPriceValue] = useState<string>(sortPrice || "");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    startLoading(() =>
      router.push(
        `${pathname}${queryValue !== "" ? `?search=${queryValue}${sortPriceValue !== "" ? `&sortPrice=${sortPriceValue}` : ""}` : `${sortPriceValue !== "" ? `?sortPrice=${sortPriceValue}` : ""}`}`,
      ),
    );
  };

  return (
    <>
      <div className="sm:hidden">
        <Tabs className="bg-inherit p-2 text-center" dir="rtl">
          <TabsList className="w-full bg-inherit">
            <TabLink
              className={`${pathname === "/products/any" && "bg-background text-rayanPrimary-dark shadow-sm"}`}
              href={`/products/any${queryValue !== "" ? `?search=${queryValue}${sortPriceValue !== "" ? `&sortPrice=${sortPriceValue}` : ""}` : `${sortPriceValue !== "" ? `?sortPrice=${sortPriceValue}` : ""}`}`}
            >
              كل المنتجات
            </TabLink>
            {offersExists && (
              <TabLink
                className={`${pathname === "/products/offers" && "bg-background text-rayanPrimary-dark shadow-sm"}`}
                href={`/products/offers${queryValue !== "" ? `?search=${queryValue}${sortPriceValue !== "" ? `&sortPrice=${sortPriceValue}` : ""}` : `${sortPriceValue !== "" ? `?sortPrice=${sortPriceValue}` : ""}`}`}
              >
                العروض
              </TabLink>
            )}
            {forHomeExists && (
              <TabLink
                className={`${pathname === "/products/for-home" && "bg-background text-rayanPrimary-dark shadow-sm"}`}
                href={`/products/for-home${queryValue !== "" ? `?search=${queryValue}${sortPriceValue !== "" ? `&sortPrice=${sortPriceValue}` : ""}` : `${sortPriceValue !== "" ? `?sortPrice=${sortPriceValue}` : ""}`}`}
              >
                المنزلية
              </TabLink>
            )}
          </TabsList>
          <div className="mb-2 flex items-center gap-2">
            <form
              onSubmit={handleSubmit}
              className="relative flex basis-10/12 items-center"
            >
              <input
                type="text"
                id="search-navbar"
                name="query"
                className="order-2 w-full rounded-lg border border-gray-300 bg-gray-50 p-2 ps-14 text-sm text-gray-900 focus:outline-none"
                placeholder="ابحث عن منتج، فئة، علامة تجارية..."
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

            <DropdownMenu dir="rtl">
              <DropdownMenuTrigger className="hover flex rounded-lg border border-rayanPrimary-dark px-2 py-1">
                <Filter />
                <ArrowDownUpIcon className="size-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <LoadingLink
                    href={`${pathname}${queryValue !== "" ? `?search=${queryValue}` : ""}`}
                  >
                    افتراضي
                  </LoadingLink>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortPriceValue("highest")}>
                  <LoadingLink
                    href={`${pathname}${queryValue !== "" ? `?search=${queryValue}&sortPrice=highest` : "?sortPrice=highest"}`}
                  >
                    الأعلى سعرا
                  </LoadingLink>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortPriceValue("lowest")}>
                  <LoadingLink
                    href={`${pathname}${queryValue !== "" ? `?search=${queryValue}&sortPrice=lowest` : "?sortPrice=lowest"}`}
                  >
                    الأقل سعرا
                  </LoadingLink>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </Tabs>
      </div>

      <Suspense>{banner}</Suspense>
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
  return (
    <LoadingLink
      href={href}
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${className}`}
    >
      {children}
    </LoadingLink>
  );
}
