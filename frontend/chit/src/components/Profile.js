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

export const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingBio, setIsEditingBio] = useState(false);

  const { user, profile } = useSelector((store) => store.user);
  const { id } = useParams();
  useGetProfile(id);
  const dispatch = useDispatch();

  // Trigger file input on avatar click
  const handleProfilePicClick = () => {
    document.getElementById("fileInput").click();
  };

  // Trigger file input on cover photo click
  const handleCoverPhotoClick = () => {
    document.getElementById("coverFileInput").click();
  };

  // Upload new profile picture
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await axios.post(
          `${USER_API_END_POINT}/uploadProfilePic/${user._id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        // Update the Redux state with the new profile picture URL
        const updatedUser = {
          ...user,
          profilePicture: res.data.profilePicture,
        };
        dispatch(updateUser(updatedUser));
        dispatch(updateProfile(updatedUser));

        toast.success("Profile picture updated successfully!");
      } catch (error) {
        toast.error(
          error.response?.data?.msg || "Failed to update profile picture"
        );
      }
    }
  };
  // Upload new cover photo
  const handleCoverFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await axios.post(
          `${USER_API_END_POINT}/uploadCoverPhoto/${user._id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        // Update the Redux state with the new cover photo URL
        const updatedUser = {
          ...user,
          coverPhoto: res.data.coverPhoto,
        };
        dispatch(updateUser(updatedUser));
        dispatch(updateProfile(updatedUser));

        toast.success("Cover photo updated successfully!");
      } catch (error) {
        toast.error(
          error.response?.data?.msg || "Failed to update cover photo"
        );
      }
    }
  };
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
        {/* Display Cover Photo */}
        <img
          src={
            profile?.coverPhoto ||
            "https://scontent.fdac146-1.fna.fbcdn.net/v/t1.6435-9/120173647_101691878372122_2748790512966999210_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=KtExtNMl5_8Q7kNvgGNxKpr&_nc_zt=23&_nc_ht=scontent.fdac146-1.fna&_nc_gid=AbAV6ClbxvvMR5nRaijR6uz&oh=00_AYDislIwPR__PjtNoqHkIfv0A4lRvR6mG9rv0X9sUjfMTA&oe=67552A43"
          }
          alt="cover"
          style={{ width: "700px", height: "210px" }}
          onClick={handleCoverPhotoClick}
          className="cursor-pointer"
        />
        <input
          type="file"
          id="coverFileInput"
          onChange={handleCoverFileChange}
          style={{ display: "none" }}
        />
        <div className="absolute top-52 ml-2 border-4 border-white rounded-full">
          <Avatar
            src={
              profile?.profilePicture ||
              "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
            }
            size="120"
            round
            onClick={handleProfilePicClick}
            className="cursor-pointer"
          />
          <input
            type="file"
            id="fileInput"
            onChange={handleFileChange}
            style={{ display: "none" }}
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
          <p className="text-lg">{profile?.bio || "Write you bio !..."}</p>
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
