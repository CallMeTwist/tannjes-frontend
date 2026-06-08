import { Navigate, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { usePatientAuth } from "@/hooks/usePatientAuth";

export const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = usePatientAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center">
        <Loader2 className="h-8 w-8 animate-spin text-brand-pink" />
      </div>
    );
  }
  if (!isAuthenticated) {
    return <Navigate to="/patient/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
};

export default RequireAuth;
