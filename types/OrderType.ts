import { ProductType } from "@/types/ProductType";

export type OrderType = {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  status: string;
  createdAt: Date;
  paymentIntentId: string;
  products: ProductType[];
};
