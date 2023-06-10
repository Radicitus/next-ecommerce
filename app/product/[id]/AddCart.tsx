"use client";

import { useCartStore } from "@/store";
import { AddCartType } from "@/types/AddCartType";
import { useState } from "react";

export default function AddCart({ name, image, id, unit_amount }: AddCartType) {
  const cartStore = useCartStore();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    cartStore.addProduct({ name, image, id, unit_amount });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 800);
  };

  return (
    <>
      <button
        onClick={handleAddToCart}
        disabled={added}
        className="my-4 w-full btn btn-primary"
      >
        {!added ? "Add to Cart" : "Added!"}
      </button>
    </>
  );
}
