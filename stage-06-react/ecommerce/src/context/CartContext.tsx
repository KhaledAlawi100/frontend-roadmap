import { createContext } from "react";

import type { Product } from "../types/product";
import type { CartItem } from "../types/cart";

type CartContextValue = {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
};

export const CartContext = createContext<CartContextValue | undefined>(
  undefined,
);
