import React from "react";
import { AiFillHome } from "react-icons/ai";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";

function Sidebar({ className = "" }) {
  return (
    <nav
      className={`h-full flex flex-col justify-start pt-5 gap-4 text-sm text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-900 ${className}`}
    >
      <div className="flex flex-col items-center gap-3 px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg">
        <div className="flex flex-col items-center gap-2">
          <AiFillHome className="text-xl" />
          <span>Home</span>
        </div>
      </div>
      <div className="flex flex-col items-center gap-3 px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg">
        <div className="flex flex-col items-center gap-2">
          <SiYoutubeshorts className="text-xl" />
          <span>Shorts</span>
        </div>
      </div>
      <div className="flex flex-col items-center gap-3 px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg">
        <div className="flex flex-col items-center gap-2">
          <MdOutlineSubscriptions className="text-xl" />
          <span>Subscriptions</span>
        </div>
      </div>
      <div className="flex flex-col items-center gap-3 px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg">
        <div className="flex flex-col items-center gap-2">
          <VscAccount className="text-xl" />
          <span>You</span>
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;
