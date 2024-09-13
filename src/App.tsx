import { createBrowserRouter, LoaderFunction, LoaderFunctionArgs, Params, RouterProvider } from "react-router-dom";

import publicRoutes from "./routes/PublicRoutes";
import protectedRoutes from "./routes/ProtectedRoutes";
import AuthGuard from "./routes/AuthGuard";
import { getProcess, getStudentById } from "./services/processServicer";

function loader() {
  return getProcess();
}

interface StudentParams extends Params {
  id: string;
}

const getStudentProcess: LoaderFunction = async ({
  params,
}: LoaderFunctionArgs<StudentParams>) => {
  const studentId = Number(params.id);
  return getStudentById(studentId);
};

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
