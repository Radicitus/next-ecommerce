"use client";

import Image from "next/image";
import { useCartStore } from "@/store";
import formatPrice from "@/util/FormatPrice";
import { IoAddCircle, IoRemoveCircle } from "react-icons/io5";
import { motion } from "framer-motion";
import Checkout from "@/app/components/Checkout/Checkout";
import OrderConfirmed from "@/app/components/Checkout/OrderConfirmed";
import { useState } from "react";
import EmptyCartAnimation from "@/app/components/LottieAnimations/EmptyCartAnimation";

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
      layout
      className="bg-base-100 h-screen w-full overflow-y-scroll p-8"
    >
      {/* Render different button depending on onCheckout state */}
      {cartStore.onCheckout === "cart" ? (
        <button
          onClick={() => {
            cartStore.toggleCart();
          }}
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
            <motion.div
              layout
              key={item.id}
              className="flex p-4 my-4 gap-4 bg-base-200 rounded-lg"
            >
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
                    className="md:hover:text-secondary transition duration-300 ease-in-out"
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
                    className="md:hover:text-secondary transition duration-300 ease-in-out"
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
            <EmptyCartAnimation />
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
  );
}
