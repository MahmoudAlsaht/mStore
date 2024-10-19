import { ReactNode } from "react";
import CheckoutNav from "./_components/CheckoutNav";
import BackButtonNav from "@/components/BackButtonNav";
import { getCart } from "../_context/cart/actions/checkCart";
import { redirect } from "next/navigation";

export const dynamic =
  process.env.NODE_ENV === "development" ? "force-dynamic" : "auto";

export default function CheckoutLayout({ children }: { children: ReactNode }) {
  const cart = getCart();
  if (!cart) redirect("/");
  return (
    <>
      <BackButtonNav />
      <main
        dir="rtl"
        className="mt-10 flex w-full flex-col items-center justify-center gap-6"
      >
        <CheckoutNav />
        {children}
      </main>
    </>
  );
}
