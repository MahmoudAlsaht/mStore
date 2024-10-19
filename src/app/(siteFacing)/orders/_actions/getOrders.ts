"use server";

import db from "@/db/db";
import { checkUser } from "../../auth/_actions/isAuthenticated";
import { revalidatePath } from "next/cache";

export async function getPendingLength() {
  const user = await checkUser();

  if (!user) return 0;

  if (user.role === "customer")
    return (
      await db.order.findMany({
        where: {
          AND: [{ profileId: user.profile?.id }, { status: "pending" }],
        },
      })
    )?.length;

  if (user.role === "admin" || user.role === "editor" || user.role === "staff")
    return (
      await db.order.findMany({
        where: { status: "pending" },
      })
    )?.length;

  revalidatePath("/");
  return 0;
}
