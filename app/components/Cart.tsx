"use client";

import Image from "next/image";
import { useCartStore } from "@/store";
import formatPrice from "@/util/FormatPrice";
import { IoAddCircle, IoRemoveCircle } from "react-icons/io5";
import ShoppingBasket from "@/public/shopping-basket.png";
import { AnimatePresence, motion } from "framer-motion";
import Checkout from "@/app/components/Checkout";
import OrderConfirmed from "@/app/components/OrderConfirmed";
import { useState } from "react";

export default function Cart() {
  const cartStore = useCartStore();

  // Calculate total price of all items in cart
  const totalPrice = cartStore.cart.reduce((acc, item) => {
    return acc + item.unit_amount! * item.quantity!;
  }, 0);

  const [processing, setProcessing] = useState(false);
  const handleCheckout = async () => {
    setProcessing(true);
    setTimeout(() => {
      cartStore.setCheckout("checkout");
      setProcessing(false);
    }, 800);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => cartStore.toggleCart()}
      className="fixed w-full h-screen left-0 top-0 bg-black/25"
    >
      <motion.div
        layout
        onClick={(e) => e.stopPropagation()}
        className="bg-base-100 absolute right-0 top-0 h-screen p-12 overflow-y-scroll w-full
        md:w-6/12 lg:w-5/12 xl:w-4/12 2xl:w-2/12"
      >
        {/* Render different button depending on onCheckout state */}
        {cartStore.onCheckout === "cart" ? (
          <button
            onClick={() => cartStore.toggleCart()}
            className="text-sm font-bold pb-12"
          >
            Back to store 🏪
          </button>
        ) : (
          <button
            onClick={() => cartStore.setCheckout("cart")}
            className="text-sm font-bold pb-12"
          >
            Back to cart 🛒
          </button>
        )}

        {/* CART ITEMS */}
        {/* Displays when onCheckout is in cart, otherwise doesn't render */}
        {cartStore.onCheckout === "cart" && (
          <>
            {cartStore.cart.map((item) => (
              <motion.div layout key={item.id} className="flex py-4 gap-4">
                <Image
                  className="rounded-md h-3/5 object-cover"
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

                  <p className="text-sm text-primary">
                    {item.unit_amount ? formatPrice(item.unit_amount) : "Free!"}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* CHECKOUT AND TOTAL */}
            {cartStore.cart.length > 0 ? (
              //   If the cart is not empty
              <motion.div layout>
                <p>Total: {totalPrice ? formatPrice(totalPrice) : "$0.00"}</p>
                <button
                  onClick={handleCheckout}
                  disabled={processing}
                  className="py-2 mt-4 w-full btn btn-primary"
                >
                  {processing ? "Processing..." : "Checkout"}
                </button>
              </motion.div>
            ) : (
              //   If the cart is empty
              <AnimatePresence>
                <motion.div
                  animate={{ scale: 1, rotateZ: 0, opacity: 0.75 }}
                  initial={{ scale: 0.5, rotateZ: -10, opacity: 0 }}
                  exit={{ scale: 1, rotateZ: 0, opacity: 0.75 }}
                  className="flex flex-col items-center gap-12 text-2xl font-medium pt-36 opacity-75"
                >
                  <h1>Nothing to see here...</h1>
                  <Image
                    src={ShoppingBasket}
                    alt="empty cart"
                    width={200}
                    height={200}
                  />
                </motion.div>
              </AnimatePresence>
            )}
          </>
        )}

        {/* CHECKOUT FORM */}
        {/* Renders only when onCheckout is set to 'checkout' */}
        {cartStore.onCheckout === "checkout" && <Checkout />}

        {/* SUCCESS PAGE */}
        {/* Renders only when onCheckout is set to 'success' */}
        {cartStore.onCheckout === "success" && <OrderConfirmed />}
      </motion.div>
    </motion.div>
  );
}
