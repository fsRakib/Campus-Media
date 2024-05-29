import React, { useState } from "react";

export const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const loginSignupHandler = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex items-center justify-evenly w-[80%]">
        <div>
          <img
            className="ml-5"
            width={"600px"}
            src="https://previews.123rf.com/images/captainvector/captainvector1703/captainvector170309945/74377645-university-logo-element.jpg"
            alt="campus logo"
          />
        </div>
        <div>
          <div className="my-5">
            <h1 className="font-bold text-5xl">Go Ahead !...</h1>
          </div>
          <h1 className="mt-4 mb-2 text-2xl font-bold">
            {isLogin ? "Login" : "Register"}
          </h1>
          <form className="flex flex-col w-[82%]">
            {!isLogin && (
              <>
                <input
                  type="text"
                  placeholder="Name"
                  className="outline-green-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold"
                />
                <input
                  type="text"
                  placeholder="Username"
                  className="outline-green-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold"
                />
              </>
            )}

            <input
              type="text"
              placeholder="Email"
              className="outline-green-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold"
            />
            <input
              type="text"
              placeholder="Password"
              className="outline-green-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold"
            />

            <button className="bg-[#39ff14] border-none py-2 my-4 rounded-full text-lg text-black">
            {isLogin ? "Login" : "Create Account"}
            </button>
            <h1>
              {isLogin
                ? "Do not have an account? "
                : "Already have an account? "}
              <span
                onClick={loginSignupHandler}
                className="font-bold text-green-600 cursor-pointer"
              >
                {isLogin ? "Register" : "Login"}
              </span>
            </h1>
          </form>
        </div>
      </div>
    </div>
  );
};
