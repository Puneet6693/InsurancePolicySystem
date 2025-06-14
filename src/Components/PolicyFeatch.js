import React, { useState, useEffect, useContext } from 'react';
import { StoreContext } from "../services/StoreContext"; // Import StoreContext for token management

export const Datafetch = () => {
    const { token } = useContext(StoreContext); // Access token from StoreContext
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://localhost:7251/api/Policies", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`, // Include token in Authorization header
                    },
                });

                if (response.ok) {
                    const policies = await response.json();
                    setData(policies);
                } else {
                    throw new Error("Failed to fetch policies. Please check your token or login again.");
                }
            } catch (err) {
                setError(err.message);
            }
        };

        fetchData();
    }, [token]); // Re-fetch data if token changes

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Policy List</h2>
            {error && <p className="text-red-500 text-center mb-4">Error fetching data: {error}</p>}
            <div className="overflow-x-auto shadow-lg rounded-lg">
                <table className="table-auto w-full border border-gray-300 rounded-lg">
                    <thead className="bg-yellow-500 text-white">
                        <tr>
                            <th className="px-6 py-3 text-left font-semibold">Policy ID</th>
                            <th className="px-6 py-3 text-left font-semibold">Policy Name</th>
                            <th className='px-6 py-3 text-left font-semibold'>Issued Value</th>
                            <th className="px-6 py-3 text-left font-semibold">Premium Amount</th>
                            <th className="px-6 py-3 text-left font-semibold">Coverage Details</th>
                            <th className="px-6 py-3 text-left font-semibold">Validity Period</th>
                            <th className="px-6 py-3 text-left font-semibold">Agent ID</th>
                            <th className="px-6 py-3 text-left font-semibold">Agent Name</th>
                            <th className="px-6 py-3 text-left font-semibold">View All Customers</th>
                            <th className="px-6 py-3 text-left font-semibold">Update Policy</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? (
                            data.map((policy) => (
                                <tr key={policy.policyID} className="hover:bg-gray-100">
                                    <td className="border px-6 py-3">{policy.policyID}</td>
                                    <td className="border px-6 py-3">{policy.policy_Name}</td>
                                    <td className='border px-6 py-3'>{policy.issuredValue}</td>
                                    <td className="border px-6 py-3">{policy.premiumAmount}</td>
                                    <td className="border px-6 py-3">{policy.coverageDetails}</td>
                                    <td className="border px-6 py-3">{policy.validityPeriod}</td>
                                    <td className="border px-6 py-3">{policy.agentID}</td>
                                    <td className="border px-6 py-3">{policy.agent?.agent_Name || "N/A"}</td>
                                    <td className="border px-6 py-3">
                                        <a href={`/admin/CustomerView?id=${policy.policyID}`} className="text-blue-600 hover:underline">View Customers</a>
                                    </td>
                                    <td className="border px-6 py-3">
                                        <a href={`/admin/update-policy?id=${policy.policyID}`} className="text-blue-600 hover:underline">Update</a>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="border px-6 py-3 text-center" colSpan="7">No data available.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Datafetch;