"use client";
import React, { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { CiDeliveryTruck } from "react-icons/ci";
import { SlOptions } from "react-icons/sl";
import { ImHome } from "react-icons/im";
import { Search, ShoppingBag } from "lucide-react";
import { LoadingLink } from "@/app/(siteFacing)/_context/LoadingContext";
import { useCart } from "@/app/(siteFacing)/_context/cart/CartContext";

export default function BottomNavLinks({
  user,
  pendingOrdersLength,
}: {
  user;
  pendingOrdersLength: number;
}) {
  const { cart } = useCart();

  return (
    <div
      className={`mx-auto grid h-full max-w-lg ${user && cart ? "grid-cols-5" : user || cart ? "grid-cols-4" : "grid-cols-3"}`}
    >
      <NavLink href="/" title="الرئيسية">
        <ImHome className="size-6" />
      </NavLink>

      <NavLink title="المنتجات" href="/products/any">
        <Search className="size-6" />
      </NavLink>

      {cart != null && (
        <NavLink href="/cart" navType="cart">
          <ShoppingBag />
          <small className="absolute -right-1 -top-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs font-bold text-white">
            {cart?.products?.length}
          </small>
        </NavLink>
      )}

      {user && (
        <NavLink
          href="/orders/all"
          title={user.role === "customer" ? "طلباتي" : "الطلبات"}
        >
          <div className="relative">
            <CiDeliveryTruck className="size-7" />
            {pendingOrdersLength > 0 && (
              <div className="absolute -right-1 -top-0 inline-flex">
                <small className="relative flex h-3 w-3">
                  <small className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rayanWarning-light opacity-75"></small>
                  <small className="relative inline-flex h-3 w-3 rounded-full bg-rayanWarning-light"></small>
                </small>
              </div>
            )}
          </div>
        </NavLink>
      )}

      <NavLink href="/options" title="الخيارات">
        <SlOptions className="size-7" />
      </NavLink>
    </div>
  );
}

function NavLink({
  href,
  children,
  title,
  navType = "normal",
}: {
  href: string;
  children: ReactNode;
  title?: string;
  navType?: string;
}) {
  const pathname = usePathname();

  return (
    <LoadingLink
      href={href}
      className={`group inline-flex cursor-pointer flex-col items-center justify-center px-5 ${
        (href === pathname ||
          ((href as string).match(/\/products*/) &&
            pathname.match(/\/products*/)) ||
          ((href as string).match(/\/orders*/) &&
            pathname.match(/\/orders*/))) &&
        "bg-slate-300 text-rayanPrimary-dark"
      }`}
    >
      {navType === "cart" ? (
        <div
          className={`relative rounded-xl bg-rayanPrimary-dark p-2 text-slate-100 ${href !== pathname && "bg-opacity-60"}`}
        >
          {children}
        </div>
      ) : (
        children
      )}
      {(href === pathname ||
        ((href as string).match(/\/products*/) &&
          pathname.match(/\/products*/))) && (
        <span className="text-xs">{title}</span>
      )}
    </LoadingLink>
  );
}
