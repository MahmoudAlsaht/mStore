import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProductOptions } from "@prisma/client";
import { ShoppingBag } from "lucide-react";

export default function ProductMenuPrice({
  options,
  disabled = false,
  handleAddToCart,
}: {
  disabled?: boolean;
  options?: ProductOptions[] | null;
  handleAddToCart: (option?: string) => void;
}) {
  const addProduct = () => handleAddToCart();

  if (!options || options.length === 0)
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
        {options?.map((option) => (
          <DropdownMenuItem
            key={option.id}
            onClick={() => handleAddToCart(option.id)}
          >
            {option.name}
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
