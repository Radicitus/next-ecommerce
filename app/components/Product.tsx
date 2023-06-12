"use client";

import Image from "next/image";
import formatPrice from "@/util/FormatPrice";
import { ProductType } from "@/types/ProductType";
import Link from "next/link";
import { motion } from "framer-motion";

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
      >
        <Image
          src={image}
          alt={name}
          width={800}
          height={800}
          className="w-full h-96 object-cover rounded-lg"
          priority={true}
        ></Image>
        <div className="font-medium">
          <h1>{name}</h1>
          <h2 className="text-sm text-primary">
            {unit_amount ? formatPrice(unit_amount) : "Free!"}
          </h2>
        </div>
      </motion.div>
    </Link>
  );
}
