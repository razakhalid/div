import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { AppContext } from "../../App";
import Page from "./Page";

// Mock the router hooks
const mockNavigate = vi.fn();
const mockParams = {} as any;

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => mockParams,
  };
});

// Mock fetch
global.fetch = vi.fn();

const mockPages = [
  {
    page_id: "1",
    title: "Existing Page",
    content: "Existing Content",
  },
];

const mockSetPages = vi.fn();

const renderWithContext = (initialPages = mockPages) => {
  return render(
    <BrowserRouter>
      <AppContext.Provider
        value={{ pages: initialPages, setPages: mockSetPages }}
      >
        <Page />
      </AppContext.Provider>
    </BrowserRouter>,
  );
};

describe("Page Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Tests loading of existing page data when page ID is provided
  it("loads existing page data when page ID is provided", () => {
    mockParams.id = "1";
    renderWithContext();

    const titleInput = screen.getByPlaceholderText("Title") as HTMLInputElement;
    const contentInput = screen.getByPlaceholderText(
      "Content",
    ) as HTMLTextAreaElement;

    expect(titleInput.value).toBe("Existing Page");
    expect(contentInput.value).toBe("Existing Content");
  });

  // Verifies the successful update of an existing page
  it("updates existing page successfully", async () => {
    const updatedPage = {
      page_id: "1",
      title: "Updated Title",
      content: "Updated Content",
    };

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(updatedPage),
    });

    mockParams.id = "1";
    renderWithContext();

    const titleInput = screen.getByPlaceholderText("Title");
    const contentInput = screen.getByPlaceholderText("Content");
    const saveButton = screen.getByRole("button", { name: /save/i });

    fireEvent.change(titleInput, { target: { value: "Updated Title" } });
    fireEvent.change(contentInput, { target: { value: "Updated Content" } });
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/1"),
        expect.objectContaining({
          method: "PUT",
          body: JSON.stringify({
            title: "Updated Title",
            content: "Updated Content",
          }),
        }),
      );
    });
  });

  // Tests the cancel functionality
  it("clears form when cancel is clicked", () => {
    mockParams.id = "1";
    renderWithContext();

    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    fireEvent.click(cancelButton);

    const titleInput = screen.getByPlaceholderText("Title") as HTMLInputElement;
    const contentInput = screen.getByPlaceholderText(
      "Content",
    ) as HTMLTextAreaElement;

    expect(titleInput.value).toBe("");
    expect(contentInput.value).toBe("");
  });
});
