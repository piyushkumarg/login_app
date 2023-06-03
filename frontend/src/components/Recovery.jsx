import React from "react";

import { Toaster } from "react-hot-toast";

import styles from "../styles/Username.module.css";

const Recovery = () => {
  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="py-2 text-3xl font-bold">Recovery</h4>
            <span className="text-xl w-2/3 text-center text-gray-500">
              Enter OTP to recover password
            </span>
          </div>

          <form className="pt-20">
            <div className="textbox flex flex-col items-center gap-6">
              <div className="input flex flex-col text-center  w-4/5 ">
                <span className=" text-gray-500 py-2">
                  Enter 6 digit OTP sent to your email address.
                </span>
                <input
                  type="text"
                  placeholder="OTP"
                  className="border-0 px-3 py-2 rounded-xl  shadow-sm text-lg"
                />
              </div>
              <button
                type="submit"
                className="border bg-indigo-500 w-4/5 py-2 rounded-lg text-gray-50 text-xl shadow-sm text-center hover:bg-[#ff6a6a]"
              >
                Recover
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Can't get OTP? <button className="text-red-500">Resend</button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Recovery;
