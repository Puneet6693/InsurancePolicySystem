import React, { useContext, useState } from "react";
import { StoreContext } from "../services/StoreContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { login } = useContext(StoreContext); // Use login function from StoreContext
    const navigate = useNavigate(); // Initialize useNavigate

    const [data, setData] = useState({
        username: "",
        password: "",
    });

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const onLogin = async (e) => {
        e.preventDefault();
        try {
            await login(data.username, data.password); // Use login function
            toast.success("Login successful!");
            navigate("/"); // Redirect to Dashboard after successful login
        } catch (error) {
            console.error("Login Error:", error);
            toast.error("An error occurred during login."); // Fallback error message
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form 
                onSubmit={onLogin} 
                className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md"
            >
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                <div className="mb-4">
                    <label 
                        htmlFor="username" 
                        className="block text-gray-700 font-semibold mb-2"
                    >
                        Username
                    </label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Your Username"
                        value={data.username}
                        onChange={onChangeHandler}
                        required
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label 
                        htmlFor="password" 
                        className="block text-gray-700 font-semibold mb-2"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Your Password"
                        value={data.password}
                        onChange={onChangeHandler}
                        required
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4 flex items-center">
                    <input type="checkbox" id="terms" className="mr-2" required />
                    <label htmlFor="terms" className="text-gray-600 text-sm">
                        By continuing, I agree to the Terms of Use &amp; Privacy Policy.
                    </label>
                </div>
                <button 
                    type="submit" 
                    className="w-full bg-blue-600 text-white font-semibold py-3 rounded hover:bg-blue-700 transition-colors"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;