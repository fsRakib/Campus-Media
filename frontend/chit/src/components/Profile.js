import React, { useEffect, useState } from "react";
import { TiArrowBackOutline } from "react-icons/ti";
import { Link, useParams } from "react-router-dom";
import Avatar from "react-avatar";
import { useDispatch, useSelector } from "react-redux";
import useGetProfile from "../hooks/useGetProfile";
import axios from "axios";
import toast from "react-hot-toast";
import { USER_API_END_POINT } from "../utils/constant";
import { followingUpdate, updateUser, updateProfile } from "../redux/userSlice";
import { getRefresh } from "../redux/chitSlice";

export const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingBio, setIsEditingBio] = useState(false);

  const { user, profile } = useSelector((store) => store.user);
  const { id } = useParams();
  useGetProfile(id);
  const dispatch = useDispatch();

  const followAndUnfollowHandler = async () => {
    if (user.following.includes(id)) {
      //unfollow

      try {
        axios.defaults.withCredentials = true;
        const res = await axios.post(`${USER_API_END_POINT}/unfollow/${id}`, {
          id: user?._id,
        });
        console.log(res);
        dispatch(followingUpdate(id));
        // dispatch(getRefresh());
        toast.success(res.data.msg);
      } catch (error) {
        toast.error(error.response.data.msg);
        console.log(error);
      }
    } else {
      //follow
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.post(`${USER_API_END_POINT}/follow/${id}`, {
          id: user?._id,
        });
        console.log(res);
        dispatch(followingUpdate(id));
        // dispatch(getRefresh());
        toast.success(res.data.msg);
      } catch (error) {
        toast.error(error.response.data.msg);
        console.log(error);
      }
    }
  };

  // Handlers for updating name and username
  const [newName, setNewName] = useState(profile?.name || "");
  const [newUsername, setNewUsername] = useState(profile?.username || "");

  useEffect(() => {
    if (profile) {
      setNewName(profile.name);
      setNewUsername(profile.username);
    }
  }, [profile]);

  axios.defaults.withCredentials = true;

  const updateProfileHandler = async () => {
    try {
      const res = await axios.put(
        `${USER_API_END_POINT}/updateProfile/${user._id}`,
        { name: newName, username: newUsername }
      );

      toast.success(res.data.msg);
      dispatch(updateUser(res.data.user));
      dispatch(updateProfile(res.data.user));
      setIsEditing(false);
    } catch (error) {
      toast.error(error.response.data.msg);
      console.log(error);
    }
  };

  const [newBio, setNewBio] = useState(profile?.bio || "");

  useEffect(() => {
    if (profile) {
      setNewBio(profile.bio);
    }
  }, [profile]);

  const updateBioHandler = async () => {
    try {
      const res = await axios.put(`${USER_API_END_POINT}/updateBio`, {
        bio: newBio,
      });

      toast.success(res.data.msg);
      dispatch(updateProfile({ ...profile, bio: newBio }));
      setIsEditingBio(false); // Hide the textarea after saving the bio
    } catch (error) {
      toast.error(error.response.data.msg);
      console.log(error);
    }
  };

  return (
    <div className="w-[50%] border-l border-r border-gray-200">
      <div>
        <div className="flex items-center py-2">
          <Link
            to="/"
            className="p-2 rounded-full hover:bg-gray-100 hover:cursor-pointer"
          >
            <TiArrowBackOutline size="24px" />
          </Link>
          <div>
            <h1 className="font-bold text-lg">{profile?.name} </h1>
            <p className="text-gray-500 text-sm">10 post</p>
          </div>
        </div>
        <img
          src="https://i.pinimg.com/originals/c1/5f/d1/c15fd13180df7eaa55aaa6960e7cc090.jpg"
          alt="banner"
          style={{ width: "700px", height: "210px" }}
        />
        <div className="absolute top-52 ml-2 border-4 border-white rounded-full">
          <Avatar
            src="data:image/jpeg;base64,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"
            size="120"
            round={true}
          />
        </div>
        <div className="text-right m-4">
          {profile?._id === user?._id ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-1 hover:bg-gray-200 rounded-full border border-gray-400"
            >
              Edit Profile
            </button>
          ) : (
            <button
              onClick={followAndUnfollowHandler}
              className="px-4 py-1 bg-black text-white rounded-full "
            >
              {user.following.includes(id) ? "Following" : "Follow"}
            </button>
          )}
        </div>
        <div className="m-4">
          <h1 className="font-bold text-xl">{profile?.name}</h1>
          <p className="font-semibold">{`@${profile?.username}`}</p>
        </div>
        <div className="m-4 text-sm">
          <p>{profile?.bio || "Add bio .."}</p>
        </div>

        {profile?._id === user?._id && (
          <div className="m-4">
            <button
              onClick={() => setIsEditingBio(true)}
              className="bg-[#39ff14] font-semibold border border-black px-4 py-2  text-black rounded-full hover:bg-blue-600 transition duration-300"
            >
              Update Bio
            </button>
            {isEditingBio && (
              <div className="mt-4">
                <textarea
                  value={newBio}
                  onChange={(e) => setNewBio(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  rows="4"
                  placeholder="Enter your bio"
                />
                <button
                  onClick={updateBioHandler}
                  className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
                >
                  Save Bio
                </button>
              </div>
            )}
          </div>
        )}

        {isEditing && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 hover:ring-2 hover:ring-green-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium mb-2"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 hover:ring-2 hover:ring-green-500"
                />
              </div>
              <button
                onClick={updateProfileHandler}
                className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition duration-300"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="w-full mt-4 bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
