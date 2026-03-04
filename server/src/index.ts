import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { checkJwt } from "./middleware/auth";
import mongoose from "mongoose";
import itemsRouter from "./routes/items";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/tasks", checkJwt, itemsRouter);

app.get("/", (req, res) => {
  res.send("Server is running!");
});

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
