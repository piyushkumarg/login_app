import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../assets/profile.png";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { usernameValidate } from "../helper/validate";
import { useAuthStore } from "../store/store";

import styles from "../styles/Username.module.css";

const Username = () => {

  const navigate = useNavigate();
  const setUsername = useAuthStore((state) => state.setUsername);
  
  const formik = useFormik({
    initialValues: {
      username: "example123",
    },
    validate: usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      setUsername(values.username);
      navigate("/password");
      //console.log(values);
    },
  });

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="py-2 text-3xl font-bold">Hello Again!</h4>
            <span className=" text-xl w-4/5 text-center text-gray-500">
              Explore more by contacting with us.
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <img
                src={avatar}
                alt="avtar"
                className="border-4 border-gray-100 w-[7rem] rounded-full shadow-lg cursor-pointer hover:border-gray-200"
              />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <input
                {...formik.getFieldProps("username")}
                type="text"
                placeholder="Username"
                className="border-0 px-3 py-2 rounded-xl w-3/4 shadow-sm text-lg"
              />
              <button
                type="submit"
                className="border bg-indigo-500 w-3/4 py-2 rounded-lg text-gray-50 text-xl shadow-sm text-center hover:bg-[#ff6a6a]"
              >
                Let's go
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Not a Member{" "}
                <Link className="text-red-500" to="/register">
                  Register Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Username;
