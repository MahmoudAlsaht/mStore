"use server";
import db from "@/db/db";
import { notFound, redirect } from "next/navigation";
import { z } from "zod";
import { getCart, updateCart } from "../../_context/cart/actions/checkCart";

const addAnonymousSchema = z.object({
  name: z.string().min(1, "الرجاء قم بادخال اسمك"),
  phone: z.string().optional(),
  district: z.string().min(1, "يجب تحديد المنطقة"),
});

export const createAnonymous = async (
  phone: string | null,
  _: unknown,
  formData: FormData,
) => {
  const result = await addAnonymousSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (result.success === false) return result.error.formErrors.fieldErrors;

  if (!phone)
    return {
      name: "",
      phone: "يرجى التأكد من جميع البيانات و المحاولة لاحقا",
      district: "",
    };

  const data = result.data;

  const cart = await getCart();
  if (!cart) return notFound();

  const anonymous = await db.anonymous.create({
    data: {
      name: data.name,
      contact: {
        create: {
          districtId: data.district,
          contactNumber: phone,
        },
      },
    },
  });

  const updatedCart = { ...cart, anonymous: anonymous };

  await updateCart(updatedCart);

  redirect("/checkout/payment-method");
};
