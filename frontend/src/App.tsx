import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <div>Home page</div> },
      { path: "register", element: <Register /> },
      { path: "sign-in", element: <SignIn /> },
    ],
  },
  { path: "*", element: <div>Not Implemented yet</div> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
