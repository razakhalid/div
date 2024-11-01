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
import MainWrapper from "../components/Main.tsx";
import Page from "../pages/page/Page.tsx";

function PrivateRoute() {
  const { isLoggedIn } = useContext(AppContext);
  if (!isLoggedIn) return <Navigate to={paths.LOGIN_PAGE} replace />;
  return <Outlet />;
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
          <Route path={paths.PAGE_PAGE} element={<Page />} />
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
