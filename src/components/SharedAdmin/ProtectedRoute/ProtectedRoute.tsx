import { Navigate } from "react-router";
import { Auth, Paths, Role } from "../../../constant/enums";


export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = localStorage.getItem("authToken");
  const role = JSON.parse(localStorage.getItem("user") as string)?.role



  if (token) {


    if (role === Role.ADMIN) return children;

    if (role === Role.USER) return <Navigate to={`/${Paths.LANDING}`} />


  }
  return <Navigate to={`/${Auth.LOGIN}`} />
}
