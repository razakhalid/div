import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import Login from "../pages/login/Login.tsx";
import Home from "../pages/home/Home.tsx";
import { useContext, useEffect } from "react";
import { paths } from "../constants";
import MainWrapper from "../components/Main.tsx";
import Page from "../pages/page/Page.tsx";
import { cookieUtils } from "../utils";
import { AppContext } from "../App.tsx";

function PrivateRoute() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AppContext);
  useEffect(() => {
    setIsLoggedIn(!!cookieUtils.getCookie("github_access_token"));
  }, [isLoggedIn]);
  if (!isLoggedIn)
    return isLoggedIn ? <Navigate to={paths.LOGIN_PAGE} replace /> : <Outlet />;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <MainWrapper>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path={paths.HOME_PAGE} element={<Home />} />
          </Route>
          <Route path={paths.LOGIN_PAGE} element={<Login />} />
          <Route path={paths.PAGE_PAGE + "/"} element={<Page />} />
          <Route path={paths.PAGE_PAGE + "/:id"} element={<Page />} />
          <Route
            path={"*"}
            element={
              <>
                <h1>404</h1>
              </>
            }
          />
        </Routes>
      </MainWrapper>
    </BrowserRouter>
  );
}
