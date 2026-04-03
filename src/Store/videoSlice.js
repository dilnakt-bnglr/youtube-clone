import { createSlice } from "@reduxjs/toolkit";

const videoSlice = createSlice({
  name: "video",
  initialState: {
    videos: [],
  },
  reducers: {
    getVideo: (state, action) => {
      state.videos = action.payload;
    },
  },
});

export const { getVideo } = videoSlice.actions;
export default videoSlice.reducer;
