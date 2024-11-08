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
  const { user } = useSelector((store) => store.user);
  const { isActive } = useSelector((store) => store.chit);
  const dispatch = useDispatch();

  const submitHandler = async () => {
    try {
      const res = await axios.post(
        `${CHIT_API_END_POINT}/create`,
        { description, id: user?._id },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch(getRefresh());
      if (res.data.success) {
        toast.success(res.data.msg);
      }
    } catch (error) {
      toast.error(error.response.data.msg);
      console.log(error);
    }
    setDescription("");
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
        <div>
          <div className="flex items-center p-4">
            <div>
              <Avatar
               src={user?.profilePicture || "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"}
                size="40"
                round={true}
              />
            </div>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full outline-none ml-2 border-none text-xl"
              type="text"
              placeholder="Whats going !..."
            />
          </div>
          <div className="flex items-center justify-between p-4 border-b border-gray-300">
            <div>
              <FaImages size="24px" />
            </div>
            <button
              onClick={submitHandler}
              className="bg-[#39ff14] px-4 py-1 text-lg text-black border-none rounded-full"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
