import express from "express";
import mongoose from "mongoose";
import productRoutes from "./routes/product.js";
import userRoutes from "./routes/user.js";
import cors from "cors";

const app = express();

mongoose
  .connect(
    "mongodb+srv://admin:wwwwww@store.xahvcvu.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB OK"))
  .catch((err) => console.log(`DB ERR ${err}`));

app.use(express.json());
app.use(cors());

app.use("/products", productRoutes);
app.use("/auth", userRoutes);

app.listen(3333, (err) => {
  if (err) {
    console.log("SERVER ERR " + err);
  }
  console.log("SERVER OK");
});
