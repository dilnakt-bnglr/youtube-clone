import React from "react";

function VideodetailItem() {
  return (
    <div className="flex hover:bg-gray-100 rounded-lg overflow-hidden hover:shadow-md mb-5">
      <img
        src="https://i.ytimg.com/vi/xQYJiKfKZ7g/maxresdefault.jpg "
        width={"200px"}
      />
      <div className="p-3">
        <h3 className="font-semibold text-xl font-roboto">
          Learn React In 30 Minutes
        </h3>
        <h5 className="text-sm text-gray-600 ">Web Dev Simplified</h5>
        <p className="text-sm text-gray-500">1M views • 2 days ago</p>
      </div>
    </div>
  );
}

export default VideodetailItem;
