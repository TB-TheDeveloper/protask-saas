import Stripe from "stripe";

export const getStripe = (): Stripe => {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is missing in .env");
  return new Stripe(key);
};
