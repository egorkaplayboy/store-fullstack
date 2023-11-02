import React from "react";
import s from "./Items.module.css";
import { Link } from "react-router-dom";

const Item = ({ imageUrl, title, price, id }) => {
  return (
    <div className={s.card}>
      <Link className="link" to={`/products/${id}`}>
        <img className={s.img} src={imageUrl} alt={title} />

        <h3 className={s.title}>{title}</h3>
      </Link>
      <p className={s.price}>Цена: {price} $</p>
    </div>
  );
};

export default Item;
