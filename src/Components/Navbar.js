import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-lg font-bold">Insurance System</h1>
        <input 
          type="text" 
          placeholder="Search Policy..." 
          className="hidden md:block px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
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
        <ul className="hidden md:flex space-x-6">
          <li><Link to="/" className="text-white hover:text-gray-300">Dashboard</Link></li>
          <li className="relative">
            <button 
              onClick={toggleDropdown} 
              className="text-white hover:text-gray-300 focus:outline-none"
            >
              Policies
            </button>
            {isDropdownOpen && (
              <ul className="absolute bg-white text-black mt-2 rounded shadow-lg z-50 border border-gray-300">
                <li><Link to="/PolicyFeatch" className="block px-4 py-2 hover:bg-blue-100">View Policies</Link></li>
                <li><Link to="/Add_policy" className="block px-4 py-2 hover:bg-blue-100">Add Policy</Link></li>
                <li><Link to="/UpdatePolicy" className="block px-4 py-2 hover:bg-blue-100">Update Policy</Link></li>
                <li><Link to="/policy-reports" className="block px-4 py-2 hover:bg-blue-100">Policy Reports</Link></li>
              </ul>
            )}
          </li>
          <li><Link to="/Claims" className="text-white hover:text-gray-300">Claims</Link></li>
          <li><Link to="/contact" className="text-white hover:text-gray-300">Contact</Link></li>
        </ul>
        <button className="md:hidden text-white bg-blue-500 p-2 rounded">Menu</button>
      </div>
    </nav>
  );
};

export default Navbar;
