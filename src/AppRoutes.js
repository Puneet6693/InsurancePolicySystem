
 
 
 
import React, { useContext } from 'react';
import { Route, Routes, Navigate, useLocation, Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
 
// Import all your components
import UserDashboardFooter from "./Components/UserDashboardFooter";
import Navbar from './Components/Navbar'; // User Navbar
import ClaimList from './Components/ClaimList'; // Assuming this is the component for listing claims
import AdminNavbar from './Components/Admin/AdminNavbar'; // Admin Navbar
import PolicyFeatch from './Components/PolicyFeatch';
import Dashboard from './Components/Dashboard';
import RegistrationForm from './Components/Registration';
import AddPolicy from './Components/Add_policy';
import Login from './Components/Login';
import ClaimForm from './Components/Claim';
import UpdatePolicy from './Components/UpdatePolicy';
import PolicyDetails from './Components/PolicyById';
import BuyPolicy from './Components/CustomerPolicies/BuyPolicy';
import DeletePolicy from './Components/DeletePolicy';
import ClaimsFetch from './Components/GetAllClaims';
import AdminDashboard from './Components/Admin/AdminDashboard';
import CustomerByPolicy from './Components/Admin/GetAllCustomersByPolicy'; // Assuming this is the component to fetch customers by policy
import CustomerGetAll from './Components/CustomerGetAll';
 
// Import Agent specific components
import AgentFeatch from './Components/Agent/AgentFeatch';
import DeleteAgent from './Components/Agent/DeleteAgent';
import RegisterAgent from './Components/Agent/RegisterAgent';
import AgentDashboard from './Components/Agent/AgentDashboard'; // <--- NEW: Import AgentDashboard
import AgentNavbar from './Components/Agent/AgentNavbar'; // <--- NEW: Assuming you'll have an AgentNavbar
import UserProfile from './Components/CustomerPolicies/UserProfile';
import CustomerByPolicyID from './Components/Agent/CustomerByPolicyID'; // Assuming this is the component to fetch customers by policy ID
 
// Import StoreContext
import { StoreContext } from './services/StoreContext';
import AgentProfile from './Components/Agent/AgentProfile';
 
// Private Route Wrapper (checks for token presence)
const PrivateRoute = ({ children }) => {
  const { token } = useContext(StoreContext);
  return token ? children : <Navigate to="/Login" />;
};
 
// Role-Based Route Wrapper (checks for token and specific role)
const RoleBasedRoute = ({ children, allowedRoles }) => {
  const { token, user } = useContext(StoreContext);
 
  if (!token) {
    return <Navigate to="/Login" />;
  }
 
  if (!user || !user.role) {
    console.warn("Token exists but user or role is missing in context. Redirecting to home.");
    return <Navigate to="/" />;
  }
 
  if (allowedRoles.includes(user.role)) {
    return children;
  } else {
    console.warn(`Access denied. User role '${user.role}' not in allowed roles: ${allowedRoles.join(', ')}`);
    return <Navigate to="/" />;
  }
};
 
// Admin Layout Component
const AdminLayout = () => {
  return (
    <>
      <AdminNavbar /> {/* Render AdminNavbar once for all admin routes */}
      <Outlet /> {/* Render nested admin routes */}
    </>
  );
};
 
// <--- NEW: Agent Layout Component
const AgentLayout = () => {
  return (
    <>
      <AgentNavbar /> {/* Assuming you have an AgentNavbar, if not, use a generic one or none */}
      <Outlet /> {/* Render nested agent routes */}
    </>
  );
};
// END NEW Agent Layout Component --->
 
// Main AppRoutes Component
const AppRoutes = () => {
  const location = useLocation();
 
  // Determine if the user Navbar should be visible
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isAgentRoute = location.pathname.startsWith('/agent'); // <--- NEW: Check for agent route
 
  return (
    <>
      <ToastContainer />
      {/* Conditionally render Navbars based on route */}
      {!isAdminRoute && !isAgentRoute && <Navbar />} {/* Render User Navbar only for non-admin/non-agent routes */}
      <div className='mt-20'>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/policy-details/:id" element={<PolicyDetails />} />
          <Route path="/BuyPolicy" element={<BuyPolicy />} />
          <Route path="/Registration" element={<RegistrationForm />} />
          <Route path="/Login" element={<Login />} />
 
          {/* User Specific Protected Routes */}
          <Route
            path="/PolicyFeatch"
            element={
              <PrivateRoute>
                <PolicyFeatch />
              </PrivateRoute>
            }
          />
          <Route
          path="/UserProfile"
          element={
            <PrivateRoute>
              <UserProfile />
            </PrivateRoute>
          }
            />
          <Route
            path="/Claim"
            element={
              <PrivateRoute>
                <ClaimForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/ClaimList"
            element={
              <PrivateRoute>
                <ClaimList />
              </PrivateRoute>
            }
          />
 
          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <RoleBasedRoute allowedRoles={["Admin"]}>
                <AdminLayout />
              </RoleBasedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="policies" element={<PolicyFeatch />} />
            <Route path="add-policy" element={<AddPolicy />} />
            <Route path="update-policy" element={<UpdatePolicy />} />
            <Route path="CustomerView" element={<CustomerByPolicy />} />
            <Route path="delete-policy" element={<DeletePolicy />} />
            <Route path="claims" element={<ClaimsFetch />} />
            <Route path="customers" element={<CustomerGetAll />} />
            <Route path="agents" element={<AgentFeatch />} />
            <Route path="delete-agent" element={<DeleteAgent />} />
            <Route path="register-agent" element={<RegisterAgent />} />
          </Route>
 
          {/* < Agent Routes */}
          <Route
            path="/agent" // Base path for agent routes
            element={
              <RoleBasedRoute allowedRoles={["Agent"]}> {/* Only allow "Agent" role */}
                <AgentLayout /> {/* Use the AgentLayout */}
              </RoleBasedRoute>
            }
          >
            <Route path="policy-to-customer" element={<CustomerByPolicyID />} />
            <Route index element={<AgentDashboard />} /> {/* /agent */}
            <Route path="dashboard" element={<AgentDashboard />} />
            <Route path="agentprofile" element={<AgentProfile />} /> {/* /agent/claims */}
            {/* /agent/dashboard */}
           
          </Route>
          {/* END NEW Agent Routes ---> */}
 
 
          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      {/* Conditionally render Footer based on route */}
      {!isAdminRoute && !isAgentRoute && <UserDashboardFooter />} {/* Render UserDashboardFooter only for non-admin/non-agent routes */}
    </>
  );
};
 
export default AppRoutes;

 