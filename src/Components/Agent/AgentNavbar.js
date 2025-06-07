import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../services/StoreContext'; // Adjust path if needed
import { toast } from 'react-toastify';

const AgentNavbar = () => {
    const { user, logout } = useContext(StoreContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        toast.success("Logged out from Agent Portal!");
        navigate('/Login');
    };

    return (
        <nav className="
            bg-gradient-to-r from-blue-700 to-indigo-900 // Deep blue to indigo gradient
            p-4 shadow-xl fixed w-full top-0 z-50         // Fixed position, full width, strong shadow
            border-b-4 border-yellow-400                  // A subtle border for accent
        ">
            <div className="container mx-auto flex justify-between items-center h-16"> {/* Increased height */}
                {/* Logo or Home Link */}
                <Link 
                    to="/agent/dashboard" 
                    className="
                        text-white text-3xl font-extrabold   // Larger, bolder text
                        hover:text-yellow-200 transition duration-300 transform hover:scale-105 // Hover effect
                        tracking-wide
                    ">
                    Agent Panel
                </Link>

                {/* Navigation Links */}
                <div className="flex space-x-8 items-center"> {/* Increased spacing */}
                    <Link 
                        to="/agent/dashboard" 
                        className="
                            text-white text-lg font-semibold  // Stronger text
                            hover:text-yellow-300 transition duration-300 ease-in-out // Bright hover
                            relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-yellow-400 after:transition-all after:duration-300 hover:after:w-full
                        ">
                        Dashboard
                    </Link>

                    {/* Display Agent Username */}
                    {user && user.username && (
                        <span className="
                            text-yellow-200 text-lg font-bold ml-6 p-2 rounded-md // Highlight username
                            bg-blue-800 bg-opacity-70
                        ">
                            Hello, {user.username} (Agent)
                        </span>
                    )}

                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className="
                            bg-red-600 text-white px-6 py-2.5 rounded-full // More prominent button
                            font-bold hover:bg-red-700 transition duration-300
                            focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-70
                            transform hover:scale-105
                        "
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default AgentNavbar;