import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
 
// Create the context. Default value can be null.
export const StoreContext = createContext(null);
 
export const StoreContextProvider = ({ children }) => {
  const url = "https://localhost:7251"; // Backend URL
 
  // Initialize token from localStorage (or an empty string if none exists)
  const [token, setToken] = useState(localStorage.getItem("token") || "");
 
  // Initialize user from localStorage. Store the entire user object if available.
  const [user, setUser] = useState(() => {
    const storedRole = localStorage.getItem("role");
    const storedUsername = localStorage.getItem("username");
    if (storedRole) {
      return { role: storedRole, username: storedUsername || "" };
    }
    return null;
  });
 
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
        logout(); // Clear token and user data
      }
      return Promise.reject(error);
    }
  );
 
  // Login function: sends the username and password to the API.
  const login = async (username, password) => {
    try {
      const response = await axiosInstance.post("/api/Users/login", { username, password });
      if (response.data.token) {
        const { token, role } = response.data;
        setToken(token);
        setUser({ username, role });
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("username", username);
        return { username, role };
      }
      return null;
    } catch (error) {
      console.error("Login Error:", error);
      return null;
    }
  };
 
  // Logout function: clears token and user info.
  const logout = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
  };
 
  // On initial render, load token and user role from localStorage if they exist.
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedRole = localStorage.getItem("role");
    const savedUsername = localStorage.getItem("username");
 
    if (savedToken && savedRole) {
      setToken(savedToken);
      setUser({ role: savedRole, username: savedUsername || "" });
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("username");
      setToken("");
      setUser(null);
    }
  }, []);
 
  const contextValue = {
    token,
    setToken,
    user,
    setUser,
    login,
    logout,
    axiosInstance,
    url,
  };
 
  return <StoreContext.Provider value={contextValue}>{children}</StoreContext.Provider>;
};
 

 