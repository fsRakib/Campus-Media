import React from "react";
import { CreatePost } from "./CreatePost";
import { Chit } from "./Chit";
import { useSelector } from "react-redux";

const Feed = () => {
  const { chits } = useSelector((store) => store.chit);

  // Sort chits by `createdAt` (newest first)
  const sortedChits = chits?.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="w-[50%] border border-gray-200">
      <CreatePost />
      {sortedChits?.map((chit) => (
        <Chit key={chit?._id} chit={chit} />
      ))}
    </div>
  );
};

export default Feed;
