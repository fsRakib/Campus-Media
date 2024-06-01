import React from "react";
import { CreatePost } from "./CreatePost";
import { Chit } from "./Chit";
import { useSelector } from "react-redux";

const Feed = () => {
  const { chits } = useSelector((store) => store.chit);
  return (
    <div className="w-[50%] border border-gray-200">
      <div>
        <CreatePost />
        {chits?.map((chit) => 
          <Chit key={chit?._id} chit={chit} />
        )}
      </div>
    </div>
  );
};

export default Feed;
