import * as Yup from "yup";

export const newExpenseSchema = Yup.object({
  name: Yup.string().min(2).required("please enter the name of you expense"),
  description: Yup.string().min(5).required("please fill the description"),
  category: Yup.string().required(
    "kindly seleted the category from the given list"
  ),
  dateOfExpenses: Yup.date().required("kindly select a date of expense"),
  amount: Yup.number().positive().required("kindly put the amount"),
});

export const authSchema = Yup.object({
  email: Yup.string().email().required("please enter your email address"),
  password: Yup.string().min(6).max(8).required("please enter a password"),
});

export const signUpSchema = Yup.object({
  email: Yup.string().email().required("please enter your email address"),
  password: Yup.string().min(6).max(8).required("please enter a password"),
});
