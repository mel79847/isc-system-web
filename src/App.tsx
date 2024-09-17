import { createBrowserRouter, RouterProvider } from "react-router-dom";

import publicRoutes from "./routes/PublicRoutes";
import protectedRoutes from "./routes/ProtectedRoutes";
import AuthGuard from "./routes/AuthGuard";

const router = createBrowserRouter([
  ...publicRoutes,
  {
    element: <AuthGuard />,
    children: protectedRoutes,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
