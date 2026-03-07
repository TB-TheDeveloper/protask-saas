import { Router } from "express";
import Stripe from "stripe";
import Products from "../models/products";
import Order from "../models/order";
import { getStripe } from "../utils/stripe";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { cart } = req.body;
    if (!cart || !Array.isArray(cart)) {
      return res.status(400).json({ error: "Invalid cart" });
    }

    // 🔹 Fetch all products in one query
    const ids = cart.map((item: any) => item.product._id);
    const products = await Products.find({ _id: { $in: ids } });

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    const orderItems: any[] = [];

    for (const cartItem of cart) {
      const product = products.find(
        (p) => p._id.toString() === cartItem.product._id,
      );
      if (!product) return res.status(404).json({ error: "Product not found" });

      line_items.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            images: product.imageUrls,
          },
          unit_amount: product.price,
        },
        quantity: cartItem.quantity,
      });

      orderItems.push({
        product: product._id,
        quantity: cartItem.quantity,
        price: product.price,
      });
    }

    // Pre-create order as pending
    const order = await Order.create({ items: orderItems, status: "pending" });
    const stripe = getStripe(); // call this here to prevent .env undefined error
    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      metadata: { orderId: order._id.toString() },
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel?session_id={CHECKOUT_SESSION_ID}`,
    });

    // Save Stripe session ID
    order.stripeSessionId = session.id;
    await order.save();

    res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    res.status(500).json({ error: "Stripe checkout error" });
  }
});

export default router;
