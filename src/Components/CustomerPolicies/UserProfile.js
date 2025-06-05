// 

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = () => {
    const [user, setUser] = useState({
        customer_ID: '',
        customer_Name: '',
        customer_Email: '',
        customer_Phone: '',
        customer_Address: ''
    });

    const [policies, setPolicies] = useState([]); // State to store assigned policies
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState('');
    const [showPolicies, setShowPolicies] = useState(false); // Toggle for showing policies

    useEffect(() => {
        // Fetch user details from the API
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get('https://localhost:7251/api/Customers/GetCustomerById', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setUser(response.data);

                // Fetch policies assigned to the user
                fetchUserPolicies(response.data.customer_ID);
            } catch (error) {
                console.error('There was an error fetching the user details!', error);
                setError('Failed to fetch user details. Please try again later.');
            }
        };

        // Fetch policies assigned to the user
        const fetchUserPolicies = async (customerId) => {
            try {
                const response = await axios.get(`https://localhost:7251/GetAllPoliciesByCustomerId?id=${customerId}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setPolicies(response.data); // Set policies data
            } catch (error) {
                console.error('There was an error fetching the user policies!', error);
                setError('Failed to fetch user policies. Please try again later.');
            }
        };

        fetchUserDetails();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        setIsEditing(false);
        try {
            const response = await axios.put('https://localhost:7251/api/Customers/UpdateTheProfile', user, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log('User info saved:', response.data);
        } catch (error) {
            console.error('There was an error updating the user details!', error);
            setError('Failed to update user details. Please try again later.');
        }
    };

    const togglePolicies = () => {
        setShowPolicies(!showPolicies); // Toggle the visibility of the policies table
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center mb-6">User Profile</h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Customer ID:</label>
                <span className="block p-2 bg-gray-100 border border-gray-300 rounded font-bold">{user.customer_ID}</span>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Name:</label>
                {isEditing ? (
                    <input
                        type="text"
                        name="customer_Name"
                        value={user.customer_Name}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                ) : (
                    <span className="block p-2 bg-gray-100 border border-gray-300 rounded">{user.customer_Name}</span>
                )}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Email:</label>
                {isEditing ? (
                    <input
                        type="email"
                        name="customer_Email"
                        value={user.customer_Email}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                ) : (
                    <span className="block p-2 bg-gray-100 border border-gray-300 rounded">{user.customer_Email}</span>
                )}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Phone:</label>
                {isEditing ? (
                    <input
                        type="text"
                        name="customer_Phone"
                        value={user.customer_Phone}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                ) : (
                    <span className="block p-2 bg-gray-100 border border-gray-300 rounded">{user.customer_Phone}</span>
                )}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Address:</label>
                {isEditing ? (
                    <input
                        type="text"
                        name="customer_Address"
                        value={user.customer_Address}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                ) : (
                    <span className="block p-2 bg-gray-100 border border-gray-300 rounded">{user.customer_Address}</span>
                )}
            </div>
            <div className="text-center">
                {isEditing ? (
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                ) : (
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                        onClick={handleEdit}
                    >
                        Edit
                    </button>
                )}
            </div>

            {/* Button to toggle policies */}
            <div className="mt-6 text-center">
                <button
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                    onClick={togglePolicies}
                >
                    {showPolicies ? 'Hide Policies' : 'My Policies'}
                </button>
            </div>

            {/* Display Assigned Policies in a Table */}
            {showPolicies && (
                <div className="mt-6">
                    <h3 className="text-xl font-bold mb-4 text-center">Assigned Policies</h3>
                    {policies.length > 0 ? (
                        <table className="table-auto w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border border-gray-300 px-4 py-2">Policy Name</th>
                                    <th className="border border-gray-300 px-4 py-2">Premium Amount</th>
                                    <th className="border border-gray-300 px-4 py-2">Coverage Details</th>
                                    <th className="border border-gray-300 px-4 py-2">Validity Period</th>
                                </tr>
                            </thead>
                            <tbody>
                                {policies.map((policy) => (
                                    <tr key={policy.policy_ID} className="text-center">
                                        <td className="border border-gray-300 px-4 py-2">{policy.policy_Name}</td>
                                        <td className="border border-gray-300 px-4 py-2">${policy.premiumAmount}</td>
                                        <td className="border border-gray-300 px-4 py-2">{policy.coverageDetails}</td>
                                        <td className="border border-gray-300 px-4 py-2">{policy.validityPeriod}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-gray-600 text-center">No policies assigned.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserProfile;