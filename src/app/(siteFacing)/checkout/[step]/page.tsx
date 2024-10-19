import db from "@/db/db";
import { checkUser } from "../../auth/_actions/isAuthenticated";
import AnonymousForm from "../_components/AnonymousForm";
import SelectContact from "../_components/SelectContact";
import SelectPayment from "../_components/SelectPayment";

export default async function CheckoutPage({
  params: { step },
}: {
  params: { step: string };
}) {
  const user = await checkUser();
  const districts = !user
    ? await db.district.findMany({ select: { id: true, name: true } })
    : null;

  const deliveryTimes =
    (await db.deliveryTime.findFirst()) ||
    (await db.deliveryTime.create({ data: {} }));

  return (
    <>
      {step === "contact" ? (
        !user ? (
          <AnonymousForm districts={districts} />
        ) : (
          <SelectContact profileId={user.profile?.id as string} />
        )
      ) : step === "payment-method" ? (
        <SelectPayment deliveryTimes={deliveryTimes} />
      ) : (
        step
      )}
      <div className="h-20" />
    </>
  );
}
