import React from "react";

function Category() {
  const categories = [
    "All",
    "Music",
    "Gaming",
    "Live",
    "Tech",
    "Cooking",
    "Art",
  ];
  return (
    <div className="m-5 flex items-center sm:flex-wrap gap-4 sm:m-0 overflow-x-auto scrollbar-hide px-4 py-2 bg-white ">
      {categories.map((category) => (
        <button
          key={category}
          className="whitespace-nowrap rounded-full bg-gray-100 px-4 py-2 text-sm font-medium hover:bg-gray-200 transition-colors"
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default Category;
