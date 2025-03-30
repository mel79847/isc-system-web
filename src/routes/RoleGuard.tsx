import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useUserStore } from "../store/store";

interface RoleGuardProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

const RoleGuard: React.FC<RoleGuardProps> = ({ allowedRoles, children }) => {
  const user = useUserStore((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate(); //login

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const userRoles = user.roles ?? [];

  // Verifica si el usuario es admin o professor
  const isAdminOrProfessor = userRoles.includes("ADMIN") || userRoles.includes("professor");

  // Si el usuario es admin o professor, redirigir a /create-professor (evitando un loop infinito)
  if (isAdminOrProfessor && location.pathname !== "/create-professor") {
    return <Navigate to="/create-professor" replace />;
  }

  // Verifica si el usuario tiene al menos uno de los roles permitidos
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
