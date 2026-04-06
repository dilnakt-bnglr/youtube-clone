import React, { useState } from "react";
import Modal from "../Modal";

function EditChannelVideo({ selectedVideoToEdit, setSelectedVideoToEdit }) {
  const [error, setError] = useState("");
  const handleVideoEditChange = (e) => {
    if (error) {
      setError("");
    }
    const { name, value } = e.target;
    const currentFormValues = { ...selectedVideoToEdit };
    currentFormValues[name] = value;
    setSelectedVideoToEdit(currentFormValues);
  };

  const handleEditVideoUpdate = () => {
    const required = [
      "title",
      "videoURL",
      "thumbnailURL",
      "category",
      "description",
    ];
    // Error handling for input fields
    for (let field of required) {
      if (
        !selectedVideoToEdit[field] ||
        selectedVideoToEdit[field].toString().trim() === ""
      ) {
        setError("Please fill in all the fields.");
        return;
      }
    }
    const bodyObject = {
      title: selectedVideoToEdit?.title,
      videoURl: selectedVideoToEdit?.videoURL,
      thumbnailURL: selectedVideoToEdit?.thumbnailURL,
      category: selectedVideoToEdit?.category,
      description: selectedVideoToEdit.description,
    };
    console.log(bodyObject);
  };

  return (
    <>
      <Modal show={true}>
        <div className="m:0 flex flex-col items-center justify-center gap-4 sm:ml-20">
          <h2 className="text-2xl font-bold mb-8">Edit Your Video</h2>
          <input
            type="text"
            name="title"
            value={selectedVideoToEdit?.title}
            className="w-[80%] border-1 p-2 rounded-lg"
            onChange={(e) => handleVideoEditChange(e)}
          />
          <input
            type="text"
            name="videoURL"
            value={selectedVideoToEdit?.videoURL}
            className="w-[80%] border-1 p-2 rounded-lg"
            onChange={(e) => handleVideoEditChange(e)}
          />
          <input
            type="text"
            name="thumbnailURL"
            value={selectedVideoToEdit?.thumbnailURL}
            className="w-[80%] border-1 p-2 rounded-lg"
            onChange={(e) => handleVideoEditChange(e)}
          />
          <select
            name="category"
            className="w-[80%] border-1 p-2 rounded-lg"
            value={selectedVideoToEdit?.category}
            onChange={(e) => handleVideoEditChange(e)}
          >
            <option value="" disabled selected hidden>
              Choose an option...
            </option>
            <option value="Music">Music</option>
            <option value="Tech">Tech</option>
            <option value="Cooking">Cooking</option>
            <option value="Gaming">Gaming</option>
          </select>
          <textarea
            name="description"
            value={selectedVideoToEdit?.description}
            className="w-[80%] border-1 p-2 rounded-lg"
            onChange={(e) => handleVideoEditChange(e)}
          ></textarea>
        </div>
        {error && <p className="text-red-600 text-center">{error}</p>}
        <div className="flex justify-end gap-4 w-full mt-10">
          <button
            onClick={() => setSelectedVideoToEdit("")}
            className="text-gray-600 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => handleEditVideoUpdate()}
            className="text-blue-600 cursor-pointer"
          >
            Update
          </button>
        </div>
      </Modal>
    </>
  );
}

export default EditChannelVideo;
