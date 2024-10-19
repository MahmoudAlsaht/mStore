"use server";
import db from "@/db/db";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const checkUser = async () => {
  const token = cookies().get("token");

  if (token == null) return null;

  const decoded: any = jwt.verify(token?.value as string, process.env.SECRET_1);

  const user = await db.user.findUnique({
    where: { id: decoded.id },
    select: {
      id: true,
      phone: true,
      username: true,
      role: true,
      profile: {
        select: {
          id: true,
        },
      },
    },
  });

  if (user == null) return null;

  return user;
};
