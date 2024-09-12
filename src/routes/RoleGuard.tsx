import React from "react";
import { Navigate } from "react-router-dom";
import { useUserStore } from "../store/store";

interface RoleGuardProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

const RoleGuard: React.FC<RoleGuardProps> = ({ allowedRoles, children }) => {
  const user = useUserStore((state) => state.user);
  const userRoles = user!.roles || [];

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const hasRole = allowedRoles.some((role) => userRoles.includes(role));

  if (!hasRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default RoleGuard;
