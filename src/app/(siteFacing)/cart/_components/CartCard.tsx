"use client";
import { formatCurrency } from "@/lib/formatters";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartProduct } from "@/app/(siteFacing)/_context/cart/CartContext";
import { useProductCart } from "@/app/(siteFacing)/_context/ProductCartContext";

export default function CartCard({ product }: { product: CartProduct }) {
  const { addToProductCounter, takeFromProductCounter, deleteCartProduct } =
    useProductCart();
  const handleAddToCounter = () => {
    if (product.limit < 1) return;
    addToProductCounter(product.id);
  };

  const handleTakeFromCounter = () => {
    takeFromProductCounter(product.id);
  };

  const removeProductFromCart = () => {
    deleteCartProduct(product.id);
  };

  return (
    <>
      <div
        className={`border-b-1 hidden w-full cursor-pointer rounded-xl border-x-2 border-slate-300 bg-inherit shadow-md shadow-slate-200 duration-500 sm:block sm:hover:scale-105 sm:hover:shadow-xl ${product.limit < 1 || ((product?.counter as number) > product.limit && "text-muted")}`}
      >
        <div className="relative h-40 w-full">
          <Image
            fill
            priority
            className="rounded-t-xl object-cover hover:shadow-xl"
            src={
              (product?.image.replace("/upload", "/upload/w_200") as string) ||
              ""
            }
            alt={`${product?.name}'s image`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div
            className={`absolute -bottom-6 w-full bg-slate-200/85 py-2 shadow-md ${product.limit < 1 && "bg-gray-400"}`}
          >
            {
              <div className="flex w-full items-center justify-around">
                <Button
                  disabled={product.limit < 1}
                  size="sm"
                  variant="secondary"
                  onClick={handleAddToCounter}
                >
                  <Plus className="size-6 text-rayanPrimary-dark" />
                </Button>
                <span className="text-rayanPrimary-dark">
                  {product?.counter}
                </span>
                <Button
                  disabled={product.limit < 1}
                  size="sm"
                  variant="secondary"
                  onClick={handleTakeFromCounter}
                >
                  {product.counter > 1 ? (
                    <Minus className="text-rayanPrimary-dark" />
                  ) : (
                    <Trash2 className="size-7 text-destructive" />
                  )}
                </Button>
              </div>
            }
          </div>
        </div>

        <div className="mt-2 w-full py-3 sm:px-4">
          <p className="mt-4 block truncate text-center text-xs font-bold capitalize text-rayanPrimary-dark">
            {product.flavor ? (
              <>
                {product.name} <span>({product.flavor})</span>
              </>
            ) : product.weight ? (
              <>
                (
                <span>
                  {product.weight === 0.25
                    ? "ربع كيلو"
                    : product.weight === 0.5
                      ? "نصف كيلو"
                      : product.weight === 0.75
                        ? "كيلو الا ربع"
                        : product.weight === 1
                          ? "كيلو"
                          : `${product.weight} كيلو`}
                </span>
                ) {product.name}
              </>
            ) : (
              product?.name
            )}
          </p>
          <div className="mb-6 mt-4 gap-6">
            <p className="sm:text-md my-3 cursor-auto text-sm font-semibold text-rayanSecondary-dark">
              السعر: {formatCurrency(product?.price as number)}
            </p>
            <p className="sm:text-md my-3 cursor-auto text-sm font-semibold text-rayanSecondary-dark">
              الإجمالي: {formatCurrency(product?.total as number)}
            </p>
          </div>

          <div className="sm:scale-95 sm:duration-500 sm:hover:scale-105">
            <Button
              size="sm"
              variant="destructive"
              onClick={removeProductFromCart}
              className="w-full"
            >
              <Trash2 />
            </Button>
          </div>
        </div>
      </div>

      <div
        className={`flex items-center gap-4 p-2 sm:hidden ${product.limit < 1 || ((product?.counter as number) > product.limit && "text-muted")}`}
      >
        <div className="relative h-40 w-40">
          <Image
            fill
            priority
            className="rounded-xl object-cover hover:shadow-xl"
            src={
              (product?.image.replace("/upload", "/upload/w_200") as string) ||
              ""
            }
            alt={`${product?.name}'s image`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div
            className={`absolute bottom-0 mt-4 flex h-11 w-full items-center justify-around rounded-xl bg-slate-100 ${product.limit < 1 ? "bg-gray-400" : "bg-white"}`}
          >
            <Button
              size="icon"
              disabled={product.limit < 1}
              variant="secondary"
              onClick={handleAddToCounter}
              className="h-6 w-8 rounded-md bg-white"
            >
              <Plus className="text-rayanPrimary-dark" />
            </Button>
            <span className="text-rayanPrimary-dark">{product?.counter}</span>
            <Button
              size="icon"
              disabled={product.limit < 1}
              variant="secondary"
              onClick={handleTakeFromCounter}
              className="h-6 w-8 rounded-md bg-white"
            >
              {product.counter > 1 ? (
                <Minus className="text-rayanPrimary-dark" />
              ) : (
                <Trash2 className="size-7 text-destructive" />
              )}
            </Button>
          </div>
        </div>
        <div>
          <p className="mt-2 block truncate text-xs font-bold capitalize text-rayanPrimary-dark sm:text-start">
            {product.flavor ? (
              <>
                {product.name} <span>({product.flavor})</span>
              </>
            ) : product.weight ? (
              <>
                (
                <span>
                  {product.weight === 0.25
                    ? "ربع كيلو"
                    : product.weight === 0.5
                      ? "نصف كيلو"
                      : product.weight === 0.75
                        ? "كيلو الا ربع"
                        : `${product.weight} كيلو`}
                </span>
                ) {product.name}
              </>
            ) : (
              product?.name
            )}
          </p>
          <div className="mb-6 mt-4 gap-6">
            <p className="sm:text-md my-3 cursor-auto text-sm font-semibold text-rayanSecondary-dark">
              السعر: {formatCurrency(product?.price as number)}
            </p>
            <p className="sm:text-md my-3 cursor-auto text-sm font-semibold text-rayanSecondary-dark">
              الإجمالي: {formatCurrency(product?.total as number)}
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center sm:hidden">
        <Button
          size="sm"
          variant="destructive"
          onClick={removeProductFromCart}
          className="w-4/5"
        >
          <Trash2 />
        </Button>
      </div>
      <hr className="mb-5 mt-0 h-1 bg-slate-300 sm:hidden" />
    </>
  );
}

export function CartCardSkeleton() {
  return (
    <div className="rounded-xl border-x-2 border-b-2 border-slate-300 shadow-md shadow-slate-200">
      <div className="h-80 rounded-xl bg-gray-400 object-cover" />
    </div>
  );
}
