import React, { useState } from "react";
import axios from "axios";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const validate = () => {
    let tempErrors = {};
    if (!formData.username.trim()) tempErrors.username = "Full Name is required!";
    if (!formData.email.trim()) tempErrors.email = "Email is required!";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "Invalid email format!";
    if (!formData.password.trim()) tempErrors.password = "Password is required!";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await axios.post("https://localhost:7251/register", formData);
      console.log(response.data);
      setMessage(`Success! Welcome, ${formData.username}!`);
      setFormData({ username: "", email: "", password: "" }); // Reset form correctly
      setErrors({});
    } catch (error) {
      setMessage("Error submitting form: " + error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
  <div className="bg-white p-6 rounded-md shadow-md w-96">
    <h2 className="text-lg font-bold mb-4 text-center">Register</h2>
    {message && <p className="text-green-600 text-center">{message}</p>}
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="username"
        placeholder="User Name"
        className="w-full px-4 py-2 border rounded-md"
        onChange={handleChange}
        value={formData.username}
        required
      />
      {errors.username && <p style={{ color: "red" }}>{errors.username}</p>}
      
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="w-full px-4 py-2 border rounded-md"
        onChange={handleChange}
        value={formData.email}
        required
      />
      {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

      <input
        type="password"
        name="password"
        placeholder="Password"
        className="w-full px-4 py-2 border rounded-md"
        onChange={handleChange}
        value={formData.password}
        required
      />
      {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}

      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md">
        Register
      </button>
    </form>
  </div>
</div>
  );
}
export  default RegistrationForm;