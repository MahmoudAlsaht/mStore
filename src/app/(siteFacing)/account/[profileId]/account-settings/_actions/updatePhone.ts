"use server";
import { checkUser } from "@/app/(siteFacing)/auth/_actions/isAuthenticated";
import db from "@/db/db";
import { isValidPassword } from "@/lib/hashPassword";
import { redirect } from "next/navigation";
import { z } from "zod";

const phoneSchema = z.object({
  password: z.string().min(1, "يجب أن تقوم بإدخال هذا الحقل"),
});

export async function updatePhone(
  phone: string | null,
  profileId: string,
  _prevState: unknown,
  formData: FormData,
): Promise<string | undefined> {
  const result = phoneSchema.safeParse(Object.fromEntries(formData.entries()));
  if (result.success === false) {
    return result.error.formErrors.fieldErrors.password![0] || undefined;
  }

  const currentUser = await checkUser();
  const wantToUpdateUser = await db.user.findFirst({
    where: { profile: { id: profileId } },
  });

  console.log(profileId);

  console.log(
    currentUser,
    wantToUpdateUser,
    wantToUpdateUser?.id !== currentUser?.id,
  );
  if (
    currentUser == null ||
    wantToUpdateUser == null ||
    wantToUpdateUser.id !== currentUser.id
  ) {
    return "ليس لديك الصلاحية";
  }

  const data = result.data;

  if (
    !(await isValidPassword(data.password, wantToUpdateUser.password)) ||
    !phone
  )
    return "البيانات المدخلة غير صحيحة";

  await db.user.update({
    where: { id: wantToUpdateUser.id },
    data: { phone },
  });

  redirect(`/account/${profileId}/account-settings`);
}
