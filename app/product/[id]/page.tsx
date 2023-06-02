import Image from "next/image";
import { SearchParamType } from "@/types/SearchParamType";

export default async function Product({ searchParams }: SearchParamType) {
  return (
    <div className="flex justify-between gap-24 p-12 text-gray-700">
      <Image
        src={searchParams.image}
        alt={searchParams.name}
        width={600}
        height={600}
      />
      <h1>{searchParams.name}</h1>
      <p>{searchParams.unit_amount}</p>
    </div>
  );
}
