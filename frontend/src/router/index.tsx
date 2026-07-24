import { createBrowserRouter } from "react-router-dom";
import AdminDashboard from "../pages/AdminDashboard";
import MainLayout from "../layouts/MainLayout";
import AddTip from "../pages/AddTips";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Category from "../pages/Category";
import Detail from "../pages/Detail";
import NotFound from "../pages/NotFound";
import EditTip from "../pages/EditTip";
import Profile from "../pages/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "category",
        element: <Category />,
      },
      {
        path: "tip/:id",
        element: <Detail />,
      },
      {
         path: "add-tip",
        element: <AddTip />,
      },
      {
         path: "edit-tip/:id",
        element: <EditTip />,
      },
      {
         path: "admin",
         element: <AdminDashboard />,
      },
      {
          path: "profile",
         element: <Profile />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);