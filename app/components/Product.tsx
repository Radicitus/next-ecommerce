"use client";

import Image from "next/image";
import formatPrice from "@/util/FormatPrice";
import { ProductType } from "@/types/ProductType";
import Link from "next/link";
import { motion } from "framer-motion";
import AddCart from "@/app/product/[id]/AddCart";

export default function Product({
  name,
  image,
  unit_amount,
  id,
  description,
  metadata,
}: ProductType) {
  const { features } = metadata;
  const queryId = id;

  return (
    <Link
      href={{
        pathname: `/product/${id}`,
        query: { name, image, unit_amount, queryId, description, features },
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="card w-80 h-120 bg-base-100 shadow-xl
        hover:scale-105 transition hover:duration-300 ease-in-out"
      >
        <figure>
          <Image
            src={image}
            alt={name}
            width={800}
            height={800}
            className="rounded-lg"
            priority={true}
          />
        </figure>

        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <h3 className="text-sm text-primary">
            {unit_amount ? formatPrice(unit_amount) : "Free!"}
          </h3>
          <p>{description}</p>
          <div
            onClick={(e) => {
              e.stopPropagation();
              e.nativeEvent.preventDefault();
            }}
            className="card-actions justify-end flex flex-row"
          >
            <AddCart
              name={name}
              image={image}
              id={queryId}
              unit_amount={unit_amount}
            />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
