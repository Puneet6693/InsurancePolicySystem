import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
 
const RegisterAgent = () => {
    const navigate = useNavigate();
    const [agentData, setAgentData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [responseMessage, setResponseMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
 
    const validate = () => {
        let tempErrors = {};
 
        // Validate username
        if (!agentData.username.trim()) {
            tempErrors.username = 'Username is required!';
        } else if (/^\d/.test(agentData.username)) {
            tempErrors.username = 'Username cannot start with a number!';
        } else if (agentData.username.length < 3) {
            tempErrors.username = 'Username must be at least 3 characters!';
        }
 
        // Validate email
        if (!agentData.email.trim()) {
            tempErrors.email = 'Email is required!';
        } else if (!/\S+@\S+\.\S+/.test(agentData.email)) {
            tempErrors.email = 'Invalid email format!';
        }
 
        // Validate password
        if (!agentData.password.trim()) {
            tempErrors.password = 'Password is required!';
        } else if (agentData.password.length < 6) {
            tempErrors.password = 'Password must be at least 6 characters!';
        } else if (!/[A-Z]/.test(agentData.password)) {
            tempErrors.password = 'Password must contain at least one uppercase letter!';
        } else if (!/[a-z]/.test(agentData.password)) {
            tempErrors.password = 'Password must contain at least one lowercase letter!';
        } else if (!/[0-9]/.test(agentData.password)) {
            tempErrors.password = 'Password must contain at least one number!';
        } else if (!/[!@#$%^&*]/.test(agentData.password)) {
            tempErrors.password = 'Password must contain at least one special character (!@#$%^&*).';
        }
 
        setErrors(tempErrors);
        console.log("Validation Errors:", tempErrors); // Debugging log
        return Object.keys(tempErrors).length === 0;
    };
 
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAgentData({ ...agentData, [name]: value });
    };
 
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return; // Stop form submission if validation fails
        setIsSubmitting(true);
        const token = localStorage.getItem('token'); // Retrieve token from localStorage
 
        try {
            const response = await axios.post(
                'https://localhost:7251/registerAgent',
                agentData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setResponseMessage('Agent registered successfully!');
            setAgentData({ username: '', email: '', password: '' }); // Reset form
            setErrors({});
            navigate('/admin/dashboard');
        } catch (error) {
            setResponseMessage('Error registering agent.');
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };
 
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Register Agent</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="username"
                            className="block text-gray-700 font-semibold mb-2"
                        >
                            Username:
                        </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            value={agentData.username}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-gray-700 font-semibold mb-2"
                        >
                            Email:
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={agentData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-gray-700 font-semibold mb-2"
                        >
                            Password:
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={agentData.password}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full bg-blue-600 text-white font-semibold py-3 rounded hover:bg-blue-700 transition-colors ${
                            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        {isSubmitting ? 'Registering...' : 'Register'}
                    </button>
                </form>
                {responseMessage && (
                    <p
                        className={`mt-4 text-center ${
                            responseMessage.includes('successfully')
                                ? 'text-green-600'
                                : 'text-red-600'
                        }`}
                    >
                        {responseMessage}
                    </p>
                )}
            </div>
        </div>
    );
};
 
export default RegisterAgent;