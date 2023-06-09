import Image from "next/image";
import formatPrice from "@/util/FormatPrice";
import { ProductType } from "@/types/ProductType";
import Link from "next/link";

export default function Product({
  name,
  image,
  unit_amount,
  id,
  description,
  metadata,
}: ProductType) {
  const { features } = metadata;

  return (
    <Link
      href={{
        pathname: `/product/${id}`,
        query: { name, image, unit_amount, id, description, features },
      }}
    >
      <div>
        <Image
          src={image}
          alt={name}
          width={800}
          height={800}
          className="w-full h-96 object-cover rounded-lg"
        ></Image>
        <div className="font-medium">
          <h1>{name}</h1>
          <h2 className="text-sm text-primary">
            {unit_amount ? formatPrice(unit_amount) : "Free!"}
          </h2>
        </div>
      </div>
    </Link>
  );
}
