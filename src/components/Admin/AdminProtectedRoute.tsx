import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { isAdmin } from "../../lib/admin";

export default function AdminProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, user } = useAuth();
  const [admin, setAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    let active = true;
    if (isAuthenticated && user?.email) {
      isAdmin(user.email).then((result) => {
        if (active) setAdmin(result);
      });
    } else {
      setAdmin(false);
    }
    return () => { active = false; };
  }, [isAuthenticated, user]);

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  if (admin === null) {
    return <div className="text-center text-white py-10">Checking admin access...</div>;
  }
  if (!admin) {
    return <div className="text-center text-red-300 py-10">Access denied: Admins only.</div>;
  }
  return <>{children}</>;
}
