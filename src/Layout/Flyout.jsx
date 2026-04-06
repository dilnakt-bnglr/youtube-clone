import React from "react";
import { AiFillHome } from "react-icons/ai";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";
import { RxHamburgerMenu } from "react-icons/rx";
import { youtube_icon } from "../assets/home_icon.js";
import { RiShoppingBag4Line } from "react-icons/ri";
import { IoMusicalNoteOutline } from "react-icons/io5";
import { ImFilm } from "react-icons/im";
import { GrHistory } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";

function Flyout({ setIsOpen }) {
  const userData = JSON.parse(localStorage.getItem("userName"));
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
    <>
      <div className="flex items-center gap-5 fixed top-0 p-5 z-50">
        <RxHamburgerMenu
          className="text-3xl cursor-pointer"
          onClick={() => setIsOpen(false)}
        />
        <Link to="/">
          <div dangerouslySetInnerHTML={{ __html: youtube_icon }} />
        </Link>
      </div>
      <div className="overflow-auto h-[90vh]">
        <div className="flex flex-col gap-5 p-5 ">
          <Link to="/">
            <div className="flex gap-5 p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg">
              <AiFillHome className="text-3xl" />
              <span>Home</span>
            </div>
          </Link>

          <div className="flex gap-5 p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg cursor-pointer">
            <SiYoutubeshorts className="text-3xl" />
            <span>Shorts</span>
          </div>
          <div className="flex gap-5 p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg cursor-pointer">
            <MdOutlineSubscriptions className="text-3xl" />
            <span>Subscriptions</span>
          </div>

          <div
            className="flex gap-5 p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg cursor-pointer"
            onClick={() => handleAccount()}
          >
            <VscAccount className="text-3xl" />
            <span>You</span>
          </div>
          <div className="flex gap-5 p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg cursor-pointer">
            <GrHistory className="text-3xl" />
            <span>History</span>
          </div>
        </div>
        <hr />
        {!userData && (
          <div className="flex flex-col gap-5 p-5">
            <p>Sign in to like videos, comment and subscribe.</p>
            <div className="flex justify-center">
              <button className="flex items-center gap-2 w-[50%] border rounded-full px-3 py-2 text-blue-800 cursor-pointer">
                <VscAccount className="text-2xl" /> Sign in
              </button>
            </div>
          </div>
        )}

        <hr />
        <div className="flex flex-col gap-5 p-5 ">
          <span className="font-bold cursor-pointer">Explore</span>
          <div className="flex gap-5 p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg cursor-pointer">
            <RiShoppingBag4Line className="text-3xl" />
            <span>Shopping</span>
          </div>
          <div className="flex gap-5 p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg cursor-pointer">
            <IoMusicalNoteOutline className="text-3xl" />
            <span>Music</span>
          </div>
          <div className="flex gap-5 p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg cursor-pointer">
            <ImFilm className="text-3xl" />
            <span>Films</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Flyout;
