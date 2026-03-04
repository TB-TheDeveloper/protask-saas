import { Router } from "express";

const router = Router();

let items = [
  {
    id: 1,
    name: "T-shirt",
    price: 1999,
    description: "Comfortable cotton tee",
    stock: 10,
  },
  { id: 2, name: "Mug", price: 1299, description: "Ceramic mug", stock: 25 },
];

router.get("/", (req, res) => {
  res.json(items);
});

// router.get("/:id", (req, res) => {
//     const id = Number(req.params.id);
//     const item =
// })

export default router;
