import React, { useState } from "react";
import axios from "axios";

const LoginForm = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post("https://localhost:7251/api/Users/login?username=Puneet6693&password=puneet123", {
            username: formData.username,
            password: formData.password
        });

        setMessage(`Login successful! Token: ${response.data.token}`);
    } catch (error) {
        console.error("Login error:", error.response?.data || error.message);
        setMessage("Login failed: " + (error.response?.data?.message || "Server error"));
    }
};




  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-md shadow-md w-96">
        <h2 className="text-lg font-bold mb-4 text-center">Login</h2>
        {message && <p className="text-red-600 text-center">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full px-4 py-2 border rounded-md"
            onChange={handleChange}
            value={formData.username}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-md"
            onChange={handleChange}
            value={formData.password}
            required
          />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
