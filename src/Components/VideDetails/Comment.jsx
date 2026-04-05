import React, { useState } from "react";
import { VscAccount } from "react-icons/vsc";
import { HiOutlineDotsVertical } from "react-icons/hi";
import axios from "axios";

function Comment({ videoId, comments, setComments }) {
  const [showMenu, setShowMenu] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [comment, setComment] = useState("");
  const [selectedComment, setSelectedComment] = useState("");
  const userId = JSON.parse(localStorage.getItem("userId"));
  const token = JSON.parse(localStorage.getItem("token"));

  const handleAddComment = () => {
    const bodyObject = {
      videoId,
      comment,
    };
    axios
      .post("http://localhost:5000/api/comment", bodyObject, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`,
        },
      })
      .then((response) => {
        const addedComment = response.data.comment;
        const existingComments = [...comments];
        existingComments.unshift(addedComment);
        setComments(existingComments);
        setShowButtons(false);
        setComment("");
      });
  };

  const handleEdit = () => {
    // Placeholder for edit functionality
    console.log("Edit comment");
  };

  const handleDelete = (commentId) => {
    axios
      .delete(`http://localhost:5000/api/comment/${commentId}`, {
        headers: {
          Authorization: `JWT ${token}`,
        },
      })
      .then((response) => {
        const deletedComment = response.data.deletedComment;
        const existingComments = [...comments];
        const commentsAfterDeletion = existingComments.filter(
          (comment) => comment?._id !== deletedComment?._id,
        );
        setComments(commentsAfterDeletion);
      });
  };

  return (
    <div className="p-5">
      <div>
        <span>{comments?.length} Comments</span>
        <div className="mt-3 mb-5">
          <div className="flex justify-start">
            <VscAccount className="text-4xl mr-5" />
            <input
              type="text"
              placeholder="Add a comment..."
              className="outline-none border-b-1 border-gray-300  p-1 rounded-lg w-full mb-3"
              onClick={() => setShowButtons(true)}
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              disabled={!userId}
            />
          </div>

          {showButtons && (
            <div className="flex gap-2 justify-end ">
              <button
                onClick={() => setShowButtons(false)}
                className="hover:rounded-full hover:bg-gray-200 cursor-pointer p-2"
              >
                Cancel
              </button>
              <button
                disabled={!comment}
                className={`rounded-full cursor-pointer ${comment ? "bg-blue-500" : "bg-gray-200"}  p-2`}
                onClick={() => handleAddComment()}
              >
                Comment
              </button>
            </div>
          )}
        </div>
        {comments?.map((comment) => {
          return (
            <div className="flex justify-start">
              <div>
                <VscAccount className="text-4xl mr-5" />
              </div>
              <div className="flex w-full justify-between mb-5">
                <div>
                  <span>{comment?.userName}</span>
                  <p>{comment?.comment}</p>
                </div>
                <div className="relative mt-3">
                  <HiOutlineDotsVertical
                    onClick={() => {
                      setSelectedComment(comment);
                      setShowMenu(!showMenu);
                    }}
                    className="cursor-pointer"
                  />
                  {showMenu && selectedComment?._id === comment?._id && (
                    <div className="absolute right-0 top-6 bg-white border border-gray-300 rounded shadow-md z-10">
                      <button
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        onClick={() => {
                          setShowMenu(false);
                          handleEdit();
                        }}
                      >
                        Report
                      </button>
                      {comment?.userId === userId && (
                        <>
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
                              handleDelete(comment?._id);
                            }}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Comment;
