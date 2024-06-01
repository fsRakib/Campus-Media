import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import chitSlice from "./chitSlice";

const store = configureStore({
  reducer: {
    //slice
    user: userSlice,
    chit: chitSlice,
  },
});
export default store;
