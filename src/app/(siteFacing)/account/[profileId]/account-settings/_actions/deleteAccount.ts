"use server";
import { checkUser } from "@/app/(siteFacing)/auth/_actions/isAuthenticated";
import db from "@/db/db";
import { isValidPassword } from "@/lib/hashPassword";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const deleteAccountSchema = z.object({
  password: z.string().min(1, "يجب أن تقوم بإدخال هذا الحقل"),
});

export async function deleteAccount(
  profileId: string,
  _prevState: unknown,
  formData: FormData,
) {
  const result = deleteAccountSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const currentUser = await checkUser();
  const wantToDeleteUser = await db.user.findFirst({
    where: { profile: { id: profileId } },
  });

  if (
    currentUser == null ||
    wantToDeleteUser == null ||
    wantToDeleteUser.id !== currentUser.id
  ) {
    return {
      password: "ليس لديك الصلاحية",
    };
  }

  const data = result.data;

  if (!(await isValidPassword(data.password, wantToDeleteUser.password)))
    return {
      password: "البيانات المدخلة غير صحيحة",
    };

  await db.contact.deleteMany({
    where: { profileId: wantToDeleteUser.profileId },
  });

  await db.user.delete({ where: { id: wantToDeleteUser.id } });

  cookies().delete("token");

  redirect(`/`);
}
