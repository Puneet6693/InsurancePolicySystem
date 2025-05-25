import PolicyCard from "./Policy";
import { useEffect, useState } from "react";

const PolicyTab = () => {
    const [policies, setPolicies] = useState([]);

    useEffect(() => {
        const fetchPolicies = async () => {
            try {
                const response = await fetch("https://localhost:7251/api/Policies");
                const data = await response.json();
                const formattedPolicies = data.map(policy => ({
                    policyName: policy.policy_Name,
                    policyPremium: policy.premiumAmount,
                    policyId: policy.policyID
                }));
                setPolicies(formattedPolicies);
            } catch (error) {
                console.error("Error fetching policies:", error);
            }
        };

        fetchPolicies();
    }, []);

    // const policies = [
    //     { policyName: "Health Insurance", policyPremium: 500, imageUrl: "img/HEALTH.jfif" },
    //     { policyName: "Car Insurance", policyPremium: 800, imageUrl: "img/Motor-Insurance.png" },
    //     { policyName: "Home Insurance", policyPremium: 1200, imageUrl: "img/home_incure.jfif" },
    //     { policyName: "Travel Insurance", policyPremium: 300, imageUrl: "img/Travel_incur.jpg" },
    //     { policyName: "Life Insurance", policyPremium: 1000, imageUrl: "img/LIFE-INSURANCE-2.png" },
    //     { policyName: "Pet Insurance", policyPremium: 400, imageUrl: "img/pet_incur - Copy.jfif" },
    //     { policyName: "Business Insurance", policyPremium: 1500, imageUrl: "/images/business.jpg" },
    //     { policyName: "Disability Insurance", policyPremium: 600, imageUrl: "/images/disability.jpg" },
    //     { policyName: "Liability Insurance", policyPremium: 700, imageUrl: "/images/liability.jpg" },
    //     { policyName: "Flood Insurance", policyPremium: 900, imageUrl: "/images/flood.jpg" }
    //   ];
      
  
    return (
        <div className="flex flex-wrap gap-4 justify-center p-5">
        {policies.map((policy, index) => (
          <PolicyCard 
            key={index} 
            policyName={policy.policyName} 
            policyPremium={policy.policyPremium} 
            imageUrl={`/img/${policy.policyName}.png`} // Assuming you have images named by policy ID
          />
        ))}
      </div>
    );
  };
export default PolicyTab;
  