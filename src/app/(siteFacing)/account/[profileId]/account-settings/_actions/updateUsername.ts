"use server";
import { checkUser } from "@/app/(siteFacing)/auth/_actions/isAuthenticated";
import db from "@/db/db";
import { isValidPassword } from "@/lib/hashPassword";
import { redirect } from "next/navigation";
import { z } from "zod";

const usernameSchema = z.object({
  username: z.string().min(1, "يجب أن تقوم بإدخال هذا الحقل"),
  password: z.string().min(1, "يجب أن تقوم بإدخال هذا الحقل"),
});

export async function updateUsername(
  profileId: string,
  _prevState: unknown,
  formData: FormData,
) {
  const result = usernameSchema.safeParse(
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
      username: "ليس لديك الصلاحية",
      password: "ليس لديك الصلاحية",
    };
  }

  const data = result.data;

  if (!(await isValidPassword(data.password, wantToUpdateUser.password)))
    return {
      username: "البيانات المدخلة غير صحيحة",
      password: "البيانات المدخلة غير صحيحة",
    };

  await db.user.update({
    where: { id: wantToUpdateUser.id },
    data: { username: data.username },
  });

  redirect(`/account/${profileId}/account-settings`);
}
