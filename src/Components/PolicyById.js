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

    if (loading) return <p>Loading policy details...</p>;
    if (error) return <p className="text-red-600">{error}</p>;

    const handleBuyPolicy = () => {
        token ? navigate(`/BuyPolicy?policyId=${id}`) : navigate(`/Login?redirect=/BuyPolicy?policyId=${id}`); // Navigate to BuyPolicy component with policy ID
    };

    return (
        <div className="p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">{policy.policy_Name}</h2>
            <p><strong>Premium Amount:</strong> ${policy.premiumAmount}</p>
            <p><strong>Coverage Details:</strong> {policy.coverageDetails}</p>
            <p><strong>Validity Period:</strong> {policy.validityPeriod}</p>
            <p><strong>Agent Name:</strong> {policy.agent?.agent_Name}</p>
            <button
                onClick={handleBuyPolicy} // Navigate to BuyPolicy component
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
                Buy Policy
            </button>
        </div>
    );
};

export default PolicyDetails;