import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import Navbar from './Components/Navbar';
import PolicyFeatch from './Components/PolicyFeatch';
import Dashboard from './Components/Dashboard';
import RegistrationForm from './Components/Registration';
import AddPolicy from './Components/Add_policy';
import Login from './Components/Login';
import ClaimForm from './Components/Claim';
import UpdatePolicy from './Components/UpdatePolicy';
import PolicyTab from './Components/PolicyTab';
import PolicyDetails from './Components/PolicyById';
import BuyPolicy from './Components/CustomerPolicies/BuyPolicy'; // Import BuyPolicy component
import { StoreContextProvider, StoreContext } from './services/StoreContext';
import DeletePolicy from './Components/DeletePolicy';
import ClaimsFetch from './Components/GetAllClaims';
import { ToastContainer } from 'react-toastify';

// Private Route Wrapper
const PrivateRoute = ({ children }) => {
  const { token } = useContext(StoreContext); // Check if token exists
  return token ? children : <Navigate to="/Login" />;
};

function App() {
  return (
    <StoreContextProvider>
      <Router>
        <ToastContainer/>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/Dashboard" element={<PolicyTab />} />
          <Route path="/policy-details/:id" element={<PolicyDetails />} />
          <Route 
            path="/BuyPolicy"  element={<BuyPolicy />}/>
            
          <Route path="/Registration" element={<RegistrationForm />} />
          <Route path="/Login" element={<Login />} />

          {/* Protected Routes */}
          <Route 
            path="/PolicyFeatch" 
            element={
              <PrivateRoute>
                <PolicyFeatch />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/Add_policy" 
            element={
              <PrivateRoute>
                <AddPolicy />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/UpdatePolicy" 
            element={
              <PrivateRoute>
                <UpdatePolicy />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/DeletePolicy" 
            element={
              <PrivateRoute>
                <DeletePolicy />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/GetAllClaims" 
            element={
              <PrivateRoute>
                <ClaimsFetch />
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
          
          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/Login" />} />
        </Routes>
      </Router>
    </StoreContextProvider>
  );
}

export default App;