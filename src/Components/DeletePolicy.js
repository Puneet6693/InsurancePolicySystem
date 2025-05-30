import React, { useState, useContext } from "react";
import { StoreContext } from "../services/StoreContext"; // Import StoreContext

const DeletePolicy = () => {
    const { axiosInstance } = useContext(StoreContext); // Use axiosInstance from StoreContext
    const [policyId, setPolicyId] = useState("");
    const [policyDetails, setPolicyDetails] = useState(null);
    const [message, setMessage] = useState("");

    const handlePolicyIdChange = (e) => {
        setPolicyId(e.target.value);
    };

    const fetchPolicy = async () => {
        if (!policyId.trim()) {
            setMessage("Error: Policy ID is required.");
            return;
        }

        try {
            const response = await axiosInstance.get(`/api/Policies/${policyId}`); // Use axiosInstance
            if (response.status === 200) {
                setPolicyDetails(response.data);
                setMessage("Policy details loaded successfully!");
            } else {
                setMessage("Error fetching policy details.");
            }
        } catch (error) {
            console.error("Error fetching policy:", error);
            if (error.response) {
                setMessage(`Error: ${error.response.data.message || "Failed to fetch policy details."}`);
            } else if (error.request) {
                setMessage("Error: No response from the server. Please check your network connection.");
            } else {
                setMessage(`Error: ${error.message}`);
            }
        }
    };

    const handleDelete = async () => {
        if (!policyId.trim()) {
            setMessage("Error: Policy ID is required for deletion.");
            return;
        }

        try {
            await axiosInstance.delete(`/api/Policies/${policyId}`); // Use axiosInstance
            setMessage("Policy deleted successfully!");
            setPolicyDetails(null);
        } catch (error) {
            console.error("Error deleting policy:", error);
            if (error.response) {
                setMessage(`Error: ${error.response.data.message || "Failed to delete policy."}`);
            } else if (error.request) {
                setMessage("Error: No response from the server. Please check your network connection.");
            } else {
                setMessage(`Error: ${error.message}`);
            }
        }
    };

    return (
        <div
            className="flex flex-col justify-center items-center min-h-screen bg-cover bg-center"
            style={{ backgroundColor: "black" }}
        >
            <div className="bg-white p-6 rounded-md shadow-md w-96">
                <h2 className="text-lg font-bold mb-4 text-center">Delete Policy</h2>
                {message && <p className="text-green-600 text-center">{message}</p>}

                {/* Policy ID Input */}
                <div className="mb-4">
                    <input
                        type="text"
                        name="policyId"
                        placeholder="Enter Policy ID"
                        className="w-full px-4 py-2 border rounded-md"
                        onChange={handlePolicyIdChange}
                        value={policyId}
                    />
                    <button onClick={fetchPolicy} className="w-full bg-blue-600 text-white py-2 rounded-md mt-2">
                        Fetch Policy
                    </button>
                </div>

                {/* Policy Details */}
                {policyDetails && (
                    <div className="mb-4 p-4 border rounded-md bg-gray-50">
                        <p><strong>Policy Name:</strong> {policyDetails.policy_Name}</p>
                        <p><strong>Premium Amount:</strong> {policyDetails.premiumAmount}</p>
                        <p><strong>Coverage Details:</strong> {policyDetails.coverageDetails}</p>
                        <p><strong>Validity Period:</strong> {policyDetails.validityPeriod}</p>
                        <p><strong>Agent ID:</strong> {policyDetails.agentID}</p>
                    </div>
                )}

                {/* Delete Button */}
                {policyDetails && (
                    <button onClick={handleDelete} className="w-full bg-red-600 text-white py-2 rounded-md mt-4">
                        Delete Policy
                    </button>
                )}
            </div>
        </div>
    );
};

export default DeletePolicy;