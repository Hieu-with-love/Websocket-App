import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import ChatLayout from "./layouts/ChatLayout";

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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
