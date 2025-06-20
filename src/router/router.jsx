import {
  createBrowserRouter,
} from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../components/pages/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../components/pages/Authentication/Login/Login";
import Register from "../components/pages/Authentication/Register/Register";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    errorElement: <p>error</p>,
    children:[
        {index:true, Component: Home}
    ]
  },
  {
    path:'/',
    Component: AuthLayout, 
    children:[
      {path: 'login', Component: Login},
      {path:'register', Component: Register}
    ]
  }
]);
