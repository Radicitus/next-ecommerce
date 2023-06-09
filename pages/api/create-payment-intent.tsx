import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { AddCartType } from "@/types/AddCartType";
import { PrismaClient } from "@prisma/client";
import { ProductType } from "@/types/ProductType";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

const prisma = new PrismaClient();

const calculateOrderAmount = (items: AddCartType[]) => {
  return items.reduce((acc, item) => {
    return acc + item.unit_amount! * item.quantity!;
  }, 0);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get user
  const userSession = await getServerSession(req, res, authOptions);
  if (!userSession?.user) {
    return res.status(403).json({ message: "User not logged in" });
  }

  // Extract data from body
  const { items, payment_intent_id } = req.body;

  // Create the order data
  const orderData = {
    user: {
      connect: {
        // @ts-ignore
        // Errors due to manual overloading of userSession type
        id: userSession.user.id,
      },
    },
    amount: calculateOrderAmount(items),
    currency: "usd",
    status: "pending",
    paymentIntentId: payment_intent_id,
    products: {
      create: items.map((item: ProductType) => ({
        name: item.name,
        description: item.description || null,
        unit_amount: parseFloat(String(item.unit_amount)),
        image: item.image,
        quantity: item.quantity,
      })),
    },
  };

  // Check if payment intent exists, update order
  if (payment_intent_id) {
    const currentIntent = await stripe.paymentIntents.retrieve(
      payment_intent_id
    );

    // If intent exists, update the amount
    if (currentIntent) {
      const updatedIntent = await stripe.paymentIntents.update(
        payment_intent_id,
        { amount: calculateOrderAmount(items) }
      );

      // Fetch order with product ids
      const existingOrder = await prisma.order.findFirst({
        where: { paymentIntentId: updatedIntent.id },
        include: { products: true },
      });

      // Check if order exists for payment intent id
      if (!existingOrder) {
        return res.status(400).json({ message: "Invalid Payment Intent" });
      }

      // Update existing order
      const updatedOrder = await prisma.order.update({
        where: { id: existingOrder.id },
        data: {
          amount: calculateOrderAmount(items),
          products: {
            deleteMany: {},
            create: items.map((item: ProductType) => ({
              name: item.name,
              description: item.description,
              unit_amount: parseFloat(String(item.unit_amount)),
              image: item.image,
              quantity: item.quantity,
            })),
          },
        },
      });

      return res.status(200).json({
        message: "Updated existing order",
        paymentIntent: updatedIntent,
      });
    }
  }

  // Create a new order with prisma
  else {
    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    // Add payment intent id to order data
    orderData.paymentIntentId = paymentIntent.id;

    // Create the order
    const newOrder = await prisma.order.create({
      data: orderData,
    });

    return res.status(200).json({
      message: "Created new order",
      paymentIntent: paymentIntent,
    });
  }
}
