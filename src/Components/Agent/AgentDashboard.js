

import React, { useState } from "react";
import axios from "axios";

const AgentDashboard = () => {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage("");

        try {
            const token = localStorage.getItem("token"); // Retrieve token from localStorage
            const response = await axios.post(
                "https://localhost:7251/api/Agents",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include token in Authorization header
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 201) {
                setMessage("Agent added successfully!");
                setFormData({ name: "", phone: "" }); // Reset form
            } else {
                setMessage("Failed to add agent. Please try again.");
            }
        } catch (error) {
            console.error("Error adding agent:", error);
            setMessage("An error occurred while adding the agent.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Add Agent</h2>
                {message && (
                    <p
                        className={`text-center mb-4 ${
                            message.includes("successfully")
                                ? "text-green-600"
                                : "text-red-600"
                        }`}
                    >
                        {message}
                    </p>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-gray-700 font-semibold mb-2"
                        >
                            Name:
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="phone"
                            className="block text-gray-700 font-semibold mb-2"
                        >
                            Phone Number:
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            id="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full bg-blue-600 text-white font-semibold py-3 rounded hover:bg-blue-700 transition-colors ${
                            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    >
                        {isSubmitting ? "Submitting..." : "Add Agent"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AgentDashboard;