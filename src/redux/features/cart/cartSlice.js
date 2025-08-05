import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCart, addToCart, removeFromCart } from "@/redux/services/cartApi";

// Helper function to calculate total quantity
const calculateTotalQuantity = (items) => {
  return items.reduce((total, item) => total + (item.quantity || 0), 0);
};

// 📌 GET user cart
export const getCart = createAsyncThunk("cart/getCart", async (userId) => {
  return await fetchCart(userId);
});

// 📌 ADD product to cart
export const addCart = createAsyncThunk(
  "cart/addCart",
  async ({ userId, productId, quantity }) => {
    return await addToCart(userId, productId, quantity);
  }
);

// 📌 REMOVE product from cart
export const removeCart = createAsyncThunk(
  "cart/removeCart",
  async ({ userId, productId }) => {
    await removeFromCart(userId, productId);
    return productId;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    totalQuantity: 0,
    loading: false,
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
      state.totalQuantity = 0;
    },
    updateTotalQuantity: (state) => {
      state.totalQuantity = calculateTotalQuantity(state.cartItems);
    }
  },
  extraReducers: (builder) => {
    builder
      // 📌 GET CART
      .addCase(getCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload.items || [];
        state.totalQuantity = calculateTotalQuantity(state.cartItems);
      })
      .addCase(getCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // 📌 ADD TO CART
      .addCase(addCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCart.fulfilled, (state, action) => {
        state.cartItems = action.payload.items || [];
        state.totalQuantity = calculateTotalQuantity(state.cartItems);
        state.loading = false;
      })
      .addCase(addCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // 📌 REMOVE ITEM
      .addCase(removeCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeCart.fulfilled, (state, action) => {
        state.cartItems = state.cartItems.filter(
          (item) => item.product?._id !== action.payload
        );
        state.totalQuantity = calculateTotalQuantity(state.cartItems);
        state.loading = false;
      })
      .addCase(removeCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearCart, updateTotalQuantity } = cartSlice.actions;
export default cartSlice.reducer;