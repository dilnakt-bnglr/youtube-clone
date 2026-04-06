import React from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function VideoItem({
  channel,
  video,
  channelData,
  channelVideos,
  setChannelVideos,
}) {
  const [showMenu, setShowMenu] = useState(false);
  const userId = JSON.parse(localStorage.getItem("userId")) || "";
  const token = JSON.parse(localStorage.getItem("token")) || "";

  const handleDelete = () => {
    axios
      .delete(`http://localhost:5000/api/video/${video?._id}`, {
        headers: {
          Authorization: `JWT ${token}`,
        },
      })
      .then((response) => {
        const deletedVideo = response.data.deletedVideo;
        const existingVideos = [...channelVideos];
        const videosAfterDeletion = existingVideos.filter(
          (video) => video?._id !== deletedVideo?._id,
        );
        setChannelVideos(videosAfterDeletion);
      });
  };
  return (
    <div className=" hover:bg-gray-100 rounded-lg overflow-hidden hover:shadow-md mb-2">
      <Link to={`/video/${video?._id}`}>
        <img
          src={video?.thumbnailURL}
          style={{
            width: "370px",
            height: "250px",
          }}
        />
      </Link>

      <div className="flex justify-between">
        <div className="p-3">
          <Link to={`/video/${video?._id}`}>
            <h3 className="font-semibold text-xl font-roboto">
              {video?.title}
            </h3>
          </Link>

          <Link to={`/channel/${video?.channelId}`}>
            <h5 className="text-sm text-gray-600 ">{video?.channelName}</h5>
          </Link>

          <p className="text-sm text-gray-500">1M views • 2 days ago</p>
        </div>
        <div className="relative mt-5">
          {channel && channelData?.userId === userId && (
            <HiOutlineDotsVertical
              className="cursor-pointer"
              onClick={() => setShowMenu(!showMenu)}
            />
          )}
          {showMenu && (
            <div className="absolute right-3 top-[-25px] bg-white border border-gray-300 rounded shadow-md z-50">
              <button
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                onClick={() => {
                  setShowMenu(false);
                }}
              >
                Edit
              </button>
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
