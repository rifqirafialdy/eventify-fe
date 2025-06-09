"use client";

import { useAuth } from "@/lib/context/AuthContext";
interface PermissionWrapperProps {
  screen: string;
  action?: string;
  children: React.ReactNode;
}

export default function PermissionWrapper({
  screen,
  action = "VIEW",
  children,
}: PermissionWrapperProps) {
  const { user } = useAuth();

  if (!user) return null;

  const allowedActions = user.permissions?.[screen] || [];
  const isAllowed = allowedActions.includes(action);

  return isAllowed ? <>{children}</> : null;
}
