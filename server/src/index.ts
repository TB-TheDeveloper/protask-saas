import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { checkJwt } from "./middleware/auth";
import mongoose from "mongoose";
import itemsRoutes from "./routes/items";
import webhookRoutes from "./routes/webhook";
import Order from "./models/order";
import Products from "./models/products";
import checkoutRoutes from "./routes/checkout";
import { faker } from "@faker-js/faker";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//app.use("/tasks", checkJwt, itemsRouter);

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

app.use("/items", itemsRoutes);
app.use("/checkout", checkoutRoutes);
app.use("/api", webhookRoutes);

const expireOrders = async () => {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

  const result = await Order.updateMany(
    { status: "pending", createdAt: { $lt: oneHourAgo } },
    { status: "expired" },
  );

  console.log(`Expired ${result.modifiedCount} pending orders`);
};

// Run immediately once on startup
expireOrders();
// Then run every hour
setInterval(expireOrders, 60 * 60 * 1000); // 60 min * 60 sec * 1000 ms

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
