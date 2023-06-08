"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import dance from "@/public/dance.gif";
import Link from "next/link";
import { useCartStore } from "@/store";
import { useEffect } from "react";

export default function OrderConfirmed() {
  const cartStore = useCartStore();

  useEffect(() => {
    cartStore.setPaymentIntent("");
    cartStore.clearCart();
  }, []);

  const checkoutOrder = () => {
    setTimeout(() => {
      cartStore.setCheckout("cart");
    }, 1000);

    cartStore.toggleCart();
  };

  return (
    <motion.div
      className="flex items-center justify-center my-12"
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      <div className="p-4 rounded-md text-center">
        <h1 className="text-xl font-medium">Order Confirmed</h1>
        <p className="text-sm my-4">Thank you for your order!</p>
        <Image className="py-8" src={dance} alt="dancing" />
        <div className="flex items-center justify-center gap-12">
          <Link href={"/dashboard"}>
            <button onClick={checkoutOrder} className="font-medium">
              View your Order
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
