import { createSlice } from "@reduxjs/toolkit";

const videoSlice = createSlice({
  name: "video",
  initialState: {
    videos: [],
    videoBackup: [],
  },
  reducers: {
    getVideo: (state, action) => {
      state.videos = action.payload;
      state.videoBackup = action.payload;
    },
    filterVideos: (state, action) => {
      const searchString = action.payload;
      const filteredVideos = state?.videoBackup?.filter((video) => {
        if (
          video?.title?.toLowerCase()?.includes(searchString?.toLowerCase())
        ) {
          return video;
        }
      });
      state.videos = filteredVideos;
    },
  },
});

export const { getVideo, filterVideos } = videoSlice.actions;
export default videoSlice.reducer;
