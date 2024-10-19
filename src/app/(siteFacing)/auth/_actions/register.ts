"use server";
import db from "@/db/db";
import { hashPassword } from "@/lib/hashPassword";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const registerSchema = z
  .object({
    phone: z.string().optional(),
    username: z.string().min(1, "يجب تحديد اسم المستخدم!"),
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

export const register = async (
  phone: string | null,
  _pervState: unknown,
  formData: FormData,
) => {
  const result = await registerSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;

  if (!phone)
    return {
      phone: "هناك مشكلة ما برقم الهاتف المدخل يرجى المحاولة لاحقا",
      username: "",
      password: "",
      confirmPassword: "",
    };

  const newUser = await db.user.create({
    data: {
      phone: phone,
      username: data.username,
      password: await hashPassword(data.password),
      role: "customer",
      profile: {
        create: {},
      },
    },
  });

  const token = jwt.sign(
    { id: newUser?.id, name: newUser?.username },
    process.env.SECRET_1,
  );

  const date = Date.now() * 1000 * 60 * 60 * 24 * 100;
  cookies().set("token", token, {
    path: "/",
    expires: date,
  });

  redirect("/");
};
