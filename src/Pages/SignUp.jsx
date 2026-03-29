import React from "react";
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <div className="flex md:min-h-[calc(100vh-64px)] justify-center items-center">
      <div className="bg-white  p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <input
          type="text"
          placeholder="Name"
          className="border-b-1 border-gray-300  p-3 rounded-lg w-full mb-4 "
        />
        <input
          type="email"
          placeholder="Email"
          className="border-b-1 border-gray-300  p-3 rounded-lg w-full mb-4 "
        />
        <input
          type="password"
          placeholder="Password"
          className="border-b-1 border-gray-300  p-3 rounded-lg w-full mb-6 "
        />
        <Link to="/signup">
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 cursor-pointer">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
