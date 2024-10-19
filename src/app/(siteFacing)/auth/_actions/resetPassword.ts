"use server";
import db from "@/db/db";
import { hashPassword } from "@/lib/hashPassword";
import { z } from "zod";
import { redirect } from "next/navigation";

const resetSchema = z
  .object({
    phone: z.string().optional(),
    password: z.string().min(6, "كلمة المرور يجب ان لا تكون اقل من 6 خانات"),
    confirmPassword: z.string(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: " يجب أن تتطابق كلمتي المرور ",
        path: ["confirmPassword", "password"],
      });
    }
  });

export const resetPassword = async (
  phone: string | null,
  _pervState: unknown,
  formData: FormData,
) => {
  const result = await resetSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;

  if (!phone)
    return {
      phone: "هناك مشكلة ما برقم الهاتف المدخل يرجى المحاولة لاحقا",
      password: "",
      confirmPassword: "",
    };

  await db.user.update({
    where: { phone },
    data: {
      password: await hashPassword(data.password),
    },
  });

  redirect("/auth/login");
};
