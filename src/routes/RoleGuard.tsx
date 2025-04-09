import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/store";

interface RoleGuardProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

const RoleGuard: React.FC<RoleGuardProps> = ({ allowedRoles, children }) => {
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2 style={{ color: "red" }}>Usuario no autenticado</h2>
        <p>Debes iniciar sesión para acceder a esta página.</p>
        <button
          onClick={() => navigate("/login")}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Ir al login
        </button>
      </div>
    );
  }

  const userRoles = user.roles ?? [];

  const hasRole = allowedRoles.some((role) => userRoles.includes(role));

  if (!hasRole) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2 style={{ color: "red" }}>Acceso denegado</h2>
        <p>No tienes permiso para acceder a esta página.</p>
        <button
          onClick={() => navigate("/login")}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Volver al login
        </button>
      </div>
    );
  }

  return <>{children}</>;
};

export default RoleGuard;