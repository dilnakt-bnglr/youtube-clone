import React from "react";
import VideoItem from "../Components/Videos/VideoItem";
import { FiPlus } from "react-icons/fi";
import { useState } from "react";
import Modal from "../Components/Modal";
import { VscAccount } from "react-icons/vsc";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

function Channel() {
  const [showModal, setShowModal] = useState(false);
  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const [channelData, setChannelData] = useState("");
  const channelId = useParams().id;

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/channel/${channelId}`)
      .then((response) => {
        setChannelData(response.data);
      })
      .catch((err) => console.log(err));
  }, [channelId]);
  return (
    <>
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
            <h2 className="text-2xl font-semibold mt-3">
              {channelData?.channelDetails?.channelName}
            </h2>
            <p className="text-sm text-gray-600">
              {channelData?.channelDetails?.channelHandleId} .{" "}
              <span>1M subscribers .</span>
              <span> 100 videos</span>
            </p>
            <p>Welcome to official youtube channel!</p>
            <div className=" flex gap-5 mt-2">
              <button className="border-1 rounded-lg p-1">Subscribe</button>
              <button
                className=" px-3 py-1 rounded-full bg-slate-200 flex items-center gap-1 cursor-pointer hover:bg-slate-300"
                onClick={handleOpen}
              >
                <FiPlus />
                Add Video
              </button>
            </div>
          </div>
        </div>
        <div className=" gap-5 mb-5">
          <span>Videos</span>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5 p-4">
            {channelData?.videos?.map((video) => (
              <VideoItem key={video._id} video={video} channel={true} />
            ))}
          </div>
        </div>
      </div>
      <Modal show={showModal} onClose={handleClose}>
        <div className="m:0 flex flex-col items-center justify-center gap-4 sm:ml-20 p-10">
          <h2 className="text-2xl font-bold mb-8">Upload Your Video</h2>
          <input
            type="text"
            placeholder="Title"
            className="w-[80%] border-1 p-2 rounded-lg"
          />
          <input
            type="text"
            placeholder="Video URL"
            className="w-[80%] border-1 p-2 rounded-lg"
          />
          <input
            type="text"
            placeholder="Thumbnail URL"
            className="w-[80%] border-1 p-2 rounded-lg"
          />
          <textarea
            placeholder="Description"
            className="w-[80%] border-1 p-2 rounded-lg"
          ></textarea>
        </div>
        <div className="flex justify-end gap-4 w-full mt-10">
          <button
            onClick={handleClose}
            className="text-gray-600 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleClose}
            className="text-blue-600 cursor-pointer"
          >
            Upload Video
          </button>
        </div>
      </Modal>
    </>
  );
}

export default Channel;
