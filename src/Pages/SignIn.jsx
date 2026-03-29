import React from "react";
import { Link } from "react-router-dom";

function SignIn() {
  return (
    <div className="flex md:min-h-[calc(100vh-64px)] justify-center items-center">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Welcome back,</h2>
        <input
          type="text"
          placeholder="Username or Email"
          className="border-b-1 border-gray-300  p-3 rounded-lg w-full mb-4 "
        />
        <input
          type="password"
          placeholder="Password"
          className="border-b-1 border-gray-300  p-3 rounded-lg w-full mb-6 "
        />
        <Link to="/signup">
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 cursor-pointer">
            Sign In
          </button>
        </Link>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
