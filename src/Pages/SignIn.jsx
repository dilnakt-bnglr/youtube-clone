import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUser } from "../Store/userSlice.js";
import Loading from "../Components/Shared/Loading.jsx";
import { API_BASE_URL } from "../utils/apiConfig";

function SignIn() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Function to handle user login
  const handleLogin = () => {
    // Input validation
    const emptyInput = [];
    if (!user) {
      emptyInput.push("userName or Email");
    }

    if (!password) {
      emptyInput.push("password");
    }
    if (emptyInput.length > 0) {
      setError(`Required fields are missing: ${emptyInput.join(",")}`);
      return;
    }
    // API call to log in the user
    const bodyObject = { user, password };
    setIsLoading(true);
    axios
      .post(`${API_BASE_URL}/api/login`, bodyObject)
      .then((response) => {
        setIsLoading(false);
        navigate("/");
        const userDetails = {
          user: response.data.user.name,
          token: response.data.token,
          id: response.data.user.userId,
        };
        // Storing user details in local storage
        localStorage.setItem("userName", JSON.stringify(userDetails.user));
        localStorage.setItem("token", JSON.stringify(userDetails.token));
        localStorage.setItem("userId", JSON.stringify(userDetails.id));
        // updating the Redux store
        dispatch(updateUser({ data: userDetails }));
      })
      .catch((error) => {
        setIsLoading(false);
        const errorMsg =
          error?.response?.data?.message || "An error occurred during login.";
        setError(errorMsg);
      });
  };
  return (
    <div className="flex md:min-h-[calc(100vh-64px)] justify-center items-center">
      {isLoading && <Loading />}
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Welcome back,</h2>
        <input
          type="text"
          placeholder="Username or Email"
          value={user}
          className="border-b-1 border-gray-300  p-3 rounded-lg w-full mb-4 "
          onChange={(e) => {
            setUser(e?.target?.value?.trim());
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

        <button
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 cursor-pointer"
          onClick={handleLogin}
        >
          Sign In
        </button>

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
