"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/lib/context/AuthContext";
interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
  redirectTo?: string;
}

export default function ProtectedRoute({
  children,
  allowedRoles,
  redirectTo = "/login",
}: ProtectedRouteProps) {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace(redirectTo);
      } else if (allowedRoles && !allowedRoles.includes(user.role)) {
        router.replace("/unauthorized");
      }
    }
  }, [user, loading, allowedRoles, router, redirectTo]);

  if (loading || !user) return null;

  return allowedRoles && !allowedRoles.includes(user.role) ? null : <>{children}</>;
}
