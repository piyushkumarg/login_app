import React, { useState } from "react";
import { Link } from "react-router-dom";
import avatar from "../assets/profile.png";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { profileValidation } from "../helper/validate";
import convertToBase64 from "../helper/convert";
import useFetch from "../hooks/fetch.hook";
import {updateUser} from '../helper/helper'
import { useNavigate } from "react-router-dom";

import styles from "../styles/Username.module.css";

const Profile = () => {
  const [file, setFile] = useState();
  const [{ isLoading, apiData, serverError }] = useFetch();
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      firstName: apiData?.firstName || "",
      lastName: apiData?.lastName || "",
      mobile: apiData?.mobile || "",
      email: apiData?.email || "",
      address: apiData?.address || "",
    },
    enableReinitialize: true,
    validate: profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, {
        profile: file || apiData?.profile || "",
      });
      //console.log(values);

      const updatePromise = updateUser(values);

      toast.promise(updatePromise, {
        loading: "Updating...",
        success: <b>Update Successfully...!</b>,
        error: <b>Could not Update!</b>,
      });
    },
  });

  /**Formik doesn't support file upload so we need to create this handler*/

  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  //logout handler function
  function userLogout(){
    localStorage.removeItem('token')
    navigate('/')
  }

  if (isLoading) return <h1 className="text-2xl font-bold ">isLoading</h1>;
  if (serverError)
    return <h1 className="text-xl text-red-500 "> {serverError.message} </h1>;

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-3xl py-2 font-bold">Profile</h4>
            <span className="text-xl w-3/4 text-center text-gray-500">
              You can update the details.
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                <img
                  src={apiData?.profile || file || avatar}
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
              <div className="name flex gap-10 w-11/12 ">
                <input
                  {...formik.getFieldProps("firstName")}
                  type="text"
                  placeholder="first name"
                  className="border-0 rounded-xl w-full px-3 py-2  shadow-sm text-lg"
                />
                <input
                  {...formik.getFieldProps("lastName")}
                  type="text"
                  placeholder="last name"
                  className="border-0 px-3 py-2 rounded-xl w-full shadow-sm text-lg"
                />
              </div>

              <div className="name flex  gap-10 w-11/12 ">
                <input
                  {...formik.getFieldProps("mobile")}
                  type="text"
                  placeholder="Mobile No."
                  className="border-0 w-full px-3 py-2 rounded-xl shadow-sm text-lg"
                />
                <input
                  {...formik.getFieldProps("email")}
                  type="text"
                  placeholder="email"
                  className="border-0  rounded-xl w-full px-3 py-2shadow-sm text-lg"
                />
              </div>

              <input
                {...formik.getFieldProps("address")}
                type="text"
                placeholder="Address"
                className="border-0 px-3 py-2 rounded-xl w-11/12 shadow-sm text-lg"
              />
              <button
                type="submit"
                className="border bg-indigo-500 px-3 py-2 rounded-lg text-gray-50 text-xl shadow-sm w-11/12 text-center hover:bg-[#ff6a6a]"
              >
                Update
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Come back later?{"  "}
                <Link onClick={userLogout} className="text-red-500" to="/">
                  Logout
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
