"use client";
import { ProductOptions } from "@prisma/client";
import { useProductCart } from "../../_context/ProductCartContext";
import { ProductCardProps } from "../[productType]/[id]/page";
import ProductMenuPrice from "./ProductMenuPrice";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";

export default function HandleCartActions({
  product,
}: {
  product: ProductCardProps;
}) {
  const {
    addNewProduct,
    addToProductCounter,
    takeFromProductCounter,
    productCart,
  } = useProductCart();

  const handleAddToCart = (selectedOption?: string) => {
    if (product?.quantity < 1) return;
    addNewProduct({ ...product, selectedOption });
  };

  const handleAddToCounter = () => {
    if ((productCart?.quantity || 0) < 1) return;
    addToProductCounter(product?.id as string);
  };

  const handleTakeFromCounter = () => {
    takeFromProductCounter(product?.id as string);
  };

  return (
    <div className={`relative`}>
      {!productCart && (
        <ProductMenuPrice
          disabled={product?.quantity < 1}
          options={product.options}
          handleAddToCart={handleAddToCart}
        />
      )}

      {productCart && (
        <div className="flex items-center justify-around">
          <Button
            variant="outline"
            className="bg-slate-100 hover:bg-slate-100"
            onClick={handleAddToCounter}
            disabled={(productCart?.limit || 0) < 1}
          >
            <Plus className="size-7 text-mStorePrimary-dark" />
          </Button>
          <span className="text-mStorePrimary-dark">
            {productCart?.counter || 0}
          </span>
          <Button
            variant="outline"
            className="bg-slate-100 hover:bg-slate-100"
            onClick={handleTakeFromCounter}
          >
            {productCart.counter > 1 ? (
              <Minus className="size-7 text-mStorePrimary-dark" />
            ) : (
              <Trash2 className="size-7 text-destructive" />
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
