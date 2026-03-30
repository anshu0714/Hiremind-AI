import { createBrowserRouter } from "react-router-dom";

import RootLayout from "@/layouts/RootLayout";

import Login from "@/features/auth/pages/Login";
import Register from "@/features/auth/pages/Register";

import ProtectedRoute from "@/features/auth/components/ProtectedRoute";
import PublicRoute from "@/features/auth/components/PublicRoute";

import Dashboard from "./features/dashboard/pages/Dashboard";
import InterviewForm from "./features/interview/pages/InterviewForm";
import InterviewReportResult from "./features/interview/pages/InterviewReportResult";
import ReportsPage from "./features/interview/pages/ReportsPage";

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
            element: <Dashboard />,
          },
          {
            path: "/interview-form",
            element: <InterviewForm />,
          },
          {
            path: "/interview-report/:reportId",
            element: <InterviewReportResult />,
          },
          {
            path: "/interview-reports",
            element: <ReportsPage />,
          },
        ],
      },
    ],
  },
]);
