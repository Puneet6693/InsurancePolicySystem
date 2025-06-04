
const PolicyCard = ({ policyName, policyPremium, imageUrl, policyId, onViewDetails }) => {
  const handleImageError = (e) => {
    e.target.src = "/img/default.png"; // Fallback image
  };

  return (
    <div className="w-48 bg-white shadow-md rounded-md overflow-hidden border border-gray-300">
      <img
        src={imageUrl}
        alt={policyName || "Policy Image"} // Accessibility improvement
        className="w-full h-28 object-cover"
        onError={handleImageError} // Handle image load errors
      />
      <div className="p-3">
        <h2 className="text-md font-bold text-blue-600">{policyName || "Unknown Policy"}</h2>
        <p className="text-gray-700 mt-1 text-xs">
          Premium: <span className="font-semibold text-gray-900">${policyPremium || "N/A"}</span>
        </p>
        <button
          className="mt-2 bg-blue-600 text-white px-2 py-1 rounded-md text-xs hover:bg-blue-700"
          onClick={() => onViewDetails(policyId)} // 🔥 Clicking triggers navigation
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default PolicyCard;



