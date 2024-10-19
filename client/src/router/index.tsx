import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import Login from "../pages/login/Login.tsx";
import Home from "../pages/home/Home.tsx";
import { useContext } from "react";
import { AppContext } from "../App.tsx";
import { paths } from "../constants";

function PrivateRoute() {
  const appContext = useContext(AppContext);
  const { githubAccessToken } = appContext;
  const isLoggedIn = !!githubAccessToken;
  if (!isLoggedIn) return <Navigate to={paths.LOGIN_PAGE} replace />;
  return <Outlet />;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path={paths.HOME_PAGE} element={<Home />} />
        </Route>
        <Route path={paths.LOGIN_PAGE} element={<Login />} />
        <Route
          path={"*"}
          element={
            <>
              <h1>404</h1>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
