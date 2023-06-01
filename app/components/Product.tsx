import Image from "next/image";
import formatPrice from "@/util/FormatPrice";
import { ProductType } from "@/types/ProductType";

export default function Product({ name, image, price }: ProductType) {
  return (
    <div>
      <Image src={image} alt={name} width={400} height={400}></Image>
      <h1>{name}</h1>
      {price ? formatPrice(price) : "Free!"}
    </div>
  );
}
