import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const { data } = await axios.get("/products/all");
    return data;
  }
);

const initialState = {
  products: {
    items: [],
    isLoading: true,
  },
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchProducts.pending]: (state) => {
      state.products.isLoading = true;
      state.products.items = [];
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.products.isLoading = false;
      state.products.items = action.payload;
    },
    [fetchProducts.rejected]: (state) => {
      state.products.isLoading = true;
      state.products.items = [];
    },
  },
});

export const ProductsSlice = productsSlice.reducer;
