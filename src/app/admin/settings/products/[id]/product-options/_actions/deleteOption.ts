"use server";

import { deleteCloudinaryImage } from "@/cloudinary";
import db from "@/db/db";
import { revalidatePath } from "next/cache";

export async function deleteOption(id: string) {
  await db.productOptions.delete({ where: { id } });

  revalidatePath("/", "layout");
}
