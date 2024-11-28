import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import Nav from "./Nav";

// Create a basic theme for testing
const theme = createTheme({
  palette: {
    navBackground: "#ffffff",
  },
  spacing: (factor: number) => `${factor * 8}px`,
});

// Helper function to render Nav with required providers
const renderNav = () => {
  return render(
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Nav />
      </BrowserRouter>
    </ThemeProvider>,
  );
};

describe("Nav Component", () => {
  it("renders the navigation container", () => {
    renderNav();
    const navElement = screen.getByRole("navigation");
    expect(navElement).toBeDefined();
  });

  it("renders the top links container", () => {
    renderNav();
    const topLinksContainer = screen.getByTestId("top-links-container");
    expect(topLinksContainer).toBeDefined();
  });

  it("renders the bottom links container", () => {
    renderNav();
    const bottomLinksContainer = screen.getByTestId("bottom-links-container");
    expect(bottomLinksContainer).toBeDefined();
  });

  it("includes PageLinks component", () => {
    // Mock PageLinks component
    vi.mock("./PageLinks.tsx", () => ({
      default: () => <div data-testid="page-links">Page Links</div>,
    }));

    renderNav();
    const pageLinks = screen.getByTestId("page-links");
    expect(pageLinks).toBeDefined();
  });
});
