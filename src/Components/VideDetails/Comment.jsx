import React, { useState } from "react";
import { VscAccount } from "react-icons/vsc";
import { HiOutlineDotsVertical } from "react-icons/hi";

function Comment() {
  const [showMenu, setShowMenu] = useState(false);

  const handleEdit = () => {
    // Placeholder for edit functionality
    console.log("Edit comment");
  };

  const handleDelete = () => {
    // Placeholder for delete functionality
    console.log("Delete comment");
  };

  return (
    <div className="p-5">
      <div>
        <span>100 Comments</span>
        <div className="flex justify-start mt-3 ">
          <VscAccount className="text-4xl mr-5" />
          <input
            type="text"
            placeholder="Add a comment..."
            className="border-b-1 border-gray-300  p-1 rounded-lg w-[80%] mb-10"
          />
        </div>
        <div className="flex justify-start ">
          <div>
            <VscAccount className="text-4xl mr-5" />
          </div>
          <div className="flex w-full justify-between mb-5">
            <div>
              <span>abhi@gmail.com</span>
              <p>hello good video</p>
            </div>
            <div className="relative mt-3">
              <HiOutlineDotsVertical
                onClick={() => setShowMenu(!showMenu)}
                className="cursor-pointer"
              />
              {showMenu && (
                <div className="absolute right-0 top-6 bg-white border border-gray-300 rounded shadow-md z-10">
                  <button
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={() => {
                      setShowMenu(false);
                      handleEdit();
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={() => {
                      setShowMenu(false);
                      handleDelete();
                    }}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comment;
