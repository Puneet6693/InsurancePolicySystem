import React, { useEffect, useState } from 'react';
// import { toast } from "react-toastify"; // Uncomment if you want to use toast notifications

const ClaimList = () => {
    const [claims, setClaims] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");
    
    useEffect(() => {
        const fetchClaims = async () => {
        try {
            const user = await fetch('https://localhost:7251/api/Customers/GetCustomerById', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}` // Ensure the token is included
                }
            });
            const userData = await user.json();
            const response = await fetch(`https://localhost:7251/api/Claims/GetClaimByCustomerId?id=${userData.customer_ID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, // Include token in Authorization header
                },
            });
            const claimsData = await response.json();
            setClaims(claimsData);
        } catch (error) {
            console.error("Error fetching claims:", error);
        } finally {
            setLoading(false);
        }
        };
    
        fetchClaims();
    }, [token]);
    
    if (loading) {
        return <div>Loading...</div>;
    }

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'approved':
                return 'bg-green-100 border-green-500';
            case 'pending':
                return 'bg-yellow-100 border-yellow-500';
            case 'rejected':
                return 'bg-red-100 border-red-500';
            default:
                return 'bg-gray-100 border-gray-500';
        }
    };
    
    return (
        <div className="container mx-auto p-6 min-h-screen">
            <h1 className="text-3xl font-extrabold text-center mb-6 text-blue-600">Claim List</h1>
            {claims.length === 0 ? (
                <div className="flex justify-center items-center h-full">
                    <p className="text-lg text-gray-500">No claims found. Please check back later.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {claims.map((claim) => (
                        <div 
                            key={claim.id} 
                            className={`border-2 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow ${getStatusColor(claim.status)}`}
                        >
                            <h2 className="text-xl font-semibold mb-3 text-gray-800">{claim.title}</h2>
                            <p className="mb-4 text-gray-600">{claim.description}</p>
                            <p className="text-sm font-medium text-gray-500 mb-2">
                                <span className="font-bold">Status:</span> <span className="capitalize">{claim.status}</span>
                            </p>
                            {claim.adminReason && (
                                <p className="text-sm font-medium text-red-500">
                                    <span className="font-bold">Admin Reason:</span> {claim.adminReason}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ClaimList;