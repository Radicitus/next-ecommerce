"use client";

import { useEffect, useState } from "react";
import { ProductType } from "@/types/ProductType";
import Product from "@/app/components/Product";
import Cart from "@/app/components/Cart";
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

  useEffect(() => {
    // Hide overflow when cart is open to prevent body scrolling
    if (cartStore.isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [cartStore.isOpen]);

  if (loading)
    return (
      <div className="h-full flex justify-center content-center absolute inset-0">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );

  return (
    <div className="drawer drawer-end">
      <input
        id="my-drawer-4"
        type="checkbox"
        className="drawer-toggle"
        checked={cartStore.isOpen}
        onChange={(e) => {}}
      />
      <div className="drawer-content flex flex-wrap gap-8 lg:gap-16 pb-12 justify-center">
        {products.map((product) => (
          <Product {...product} key={product.id} />
        ))}
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-4"
          className="drawer-overlay"
          onClick={() => cartStore.toggleCart()}
        ></label>
        <ul className="menu w-full md:w-104 h-full bg-base-100 text-base-content p-0">
          {cartStore.isOpen && <Cart />}
        </ul>
      </div>
    </div>
  );
}
