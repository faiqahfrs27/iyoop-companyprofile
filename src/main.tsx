import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import AboutUs from "./pages/AboutUs";
import BlogPage from "./pages/BlogPage";
import CreateBlog from "./pages/CreateBlog";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import ServicesPage from "./pages/ServicesPage";
import Teams from "./pages/Teams";
import Login from "./pages/Login";
import Register from "./pages/Register";

const router = createBrowserRouter([
  {
    path: "/about",
    element: <AboutUs />,
  },
  {
    path: "/blogs",
    element: <BlogPage />,
  },
  {
    path: "/create-blog",
    element: <CreateBlog />,
  },
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/services",
    element: <ServicesPage />,
  },
  {
    path: "/teams",
    element: <Teams />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />,
  </StrictMode>,
);
