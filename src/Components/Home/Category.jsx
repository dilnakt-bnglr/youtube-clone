import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByCategories } from "../../Store/videoSlice";

function Category() {
  const dispatch = useDispatch();
  const videos = useSelector((state) => state.video.videoBackup);
  const categories = [...new Set(videos.map((video) => video.category))];
  categories.unshift("All");
  return (
    <div className="m-5 flex items-center sm:flex-wrap gap-4 sm:m-0 overflow-x-auto scrollbar-hide px-4 py-2 bg-white ">
      {categories.map((category) => (
        <button
          key={category}
          className="whitespace-nowrap rounded-full bg-gray-100 px-4 py-2 text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer"
          onClick={() => dispatch(filterByCategories(category))}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default Category;
