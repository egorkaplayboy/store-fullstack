import React from "react";
import s from "./Items.module.css";
import { Link } from "react-router-dom";

const Item = () => {
  return (
    <div className={s.card}>
      <img
        className={s.img}
        src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
        alt="item"
      />
      <Link className="link" to={`/products/`}>
        <h3 className={s.title}>
          Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops
        </h3>
      </Link>
      <p className={s.price}>Цена: 225 ₽</p>
    </div>
  );
};

export default Item;
