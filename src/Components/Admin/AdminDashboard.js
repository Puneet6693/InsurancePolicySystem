// Components/Admin/AdminDashboard.js
import React from 'react'; // Import React if not already imported
import CustomerGetAll from '../CustomerGetAll'; // Import the component to fetch all customers

const AdminDashboard = () => {
  return (
    <div>
     
      <CustomerGetAll/>
      {/* You can add more dashboard-specific content here */}
    </div>
  );
}
export default AdminDashboard;