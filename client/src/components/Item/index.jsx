import React from "react";
import s from "./Items.module.css";
import { Link } from "react-router-dom";

const Item = ({imageUrl, title, price}) => {
  return (
    <div className={s.card}>
      <img
        className={s.img}
        src={imageUrl}
        alt={title}
      />
      <Link className="link" to={`/products/`}>
        <h3 className={s.title}>
          {title}
        </h3>
      </Link>
      <p className={s.price}>Цена: {price} ₽</p>
    </div>
  );
};

export default Item;
