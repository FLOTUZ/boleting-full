import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
  apiVersion: "2023-10-16",
});

type Payload = {
  amount: number;
};

export default async function CreatePaymentIntent(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  console.log(req.body);
  const { data } = await req.body;
  const { amount } = data;
  console.log({ message: "Payment intent created" });
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(amount) * 100,
      currency: "MXN",
    });

    res.status(200).json(paymentIntent.client_secret);
  } catch (error: any) {
    res.status(400).json(error);
  }
}
