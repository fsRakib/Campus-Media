import React from "react";
import { TiArrowBackOutline } from "react-icons/ti";
import { Link, useParams } from "react-router-dom";
import Avatar from "react-avatar";
import { useSelector } from "react-redux";
import useGetProfile from "../hooks/useGetProfile";

export const Profile = () => {
  const { user, profile } = useSelector((store) => store.user);
  const { id } = useParams();
  useGetProfile(id);

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
          <button className="px-4 py-1 hover:bg-gray-200 rounded-full border border-gray-400">
            Edit Profile
          </button>
        </div>
        <div className="m-4">
          <h1 className="font-bold text-xl">{profile?.name}</h1>
          <p>{`@${profile?.username}`}</p>
        </div>
        <div className="m-4 text-sm">
          <p>
            Hi everyone. I am rakib. I like to hear music, watching movies and
            hiking with friends.
          </p>
        </div>
      </div>
    </div>
  );
};
