import React from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useState } from "react";

function VideoItem({ channel }) {
  const [showMenu, setShowMenu] = useState(false);

  const handleDelete = () => {
    console.log("Delete comment");
  };
  return (
    <div className=" hover:bg-gray-100 rounded-lg overflow-hidden hover:shadow-md mb-2">
      <img
        src="https://i.ytimg.com/vi/xQYJiKfKZ7g/maxresdefault.jpg "
        width={"370px"}
      />
      <div className="flex justify-between">
        <div className="p-3">
          <h3 className="font-semibold text-xl font-roboto">
            Learn React In 30 Minutes
          </h3>
          <h5 className="text-sm text-gray-600 ">Web Dev Simplified</h5>
          <p className="text-sm text-gray-500">1M views • 2 days ago</p>
        </div>
        <div className="relative mt-5">
          {channel && (
            <HiOutlineDotsVertical
              className="cursor-pointer"
              onClick={() => setShowMenu(!showMenu)}
            />
          )}
          {showMenu && (
            <div className="absolute right-2 top-3 bg-white border border-gray-300 rounded shadow-md z-50">
              <button
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                onClick={() => {
                  setShowMenu(false);
                  handleDelete();
                }}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VideoItem;
