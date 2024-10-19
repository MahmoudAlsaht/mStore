"use client";
import { getCart } from "@/app/(siteFacing)/_context/cart/actions/checkCart";
import { Anonymous, PromoCode } from "@prisma/client";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { deleteCart, setCartCookie } from "./actions/cartActions";

export type CartProduct = {
  id: string;
  name: string;
  weight?: number | null;
  flavor?: string | null;
  price: number;
  total: number;
  quantity: number;
  counter: number;
  limit: number;
  image: string;
};

export type Cart = {
  products: CartProduct[];
  promoCode?: PromoCode | null;
  anonymous?: Anonymous | null;
  total: number;
};

type CartContextType = {
  cart: Cart | null;
  updateCart: (cart: Cart) => void;
  checkCart: () => void;
};

const CartContext = createContext<CartContextType>({
  cart: null,
  updateCart(cart) {},
  checkCart() {},
});

export function useCart() {
  return useContext(CartContext);
}

type CartProviderProps = {
  children: ReactNode;
};

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<Cart | null>(null);

  useEffect(() => {
    const fetchCart = async () => {
      const fetchedCart = await getCart();
      setCart(fetchedCart);
    };
    fetchCart();
  }, []);

  const checkCart = async () => {
    const currCart = await getCart();
    setCart(currCart);
  };

  const updateCart = async (cart: Cart) => {
    if (cart.products.length < 1) {
      setCart(null);
      await deleteCart();
      return;
    }
    setCart(cart);
    await setCartCookie(cart);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        updateCart,
        checkCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
