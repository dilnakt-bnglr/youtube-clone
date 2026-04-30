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
import { sampleThumnails } from "../utils/sampleThumbnail.js";
import { getToken, getUserId } from "../utils/getLocalStorageValues";
import { API_BASE_URL } from "../utils/apiConfig";

function VideoDetails() {
  const videoId = useParams().id;
  const [videoData, setVideoData] = useState("");
  const [comments, setComments] = useState([]);
  const userId = getUserId();
  const token = getToken();
  const [isUserLiked, setIsUserLiked] = useState(false);
  const [isUserDisliked, setIsUserDisliked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  useEffect(() => {
    // API call to fetch video details, comments, and user like/dislike status for the given video ID
    axios
      .get(`${API_BASE_URL}/api/video/${videoId}`)
      .then((response) => {
        setVideoData(response.data);
        setComments(response.data.comments);
        // Check if the user has liked or disliked the video and set the respective states
        const totalLikes = response?.data?.videoLikes;
        totalLikes?.map((like) => {
          if (like?.userId === userId) {
            setIsUserLiked(true);
          }
        });
        const totalDislikes = response?.data?.videoDisLikes;
        totalDislikes?.map((dislike) => {
          if (dislike?.userId === userId) {
            setIsUserDisliked(true);
          }
        });

        setLikeCount(totalLikes?.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [videoId]);

  // Function to handle like button click and update like/dislike status accordingly
  const handleLike = () => {
    if (userId === "") {
      setShowLoginPopup(!showLoginPopup);
      return;
    }
    const bodyObject = { userId, videoId };
    axios
      .post(`${API_BASE_URL}/api/user-action/like`, bodyObject, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`,
        },
      })
      .then((response) => {
        setIsUserLiked(response.data.isUserLiked);
        const totalCount = response?.data?.totalLikes;
        if (totalCount) setLikeCount(totalCount?.length);
        if (response.data.isUserDisliked !== undefined) {
          setIsUserDisliked(response.data.isUserDisliked);
        }
      });
  };

  // Function to handle dislike button click and update like/dislike status accordingly
  const handleDisLike = () => {
    if (userId === "") {
      setShowLoginPopup(!showLoginPopup);
      return;
    }
    const bodyObject = { userId, videoId };
    axios
      .post(`${API_BASE_URL}/api/user-action/dislike`, bodyObject, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`,
        },
      })
      .then((response) => {
        if (response.data.isUserLiked !== undefined) {
          setIsUserLiked(response.data.isUserLiked);
        }
        const totalCount = response?.data?.totalLikes;
        if (totalCount) setLikeCount(totalCount?.length);
        setIsUserDisliked(response.data.isUserDisliked);
      });
  };

  return (
    <div className="block min-[1200px]:flex">
      <div className="p-2 mt-5 min-[1200px]:w-[60%]">
        <iframe
          width={"100%"}
          src={videoData?.video?.videoURL}
          allowfullscreen
          className="h-70 min-[1200px]:h-90"
        ></iframe>
        <div className="p-3">
          <h3 className="font-semibold text-xl font-roboto">
            {videoData?.video?.title}
          </h3>
          <div className="flex flex-col md:flex-row justify-between gap-5">
            <div className="flex gap-5">
              <div>
                <Link to={`/channel/${videoData?.channelDetails?._id}`}>
                  <h5 className="text-sm text-gray-600 ">
                    {videoData?.channelDetails?.channelName}
                  </h5>
                </Link>

                <p className="text-sm text-gray-500">1M views • 2 days ago</p>
              </div>
              <div>
                <button className="bg-red-600 text-white px-4 py-2 rounded-full font-bold hover:bg-black cursor-pointer">
                  Subscribe
                </button>
              </div>
            </div>
            <div className="flex gap-5 relative">
              {showLoginPopup && (
                <div
                  className="absolute top-[-125px] right-35
                 bg-white border border-gray-300 rounded-lg shadow-lg p-4 w-64 z-10"
                >
                  <div className="flex flex-col justify-between items-center mb-2">
                    <span className="text-xl font-bold">Like this Video?</span>
                    <p className="text-black-500 text-sm mt-2">
                      Sign in to make your opinion count.
                    </p>
                    <button
                      onClick={() => setShowLoginPopup(false)}
                      className="text-gray-500 hover:text-gray-700 absolute top-2 right-2 cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                  <Link
                    to="/signin"
                    className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 block text-center"
                    onClick={() => setShowLoginPopup(false)}
                  >
                    Sign In
                  </Link>
                </div>
              )}
              <div className="rounded-full p-2 text-2xl w-20 flex justify-between bg-gray-200 ">
                <div className="flex justify-center items-center">
                  {likeCount ? (
                    <span className="text-sm ">{likeCount}</span>
                  ) : null}
                  {isUserLiked ? (
                    <button
                      className="cursor-pointer"
                      onClick={() => handleLike()}
                    >
                      <AiFillLike />
                    </button>
                  ) : (
                    <button
                      className="cursor-pointer"
                      onClick={() => handleLike()}
                    >
                      <BiLike />
                    </button>
                  )}
                </div>
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
              <div className=" rounded-full p-2 text-2xl w-15 text-center bg-gray-200">
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
        {sampleThumnails?.map((item) => (
          <VideodetailItem item={item} key={item?.id} />
        ))}
      </div>
    </div>
  );
}

export default VideoDetails;
