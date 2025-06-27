import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      username,
      password,
    };
    const res = await axios.post(
      "http://localhost:3000/api/users/login",
      userData
    );
    if (res.status === 200) {
      alert("Logged in Successfully");
      //saving token to local storage
    localStorage.setItem("token", res.data.token);
      navigate("/notes");
      setUsername("");
      setPassword("");
    } else {
      alert("Error creating user");
    }
  };
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 flex flex-col gap-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Log In
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
            />

            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
            />
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition duration-300"
            >
              Log in
            </button>
          </div>
        </form>
        <p className="text-center text-sm text-gray-500">
          Not have an account?{" "}
          <span onClick={()=>navigate('/signup')} className="text-indigo-600 hover:underline cursor-pointer">
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}
