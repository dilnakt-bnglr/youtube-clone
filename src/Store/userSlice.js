import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userName: "",
  },
  reducers: {
    updateUser: (state, action) => {
      state.userName = action.payload.data.user;
    },
    signOut: (state) => {
      state.userName = "";
    },
  },
});

export const { updateUser, signOut } = userSlice.actions;
export default userSlice.reducer;
