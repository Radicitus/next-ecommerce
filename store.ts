import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AddCartType } from "@/types/AddCartType";

type CartState = {
  isOpen: boolean;
  cart: AddCartType[];
  toggleCart: () => void;
  addProduct: (item: AddCartType) => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      isOpen: false,
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      addProduct: (item) =>
        set((state) => {
          // Check if item is already in cart
          const existingItem = state.cart.find(
            (cartItem) => cartItem.id === item.id
          );

          // If item is in cart, increment quantity
          if (existingItem) {
            const updatedCart = state.cart.map((cartItem) => {
              if (cartItem.id === item.id) {
                return {
                  ...cartItem,
                  quantity: (cartItem.quantity as number) + 1,
                };
              }
              return cartItem;
            });

            return { cart: updatedCart };
          }

          // If item is not in cart, add item to cart
          else {
            return { cart: [...state.cart, { ...item, quantity: 1 }] };
          }
        }),
    }),
    { name: "cart-store" }
  )
);
