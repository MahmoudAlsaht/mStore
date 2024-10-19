"use client";
import CartCard, { CartCardSkeleton } from "./CartCard";
import { Button } from "@/components/ui/button";
import {
  LoadingLink,
  useStartLoading,
} from "@/app/(siteFacing)/_context/LoadingContext";
import { formatCurrency } from "@/lib/formatters";
import CheckPromoForm from "./CheckPromoForm";
import { useCart } from "@/app/(siteFacing)/_context/cart/CartContext";
import { ProductCartProvider } from "@/app/(siteFacing)/_context/ProductCartContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const CART_MIN = 5;

export default function CartContainer() {
  const router = useRouter();
  const { cart } = useCart();
  const { startLoading } = useStartLoading();

  useEffect(() => {
    if (!cart) startLoading(() => router.push("/"));
  }, [cart, router, startLoading]);

  return (
    <main dir="rtl" className="flex w-full flex-col gap-4">
      <section className="grid grid-cols-1 gap-2 pt-5 sm:container sm:order-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {cart &&
          cart.products &&
          cart.products.map((product) => (
            <ProductCartProvider key={product.id} id={product.id}>
              <CartCard key={product.id} product={product} />
            </ProductCartProvider>
          ))}
      </section>

      <div className="container flex flex-col items-center gap-2">
        <CheckPromoForm cart={cart} />
        <LoadingLink
          href="/checkout/contact"
          className="w-full rounded-xl sm:w-1/3"
        >
          <Button disabled={(cart?.total || 0) < CART_MIN} className="w-full">
            تأكيد الاختيار
          </Button>
        </LoadingLink>
        {(cart?.total || 0) < CART_MIN ? (
          <div className="text-center text-lg text-destructive sm:order-1 sm:text-xl">
            <p>المبلغ الإجمالي: ({formatCurrency(cart?.total || 0)}) </p>
            {`يجب أن لا يقل المبلغ الإجمالي للسلة عن (${formatCurrency(CART_MIN)}) حتى تستطيع إكمال
            عملية الشراء`}
          </div>
        ) : (
          <p className="text-xl sm:order-1 sm:text-2xl">
            المبلغ الإجمالي: {formatCurrency(cart?.total || 0)}
          </p>
        )}
      </div>

      <div className="order-10 h-20"></div>
    </main>
  );
}

export function CartContainerSkeleton() {
  return (
    <section className="">
      <main dir="rtl" className="flex flex-col gap-4">
        <section className="order-2 grid grid-cols-2 gap-2 pt-5 sm:order-1 sm:grid-cols-4">
          <CartCardSkeleton />
          <CartCardSkeleton />
          <CartCardSkeleton />
          <CartCardSkeleton />
          <CartCardSkeleton />
          <CartCardSkeleton />
          <CartCardSkeleton />
          <CartCardSkeleton />
        </section>
        <div className="container flex flex-col items-center gap-2 sm:order-2">
          <Button disabled className="w-full rounded-xl sm:w-1/5"></Button>
        </div>
        <div className="order-10 h-20"></div>
      </main>
    </section>
  );
}
