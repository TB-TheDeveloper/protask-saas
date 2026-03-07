import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
        price: Number,
        quantity: Number,
      },
    ],
    stripeSessionId: String,
    status: {
      type: String,
      enum: ["pending", "paid", "cancelled", "expired", "failed"],
      default: "pending",
    },
  },
  { timestamps: true },
);

OrderSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });
export default mongoose.model("Order", OrderSchema);
