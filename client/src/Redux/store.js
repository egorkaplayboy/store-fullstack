import { configureStore } from '@reduxjs/toolkit'
import { AuthSlice } from './Slices/AuthSlice'
import { ProductsSlice } from './Slices/ProductsSlice'
import { CartSlice } from './Slices/CartSlice'

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    products: ProductsSlice,
    cart: CartSlice
  }
})