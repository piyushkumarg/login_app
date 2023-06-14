import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useAuthStore } from "../store/store";
import { generateOTP, verifyOTP } from "../helper/helper";
import { useNavigate } from "react-router-dom";

import styles from "../styles/Username.module.css";

const Recovery = () => {
  const { username } = useAuthStore((state) => state.auth);
  //console.log(username)
  const [OTP, setOTP] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    generateOTP(username).then((OTP) => {
      //console.log(OTP);
      if (OTP) return toast.success("OTP has been send to your email!");
      return toast.error("Problem while generating OTP!");
    });
  }, [username]);

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const { status } = await verifyOTP({ username, code: OTP });
      //console.log(status);
      
      if (status === 201) {
        toast.success("verify successfully");
        return navigate("/reset");
      }
    } catch (error) {
      return toast.error("wrong OTP! check email again!");
    }
  }

  //handle of resend OTP
  function resendOTP() {
    const sendPromise = generateOTP(username);

    toast.promise(sendPromise, {
      loading: "sending...!",
      success: <b>OTP has been send to your email!</b>,
      error: <b>Could not send it!</b>,
    });
    sendPromise.then((OTP) => {
     // console.log(OTP);
    });
  }

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

          <form className="pt-20" onSubmit={onSubmit}>
            <div className="textbox flex flex-col items-center gap-6">
              <div className="input flex flex-col text-center  w-4/5 ">
                <span className=" text-gray-500 py-2">
                  Enter 6 digit OTP sent to your email address.
                </span>
                <input
                  onChange={(e) => setOTP(e.target.value)}
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
          </form>
          <div className="text-center py-4">
            <span className="text-gray-500">
              Can't get OTP?{" "}
              <button onClick={resendOTP} className="text-red-500">
                Resend
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recovery;
