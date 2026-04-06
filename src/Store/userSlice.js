import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userName: "",
  },
  reducers: {
    // Reducer to update the user information in the Redux store
    updateUser: (state, action) => {
      state.userName = action.payload.data.user;
    },
    // Reducer to clear the user information from the Redux store on sign out
    signOut: (state) => {
      state.userName = "";
    },
  },
});

export const { updateUser, signOut } = userSlice.actions;
export default userSlice.reducer;
