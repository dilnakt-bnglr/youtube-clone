import React, { useEffect, useState } from "react";
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { PiShareFat } from "react-icons/pi";
import Comment from "../Components/VideDetails/Comment";
import VideodetailItem from "../Components/VideDetails/VideodetailItem";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

function VideoDetails() {
  const a = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const videoId = useParams().id;
  const [videoData, setVideoData] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/video/${videoId}`)
      .then((response) => {
        setVideoData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [videoId]);
  return (
    <div className="block sm:flex">
      <div className="p-2 mt-5 sm:w-[60%]">
        <iframe
          width={"100%"}
          height={"30%"}
          src="https://www.youtube.com/embed/4oRSpPaMnNE"
          allowfullscreen
        ></iframe>
        <div className="p-3">
          <h3 className="font-semibold text-xl font-roboto">
            {videoData?.video?.title}
          </h3>
          <div className="flex justify-between gap-5">
            <div>
              <Link to={`/channel/${videoData?.channelDetails?._id}`}>
                <h5 className="text-sm text-gray-600 ">
                  {videoData?.channelDetails?.channelName}
                </h5>
              </Link>

              <p className="text-sm text-gray-500">1M views • 2 days ago</p>
            </div>
            <div className="flex gap-5">
              <div className="border-1 rounded-full p-2 text-2xl w-24 flex justify-between bg-gray-200 ">
                <button>
                  <BiLike />
                </button>
                <button>
                  <BiDislike />
                </button>
              </div>
              <div className="border-1 rounded-full p-2 text-2xl w-24 text-center bg-gray-200">
                <button>
                  <PiShareFat />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 p-2 rounded-lg">
          <p>{videoData?.video?.description}</p>
        </div>
        <Comment />
      </div>
      <div className="p-5">
        {a.map((item) => (
          <VideodetailItem key={item} />
        ))}
      </div>
    </div>
  );
}

export default VideoDetails;
