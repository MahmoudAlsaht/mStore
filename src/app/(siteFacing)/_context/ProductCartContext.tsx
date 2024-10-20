"use client";
import { ProductCardProps } from "@/app/(siteFacing)/products/[productType]/[id]/page";

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { CartProduct, useCart } from "./cart/CartContext";
import { ProductOptions } from "@prisma/client";

type ProductCartContextType = {
  productCart: CartProduct | null;
  addNewProduct: (
    product: ProductCardProps & { selectedOption?: string },
  ) => void;
  addToProductCounter: (id: string) => void;
  takeFromProductCounter: (id: string) => void;
  deleteCartProduct: (id: string) => void;
};

const ProductCartContext = createContext<ProductCartContextType>({
  productCart: null,
  addToProductCounter: (id: string) => {},
  addNewProduct: (
    product: ProductCardProps & { selectedOption?: string },
  ) => {},
  takeFromProductCounter: (id: string) => {},
  deleteCartProduct: (id: string) => {},
});

export function useProductCart() {
  return useContext(ProductCartContext);
}

type ProductCartProviderProps = {
  children: ReactNode;
  id: string;
};

export function ProductCartProvider({
  children,
  id,
}: ProductCartProviderProps) {
  const { cart, updateCart } = useCart();
  const [productCart, setProductCart] = useState<CartProduct | null>(null);

  useEffect(() => {
    setProductCart(
      cart?.products?.find((product) => product.id === id) || null,
    );
  }, [cart?.products, id]);

  const addNewProduct = (
    product: ProductCardProps & { selectedOption?: string },
  ) => {
    const selectedOption = product.options?.find(
      (option) => option.id === product.selectedOption,
    );
    const priceOrNewPrice = product.isOffer
      ? (product.newPrice as number)
      : (product.price as number);
    const cartProductPrice = selectedOption
      ? selectedOption.price
      : priceOrNewPrice;
    const cartProductName = product.name;

    const newProduct: CartProduct = {
      id: product.id as string,
      name: cartProductName as string,
      price: parseFloat(cartProductPrice.toFixed(2)),
      image: product.image?.path as string,
      quantity: product.quantity,
      limit: product.quantity,
      option: selectedOption,
      counter: 1,
      total: parseFloat(cartProductPrice.toFixed(2)),
    };

    const updatedCart =
      !cart || !cart.total || !cart.products
        ? {
            total: newProduct.total,
            products: [newProduct],
          }
        : {
            total: cart.total + newProduct.price,
            products: [...cart.products, newProduct],
          };
    updateCart(updatedCart);
    setProductCart(newProduct);
  };

  const addToProductCounter = (id: string) => {
    if (!cart) return;
    if (!productCart) return;

    const updatedProduct: CartProduct = {
      ...productCart,
      counter: productCart.counter + 1,
      limit: productCart.limit - 1,
      total: productCart.price * (productCart.counter + 1),
    };

    const updatedCart = {
      ...cart,
      total: cart.total + updatedProduct.price,
      products: cart.products.map((currProduct) =>
        currProduct.id === id
          ? {
              ...updatedProduct,
              counter:
                updatedProduct.counter > updatedProduct.quantity
                  ? updatedProduct.quantity
                  : updatedProduct.counter,
            }
          : currProduct,
      ),
    };

    updateCart(updatedCart);
    setProductCart(updatedProduct);
  };

  function takeFromProductCounter(id: string) {
    if (!cart) return;
    if (!productCart) return;

    const updatedProduct: CartProduct = {
      ...productCart,
      counter: productCart.counter - 1,
      limit: productCart.limit + 1,
      total: productCart.price * (productCart.counter - 1),
    };

    const updatedCart = {
      ...cart,
      total: cart.total - updatedProduct.price,
      products: cart.products.map((currProduct) =>
        currProduct.id === id ? updatedProduct : currProduct,
      ),
    };

    if (updatedProduct?.counter < 1) {
      deleteCartProduct(id);
      return;
    }

    updateCart(updatedCart);

    setProductCart(updatedProduct);
  }

  function deleteCartProduct(id: string) {
    if (!cart) return;
    if (!productCart) return;

    const updatedCart = {
      ...cart,
      total: cart.total - productCart.total,
      products: cart.products.filter((product) => product.id !== id),
    };
    updateCart(updatedCart);
  }

  return (
    <ProductCartContext.Provider
      value={{
        productCart,
        addNewProduct,
        takeFromProductCounter,
        addToProductCounter,
        deleteCartProduct,
      }}
    >
      {children}
    </ProductCartContext.Provider>
  );
}
