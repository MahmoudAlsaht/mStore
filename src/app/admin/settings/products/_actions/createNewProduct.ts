"use server";
import { trimAndNormalizeProductData } from "@/lib/trimAndNormalizeProductData";
import { upload } from "@/cloudinary";
import db from "@/db/db";
import { setHours, setMilliseconds, setMinutes, setSeconds } from "date-fns";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { DateRange } from "react-day-picker";
import z from "zod";

const productImageSchema = z
  .instanceof(File, { message: "الرجاء اختر صورة للمنتج" })
  .refine((file) => file.size === 0 || file.type.startsWith("image/"));
const addProductSchema = z.object({
  category: z.string().min(1, "الرجاء قم باختيار قسم").optional(),
  brand: z.string().min(1, "الرجاء قم باختيار علامة").optional(),
  name: z.string().min(1, "الرجاء ادخال هذا الحقل"),
  body: z.string().min(1, "الرجاء ادخال هذا الحقل"),
  price: z
    .string()
    .min(0.05, "الرجاء ادخال هذا الحقل")
    .regex(/^(?!0\d|[0.]*$)\d*\.?\d+$/),
  quantity: z
    .string()
    .min(1, "الرجاء ادخال هذا الحقل")
    .regex(/^[0-9]\d*$/),
  description: z.string().optional(),
  isOffer: z.string().optional(),
  newPrice: z
    .string()
    .min(0.05, "الرجاء ادخال هذا الحقل")
    .regex(/^(?!0\d|[0.]*$)\d*\.?\d+$/)
    .optional(),
  productImage: productImageSchema.refine(
    (file) => file.size > 0,
    "الرجاء اختر صورة للمنتج",
  ),
});

export async function createNewProduct(
  date: DateRange | undefined,
  _prevState: unknown,
  formData: FormData,
) {
  const result = addProductSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (result.success === false) return result.error.formErrors.fieldErrors;

  const data = result.data;

  const checkProductExists = await db.product.findFirst({
    where: {
      AND: [
        { name: (await trimAndNormalizeProductData(data.name)) as string },
        { body: (await trimAndNormalizeProductData(data.body)) as string },
        data.category ? { categoryId: data.category } : {},
        data.brand ? { brandId: data.brand } : {},
      ],
    },
  });

  if (checkProductExists != null)
    return {
      name: "هذا المنتج موجود بالفعل",
      category: "",
      brand: "",
      body: "",
      price: "",
      newPrice: "",
      quantity: "",
      productImage: "",
      description: "",
    };

  const productImage = await upload(data.productImage);

  const newImage = await db.image.create({
    data: {
      imageType: "ProductImage",
      filename: productImage?.filename as string,
      path: productImage?.path as string,
    },
  });

  await db.product.create({
    data: {
      name: (await trimAndNormalizeProductData(data.name)) as string,
      categoryId: data.category,
      brandId: data.brand,
      body: (await trimAndNormalizeProductData(data.body)) as string,
      price: parseFloat(data.price),
      quantity: parseInt(data.quantity),
      isOffer: data.isOffer === "on" ? true : false,
      imageId: newImage.id,
      description: data.description
        ? ((await trimAndNormalizeProductData(data.description)) as string)
        : undefined,
      newPrice:
        data.isOffer === "on" ? parseFloat(data.newPrice as string) : null,
      offerStartsAt:
        data.isOffer === "on"
          ? date?.from &&
            setMilliseconds(
              setSeconds(setMinutes(setHours(date.from, 3), 0), 0),
              0,
            )
          : null,
      offerEndsAt:
        data.isOffer === "on"
          ? date?.to &&
            setMilliseconds(
              setSeconds(setMinutes(setHours(date.to, 26), 59), 0),
              0,
            )
          : null,
    },
  });

  revalidatePath("/", "layout");

  redirect("/admin/settings/products");
}
