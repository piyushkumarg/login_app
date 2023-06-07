import React from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../assets/profile.png";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { passwordValidate } from "../helper/validate";
import useFetch from "../hooks/fetch.hook";
import { useAuthStore } from "../store/store";
import {verifyPassword} from '../helper/helper'


import styles from "../styles/Username.module.css";

const Password = () => {

  const navigate = useNavigate()
  const { username } = useAuthStore((state) => state.auth);
  const [{ isLoading, apiData, serverError }] = useFetch(`/user/${username}`);


  const formik = useFormik({
    initialValues: {
      password: "admin@123",
    },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      //console.log(values);
      const loginPromise = verifyPassword({
        username,
        password: values.password,
      });

      toast.promise(loginPromise, {
        loading: "Checking...",
        success: <b>Login Successfully...!</b>,
        error: <b>Password Not Match!</b>,
      });

      loginPromise.then((res) => {
        const { token } = res.data;
        localStorage.setItem("token", token);
        navigate("/profile");
      });
    },
  });

  if(isLoading) return <h1 className="text-2xl font-bold ">isLoading</h1>
  if (serverError) return  <h1 className="text-xl text-red-500 "> {serverError.message} </h1>


  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="py-2 text-3xl font-bold">
              Hello {(apiData?.firstName || apiData?.username)}!
            </h4>
            <span className=" text-xl w-2/3 text-center text-gray-500">
              Explore more by contacting with us.
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <img
                src={apiData?.profile || avatar}
                alt="avtar"
                className="border-4 border-gray-100 w-[7rem] rounded-full shadow-lg cursor-pointer hover:border-gray-200"
              />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <input
                {...formik.getFieldProps("password")}
                type="text"
                placeholder="Password"
                className="border-0 px-3 py-2 rounded-xl w-3/4 shadow-sm text-lg"
              />
              <button
                type="submit"
                className="border bg-indigo-500 w-3/4 px-3 py-2 rounded-lg text-gray-50 text-xl shadow-sm text-center hover:bg-[#ff6a6a]"
              >
                Sign in
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Forgot Password{" "}
                <Link className="text-red-500" to="/recovery">
                  Recover Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Password;
