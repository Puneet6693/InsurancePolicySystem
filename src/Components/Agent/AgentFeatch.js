import React, { useState, useEffect, useContext } from 'react';
import { StoreContext } from "../../services/StoreContext";
 
export const AgentFeatch = () => {
    const { token } = useContext(StoreContext); // Access token from StoreContext
    const [agents, setAgents] = useState([]);
    const [error, setError] = useState(null);
 
    useEffect(() => {
        const fetchAgents = async () => {
            try {
                const response = await fetch("https://localhost:7251/api/Agents", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`, // Include token in Authorization header
                    },
                });
 
                if (response.ok) {
                    const agentsData = await response.json();
                    setAgents(agentsData);
                } else {
                    throw new Error("Failed to fetch agents. Please check your token or login again.");
                }
            } catch (err) {
                setError(err.message);
            }
        };
 
        fetchAgents();
    }, [token]); // Re-fetch data if token changes
 
    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Agent List</h2>
            {error && <p className="text-red-500 text-center mb-4">Error fetching data: {error}</p>}
            <div className="overflow-x-auto shadow-lg rounded-lg">
                <table className="table-auto w-full border border-gray-300 rounded-lg">
                    <thead className="bg-yellow-500 text-white">
                        <tr>
                            <th className="px-6 py-3 text-left font-semibold">AgentID</th>
                            <th className="px-6 py-3 text-left font-semibold">Agent_Name</th>
                            <th className="px-6 py-3 text-left font-semibold">ContactInfo</th>
                            <th className="px-6 py-3 text-left font-semibold">Assigned Policies</th>
                        </tr>
                    </thead>
                    <tbody>
                        {agents.length > 0 ? (
                            agents.map((agent) => (
                                <tr key={agent.agentID} className="hover:bg-gray-100">
                                    <td className="border px-6 py-3">{agent.agentID}</td>
                                    <td className="border px-6 py-3">{agent.agent_Name}</td>
                                    <td className="border px-6 py-3">{agent.contactInfo}</td>
                                    <td className="border px-6 py-3">
                                        {agent.assignedPolicies && agent.assignedPolicies.length > 0 ? (
                                            <ul className="list-disc pl-5">
                                                {agent.assignedPolicies.map((policy) => (
                                                    <li key={policy.policyID}>
                                                        {policy.policy_Name} (ID: {policy.policyID})
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <span>No policies assigned</span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="border px-6 py-3 text-center" colSpan="4">No data available.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
 
export default AgentFeatch;