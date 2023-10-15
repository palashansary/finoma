import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { newExpenseSchema } from "../schemas/validation";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

const initialValues = {
  name: "",
  description: "",
  category: "",
  dateOfExpenses: "",
  amount: "",
};

const NewExpense = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state?.auth?.user);
  const userMail = useSelector((state) => state?.auth?.user?.email);
  const expenseCollectionRef = collection(db, "expenses");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (auth.currentUser) {
      navigate("/new");
    } else {
      navigate("/signIn");
    }
  }, [auth]);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: newExpenseSchema,
      onSubmit: async (values, action) => {
        setIsLoading(true);

        try {
          await addDoc(expenseCollectionRef, {
            ...values,
            updatedAt: serverTimestamp(),
            createdBy: userMail,
          });

          navigate("/expenses");
        } catch (err) {
          alert(err);
        }
        setIsLoading(false);
        action.resetForm();
      },
    });

  const handlerCancel = () => {
    navigate("/expenses");
  };

  return (
    <div className="mt-[140px] flex justify-center ">
      <div className="h-full flex flex-col items-center justify-center w-[340px] sm:w-[380px] md:w-[420px] lg:w-[440px] px-[10px]  pb-[30px] border rounded-md shadow-md bg-black/[0.01]">
        <h2 className="w-full sm:px-[2%] md:px-[4%]  text-start mt-4 mb-4 md:mb-6  text-[1.6rem] font-semibold ">
          Create New Expense
        </h2>
        <form
          onSubmit={handleSubmit}
          className="w-[300px] sm:w-[360px] md:w-[370px] lg:w-[380px]"
        >
          <div className="mb-4 flex flex-col gap-1 text-start">
            <label
              htmlFor="name"
              className="text-[14px] sm:text-[16px] md:text-[16px] font-semibold"
            >
              Name
            </label>
            <input
              className="bg-gray-300  px-4 py-1  text-black placeholder-black"
              id="name"
              type="text"
              name="name"
              value={values.name}
              placeholder="Name of the Expense"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.name && touched.name && (
              <p className="mt-1 text-start text-[12px] md:text-[14px]  ">
                {errors.name}
              </p>
            )}
          </div>
          <div className="mb-4 flex flex-col gap-1 text-start">
            <label
              htmlFor="description"
              className="text-[14px] sm:text-[16px] md:text-[16px] font-semibold"
            >
              Description
            </label>
            <input
              className="bg-gray-300 px-4 py-1 "
              id="description"
              type="text"
              value={values.description}
              name="description"
              placeholder="Describe the Expense"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.description && touched.description && (
              <p className="mt-1 text-start text-[12px] md:text-[14px] text-red-600 ">
                {errors.description}
              </p>
            )}
          </div>
          <div className="mb-4 flex flex-col gap-1 text-start">
            <label
              htmlFor="category"
              className="text-[14px] sm:text-[16px] md:text-[16px] font-semibold"
            >
              Category
            </label>
            <select
              name="category"
              value={values.category}
              className="bg-gray-300 px-4 py-1 placeholder-black"
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option>Select Category (drop down)</option>
              <option>Health</option>
              <option>Electronics</option>
              <option>Travel</option>
              <option>Education</option>
              <option>Books</option>
              <option>Others</option>
            </select>
            {errors.category && touched.category && (
              <p className="mt-1 text-start text-[12px] md:text-[14px] text-red-600 ">
                {errors.category}
              </p>
            )}
          </div>
          <div className="mb-4 flex flex-col gap-1 text-start">
            <label
              htmlFor="dateOfExpenses"
              className="text-[14px] sm:text-[16px] md:text-[16px] font-semibold"
            >
              Date of Expense
            </label>
            <input
              className="bg-gray-300 px-4 py-1 w-full "
              type="date"
              name="dateOfExpenses"
              value={values.dateOfExpenses}
              placeholder="Date of Expense"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.date && touched.date && (
              <p className="mt-1 text-start text-[12px] md:text-[14px] text-red-600 ">
                {errors.date}
              </p>
            )}
          </div>
          <div className="w-full mb-4 flex flex-col gap-1 text-start">
            <label
              htmlFor="amount"
              className="text-[14px] sm:text-[16px] md:text-[16px] font-semibold"
            >
              Expense Amount
            </label>
            <input
              className="bg-gray-300 px-4 py-1 placeholder-black"
              type="number"
              value={values.amount}
              name="amount"
              placeholder="Expense Amount IN INR"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.amount && touched.amount && (
              <p className="mt-1 text-start text-[12px] md:text-[14px] text-black ">
                {errors.amount}
              </p>
            )}
          </div>
          <div className="mt-6 flex justify-between">
            <button
              onClick={handlerCancel}
              className="px-8 py-1 bg-gray-600 text-white rounded-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-2 py-1 bg-green-600 text-white rounded-sm flex items-center gap-2 md:gap-4"
            >
              {isLoading && <Spinner />}
              Create Expense
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewExpense;
