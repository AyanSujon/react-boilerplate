import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home/Home";
import Login from "../pages/AuthPages/Login";
import Register from "../pages/AuthPages/Register";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../layouts/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage/>,
    children:[
      {
        index: true,
        element: <Home/>
      }
    ]
  },
  {
    path:'/login',
    element: <Login/>,
  },
  {
    path:'/register',
    element: <Register/>,
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><Dashboard/></PrivateRoute>,
    children:[
      {
        index: true,
        element: <PrivateRoute></PrivateRoute>
      },
      
    ]
  },

]);





