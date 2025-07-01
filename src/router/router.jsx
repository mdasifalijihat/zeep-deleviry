import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../components/pages/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../components/pages/Authentication/Login/Login";
import Register from "../components/pages/Authentication/Register/Register";
import Coverage from "../components/pages/coverage/Coverage";

import About from "../components/pages/about/About";
import PrivetRoute from "../routes/PrivetRoute";
import Pricing from "../components/pages/Pricing/Pricing";
import DashboardLayout from "../layouts/DashboardLayout";
import Myparcels from "../components/pages/Dashbord/MyParcels/Myparcels";
import Payment from "../components/pages/Dashbord/Payment/Payment";
import PaymentHistory from "../components/pages/Dashbord/paymentHistory/PaymentHistory";
import DashboardHome from "../components/pages/Dashbord/DashboardHome/DashboardHome";
import TracParcel from "../components/pages/Dashbord/TracaPackage/TracParcel";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    errorElement: <p>error</p>,
    children: [
      { index: true, Component: Home },
      {
        path: "/coverage",
        Component: Coverage,
      },
      {
        path: "/pricing",
        element: (
          <PrivetRoute>
            {" "}
            <Pricing></Pricing>
          </PrivetRoute>
        ),
        loader: () => fetch("./warehouses.json"),
      },
      { path: "/aboutus", Component: About },
    ],
  },

  // login form withOut Nav and footer
  {
    path: "/",
    Component: AuthLayout,
    children: [
      { path: "login", Component: Login },
      { path: "register", Component: Register },
    ],
  },

  // dashboard
  {
    path: "/dashboard",
    element: (
      <PrivetRoute>
        <DashboardLayout></DashboardLayout>
      </PrivetRoute>
    ),
    children: [
      {
        path: "myParcels",
        element: <Myparcels></Myparcels>,
      },
      {
        path: "payment/:parcelId",
        element: <Payment />,
      },
      {
        path: "paymentHistory",
        element: <PaymentHistory />,
      },
      {
        path: "home",
        element: <DashboardHome></DashboardHome>,
      },
      {
        path: "Trac",
        element: <TracParcel/>
      },
    ],
  },
]);
