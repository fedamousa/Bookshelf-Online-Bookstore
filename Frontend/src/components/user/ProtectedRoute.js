import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute(prop) {
  const {
    isUserDataLoading,
    isAuthenticated,
    element,
    userData,
    shouldCheckAdmin,
  } = prop;

  if (isUserDataLoading) {
    return <div> Loading... </div>;
  }

  // check if user is admin
  if (shouldCheckAdmin) {
    return isAuthenticated && userData.role === "Admin" ? (
      element
    ) : (
      <Navigate to="/login" />
    );
  }

  // User login
  return isAuthenticated ? element : <Navigate to="/login" />;
}
