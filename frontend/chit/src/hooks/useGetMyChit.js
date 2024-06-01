import axios from "axios";
import { CHIT_API_END_POINT } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllChits } from "../redux/chitSlice";
import store from "../redux/store";

const useGetMyChit = (id) => {
  const dispatch = useDispatch();
  const {refresh} = useSelector(store=>store.chit)
  useEffect(() => {
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
    fetchMyChit();
  }, [refresh]);
};

export default useGetMyChit;
