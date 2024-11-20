import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./Home";
import { AppContext } from "../../App.tsx";
import theme from "../../theme";
import { ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { paths } from "../../constants";

describe("Home", () => {
  it("should render", () => {
    const appContext = {
      pages: [],
      setPages: () => {
        console.log("set pages");
      },
    };
    render(
      <AppContext.Provider value={appContext}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Routes>
              <Route path={paths.HOME_PAGE} element={<Home />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </AppContext.Provider>,
    );
    expect(screen.getByText(/New Page/i)).toBeDefined();
  });
});
