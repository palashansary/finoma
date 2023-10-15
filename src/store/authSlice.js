import { createSlice } from "@reduxjs/toolkit";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isDashboardVisible: false,
    isLoading: true,
  },
  reducers: {
    setUser(state, action) {
      // console.log(action.payload);
      state.user = {
        uid: action.payload.uid,
        email: action.payload.email,
      };
    },

    removeUser(state) {
      state.user = null;
      state.isDashboardVisible = false;
    },

    openDashBoard(state) {
      if (state.user) {
        state.isDashboardVisible = true;
        console.log(state.isDashboardVisible);
      }
    },
    closeDashBoard(state) {
      if (state.user) {
        state.isDashboardVisible = false;
      }
    },
    setLoading(state) {
      state.isLoading = true;
    },

    closeLoading(state) {
      state.isLoading = false;
    },
  },
});

export const {
  setUser,
  removeUser,
  openDashBoard,
  closeDashBoard,
  setLoading,
  closeLoading,
} = authSlice.actions;

export default authSlice;
