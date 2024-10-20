"use server";
import { trimAndNormalizeProductData } from "@/lib/trimAndNormalizeProductData";
import db from "@/db/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";

const addOptionSchema = z.object({
  name: z.string().min(1, "الرجاء ادخال هذا الحقل"),
  price: z
    .string()
    .min(0.05, "الرجاء ادخال هذا الحقل")
    .regex(/^(?!0\d|[0.]*$)\d*\.?\d+$/),
});

export async function createNewOption(
  productId: string,
  _prevState: unknown,
  formData: FormData,
) {
  const result = addOptionSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (result.success === false) return result.error.formErrors.fieldErrors;

  const data = result.data;

  if (!productId || productId === "")
    return {
      name: "حدث خطأ ما, يرجى المحاولة لاحقا",
      price: "",
    };

  const checkProductExists = await db.productOptions.findFirst({
    where: {
      AND: [
        { name: (await trimAndNormalizeProductData(data.name)) as string },
        { productId },
      ],
    },
  });

  if (checkProductExists != null)
    return {
      name: "هذا المنتج موجود بالفعل",
      price: "",
    };

  await db.productOptions.create({
    data: {
      name: (await trimAndNormalizeProductData(data.name)) as string,
      price: parseFloat(data.price),
      productId,
    },
  });

  revalidatePath("/", "layout");

  redirect(`/admin/settings/products/${productId}/product-options`);
}
