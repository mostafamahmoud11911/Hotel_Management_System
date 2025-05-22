import { createBrowserRouter, RouterProvider } from "react-router";
import MasterLayout from "./components/SharedAdmin/MasterLayout/MasterLayout";
import Home from "./modules/Admin/Home/Home";
import AuthLayout from "./components/SharedAdmin/AuthLayout/AuthLayout";
import Login from "./modules/Auth/Login/Login";
import NotFound from "./components/NotFound/NotFound";
import Register from "./modules/Auth/Register/Register";
import UserLayout from "./components/SharedUser/UserLayout/UserLayout";
import ForgetPassword from "./modules/Auth/ForgetPassword/ForgetPassword";
import ResetPassword from "./modules/Auth/ResetPassword/ResetPassword";
import { CssBaseline } from "@mui/material";
import { Toaster } from 'sonner';
import ProtectedRoute from "./components/SharedAdmin/ProtectedRoute/ProtectedRoute";
import AuthRedirect from "./components/SharedAdmin/AuthRedirect/AuthRedirect";
import Facilities from "./modules/Admin/Facilities/Facilities";
import Ads from "./modules/Admin/Ads/Ads";
import Rooms from "./modules/Admin/Rooms/Rooms";
import RoomData from "./modules/Admin/Rooms/RoomData";
import Booking from "./modules/Admin/Booking/Booking";
import Users from "./modules/Admin/Users/Users";
import Landing from "./modules/User/Landing/Landing";
import Explore from "./modules/User/Explore/Explore";
import Details from "./modules/User/Details/Details";
import StripePayment from "./modules/User/StripePayment/StripePayment";
import Favorites from "./modules/User/Favorites/Favorites";


const router = createBrowserRouter([
  {
    path: "/",
    element:
      <AuthRedirect>
        <AuthLayout />
      </AuthRedirect>,
    errorElement: <NotFound />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "forgetpass",
        element: <ForgetPassword />,
      },
      {
        path: "resetpass",
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute>
      <MasterLayout />
    </ProtectedRoute>,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "facilities",
        element: <Facilities />,
      },
      {
        path: "ads",
        element: <Ads />,
      },
      {
        path: "rooms",
        element: <Rooms />,
      },
      {
        path: "roomData",
        element: <RoomData />,
      },
      {
        path: "roomData/:id",
        element: <RoomData />,
      },
      {
        path: "booking",
        element: <Booking />
      },
      {
        path: "users",
        element: <Users />
      }
    ],
  },
  {
    path: "/",
    element: <UserLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "explore",
        element: <Explore />
      },
      {
        path: "favorites",
        element: <Favorites />
      },
      {
        path: "details/:id",
        element: <Details />
      },
      {
        path: "payment/:id",
        element: <StripePayment />
      }
    ],
  }
]);

export default function App() {
  return (
    <>
      <CssBaseline />
      <Toaster />
      <RouterProvider router={router} />
    </>
  )
}