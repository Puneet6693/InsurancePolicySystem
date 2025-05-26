import React, { useState } from "react";
import axios from "axios";

const ClaimForm = () => {
    const [formData, setFormData] = useState({
        policyID: "",
        customer_ID: "",
        claimAmount: "",
    });
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState("");

    const validate = () => {
        let tempErrors = {};
        if (!formData.policyID.trim() || isNaN(formData.policyID)) tempErrors.policyID = "Valid Policy ID is required!";
        if (!formData.customer_ID.trim() || isNaN(formData.customer_ID)) tempErrors.customer_ID = "Valid Customer ID is required!";
        if (!formData.claimAmount.trim() || isNaN(formData.claimAmount)) tempErrors.claimAmount = "Valid Claim Amount is required!";

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            const response = await axios.post("https://localhost:7251/api/Claims", formData);
            console.log(response.data);
            setMessage("Calaim added successfully!");
            setFormData({
                policyID: "",
                customer_ID: "",
                claimAmount: "",
            }); // Reset form
            setErrors({});
        } catch (error) {
            setMessage("Error submitting form: " + error.message);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-md shadow-md w-96">
                <h2 className="text-lg font-bold mb-4 text-center">File Claim</h2>
                {message && <p className="text-green-600 text-center">{message}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="number"
                        name="policyID"
                        placeholder="Policy ID"
                        className="w-full px-4 py-2 border rounded-md"
                        onChange={handleChange}
                        value={formData.policyID}
                        required
                    />
                    {errors.policyID && <p style={{ color: "red" }}>{errors.policyID}</p>}

                    <input
                        type="number"
                        name="customer_ID"
                        placeholder="Customer ID"
                        className="w-full px-4 py-2 border rounded-md"
                        onChange={handleChange}
                        value={formData.customer_ID}
                        required
                    />
                    {errors.customer_ID && <p style={{ color: "red" }}>{errors.customer_ID}</p>}

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

                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md">
                        Add Claim
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ClaimForm;