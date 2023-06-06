"use client";

import Image from "next/image";
import { useCartStore } from "@/store";
import formatPrice from "@/util/FormatPrice";
import { IoAddCircle, IoRemoveCircle } from "react-icons/io5";
import ShoppingBasket from "@/public/shopping-basket.png";
import { AnimatePresence, motion } from "framer-motion";

export default function Cart() {
  const cartStore = useCartStore();

  // Calculate total price of all items in cart
  const totalPrice = cartStore.cart.reduce((acc, item) => {
    return acc + item.unit_amount! * item.quantity!;
  }, 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => cartStore.toggleCart()}
      className="fixed w-full h-screen left-0 top-0 bg-black/25"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white absolute right-0 top-0 w-1/4 h-screen p-12 overflow-y-scroll text-gray-700"
      >
        <h1>Shopping Cart</h1>
        {cartStore.cart.map((item) => (
          <motion.div layout key={item.id} className="flex py-4 gap-4">
            <Image
              className="rounded-md h-24 object-cover"
              src={item.image}
              alt={item.name}
              width={120}
              height={120}
            />
            <div>
              <h2>{item.name}</h2>
              <div className="flex gap-2">
                <h2>Quantity: {item.quantity}</h2>
                <button
                  onClick={() =>
                    cartStore.removeProduct({
                      id: item.id,
                      name: item.name,
                      unit_amount: item.unit_amount,
                      image: item.image,
                      quantity: item.quantity,
                    })
                  }
                >
                  <IoRemoveCircle />
                </button>
                <button
                  onClick={() =>
                    cartStore.addProduct({
                      id: item.id,
                      name: item.name,
                      unit_amount: item.unit_amount,
                      image: item.image,
                      quantity: item.quantity,
                    })
                  }
                >
                  <IoAddCircle />
                </button>
              </div>

              <p className="text-sm text-teal-700">
                {item.unit_amount ? formatPrice(item.unit_amount) : "Free!"}
              </p>
            </div>
          </motion.div>
        ))}

        {cartStore.cart.length > 0 ? (
          //   If the cart is not empty
          <motion.div layout>
            <p>Total: {totalPrice ? formatPrice(totalPrice) : "$0.00"}</p>
            <button className="py-2 mt-4 bg-teal-700 w-full rounded-md text-white">
              Checkout
            </button>
          </motion.div>
        ) : (
          //   If the cart is empty
          <AnimatePresence>
            <motion.div
              animate={{ scale: 1, rotateZ: 0, opacity: 0.75 }}
              initial={{ scale: 0.5, rotateZ: -10, opacity: 0 }}
              exit={{ scale: 1, rotateZ: 0, opacity: 0.75 }}
              className="flex flex-col items-center gap-12 text-2xl font-medium pt-56 opacity-75"
            >
              <h1>Uh oh...it's empty 🥲</h1>
              <Image
                src={ShoppingBasket}
                alt="empty cart"
                width={200}
                height={200}
              />
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
}
