import { createSlice } from "@reduxjs/toolkit";

const userInfo = null;
export const userSlice = createSlice({
  name: "user",
  initialState: { value: null },
  reducers: {
    loginSuccess: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { loginSuccess } = userSlice.actions;
export default userSlice.reducer;
