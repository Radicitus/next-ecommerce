"use client";

import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useCartStore } from "@/store";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CheckoutForm from "@/app/components/CheckoutForm";
import OrderAnimation from "@/app/components/LottieAnimations/OrderAnimation";
import { motion } from "framer-motion";
import { useThemeStore } from "@/store";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUB_KEY!);

export default function Checkout() {
  const cartStore = useCartStore();
  const [clientSecret, setClientSecret] = useState("");
  const router = useRouter();
  const themeStore = useThemeStore();

  useEffect(() => {
    // Create a payment intent as soon as page loads
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: cartStore.cart,
        payment_intent_id: cartStore.paymentIntent,
      }),
    })
      .then((res) => {
        // Return user to login screen if not logged in
        if (res.status === 403) {
          return router.push("/api/auth/signin");
        }

        // Else return data
        return res.json();
      })
      .then((data) => {
        setClientSecret(data.paymentIntent.client_secret);
        cartStore.setPaymentIntent(data.paymentIntent.id);
      });
  }, []);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: themeStore.theme === "dark" ? "night" : "stripe",
      labels: "floating",
    },
  };

  return (
    <div>
      {!clientSecret && <OrderAnimation />}
      {clientSecret && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm clientSecret={clientSecret} />
          </Elements>
        </motion.div>
      )}
    </div>
  );
}
