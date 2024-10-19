"use server";
import db from "@/db/db";
import { addHours, addMinutes } from "date-fns";
import { redirect } from "next/navigation";
import { DateRange } from "react-day-picker";
import z from "zod";

const addPromoSchema = z.object({
  code: z.string().min(1, "الرجاء ادخال هذا الحقل"),
  active: z.string(),
  isMinPrice: z.string().optional(),
  discount: z.string().min(1, "الرجاء ادخل قيمة الخصم").optional(),
  minPrice: z
    .string()
    .min(1, "الرجاء ادخل الحد الأدنى لتطبيق الخصم")
    .optional(),
  promoType: z.string().min(1, "الرجاء ادخل نوع الكوبون "),
});

export async function createNewPromo(
  date: DateRange | undefined,
  _prevState: unknown,
  formData: FormData,
) {
  const result = addPromoSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (result.success === false) return result.error.formErrors.fieldErrors;

  const data = result.data;

  const checkPromoExists = await db.promoCode.findFirst({
    where: { code: data.code },
  });

  if (checkPromoExists != null)
    return {
      code: "هذا الكوبون موجود بالفعل",
      active: "",
      discount: "",
      promoType: "",
      minPrice: "",
      isMinPrice: "",
    };

  if (data.promoType !== "shippingFees" && !data.discount)
    return {
      code: "",
      active: "",
      discount: "الرجاء ادخل قيمة الخصم",
      promoType: "",
      minPrice: "",
      isMinPrice: "",
    };

  await db.promoCode.create({
    data: {
      code: data.code,
      discount:
        data.promoType === "shippingFees"
          ? 100
          : parseInt(data.discount as string) || 0,
      promoType: data.promoType,
      active: data.active === "on" ? true : false,
      minPrice:
        data.isMinPrice === "on" && data.minPrice
          ? parseFloat(data.minPrice)
          : null,
      isTerms: data.isMinPrice === "on",
      startDate:
        data.active === "on" ? date?.from && addHours(date?.from, 3) : null,
      endDate:
        data.active === "on" ? date?.to && addMinutes(date.to, 1619) : null,
    },
  });

  redirect("/admin/settings/promo-codes");
}
