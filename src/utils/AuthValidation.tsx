import { isLoggedin } from "@/api/auth";
import { Outlet, Navigate, useLocation } from "react-router-dom";

export const AuthValidator = () => {
  const location = useLocation();
  const loggedin = isLoggedin();
  const path = location.pathname;

  
  if ((path === "/login" || path === "/signup") && loggedin) {
    return <Navigate to="/dashboard" replace />;
  }

  
  if (!loggedin && path !== "/login" && path !== "/signup") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
