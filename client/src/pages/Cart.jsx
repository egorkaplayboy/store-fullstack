import { Container, Grid } from "@mui/material";
import React from "react";
import CartItem from "../components/CartItem";

const Cart = () => {
  return (
    <Container maxWidth="lg" className="cart" sx={{padding: 3}}>
      <h1>Корзина</h1>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <CartItem />
        </Grid>
        <Grid item xs={12}>
          <CartItem />
        </Grid>
        <Grid item xs={12}>
          <CartItem />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;
