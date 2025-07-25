import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import ChatLayout from "./layouts/ChatLayout";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import Authenticate from "./pages/auth/Authenticate";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ChatLayout />,
    errorElement: <div>Page not found</div>,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/auth/callback",
    element: <Authenticate />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
