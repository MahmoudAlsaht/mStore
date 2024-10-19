"use server";
import db from "@/db/db";
import { isValidPassword } from "@/lib/hashPassword";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const loginSchema = z.object({
  phone: z.string().min(1, "الرجاء قم بإدخال رقم الهاتف"),
  password: z.string().min(1, "الرجاء قم بإدخال كلمة المرور"),
});

export const login = async (_pervState: unknown, formData: FormData) => {
  const result = await loginSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;

  const user = await db.user.findUnique({
    where: { phone: data.phone },
  });

  if (user == null)
    return {
      phone: "البيانات المدخلة غير صحيحة",
      password: "البيانات المدخلة غير صحيحة",
    };

  if (!(await isValidPassword(data.password, user.password)))
    return {
      phone: "البيانات المدخلة غير صحيحة",
      password: "البيانات المدخلة غير صحيحة",
    };

  const token = jwt.sign(
    { id: user?.id, name: user?.username },
    process.env.SECRET_1,
  );

  const date = Date.now() * 1000 * 60 * 60 * 24 * 100;
  cookies().set("token", token, {
    path: "/",
    expires: date,
  });

  redirect("/");
};
