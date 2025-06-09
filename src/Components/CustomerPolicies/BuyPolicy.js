// import React, { useState, useContext, useEffect } from 'react';
// import { StoreContext } from '../../services/StoreContext'; // Import StoreContext for token management
// import { useSearchParams } from 'react-router-dom'; // Import useSearchParams to read query parameters

// const BuyPolicy = () => {
//     const { token } = useContext(StoreContext); // Access token from StoreContext
//     const [searchParams] = useSearchParams(); // Initialize useSearchParams
//     const policyId = searchParams.get("policyId"); // Get policyId from query params
//     const [customerId, setCustomerId] = useState(null); // Customer ID fetched from backend
//     const [policyDetails, setPolicyDetails] = useState(null); // Policy details fetched from backend
//     const [startDate, setStartDate] = useState(""); // Start date input
//     const [paymentFrequency, setPaymentFrequency] = useState(""); // Payment frequency input
//     const [payableAmount, setPayableAmount] = useState(0); // Payable amount calculated from backend
//     const [message, setMessage] = useState("");
//     const [isCustomerRegistered, setIsCustomerRegistered] = useState(false); // Check if user is registered as a customer
//     const [termsAccepted, setTermsAccepted] = useState(false); // Checkbox for terms and conditions

//     // Fetch customer details
//     useEffect(() => {
//         const fetchCustomerDetails = async () => {
//             try {
//                 const response = await fetch(`https://localhost:7251/api/Customers`, {
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         Authorization: `Bearer ${token}`, // Include token in Authorization header
//                     },
//                 });

//                 if (response.ok) {
//                     const customerData = await response.json();
//                     setCustomerId(customerData.customer_ID); // Set customer ID
//                     setIsCustomerRegistered(true); // Mark user as registered
//                 } else {
//                     setIsCustomerRegistered(false); // User is not registered as a customer
//                 }
//             } catch (error) {
//                 console.error('Error fetching customer details:', error);
//                 setIsCustomerRegistered(false);
//             }
//         };

//         fetchCustomerDetails();
//     }, [token]);

//     // Fetch policy details
//     useEffect(() => {
//         const fetchPolicyDetails = async () => {
//             try {
//                 const response = await fetch(`https://localhost:7251/api/Policies/${policyId}`, {
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         Authorization: `Bearer ${token}`, // Include token in Authorization header
//                     },
//                 });

//                 if (response.ok) {
//                     const policyData = await response.json();
//                     setPolicyDetails(policyData); // Set policy details
//                 } else {
//                     console.error('Failed to fetch policy details:', response.statusText);
//                     setMessage('Unable to fetch policy details. Please try again later.');
//                 }
//             } catch (error) {
//                 console.error('Error fetching policy details:', error);
//                 setMessage('An error occurred while fetching policy details.');
//             }
//         };

//         if (policyId) {
//             fetchPolicyDetails();
//         }
//     }, [policyId, token]);

//     if (!token) {
//         return (
//             <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//                 <div className="bg-white p-6 rounded-md shadow-md w-96">
//                 <h2 className="text-lg font-bold mb-4 text-center">Login Required</h2>
//                 <p className="text-center">You need to be logged in to buy a policy.</p>
//                 <p className="text-center mt-4">Please log in to continue.</p>
//                 <button
//                     onClick={() => window.location.href = '/Login'} // Redirect to login page
//                     className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 mt-4"
//                 >
//                     Go to Login
//                 </button>
//                 </div>
//             </div>
//         ); // Display message if user is not logged in
//     }

//     // Calculate payable amount
//     const handleCalculatePayableAmount = async () => {
//         if (!paymentFrequency) {
//             setMessage("Please select a payment frequency.");
//             return;
//         }

//         try {
//             const response = await fetch(
//                 `https://localhost:7251/api/CustomerPolicies/GetPayableAmount?policyID=${policyId}&paymentFrequency=${paymentFrequency}`,
//                 {
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         Authorization: `Bearer ${token}`, // Include token in Authorization header
//                     },
//                 }
//             );

//             if (response.ok) {
//                 const data = await response.json();
//                 setPayableAmount(data);
//                 setMessage("Payable amount calculated successfully!");
//             } else {
//                 setMessage("Failed to calculate payable amount. Please try again.");
//             }
//         } catch (error) {
//             console.error('Error calculating payable amount:', error);
//             setMessage("An unexpected error occurred while calculating the payable amount.");
//         }
//     };

//     // Buy policy for the registered customer
//     const handleBuyPolicy = async () => {
//         if (!termsAccepted) {
//             setMessage("Please accept the terms and conditions before proceeding.");
//             return;
//         }

//         try {
//             const response = await fetch(`https://localhost:7251/api/CustomerPolicies`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${token}`, // Include token in Authorization header
//                 },
//                 body: JSON.stringify({
//                     customer_ID: customerId,
//                     policyID: policyId,
//                     startDate,
//                     paymentFrequency,
//                     payableAmount,
//                 }),
//             });

//             if (response.ok) {
//                 setMessage("Policy purchased successfully!");
//             } else {
//                 const errorData = await response.json();
//                 console.error('Failed to purchase policy:', errorData);
//                 setMessage("Unable to purchase policy. Please try again later.");
//             }
//         } catch (error) {
//             console.error('Error purchasing policy:', error);
//             setMessage("An unexpected error occurred while purchasing the policy.");
//         }
//     };

//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//             <div className="bg-white p-6 rounded-md shadow-md w-96">
//                 <h2 className="text-lg font-bold mb-4 text-center">Buy Policy</h2>
//                 {policyDetails && (
//                     <>
//                         <p><strong>Policy Name:</strong> {policyDetails.policy_Name}</p>
//                         <p><strong>Premium Amount:</strong> ₹ {new Intl.NumberFormat('en-IN').format(policyDetails.premiumAmount)}</p>
//                         <p><strong>Coverage Details:</strong> {policyDetails.coverageDetails}</p>
//                         <p><strong>Validity Period:</strong> {policyDetails.validityPeriod}</p>
//                     </>
//                 )}
//                 <div className="mt-4">
//                     <label className="block mb-2"><strong>Start Date:</strong></label>
//                     <input
//                         type="date"
//                         className="w-full px-4 py-2 border rounded-md"
//                         value={startDate}
//                         onChange={(e) => setStartDate(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div className="mt-4">
//                     <label className="block mb-2"><strong>Payment Frequency:</strong></label>
//                     <select
//                         className="w-full px-4 py-2 border rounded-md"
//                         value={paymentFrequency}
//                         onChange={(e) => setPaymentFrequency(e.target.value)}
//                         required
//                     >
//                         <option value="" disabled>Select Frequency</option>
//                         <option value="monthly">Monthly</option>
//                         <option value="quarterly">Quarterly</option>
//                         <option value="half yearly">Half-Yearly</option>
//                         <option value="yearly">Yearly</option>
//                     </select>
//                 </div>
//                 <div className="mt-4">
//                     <button
//                         onClick={handleCalculatePayableAmount}
//                         className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
//                     >
//                         Calculate Payable Amount
//                     </button>
//                 </div>
//                 <div className="mt-4">
//                     <label className="block mb-2"><strong>Payable Amount:</strong></label>
//                     <input
//                         type="text"
//                         className="w-full px-4 py-2 border rounded-md"
//                         value={typeof payableAmount === 'string' ? payableAmount : `₹ ${new Intl.NumberFormat('en-IN').format(payableAmount)}`}
//                         readOnly
//                     />
//                 </div>
//                 <div className="mt-4">
//                     <label className="flex items-center">
//                         <input
//                             type="checkbox"
//                             className="mr-2"
//                             checked={termsAccepted}
//                             onChange={(e) => setTermsAccepted(e.target.checked)}
//                         />
//                         I have read and accept all terms and conditions.
//                     </label>
//                 </div>
//                 <div className="mt-4">
//                     <button
//                         onClick={handleBuyPolicy}
//                         className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
//                         disabled={!termsAccepted}
//                     >
//                         Buy Policy
//                     </button>
//                 </div>
//                 {message && <p className="text-center mt-4 text-green-600">{message}</p>}
//             </div>
//         </div>
//     );
// };

// export default BuyPolicy;
import React, { useState, useContext, useEffect } from 'react';
import { StoreContext } from '../../services/StoreContext';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
 
const BuyPolicy = () => {
    const { token } = useContext(StoreContext);
    const [searchParams] = useSearchParams();
    const policyId = searchParams.get("policyId");
    const navigate = useNavigate(); // For redirection after successful purchase
 
    const [customerId, setCustomerId] = useState(null);
    const [policyDetails, setPolicyDetails] = useState(null);
    const [startDate, setStartDate] = useState("");
    const [paymentFrequency, setPaymentFrequency] = useState("");
    const [payableAmount, setPayableAmount] = useState(0);
    const [payableMessage, setPayableMessage] = useState(""); // Separate state for payable amount messages
    const [isCustomerRegistered, setIsCustomerRegistered] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
 
    // Fetch customer details
    useEffect(() => {
        const fetchCustomerDetails = async () => {
            try {
                const response = await fetch(`https://localhost:7251/api/Customers`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
 
                if (response.ok) {
                    const customerData = await response.json();
                    setCustomerId(customerData.customer_ID);
                    setIsCustomerRegistered(true);
                } else {
                    setIsCustomerRegistered(false);
                }
            } catch (error) {
                console.error('Error fetching customer details:', error);
                setIsCustomerRegistered(false);
            }
        };
 
        fetchCustomerDetails();
    }, [token]);
 
    // Fetch policy details
    useEffect(() => {
        const fetchPolicyDetails = async () => {
            try {
                const response = await fetch(`https://localhost:7251/api/Policies/${policyId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
 
                if (response.ok) {
                    const policyData = await response.json();
                    setPolicyDetails(policyData);
                } else {
                    console.error('Failed to fetch policy details:', response.statusText);
                    setPayableMessage('Unable to fetch policy details. Please try again later.');
                }
            } catch (error) {
                console.error('Error fetching policy details:', error);
                setPayableMessage('An error occurred while fetching policy details.');
            }
        };
 
        if (policyId) {
            fetchPolicyDetails();
        }
    }, [policyId, token]);
 
    // Handle login required state
    if (!token) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-6 rounded-md shadow-md w-96">
                    <h2 className="text-lg font-bold mb-4 text-center">Login Required</h2>
                    <p className="text-center">You need to be logged in to buy a policy.</p>
                    <p className="text-center mt-4">Please log in to continue.</p>
                    <button
                        onClick={() => window.location.href = '/Login'}
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 mt-4"
                    >
                        Go to Login
                    </button>
                </div>
            </div>
        );
    }
 
    // Calculate payable amount
    const handleCalculatePayableAmount = async () => {
        if (!paymentFrequency) {
            setPayableMessage("Please select a payment frequency.");
            return;
        }
 
        try {
            const response = await fetch(
                `https://localhost:7251/api/CustomerPolicies/GetPayableAmount?policyID=${policyId}&paymentFrequency=${paymentFrequency}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
 
            if (response.ok) {
                const data = await response.json();
                setPayableAmount(data);
                setPayableMessage("Payable amount calculated successfully!");
            } else {
                setPayableMessage("Failed to calculate payable amount. Please try again.");
            }
        } catch (error) {
            console.error('Error calculating payable amount:', error);
            setPayableMessage("An unexpected error occurred while calculating the payable amount.");
        }
    };
 
    // Buy policy for the registered customer
    const handleBuyPolicy = async () => {
        if (!termsAccepted) {
            toast.error("Please accept the terms and conditions before proceeding.");
            return;
        }
 
        try {
            const response = await fetch(`https://localhost:7251/api/CustomerPolicies`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    customer_ID: customerId,
                    policyID: policyId,
                    startDate,
                    paymentFrequency,
                    payableAmount,
                }),
            });
 
            if (response.ok) {
                toast.success("Policy purchased successfully!", {
                    onClose: () => navigate("/Dashboard"), // Redirect to Dashboard after closing the toast
                });
            } else if (response.status === 400) {
                const contentType = response.headers.get("Content-Type");
                let backendMessage = "Bad Request: Unable to purchase policy.";
 
                if (contentType && contentType.includes("application/json")) {
                    const errorData = await response.json();
                    backendMessage = errorData.message || backendMessage;
                } else {
                    backendMessage = await response.text(); // Handle plain text response
                }
 
                console.error("Backend Error Response:", backendMessage);
                toast.error(backendMessage); // Display backend error in toast
            } else {
                const errorData = await response.json();
                const backendMessage = errorData.message || "Unable to purchase policy. Please try again later.";
                console.error("Backend Error Response:", backendMessage);
                toast.error(backendMessage); // Display backend error in toast for other errors
            }
        } catch (error) {
            console.error("Error purchasing policy:", error);
            const errorMessage = error.message || "An unexpected error occurred while purchasing the policy.";
            toast.error(errorMessage); // Display unexpected error in toast
        }
    };
 
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white p-6 rounded-md shadow-md w-full max-w-4xl flex flex-col md:flex-row">
                {/* Left Section for Policy Details */}
                <div className="md:w-1/2 p-4 border-r md:border-b-0 border-b border-gray-200 md:pr-6 mb-4 md:mb-0">
                    <h2 className="text-2xl font-bold mb-4 text-center md:text-left">Policy Details</h2>
                    {policyDetails ? (
                        <div className="space-y-3 text-lg">
                            <p><strong>Policy Name:</strong> {policyDetails.policy_Name}</p>
                            <p><strong>Premium Amount:</strong> ₹ {new Intl.NumberFormat('en-IN').format(policyDetails.premiumAmount)}</p>
                            <p><strong>Coverage Details:</strong> <br /> {policyDetails.coverageDetails}</p>
                            <p><strong>Validity Period:</strong> {policyDetails.validityPeriod}</p>
                        </div>
                    ) : (
                        <p className="text-gray-600">Loading policy details or no policy found...</p>
                    )}
                </div>
 
                {/* Right Section for Buy Policy Form */}
                <div className="md:w-1/2 p-4 md:pl-6">
                    <h2 className="text-2xl font-bold mb-4 text-center md:text-left">Purchase Policy</h2>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="startDate" className="block text-md font-medium text-gray-700 mb-1">Start Date:</label>
                            <input
                                type="date"
                                id="startDate"
                                className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                min={new Date().toISOString().split("T")[0]} // Prevent previous dates
                                required
                            />
                        </div>
 
                        <div>
                            <label htmlFor="paymentFrequency" className="block text-md font-medium text-gray-700 mb-1">Payment Frequency:</label>
                            <select
                                id="paymentFrequency"
                                className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                                value={paymentFrequency}
                                onChange={(e) => setPaymentFrequency(e.target.value)}
                                required
                            >
                                <option value="" disabled>Select Frequency</option>
                                <option value="monthly">Monthly</option>
                                <option value="quarterly">Quarterly</option>
                                <option value="half yearly">Half-Yearly</option>
                                <option value="yearly">Yearly</option>
                            </select>
                        </div>
 
                        <div>
    <button
        onClick={handleCalculatePayableAmount}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
        Calculate Payable Amount
    </button>
    {payableMessage && (
        <p
            className={`text-center mt-4 text-lg ${
                payableMessage.includes("successfully") ? "text-green-600" : "text-red-600"
            }`}
        >
            {payableMessage}
        </p>
    )}
</div>
 
                        <div>
                            <label htmlFor="payableAmount" className="block text-md font-medium text-gray-700 mb-1">Payable Amount:</label>
                            <input
                                type="text"
                                id="payableAmount"
                                className="w-full px-4 py-2 border rounded-md bg-gray-50 text-gray-900"
                                value={typeof payableAmount === 'string' ? payableAmount : `₹ ${new Intl.NumberFormat('en-IN').format(payableAmount)}`}
                                readOnly
                            />
                        </div>
 
                        <div className="flex items-center mt-4">
                            <input
                                type="checkbox"
                                id="termsAccepted"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2"
                                checked={termsAccepted}
                                onChange={(e) => setTermsAccepted(e.target.checked)}
                            />
                            <label htmlFor="termsAccepted" className="text-md text-gray-700">
                                I have read and accept all terms and conditions.
                            </label>
                        </div>
 
                        <button
                            onClick={handleBuyPolicy}
                            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={!termsAccepted}
                        >
                            Buy Policy
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
 
export default BuyPolicy;