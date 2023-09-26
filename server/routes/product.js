import express from "express";
import Product from "../models/Product.js";
import { checkAuth } from "../middleware/auth.js";

const router = express.Router();

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  res.status(403).json({ message: "Доступ запрещен" });
};

// Получить все товары
router.get("/all", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка получения товаров" });
  }
});

// Создать новый товар
router.post("/new", checkAuth, isAdmin, async (req, res) => {
  try {
    const { name, description, price, imageUrl } = req.body;

    const product = new Product({ name, description, price, imageUrl });
    await product.save();

    res.status(201).json({ message: "Товар успешно создан" });
  } catch (error) {
    res.status(500).json({ message: "Ошибка создания товара" });
  }
});

export default router;
