"use client";
import { formatCurrency } from "@/lib/formatters";
import Image from "next/image";
import { ProductCardProps } from "../[productType]/[id]/page";
import HandleCartActions from "./HandleCartActions";
import { useProductCart } from "@/app/(siteFacing)/_context/ProductCartContext";

export default function ProductCardDetails({
  product,
}: {
  product: ProductCardProps;
}) {
  const { productCart } = useProductCart();

  return (
    <>
      {product.quantity < 6 && product.quantity > 0 ? (
        <div className="mt-4 text-center text-3xl text-rayanWarning-dark">
          <h3>اقتربت الكمية من النفاد</h3>
        </div>
      ) : (
        product.quantity < 1 && (
          <div className="mt-4 text-center text-3xl text-rayanWarning-dark">
            <h3>هذا المنتج غير متوفر في الوقت الحالي</h3>
          </div>
        )
      )}
      <div
        dir="rtl"
        className={`mt-4 w-full bg-inherit sm:flex ${(product.quantity < 1 || (productCart && (productCart?.limit || 0) < 1)) && "opacity-20"}`}
      >
        <div className="relative mx-auto h-72 w-9/12 sm:mx-24 sm:h-80 sm:w-1/5">
          <div className="relative h-full w-full p-10">
            <Image
              fill
              priority
              className="rounded-3xl rounded-t-xl object-cover shadow-xl"
              src={
                product?.image?.path.replace(
                  "/upload",
                  "/upload/w_600",
                ) as string
              }
              alt={`${product?.name || "product"}'s image`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div
            className={`absolute bottom-0 w-full rounded-lg rounded-b-3xl bg-slate-200/80 py-3 shadow-md transition-all sm:left-0 ${(product.quantity < 1 || (productCart && (productCart?.limit || 0) < 1)) && "bg-slate-400 text-transparent"}`}
          >
            <HandleCartActions product={product} />
          </div>
          {product?.isOffer && (
            <div className="absolute right-0 top-0 rounded-2xl bg-destructive px-4 py-0 text-white">
              خصم
            </div>
          )}
        </div>

        <div className="flex flex-col items-center py-0 md:mt-8 md:w-1/2 md:items-start">
          {productCart && (productCart.limit || 0) < 1 && (
            <p className="mt-6 text-xl text-rayanWarning-dark">
              لا يمكنك اضافة المزيد من هذا المنتج{" "}
            </p>
          )}
          <div className="mt-4 flex items-center justify-center gap-6">
            <div className="flex items-center justify-around sm:gap-2 md:justify-start">
              <p className="sm:text-md my-3 cursor-auto text-xl font-semibold text-rayanSecondary-dark sm:text-3xl">
                {formatCurrency(
                  product?.newPrice
                    ? product?.newPrice
                    : (product?.price as number),
                )}
              </p>
            </div>
            {product?.newPrice && (
              <del>
                <p className="cursor-auto text-xl text-gray-600 line-through sm:text-2xl">
                  {formatCurrency(product?.price as number)}
                </p>
              </del>
            )}
          </div>
          <p className="text-xl font-bold capitalize text-rayanPrimary-dark sm:text-3xl">
            {product?.body}
          </p>

          {product.description && (
            <div className="mt-6 text-xl sm:text-2xl md:text-3xl">
              <h3 className="mx-6 mb-4 mt-6 text-3xl font-bold text-rayanSecondary-light">
                الوصف:
              </h3>
              <p className="mx-auto w-10/12">{product?.description}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
