import { RouterProvider } from "react-router";
import { routes } from "./app.routes.jsx";
import { AuthProvider } from "./features/auth/context/auth.provider.jsx";

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={routes} />
    </AuthProvider>
  );
}

export default App;
