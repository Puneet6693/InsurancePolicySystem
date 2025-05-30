
import React, { useState, useContext } from "react";
import { StoreContext } from "../services/StoreContext";

const AddPolicyForm = () => {
    const { axiosInstance } = useContext(StoreContext); // Use axiosInstance from StoreContext
    const [formData, setFormData] = useState({
        policy_Name: "",
        premiumAmount: "",
        coverageDetails: "",
        validityPeriod: "",
        agentID: "",
    });
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState("");

    const validate = () => {
        let tempErrors = {};
        const policyNameRegex = /^[a-zA-Z0-9\s]{3,50}$/; // Alphanumeric, 3-50 characters

        if (!formData.policy_Name.trim()) {
            tempErrors.policy_Name = "Policy Name is required!";
        } else if (!policyNameRegex.test(formData.policy_Name)) {
            tempErrors.policy_Name = "Policy Name must be alphanumeric and 3-50 characters long!";
        }

        if (!formData.premiumAmount.trim() || isNaN(formData.premiumAmount) || Number(formData.premiumAmount) <= 0) {
            tempErrors.premiumAmount = "Premium Amount must be a positive number!";
        }

        if (!formData.coverageDetails.trim()) {
            tempErrors.coverageDetails = "Coverage Details are required!";
        }

        if (!formData.validityPeriod.trim()) {
            tempErrors.validityPeriod = "Validity Period is required!";
        }

        if (!formData.agentID.trim() || isNaN(formData.agentID) || Number(formData.agentID) <= 0) {
            tempErrors.agentID = "Agent ID must be a positive number!";
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    
        if (name === "validityStart" || name === "validityEnd") {
            if (formData.validityStart && formData.validityEnd) {
                setFormData((prevData) => ({
                    ...prevData,
                    validityPeriod: `${prevData.validityStart} to ${prevData.validityEnd}`,
                }));
            }
        }
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            const response = await axiosInstance.post("/api/Policies", formData); // Use axiosInstance
            console.log(response.data);
            setMessage(`Success! ${response.data.message}`);
            setFormData({
                policy_Name: "",
                premiumAmount: "",
                coverageDetails: "",
                validityPeriod: "",
                agentID: "",
            }); // Reset form
            setErrors({});
        } catch (error) {
            console.error("Error submitting form:", error);
            if (error.response?.data?.message) {
                setMessage("Error: " + error.response.data.message);
            } else {
                setMessage("Error submitting form: " + error.message);
            }
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-md shadow-md w-96">
                <h2 className="text-lg font-bold mb-4 text-center">Add Policy</h2>
                {message && <p className="text-green-600 text-center">{message}</p>}
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
                        min="1" // Prevent negative values
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
                        min="1" // Prevent negative values
                        required
                    />
                    {errors.agentID && <p style={{ color: "red" }}>{errors.agentID}</p>}

                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md">
                        Add Policy
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddPolicyForm;