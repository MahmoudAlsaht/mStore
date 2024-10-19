"use server";

import db from "@/db/db";
import { getCart, updateCart } from "../_context/cart/actions/checkCart";
import { cookies } from "next/headers";

export async function checkPromoAndAddToCart(code: string) {
  const promo = await db.promoCode.findFirst({
    where: { code: { equals: code, mode: "insensitive" } },
  });

  if (!promo) return null;

  if (promo.active) {
    const currCart = await getCart();
    const updatedCart = { ...currCart, promo };
    cookies().set("cart", JSON.stringify(updatedCart));
  }

  const cart = await getCart();
  if (
    promo &&
    cart &&
    promo.active &&
    (!promo.isTerms ||
      (promo.isTerms && cart?.total && cart.total >= (promo?.minPrice || 0)))
  ) {
    const updatedCart = { ...cart, promoCode: promo };
    await updateCart(updatedCart);
  }
  return promo;
}
