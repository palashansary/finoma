import React from "react";
import { signOut } from "firebase/auth";

import { IoMdClose } from "react-icons/io";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { removeUser, closeDashBoard } from "../store/authSlice";
import userImage from "../Images/userImage.png";

const LoginDashboard = ({ onClose }) => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const removeUserHandler = async () => {
    await signOut(auth);

    dispatch(removeUser());
    dispatch(closeDashBoard());
    navigate("/");
    console.log(auth.currentUser);
  };

  return (
    <div>
      <div className="h-[200px] w-[260px] sm:h-[240px] sm:w-[320px] md:h-[260px] md:w-[340px] lg:h-[280px] lg:w-[360px] rounded-2xl bg-blue-50 shadow-md text-center flex flex-col items-center justify-center z-50 relative">
        <IoMdClose
          className="absolute top-[8%] right-[4%] md:top-[8%] md:right-[8%] text-[22px] md:text-[24px] font-bold cursor-pointer"
          onClick={onClose}
        />
        <p className=" text-[15px] sm:text-[18px] text-black ">{user?.email}</p>
        <img
          src={userImage}
          alt="avatar"
          className="mt-[6%] h-[50px] w-[50px] md:h-[60px] md:w-[60px] lg:h-[80px] lg:w-[80px] rounded-full"
        />
        <h1 className="mt-[2%] text-[22px] md:text-[24px] lg:text-[25px] text-black">
          {`Hi, ${user?.username || user?.email}`}
        </h1>
        <button
          className="mt-[4%] h-[24px] w-[100px] md:h-[30px] md:w-[120px] flex items-center justify-center bg-red-600 text-[16px] md:text-[18px] font-semibold text-white rounded-md"
          onClick={removeUserHandler}
        >
          Sign out
        </button>
      </div>
    </div>
  );
};

export default LoginDashboard;
