"use server";
import db from "@/db/db";
import { redirect } from "next/navigation";
import { z } from "zod";

const editContactSchema = z.object({
  editNumber: z.string().optional(),
  isUserPhone: z.string().optional(),
  district: z.string().optional(),
  profileId: z.string().optional(),
  phone: z.string().optional(),
});

export const editContact = async (
  phone: string | null,
  contactId: string,
  profileId: string,
  redirectUrl: string,
  _: unknown,
  formData: FormData,
) => {
  const result = await editContactSchema.safeParse(
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

  if (!phone)
    return {
      editNumber: "",
      isUserPhone: "",
      profileId: "",
      district: "",
      phone: "نعتذر لقد حدثت مشكلة ما يرجى المحاولة لاحقا",
    };

  const data = result.data;

  const currentContact = await db.contact.findUnique({
    where: { id: contactId },
    select: {
      district: true,
      id: true,
      contactNumber: true,
    },
  });

  await db.profile.update({
    where: { id: profileId },
    data: {
      contacts: {
        update: {
          where: { id: contactId },
          data: {
            districtId: data.district || currentContact?.district?.id,
            contactNumber: phone || currentContact?.contactNumber,
          },
        },
      },
    },
  });

  redirect(redirectUrl);
};
