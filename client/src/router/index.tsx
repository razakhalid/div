import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import Login from "../pages/login/Login.tsx";
import Home from "../pages/home/Home.tsx";
import { useContext } from "react";
import { AppContext } from "../App.tsx";

function PrivateRoute() {
  const appContext = useContext(AppContext);
  const { githubAccessToken } = appContext;
  const isLoggedIn = !!githubAccessToken;
  if (!isLoggedIn) return <Navigate to="/" replace />;
  return <Outlet />;
}

export default createBrowserRouter([
  { path: "/", element: <Login /> },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
    ],
  },
  {
    path: "*",
    element: (
      <>
        <h1>404</h1>
      </>
    ),
  },
]);
