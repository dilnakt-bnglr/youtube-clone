import React from "react";
import VideoItem from "./VideoItem";
import { useSelector } from "react-redux";

function VideoList() {
  const videos = useSelector((state) => state.video.videos);
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5 p-4">
        {videos.map((video) => (
          <VideoItem key={video._id} video={video} />
        ))}
      </div>
      <div className="felx justify-center items-center">
        {videos.length === 0 && (
          <p className=" text-center text-black">No videos found.</p>
        )}
      </div>
    </>
  );
}

export default VideoList;
