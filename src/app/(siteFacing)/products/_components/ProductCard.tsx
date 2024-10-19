"use client";
import { formatCurrency } from "@/lib/formatters";
import Image from "next/image";
import { LoadingLink } from "@/app/(siteFacing)/_context/LoadingContext";
import { ProductCardProps } from "../[productType]/[id]/page";
import HandleCartActions from "./HandleCartActions";
import { useProductCart } from "@/app/(siteFacing)/_context/ProductCartContext";
import { updateProductViews } from "../../_actions/product";
import { useRouter } from "next/navigation";

export default function ProductCard({
  product,
  handleClose,
}: {
  product: ProductCardProps;
  handleClose?: () => void;
}) {
  const { productCart } = useProductCart();
  const router = useRouter();

  const handleUpdateViews = async () => {
    await updateProductViews(product.id as string);
    router.push(`/products/any/${product.id}`);
    handleClose && handleClose();
  };

  return (
    <>
      <div
        dir="rtl"
        className={`min-h-[320px] cursor-pointer rounded-xl border-x-2 border-b-2 border-slate-300 bg-inherit shadow-md shadow-slate-200 duration-500 sm:hover:scale-105 sm:hover:shadow-xl ${(product.quantity < 1 || (productCart && (productCart?.limit || 0) < 1)) && "opacity-20"}`}
      >
        <div className="relative h-44">
          <LoadingLink
            href={handleUpdateViews}
            className="relative h-full w-full"
          >
            <Image
              fill
              priority
              className="rounded-t-xl object-cover shadow-xl"
              src={
                product?.image?.path.replace(
                  "/upload",
                  "/upload/w_200",
                ) as string
              }
              alt={`${product?.name || "product"}'s image`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </LoadingLink>
          <div
            className={`absolute -bottom-6 right-0 w-full rounded-lg bg-slate-100 py-2 duration-500 sm:left-0 ${(product.quantity < 1 || (productCart && (productCart?.limit || 0) < 1)) && "bg-slate-400 text-transparent"}`}
          >
            <HandleCartActions product={product} />
          </div>
          {product?.isOffer && (
            <div className="absolute right-0 top-0 rounded-2xl bg-destructive px-4 py-0 text-white">
              خصم
            </div>
          )}
        </div>

        <LoadingLink
          className="mt-3 flex w-full flex-col items-center py-3 text-center"
          href={handleUpdateViews}
        >
          <p className="mt-2 block text-center text-xs font-semibold text-rayanPrimary-dark sm:text-start sm:text-sm">
            {product?.name}
          </p>
          <div className="mt-2 flex w-full items-center justify-around">
            <div className="flex items-center justify-around sm:gap-2 md:justify-start">
              <p className="my-3 cursor-auto text-sm font-semibold text-rayanSecondary-dark sm:text-sm">
                {formatCurrency(
                  product?.newPrice
                    ? product?.newPrice
                    : (product?.price as number),
                )}
              </p>
            </div>
            {product?.newPrice && (
              <del>
                <p className="cursor-auto text-xs text-gray-600 line-through sm:text-sm">
                  {formatCurrency(product?.price as number)}
                </p>
              </del>
            )}
          </div>
        </LoadingLink>
      </div>
    </>
  );
}
