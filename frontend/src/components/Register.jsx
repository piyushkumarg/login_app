import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../assets/profile.png";
import toast,{ Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { registerValidation } from "../helper/validate";
import convertToBase64 from '../helper/convert'
import {registerUser} from '../helper/helper'

import styles from "../styles/Username.module.css";

const Register = () => {

  const navigate =  useNavigate()
  const [file, setFile] = useState()

  const formik = useFormik({
    initialValues: {
      email: "example@gmail.com",
      username: "example",
      password: "admin@123",
    },
    validate: registerValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, { profile: file || "" });
      //console.log(values);
      const registerPromise = registerUser(values);
      toast.promise(registerPromise, {
        loading: 'creating...',
        success: <b>Register successfully...!</b>,
        error: <b>coult not register</b>
      })
      
      registerPromise.then(function(){navigate('/')})
    },
  });

  /**Formik doesn't support file upload so we need to create this handler*/

  const onUpload = async e => {
     const base64 = await convertToBase64(e.target.files[0]);
     setFile(base64);
  }

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="py-2 text-3xl font-bold">Register</h4>
            <span className="text-xl w-3/4 text-center text-gray-500">
              Happy to join you!
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                <img
                  src={file || avatar}
                  alt="avtar"
                  className="border-4 border-gray-100 w-[7rem] rounded-full shadow-lg cursor-pointer hover:border-gray-200"
                />
              </label>
              <input
                onChange={onUpload}
                type="file"
                id="profile"
                name="profile"
              />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <input
                {...formik.getFieldProps("email")}
                type="text"
                placeholder="email"
                className="border-0  px-3 py-2 rounded-xl w-3/4 shadow-sm text-lg"
              />
              <input
                {...formik.getFieldProps("username")}
                type="text"
                placeholder="username"
                className="border-0 px-3 py-2 rounded-xl w-3/4 shadow-sm text-lg"
              />
              <input
                {...formik.getFieldProps("password")}
                type="text"
                placeholder="password"
                className="border-0 px-3 py-2 rounded-xl w-3/4 shadow-sm text-lg"
              />
              <button
                type="submit"
                className="border bg-indigo-500 w-3/4 py-2 rounded-lg text-gray-50 text-xl shadow-sm text-center hover:bg-[#ff6a6a]"
              >
                Register
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Already Register?{" "}
                <Link className="text-red-500" to="/">
                  Login Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
