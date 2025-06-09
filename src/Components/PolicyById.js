// import React, { useEffect, useState, useContext } from "react";
// import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate for navigation
// import { StoreContext } from "../services/StoreContext";

// const PolicyDetails = () => {
//     const { axiosInstance, token } = useContext(StoreContext); // Use axiosInstance from StoreContext
//     const { id } = useParams(); // Get policy ID from URL
//     const navigate = useNavigate(); // Initialize useNavigate for navigation
//     const [policy, setPolicy] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchPolicyDetails = async () => {
//             try {
//                 const response = await axiosInstance.get(`/api/Policies/${id}`); // Fetch policy details
//                 setPolicy(response.data);
//             } catch (err) {
//                 console.error("Error fetching policy details:", err);
//                 setError("Failed to load policy details. Please try again later.");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchPolicyDetails();
//     }, [id, axiosInstance]);

//     if (loading) return <p>Loading policy details...</p>;
//     if (error) return <p className="text-red-600">{error}</p>;

//     const handleBuyPolicy = () => {
//         token ? navigate(`/BuyPolicy?policyId=${id}`) : navigate(`/Login?redirect=/BuyPolicy?policyId=${id}`); // Navigate to BuyPolicy component with policy ID
//     };

//     return (
//         <div className="p-6 bg-white shadow-md rounded-md">
//             <h2 className="text-2xl font-bold text-blue-600 mb-4">{policy.policy_Name}</h2>
//             <p><strong>Insured Value (IDV):</strong> ₹  {new Intl.NumberFormat('en-IN').format(policy.issuredValue)}</p> {/* Added comma formatting */}
//             <p><strong>Premium Amount:</strong> ₹  {new Intl.NumberFormat('en-IN').format(policy.premiumAmount)}</p> {/* Added comma formatting */}
//             <p><strong>Coverage Details:</strong> {policy.coverageDetails}</p>
//             <p><strong>Validity Period:</strong> {policy.validityPeriod}</p>
    
//             {/* <p><strong>Agent Name:</strong> {policy.agent?.agent_Name}</p> */}
//             <button
//                 onClick={handleBuyPolicy} // Navigate to BuyPolicy component
//                 className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//             >
//                 Buy Policy
//             </button>
//         </div>
//     );
// };

// export default PolicyDetails;

import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { StoreContext } from "../services/StoreContext";

const PolicyDetails = () => {
    const { axiosInstance, token } = useContext(StoreContext); // Use axiosInstance from StoreContext
    const { id } = useParams(); // Get policy ID from URL
    const navigate = useNavigate(); // Initialize useNavigate for navigation
    const [policy, setPolicy] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPolicyDetails = async () => {
            try {
                const response = await axiosInstance.get(`/api/Policies/${id}`); // Fetch policy details
                setPolicy(response.data);
            } catch (err) {
                console.error("Error fetching policy details:", err);
                setError("Failed to load policy details. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchPolicyDetails();
    }, [id, axiosInstance]);

    const handleBuyPolicy = () => {
        // Redirect to BuyPolicy component, passing policyId as a query parameter.
        // If not logged in, redirect to login page first, then back to BuyPolicy.
        token ? navigate(`/BuyPolicy?policyId=${id}`) : navigate(`/Login?redirect=/BuyPolicy?policyId=${id}`);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-xl font-medium text-gray-700 animate-pulse">
                    Loading policy details...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-red-50 p-4">
                <div className="bg-white p-8 rounded-lg shadow-lg text-center border border-red-300">
                    <p className="text-red-600 text-lg font-semibold mb-4">{error}</p>
                    <button
                        onClick={() => navigate('/')}
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 shadow-md"
                    >
                        Go to Home
                    </button>
                </div>
            </div>
        );
    }

    if (!policy) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
                <div className="bg-white p-8 rounded-lg shadow-lg text-center border border-gray-300">
                    <p className="text-gray-700 text-lg font-semibold mb-4">Policy not found.</p>
                    <button
                        onClick={() => navigate('/policies')}
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 shadow-md"
                    >
                        Browse Other Policies
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="bg-white shadow-xl rounded-xl p-8 sm:p-10 lg:p-12 max-w-2xl w-full transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl border border-gray-200">
                <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-6 leading-tight">
                    {policy.policy_Name}
                </h2>
                <p className="text-gray-600 text-center mb-8 text-lg">
                    Detailed information about this policy.
                </p>

                <div className="space-y-5 mb-8">
                    <div className="bg-indigo-50 p-4 rounded-lg flex items-center shadow-sm border border-indigo-200">
                        <span className="text-indigo-600 text-xl mr-3">💰</span>
                        <p className="text-lg text-gray-800">
                            <strong className="font-semibold text-indigo-700">Insured Value (IDV):</strong> ₹ {new Intl.NumberFormat('en-IN').format(policy.issuredValue)}
                        </p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg flex items-center shadow-sm border border-green-200">
                        <span className="text-green-600 text-xl mr-3">💸</span>
                        <p className="text-lg text-gray-800">
                            <strong className="font-semibold text-green-700">Premium Amount:</strong> ₹ {new Intl.NumberFormat('en-IN').format(policy.premiumAmount)}
                        </p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg flex items-start shadow-sm border border-purple-200">
                        <span className="text-purple-600 text-xl mr-3 mt-1">🛡️</span>
                        <p className="text-lg text-gray-800 flex-1">
                            <strong className="font-semibold text-purple-700">Coverage Details:</strong> {policy.coverageDetails}
                        </p>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg flex items-center shadow-sm border border-yellow-200">
                        <span className="text-yellow-600 text-xl mr-3">🗓️</span>
                        <p className="text-lg text-gray-800">
                            <strong className="font-semibold text-yellow-700">Validity Period:</strong> {policy.validityPeriod}
                        </p>
                    </div>
                    {/* Keep this commented out if agent data is not consistently available or not needed for display */}
                    {/* {policy.agent?.agent_Name && (
                        <div className="bg-gray-50 p-4 rounded-lg flex items-center shadow-sm border border-gray-200">
                            <span className="text-gray-600 text-xl mr-3">🧑‍💼</span>
                            <p className="text-lg text-gray-800">
                                <strong className="font-semibold text-gray-700">Agent Name:</strong> {policy.agent.agent_Name}
                            </p>
                        </div>
                    )} */}
                </div>

                <div className="text-center mt-10">
                    <button
                        onClick={handleBuyPolicy}
                        className="px-10 py-4 bg-blue-600 text-white text-xl font-bold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
                    >
                        Buy Policy Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PolicyDetails;