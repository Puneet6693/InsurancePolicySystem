import axios from "axios";

const updateClaimStatus = async (claimID, setClaims) => {
    try {
        await axios.put(`https://localhost:7251/api/Claims/${claimID}?status=approved`);
        alert("Claim status updated successfully!");
        setClaims((prevClaims) =>
            prevClaims.map((claim) =>
                claim.claimID === claimID ? { ...claim, status: "approved" } : claim
            )
        );
    } catch (err) {
        alert("Failed to update claim status.");
        console.error("Error updating claim:", err);
    }
};

export default updateClaimStatus;