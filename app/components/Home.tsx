"use client";

import { useEffect, useState } from "react";
import { ProductType } from "@/types/ProductType";
import Product from "@/app/components/Product";
import Cart from "@/app/components/Cart";
import { AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store";

const fetchProducts = async () => {
  const res = await fetch("/api/get-products");
  return await res.json();
};

export default function Home() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const cartStore = useCartStore();

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  if (loading)
    return (
      <div className="h-full flex justify-center content-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );

  return (
    <div className="flex flex-wrap gap-8 lg:gap-16 pb-12 justify-center">
      {/* Drawer for cart */}
      <div className="drawer drawer-end">
        <input
          id="my-drawer-4"
          type="checkbox"
          className="drawer-toggle"
          checked={cartStore.isOpen}
        />
        <div className="drawer-content">
          {products.map((product) => (
            <Product {...product} key={product.id} />
          ))}
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
            <AnimatePresence>{cartStore.isOpen && <Cart />}</AnimatePresence>
          </ul>
        </div>
      </div>
    </div>
  );
}
