import React from "react";
import { FaSearch } from "react-icons/fa";
import Avatar from "react-avatar";

const RightSidebar = ({ otherUsers }) => {
  return (
    <div className="w-[25%] ">
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
        {otherUsers?.map((user) => {
          return (
            <div className="flex items-center justify-between my-3">
              <div className="flex">
                <div>
                  <Avatar
                    src="https://scontent.fdac146-1.fna.fbcdn.net/v/t39.30808-6/264822968_1727489967582990_5105872812101026616_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=lc786te_nIcQ7kNvgEumZ-A&_nc_ht=scontent.fdac146-1.fna&oh=00_AYCHWZcx8BWgYB_FQ4Siwxl3OEun67FhGmn0Wav66Ayqjg&oe=665CD47A"
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
                <button className="px-4 py-1 bg-black text-white rounded-full">
                  Profile
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RightSidebar;
