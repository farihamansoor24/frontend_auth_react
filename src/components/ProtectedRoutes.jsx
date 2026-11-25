import { Navigate, Outlet } from "react-router-dom";
import { getToken, getUser } from "../utils/authHelper";
import { useAuthContext } from "../context/AuthContext";

const ProtectedRoutes = ({ role }) => {
  const { loading } = useAuthContext();
  const user =  getUser();
  const token = getToken();

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }
  if (role && user.role?.toLowerCase() !== role.toLowerCase()) {
    const fallbackPath =
      user.role?.toLowerCase() === "admin"
        ? "/admin-dashboard"
        : "/user/user-dashboard";
    return <Navigate to={fallbackPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;