import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByCategories } from "../../Store/videoSlice";

function Category() {
  const dispatch = useDispatch();
  // Get the list of videos from the Redux store and extract unique categories
  const videos = useSelector((state) => state.video.videoBackup);
  // Create a list of unique categories from the videos and add "All" as the first category
  const categories = [...new Set(videos.map((video) => video.category))];
  categories.unshift("All");
  const selectedCategory = useSelector((state) => state.video.selectedCategory);
  return (
    <div className="m-5 flex items-center sm:flex-wrap gap-4 sm:m-0 overflow-x-auto scrollbar-hide px-4 py-2 bg-white ">
      {categories.map((category) => (
        <button
          key={category}
          className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
            selectedCategory === category
              ? "bg-black text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
          onClick={() => dispatch(filterByCategories(category))}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default Category;
