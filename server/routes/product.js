import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// Получить все товары
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка получения товаров" });
  }
});

// Создать новый товар
router.post("/", async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const product = new Product({ name, description, price });
    await product.save();
    res.status(201).json({ message: "Товар успешно создан" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка создания товара" });
  }
});

export default router;
