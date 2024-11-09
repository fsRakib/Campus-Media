import React, { useState } from "react";
import Avatar from "react-avatar";
import { FaImages } from "react-icons/fa6";
import axios from "axios";
import { CHIT_API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getIsActive, getRefresh } from "../redux/chitSlice";

export const CreatePost = () => {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null); // Image file state
  const [previewUrl, setPreviewUrl] = useState(""); // Image preview URL
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.user);
  const { isActive } = useSelector((store) => store.chit);
  const dispatch = useDispatch();

  const submitHandler = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("description", description);
    formData.append("id", user?._id);
    if (image) {
      formData.append("image", image);
    }

    try {
      const res = await axios.post(`${CHIT_API_END_POINT}/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      dispatch(getRefresh());
      if (res.data.success) {
        toast.success(res.data.msg);
      }
    } catch (error) {
      toast.error(error.response?.data?.msg || "Error creating post");
      console.log(error);
    }
    setLoading(false);
    setDescription("");
    setImage(null);
    setPreviewUrl("");
    setIsModalOpen(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setIsModalOpen(true);
    }
  };

  const confirmImage = () => {
    setIsModalOpen(false);
  };

  const forYouHandler = () => {
    dispatch(getIsActive(true));
  };

  const followingHandler = () => {
    dispatch(getIsActive(false));
  };

  return (
    <div className="w-[100%]">
      <div>
        {/* Tab Selector */}
        <div className="flex items-center justify-evenly border-b border-gray-200">
          <div
            onClick={forYouHandler}
            className={`${
              isActive
                ? "border-b-4 border-[#39ff14]"
                : "border-b-4 border-transparent"
            } cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3`}
          >
            <h1
              className={`${
                isActive ? "font-bold" : "font-normal"
              } text-gray-600 text-lg`}
            >
              For you
            </h1>
          </div>
          <div
            onClick={followingHandler}
            className={`${
              !isActive
                ? "border-b-4 border-[#39ff14]"
                : "border-b-4 border-transparent"
            } cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3`}
          >
            <h1
              className={`${
                !isActive ? "font-bold" : "font-normal"
              } text-gray-600 text-lg`}
            >
              Following
            </h1>
          </div>
        </div>

        {/* Post Input */}
        <div className="flex items-center p-4">
          <Avatar
            src={
              user?.profilePicture ||
              "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
            }
            size="40"
            round={true}
          />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full outline-none ml-2 border-none text-xl"
            type="text"
            placeholder="What's going on?"
          />
        </div>

        {/* Image Selection and Post Button */}
        <div className="flex items-center justify-between p-4 border-b border-gray-300">
          <div onClick={() => document.getElementById("imageInput").click()}>
            <FaImages size="24px" />
            <input
              id="imageInput"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </div>
          <button
            onClick={submitHandler}
            className="bg-[#39ff14] border-2 font-semibold tracking-wide border-black px-4 py-1 text-lg text-black rounded-full"
            disabled={loading} 
          >
            {loading ? "Posting..." : "Post"}
          </button>
        </div>

        {/* Image Preview Modal */}
        {isModalOpen && (
          <div className="z-10 fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-md shadow-lg w-11/12 max-w-md">
              <h2 className="text-center text-xl font-bold mb-4">
                Image Preview
              </h2>
              <div className="flex justify-center">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="max-w-full max-h-96 object-contain mb-4"
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-red-500"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmImage}
                  className="bg-[#39ff14] px-4 py-2 rounded text-black"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
