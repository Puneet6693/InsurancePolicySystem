import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// Create the context. Default value can be null.
export const StoreContext = createContext(null);

export const StoreContextProvider = ({ children }) => {
  const url = "https://localhost:7251"; // Backend URL

  // Initialize token from localStorage (or an empty string if none exists)
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  
  // Initialize user from localStorage. If a role exists, set the user object.
  const [user, setUser] = useState(
    localStorage.getItem("role") ? { role: localStorage.getItem("role") } : null
  );

  // Axios instance with interceptors
  const axiosInstance = axios.create({
    baseURL: url,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Attach token to all requests
  axiosInstance.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Handle unauthorized responses globally
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        toast.error("Unauthorized access. Please log in again.");
        logout(); // Clear token and user data
      }
      return Promise.reject(error);
    }
  );

  // Login function: sends the username and password to the API.
  const login = async (username, password) => {
    try {
      const response = await axiosInstance.post("/api/Users/login", { username, password });
      console.log("Login Response:", response.data); // Debug log

      // Expecting the API to return both a token and a user role.
      if (response.data.token) {
        const { token, role } = response.data;
        setToken(token);
        setUser({ username, role });
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        toast.success("Login successful!");
      } else {
        toast.error(response.data.message || "Login failed!");
      }
    } catch (error) {
      console.error("Login Error:", error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred during login.");
      }
    }
  };

  // Logout function: clears token and user info.
  const logout = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    toast.success("Logged out successfully!");
  };

  // On initial render, load token and user role from localStorage if they exist.
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedRole = localStorage.getItem("role");
    if (savedToken) {
      setToken(savedToken);
      if (savedRole) {
        setUser({ role: savedRole });
      }
    }
  }, []);

  const contextValue = {
    token,
    setToken,
    user,
    setUser,
    login,
    logout,
    axiosInstance, // Expose axios instance for API calls
    url,
  };

  return <StoreContext.Provider value={contextValue}>{children}</StoreContext.Provider>;
};