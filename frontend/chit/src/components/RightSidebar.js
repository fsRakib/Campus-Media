import React from "react";
import { FaSearch } from "react-icons/fa";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";

const RightSidebar = ({ otherUsers }) => {
  return (
    <div className="w-[25%]">
      <div className="flex items-center p-2 bg-gray-100 rounded-full outline-none w-full">
        <FaSearch size="22px" />
        <input
          type="text"
          className="bg-transparent outline-none px-2"
          placeholder="Search"
        />
      </div>
      <div className="p-4 my-4 bg-gray-100 rounded-2xl">
        <h1 className="font-bold text-lg">You may follow</h1>
        {otherUsers?.map((user) => (
          <div key={user._id} className="flex items-center justify-between my-3">
            <div className="flex">
              <div>
                <Avatar
                  src={user.profilePicture || "https://via.placeholder.com/150"}
                  size="40"
                  round={true}
                />
              </div>
              <div className="ml-2">
                <h1 className="font-bold">{user?.name}</h1>
                <p className="text-sm">{`@${user?.username}`}</p>
              </div>
            </div>
            <div>
              <Link to={`/profile/${user._id}`}>
                <button className="px-4 py-1 bg-black text-white rounded-full">
                  Profile
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RightSidebar;
