import { createSlice } from "@reduxjs/toolkit";
const chitSlice = createSlice({
  name: "chit",
  initialState: {
    chits: null,
    refresh: false,
    isActive: true,
  },
  reducers: {
    getAllChits: (state, action) => {
      state.chits = action.payload;
    },
    getRefresh: (state) => {
      state.refresh = !state.refresh;
    },
    getIsActive: (state, action) => {
      state.isActive = action.payload;
    },
  },
});
export const { getAllChits, getRefresh, getIsActive } = chitSlice.actions;
export default chitSlice.reducer;
