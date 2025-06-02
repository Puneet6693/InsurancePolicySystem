import React, { useState } from 'react';

const BuyPolicy = () => {
    const [policyId, setPolicyId] = useState('');
    const [customerId, setCustomerId] = useState('');
    const [message, setMessage] = useState('');

    const handleBuyPolicy = async () => {
        try {
            const response = await fetch('https://localhost:7251/api/CustomerPolicies/assign?policy id', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    policyId,
                    customerId,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setMessage(`Policy purchased successfully: ${data.message}`);
            } else {
                setMessage('Failed to purchase policy.');
            }
        } catch (error) {
            setMessage('An error occurred while purchasing the policy.');
        }
    };

    return (
        <div>
            <h2>Buy Policy</h2>
            <div>
                <label>
                    Policy ID:
                    <input
                        type="text"
                        value={policyId}
                        onChange={(e) => setPolicyId(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    Customer ID:
                    <input
                        type="text"
                        value={customerId}
                        onChange={(e) => setCustomerId(e.target.value)}
                    />
                </label>
            </div>
            <button onClick={handleBuyPolicy}>Buy Policy</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default BuyPolicy;
