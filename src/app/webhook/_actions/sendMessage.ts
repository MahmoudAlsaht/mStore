"use server";
import db from "@/db/db";
import { generate6DigitsCode } from "@/lib/generate6DigitCode";
import axios from "axios";
import qs from "qs";

export async function sendVerificationCode(recipient: string) {
  const random6digits = generate6DigitsCode();

  const verificationCode = await createVerificationCode(
    recipient,
    random6digits,
  );

  const data = qs.stringify({
    token: "rqzgm9xndxmh3q7x",
    to: verificationCode.phone,
    body: `Your Code is: ${verificationCode.code}`,
  });

  const config = {
    method: "post",
    url: "https://api.ultramsg.com/instance97623/messages/chat",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
}

async function createVerificationCode(phone: string, code: number) {
  const checkIfCodeAlreadyGenerated = await db.verificationCode.findUnique({
    where: { phone },
  });
  if (checkIfCodeAlreadyGenerated) return checkIfCodeAlreadyGenerated;
  const newVerificationCode = await db.verificationCode.create({
    data: {
      phone: `+962${phone.slice(1)}`,
      code,
    },
  });
  return newVerificationCode;
}

export async function checkVerificationCode(code: number, phone: string) {
  const verificationCode = await db.verificationCode.findUnique({
    where: { phone: `+962${phone.slice(1)}` },
  });
  if (!verificationCode) return false;
  return verificationCode.code === code;
}
