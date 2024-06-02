import axios from "axios";
import { CHIT_API_END_POINT } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllChits } from "../redux/chitSlice";

const useGetMyChit = (id) => {
  const dispatch = useDispatch();
  const { refresh, isActive } = useSelector((store) => store.chit);

  const fetchMyChit = async () => {
    try {
      const res = await axios.get(`${CHIT_API_END_POINT}/allchits/${id}`, {
        withCredentials: true,
      });
      console.log(res);
      dispatch(getAllChits(res.data.chits));
    } catch (error) {
      console.log(error);
    }
  };

  const followingChitHandler = async () => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.get(`${CHIT_API_END_POINT}/followingchits/${id}`);
      console.log(res);
      dispatch(getAllChits(res.data.chits));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (isActive) {
      fetchMyChit();
    } else {
      followingChitHandler();
    }
  }, [isActive, refresh]);
};

export default useGetMyChit;
