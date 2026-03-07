import express from "express";
import Order from "../models/order";
import Products from "../models/products";
import { getStripe } from "../utils/stripe";

const router = express.Router();

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"] as string;
    const stripe = getStripe();
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET as string,
      );
    } catch (err) {
      console.error("Webhook signature failed:", err);
      return res.sendStatus(400);
    }

    if (event.type === "checkout.session.completed") {
      const session: any = event.data.object;
      const orderId = session.metadata.orderId;

      const order = await Order.findById(orderId);
      if (!order) return res.sendStatus(404);

      // Update stock safely with bulkWrite + conditional $inc
      const bulkOps = order.items.map((item) => ({
        updateOne: {
          filter: { _id: item.product, stock: { $gte: item.quantity } },
          update: { $inc: { stock: -(item.quantity ?? 0) } },
        },
      }));

      const result = await Products.bulkWrite(bulkOps);

      if (result.matchedCount !== order.items.length) {
        // Not enough stock for some items
        order.status = "failed";
        await order.save();
        console.warn(`Order ${order._id} failed: insufficient stock.`);
        return res.sendStatus(400); // optional: notify admin
      }

      // Mark order as paid
      order.status = "paid";
      await order.save();
    }

    res.json({ received: true });
  },
);

export default router;
