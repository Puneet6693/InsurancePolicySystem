
// import React, { useState, useContext } from "react";
// import { StoreContext } from "../services/StoreContext";

// const AddPolicyForm = () => {
//     const { axiosInstance } = useContext(StoreContext); // Use axiosInstance from StoreContext
//     const [formData, setFormData] = useState({
//         policy_Name: "",
//         premiumAmount: "",
//         coverageDetails: "",
//         validityPeriod: "",
//         agentID: "",
//     });
//     const [errors, setErrors] = useState({});
//     const [message, setMessage] = useState("");

//     const validate = () => {
//         let tempErrors = {};
//         const policyNameRegex = /^[a-zA-Z0-9\s]{3,50}$/; // Alphanumeric, 3-50 characters

//         if (!formData.policy_Name.trim()) {
//             tempErrors.policy_Name = "Policy Name is required!";
//         } else if (!policyNameRegex.test(formData.policy_Name)) {
//             tempErrors.policy_Name = "Policy Name must be alphanumeric and 3-50 characters long!";
//         }

//         if (!formData.premiumAmount.trim() || isNaN(formData.premiumAmount) || Number(formData.premiumAmount) <= 0) {
//             tempErrors.premiumAmount = "Premium Amount must be a positive number!";
//         }

//         if (!formData.coverageDetails.trim()) {
//             tempErrors.coverageDetails = "Coverage Details are required!";
//         }

//         if (!formData.validityPeriod.trim()) {
//             tempErrors.validityPeriod = "Validity Period is required!";
//         }

//         if (!formData.agentID.trim() || isNaN(formData.agentID) || Number(formData.agentID) <= 0) {
//             tempErrors.agentID = "Agent ID must be a positive number!";
//         }

//         setErrors(tempErrors);
//         return Object.keys(tempErrors).length === 0;
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
    
//         if (name === "validityStart" || name === "validityEnd") {
//             if (formData.validityStart && formData.validityEnd) {
//                 setFormData((prevData) => ({
//                     ...prevData,
//                     validityPeriod: `${prevData.validityStart} to ${prevData.validityEnd}`,
//                 }));
//             }
//         }
//     };
    

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!validate()) return;

//         try {
//             const response = await axiosInstance.post("/api/Policies", formData);
//         // Use axiosInstance
//             console.log(response.data);
//             setMessage(`Success! ${response.data.message}`);
//             setFormData({
//                 policy_Name: "",
//                 premiumAmount: "",
//                 coverageDetails: "",
//                 validityPeriod: "",
//                 agentID: "",
//             }); // Reset form
//             setErrors({});
//         } catch (error) {
//             console.error("Error submitting form:", error);
//             if (error.response?.data?.message) {
//                 setMessage("Error: " + error.response.data.message);
//             } else {
//                 setMessage("Error submitting form: " + error.message);
//             }
//         }
//     };

//     return (
//         <div className="flex justify-center items-center min-h-screen bg-gray-100">
//             <div className="bg-white p-6 rounded-md shadow-md w-96">
//                 <h2 className="text-lg font-bold mb-4 text-center">Add Policy</h2>
//                 {message && <p className="text-green-600 text-center">{message}</p>}
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <input
//                         type="text"
//                         name="policy_Name"
//                         placeholder="Policy Name"
//                         className="w-full px-4 py-2 border rounded-md"
//                         onChange={handleChange}
//                         value={formData.policy_Name}
//                         required
//                     />
//                     {errors.policy_Name && <p style={{ color: "red" }}>{errors.policy_Name}</p>}

//                     <input
//                         type="number"
//                         name="premiumAmount"
//                         placeholder="Premium Amount"
//                         className="w-full px-4 py-2 border rounded-md"
//                         onChange={handleChange}
//                         value={formData.premiumAmount}
//                         min="1" // Prevent negative values
//                         required
//                     />
//                     {errors.premiumAmount && <p style={{ color: "red" }}>{errors.premiumAmount}</p>}

//                     <input
//                         type="text"
//                         name="coverageDetails"
//                         placeholder="Coverage Details"
//                         className="w-full px-4 py-2 border rounded-md"
//                         onChange={handleChange}
//                         value={formData.coverageDetails}
//                         required
//                     />
//                     {errors.coverageDetails && <p style={{ color: "red" }}>{errors.coverageDetails}</p>}

//                     <input
//                         type="date"
//                         name="validityPeriod"
//                         placeholder="Validity Period"
//                         className="w-full px-4 py-2 border rounded-md"
//                         onChange={handleChange}
//                         value={formData.validityPeriod}
//                         required
//                     />
//                     {errors.validityPeriod && <p style={{ color: "red" }}>{errors.validityPeriod}</p>}

//                     <input
//                         type="number"
//                         name="agentID"
//                         placeholder="Agent ID"
//                         className="w-full px-4 py-2 border rounded-md"
//                         onChange={handleChange}
//                         value={formData.agentID}
//                         min="1" // Prevent negative values
//                         required
//                     />
//                     {errors.agentID && <p style={{ color: "red" }}>{errors.agentID}</p>}

//                     <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md">
//                         Add Policy
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default AddPolicyForm;
import React, { useState, useContext, useEffect } from "react";
import { StoreContext } from "../services/StoreContext"; // Import StoreContext for token management

const AddPolicyForm = () => {
    const { token } = useContext(StoreContext); // Access token from StoreContext
    const [formData, setFormData] = useState({
        policy_Name: "",
        premiumAmount: "",
        coverageDetails: "",
        validityPeriod: "",
        agentID: "",
    });

    const [agents, setAgents] = useState([]); // State to store agents fetched from API
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState("");

    // Fetch agents from API
    useEffect(() => {
        const fetchAgents = async () => {
            try {
                const response = await fetch("https://localhost:7251/api/Agents", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`, // Include token in Authorization header
                    },
                });

                if (response.ok) {
                    const agentsData = await response.json();
                    setAgents(agentsData); // Set agents data
                } else {
                    console.error("Failed to fetch agents:", response.statusText);
                }
            } catch (error) {
                console.error("Error fetching agents:", error);
            }
        };

        fetchAgents();
    }, [token]);

    // Validation function
    const validate = () => {
        let tempErrors = {};
        if (!formData.policy_Name.trim()) tempErrors.policy_Name = "Policy Name is required!";
        if (!formData.premiumAmount || isNaN(formData.premiumAmount)) tempErrors.premiumAmount = "Valid Premium Amount is required!";
        if (!formData.coverageDetails.trim()) tempErrors.coverageDetails = "Coverage Details are required!";
        if (!formData.validityPeriod.trim()) tempErrors.validityPeriod = "Validity Period is required!";
        if (!formData.agentID.trim()) tempErrors.agentID = "Agent selection is required!";

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission with fetch API
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            const response = await fetch("https://localhost:7251/api/Policies", {
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
                setMessage("Policy added successfully!");
                setFormData({
                    policy_Name: "",
                    premiumAmount: "",
                    coverageDetails: "",
                    validityPeriod: "",
                    agentID: "",
                }); // Reset form fields
                setErrors({});
            } else {
                setMessage(`Error adding policy: ${responseData}`);
            }
        } catch (error) {
            console.error("Error submitting policy:", error);
            setMessage("Error adding policy.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-md shadow-md w-96">
                <h2 className="text-lg font-bold mb-4 text-center">Add Policy</h2>
                {message && <p className="text-green-600 text-center">{message}</p>}
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="policy_Name"
                        placeholder="Policy Name"
                        className="w-full px-4 py-2 border rounded-md"
                        onChange={handleChange}
                        value={formData.policy_Name}
                        required
                    />
                    {errors.policy_Name && <p style={{ color: "red" }}>{errors.policy_Name}</p>}

                    <input
                        type="number"
                        name="premiumAmount"
                        placeholder="Premium Amount"
                        className="w-full px-4 py-2 border rounded-md"
                        onChange={handleChange}
                        value={formData.premiumAmount}
                        min="1"
                        required
                    />
                    {errors.premiumAmount && <p style={{ color: "red" }}>{errors.premiumAmount}</p>}

                    <select
                        name="coverageDetails"
                        className="w-full px-4 py-2 border rounded-md"
                        onChange={handleChange}
                        value={formData.coverageDetails}
                        required
                    >
                        <option value="">Select Coverage Details</option>
                        <option value="Quarterly">Quarterly</option>
                        <option value="Half Yearly">Half Yearly</option>
                        <option value="Monthly">Monthly</option>
                        <option value="Yearly">Yearly</option>
                        <option value="Five Years">Five Years</option>
                        <option value="Decade">Decade</option>
                    </select>
                    {errors.coverageDetails && <p style={{ color: "red" }}>{errors.coverageDetails}</p>}

                    <input
                        type="date"
                        name="validityPeriod"
                        placeholder="Validity Period"
                        className="w-full px-4 py-2 border rounded-md"
                        onChange={handleChange}
                        value={formData.validityPeriod}
                        required
                    />
                    {errors.validityPeriod && <p style={{ color: "red" }}>{errors.validityPeriod}</p>}

                    <select
                        name="agentID"
                        className="w-full px-4 py-2 border rounded-md"
                        onChange={handleChange}
                        value={formData.agentID}
                        required
                    >
                        <option value="">Select Agent</option>
                        {agents.map((agent) => (
                            <option key={agent.agentID} value={agent.agentID}>
                                {agent.agent_Name} (Id: {agent.agentID})
                            </option>
                        ))}
                    </select>
                    {errors.agentID && <p style={{ color: "red" }}>{errors.agentID}</p>}

                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md">
                        Add Policy
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddPolicyForm;