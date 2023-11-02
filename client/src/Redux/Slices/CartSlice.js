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
      const { _id, name, price, imageUrl } = action.payload;
      const existingItem = state.items.find((item) => item._id === _id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ _id, name, price, imageUrl, quantity: 1 });
      }

      saveCartToLocalStorage(state.items);
    },
    removeFromCart: (state, action) => {
      const itemToRemove = state.items.find(
        (item) => item._id === action.payload
      );
      if (itemToRemove) {
        if (itemToRemove.quantity > 1) {
          itemToRemove.quantity -= 1;
        } else {
          state.items = state.items.filter(
            (item) => item._id !== action.payload
          );
        }
        saveCartToLocalStorage(state.items);
      }
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cart");
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export const CartSlice = cartSlice.reducer;
