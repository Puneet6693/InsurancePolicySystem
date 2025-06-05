
 
import React, { useState, useContext } from "react";
import { StoreContext } from "../../services/StoreContext"; // Import StoreContext
 
const DeleteAgent = () => {
    const { axiosInstance } = useContext(StoreContext); // Use axiosInstance from StoreContext
    const [agentId, setAgentId] = useState("");
    const [agentDetails, setAgentDetails] = useState(null);
    const [message, setMessage] = useState("");
 
    const handleAgentIdChange = (e) => {
        setAgentId(e.target.value);
    };
 
    const fetchAgent = async () => {
        if (!agentId.trim()) {
            setMessage("Error: Agent ID is required.");
            return;
        }
 
        try {
            const response = await axiosInstance.get(`/api/Agents/${agentId}`); // Use axiosInstance
            if (response.status === 200) {
                setAgentDetails(response.data);
                setMessage("Agent details loaded successfully!");
            } else {
                setMessage("Error fetching agent details.");
            }
        } catch (error) {
            console.error("Error fetching agent:", error);
            if (error.response) {
                setMessage(`Error: ${error.response.data.message || "Failed to fetch agent details."}`);
            } else if (error.request) {
                setMessage("Error: No response from the server. Please check your network connection.");
            } else {
                setMessage(`Error: ${error.message}`);
            }
        }
    };
 
    const handleDelete = async () => {
        if (!agentId.trim()) {
            setMessage("Error: Agent ID is required for deletion.");
            return;
        }
 
        try {
            const response = await axiosInstance.delete(`/api/Agents/${agentId}`); // Call the updated API endpoint
            if (response.status === 200) {
                setMessage("Agent deleted and policies reassigned successfully!");
                setAgentDetails(null);
            } else {
                setMessage("Error deleting agent.");
            }
        } catch (error) {
            console.error("Error deleting agent:", error);
            if (error.response) {
                setMessage(`Error: ${error.response.data.message || "Failed to delete agent."}`);
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
            style={{ backgroundColor: "lightgrey" }}
        >
            <div className="bg-white p-6 rounded-md shadow-md w-96">
                <h2 className="text-lg font-bold mb-4 text-center">Delete Agent</h2>
                {message && <p className="text-green-600 text-center">{message}</p>}
 
                {/* Agent ID Input */}
                <div className="mb-4">
                    <input
                        type="text"
                        name="agentId"
                        placeholder="Enter Agent ID"
                        className="w-full px-4 py-2 border rounded-md"
                        onChange={handleAgentIdChange}
                        value={agentId}
                    />
                    <button onClick={fetchAgent} className="w-full bg-blue-600 text-white py-2 rounded-md mt-2">
                        Fetch Agent
                    </button>
                </div>
 
                {/* Agent Details */}
                {agentDetails && (
                    <div className="mb-4 p-4 border rounded-md bg-gray-50">
                        <p><strong>Agent Name:</strong> {agentDetails.agent_Name}</p>
                        <p><strong>Contact Info:</strong> {agentDetails.contactInfo}</p>
                    </div>
                )}
 
                {/* Delete Button */}
                {agentDetails && (
                    <button onClick={handleDelete} className="w-full bg-red-600 text-white py-2 rounded-md mt-4">
                        Delete Agent
                    </button>
                )}
            </div>
        </div>
    );
};
 
export default DeleteAgent;
 
