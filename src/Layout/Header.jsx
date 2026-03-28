import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { FiYoutube } from "react-icons/fi";
import { youtube_icon } from "../assets/home_icon.js";
import { FiBell } from "react-icons/fi";
import { VscAccount } from "react-icons/vsc";
import { FiPlus } from "react-icons/fi";

function Header() {
  return (
    <div className="flex justify-between p-2 items-center shadow-md">
      <div className="flex gap-5 ">
        <RxHamburgerMenu className=" text-2xl" />
        <div dangerouslySetInnerHTML={{ __html: youtube_icon }}></div>
      </div>
      <div>
        <input
          type="text"
          className="border-1 rounded-full w-[500px] p-1 m-2 pl-2 "
        />
      </div>
      <div className="flex gap-8 justify-center items-center mr-10">
        <button className="flex gap-2 border-1 border-gray-200 rounded-full p-1 items-center bg-slate-200">
          <FiPlus className="mt-1 text-2xl" />
          <span>Create</span>
        </button>
        <FiBell className="text-2xl" />
        <div>
          <button className="flex items-center gap-2 border-1 border-gray-200 rounded-full p-1 text-blue-800 font-semibold ">
            <VscAccount className="text-2xl" />
            <span>Sign in</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
