import React from 'react'
import './UserProtectedRoute.module.scss'
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: ReactNode;
}
const UserProtectedRoute = ({ children }: Props) => {
  if (
    localStorage.getItem("authToken") &&
    localStorage.getItem("userRole") === "admin"
  ) {
    return <Navigate to={"/login"} />;

  } else if (
    localStorage.getItem("authToken") &&
    localStorage.getItem("userRole") === "user"
  ) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
}

export default UserProtectedRoute