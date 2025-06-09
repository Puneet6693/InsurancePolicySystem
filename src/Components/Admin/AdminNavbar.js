import React, { useContext, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../services/StoreContext";
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid'; // Import arrow icons
 // Import AgentFeatch for agent data

const AdminNavbar = () => {
    const { logout } = useContext(StoreContext);
    const navigate = useNavigate();

    const [isPoliciesDropdownOpen, setIsPoliciesDropdownOpen] = React.useState(false);
    const [isClaimsDropdownOpen, setIsClaimsDropdownOpen] = React.useState(false);
    const [isCustomersDropdownOpen, setIsCustomersDropdownOpen] = React.useState(false);
    const [isAgentsDropdownOpen, setIsAgentsDropdownOpen] = React.useState(false);

    // Refs for each dropdown to detect clicks outside
    const policiesRef = useRef(null);
    const claimsRef = useRef(null);
    const customersRef = useRef(null);
    const agentsRef = useRef(null);

    const closeAllDropdowns = () => {
        setIsPoliciesDropdownOpen(false);
        setIsClaimsDropdownOpen(false);
        setIsCustomersDropdownOpen(false);
        setIsAgentsDropdownOpen(false);
    };

    // This function is primarily for click events on the button
    const handleButtonClick = (setter, state) => {
        closeAllDropdowns(); // Close all others first
        setter(!state);      // Then toggle the specific one
    };

    // Effect to close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Check if the click is outside the entire dropdown container (the li)
            if (policiesRef.current && !policiesRef.current.contains(event.target)) {
                setIsPoliciesDropdownOpen(false);
            }
            if (claimsRef.current && !claimsRef.current.contains(event.target)) {
                setIsClaimsDropdownOpen(false);
            }
            if (customersRef.current && !customersRef.current.contains(event.target)) {
                setIsCustomersDropdownOpen(false);
            }
            if (agentsRef.current && !agentsRef.current.contains(event.target)) {
                setIsAgentsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    return (
        <nav className="bg-gradient-to-r from-yellow-300 to-yellow-400 p-4 shadow-lg fixed top-0 left-0 w-full z-50">
            <div className="container mx-auto flex justify-between items-center">
                <h1
                    className="text-gray-800 text-2xl font-extrabold cursor-pointer transition-colors duration-300 hover:text-gray-900"
                    onClick={() => navigate("/admin/dashboard")}
                >
                    Admin Panel
                </h1>

                {/* Central Navigation Links */}
                <ul className="hidden md:flex space-x-8 flex-grow justify-center">
                    {/* Policies Dropdown */}
                    <li className="relative group" ref={policiesRef} // Added 'group' class for Tailwind JIT
                        onMouseEnter={() => { closeAllDropdowns(); setIsPoliciesDropdownOpen(true); }}
                        onMouseLeave={() => setIsPoliciesDropdownOpen(false)}
                    >
                        <button
                            onClick={() => handleButtonClick(setIsPoliciesDropdownOpen, isPoliciesDropdownOpen)}
                            className="text-gray-800 hover:text-gray-900 font-semibold focus:outline-none flex items-center transition-colors duration-300 text-lg py-2 px-4" // Added padding for better hover area
                        >
                            Policies
                            {isPoliciesDropdownOpen ? (
                                <ChevronUpIcon className="h-5 w-5 ml-1 text-gray-700" />
                            ) : (
                                <ChevronDownIcon className="h-5 w-5 ml-1 text-gray-700" />
                            )}
                        </button>
                        {isPoliciesDropdownOpen && (
                            <ul className="absolute bg-white text-gray-800 rounded-lg shadow-xl z-50 border border-gray-200 min-w-[180px] left-1/2 transform -translate-x-1/2 mt-0.5 animate-fade-in-down" // Adjusted mt for direct contact
                            >
                                <li>
                                    <Link
                                        to="/admin/policies"
                                        className="block px-5 py-2 hover:bg-yellow-100 rounded-t-lg transition-colors duration-200"
                                        onClick={closeAllDropdowns}
                                    >
                                        View Policies
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/admin/add-policy"
                                        className="block px-5 py-2 hover:bg-yellow-100 transition-colors duration-200"
                                        onClick={closeAllDropdowns}
                                    >
                                        Add Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/admin/delete-policy"
                                        className="block px-5 py-2 hover:bg-yellow-100 rounded-b-lg transition-colors duration-200"
                                        onClick={closeAllDropdowns}
                                    >
                                        Remove Policy
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li>

                    {/* Claims Dropdown */}
                    <li className="relative group" ref={claimsRef}
                        onMouseEnter={() => { closeAllDropdowns(); setIsClaimsDropdownOpen(true); }}
                        onMouseLeave={() => setIsClaimsDropdownOpen(false)}
                    >
                        <button
                            onClick={() => handleButtonClick(setIsClaimsDropdownOpen, isClaimsDropdownOpen)}
                            className="text-gray-800 hover:text-gray-900 font-semibold focus:outline-none flex items-center transition-colors duration-300 text-lg py-2 px-4"
                        >
                            Claims
                            {isClaimsDropdownOpen ? (
                                <ChevronUpIcon className="h-5 w-5 ml-1 text-gray-700" />
                            ) : (
                                <ChevronDownIcon className="h-5 w-5 ml-1 text-gray-700" />
                            )}
                        </button>
                        {isClaimsDropdownOpen && (
                            <ul className="absolute bg-white text-gray-800 rounded-lg shadow-xl z-50 border border-gray-200 min-w-[180px] left-1/2 transform -translate-x-1/2 mt-0.5 animate-fade-in-down">
                                <li>
                                    <Link
                                        to="/admin/claims"
                                        className="block px-5 py-2 hover:bg-yellow-100 rounded-t-lg transition-colors duration-200"
                                        onClick={closeAllDropdowns}
                                    >
                                        View Claims
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li>

                    {/* Customers Dropdown */}
                    <li className="relative group" ref={customersRef}
                        onMouseEnter={() => { closeAllDropdowns(); setIsCustomersDropdownOpen(true); }}
                        onMouseLeave={() => setIsCustomersDropdownOpen(false)}
                    >
                        <button
                            onClick={() => handleButtonClick(setIsCustomersDropdownOpen, isCustomersDropdownOpen)}
                            className="text-gray-800 hover:text-gray-900 font-semibold focus:outline-none flex items-center transition-colors duration-300 text-lg py-2 px-4"
                        >
                            Customers
                            {isCustomersDropdownOpen ? (
                                <ChevronUpIcon className="h-5 w-5 ml-1 text-gray-700" />
                            ) : (
                                <ChevronDownIcon className="h-5 w-5 ml-1 text-gray-700" />
                            )}
                        </button>
                        {isCustomersDropdownOpen && (
                            <ul className="absolute bg-white text-gray-800 rounded-lg shadow-xl z-50 border border-gray-200 min-w-[180px] left-1/2 transform -translate-x-1/2 mt-0.5 animate-fade-in-down">
                                <li>
                                    <Link
                                        to="/admin/customers"
                                        className="block px-5 py-2 hover:bg-yellow-100 rounded-t-lg transition-colors duration-200"
                                        onClick={closeAllDropdowns}
                                    >
                                        View Customers
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li>

                    {/* Agents Dropdown */}
                    <li className="relative group" ref={agentsRef}
                        onMouseEnter={() => { closeAllDropdowns(); setIsAgentsDropdownOpen(true); }}
                        onMouseLeave={() => setIsAgentsDropdownOpen(false)}
                    >
                        <button
                            onClick={() => handleButtonClick(setIsAgentsDropdownOpen, isAgentsDropdownOpen)}
                            className="text-gray-800 hover:text-gray-900 font-semibold focus:outline-none flex items-center transition-colors duration-300 text-lg py-2 px-4"
                        >
                            Agents
                            {isAgentsDropdownOpen ? (
                                <ChevronUpIcon className="h-5 w-5 ml-1 text-gray-700" />
                            ) : (
                                <ChevronDownIcon className="h-5 w-5 ml-1 text-gray-700" />
                            )}
                        </button>
                        {isAgentsDropdownOpen && (
                            <ul className="absolute bg-white text-gray-800 rounded-lg shadow-xl z-50 border border-gray-200 min-w-[180px] left-1/2 transform -translate-x-1/2 mt-0.5 animate-fade-in-down">
                                <li>
                                    <Link
                                        to="/admin/agents"
                                        className="block px-5 py-2 hover:bg-yellow-100 rounded-t-lg transition-colors duration-200"
                                        onClick={closeAllDropdowns}
                                    >
                                        View Agents
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/admin/register-agent"
                                        className="block px-5 py-2 hover:bg-yellow-100 rounded-b-lg transition-colors duration-200"
                                        onClick={closeAllDropdowns}
                                    >
                                        Register New Agent
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/admin/delete-agent"
                                        className="block px-5 py-2 hover:bg-yellow-100 rounded-b-lg transition-colors duration-200"
                                        onClick={closeAllDropdowns}
                                    >
                                        Delete Agent
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li>
                </ul>
                <button
                    onClick={logout}
                    className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition-colors duration-300 font-semibold shadow-md"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default AdminNavbar;