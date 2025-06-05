import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../services/StoreContext";

const Navbar = () => {
  const { token, logout, user } = useContext(StoreContext);
  const navigate = useNavigate();

  const [isPoliciesDropdownOpen, setIsPoliciesDropdownOpen] = React.useState(false);
  const [isClaimsDropdownOpen, setIsClaimsDropdownOpen] = React.useState(false);

  const togglePoliciesDropdown = () => setIsPoliciesDropdownOpen(!isPoliciesDropdownOpen);
  const toggleClaimsDropdown = () => setIsClaimsDropdownOpen(!isClaimsDropdownOpen);
  const closeDropdowns = () => {
    setIsPoliciesDropdownOpen(false);
    setIsClaimsDropdownOpen(false);
  };

  return (
    <nav className="bg-blue-600 p-5 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 
          className="text-white text-lg font-bold cursor-pointer" 
          onClick={() => navigate("/")}
        >
          Insurance System
        </h1>
        <div className="flex-1 flex justify-center">
          <input 
            type="text" 
            placeholder="Search Policy..." 
            className="hidden md:block w-1/2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(event) => navigate(`/search?query=${event.target.value}`)}
          />
        </div>
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
        <ul className="hidden md:flex space-x-6 flex-grow justify-center">
          <li><Link to="/" className="text-white hover:text-gray-300">Dashboard</Link></li>
          {/* <li><Link to="/Admin" className="text-white hover:text-gray-300">Admin Dashboard</Link></li> */}
          <li className="relative">
            <button onClick={togglePoliciesDropdown} className="text-white hover:text-gray-300">
              Policies
            </button>
            {/* {isPoliciesDropdownOpen && (
              <ul className="absolute bg-white text-black mt-2 rounded shadow-lg z-50 border border-gray-300">
                <li><Link to="/PolicyFeatch" className="block px-4 py-2 hover:bg-blue-100" onClick={closeDropdowns}>View Policies</Link></li>
                <li><Link to="/Add_policy" className="block px-4 py-2 hover:bg-blue-100" onClick={closeDropdowns}>Add Policy</Link></li>
                <li><Link to="/UpdatePolicy" className="block px-4 py-2 hover:bg-blue-100" onClick={closeDropdowns}>Update Policy</Link></li>
                <li><Link to="/DeletePolicy" className="block px-4 py-2 hover:bg-blue-100" onClick={closeDropdowns}>Remove Policy</Link></li>
              </ul>
            )} */}
          </li>
          <li className="relative">
            <button onClick={toggleClaimsDropdown} className="text-white hover:text-gray-300">
              Claims
            </button>
            {isClaimsDropdownOpen && (
              <ul className="absolute bg-white text-black mt-2 rounded shadow-lg z-50 border border-gray-300">
                
                <li><Link to="/Claim" className="block px-4 py-2 hover:bg-blue-100" onClick={closeDropdowns}>Add Claim</Link></li>
              </ul>
            )}
          </li>
        </ul>
        {/* <div className="ml-auto">
          <Link to="/contact" className="text-white hover:text-gray-300">
            Contact
          </Link>
        </div> */}
        <div className="hidden md:flex space-x-6">
        {token ? (
          <Link to="/UserProfile" className="text-white hover:text-gray-300">
            Profile
           </Link>
          
            ) : (
              <></>
              
            )}
            {token ? (
          <Link to="/Notification" className="text-white hover:text-gray-300">
            Notifications
          </Link>
          
            ) : (
              <></>
            )}
            </div>
        <button className="md:hidden text-white bg-blue-500 p-2 rounded">Menu</button>
      </div>
    </nav>
  );
};

export default Navbar;
