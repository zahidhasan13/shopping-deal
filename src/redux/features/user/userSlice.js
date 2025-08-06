
import { deleteUsers, fetchUsers } from "@/redux/services/userApi";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


// 📌 GET users
export const getUsers = createAsyncThunk("users/getUsers", async () => {
  return await fetchUsers();
});


// 📌 REMOVE from users
export const removeUsers = createAsyncThunk(
  "users/removeUsers",
  async (userId) => {
    await deleteUsers(userId);
    return userId;
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 📌 GET users
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        console.log(action.payload.users,"pay");
        state.loading = false;
        state.users = action.payload || [];
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // 📌 REMOVE FROM users
      .addCase(removeUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeUsers.fulfilled, (state, action) => {
        console.log(action.payload,"id");
        state.loading = false;
        state.users = state.users.filter(
          (user) => user._id !== action.payload
        );
      })
      .addCase(removeUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
