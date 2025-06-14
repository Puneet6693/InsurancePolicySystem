import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const CustomerByPolicy = () => {
    const token = localStorage.getItem('token');
    const [customers, setCustomers] = useState([]);
    const [searchParams] = useSearchParams();
    const policyId = searchParams.get('id');
     // State and handlers for popup
    
    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await fetch(`https://localhost:7251/GetAllCustomersByPolicyId?id=${policyId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`, // Include token in Authorization header
                    },
                });
                const data = await response.json();
                setCustomers(data);
            } catch (error) {
                console.error('Error fetching customers:', error);
            }
        };

        if (policyId) {
            fetchCustomers();
        }
    }, [token, policyId]);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold text-center mb-6">Customers</h1>
            <div className="overflow-x-auto">
                <table className="table-auto w-full bg-white shadow-md rounded-lg">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-left">Email</th>
                            <th className="px-4 py-2 text-left">Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer) => (
                            <tr key={customer.customer_ID} className="border-b">
                                <td className="px-4 py-2">{customer.customer_Name}</td>
                                <td className="px-4 py-2">{customer.customer_Email}</td>
                                <td className="px-4 py-2">{customer.customer_Phone}</td>
                               
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

   
};

export default CustomerByPolicy;