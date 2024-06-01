import React from "react";
import Avatar from "react-avatar";
import { TfiCommentsSmiley } from "react-icons/tfi";
import { PiHandshakeThin } from "react-icons/pi";
import { MdOutlineBookmarks } from "react-icons/md";

export const Chit = ({chit}) => {
  return (
    <div className="border-b border-gray-200">
      <div>
        <div className="flex p-4">
          <Avatar
            src="https://scontent.fdac146-1.fna.fbcdn.net/v/t39.30808-6/264822968_1727489967582990_5105872812101026616_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=lc786te_nIcQ7kNvgEumZ-A&_nc_ht=scontent.fdac146-1.fna&oh=00_AYCHWZcx8BWgYB_FQ4Siwxl3OEun67FhGmn0Wav66Ayqjg&oe=665CD47A"
            size="40"
            round={true}
          />
          <div className="ml-2 w-full">
            <div className="flex items-center ">
              <h1 className="font-bold">{chit?.userDetails[0]?.name}</h1>
              <p className="text-gray-500 text-sm ml-1">{`@${chit?.userDetails[0]?.username}`} . 1m</p>
            </div>
            <div>
              <p>{chit?.description}</p>
            </div>
            <div className="flex justify-between my-3">
              <div className="flex items-center">
                <div className="p-2 hover:bg-green-200 rounded-full cursor-pointer">
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
              <div className="flex items-center">
                <div className="p-2 hover:bg-green-200 rounded-full cursor-pointer">
                  <MdOutlineBookmarks size="24px" />
                </div>
                <p>0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
