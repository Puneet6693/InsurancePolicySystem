import PolicyCard from "./Policy";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../services/StoreContext";

const PolicyTab = () => {
  const { axiosInstance } = useContext(StoreContext); // Use axiosInstance from StoreContext
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track errors
  const navigate = useNavigate(); // Initialize navigation

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await axiosInstance.get("https://localhost:7251/api/Policies"); // Use axiosInstance
        const formattedPolicies = response.data.map(policy => ({
          policyName: policy.policy_Name,
          policyPremium: policy.premiumAmount,
          policyId: policy.policyID,
        }));
        setPolicies(formattedPolicies);
      } catch (err) {
        console.error("Error fetching policies:", err);
        setError("Failed to load policies. Please try again later.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchPolicies();
  }, [axiosInstance]);

  // 🔥 Function to navigate to details page
  const handleViewDetails = (policyId) => {
    navigate(`/policy-details/${policyId}`); // Navigate to details page with Policy ID
  };

  if (loading) return <p>Loading policies...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="flex flex-wrap gap-4 justify-center p-5">
      {policies.map((policy, index) => (
        <PolicyCard
          key={index}
          policyName={policy.policyName}
          policyPremium={policy.policyPremium}
          policyId={policy.policyId}
          imageUrl={`/img/${policy.policyName}.png`} // Assuming images named by policyName
          onViewDetails={handleViewDetails} // 🔥 Pass navigation function
        />
      ))}
    </div>
  );
};

export default PolicyTab;