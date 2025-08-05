import { createCategory, deleteCategory, fetchCategory } from "@/redux/services/categoryApi";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getCategory = createAsyncThunk(
  "category/getCategory",
  async () => {
    return await fetchCategory();
  }
);

export const addCategory = createAsyncThunk(
  "category/addCategory",
  async (category) => {
    return await createCategory(category);
  }
);

export const removeCategory = createAsyncThunk(
  "category/removeCategory",
  async (id) => {
    await deleteCategory(id);
    return id;
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      .addCase(removeCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter((category) => category?._id !== action.payload);
      });
  },
});

export default categorySlice.reducer;