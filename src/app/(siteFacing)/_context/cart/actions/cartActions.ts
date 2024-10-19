"use server";
import { cookies } from "next/headers";
import { Cart } from "@/app/(siteFacing)/_context/cart/CartContext";

export async function deleteCart() {
  cookies().delete("cart");
}

export async function setCartCookie(cart: Cart) {
  const date = new Date();
  date.setTime(date.getTime() + 1000 * 60 * 60 * 24);
  cookies().set("cart", JSON.stringify(cart));
}
