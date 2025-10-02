import React, { useState } from "react";
import axios from "../api/axios";
import { Link } from "react-router-dom";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    // Make this function async
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields");
    } else {
      setError("");
      console.log("Login successful");
    }

    try {
      const response = await axios.post("/login", { email, password });
      const token = response.data.token;
      localStorage.setItem('token', token); // Save token to localStorage
      window.location.href = '/home';
      
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen w-full bg-white pt-12 flex justify-center items-start sm:items-center p-6">
      <div className="w-full max-w-md relative z-10">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-900">Sign in to HealLink</h2>
          <p className="mt-1 text-sm text-gray-600">Welcome back. Please enter your details.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="email"
            >
              Email ID
            </label>
            <input
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email ID"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          {error && <p className="text-rose-600 text-sm">{error}</p>}
          <button
            className="w-full rounded-full bg-indigo-600 px-4 py-2 text-white font-medium shadow hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            type="submit"
          >
            Sign in
          </button>
        </form>
        <p className="text-gray-600 text-sm mt-4">
          Don't have an account?{" "}
          <Link className="text-indigo-600 hover:text-indigo-700" to="/register">
            Register here
          </Link>
        </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
