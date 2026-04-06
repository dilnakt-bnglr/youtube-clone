import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { youtube_icon } from "../assets/home_icon.js";
import { FiBell, FiPlus } from "react-icons/fi";
import { VscAccount } from "react-icons/vsc";
import Flyout from "./Flyout.jsx";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../Components/Modal.jsx";
import { TfiSearch } from "react-icons/tfi";
import { IoArrowBack } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../Store/userSlice.js";
import axios from "axios";
import { filterVideos } from "../Store/videoSlice.js";

function Header() {
  const userData =
    useSelector((state) => state.user.userName) ||
    JSON.parse(localStorage.getItem("userName"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const [userMenuMobile, setUserMenuMobile] = useState(false);

  // channel state
  const [channelName, setChannelName] = useState("");
  const [channelHandleId, setChannelHandleId] = useState("");
  const [error, setError] = useState("");

  const handleCreateChannel = () => {
    //
    const emptyInput = [];
    if (!channelName) {
      emptyInput.push("channelName");
    }

    if (!channelHandleId) {
      emptyInput.push("channelHandleId");
    }
    if (emptyInput.length > 0) {
      setError(`Required fields are missing: ${emptyInput.join(",")}`);
      return;
    }
    // API call to create a new channel with the provided channel name and handle ID
    const bodyObject = { channelName, channelHandleId };
    const token = JSON.parse(localStorage.getItem("token"));
    axios
      .post("http://localhost:5000/api/channel", bodyObject, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`,
        },
      })
      .then((response) => {
        setShowModal(false);
        navigate(`/channel/${response?.data?.channelId}`);
      })
      .catch((err) => {
        setError(err?.response?.data?.message);
      });
  };

  // Function to handle user sign out by clearing user information from the Redux store and local storage, and navigating to the home page
  const handleSignOut = () => {
    dispatch(signOut());
    localStorage.clear();
    navigate("/");
  };

  // Function to handle changes in the search input and dispatch an action to filter videos based on the search string
  const handleInputChange = (value) => {
    dispatch(filterVideos(value));
  };
  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <>
      {!mobileSearch ? (
        <header className="pl:0 fixed inset-x-0 top-0 z-30 flex justify-between sm:pl-10 p-3 items-center bg-white shadow-sm ">
          <div className="flex gap-5 items-center">
            <RxHamburgerMenu
              className="text-2xl cursor-pointer"
              onClick={() => setIsOpen(true)}
            />
            <Link to="/">
              <div dangerouslySetInnerHTML={{ __html: youtube_icon }} />
            </Link>
          </div>

          <div className="flex-1 px-3 flex items-center justify-center">
            <input
              type="text"
              placeholder="Search"
              className="hidden sm:block w-[50%] border rounded-full py-2 px-4 focus:outline-none focus:ring focus:ring-blue-300"
              onChange={(e) => handleInputChange(e.target.value)}
            />
            <TfiSearch
              className="text-2xl sm:hidden"
              onClick={() => setMobileSearch(true)}
            />
          </div>

          <div className="flex gap-4 items-center sm:mr-2">
            {userData && (
              <button
                className="px-3 py-1 rounded-full bg-slate-200 flex items-center gap-1 cursor-pointer hover:bg-slate-300"
                onClick={handleOpen}
              >
                <FiPlus /> Create
              </button>
            )}

            {/* <FiBell className="hidden sm:block text-2xl cursor-pointer" /> */}
            {/* /* Desktop User Menu * / */}
            {userData ? (
              <div className="relative">
                <span
                  className="hidden sm:flex justify-center w-10 h-10 rounded-full bg-blue-400 text-2xl cursor-pointer"
                  onClick={() => setUserMenu(!userMenu)}
                >
                  {userData[0].toLowerCase()}
                </span>
                {userMenu && (
                  <div className="hidden sm:block absolute right-8 top-10 w-[250px] bg-white border border-gray-300 rounded shadow-md z-10 p-4">
                    <div className="flex gap-5 border-b-1 border-gray-300 pb-4 mb-4">
                      <span
                        className="hidden sm:flex justify-center w-10 h-10 rounded-full  bg-blue-400 text-2xl cursor-pointer"
                        onClick={() => setUserMenu(!userMenu)}
                      >
                        {userData[0].toLowerCase()}
                      </span>
                      <div className="flex flex-col">
                        <span>{userData}</span>
                        <Link
                          to="/channel-list"
                          onClick={() => setUserMenu(false)}
                        >
                          <span className="text-blue-600 hover:underline ">
                            View your Channels
                          </span>
                        </Link>
                      </div>
                    </div>

                    <button
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left cursor-pointer"
                      onClick={() => {
                        setUserMenu(false);
                        handleSignOut();
                      }}
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/signin">
                <button className=" hidden sm:flex items-center gap-2 border rounded-full px-3 py-1 text-blue-800 cursor-pointer">
                  <VscAccount className=" text-2xl" /> Sign in
                </button>
              </Link>
            )}
            {/* Mobile User Menu */}
            {userData ? (
              <div className="relative">
                <span
                  onClick={() => setUserMenuMobile(!userMenuMobile)}
                  className="sm:hidden w-10 h-10 rounded-full  flex  justify-center bg-blue-400 text-2xl cursor-pointer"
                >
                  {userData[0].toLowerCase()}
                </span>
                {userMenuMobile && (
                  <div className="sm:hidden absolute right-8 top-10 w-[300px] bg-white border border-gray-300 rounded shadow-md z-10 p-4">
                    <div className="flex gap-5 border-b-1 border-gray-300 pb-4 mb-4">
                      <span className="flex justify-center w-10 h-10 rounded-full bg-blue-400 text-2xl ">
                        {userData[0].toLowerCase()}
                      </span>
                      <div className="flex flex-col">
                        <span>{userData}</span>
                        <Link
                          to="/channel-list"
                          onClick={() => setUserMenuMobile(false)}
                        >
                          <span className="text-blue-600 hover:underline ">
                            View your Channels
                          </span>
                        </Link>
                      </div>
                    </div>

                    <button
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left cursor-pointer"
                      onClick={() => {
                        setUserMenu(false);
                        handleSignOut();
                      }}
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/signin">
                <button className="sm:hidden">
                  <VscAccount className=" text-2xl" />
                </button>
              </Link>
            )}
          </div>
        </header>
      ) : (
        <div className="pl-0 fixed inset-x-0 top-0 z-30 flex justify-between sm:pl-10 p-3 items-center bg-white shadow-sm ">
          <IoArrowBack
            className="text-2xl mr-2"
            onClick={() => setMobileSearch(false)}
          />
          <input
            type="text"
            placeholder="Search"
            className="w-full border rounded-full py-2 px-4 focus:outline-none focus:ring focus:ring-blue-300"
            onChange={(e) => handleInputChange(e.target.value)}
          />
        </div>
      )}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setIsOpen(false)}
        />

        <aside
          className={`absolute left-0 top-0 h-full w-72 bg-white  shadow-2xl transform transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-end p-4">
            <button
              onClick={() => setIsOpen(false)}
              className="text-2xl font-bold cursor-pointer"
            >
              ×
            </button>
          </div>
          <Flyout setIsOpen={setIsOpen} />
        </aside>
      </div>
      <Modal show={showModal} onClose={handleClose}>
        <h2 className="text-xl font-bold">How you'll appear</h2>
        <div className="flex flex-col items-center justify-center gap-4 sm:ml-20 p-10">
          <VscAccount className="text-8xl" />
          <p className="text-blue-600">Select Picture</p>
          <input
            type="text"
            placeholder="Channel Name"
            className="w-full sm:w-[80%] border-1 p-2 rounded-lg"
            onChange={(e) => {
              setChannelName(e.target.value);
              setError("");
            }}
          />
          <input
            type="text"
            placeholder="Handle ID"
            className="w-full sm:w-[80%] border-1 p-2 rounded-lg"
            onChange={(e) => {
              setChannelHandleId(e.target.value);
              setError("");
            }}
          />
        </div>
        {error && <p className="text-red-500 mb-5">{error}</p>}
        <div className="flex justify-end gap-4 ">
          <button
            onClick={handleClose}
            className="text-gray-600 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => handleCreateChannel()}
            className="text-blue-600 cursor-pointer"
          >
            Create Channel
          </button>
        </div>
      </Modal>
    </>
  );
}

export default Header;
