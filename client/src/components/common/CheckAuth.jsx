import React from "react";
import { Navigate, useLocation } from "react-router-dom";

// constants
import { userRoles } from "@/constants";

const CheckAuth = ({ isAuthenticated, user, children }) => {
  const location = useLocation();

  if(location.pathname === '/') {
    if(!isAuthenticated) {
      return <Navigate to="/auth/login"/>
    } else {
        if (user?.role === userRoles.ADMIN || user?.role === userRoles.DEMO_ADMIN) {
        return <Navigate to="/admin/dashboard" />;
      } else {
        return <Navigate to="/shop/home" />;
      }
    }
  }

  // if user is not authenticated and trying to access pages that requires authentication
  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/signup")
    )
  ) {
    return <Navigate to="/auth/login" />;
  }

  // if authenticated user is trying to access login or signup page
  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/signup"))
  ) {
    if (user?.role === userRoles.ADMIN || user?.role === userRoles.DEMO_ADMIN) {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/shop/home" />;
    }
  }

  // if normal user is trying to access admin page
  if (
    isAuthenticated &&
    user?.role !== userRoles.ADMIN &&
    user?.role !== userRoles.DEMO_ADMIN &&
    location.pathname.includes("admin")
  ) {
    return <Navigate to="/unauth-page" />;
  }

  // if admin is trying to access shopping page (for normal users only)
  if (
    isAuthenticated &&
    (user?.role === userRoles.ADMIN || user?.role === userRoles.DEMO_ADMIN) &&
    location.pathname.includes("shop")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  return <>{children}</>;
};

export default CheckAuth;
