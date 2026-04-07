import React from "react";
import { AiFillHome } from "react-icons/ai";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";
import { getUserName } from "../utils/getLocalStorageValues";

function Sidebar() {
  const userData = getUserName();
  const navigate = useNavigate();

  // Function to handle navigation when the "You" option is clicked in the sidebar
  const handleAccount = () => {
    if (userData) {
      navigate("/channel-list");
    } else {
      navigate("/signin");
    }
  };
  return (
    <nav className="h-full flex flex-col justify-start pt-5 gap-4 text-sm text-gray-800  bg-white ">
      <div className="flex flex-col items-center gap-3 px-4 py-2 hover:bg-gray-200 rounded-lg">
        <Link to="/">
          <div className="flex flex-col items-center gap-2">
            <AiFillHome className="text-xl" />
            <span>Home</span>
          </div>
        </Link>
      </div>
      <div className="flex flex-col items-center gap-3 px-4 py-2 hover:bg-gray-200 rounded-lg cursor-pointer">
        <div className="flex flex-col items-center gap-2 ">
          <SiYoutubeshorts className="text-xl" />
          <span>Shorts</span>
        </div>
      </div>
      <div className="flex flex-col items-center gap-3 px-4 py-2 hover:bg-gray-200  rounded-lg cursor-pointer">
        <div className="flex flex-col items-center gap-2">
          <MdOutlineSubscriptions className="text-xl" />
          <span>Subscriptions</span>
        </div>
      </div>
      <div
        className="flex flex-col items-center gap-3 px-4 py-2 hover:bg-gray-200 rounded-lg cursor-pointer"
        onClick={() => handleAccount()}
      >
        <div className="flex flex-col items-center gap-2">
          <VscAccount className="text-xl" />
          <span>You</span>
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;
