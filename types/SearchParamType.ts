import { ProductType } from "@/types/ProductType";

type Params = {
  id: string;
};

export type SearchParamType = {
  params: Params;
  searchParams: ProductType;
};
