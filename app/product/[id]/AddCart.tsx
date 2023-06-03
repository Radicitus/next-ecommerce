"use client";

import { useCartStore } from "@/store";
import { AddCartType } from "@/types/AddCartType";

export default function AddCart({
  name,
  image,
  id,
  quantity,
  unit_amount,
}: AddCartType) {
  const cartStore = useCartStore();

  return (
    <>
      <button
        onClick={() =>
          cartStore.addProduct({ name, image, id, quantity, unit_amount })
        }
        className="my-12 text-white py-2 px-6 font-medium rounded-md bg-teal-700"
      >
        Add to Cart
      </button>
    </>
  );
}
