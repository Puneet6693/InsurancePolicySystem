import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const CustomerByPolicyID = () => {
    const token = localStorage.getItem('token');
    const [customers, setCustomers] = useState([]);
    const [searchParams] = useSearchParams();
    const policyId = searchParams.get('id');
     // State and handlers for popup
     const [showPopup, setShowPopup] = useState(false);
     const [popupEmail, setPopupEmail] = useState('');
     const [popupMessage, setPopupMessage] = useState('');
    console.log(token);
     const handleSendNotification = (email) => {
         setPopupEmail(email);
         setPopupMessage('');
         setShowPopup(true);
     };
 
     const handleSubmit = async (e) => {
         e.preventDefault();
         try {
 const response = await fetch('https://localhost:7251/api/Notifications', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json-patch+json', // Updated Content-Type
        Authorization: `Bearer ${token}`, // Include token in Authorization header
    },
    body: JSON.stringify({
        email: popupEmail,
        message: popupMessage,
        datasent: new Date().toISOString().split('T')[0], // Send only the date part
    }),
 });

 if (response.ok) { // Check for response.ok instead of just response
     alert('Notification sent successfully!');
     setShowPopup(false);
 } else {
     const errorData = await response.json();
     console.error('Failed to send notification:', errorData);
     alert('Failed to send notification.');
 }
         } catch (error) {
             console.error('Error sending notification:', error);
             alert('An error occurred while sending the notification.');
         }
     };

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
    }, [policyId]);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold text-center mb-6">Customer By Policy ID</h1>
            <div className="overflow-x-auto">
                <table className="table-auto w-full bg-white shadow-md rounded-lg">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-left">Email</th>
                            <th className="px-4 py-2 text-left">Phone</th>
                            <th className="px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer) => (
                            <tr key={customer.customer_ID} className="border-b">
                                <td className="px-4 py-2">{customer.customer_Name}</td>
                                <td className="px-4 py-2">{customer.customer_Email}</td>
                                <td className="px-4 py-2">{customer.customer_Phone}</td>
                                <td className="px-4 py-2">
                                    <button
                                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                        onClick={() => handleSendNotification(customer.customer_Email)}
                                    >
                                        Send Notification
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Send Notification</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    value={popupEmail}
                                    readOnly
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Message</label>
                                <textarea
                                    value={popupMessage}
                                    onChange={(e) => setPopupMessage(e.target.value)}
                                    className="w-full px-3 py-2 border rounded"
                                    rows="4"
                                ></textarea>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className="bg-gray-500 text-white px-3 py-1 rounded mr-2 hover:bg-gray-600"
                                    onClick={() => setShowPopup(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                >
                                    Send
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );

   
};

export default CustomerByPolicyID;