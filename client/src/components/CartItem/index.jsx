import React from "react";
import s from "./CartItem.module.css";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../Redux/Slices/CartSlice";

const CartItem = ({ title, price, imageUrl, _id }) => {
  const dispatch = useDispatch();

  const handleRemoveCartItem = (_id) => {
    dispatch(removeFromCart(_id));
  };
  return (
    <div className={s.cartItem}>
      <img src={imageUrl} alt={title} />
      <h2>{title}</h2>
      <p>Цена: ${price}</p>
      <Button
        onClick={() => handleRemoveCartItem(_id)}
        variant="contained"
        color="error"
        size="large"
      >
        Удалить
      </Button>
    </div>
  );
};

export default CartItem;
