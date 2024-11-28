import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { AppContext } from "../../App";
import Home from "./Home";

// Mock the router hooks
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockPages = [
  {
    page_id: "1",
    title: "Test Page 1",
    content: "Test Content 1",
  },
  {
    page_id: "2",
    title: "Test Page 2",
    content: "Test Content 2",
  },
];

const mockSetPages = vi.fn();

const renderWithContext = (pages = mockPages) => {
  return render(
    <BrowserRouter>
      <AppContext.Provider value={{ pages, setPages: mockSetPages }}>
        <Home />
      </AppContext.Provider>
    </BrowserRouter>,
  );
};

describe("Home.tsx", () => {
  it("navigates to new page when New Page button is clicked", () => {
    renderWithContext();
    const newPageButton = screen.getByText("New Page +");
    fireEvent.click(newPageButton);
    expect(mockNavigate).toHaveBeenCalledWith({
      pathname: "/page",
    });
  });

  it("navigates to existing page when thumbnail is clicked", () => {
    renderWithContext();
    const firstPageTitle = screen.getByText(mockPages[0].title);
    fireEvent.click(firstPageTitle);
    expect(mockNavigate).toHaveBeenCalledWith("/page/1");
  });
});
