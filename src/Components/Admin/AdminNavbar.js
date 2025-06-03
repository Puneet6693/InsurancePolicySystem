import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../services/StoreContext";

const AdminNavbar = () => {
    const { logout } = useContext(StoreContext); // Access logout function from StoreContext

    const [isPoliciesDropdownOpen, setIsPoliciesDropdownOpen] = React.useState(false);
    const [isClaimsDropdownOpen, setIsClaimsDropdownOpen] = React.useState(false);
    const [isCustomersDropdownOpen, setIsCustomersDropdownOpen] = React.useState(false);
    const [isAgentsDropdownOpen, setIsAgentsDropdownOpen] = React.useState(false);

    const togglePoliciesDropdown = () => setIsPoliciesDropdownOpen(!isPoliciesDropdownOpen);
    const toggleClaimsDropdown = () => setIsClaimsDropdownOpen(!isClaimsDropdownOpen);
    const toggleCustomersDropdown = () => setIsCustomersDropdownOpen(!isCustomersDropdownOpen);
    const toggleAgentsDropdown = () => setIsAgentsDropdownOpen(!isAgentsDropdownOpen);

    const closeDropdowns = () => {
        setIsPoliciesDropdownOpen(false);
        setIsClaimsDropdownOpen(false);
        setIsCustomersDropdownOpen(false);
        setIsAgentsDropdownOpen(false);
    };

    return (
        <nav className="bg-blue-600 p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-white text-lg font-bold">
                    Admin Dashboard
                </h1>
                <ul className="hidden md:flex space-x-6 flex-grow justify-center">
                    {/* Policies Dropdown */}
                    <li className="relative">
                        <button onClick={togglePoliciesDropdown} className="text-white hover:text-gray-300">
                            Policies
                        </button>
                        {isPoliciesDropdownOpen && (
                            <ul className="absolute bg-white text-black mt-2 rounded shadow-lg z-50 border border-gray-300">
                                <li>
                                    <Link to="/PolicyFeatch" className="block px-4 py-2 hover:bg-blue-100" onClick={closeDropdowns}>
                                        View Policies
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/Add_policy" className="block px-4 py-2 hover:bg-blue-100" onClick={closeDropdowns}>
                                        Add Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/UpdatePolicy" className="block px-4 py-2 hover:bg-blue-100" onClick={closeDropdowns}>
                                        Update Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/DeletePolicy" className="block px-4 py-2 hover:bg-blue-100" onClick={closeDropdowns}>
                                        Remove Policy
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li>

                    {/* Claims Dropdown */}
                    <li className="relative">
                        <button onClick={toggleClaimsDropdown} className="text-white hover:text-gray-300">
                            Claims
                        </button>
                        {isClaimsDropdownOpen && (
                            <ul className="absolute bg-white text-black mt-2 rounded shadow-lg z-50 border border-gray-300">
                                <li>
                                    <Link to="/GetAllClaims" className="block px-4 py-2 hover:bg-blue-100" onClick={closeDropdowns}>
                                        View Claims
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/Claim" className="block px-4 py-2 hover:bg-blue-100" onClick={closeDropdowns}>
                                        Add Claim
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li>

                    {/* Customers Dropdown */}
                    <li className="relative">
                        <button onClick={toggleCustomersDropdown} className="text-white hover:text-gray-300">
                            Customers
                        </button>
                        {isCustomersDropdownOpen && (
                            <ul className="absolute bg-white text-black mt-2 rounded shadow-lg z-50 border border-gray-300">
                                <li>
                                    <Link to="/CustomerGetAll" className="block px-4 py-2 hover:bg-blue-100" onClick={closeDropdowns}>
                                        View Customers
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/AddCustomer" className="block px-4 py-2 hover:bg-blue-100" onClick={closeDropdowns}>
                                        Add Customer
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li>

                    {/* Agents Dropdown */}
                    <li className="relative">
                        <button onClick={toggleAgentsDropdown} className="text-white hover:text-gray-300">
                            Agents
                        </button>
                        {isAgentsDropdownOpen && (
                            <ul className="absolute bg-white text-black mt-2 rounded shadow-lg z-50 border border-gray-300">
                                <li>
                                    <Link to="/AgentGetAll" className="block px-4 py-2 hover:bg-blue-100" onClick={closeDropdowns}>
                                        View Agents
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/AddAgent" className="block px-4 py-2 hover:bg-blue-100" onClick={closeDropdowns}>
                                        Add Agent
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li>
                </ul>
                <button 
                    onClick={logout} 
                    className="text-white bg-red-500 p-2 rounded hover:bg-red-600"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default AdminNavbar;