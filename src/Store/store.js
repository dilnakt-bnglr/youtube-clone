import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Store/userSlice.js";
import videoReducer from "../Store/videoSlice.js";

export const store = configureStore({
  reducer: {
    user: userReducer,
    video: videoReducer,
  },
});
