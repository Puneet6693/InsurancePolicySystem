import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { StoreContext } from "../services/StoreContext";

const PolicyDetails = () => {
  const { axiosInstance } = useContext(StoreContext); // Use axiosInstance from StoreContext
  const { id } = useParams(); // Extract Policy ID from URL
  const navigate = useNavigate();
  const [policy, setPolicy] = useState(null);
  const [userExists, setUserExists] = useState(false); // Track if user exists
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track errors

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching policy details...");
        const policyResponse = await axiosInstance.get(`/api/Policies/${id}`);
        console.log("Policy Response:", policyResponse.data);
        setPolicy(policyResponse.data);

        console.log("Checking user existence...");
        const userResponse = await axiosInstance.get("/api/Customers/currentUser");
        console.log("User Response:", userResponse.data);
        setUserExists(userResponse.data.exists); // Assume API returns `{ exists: true/false }`
      } catch (err) {
        console.error("Error fetching data:", err);
        if (err.response) {
          setError(`Error: ${err.response.data.message || "Failed to load policy details."}`);
        } else if (err.request) {
          setError("Error: No response from the server. Please check your network connection.");
        } else {
          setError(`Error: ${err.message}`);
        }
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchData();
  }, [id, axiosInstance]);

  const handleBuyPolicy = () => {
    if (!userExists) {
      // Redirect to customer form first
      navigate("/customer-form");
    } else {
      // Proceed to buy policy
      navigate(`/buy-policy/${id}`);
    }
  };

  if (loading) return <p>Loading policy details...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-2xl font-semibold text-blue-700 mb-4">{policy.policy_Name}</h2>
      <div className="space-y-2">
        <p className="text-gray-800"><span className="font-medium">Premium Amount:</span> ${policy.premiumAmount}</p>
        <p className="text-gray-800"><span className="font-medium">Coverage Details:</span> {policy.coverageDetails}</p>
        <p className="text-gray-800"><span className="font-medium">Validity Period:</span> {policy.validityPeriod}</p>
        <p className="text-gray-800"><span className="font-medium">Agent ID:</span> {policy.agentID}</p>
      </div>

      {/* Buy Policy Button */}
      <button 
        onClick={handleBuyPolicy} 
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Buy Policy
      </button>
    </div>
  );
};

export default PolicyDetails;