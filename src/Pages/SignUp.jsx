import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../Components/Shared/Loading";

function SignUp() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Function to handle user registration
  const handleRegister = () => {
    // Input validation
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
    // API call to register the user
    const bodyObject = { userName, email, password };
    setIsLoading(true);
    axios
      .post("http://localhost:5000/api/register", bodyObject)
      .then((data) => {
        setIsLoading(false);
        setSuccessMsg("User Registration Successfull");
        setTimeout(() => {
          navigate("/signin");
        }, 1000);
      })
      .catch((error) => {
        // Handle error response from the server
        setIsLoading(false);
        const errorMsg =
          error?.response?.data?.message ||
          "An error occurred during registration.";
        setError(errorMsg);
      });
  };

  return (
    <div className="flex md:min-h-[calc(100vh-64px)] justify-center items-center">
      {isLoading && <Loading />}
      <div className="bg-white  p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <input
          type="text"
          placeholder="Name"
          value={userName}
          className="border-b-1 border-gray-300  p-3 rounded-lg w-full mb-4 "
          onChange={(e) => {
            setUserName(e?.target?.value?.trim());
            setError("");
          }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          className="border-b-1 border-gray-300  p-3 rounded-lg w-full mb-4 "
          onChange={(e) => {
            setEmail(e?.target?.value?.trim());
            setError("");
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          className="border-b-1 border-gray-300  p-3 rounded-lg w-full mb-6 "
          onChange={(e) => {
            setPassword(e?.target?.value?.trim());
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
