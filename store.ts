import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AddCartType } from "@/types/AddCartType";

type CartState = {
  isOpen: boolean;
  cart: AddCartType[];
  toggleCart: () => void;
  clearCart: () => void;
  addProduct: (item: AddCartType) => void;
  removeProduct: (item: AddCartType) => void;
  paymentIntent: string;
  setPaymentIntent: (paymentIntent: string) => void;
  onCheckout: string;
  setCheckout: (cartState: string) => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      isOpen: false,
      paymentIntent: "",
      onCheckout: "cart",
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      clearCart: () => set((state) => ({ cart: [] })),
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
                  quantity: cartItem.quantity! + 1,
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
      removeProduct: (item) =>
        set((state) => {
          // Check if item is already in cart
          const existingItem = state.cart.find(
            (cartItem) => cartItem.id === item.id
          );

          // If item is in cart, decrement quantity
          if (existingItem && existingItem.quantity! > 1) {
            const updatedCart = state.cart.map((cartItem) => {
              if (cartItem.id === item.id) {
                return {
                  ...cartItem,
                  quantity: cartItem.quantity! - 1,
                };
              }
              return cartItem;
            });

            return { cart: updatedCart };
          }

          // Remove item from cart
          else {
            const filteredCart = state.cart.filter(
              (cartItem) => cartItem.id !== item.id
            );

            return { cart: filteredCart };
          }
        }),
      setPaymentIntent: (paymentIntent) =>
        set((state) => ({ paymentIntent: paymentIntent })),
      setCheckout: (cartState) => set((state) => ({ onCheckout: cartState })),
    }),
    { name: "cart-store" }
  )
);
