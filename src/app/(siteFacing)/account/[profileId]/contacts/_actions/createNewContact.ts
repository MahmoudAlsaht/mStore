"use server";
import db from "@/db/db";
import { redirect } from "next/navigation";
import { z } from "zod";

const addContactSchema = z.object({
  isUserPhone: z.string().optional(),
  editNumber: z.string().optional(),
  district: z.string().min(1, "يجب تحديد المنطقة"),
  profileId: z.string().optional(),
  phone: z.string().optional(),
});

export const createNewContact = async (
  phone: string | null,
  profileId: string,
  redirectUrl: string,
  _: unknown,
  formData: FormData,
) => {
  const result = await addContactSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (result.success === false) return result.error.formErrors.fieldErrors;

  if (!profileId) {
    return {
      editNumber: "",
      isUserPhone: "",
      phone: "",
      district: "",
      profileId: "نعتذر لقد حدثت مشكلة ما يرجى المحاولة لاحقا",
    };
  }

  const data = result.data;

  if (data.isUserPhone !== "on" && !phone)
    return {
      isUserPhone: "",
      editNumber: "",
      phone: "",
      district: "",
      profileId: "",
    };

  const user = await db.user.findFirst({
    where: { profile: { id: profileId } },
    select: { phone: true },
  });

  const { contacts } = await db.profile.update({
    where: { id: profileId },
    data: {
      contacts: {
        create: {
          districtId: data.district,
          contactNumber: data.isUserPhone === "on" ? user?.phone : phone,
        },
      },
    },
    select: {
      contacts: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  for (const contact of contacts) {
    if (contacts[contacts.length - 1].id !== contact.id) {
      await db.contact.update({
        where: { id: contact.id },
        data: { defaultContact: false },
      });
    }
  }

  redirect(redirectUrl);
};
