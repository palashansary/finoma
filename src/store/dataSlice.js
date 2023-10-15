import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "data",
  initialState: {
    data: null,
  },

  reducers: {
    setUserData(state, action) {
      state.data = action.payload;
    },

    removeUserData(state) {
      state.data = null;
    },
  },
});

export const { setUserData, removeUserData } = dataSlice.actions;

export default dataSlice;
