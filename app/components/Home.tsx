"use client";

import { useEffect, useState } from "react";
import { ProductType } from "@/types/ProductType";
import Product from "@/app/components/Product";

const fetchProducts = async () => {
  const res = await fetch("/api/get-products");
  return await res.json();
};

export default function Home() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

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
      {products.map((product) => (
        <Product {...product} key={product.id} />
      ))}
    </div>
  );
}
