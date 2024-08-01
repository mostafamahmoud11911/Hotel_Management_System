import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  if (
    localStorage.getItem("authToken") &&
    localStorage.getItem("userRole") === "admin"
  ) {
    return children;
  } else if (
    localStorage.getItem("authToken") &&
    localStorage.getItem("userRole") === "user"
  ) {
    return <Navigate to={"/"} />;
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default ProtectedRoute;
