import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { youtube_icon } from "../assets/home_icon.js";
import { FiBell, FiPlus } from "react-icons/fi";
import { VscAccount } from "react-icons/vsc";
import Flyout from "./Flyout.jsx";
import { Link } from "react-router-dom";
import Modal from "../Components/Modal.jsx";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-30 flex justify-between pl-10 p-3 items-center bg-white shadow-sm dark:bg-gray-900">
        <Link to="/">
          <div className="flex gap-5 items-center">
            <RxHamburgerMenu
              className="text-2xl cursor-pointer"
              onClick={() => setIsOpen(true)}
            />
            <div dangerouslySetInnerHTML={{ __html: youtube_icon }} />
          </div>
        </Link>

        <div className="flex-1 px-3 flex items-center justify-center">
          <input
            type="text"
            placeholder="Search"
            className="w-[50%] border rounded-full py-2 px-4 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="flex gap-4 items-center mr-10">
          <button
            className="px-3 py-1 rounded-full bg-slate-200 flex items-center gap-1 cursor-pointer hover:bg-slate-300"
            onClick={handleOpen}
          >
            <FiPlus /> Create
          </button>
          <FiBell className="text-2xl" />
          <Link to="/signin">
            <button className="flex items-center gap-2 border rounded-full px-3 py-1 text-blue-800 cursor-pointer">
              <VscAccount className="text-2xl" /> Sign in
            </button>
          </Link>
        </div>
      </header>
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
        <div className="flex flex-col items-center justify-center gap-4 ml-20 p-10">
          <VscAccount className="text-8xl" />
          <p className="text-blue-600">Select Picture</p>
          <input
            type="text"
            placeholder="Name"
            className="w-[80%] border-1 p-2 rounded-lg"
          />
          <input
            type="text"
            placeholder="Handle"
            className="w-[80%] border-1 p-2 rounded-lg"
          />
        </div>
        <div className="flex justify-end gap-4 ">
          <button
            onClick={handleClose}
            className="text-gray-600 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleClose}
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
