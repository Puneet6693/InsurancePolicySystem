import React, { useState } from 'react';
import axios from 'axios';

const CustomerDetails=()=>{
    const [customerData,setFormData]=useState(
        {
            customer_Name: "",
            customer_Phone: " ",
            customer_Address: "",
});
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState("");

    const validate = () => {
        let tempErrors = {};
        if (!customerData.customer_Name.trim()) tempErrors.customer_Name = "Customer Name is required!";
        if (!customerData.customer_Phone.trim() || isNaN(customerData.customer_Phone)) tempErrors.customer_Phone = "Valid Phone Number is required!";
        if (!customerData.customer_Address.trim()) tempErrors.customer_Address = "Customer Address is required!";

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleChange = (e) => {
        setFormData({ ...customerData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            const response = await axios.post("https://localhost:7251/api/Customers", customerData);
            console.log(response.data);
            setMessage(`Success! ${response.data.message}`);
            setFormData({
                customer_Name: "",
                customer_Phone: "",
                customer_Address: "",
            }); // Reset form
            setErrors({});
        } catch (error) {
            setMessage("Error submitting form: " + error.message);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-md shadow-md w-96">
                <h2 className="text-lg font-bold mb-4 text-center">Add Customer</h2>
                {message && <p className="text-green-600 text-center">{message}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="customer_Name"
                        value={customerData.customer_Name}
                        onChange={handleChange}
                        placeholder="Customer Name"
                        className={`w-full p-2 border ${errors.customer_Name ? 'border-red-500' : 'border-gray-300'} rounded`}
                    />
                    
                    {errors.customer_Name && <p className="text-red-500 text-sm">{errors.customer_Name}</p>}

                    <input
                        type="text"
                        name="customer_Phone"
                        value={customerData.customer_Phone}
                        onChange={handleChange}
                        placeholder="Customer Phone"    
                        className={`w-full p-2 border ${errors.customer_Phone ? 'border-red-500' : 'border-gray-300'} rounded`}
                    />  
                    {errors.customer_Phone && <p className="text-red-500 text-sm">{errors.customer_Phone}</p>}
                    <input
                        type="text"
                        name="customer_Address"
                        value={customerData.customer_Address}
                        onChange={handleChange}
                        placeholder="Customer Address"
                        className={`w-full p-2 border ${errors.customer_Address ? 'border-red-500' : 'border-gray-300'} rounded`}
                    />
                    {errors.customer_Address && <p className="text-red-500 text-sm">{errors.customer_Address}</p>}
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md">
                        Add Customer    
                    </button>
                </form>
            </div>
        </div>
    );

}
export default CustomerDetails;
    
