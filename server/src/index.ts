import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { checkJwt } from "./middleware/auth";
import mongoose from "mongoose";
import itemsRoutes from "./routes/items";
import Product from "./models/products";

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
