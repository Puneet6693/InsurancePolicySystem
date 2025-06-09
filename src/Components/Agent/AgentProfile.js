

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AgentProfile = () => {
    const [user, setUser] = useState({
       
        agent_Name: '',
        contactInfo: '',
       
    });

    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchUserDetails = async () => {
        try {
            const response = await axios.get('https://localhost:7251/api/Agents/GetAgentById', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log('API Response:', response.data);
            setUser(response.data); 
        } catch (error) {
            console.error('Error fetching user details:', error.response ? error.response.data : error);
            setError('Failed to fetch user details. Please try again later.');
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
            const payload = {
                agent_Name: user.agent_Name,
                contactInfo: user.contactInfo,
            };
    
            const response = await axios.put('https://localhost:7251/api/Agents/UpdateAgentProfile', payload, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });
    
            console.log('User info saved:', response.data);
            setError(''); // Clear any previous errors
        setError('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error.response ? error.response.data : error);
            setError('Failed to update user details. Please try again later.');
        }
    };
    

    return (
        <div className="max-w-6xl mx-auto p-8 bg-gray-50 rounded-lg shadow-xl">
            <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-10">Your Profile</h2>
            {error && <p className="text-red-600 text-center mb-6 text-lg font-medium">{error}</p>}

            <div className="flex flex-col lg:flex-row gap-8">
                
                <div className="lg:w-1/3 p-6 bg-white rounded-lg shadow-md border border-gray-200">
                    <h3 className="text-2xl font-bold text-gray-700 mb-6 border-b pb-3">Personal Information</h3>
                    
                    <div className="mb-5">
                        <label className="block text-gray-600 font-semibold mb-2">Agent Name:</label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="agent_Name"
                                value={user.agent_Name}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                            />
                        ) : (
                            <span className="block p-3 bg-gray-100 text-gray-800 rounded-md">
                                {user.agent_Name}
                            </span>
                        )}
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-600 font-semibold mb-2">contactInfo:</label>
                        {isEditing ? (
                            <input
                            type="text"
                            name="contactInfo"  // Change this from "contactinfo" to "contactInfo"
                            value={user.contactInfo}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                        />
                        ) : (
                            <span className="block p-3 bg-gray-100 text-gray-800 rounded-md">
                                {user.contactInfo}
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

       
                
            </div>
        </div>
    );
};

export default AgentProfile;