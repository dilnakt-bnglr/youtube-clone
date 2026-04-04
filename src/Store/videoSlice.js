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
    filterByCategories: (state, action) => {
      const selectedCategory = action.payload;
      if (selectedCategory == "All") {
        state.videos = state.videoBackup;
      } else {
        const filteredVideosByCategory = state?.videoBackup?.filter(
          (video) => video.category == selectedCategory,
        );
        state.videos = filteredVideosByCategory;
      }
    },
  },
});

export const { getVideo, filterVideos, filterByCategories } =
  videoSlice.actions;
export default videoSlice.reducer;
