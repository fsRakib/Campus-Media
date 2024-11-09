import React from "react";
import Avatar from "react-avatar";
import axios from "axios";
import { TfiCommentsSmiley } from "react-icons/tfi";
import { PiHandshakeThin } from "react-icons/pi";
import { MdOutlineBookmarks } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CHIT_API_END_POINT, USER_API_END_POINT } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getRefresh } from "../redux/chitSlice";
import { timeSince } from "../utils/constant";

export const Chit = ({ chit }) => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const likeOrDislikeHandler = async (id) => {
    try {
      const res = await axios.put(
        `${CHIT_API_END_POINT}/like/${id}`,
        { id: user?._id },
        {
          withCredentials: true,
        }
      );
      dispatch(getRefresh());
      toast.success(res.data.msg);
    } catch (error) {
      toast.success(error.response?.data?.msg || "Error liking post");
      console.log(error);
    }
  };

  const deleteChitHandler = async (id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.delete(`${CHIT_API_END_POINT}/delete/${id}`);
      console.log(res);
      dispatch(getRefresh());
      toast.success(res.data.msg);
    } catch (error) {
      toast.success(error.response?.data?.msg || "Error deleting post");
      console.log(error);
    }
  };

  const bookmarkHandler = async (id) => {
    try {
      const res = await axios.put(
        `${USER_API_END_POINT}/bookmark/${id}`,
        { id: user?._id },
        {
          withCredentials: true,
        }
      );
      dispatch(getRefresh());
      toast.success(res.data.msg);
    } catch (error) {
      toast.error(error.response?.data?.msg || "Error bookmarking post");
      console.log(error);
    }
  };

  return (
    <div className="border-b border-gray-200">
      <div>
        <div className="flex p-4">
          <Avatar
            src={chit?.userDetails[0]?.profilePicture}
            size="40"
            round={true}
          />
          <div className="ml-2 w-full">
            <div className="flex items-center">
              <h1 className="font-bold">{chit?.userDetails[0]?.name}</h1>
              <p className="text-gray-500 text-sm ml-1">
                {`@${chit?.userDetails[0]?.username} . ${timeSince(
                  chit?.createdAt
                )}`}
              </p>
            </div>
            <div>
              <p>{chit?.description}</p>
            </div>
            {chit?.imageUrl && ( 
              <div className="mt-2">
                <img
                  src={chit.imageUrl}
                  alt="Chit post"
                  className="max-w-full rounded-lg"
                />
              </div>
            )}
            <div className="flex justify-between my-3">
              <div className="flex items-center">
                <div
                  onClick={() => likeOrDislikeHandler(chit?._id)}
                  className="p-2 hover:bg-green-200 rounded-full cursor-pointer"
                >
                  <PiHandshakeThin size="24px" />
                </div>
                <p>{chit?.like?.length}</p>
              </div>
              <div className="flex items-center">
                <div className="p-2 hover:bg-green-200 rounded-full cursor-pointer">
                  <TfiCommentsSmiley size="24px" />
                </div>
                <p>0</p>
              </div>
              <div
                onClick={() => bookmarkHandler(chit?._id)}
                className="flex items-center"
              >
                <div className="p-2 hover:bg-green-200 rounded-full cursor-pointer">
                  <MdOutlineBookmarks size="24px" />
                </div>
                {/* <p>{user?.bookmarks?.length}</p> */}
              </div>
              {user?._id === chit?.userId && (
                <div
                  onClick={() => deleteChitHandler(chit?._id)}
                  className="flex items-center"
                >
                  <div className="p-2 hover:bg-red-300 rounded-full cursor-pointer">
                    <RiDeleteBin6Line size="24px" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
