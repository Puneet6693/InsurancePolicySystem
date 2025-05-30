import React, { useState, useEffect } from "react";
import axios from "axios";

const ClaimsFetch = () => {
    const [claims, setClaims] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClaims = async () => {
            try {
                const response = await axios.get("https://localhost:7251/api/Claims"); // Fetch claims from API
                setClaims(response.data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchClaims();
    }, []);

    const updateClaimStatus = async (claimID, status) => {
        try {
            await axios.put(`https://localhost:7251/api/Claims/${claimID}`, { status }); // Update claim status
            alert(`Claim ${claimID} updated to ${status}`);
        } catch (err) {
            console.error("Error updating claim status:", err);
            alert("Failed to update claim status.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Claims List</h2>
            {error && <p className="text-red-500 text-center mb-4">Error fetching claims: {error}</p>}
            <div className="overflow-x-auto shadow-lg rounded-lg w-11/12">
                <table className="table-auto w-full border border-gray-300 rounded-lg">
                    <thead className="bg-yellow-500 text-white">
                        <tr>
                            <th className="px-6 py-3 text-left font-semibold">Claim ID</th>
                            <th className="px-6 py-3 text-left font-semibold">Policy ID</th>
                            <th className="px-6 py-3 text-left font-semibold">Customer Name</th>
                            <th className="px-6 py-3 text-left font-semibold">Claim Amount</th>
                            <th className="px-6 py-3 text-left font-semibold">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {claims.length > 0 ? (
                            claims.map((claim) => (
                                <tr key={claim.claimID} className="hover:bg-gray-100">
                                    <td className="border px-6 py-3">{claim.claimID}</td>
                                    <td className="border px-6 py-3">{claim.policyID}</td>
                                    <td className="border px-6 py-3">{claim.customer?.customer_Name || "N/A"}</td>
                                    <td className="border px-6 py-3">${claim.claimAmount}</td>
                                    <td className="border px-6 py-3 flex items-center gap-4">
                                        <span>{claim.status}</span>
                                        <select
                                            className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md focus:outline-none"
                                            onChange={(e) => updateClaimStatus(claim.claimID, e.target.value)}
                                        >
                                            <option value="">Change Status</option>
                                            <option value="Approved">Approve</option>
                                            <option value="Rejected">Reject</option>
                                        </select>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="border px-6 py-3 text-center" colSpan="5">No claims available.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ClaimsFetch;