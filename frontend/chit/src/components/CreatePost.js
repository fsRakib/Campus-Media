import React from "react";
import Avatar from "react-avatar";
import { FaImages } from "react-icons/fa6";

export const CreatePost = () => {
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
        <div >
          <div className="flex items-center p-4">
            <div>
              <Avatar
                src="https://scontent.fdac146-1.fna.fbcdn.net/v/t39.30808-6/264822968_1727489967582990_5105872812101026616_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=lc786te_nIcQ7kNvgEumZ-A&_nc_ht=scontent.fdac146-1.fna&oh=00_AYCHWZcx8BWgYB_FQ4Siwxl3OEun67FhGmn0Wav66Ayqjg&oe=665CD47A"
                size="40"
                round={true}
              />
            </div>
            <input
              className="w-full outline-none ml-2 border-none text-xl"
              type="text"
              placeholder="Whats going !..."
            />
          </div>
          <div className="flex items-center justify-between p-4 border-b border-gray-300">
            <div>
                <FaImages size="24px"/>
            </div>
            <button className="bg-[#39ff14] px-4 py-1 text-lg text-black border-none rounded-full">Post</button>
          </div>
        </div>
      </div>
    </div>
  );
};
