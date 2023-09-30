import { createSlice } from "@reduxjs/toolkit";

const saveCartToLocalStorage = (cartItems) => {
  localStorage.setItem("cart", JSON.stringify(cartItems));
};
const savedCart = JSON.parse(localStorage.getItem("cart"));

const initialState = {
  items: savedCart || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.items.push(action.payload);
      saveCartToLocalStorage(state.items);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
      saveCartToLocalStorage(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cart");
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export const CartSlice = cartSlice.reducer;
