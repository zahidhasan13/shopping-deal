import { addToWishlist, fetchWishlist, removeFromWishlist } from "@/redux/services/wishlistApi";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


// 📌 GET user's wishlist
export const getWishlist = createAsyncThunk("wishlist/getWishlist", async (userId) => {
  return await fetchWishlist(userId);
});

// 📌 ADD product to wishlist
export const addWishlist = createAsyncThunk(
  "wishlist/addWishlist",
  async ({ userId, productId }) => {
    return await addToWishlist(userId, productId);
  }
);

// 📌 REMOVE product from wishlist
export const removeWishlist = createAsyncThunk(
  "wishlist/removeWishlist",
  async ({ userId, productId }) => {
    await removeFromWishlist(userId, productId);
    return productId;
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlistItems: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearWishlist: (state) => {
      state.wishlistItems = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // 📌 GET WISHLIST
      .addCase(getWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(getWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlistItems = action.payload.products || [];
      })
      .addCase(getWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // 📌 ADD TO WISHLIST
      .addCase(addWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(addWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlistItems = action.payload.products || [];
      })
      .addCase(addWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // 📌 REMOVE FROM WISHLIST
      .addCase(removeWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlistItems = state.wishlistItems.filter(
          (item) => item._id !== action.payload
        );
      })
      .addCase(removeWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
