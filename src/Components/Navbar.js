import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../services/StoreContext";

const Navbar = () => {
  const { token, logout, user } = useContext(StoreContext); // Access token, logout, and user from StoreContext
  const navigate = useNavigate();

  const [isPoliciesDropdownOpen, setIsPoliciesDropdownOpen] = React.useState(false);
  const [isClaimsDropdownOpen, setIsClaimsDropdownOpen] = React.useState(false);

  const togglePoliciesDropdown = () => {
    setIsPoliciesDropdownOpen(!isPoliciesDropdownOpen);
  };

  const toggleClaimsDropdown = () => {
    setIsClaimsDropdownOpen(!isClaimsDropdownOpen);
  };

  const closeDropdowns = () => {
    setIsPoliciesDropdownOpen(false);
    setIsClaimsDropdownOpen(false);
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    navigate(`/search?query=${query}`);
  };

  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 
          className="text-white text-lg font-bold cursor-pointer" 
          onClick={() => navigate("/")}
        >
          Insurance System
        </h1>
        <input 
          type="text" 
          placeholder="Search Policy..." 
          className="hidden md:block px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={handleSearch}
        />
        <div className="flex items-center space-x-4">
          {token ? (
            <>
              <span className="text-white">Welcome, {user?.username || "User"}</span>
              <button 
                onClick={logout} 
                className="text-white bg-red-500 p-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => navigate("/Registration")} 
                className="text-white bg-blue-500 p-2 rounded"
              >
                Register Now
              </button>
              <button 
                onClick={() => navigate("/Login")} 
                className="text-white bg-blue-500 p-2 rounded"
              >
                Login
              </button>
            </>
          )}
        </div>
        <ul className="hidden md:flex space-x-6">
          <li><Link to="/" className="text-white hover:text-gray-300">Dashboard</Link></li>
          <li className="relative">
            <button 
              onClick={togglePoliciesDropdown} 
              className="text-white hover:text-gray-300 focus:outline-none"
            >
              Policies
            </button>
            {isPoliciesDropdownOpen && (
              <ul className="absolute bg-white text-black mt-2 rounded shadow-lg z-50 border border-gray-300">
                <li><Link to="/PolicyFeatch" className="block px-4 py-2 hover:bg-blue-100" onClick={closeDropdowns}>View Policies</Link></li>
                <li><Link to="/Add_policy" className="block px-4 py-2 hover:bg-blue-100" onClick={closeDropdowns}>Add Policy</Link></li>
                <li><Link to="/UpdatePolicy" className="block px-4 py-2 hover:bg-blue-100" onClick={closeDropdowns}>Update Policy</Link></li>
                <li><Link to="/DeletePolicy" className="block px-4 py-2 hover:bg-blue-100" onClick={closeDropdowns}>Remove Policy</Link></li>
              </ul>
            )}
          </li>
          <li className="relative">
            <button 
              onClick={toggleClaimsDropdown} 
              className="text-white hover:text-gray-300 focus:outline-none"
            >
              Claims
            </button>
            {isClaimsDropdownOpen && (
              <ul className="absolute bg-white text-black mt-2 rounded shadow-lg z-50 border border-gray-300">
                <li><Link to="/GetAllClaims" className="block px-4 py-2 hover:bg-blue-100" onClick={closeDropdowns}>Get All Claims</Link></li>
                <li><Link to="/Claim" className="block px-4 py-2 hover:bg-blue-100" onClick={closeDropdowns}>Add Claim</Link></li>
              </ul>
            )}
          </li>
          <li><Link to="/contact" className="text-white hover:text-gray-300">Contact</Link></li>
        </ul>
        <button className="md:hidden text-white bg-blue-500 p-2 rounded">Menu</button>
      </div>
    </nav>
  );
};

export default Navbar;