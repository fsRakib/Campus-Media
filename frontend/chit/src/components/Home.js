import React, { useEffect } from "react";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useOtherUser from "../hooks/useOtherUsers";
import useGetMyChit from "../hooks/useGetMyChit";

const Home = () => {
  const { user, otherUsers } = useSelector((store) => store.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  //custom Hook
  useOtherUser(user?._id);
  useGetMyChit(user?._id);

  return (
    <div className="flex justify-between w-[80%] mx-auto">
      <LeftSidebar />
      <Outlet />
      <RightSidebar otherUsers={otherUsers} />
    </div>
   
  );
};

export default Home;
