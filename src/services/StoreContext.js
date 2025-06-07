// import React, { createContext, useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// // Create the context. Default value can be null.
// export const StoreContext = createContext(null);

// export const StoreContextProvider = ({ children }) => {
//   const url = "https://localhost:7251"; // Backend URL

//   // Initialize token from localStorage (or an empty string if none exists)
//   const [token, setToken] = useState(localStorage.getItem("token") || "");

//   // Initialize user from localStorage. Store the entire user object if available.
//   // This assumes you might store more user details in localStorage in the future.
//   // For now, it will primarily hold the role.
//   const [user, setUser] = useState(() => {
//     const storedRole = localStorage.getItem("role");
//     const storedUsername = localStorage.getItem("username"); // Assuming you might also store username
//     if (storedRole) {
//       return { role: storedRole, username: storedUsername || "" }; // Reconstruct user object
//     }
//     return null;
//   });

//   // Axios instance with interceptors
//   const axiosInstance = axios.create({
//     baseURL: url,
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   // Attach token to all requests
//   axiosInstance.interceptors.request.use(
//     (config) => {
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//       return config;
//     },
//     (error) => Promise.reject(error)
//   );

//   // Handle unauthorized responses globally
//   axiosInstance.interceptors.response.use(
//     (response) => response,
//     (error) => {
//       if (error.response?.status === 401) {
//         toast.error("Unauthorized access. Please log in again.");
//         logout(); // Clear token and user data
//       }
//       return Promise.reject(error);
//     }
//   );

//   // Login function: sends the username and password to the API.
//   const login = async (username, password) => {
//     try {
//         const response = await axiosInstance.post("/api/Users/login", { username, password });
//         if (response.data.token) {
//             const { token, role } = response.data;
//             setToken(token);
//             setUser({ username, role });
//             localStorage.setItem("token", token);
//             localStorage.setItem("role", role);
//             return { username, role };
//         } else {
//             toast.error("Login failed!");
//             return null;
//         }
//     } catch (error) {
//         console.error("Login Error:", error);
//         toast.error("An error occurred during login.");
//         return null;
//     }
// };

//   // Logout function: clears token and user info.
//   const logout = () => {
//     setToken("");
//     setUser(null);
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     localStorage.removeItem("username"); // Remove username too
//     toast.success("Logged out successfully!");
//   };

//   // On initial render, load token and user role from localStorage if they exist.
//   // This useEffect will now properly reconstruct the user object if a role is saved.
//   useEffect(() => {
//     const savedToken = localStorage.getItem("token");
//     const savedRole = localStorage.getItem("role");
//     const savedUsername = localStorage.getItem("username");

//     if (savedToken && savedRole) {
//       setToken(savedToken);
//       setUser({ role: savedRole, username: savedUsername || "" });
//     } else {
//       // Clear any incomplete or old localStorage data if either is missing
//       localStorage.removeItem("token");
//       localStorage.removeItem("role");
//       localStorage.removeItem("username");
//       setToken("");
//       setUser(null);
//     }
//   }, []); // Empty dependency array means this runs once on mount

//   const contextValue = {
//     token,
//     setToken,
//     user,
//     setUser,
//     login,
//     logout,
//     axiosInstance, // Expose axios instance for API calls
//     url,
//   };

//   return (
//     <StoreContext.Provider value={contextValue}>{children}</StoreContext.Provider>
//   );
// };
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// Create the context. Default value can be null.
export const StoreContext = createContext(null);

export const StoreContextProvider = ({ children }) => {
  const url = "https://localhost:7251"; // Backend URL

  // Initialize token from localStorage (or an empty string if none exists)
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // Initialize user from localStorage. Store the entire user object if available.
  // This assumes you might store more user details in localStorage in the future.
  // For now, it will primarily hold the role.
  const [user, setUser] = useState(() => {
    const storedRole = localStorage.getItem("role");
    const storedUsername = localStorage.getItem("username"); // Assuming you might also store username
    if (storedRole) {
      return { role: storedRole, username: storedUsername || "" }; // Reconstruct user object
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
        if (response.data.token) {
            const { token, role } = response.data;
            setToken(token);
            setUser({ username, role }); // Update user state with both username and role
            localStorage.setItem("token", token);
            localStorage.setItem("role", role);
            localStorage.setItem("username", username); // Store username in localStorage
            return { username, role }; // Return username and role for immediate use in Login component
        } else {
            toast.error("Login failed!");
            return null;
        }
    } catch (error) {
        console.error("Login Error:", error);
        // More specific error messages from backend might be in error.response.data
        if (error.response && error.response.data && error.response.data.message) {
          console.log(error.response.data.message);
        } else {
          console.log("An error occurred during login.");
        }
        return null;
    }
};

  // Logout function: clears token and user info.
  const logout = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username"); // Remove username too
    toast.success("Logged out successfully!");
  };

  // On initial render, load token and user role from localStorage if they exist.
  // This useEffect will now properly reconstruct the user object if a role is saved.
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedRole = localStorage.getItem("role");
    const savedUsername = localStorage.getItem("username");

    if (savedToken && savedRole) {
      setToken(savedToken);
      setUser({ role: savedRole, username: savedUsername || "" });
    } else {
      // Clear any incomplete or old localStorage data if either is missing
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("username");
      setToken("");
      setUser(null);
    }
  }, []); // Empty dependency array means this runs once on mount

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

  return (
    <StoreContext.Provider value={contextValue}>{children}</StoreContext.Provider>
  );
};