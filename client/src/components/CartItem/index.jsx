import React from "react";
import s from "./CartItem.module.css";
import Button from "@mui/material/Button";

const CartItem = () => {
  return (
    <div className={s.cartItem}>
      <img
        src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
        alt="Товар 1"
      />
      <h2>Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops</h2>
      <p>Цена: $20.00</p>
      <Button variant="contained" color="error" size="large">
        Удалить
      </Button>
    </div>
  );
};

export default CartItem;
