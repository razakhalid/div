import { createContext, useEffect, useState } from "react";
// import { cookieUtils } from "./utils";
import AppRouter from "./router";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import { Page } from "../../shared/types";
import { endpointUrls } from "./constants";

export const AppContext = createContext<any>();

export default function App() {
  const [pages, setPages] = useState<Page[]>([]);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const response = await fetch(endpointUrls.pages);
        setPages(await response.json());
      } catch (e) {
        console.log(e);
      }
    };

    fetchPages();
  }, []);

  return (
    <AppContext.Provider value={{ pages, setPages }}>
      <ThemeProvider theme={theme}>
        <AppRouter />
      </ThemeProvider>
    </AppContext.Provider>
  );
}
