"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import dance from "@/public/dance.gif";

export default function OrderConfirmed() {
  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      <h1>Order Confirmed</h1>
      <p>Thank you for your order!</p>
      <Image className="py-8" src={dance} alt="dancing" />
    </motion.div>
  );
}
