import React from "react";
import VideoItem from "./VideoItem";

function VideoList() {
  const a = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5 p-4">
      {a.map(() => (
        <VideoItem />
      ))}
    </div>
  );
}

export default VideoList;
