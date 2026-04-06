import React, { useEffect, useState } from "react";
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { PiShareFat } from "react-icons/pi";
import Comment from "../Components/VideDetails/Comment";
import VideodetailItem from "../Components/VideDetails/VideodetailItem";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";

function VideoDetails() {
  const a = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const videoId = useParams().id;
  const [videoData, setVideoData] = useState("");
  const [comments, setComments] = useState([]);
  const userId = JSON.parse(localStorage.getItem("userId")) || "";
  const token = JSON.parse(localStorage.getItem("token")) || "";
  const [isUserLiked, setIsUserLiked] = useState(false);
  const [isUserDisliked, setIsUserDisliked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/video/${videoId}`)
      .then((response) => {
        setVideoData(response.data);
        setComments(response.data.comments);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [videoId]);

  const handleLike = () => {
    const bodyObject = { userId, videoId };
    axios
      .post("http://localhost:5000/api/user-action/like", bodyObject, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`,
        },
      })
      .then((response) => {
        setIsUserLiked(response.data.isUserLiked);
        const totalCount = response.data.totalLikes;
        setLikeCount(totalCount?.length);
        if (response.data.isUserDisliked !== undefined) {
          setIsUserDisliked(response.data.isUserDisliked);
        }
      });
  };

  const handleDisLike = () => {
    const bodyObject = { userId, videoId };
    axios
      .post("http://localhost:5000/api/user-action/dislike", bodyObject, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`,
        },
      })
      .then((response) => {
        if (response.data.isUserLiked !== undefined) {
          setIsUserLiked(response.data.isUserLiked);
        }
        setIsUserDisliked(response.data.isUserDisliked);
      });
  };

  return (
    <div className="block sm:flex">
      <div className="p-2 mt-5 sm:w-[60%]">
        <iframe
          width={"100%"}
          height={"30%"}
          src={videoData?.video?.videoURL}
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
                {isUserLiked ? (
                  <div className="flex justify-center items-center">
                    <span className="text-sm ">{likeCount}</span>
                    <button
                      className="cursor-pointer"
                      onClick={() => handleLike()}
                    >
                      <AiFillLike />
                    </button>
                  </div>
                ) : (
                  <button
                    className="cursor-pointer"
                    onClick={() => handleLike()}
                  >
                    <BiLike />
                  </button>
                )}
                {isUserDisliked ? (
                  <button
                    className="cursor-pointer"
                    onClick={() => handleDisLike()}
                  >
                    <AiFillDislike />
                  </button>
                ) : (
                  <button
                    className="cursor-pointer"
                    onClick={() => handleDisLike()}
                  >
                    <BiDislike />
                  </button>
                )}
              </div>
              <div className="border-1 rounded-full p-2 text-2xl w-24 text-center bg-gray-200">
                <button className="cursor-pointer">
                  <PiShareFat />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 p-2 rounded-lg">
          <p>{videoData?.video?.description}</p>
        </div>
        <Comment
          videoId={videoId}
          comments={comments}
          setComments={setComments}
        />
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
