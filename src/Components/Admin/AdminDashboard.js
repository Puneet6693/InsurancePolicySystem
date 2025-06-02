import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext"; // Assuming your context is in this path

const AdminNavbar = () => {
  const { token, logout, user } = useContext(StoreContext);
  const navigate = useNavigate();

  const [isPoliciesDropdownOpen, setIsPoliciesDropdownOpen] = useState(false);
  const [isUsersDropdownOpen, setIsUsersDropdownOpen] = useState(false);
  const [isReportsDropdownOpen, setIsReportsDropdownOpen] = useState(false);

  const togglePoliciesDropdown = () => setIsPoliciesDropdownOpen(!isPoliciesDropdownOpen);
  const toggleUsersDropdown = () => setIsUsersDropdownOpen(!isUsersDropdownOpen);
  const toggleReportsDropdown = () => setIsReportsDropdownOpen(!isReportsDropdownOpen);

  const closeDropdowns = () => {
    setIsPoliciesDropdownOpen(false);
    setIsUsersDropdownOpen(false);
    setIsReportsDropdownOpen(false);
  };

  return (
    <nav className="bg-yellow-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1
          className="text-white text-lg font-bold cursor-pointer"
          onClick={() => navigate("/admin")}
        >
          Admin Dashboard
        </h1>
        <div className="flex items-center space-x-4">
          {token ? (
            <>
              <span className="text-white">Welcome, {user?.username || "Admin"}</span>
              <button
                onClick={logout}
                className="text-white bg-red-500 p-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/Login")}
              className="text-white bg-yellow-500 p-2 rounded"
            >
              Admin Login
            </button>
          )}
        </div>
        <ul className="hidden md:flex space-x-6">
          <li><Link to="/admin" className="text-white hover:text-gray-300">Dashboard</Link></li>
          <li className="relative">
            <button onClick={togglePoliciesDropdown} className="text-white hover:text-gray-300">
              Policies
            </button>
            {isPoliciesDropdownOpen && (
              <ul className="absolute bg-white text-black mt-2 rounded shadow-lg z-50 border border-gray-300">
                <li><Link to="/admin/manage-policies" className="block px-4 py-2 hover:bg-yellow-100" onClick={closeDropdowns}>Manage Policies</Link></li>
              </ul>
            )}
          </li>
          <li className="relative">
            <button onClick={toggleUsersDropdown} className="text-white hover:text-gray-300">
              Users
            </button>
            {isUsersDropdownOpen && (
              <ul className="absolute bg-white text-black mt-2 rounded shadow-lg z-50 border border-gray-300">
                <li><Link to="/admin/manage-users" className="block px-4 py-2 hover:bg-yellow-100" onClick={closeDropdowns}>Manage Users</Link></li>
              </ul>
            )}
          </li>
          <li className="relative">
            <button onClick={toggleReportsDropdown} className="text-white hover:text-gray-300">
              Reports
            </button>
            {isReportsDropdownOpen && (
              <ul className="absolute bg-white text-black mt-2 rounded shadow-lg z-50 border border-gray-300">
                <li><Link to="/admin/reports" className="block px-4 py-2 hover:bg-yellow-100" onClick={closeDropdowns}>View Reports</Link></li>
              </ul>
            )}
          </li>
          <li><Link to="/admin/settings" className="text-white hover:text-gray-300">Settings</Link></li>
        </ul>
        <button className="md:hidden text-white bg-yellow-500 p-2 rounded">Menu</button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
