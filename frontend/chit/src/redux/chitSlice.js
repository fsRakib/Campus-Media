import { createSlice } from "@reduxjs/toolkit";
const chitSlice = createSlice({
  name: "chit",
  initialState: {
    chits: null,
    refresh: false,
  },
  reducers: {
    getAllChits: (state, action) => {
      state.chits = action.payload;
    },
    getRefresh: (state) => {
      state.refresh = !state.refresh;
    },
  },
});
export const { getAllChits, getRefresh } = chitSlice.actions;
export default chitSlice.reducer;
