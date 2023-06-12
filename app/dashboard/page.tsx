"use client";

import formatPrice from "@/util/FormatPrice";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { OrderType } from "@/types/OrderType";

export default function Dashboard() {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    const res = await fetch("/api/get-orders");
    return await res.json();
  };

  useEffect(() => {
    fetchOrders()
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  console.log(orders);

  if (loading)
    return (
      <div className="h-full flex justify-center content-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );

  if (error) return <p>Error: {error}</p>;

  return (
    <motion.div layout className="pb-12">
      <h1>Your Orders</h1>
      <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {orders.map((order) => (
          <div
            key={order.id}
            className="rounded-lg p-8 my-4 space-y-2 bg-base-200 hover:scale-105 hover:shadow-xl
            transition duration-300 ease-in-out"
          >
            <h2 className="text-xs font-medium">Order reference: {order.id}</h2>
            <p className="text-xs">
              Status:
              <span
                className={`${
                  order.status === "complete" ? "bg-teal-500" : "bg-orange-500"
                } text-white py-1 rounded-md px-2 mx-2 text-xs`}
              >
                {order.status}
              </span>
            </p>

            <p className="text-xs">
              Order Date: {new Date(order.createdAt).toDateString()}
            </p>
            <div className="text-sm md:flex items-center gap-4">
              {order.products.map((product) => (
                <div className="py-2" key={product.id}>
                  <h2 className="py-2">{product.name}</h2>
                  <div className="flex items-baseline gap-4">
                    <Image
                      src={product.image!}
                      width={36}
                      height={36}
                      alt={product.name}
                      priority={true}
                      className="w-auto rounded-md"
                    />
                    <p>
                      {product.unit_amount
                        ? formatPrice(product.unit_amount)
                        : "$0.00"}
                    </p>
                    <p>Quantity: {product.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="font-medium py-2">
              Total: {formatPrice(order.amount)}
            </p>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
