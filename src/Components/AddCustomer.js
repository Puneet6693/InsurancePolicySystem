import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CustomerForm = () => {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({
    fullName: "",
    address: "",
    phone: ""
  });
  const [error, setError] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission and call API
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://localhost:7251/api/Customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // If you're using token authentication, add:
          // "Authorization": "Bearer <your-token>"
        },
        body: JSON.stringify(customer),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Submission failed!");
        return;
      }
      
      const data = await response.json();
      console.log("Customer added:", data);
      // After adding customer details successfully, navigate to Buy Policy page
      navigate("/buy-policy");
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "1rem" }}>
      <h2>Fill in Your Details</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={customer.fullName}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={customer.address}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={customer.phone}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
        <button type="submit" style={{ padding: "0.5rem 1rem" }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default CustomerForm;
