"use client";
import { PromoCode } from "@prisma/client";
import { FormEvent, useState, useTransition } from "react";
import { checkPromoAndAddToCart } from "../../_actions/checkPromo";
import SubmitButton from "@/components/SubmitButton";
import { formatCurrency } from "@/lib/formatters";
import { Cart } from "@/app/(siteFacing)/_context/cart/CartContext";

export default function CheckPromoForm({ cart }: { cart: Cart | null }) {
  const [_, startChecking] = useTransition();
  const [promo, setPromo] = useState<PromoCode | null>(null);
  const [code, setCode] = useState("");
  const [isPromoExist, setIsPromoExist] = useState(true);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    startChecking(async () => {
      const fetchedPromo = await checkPromoAndAddToCart(code);
      setPromo(fetchedPromo);
      setIsPromoExist(fetchedPromo != null);
    });
  };

  return (
    <>
      <form className="w-full sm:flex sm:w-1/3" onSubmit={handleSubmit}>
        <div className="relative mb-2 sm:basis-11/12">
          <input
            type="text"
            id="code"
            className={`w-full rounded-lg border border-gray-600 bg-slate-100 px-2 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-0 sm:w-11/12 ${promo && `${promo?.active ? "border-rayanPrimary-dark text-rayanPrimary-dark focus:border-rayanPrimary-dark" : !promo?.active && "border-destructive text-destructive focus:border-destructive"}`}`}
            placeholder="كوبون الخصم"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
        <SubmitButton
          disabled={code === ""}
          size="sm"
          body="تطبيق"
          className="sm:basis-1/6"
        />
      </form>
      {(promo || !isPromoExist) && (
        <div
          className={
            (promo?.active && !promo.isTerms) ||
            (promo?.active &&
              promo?.isTerms &&
              cart?.total &&
              cart?.total >= (promo?.minPrice || 0))
              ? "border-rayanPrimary-dark text-rayanPrimary-dark focus:border-rayanPrimary-dark"
              : !promo?.active ||
                  !isPromoExist ||
                  (promo.isTerms &&
                    cart?.total &&
                    cart?.total < (promo?.minPrice || 0))
                ? "border-destructive text-destructive focus:border-destructive"
                : ""
          }
        >
          {(promo?.active && !promo.isTerms) ||
          (promo?.active &&
            promo.isTerms &&
            cart?.total &&
            cart?.total >= (promo?.minPrice || 0))
            ? `لقد حصلت على ${promo.promoType === "shippingFees" ? " توصيل مجاني" : `على خصم بقيمة (${promo.discount}%) على مشترياتك `}`
            : !promo?.active && isPromoExist
              ? "هذا الكوبون غير فعال"
              : isPromoExist &&
                  promo?.isTerms &&
                  cart?.total &&
                  cart?.total < (promo?.minPrice || 0)
                ? `يجب أن يكون إجمالي السلة (${formatCurrency(promo?.minPrice as number)}) لتحصل على الخصم. اضف مشتريات بقيمة (${formatCurrency((promo.minPrice as number) - cart?.total)})`
                : !isPromoExist && "لم يتم العثور على كوبون الخصم"}
        </div>
      )}
    </>
  );
}
