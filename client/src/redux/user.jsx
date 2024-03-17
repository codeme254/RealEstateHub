import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: { value: null },
  reducers: {
    loginSuccess: (state, action) => {
      state.value = action.payload;
    },
    logout: (state, _) => {
      state.value = null;
    },
    updateUser: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { loginSuccess, logout, updateUser } = userSlice.actions;
export default userSlice.reducer;
