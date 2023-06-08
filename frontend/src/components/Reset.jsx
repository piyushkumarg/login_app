import React from "react";
import { useNavigate, Navigate } from "react-router-dom";
import avatar from "../assets/profile.png";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { resetPasswordValidation } from "../helper/validate";

import styles from "../styles/Username.module.css";

const Reset = () => {
  const formik = useFormik({
    initialValues: {
      password: "admin@123",
      confirm_pwd: "admin@123",
    },
    validate: resetPasswordValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  return (
    <div className="container mx-auto ">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="py-2 text-3xl font-bold">Reset</h4>
            <span className="text-xl w-full text-center text-gray-500">
              Enter new password.
            </span>
          </div>

          <form className="py-20" onSubmit={formik.handleSubmit}>
            <div className="textbox flex flex-col items-center gap-6">
              <input
                {...formik.getFieldProps("password")}
                type="text"
                placeholder="New Password"
                className="border-0 px-3 py-2 rounded-xl w-3/4 shadow-sm text-lg"
              />
              <input
                {...formik.getFieldProps("confirm_pwd")}
                type="text"
                placeholder="Confirm Password"
                className="border-0 px-3 py-2 rounded-xl w-3/4 shadow-sm text-lg"
              />
              <button
                type="submit"
                className="border bg-indigo-500 w-3/4 py-2 rounded-lg text-gray-50 text-xl shadow-sm text-center hover:bg-[#ff6a6a]"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reset;
