import { createContext, useState } from "react";
import { cookieUtils } from "./utils";
import AppRouter from "./router";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";

export type AppContextType = {
  isLoggedIn?: boolean;
};

export const AppContext = createContext<AppContextType>({});

export default function App() {
  const [isLoggedIn] = useState(!!cookieUtils.getCookie("github_access_token"));
  return (
    <AppContext.Provider value={{ isLoggedIn }}>
      <ThemeProvider theme={theme}>
        <AppRouter />
      </ThemeProvider>
    </AppContext.Provider>
  );
}
