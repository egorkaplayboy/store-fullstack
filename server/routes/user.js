import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { body, validationResult } from "express-validator";

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
      await newUser.save();

      res.status(201).json({ message: "Пользователь успешно зарегистрирован" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ошибка регистрации пользователя" });
    }
  }
);

// Вход пользователя
router.post("/login", async (req, res) => {
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

    const token = jwt.sign({ userId: user._id }, "secret-key");
    res.status(200).json({ ...user._doc, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка входа пользователя" });
  }
});

export default router;
