"use client";
import { useState } from "react";
import { login } from "@/services/api";
import axios from "axios";
import Cookies from "js-cookie";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await login({ username, password });
      setMessage("User logged in successfully");
      console.log(response);
      Cookies.set("auth_token", response.access_token, { expires: 365 });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage(`Error: ${error.response?.data.message || "Unknown error"}`);
      } else {
        setMessage("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded text-black"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded text-black"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Login
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};
export default Login;
