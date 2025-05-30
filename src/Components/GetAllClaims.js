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
                                    <td className="border px-6 py-3">{claim.status}
                                    <button
                                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                                        onClick={() => updateClaimStatus(claim.claimID)}
                                          >
                                         Approve
                                        </button>
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