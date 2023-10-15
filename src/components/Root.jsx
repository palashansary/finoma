// This is the root layout of the expense manger app . It Contains Nav component as a layer of all other components

import React, { useEffect } from "react";
import Nav from "./Nav";
import { Outlet, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";

import { useSelector, useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { setUser, setLoading, closeLoading } from "../store/authSlice";

const Root = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setLoading());

    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/expenses");
        dispatch(setUser({ uid: user.uid, email: user.email }));
      }
    });
    dispatch(closeLoading());
  }, []);
  return (
    <div>
      <Nav />
      <main>
        {!isLoading && <Outlet />}
        {isLoading && (
          <div className=" h-screen w-full flex justify-center items-center text-[1.7rem]  md:text-[2.5rem] lg:text-[3rem] font-semibold backdrop:blur-md">
            Loading...
          </div>
        )}
      </main>
    </div>
  );
};

export default Root;
