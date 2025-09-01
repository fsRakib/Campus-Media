import axios from "axios";
import { CHIT_API_END_POINT } from "../utils/constant";
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllChits } from "../redux/chitSlice";

const useGetMyChit = (id) => {
  const dispatch = useDispatch();
  const { refresh, isActive } = useSelector((store) => store.chit);

  const fetchMyChit = useCallback(async () => {
    try {
      const res = await axios.get(`${CHIT_API_END_POINT}/allchits/${id}`, {
        withCredentials: true,
      });
      console.log(res);
      dispatch(getAllChits(res.data.chits));
    } catch (error) {
      console.log(error);
    }
  }, [id, dispatch]);

  const followingChitHandler = useCallback(async () => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.get(`${CHIT_API_END_POINT}/followingchits/${id}`);
      console.log(res);
      dispatch(getAllChits(res.data.chits));
    } catch (error) {
      console.log(error);
    }
  }, [id, dispatch]);
  useEffect(() => {
    if (isActive) {
      fetchMyChit();
    } else {
      followingChitHandler();
    }
  }, [isActive, refresh, fetchMyChit, followingChitHandler]);
};

export default useGetMyChit;
