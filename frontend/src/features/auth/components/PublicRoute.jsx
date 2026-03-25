import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import LoadingScreen from "@/components/LoadingScreen";

const PublicRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return <LoadingScreen />;

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
