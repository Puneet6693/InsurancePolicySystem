import React from 'react';
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
import { StoreContextProvider } from './services/StoreContext';
import DeletePolicy from './Components/DeletePolicy';

function App() {
  return (
    
    <StoreContextProvider>
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/Dashboard" element={<PolicyTab />} />
        <Route path="/policy-details/:id" element={<PolicyDetails />} />
        <Route path="/Registration" element={<RegistrationForm />} />
        <Route path="/Login" element={<Login />} />

        {/* Other Routes (No authentication checks) */}
        <Route path="/PolicyFeatch" element={<PolicyFeatch />} />
        <Route path="/Add_policy" element={<AddPolicy />} />
        <Route path="/UpdatePolicy" element={<UpdatePolicy />} />
        <Route path="/DeletePolicy" element={<DeletePolicy/>} />
        <Route path="/Claims" element={<ClaimForm />} />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/Login" />} />
      </Routes>
    </Router>
    </StoreContextProvider>
  );
}

export default App;
