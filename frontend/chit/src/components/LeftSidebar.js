import React from "react";
import { TbBrandGoogleHome } from "react-icons/tb";
import { SiHashicorp } from "react-icons/si";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { GrUserManager } from "react-icons/gr";
import { FaBookBookmark } from "react-icons/fa6";
import { TbLogout2 } from "react-icons/tb";
import { Link } from "react-router-dom";

const LeftSidebar = () => {
  return (
    <div className="w-[20%]">
      <div>
        <div>
          <img
            className="ml-5"
            width={"44px"}
            src="https://previews.123rf.com/images/captainvector/captainvector1703/captainvector170309945/74377645-university-logo-element.jpg"
            alt="campus logo"
          />
        </div>
        <div className="my-4">
          <Link to="/" className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full">
            <div>
              <TbBrandGoogleHome size="24px" />
            </div>
            <h1 className="font-bold text-lg ml-2">Home</h1>
          </Link>
          <div className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full">
            <div>
              <SiHashicorp size="24px" />
            </div>
            <h1 className="font-bold text-lg ml-2">Explore</h1>
          </div>
          <div className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full">
            <div>
              <MdOutlineNotificationsActive size="25px" />
            </div>
            <h1 className="font-bold text-lg ml-2">Notifications</h1>
          </div>
          <Link to="/profile" className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full">
            <div>
              <GrUserManager size="24px" />
            </div>
            <h1 className="font-bold text-lg ml-2">Profile</h1>
          </Link>
          <div className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full">
            <div>
              <FaBookBookmark size="24px" />
            </div>
            <h1 className="font-bold text-lg ml-2">Bookmarks</h1>
          </div>
          <div className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full">
            <div>
              <TbLogout2 size="25px" />
            </div>
            <h1 className="font-bold text-lg ml-2">Logout</h1>
          </div>
          <button className="px-4 py-2 border-none text-md bg-[#39ff14] w-full rounded-full text-black font-bold">
          Post
        </button>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
