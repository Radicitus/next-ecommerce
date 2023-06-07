import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

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

  // Required order data
  return res.status(200).json({ userSession: userSession });
}
