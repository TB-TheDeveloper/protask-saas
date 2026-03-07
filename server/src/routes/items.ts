import { Router } from "express";
import Product, { IProduct } from "../models/products";

const router = Router();

// GET all products
router.get("/", async (_req, res) => {
  try {
    const products = await Product.find({ active: true });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// POST create a new product
router.post("/", async (req, res) => {
  try {
    const { name, description, price, currency, imageUrls, stock } = req.body;

    const newProduct: IProduct = new Product({
      name,
      description,
      price,
      currency: currency || "usd",
      imageUrls,
      stock,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
