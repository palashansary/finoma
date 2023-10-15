import React, { useEffect, useState } from "react";

import { FcGoogle } from "react-icons/fc";

import { useFormik } from "formik";
import { signUpSchema } from "../schemas/validation";
import { auth } from "../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/authSlice";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

const initialValues = {
  email: "",
  password: "",
};

const SignUp = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (auth.currentUser) {
      navigate("/expenses");
    }
  }, [auth]);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: signUpSchema,
      onSubmit: async (values, action) => {
        setIsLoading(true);
        try {
          const res = await createUserWithEmailAndPassword(
            auth,
            values.email,
            values.password
          );
          const user = {
            uid: auth.currentUser.uid,
            email: auth.currentUser.email,
          };
          dispatch(setUser(user));
          navigate("/signIn");
        } catch (err) {
          alert(err.code);
        }
        setIsLoading(false);
        action.resetForm();
      },
    });

  return (
    <div>
      <div className="relative pb-[16px] h-full  w-[300px] sm:w-[340px] md:w-[360px] lg:w-[420px] text-center flex flex-col items-center   top-[50%] left-[50%] -translate-x-[50%] translate-y-[40%] md:translate-y-[50%] rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] text-black/[0.75] bg-black/[0.01]">
        <h1 className="pt-[10%] lg:pt-[8%] text-[2.2rem] font-semibold font-roboto">
          Sign Up Now
        </h1>
        <div className="mt-6 flex items-center justify-center gap-[16px] h-[38px] w-[260px] sm:[280px] md:w-[290px] lg:w-[300px] bg-black/[0.05] px-[4%] rounded-md cursor-pointer">
          <FcGoogle className="text-[22px]" />
          <button className="text-[18px] font-light">
            Sign in with google
          </button>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col  gap-y-5">
          <div>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              placeholder="Enter your email address"
              className="h-[32px] w-[260px] sm:[280px] md:w-[290px] lg:w-[300px] flex items-center bg-black/[0.05] px-4 outline-none rounded-md"
            />
            {errors.email && touched.email && (
              <p className="text-start text-red-600">{errors.email}</p>
            )}
          </div>
          <div>
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              placeholder="Enter your password"
              className="h-[32px] w-[260px] sm:[280px] md:w-[290px] lg:w-[300px] bg-black/[0.05] px-4 outline-none rounded-md"
            />
            {errors.password && touched.password && (
              <p className="text-start text-red-600">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="mt-2 h-[34px] w-[260px] sm:[280px] md:w-[290px] lg:w-[300px] flex justify-center items-center text-white text-[22px] font-semibold bg-green-500 px-4 outline-none rounded-md font-bricolage gap-4"
          >
            {isLoading && <Spinner />}
            Sign Up
          </button>
        </form>
        <p className="pt-2 text-black/[0.6]">
          Already Have an accout
          <span className="ml-2 text-blue-600 cursor-pointer">
            <Link to="/signIn">Sign In</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
