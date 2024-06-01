import React, { useState } from "react";
import Avatar from "react-avatar";
import { FaImages } from "react-icons/fa6";
import axios from "axios";
import { CHIT_API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import store from "../redux/store";
import { getRefresh } from "../redux/chitSlice";

export const CreatePost = () => {
  const [description, setDescription] = useState("");
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const submitHandler = async () => {
    try {
      const res = await axios.post(
        `${CHIT_API_END_POINT}/create`,
        { description, id: user?._id },
        {
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
  return (
    <div className="w-[100%]">
      <div>
        <div className="flex items-center justify-evenly border-b border-gray-200">
          <div className="cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3">
            <h1 className="font-semibold text-gray-600 text-lg">For you</h1>
          </div>
          <div className="cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3">
            <h1 className="font-semibold text-gray-600 text-lg">Following</h1>
          </div>
        </div>
        <div>
          <div className="flex items-center p-4">
            <div>
              <Avatar
                src="https://scontent.fdac146-1.fna.fbcdn.net/v/t39.30808-6/264822968_1727489967582990_5105872812101026616_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=lc786te_nIcQ7kNvgEumZ-A&_nc_ht=scontent.fdac146-1.fna&oh=00_AYCHWZcx8BWgYB_FQ4Siwxl3OEun67FhGmn0Wav66Ayqjg&oe=665CD47A"
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
