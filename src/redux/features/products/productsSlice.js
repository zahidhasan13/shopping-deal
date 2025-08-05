import { createProduct, deleteProduct, fetchProducts } from "@/redux/services/productsApi";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    return await fetchProducts();
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (product) => {
    return await createProduct(product);
  }
);

export const removeProduct = createAsyncThunk(
  "products/removeProduct",
  async (id) => {
    await deleteProduct(id);
    return id;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p?._id !== action.payload);
      });
  },
});

export default productsSlice.reducer;