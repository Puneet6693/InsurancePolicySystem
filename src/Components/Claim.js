// 

import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { StoreContext } from "../services/StoreContext";
 
const ClaimForm = () => {
    const { token } = useContext(StoreContext);
    const navigate = useNavigate(); // Initialize useNavigate for navigation
    const [formData, setFormData] = useState({
        policyID: "",
        customer_ID: "", // Default to 0 since customer_ID is an integer
        claimAmount: "", // Default to an empty string
        claimReason: "",
    });
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState("");
    const [policies, setPolicies] = useState([]); // State to store policies
 
    // Fetch customer details and set customer_ID
    useEffect(() => {
        const fetchCustomerDetails = async () => {
            try {
                const response = await axios.get(
                    "https://localhost:7251/api/Customers/GetCustomerById",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                        },
                    }
                );
                console.log("Fetched Customer Details:", response.data); // Debugging: Log the fetched customer details
 
                // Update the formData state with the fetched customer_ID
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    customer_ID: response.data.customer_ID || 0, // Set customer_ID as an integer
                }));
            } catch (error) {
                setMessage("Error fetching customer details. Please try again.");
            }
        };
 
        fetchCustomerDetails();
    }, [token]); // Dependency array ensures this runs when the token changes
 
    useEffect(() => {
        // Fetch policies assigned to the customer when customer_ID changes
        const fetchPolicies = async () => {
            if (!formData.customer_ID) {
                setPolicies([]); // Clear policies if customer_ID is empty or undefined
                return;
            }
 
            try {
                const response = await axios.get(
                    `https://localhost:7251/GetAllPoliciesByCustomerId?id=${formData.customer_ID}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                        },
                    }
                );
                setPolicies(response.data);
            } catch (error) {
                setPolicies([]); // Clear policies on error
            }
        };
 
        fetchPolicies();
    }, [formData.customer_ID, token]); // Dependency array ensures this runs when customer_ID or token changes
 
    const validate = () => {
        let tempErrors = {};
 
        // Validate policy selection
        if (!formData.policyID.trim()) tempErrors.policyID = "Policy selection is required!";
 
        // Validate customer ID
        if (!formData.customer_ID || isNaN(formData.customer_ID)) tempErrors.customer_ID = "Valid Customer ID is required!";
 
        // Validate claim amount
        if (!formData.claimAmount.trim() || isNaN(formData.claimAmount)) {
            tempErrors.claimAmount = "Valid Claim Amount is required!";
        } else if (parseFloat(formData.claimAmount) < 100) {
            tempErrors.claimAmount = "Claim Amount must be at least 100!";
        }
 
        // Validate claim reason (minimum character count of 30)
        if (!formData.claimReason.trim()) {
            tempErrors.claimReason = "Claim Reason is required!";
        } else if (formData.claimReason.trim().length < 10) {
            tempErrors.claimReason = "Claim Reason must contain at least 10 characters!";
        }
 
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };
 
    const handleChange = (e) => {
        const { name, value } = e.target;
 
        // Update formData
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };
 
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
 
        try {
            const response = await axios.post(
                "https://localhost:7251/api/Claims",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                    },
                }
            );
 
            // Display the success message from the backend
            setMessage(response.data.message || "Claim added successfully!");
 
            // Reset the form
            setFormData({
                policyID: "",
                customer_ID: formData.customer_ID, // Keep the customer_ID after form reset
                claimAmount: "",
                claimReason: "",
            });
            setErrors({});
            navigate("/ClaimList"); // Redirect to the Claims page after successful submission
        } catch (error) {
            // Handle backend error and display the message on the UI
            if (error.response && error.response.data) {
                const backendMessage = error.response.data.error || "An error occurred while filing the claim.";
                setMessage(`Error: ${backendMessage}`);
            } else {
                setMessage("An unexpected error occurred. Please try again.");
            }
        }
    };
 
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-md shadow-md w-96">
                <h2 className="text-lg font-bold mb-4 text-center">File Claim</h2>
                {message && <p className={`text-center ${message.includes("successfully") ? "text-green-600" : "text-red-600"}`}>{message}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="number"
                        name="customer_ID"
                        placeholder="Customer ID"
                        className="w-full px-4 py-2 border rounded-md"
                        onChange={handleChange}
                        value={formData.customer_ID}
                        hidden
                        required
                        readOnly // Make the field read-only since it's auto-filled
                    />
                    {errors.customer_ID && <p style={{ color: "red" }}>{errors.customer_ID}</p>}
 
                    <select
                        name="policyID"
                        className="w-full px-4 py-2 border rounded-md"
                        onChange={handleChange}
                        value={formData.policyID}
                        required
                        disabled={!policies.length} // Disable dropdown if no policies are available
                    >
                        <option value="">Select Policy</option>
                        {policies.map((policy) => (
                            <option key={policy.policyID} value={policy.policyID}>
                                {policy.policy_Name ? `${policy.policy_Name} (ID: ${policy.policyID})` : `Policy ID: ${policy.policyID}`}
                            </option>
                        ))}
                    </select>
                    {errors.policyID && <p style={{ color: "red" }}>{errors.policyID}</p>}
 
                    <input
                        type="number"
                        name="claimAmount"
                        placeholder="Claim Amount"
                        className="w-full px-4 py-2 border rounded-md"
                        onChange={handleChange}
                        value={formData.claimAmount}
                        required
                    />
                    {errors.claimAmount && <p style={{ color: "red" }}>{errors.claimAmount}</p>}
 
                    <textarea
                        name="claimReason"
                        placeholder="Claim Reason"
                        className="w-full px-4 py-2 border rounded-md"
                        onChange={handleChange}
                        value={formData.claimReason}
                        required
                        rows="4"
                    ></textarea>
                    {errors.claimReason && <p style={{ color: "red" }}>{errors.claimReason}</p>}
 
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md">
                        Add Claim
                    </button>
                </form>
            </div>
        </div>
    );
};
 
export default ClaimForm;