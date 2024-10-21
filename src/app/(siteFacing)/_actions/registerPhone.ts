"use server";
import db from "@/db/db";
import { sendVerificationCode } from "@/app/(siteFacing)/_actions/sendMessage";

export async function registerPhone(
  type: string,
  phone: string | null,
): Promise<{ status: boolean; message?: string; phone?: string }> {
  if (!phone) return { status: false, message: "الرجاء ادخل رقم هاتف صحيح" };
  if (type === "userPhone") {
    const user = await db.user.findUnique({
      where: { phone: phone },
    });
    if (user !== null)
      return { status: false, message: "هذا الرقم مسجل بالفعل" };
  }
  if (type === "resetPassword") {
    const user = await db.user.findUnique({
      where: { phone: phone },
    });

    if (!user)
      return {
        status: false,
        message: "لم يتم العثور على حساب مرتبط بهذا الرقم",
      };
  }

  await sendVerificationCode(phone);
  return { status: true, phone };
}
