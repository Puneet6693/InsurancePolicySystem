import { useState, useContext, useEffect } from "react";
import { StoreContext } from "../../services/StoreContext";
import axios from "axios";
import AssignedPolicy from "./AssignedPolicy"; // Import AssignedPolicy component

const AgentDashboard = () => {
    const { token } = useContext(StoreContext); // Access token from StoreContext
    const [isProfileComplete, setIsProfileComplete] = useState(false);
    const [loading, setLoading] = useState(true);    
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

            const response = await axios.post(
                "https://localhost:7251/api/Agents",
                {
                    agent_Name: formData.name,
                    contactInfo: formData.phone,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Use token from StoreContext
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 201) {
                setMessage("Agent added successfully!");
                setFormData({ name: "", phone: "" }); // Reset form
                setIsProfileComplete(true); // Update profile status
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

    useEffect(() => {
      const checkProfileStatus = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await fetch("https://localhost:7251/IsAgentProfileComplete", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const isComplete = await response.json();
          // console.log("Profile status:", isComplete);
          setIsProfileComplete(isComplete);
        } catch (error) {
          console.error("Error checking profile status:", error);
        } finally {
          setLoading(false);
        }
      };
    
      checkProfileStatus();
    }, []);


    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-xl font-semibold text-gray-700">Loading...</p>
            </div>
        );
    }

    if (!isProfileComplete && token) {
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
    }

  return (
    <AssignedPolicy />
  );
}

export default AgentDashboard;