import React, { useState, useContext, useEffect } from 'react';
import { StoreContext } from '../../services/StoreContext'; // Import StoreContext for token management
import { useSearchParams } from 'react-router-dom'; // Import useSearchParams to read query parameters

const BuyPolicy = () => {
    const { token, user } = useContext(StoreContext); // Access token and user from StoreContext
    const [searchParams] = useSearchParams(); // Initialize useSearchParams
    const policyId = searchParams.get("policyId"); // Get policyId from query params
    const [customerId, setCustomerId] = useState(null); // Customer ID fetched from backend
    const [policyDetails, setPolicyDetails] = useState(null); // Policy details fetched from backend
    const [message, setMessage] = useState('');
    const [isCustomerRegistered, setIsCustomerRegistered] = useState(false); // Check if user is registered as a customer

    // Fetch customer details
    useEffect(() => {
        const fetchCustomerDetails = async () => {
            try {
                const response = await fetch(`https://localhost:7251/api/Customers`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`, // Include token in Authorization header
                    },
                });

                if (response.ok) {
                    const customerData = await response.json();
                    setCustomerId(customerData.customer_ID); // Set customer ID
                    setIsCustomerRegistered(true); // Mark user as registered
                } else {
                    setIsCustomerRegistered(false); // User is not registered as a customer
                }
            } catch (error) {
                console.error('Error fetching customer details:', error);
                setIsCustomerRegistered(false);
            }
        };

        fetchCustomerDetails();
    }, [user, token]);

    // Fetch policy details
    useEffect(() => {
        const fetchPolicyDetails = async () => {
            try {
                const response = await fetch(`https://localhost:7251/api/Policies/${policyId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`, // Include token in Authorization header
                    },
                });

                if (response.ok) {
                    const policyData = await response.json();
                    setPolicyDetails(policyData); // Set policy details
                } else {
                    console.error('Failed to fetch policy details:', response.statusText);
                    setMessage('Unable to fetch policy details. Please try again later.');
                }
            } catch (error) {
                console.error('Error fetching policy details:', error);
                setMessage('An error occurred while fetching policy details.');
            }
        };

        if (policyId) {
            fetchPolicyDetails();
        }
    }, [policyId, token]);

    // Buy policy for the registered customer
    const handleBuyPolicy = async () => {
        if (!isCustomerRegistered) {
            setMessage('Please register as a customer before buying a policy.');
            return;
        }

        try {
            const response = await fetch(`https://localhost:7251/api/CustomerPolicies?policyId=${policyId}&customerId=${customerId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, // Include token in Authorization header
                },
            });

            if (response.ok) {
                setMessage("Policy purchased successfully!");
            } else {
                const errorData = await response.json();
                console.error('Failed to purchase policy:', errorData);
                setMessage('Unable to purchase policy. Please try again later.');
            }
        } catch (error) {
            console.error('Error purchasing policy:', error);
            setMessage('An unexpected error occurred while purchasing the policy.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-md shadow-md w-96">
                <h2 className="text-lg font-bold mb-4 text-center">Buy Policy</h2>
                {policyDetails && (
                    <>
                        <p><strong>Policy Name:</strong> {policyDetails.policy_Name}</p>
                        <p><strong>Premium Amount:</strong> ${policyDetails.premiumAmount}</p>
                        <p><strong>Coverage Details:</strong> {policyDetails.coverageDetails}</p>
                        <p><strong>Validity Period:</strong> {policyDetails.validityPeriod}</p>
                    </>
                )}
                {!isCustomerRegistered ? (
                    <>
                        <p className="text-red-600 mb-4 text-center">You are not registered as a customer.</p>
                        <button
                            onClick={() => setMessage('Please contact support to resolve this issue.')}
                            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                        >
                            Contact Support
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={handleBuyPolicy}
                            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                        >
                            Buy Policy
                        </button>
                    </>
                )}
                {message && <p className="text-center mt-4 text-green-600">{message}</p>}
            </div>
        </div>
    );
};

export default BuyPolicy;