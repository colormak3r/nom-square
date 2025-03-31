import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import userAuth from "~/components/auth/userAuth";
import NoPermission from "~/error/401";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute() {
  const { user } = userAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [user]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-lg font-semibold">Checking Permissions...</p>
      </div>
    );
  }

  return user ? <Outlet /> : <Navigate to="/401" replace />;
}
