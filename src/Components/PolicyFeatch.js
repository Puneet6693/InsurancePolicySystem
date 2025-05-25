import React, { useState, useEffect } from 'react';
import axios from "axios";

export const Datafetch = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://localhost:7251/api/Policies"); // Fixing localhost format
                setData(response.data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2 className="text-lg font-bold mb-4">Policy List</h2>
            {error && <p className="text-red-500">Error fetching data: {error}</p>}
            <table className="table-auto border-collapse border border-gray-400">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border">Policy ID</th>
                        <th className="px-4 py-2 border">Policy Name</th>
                        <th className="px-4 py-2 border">Premium Amount</th>
                        <th className="px-4 py-2 border">Coverage Details</th>
                        <th className="px-4 py-2 border">Validity Period</th>
                        <th className="px-4 py-2 border">Agent ID</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((policy) => (
                            <tr key={policy.policyID}>
                                <td className="border px-4 py-2">{policy.policyID}</td>
                                <td className="border px-4 py-2">{policy.policy_Name}</td>
                                <td className="border px-4 py-2">{policy.premiumAmount}</td>
                                <td className="border px-4 py-2">{policy.coverageDetails}</td>
                                <td className="border px-4 py-2">{policy.validityPeriod}</td>
                                <td className="border px-4 py-2">{policy.agentID}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td className="border px-4 py-2 text-center" colSpan="6">No data available.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Datafetch;
