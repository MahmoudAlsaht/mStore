"use server";
import db from "@/db/db";
import { z } from "zod";
import { redirect } from "next/navigation";
import { trimAndNormalizeProductData } from "@/lib/trimAndNormalizeProductData";

const EditDistrictSchema = z.object({
  name: z.string().min(1, "يجب تحديد اسم المنطقة").optional(),
  shippingFees: z.string().min(1, "يجب تحديد اسم المنطقة").optional(),
});

export const editDistrict = async (
  id: string,
  _pervState: unknown,
  formData: FormData,
) => {
  const result = await EditDistrictSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (result.success === false) return result.error.formErrors.fieldErrors;

  const data = result.data;

  const district = await db.district.findUnique({
    where: { id },
  });

  await db.district.update({
    where: { id },
    data: {
      name:
        ((await trimAndNormalizeProductData(data?.name ?? "")) as string) ||
        ((await trimAndNormalizeProductData(district?.name ?? "")) as string),
      shippingFees:
        parseFloat(data?.shippingFees as string) || district?.shippingFees,
    },
  });

  redirect("/admin/settings/districts");
};
