import { createSlice } from "@reduxjs/toolkit";

const videoSlice = createSlice({
  name: "video",
  initialState: {
    videos: [],
    videoBackup: [],
  },
  reducers: {
    // Reducer to set the list of videos in the Redux store
    getVideo: (state, action) => {
      state.videos = action.payload;
      state.videoBackup = action.payload;
    },
    // Reducer to filter videos based on a search string and update the videos in the Redux store
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
    // Reducer to filter videos based on selected category and update the videos in the Redux store
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
