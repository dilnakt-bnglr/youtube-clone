import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    const emptyInput = [];
    if (!userName) {
      emptyInput.push("userName");
    }
    if (!email) {
      emptyInput.push("email");
    }
    if (!password) {
      emptyInput.push("password");
    }
    if (emptyInput.length > 0) {
      setError(`Required fields are missing: ${emptyInput.join(",")}`);
      return;
    }
    const bodyObject = { userName, email, password };
    axios
      .post("http://localhost:5000/api/register", bodyObject)
      .then((data) => {
        setSuccessMsg("User Registration Successfull");
        setTimeout(() => {
          navigate("/signin");
        }, 3000);
      })
      .catch((error) => {
        const errorMsg =
          error?.response?.data?.message ||
          "An error occurred during registration.";
        setError(errorMsg);
      });
  };

  return (
    <div className="flex md:min-h-[calc(100vh-64px)] justify-center items-center">
      <div className="bg-white  p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <input
          type="text"
          placeholder="Name"
          value={userName}
          className="border-b-1 border-gray-300  p-3 rounded-lg w-full mb-4 "
          onChange={(e) => {
            setUserName(e.target.value);
            setError("");
          }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          className="border-b-1 border-gray-300  p-3 rounded-lg w-full mb-4 "
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          className="border-b-1 border-gray-300  p-3 rounded-lg w-full mb-6 "
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
        />
        {error && <p className="text-red-500 mb-5">{error}</p>}
        {successMsg && <p className="text-green-700 mb-5">{successMsg}</p>}
        <Link to="/signup">
          <button
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 cursor-pointer"
            onClick={handleRegister}
          >
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
