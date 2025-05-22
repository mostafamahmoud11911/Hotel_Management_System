import { Outlet } from "react-router";
import Navbar from "../../SharedUser/Navbar/Navbar";
import Footer from "../Footer/Footer";


export default function UserLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}
