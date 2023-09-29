import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { body, validationResult } from "express-validator";
import { checkAuth } from "../middleware/auth.js";
import { isAdmin } from "./product.js";

const router = express.Router();

// Регистрация пользователя
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Неверный формат email"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Пароль должен содержать не менее 5 символов"),
    body("username")
      .isLength({ min: 4 })
      .withMessage("Имя должно содержать не менее 4 символов"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, username, password } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "Пользователь с таким e-mail уже существует" });
      }

      const hashedPassword = await bcrypt.hash(password, 7);

      const newUser = new User({ username, email, password: hashedPassword });
      const token = jwt.sign({ _id: newUser._id, role: newUser.role }, "secret123", {
        expiresIn: "30d",
      });
      newUser.token = token
      await newUser.save();

      res.status(201).json({ ...newUser._doc, token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ошибка регистрации пользователя" });
    }
  }
);

// Вход пользователя
router.post(
  "/login",
  [body("email").isEmail(), body("password").isLength({ min: 5 })],
  async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Неверный e-mail или пароль" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Неверный e-mail или пароль" });
      }

      const token = jwt.sign({ _id: user._id, role: user.role }, "secret123", {
        expiresIn: "30d",
      });
      res.status(200).json({ ...user._doc, token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ошибка входа пользователя" });
    }
  }
);

// Маршрут для установки роли "admin" для пользователя
router.post("/make-admin", checkAuth, isAdmin, async (req, res) => {
  try {
    const { userId } = req.body;
    const userToUpdate = await User.findById(userId);

    if (!userToUpdate) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    userToUpdate.role = "admin";
    await userToUpdate.save();

    res.json({ message: "Роль пользователя успешно изменена на admin" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка изменения роли пользователя" });
  }
});
router.get("/me", checkAuth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "Пользователь не найден",
      });
    }
    res.status(200).json({ ...user._doc });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: "Нет доступа",
    });
  }
});

export default router;
