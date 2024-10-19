"use server";
import twilio from "twilio";

const { TWILIO_SERVICE_SID, TWILIO_AUTH_TOKEN, TWILIO_ACCOUNT_SID } =
  process.env;
const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

export async function sendVerificationCode(recipient: string) {
  console.log(`+962${recipient.slice(1)}`);
  const message = await client.verify.v2
    .services(`${TWILIO_SERVICE_SID}`)
    .verifications.create({
      to: `+962${recipient.slice(1)}`,
      channel: "whatsapp",
    });
}

export async function checkVerificationCode(code: string, recipient: string) {
  const verificationCheck = await client.verify.v2
    .services(`${TWILIO_SERVICE_SID}`)
    .verificationChecks.create({
      code,
      to: `+962${recipient.slice(1)}`,
    });

  return verificationCheck.status;
}
