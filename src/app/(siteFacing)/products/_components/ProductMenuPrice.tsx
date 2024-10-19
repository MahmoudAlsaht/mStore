import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ShoppingBag } from "lucide-react";

export default function ProductMenuPrice({
  weights,
  flavors,
  disabled = false,
  handleAddToCart,
}: {
  disabled?: boolean;
  weights?: number[] | null;
  flavors?: string[] | null;
  handleAddToCart: (option?: number | string) => void;
}) {
  const addProduct = () => handleAddToCart();

  if (!weights && !flavors)
    return <ShoppingBagButton onClick={!disabled ? addProduct : () => null} />;

  return (
    <DropdownMenu dir="rtl">
      <DropdownMenuTrigger className="flex w-full cursor-pointer items-center justify-center">
        <>
          <span className="basis-8/12">أضف للسلة</span>
          <ShoppingBag className="size-6" />
        </>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuSeparator />
        {weights?.map((price, index) => (
          <DropdownMenuItem key={index} onClick={() => handleAddToCart(price)}>
            {price} كيلو
          </DropdownMenuItem>
        ))}
        {flavors?.map((flavor, index) => (
          <DropdownMenuItem key={index} onClick={() => handleAddToCart(flavor)}>
            {flavor}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ShoppingBagButton({ onClick }: { onClick?: () => void }) {
  return (
    <div
      className="flex w-full cursor-pointer items-center justify-center"
      onClick={onClick}
    >
      <span className="basis-8/12">أضف للسلة</span>
      <ShoppingBag className="size-6" />
    </div>
  );
}
