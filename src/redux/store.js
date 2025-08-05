import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./features/products/productsSlice";
import categoryReducer from "./features/category/categorySlice";
import cartReducer from "./features/cart/cartSlice"
import wishlistReducer from "./features/wishlist/wishlistSlice"


export const store = configureStore({
  reducer: {
    products: productsReducer,
    category: categoryReducer,
    cart: cartReducer,
    wishlist: wishlistReducer
  },
});
