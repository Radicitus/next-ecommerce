"use client";

import Image from "next/image";
import { SearchParamType } from "@/types/SearchParamType";
import formatPrice from "@/util/FormatPrice";
import AddCart from "@/app/product/[id]/AddCart";
import { motion } from "framer-motion";

export default async function Product({ searchParams }: SearchParamType) {
  return (
    <motion.div
      className="flex flex-col 2xl:flex-row items-center justify-center gap-16 md:gap-x-48 pb-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <Image
        src={searchParams.image}
        alt={searchParams.name}
        width={600}
        height={600}
        className="w-full rounded-lg object-cover sm:w-7/12"
        priority={true}
      />
      <div className="font-medium">
        <h1 className="text-2xl py-2">{searchParams.name}</h1>
        <p className="py-2 italic">{searchParams.description}</p>
        <p className="py-2">{searchParams.features}</p>

        <div className="flex gap-2">
          <p className="font-bold text-primary">
            {searchParams.unit_amount
              ? formatPrice(searchParams.unit_amount)
              : "Free!"}
          </p>
        </div>
        <AddCart
          name={searchParams.name}
          image={searchParams.image}
          id={searchParams.queryId!}
          unit_amount={searchParams.unit_amount}
        />
      </div>
    </motion.div>
  );
}
