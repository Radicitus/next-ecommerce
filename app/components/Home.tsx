"use client";

import { useEffect } from "react";

export default function Home() {
  const fetchProducts = async () => {
    const res = await fetch("/api/get-products");
    return await res.json();
  };

  useEffect(() => {
    fetchProducts().then((data) => {
      console.log(data);
    });
  });

  return (
    <div className="flex flex-wrap gap-8 lg:gap-16 pb-12 justify-center">
      {/*{products.map((product) => (*/}
      {/*  <Product {...product} key={product.id} />*/}
      {/*))}*/}
    </div>
  );
}
