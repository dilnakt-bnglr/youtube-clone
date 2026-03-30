import React from "react";
import VideoItem from "../Components/Videos/VideoItem";
import { FiPlus } from "react-icons/fi";

function Channel() {
  const a = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div className="p-4">
      <div className="mb-5">
        <img
          src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200&h=200&fit=crop"
          className="h-[200px] w-full object-cover rounded-lg"
        />
      </div>
      <div className="p-5 flex gap-5">
        <div className="w-32 h-32 rounded-full bg-indigo-500"></div>
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold mt-3">Channel Name</h2>
          <p className="text-sm text-gray-600">
            @channel4624 . <span>1M subscribers .</span>
            <span> 100 videos</span>
          </p>
          <p>Welcome to official youtube channel!</p>
          <div className=" flex gap-5 mt-2">
            <button className="border-1 rounded-lg p-1">Subscribe</button>
            <button className=" px-3 py-1 rounded-full bg-slate-200 flex items-center gap-1 cursor-pointer hover:bg-slate-300">
              <FiPlus />
              Add Video
            </button>
          </div>
        </div>
      </div>
      <div className=" gap-5 mb-5">
        <span>Videos</span>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5 p-4">
          {a.map((item) => (
            <VideoItem key={item} channel={true} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Channel;
