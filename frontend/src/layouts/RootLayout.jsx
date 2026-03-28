import { Outlet } from "react-router-dom";
import { AuthProvider } from "@/features/auth/context/auth.provider";

const RootLayout = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};

export default RootLayout;
