"use server";
import db from "@/db/db";
import { addHours, addMinutes } from "date-fns";
import { redirect } from "next/navigation";
import { DateRange } from "react-day-picker";
import z from "zod";

const editPromoSchema = z.object({
  code: z.string().min(1, "الرجاء ادخال هذا الحقل").optional(),
  active: z.string().optional(),
  discount: z.string().min(1, "الرجاء ادخل قيمة الخصم").optional(),
  isMinPrice: z.string().optional(),
  promoType: z.string().min(1, "الرجاء ادخل نوع الكوبون ").optional(),
  minPrice: z
    .string()
    .min(1, "الرجاء ادخل الحد الأدنى لتطبيق الخصم")
    .optional(),
});

export async function editPromo(
  date: DateRange | undefined,
  id: string,
  _prevState: unknown,
  formData: FormData,
) {
  const result = editPromoSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (result.success === false) return result.error.formErrors.fieldErrors;

  const data = result.data;

  const currentPromo = await db.promoCode.findUnique({
    where: { id },
  });

  await db.promoCode.update({
    where: { id },
    data: {
      code: data.code || currentPromo?.code,
      discount:
        data.promoType === "shippingFees"
          ? 100
          : parseInt(data.discount as string) || 0,
      promoType: data.promoType || currentPromo?.promoType,
      active: data.active === "on" ? true : false,
      minPrice:
        data.isMinPrice === "on"
          ? parseFloat(data.minPrice as string) || currentPromo?.minPrice
          : null,
      isTerms: data.isMinPrice === "on",
      startDate:
        data.active === "on"
          ? (date?.from && addHours(date?.from, 3)) || currentPromo?.startDate
          : null,
      endDate:
        data.active === "on"
          ? (date?.to && addMinutes(date.to, 1619)) || currentPromo?.endDate
          : null,
    },
  });

  redirect("/admin/settings/promo-codes");
}
