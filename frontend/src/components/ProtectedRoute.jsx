import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, roleRequired })  {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Not logged in
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Role-based protection
  if (roleRequired && role !== roleRequired) {
    return <Navigate to="/trips" />;
  }

  return children;
}

export default ProtectedRoute;