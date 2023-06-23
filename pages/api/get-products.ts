import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const products = await stripe.products.list();

  const completeProducts = await Promise.all(
    products.data.map(async (product) => {
      const prices = await stripe.prices.list({
        product: product.id,
      });
      const features = product.metadata.features || "";

      return {
        id: product.id,
        name: product.name,
        unit_amount: prices.data[0].unit_amount,
        image: product.images[0],
        currency: prices.data[0].currency,
        description: product.description,
        metadata: { features },
      };
    })
  );

  res.status(200).json(completeProducts);
}
