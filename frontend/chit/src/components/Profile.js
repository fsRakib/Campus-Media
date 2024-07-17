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
            src="https://scontent.fdac146-1.fna.fbcdn.net/v/t39.30808-6/264822968_1727489967582990_5105872812101026616_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=lc786te_nIcQ7kNvgEumZ-A&_nc_ht=scontent.fdac146-1.fna&oh=00_AYCHWZcx8BWgYB_FQ4Siwxl3OEun67FhGmn0Wav66Ayqjg&oe=665CD47A"
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
          <p>{`@${profile?.username}`}</p>
        </div>
        <div className="m-4 text-sm">
          <p>{profile?.bio || "Add bio .."}</p>
        </div>

        {profile?._id === user?._id && (
          <div className="m-4">
            <button
              onClick={() => setIsEditingBio(true)}
              className="bg-[#39ff14] px-4 py-2  text-black rounded-full hover:bg-blue-600 transition duration-300"
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
