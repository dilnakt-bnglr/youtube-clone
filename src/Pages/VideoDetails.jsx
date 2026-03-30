import React from "react";
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { PiShareFat } from "react-icons/pi";
import Comment from "../Components/VideDetails/Comment";
import VideodetailItem from "../Components/VideDetails/VideodetailItem";

function VideoDetails() {
  const a = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div className="block sm:flex">
      <div className="p-2 mt-5 sm:w-[60%]">
        <img
          src="https://i.ytimg.com/vi/xQYJiKfKZ7g/maxresdefault.jpg"
          className="rounded-lg"
        />
        <div className="p-3">
          <h3 className="font-semibold text-xl font-roboto">
            Learn React In 30 Minutes
          </h3>
          <div className="flex justify-between gap-5">
            <div>
              <h5 className="text-sm text-gray-600 ">Web Dev Simplified</h5>
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
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
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
