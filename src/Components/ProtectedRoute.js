// ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ auth, requiredRole, children }) => {
  // First, check if the user is authenticated
  if (!auth.isAuthenticated) {
    return <Navigate to="/Login" />;
  }

  // Then, if a role is required, check if the user has the proper role.
  // You can customize this logic to allow multiple roles if needed.
  if (requiredRole && auth.role !== requiredRole) {
    // Optionally, you can navigate to a "Not Authorized" page.
    return <Navigate to="/" />;
  }

  // If the user passes both checks, render the protected component.
  return children;
};

export default ProtectedRoute;
