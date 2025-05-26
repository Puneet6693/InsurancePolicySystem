import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdatePolicy = () => {
    const [policyId, setPolicyId] = useState(""); // Allow manual input for policy ID
    const [formData, setFormData] = useState({
        policy_Name: "",
        premiumAmount: "",
        coverageDetails: "",
        validityPeriod: "",
        agentID: "",
    });

    const [errors, setErrors] = useState({});
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
            const response = await axios.get(`https://localhost:7251/api/Policies/${policyId}`);
            if (response.status === 200) {
                setFormData(response.data);
                setMessage("Policy details loaded successfully!");
            } else {
                setMessage("Error fetching policy details.");
            }
        } catch (error) {
            setMessage("Error fetching policy: " + error.message);
        }
    };

    const validate = () => {
        let tempErrors = {};
    
        if (!formData.policy_Name.trim()) tempErrors.policy_Name = "Policy Name is required!";
        if (!formData.premiumAmount || isNaN(formData.premiumAmount)) tempErrors.premiumAmount = "Valid Premium Amount is required!";
        if (!formData.coverageDetails.trim()) tempErrors.coverageDetails = "Coverage Details are required!";
        if (!formData.validityPeriod.trim()) tempErrors.validityPeriod = "Validity Period is required!";
        
        // Convert agentID to string before trimming
        if (!String(formData.agentID).trim() || isNaN(formData.agentID)) tempErrors.agentID = "Valid Agent ID is required!";
    
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        if (!policyId.trim()) {
            setMessage("Error: Policy ID is required for updating.");
            return;
        }

        try {
            await axios.put(`https://localhost:7251/api/Policies/${policyId}`, formData);
            setMessage("Policy updated successfully!");
        } catch (error) {
            setMessage("Error updating policy: " + error.message);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-md shadow-md w-96">
                <h2 className="text-lg font-bold mb-4 text-center">Update Policy</h2>
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

                {/* Policy Update Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="policy_Name"
                        placeholder="Policy Name"
                        className="w-full px-4 py-2 border rounded-md"
                        onChange={handleChange}
                        value={formData.policy_Name}
                        required
                    />
                    {errors.policy_Name && <p style={{ color: "red" }}>{errors.policy_Name}</p>}

                    <input
                        type="number"
                        name="premiumAmount"
                        placeholder="Premium Amount"
                        className="w-full px-4 py-2 border rounded-md"
                        onChange={handleChange}
                        value={formData.premiumAmount}
                        required
                    />
                    {errors.premiumAmount && <p style={{ color: "red" }}>{errors.premiumAmount}</p>}

                    <input
                        type="text"
                        name="coverageDetails"
                        placeholder="Coverage Details"
                        className="w-full px-4 py-2 border rounded-md"
                        onChange={handleChange}
                        value={formData.coverageDetails}
                        required
                    />
                    {errors.coverageDetails && <p style={{ color: "red" }}>{errors.coverageDetails}</p>}

                    <input
                        type="date"
                        name="validityPeriod"
                        placeholder="Validity Period"
                        className="w-full px-4 py-2 border rounded-md"
                        onChange={handleChange}
                        value={formData.validityPeriod}
                        required
                    />
                    {errors.validityPeriod && <p style={{ color: "red" }}>{errors.validityPeriod}</p>}

                    <input
                        type="number"
                        name="agentID"
                        placeholder="Agent ID"
                        className="w-full px-4 py-2 border rounded-md"
                        onChange={handleChange}
                        value={formData.agentID}
                        required
                    />
                    {errors.agentID && <p style={{ color: "red" }}>{errors.agentID}</p>}

                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md">
                        Update Policy
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdatePolicy;
