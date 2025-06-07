// 

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
        setShowPolicies(!showPolicies); // Toggle the visibility of the policies section
    };

    return (
        <div className="max-w-6xl mx-auto p-8 bg-gray-50 rounded-lg shadow-xl">
            <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-10">Your Profile</h2>
            {error && <p className="text-red-600 text-center mb-6 text-lg font-medium">{error}</p>}

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Column: User Profile Details */}
                <div className="lg:w-1/3 p-6 bg-white rounded-lg shadow-md border border-gray-200">
                    <h3 className="text-2xl font-bold text-gray-700 mb-6 border-b pb-3">Personal Information</h3>
                    <div className="mb-5">
                        <label className="block text-gray-600 font-semibold mb-2">Customer ID:</label>
                        <span className="block p-3 bg-blue-50 text-blue-800 font-extrabold rounded-md text-lg">
                            {user.customer_ID}
                        </span>
                    </div>
                    <div className="mb-5">
                        <label className="block text-gray-600 font-semibold mb-2">Name:</label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="customer_Name"
                                value={user.customer_Name}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                            />
                        ) : (
                            <span className="block p-3 bg-gray-100 text-gray-800 rounded-md">
                                {user.customer_Name}
                            </span>
                        )}
                    </div>
                    <div className="mb-5">
                        <label className="block text-gray-600 font-semibold mb-2">Email:</label>
                        {isEditing ? (
                            <input
                                type="email"
                                name="customer_Email"
                                value={user.customer_Email}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                            />
                        ) : (
                            <span className="block p-3 bg-gray-100 text-gray-800 rounded-md">
                                {user.customer_Email}
                            </span>
                        )}
                    </div>
                    <div className="mb-5">
                        <label className="block text-gray-600 font-semibold mb-2">Phone:</label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="customer_Phone"
                                value={user.customer_Phone}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                            />
                        ) : (
                            <span className="block p-3 bg-gray-100 text-gray-800 rounded-md">
                                {user.customer_Phone}
                            </span>
                        )}
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-600 font-semibold mb-2">Address:</label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="customer_Address"
                                value={user.customer_Address}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                            />
                        ) : (
                            <span className="block p-3 bg-gray-100 text-gray-800 rounded-md">
                                {user.customer_Address}
                            </span>
                        )}
                    </div>
                    <div className="text-center">
                        {isEditing ? (
                            <button
                                className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300"
                                onClick={handleSave}
                            >
                                Save Changes
                            </button>
                        ) : (
                            <button
                                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300"
                                onClick={handleEdit}
                            >
                                Edit Profile
                            </button>
                        )}
                    </div>
                </div>

                {/* Right Column: Assigned Policies */}
                <div className="lg:w-2/3 p-6 bg-white rounded-lg shadow-md border border-gray-200">
                    <h3 className="text-2xl font-bold text-gray-700 mb-6 border-b pb-3">My Policies</h3>

                    <div className="text-center mb-6">
                        <button
                            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-md shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-300"
                            onClick={togglePolicies}
                        >
                            {showPolicies ? 'Hide My Policies' : 'View My Policies'}
                        </button>
                    </div>

                    {showPolicies && (
                        <div className="mt-6">
                            {policies.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {policies.map((policy) => (
                                        // Check if customerPolicies exist and have data
                                        policy.customerPolicies && policy.customerPolicies.length > 0 ? (
                                            policy.customerPolicies.map((customerPolicy) => (
                                                <div key={customerPolicy.customerPolicy_ID} className="bg-gradient-to-br from-purple-50 to-indigo-100 p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl border border-indigo-200">
                                                    <h4 className="text-xl font-bold text-indigo-800 mb-3">{policy.policy_Name}</h4>
                                                    <p className="text-gray-700 mb-2">
                                                        <span className="font-semibold">Premium:</span> ₹{policy.premiumAmount}
                                                    </p>
                                                    <p className="text-gray-700 mb-2">
                                                        <span className="font-semibold">Coverage:</span> {policy.coverageDetails}
                                                    </p>
                                                    <p className="text-gray-700 mb-2">
                                                        <span className="font-semibold">Validity:</span> {policy.validityPeriod}
                                                    </p>
                                                    <p className="text-gray-700 mb-2">
                                                        <span className="font-semibold">Insured Value:</span> {policy.issuredValue}
                                                    </p>
                                                    <p className="text-gray-700 mb-2">
                                                        <span className="font-semibold">Start Date:</span> {customerPolicy.startDate  }
                                                    </p>
                                                    <p className="text-gray-700 mb-2">
                                                        <span className="font-semibold">End Date:</span> {customerPolicy.endDate }
                                                    </p>
                                                    <p className="text-gray-700">
                                                        <span className="font-semibold">Renew Date:</span> {customerPolicy.renewDate  }
                                                    </p>
                                                </div>
                                            ))
                                        ) : (
                                            // Fallback for policies without customerPolicies or empty customerPolicies
                                            <div key={policy.policyID} className="bg-gradient-to-br from-purple-50 to-indigo-100 p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl border border-indigo-200">
                                                <h4 className="text-xl font-bold text-indigo-800 mb-3">{policy.policy_Name}</h4>
                                                <p className="text-gray-700 mb-2">
                                                    <span className="font-semibold">Premium:</span> ₹{policy.premiumAmount}
                                                </p>
                                                <p className="text-gray-700 mb-2">
                                                    <span className="font-semibold">Coverage:</span> {policy.coverageDetails}
                                                </p>
                                                <p className="text-gray-700 mb-2">
                                                    <span className="font-semibold">Validity:</span> {policy.validityPeriod}
                                                </p>
                                                <p className="text-gray-700">
                                                    <span className="font-semibold">Insured Value:</span> {policy.issuredValue}
                                                </p>
                                                <p className="text-gray-500 mt-4 italic">No specific customer policy details available for this general policy.</p>
                                            </div>
                                        )
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-600 text-center text-lg mt-8">No policies assigned to your account yet.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;