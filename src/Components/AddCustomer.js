import React, { useState, useContext } from "react";
import { StoreContext } from "../services/StoreContext"; // Import StoreContext for token management

const AddCustomer = () => {
    const { token } = useContext(StoreContext); // Access token from StoreContext
    const [formData, setFormData] = useState({
        customer_Name: "",
        customer_Phone: "",
        customer_Address: "",
    });
    const [errors, setErrors] = useState({});
    const [formSubmitted, setFormSubmitted] = useState(false); // Track form submission state
    const [message, setMessage] = useState("");

    // Validation function
    const validate = () => {
        let tempErrors = {};
        if (!formData.customer_Name.trim()) tempErrors.customer_Name = "Customer Name is required!";
        if (!formData.customer_Phone || isNaN(formData.customer_Phone)) tempErrors.customer_Phone = "Valid Phone Number is required!";
        if (!formData.customer_Address.trim()) tempErrors.customer_Address = "Customer Address is required!";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormSubmitted(true); // Set form as submitted
        setMessage(""); // Clear previous messages
        if (!validate()) return;

        try {
            const response = await fetch("https://localhost:7251/api/Customers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // Include token in Authorization header
                },
                body: JSON.stringify(formData),
            });

            const responseData = await response.text(); // Parse plain text response
            console.log("Server Response:", responseData);

            if (response.ok) {
                setMessage("Customer added successfully!");
                setFormData({
                    customer_Name: "",
                    customer_Phone: "",
                    customer_Address: "",
                }); // Reset form fields
                setErrors({});
            } else {
                setMessage("Details already exist.");
            }
        } catch (error) {
            console.error("Error submitting customer:", error);
            setMessage("Something went wrong. Please try again later.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-md shadow-md w-96">
                <h2 className="text-lg font-bold mb-4 text-center">Enter Customer Details</h2>
                {message && <p className="text-green-600 text-center">{message}</p>}
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="customer_Name"
                        placeholder="Customer Name"
                        className="w-full px-4 py-2 border rounded-md"
                        onChange={handleChange}
                        value={formData.customer_Name}
                        required
                    />
                    {errors.customer_Name && <p style={{ color: "red" }}>{errors.customer_Name}</p>}

                    <input
                        type="number"
                        name="customer_Phone"
                        placeholder="Customer Phone"
                        className="w-full px-4 py-2 border rounded-md"
                        onChange={handleChange}
                        value={formData.customer_Phone}
                        required
                    />
                    {errors.customer_Phone && <p style={{ color: "red" }}>{errors.customer_Phone}</p>}

                    <input
                        type="text"
                        name="customer_Address"
                        placeholder="Customer Address"
                        className="w-full px-4 py-2 border rounded-md"
                        onChange={handleChange}
                        value={formData.customer_Address}
                        required
                    />
                    {errors.customer_Address && <p style={{ color: "red" }}>{errors.customer_Address}</p>}

                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md" disabled={formSubmitted}>
                        Add Customer
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddCustomer;