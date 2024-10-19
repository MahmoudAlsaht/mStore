"use server";
import { checkUser } from "@/app/(siteFacing)/auth/_actions/isAuthenticated";
import db from "@/db/db";
import { hashPassword, isValidPassword } from "@/lib/hashPassword";
import { redirect } from "next/navigation";
import { z } from "zod";

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "يجب أن تقوم بإدخال هذا الحقل"),
    newPassword: z.string().min(6, "كلمة المرور يجب ان لا تكون اقل من 6 خانات"),
    confirmPassword: z.string(),
  })
  .superRefine(({ confirmPassword, newPassword }, ctx) => {
    if (confirmPassword !== newPassword) {
      ctx.addIssue({
        code: "custom",
        message: " يجب أن تتطابق كلمتي المرور ",
        path: ["confirmPassword", "newPassword"],
      });
    }
  });

export async function updatePassword(
  profileId: string,
  _prevState: unknown,
  formData: FormData,
) {
  const result = passwordSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const currentUser = await checkUser();
  const wantToUpdateUser = await db.user.findFirst({
    where: { profile: { id: profileId } },
  });

  if (
    currentUser == null ||
    wantToUpdateUser == null ||
    wantToUpdateUser.id !== currentUser.id
  ) {
    return {
      currentPassword: "ليس لديك الصلاحية",
      newPassword: "ليس لديك الصلاحية",
      confirmPassword: "ليس لديك الصلاحية",
    };
  }

  const data = result.data;

  if (!(await isValidPassword(data.currentPassword, wantToUpdateUser.password)))
    return {
      currentPassword: "البيانات المدخلة غير صحيحة",
      newPassword: "البيانات المدخلة غير صحيحة",
      confirmPassword: "البيانات المدخلة غير صحيحة",
    };

  await db.user.update({
    where: { id: wantToUpdateUser.id },
    data: { password: await hashPassword(data.newPassword) },
  });

  redirect(`/account/${profileId}/account-settings`);
}
