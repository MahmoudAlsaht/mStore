"use server";
import db from "@/db/db";
import { sendVerificationCode } from "@/app/webhook/_actions/sendMessage";

export async function registerPhone(type: string, phone: string | null) {
  if (!phone) return "الرجاء ادخل رقم هاتف صحيح";
  if (type === "userPhone") {
    const user = await db.user.findUnique({
      where: { phone: phone },
    });
    if (user !== null) return "هذا الرقم مسجل بالفعل";
  }
  if (type === "resetPassword") {
    const user = await db.user.findUnique({
      where: { phone: phone },
    });

    if (!user) return "لم يتم العثور على حساب مرتبط بهذا الرقم";
  }

  await sendVerificationCode(phone);
  return "success";
}
