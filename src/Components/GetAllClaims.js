import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../services/StoreContext"; // Import the context for the token

const ClaimsFetch = () => {
    const { token } = useContext(StoreContext); // Get the token from the context
    const [claims, setClaims] = useState([]);
    const [error, setError] = useState(null);
    const [popupData, setPopupData] = useState({ isOpen: false, claimID: null, status: "", reason: "" });

    // Fetch all claims
    useEffect(() => {
        const fetchClaims = async () => {
            try {
                const response = await axios.get("https://localhost:7251/api/Claims", {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include the token in the request
                    },
                });
                setClaims(response.data);
            } catch (err) {
                setError("Failed to fetch claims. Please try again later.");
                console.error("Error fetching claims:", err);
            }
        };

        fetchClaims();
    }, [token]);

    // Update claim status and reason
    const updateClaimStatusAndReason = async () => {
        const { claimID, status, reason } = popupData;
        try {
            await axios.put(
                `https://localhost:7251/api/Claims/${claimID}?status=${status}&reason=${reason}`,
                null, // No request body is needed
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include the token in the request
                    },
                }
            );
            alert(`Claim ${claimID} updated to ${status} with reason: ${reason}`);
            // Update the local state to reflect the new status and reason
            setClaims((prevClaims) =>
                prevClaims.map((claim) =>
                    claim.claimID === claimID ? { ...claim, status, claimReason: reason } : claim
                )
            );
            setPopupData({ isOpen: false, claimID: null, status: "", reason: "" }); // Close the popup
        } catch (err) {
            if (err.response && err.response.status === 401) {
                alert("You are not authorized to update the claim status. Please contact the administrator.");
            } else {
                alert("Failed to update claim status. Please try again.");
            }
            console.error("Error updating claim status:", err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Claims List</h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <div className="overflow-x-auto shadow-lg rounded-lg w-11/12">
                <table className="table-auto w-full border border-gray-300 rounded-lg">
                    <thead className="bg-yellow-500 text-white">
                        <tr>
                            <th className="px-6 py-3 text-left font-semibold">Claim ID</th>
                            <th className="px-6 py-3 text-left font-semibold">Policy ID</th>
                            <th className="px-6 py-3 text-left font-semibold">Customer Name</th>
                            <th className="px-6 py-3 text-left font-semibold">Claim Amount</th>
                            <th className="px-6 py-3 text-left font-semibold">Status</th>
                            <th className="px-6 py-3 text-left font-semibold">Claim Reason</th>
                            <th className="px-6 py-3 text-left font-semibold">Actions</th>
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
                                    <td className="border px-6 py-3">{claim.status}</td>
                                    <td className="border px-6 py-3">{claim.claimReason}</td>
                                    <td className="border px-6 py-3">
                                        <button
                                            className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                            onClick={() =>
                                                setPopupData({
                                                    isOpen: true,
                                                    claimID: claim.claimID,
                                                    status: claim.status,
                                                    reason: claim.claimReason || "",
                                                })
                                            }
                                        >
                                            Update
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="border px-6 py-3 text-center" colSpan="7">No claims available.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {popupData.isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-xl font-bold mb-4">Update Claim Status</h3>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Status</label>
                            <select
                                className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-md"
                                value={popupData.status}
                                onChange={(e) => setPopupData({ ...popupData, status: e.target.value })}
                            >
                                <option value="Filed">Filed</option>
                                <option value="Under Review">Under Review</option>
                                <option value="Approved">Approved</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Reason</label>
                            <textarea
                                className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-md"
                                value={popupData.reason}
                                onChange={(e) => setPopupData({ ...popupData, reason: e.target.value })}
                            />
                        </div>
                        <div className="flex justify-end gap-4">
                            <button
                                className="bg-gray-500 text-white px-4 py-2 rounded-md"
                                onClick={() => setPopupData({ isOpen: false, claimID: null, status: "", reason: "" })}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                onClick={updateClaimStatusAndReason}
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClaimsFetch;