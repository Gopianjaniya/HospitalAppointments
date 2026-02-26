import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { HospitalContext } from "../context/HospitalContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { token, user } = useContext(HospitalContext);

  if (!token) {
    // Not logged in, redirect to login
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    // Logged in but doesn't have the required role
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
