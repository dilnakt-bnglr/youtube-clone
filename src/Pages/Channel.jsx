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
  const [channelData, setChannelData] = useState("");
  const [channelVideos, setChannelVideos] = useState([]);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const channelId = useParams().id;
  const loggedInUser = JSON.parse(localStorage.getItem("userId")) || "";

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/channel/${channelId}`)
      .then((response) => {
        setChannelData(response.data.channelDetails);
        setChannelVideos(response.data.videos);
      })
      .catch((err) => console.log(err));
  }, [channelId]);

  const handleChange = (e) => {
    if (error) {
      setError("");
    }
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  console.log(formData);

  const handleSubmit = () => {
    const required = [
      "title",
      "videoURL",
      "thumbnailURL",
      "category",
      "description",
    ];
    // Error handling for input fields
    for (let field of required) {
      if (!formData[field] || formData[field].toString().trim() === "") {
        setError("Please fill in all the fields.");
        return;
      }
    }
    const token = JSON.parse(localStorage.getItem("token"));
    const bodyObject = {
      channelId,
      title: formData.title,
      videoURL: formData.videoURL,
      thumbnailURL: formData.thumbnailURL,
      category: formData.category,
      description: formData.description,
    };
    axios
      .post("http://localhost:5000/api/video", bodyObject, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`,
        },
      })
      .then((response) => {
        setSuccessMsg("Video Uploaded Successfully");
        handleClose();
        const addedVideo = response.data.video;
        let currentVideos = channelVideos;
        currentVideos.push(addedVideo);
        setChannelVideos(currentVideos);
      });
  };
  const handleClose = () => {
    setSuccessMsg("");
    setShowModal(false);
  };
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
          <span className="hidden sm:flex justify-center items-center w-32 h-32 rounded-full border-none bg-blue-400 text-6xl cursor-pointer">
            {channelData?.channelName?.[0]?.toUpperCase()}
          </span>
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-semibold mt-3">
              {channelData?.channelName}
            </h2>
            <p className="text-sm text-gray-600">
              {channelData?.channelHandleId} . <span>1M subscribers .</span>
              <span> {channelVideos?.length} videos</span>
            </p>
            <p>Welcome to official youtube channel!</p>
            <div className=" flex gap-5 mt-2">
              {channelData?.userId !== loggedInUser && (
                <button className="border-1 rounded-lg p-1">Subscribe</button>
              )}

              {channelData?.userId === loggedInUser && (
                <button
                  disabled={channelData?.userId !== loggedInUser}
                  className=" px-3 py-1 rounded-full bg-slate-200 flex items-center gap-1 cursor-pointer hover:bg-slate-300"
                  onClick={() => setShowModal(true)}
                >
                  <FiPlus />
                  Add Video
                </button>
              )}
            </div>
          </div>
        </div>
        <div className=" gap-5 mb-5">
          <span className="text-xl font-bold ml-5">Videos</span>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5 p-4">
            {channelVideos?.map((video) => (
              <VideoItem
                key={video._id}
                video={video}
                channel={true}
                channelData={channelData}
                channelVideos={channelVideos}
                setChannelVideos={setChannelVideos}
              />
            ))}
          </div>
        </div>
      </div>
      <Modal show={showModal} onClose={handleClose}>
        <div className="m:0 flex flex-col items-center justify-center gap-4 sm:ml-20">
          <h2 className="text-2xl font-bold mb-8">Upload Your Video</h2>
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="w-[80%] border-1 p-2 rounded-lg"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="text"
            name="videoURL"
            placeholder="Video URL"
            className="w-[80%] border-1 p-2 rounded-lg"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <input
            type="text"
            name="thumbnailURL"
            placeholder="Thumbnail URL"
            className="w-[80%] border-1 p-2 rounded-lg"
            onChange={(e) => handleChange(e)}
          />
          <select
            name="category"
            className="w-[80%] border-1 p-2 rounded-lg"
            onChange={(e) => handleChange(e)}
          >
            <option value="" disabled selected hidden>
              Choose an option...
            </option>
            <option value="Music">Music</option>
            <option value="Tech">Tech</option>
            <option value="Cooking">Cooking</option>
            <option value="Gaming">Gaming</option>
          </select>
          <textarea
            name="description"
            placeholder="Description"
            className="w-[80%] border-1 p-2 rounded-lg"
            onChange={(e) => handleChange(e)}
          ></textarea>
        </div>
        {error && <p className="text-red-600 text-center">{error}</p>}
        {successMsg && (
          <p className="text-green-700 text-center">{successMsg}</p>
        )}
        <div className="flex justify-end gap-4 w-full mt-10">
          <button
            onClick={handleClose}
            className="text-gray-600 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
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
