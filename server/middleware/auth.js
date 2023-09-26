import jwt from "jsonwebtoken";

export const checkAuth = (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Отсутствует токен аутентификации" });
  }

  try {
    const decoded = jwt.verify(token, "secret123");
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Недействительный токен аутентификации" });
  }
};
