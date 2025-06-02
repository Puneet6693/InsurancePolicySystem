import React, { useState, useEffect, useContext } from "react";
import { StoreContext } from "../services/StoreContext"; // Import StoreContext for token management

const CustomerGetAll = () => {
    const { token } = useContext(StoreContext); // Access token from StoreContext
    const [customers, setCustomers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await fetch("https://localhost:7251/api/Customers", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`, // Include token in Authorization header
                    },
                });

                if (response.ok) {
                    const customerData = await response.json();
                    setCustomers(customerData);
                } else {
                    throw new Error("Failed to fetch customer details. Please check your token or login again.");
                }
            } catch (err) {
                console.error("Error fetching customers:", err);
                setError("Failed to load customer details. Please try again later.");
            }
        };

        fetchCustomers();
    }, [token]); // Re-fetch data if token changes

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Customer List</h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <div className="overflow-x-auto shadow-lg rounded-lg w-11/12">
                <table className="table-auto w-full border border-gray-300 rounded-lg">
                    <thead className="bg-yellow-500 text-white">
                        <tr>
                            <th className="px-6 py-3 text-left font-semibold">Customer ID</th>
                            <th className="px-6 py-3 text-left font-semibold">Name</th>
                            <th className="px-6 py-3 text-left font-semibold">Email</th>
                            <th className="px-6 py-3 text-left font-semibold">Phone</th>
                            <th className="px-6 py-3 text-left font-semibold">Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.length > 0 ? (
                            customers.map((customer) => (
                                <tr key={customer.customer_ID} className="hover:bg-gray-100">
                                    <td className="border px-6 py-3">{customer.customer_ID}</td>
                                    <td className="border px-6 py-3">{customer.customer_Name}</td>
                                    <td className="border px-6 py-3">{customer.customer_Email}</td>
                                    <td className="border px-6 py-3">{customer.customer_Phone}</td>
                                    <td className="border px-6 py-3">{customer.customer_Address}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="border px-6 py-3 text-center" colSpan="5">No customers available.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CustomerGetAll;