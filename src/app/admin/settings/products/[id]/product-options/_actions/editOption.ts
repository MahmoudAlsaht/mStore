"use server";
import { trimAndNormalizeProductData } from "@/lib/trimAndNormalizeProductData";
import db from "@/db/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";

const editOptionSchema = z.object({
  name: z.string().min(1, "الرجاء ادخال هذا الحقل"),
  price: z
    .string()
    .min(0.05, "الرجاء ادخال هذا الحقل")
    .regex(/^(?!0\d|[0.]*$)\d*\.?\d+$/),
});

export async function editOption(
  id: string,
  _prevState: unknown,
  formData: FormData,
) {
  const result = editOptionSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (result.success === false) return result.error.formErrors.fieldErrors;

  const data = result.data;

  const currentProductOption = await db.productOptions.findUnique({
    where: { id },
  });

  await db.productOptions.update({
    where: { id },
    data: {
      name:
        ((await trimAndNormalizeProductData(data.name)) as string) ||
        currentProductOption?.name.trim(),
      price: parseFloat(data.price) || currentProductOption?.price,
    },
  });

  revalidatePath("/", "layout");

  redirect(
    `/admin/settings/products/${currentProductOption?.productId}/product-options`,
  );
}
