
import { Provider } from "react-redux";
import { RouterProvider, createHashRouter } from "react-router-dom";
import { AuthLayout, MasterLayout, NotFound, ProtectedRoute, UserLayout, UserProtectedRoute } from "./Components";
import { AddNewAds, AddNewFacility, AddNewRoom, Ads, Bookings, Explore, Facilities, Favorites, ForgetPassword, Home, Landing, Login, Register, ResetPassword, RoomDetails, Rooms, StripePayment, Users, } from "./Pages";
import Store from "./Redux/Store";

function App() {

  const routes = createHashRouter([
    {
      path: "/",
      element: (
        <UserLayout />
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Landing /> },
        { path: 'explore', element: <Explore /> },
        { path: 'favorite-rooms', element: <UserProtectedRoute><Favorites /></UserProtectedRoute> },
        { path: 'room-details', element: <RoomDetails /> },
        { path: 'stripePayment/:id', element: <UserProtectedRoute><StripePayment /></UserProtectedRoute> },
      ]
    },
    {
      path: "dashboard",
      element: (
        <ProtectedRoute>
          <MasterLayout />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        { path: "users", element: <Users /> },
        { path: "rooms", element: <Rooms /> },
        { path: "rooms/add-new/", element: <AddNewRoom /> },
        { path: "rooms/add-new/:id", element: <AddNewRoom /> },
        { path: "room-facilities", element: <Facilities /> },
        {
          path: "room-facilities/add-new-facility",
          element: <AddNewFacility />,
        },
        {
          path: "room-facilities/update-facility/:id",
          element: <AddNewFacility />,
        },
        { path: "ads", element: <Ads /> },
        { path: "add-new-ads", element: <AddNewAds /> },
        { path: "add-new-ads/:id", element: <AddNewAds /> },
        { path: "booking", element: <Bookings /> },
      ],
    },

    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forget-password", element: <ForgetPassword /> },
        { path: "reset-password", element: <ResetPassword /> },
      ],
    },
  ]);

  return (
    <>
      <Provider store={Store}>
        <RouterProvider router={routes} />
      </Provider>
    </>
  );
}
export default App;
