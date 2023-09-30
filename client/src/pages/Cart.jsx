import { Container, Grid } from "@mui/material";
import React from "react";
import CartItem from "../components/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../Redux/Slices/CartSlice";

const Cart = () => {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch()

  const onClickClear = () => {
    dispatch(clearCart())
  }
  return (
    <Container
      maxWidth="lg"
      className="cart"
      sx={{
        backgroundColor: "#fff",
        borderRadius: 3,
        marginTop: 7,
        padding: 3,
      }}
    >
      <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
        <h1>Корзина</h1>
        <p onClick={onClickClear} style={{color: "gray", cursor: "pointer"}}>Очистить корзину</p>
      </div>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          {items.length > 0 ? (
            items.map((item) => (
              <CartItem
                key={item._id}
                title={item.name}
                price={item.price}
                imageUrl={item.imageUrl}
                _id={item._id}
              />
            ))
          ) : (
            <div style={{display: "flex", justifyContent: "center", margin: "100px auto", fontWeight: "bold"}}>Корзина пуста</div>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;
