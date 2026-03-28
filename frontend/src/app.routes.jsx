import { createBrowserRouter } from "react-router-dom";
import RootLayout from "@/layouts/RootLayout";

import Login from "@/features/auth/pages/Login";
import Register from "@/features/auth/pages/Register";

import ProtectedRoute from "@/features/auth/components/ProtectedRoute";
import PublicRoute from "@/features/auth/components/PublicRoute";

export const routes = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: <PublicRoute />,
        children: [
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/register",
            element: <Register />,
          },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/",
            element: <h1>Home Page</h1>,
          },
        ],
      },
    ],
  },
]);
