"use client";

import { useAuth } from "@/lib/context/AuthContext";

interface PermissionButtonProps {
  screen: string;
  action: string;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

export default function PermissionButton({
  screen,
  action,
  className,
  onClick,
  children,
}: PermissionButtonProps) {
  const { user } = useAuth();

  if (!user) return null;

  const actions = user.permissions?.[screen] || [];
  const isAllowed = actions.includes(action);

  if (!isAllowed) return null;

  return (
    <button type="button" className={className} onClick={onClick}>
      {children}
    </button>
  );
}
