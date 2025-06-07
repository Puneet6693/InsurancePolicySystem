import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AssignedPolicy = () => {
    const token = localStorage.getItem('token'); // Assuming agentId is stored in localStorage
    const [agentName, setAgentName] = useState('');
    const [agentInfo, setAgentInfo] = useState('');
    const [assignedPolicies, setAssignedPolicies] = useState([]);

    useEffect(() => {
        const fetchAgentData = async () => {
            try {
                const agent = await fetch('https://localhost:7251/api/Agents/GetAgentById', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}` // Ensure the token is included
                    }
                });
                const agentData = await agent.json();
                setAgentName(agentData.agent_Name);
                setAgentInfo(agentData.contactInfo);
                const response = await axios.get(`https://localhost:7251/api/Agents/${agentData.agentId}/assignedPolicies?name=${agentData.agent_Name}`,{
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log('Agent data fetched successfully:', response.data);
                setAssignedPolicies(response.data);
            } catch (error) {
                console.error('Error fetching agent data:', error);
            }
        };

        if (token) {
            fetchAgentData();
        }
    }, [ token]);

    if (!token || !agentName || !agentInfo || assignedPolicies.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div className="mt-40 px-8">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Agent Details</h1>
                <div className="mb-6">
                    <p className="text-lg text-gray-600"><strong>Name:</strong> {agentName}</p>
                    <p className="text-lg text-gray-600"><strong>Contact Info:</strong> {agentInfo}</p>
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Assigned Policies</h2>
                <div className="overflow-x-auto">
                    <table className="table-auto w-full border border-gray-300 rounded-lg">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-left text-gray-600 font-medium">Policy Name</th>
                                <th className="px-4 py-2 text-left text-gray-600 font-medium">Insured Value</th>
                                <th className="px-4 py-2 text-left text-gray-600 font-medium">Premium Amount</th>
                                <th className="px-4 py-2 text-left text-gray-600 font-medium">Coverage Details</th>
                                <th className="px-4 py-2 text-left text-gray-600 font-medium">Validity Period</th>
                                <th className="px-4 py-2 text-left text-gray-600 font-medium">Active Status</th>
                                <th className="px-4 py-2 text-left text-gray-600 font-medium">View Customers</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(assignedPolicies) && assignedPolicies.map((policy) => (
                                <tr key={policy.policyID} className="border-t border-gray-300">
                                    <td className="px-4 py-2 text-gray-700">{policy.policy_Name}</td>
                                    <td className="px-4 py-2 text-gray-700">{policy.issuredValue}</td>
                                    <td className="px-4 py-2 text-gray-700">{policy.premiumAmount}</td>
                                    <td className="px-4 py-2 text-gray-700">{policy.coverageDetails}</td>
                                    <td className="px-4 py-2 text-gray-700">{policy.validityPeriod}</td>
                                    <td className="px-4 py-2 text-gray-700">
                                        <span className={`px-2 py-1 rounded-full text-sm ${policy.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {policy.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2 text-gray-700">
                                        <button
                                            className="text-blue-500 hover:underline"
                                            onClick={() => window.open(`policy-to-customer?id=${policy.policyID}`, '_blank')}
                                        >
                                            View Customers
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AssignedPolicy;