import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import HomeLayout from "../layouts/HomeLayout";
import ProfileLayout from "../layouts/ProfileLayout";
import ConnectionLayout from "../layouts/ConnectionLayout";
import MessagesLayout from "../layouts/Messages";
import FeedLayout from "../layouts/FeedLayout";
import MajorPageLayout from "../layouts/MajorPageLayout";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/home",
    element: <HomeLayout />,
  },
  {
    path: "/profile",
    element: <ProfileLayout />,
  },
  {
    path: "/connections",
    element: <ConnectionLayout />,
  },
  {
    path: "/resources",
    element: <MessagesLayout />,
  },
  {
    path: "/feed",
    element: <FeedLayout />,
  },
  {
    path: "/resources/:major", // Define the route path for the major page with a parameter ':major'
    element: <MajorPageLayout />, // Specify the MajorPage component to be rendered
  },
  
  {
    path: "/profile/:profileuser", // Define the route path for the major page with a parameter ':major'
    element: <ProfileLayout />, // Specify the MajorPage component to be rendered
  },
]);
