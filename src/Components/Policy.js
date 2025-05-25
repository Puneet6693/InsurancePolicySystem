
const PolicyCard = ({ policyName, policyPremium ,imageUrl}) => {
    return (
        <div className="w-48 bg-white shadow-md rounded-md overflow-hidden border border-gray-300">
      <img src={imageUrl} alt={policyName} className="w-full h-28 object-cover" />
      <div className="p-3">
        <h2 className="text-md font-bold text-blue-600">{policyName}</h2>
        <p className="text-gray-700 mt-1 text-xs">Premium: <span className="font-semibold text-gray-900">${policyPremium}</span></p>
        <button className="mt-2 bg-blue-600 text-white px-2 py-1 rounded-md text-xs hover:bg-blue-700">
          View Details
          </button>
        </div>
      </div>
    );
  };
export default PolicyCard;
  