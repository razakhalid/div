import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";
import express from "express";
import pagesRouter from "./controller";
import { create, deletePage, getAll, getById, update } from "./model";

// Mock the model functions
vi.mock("./model", () => ({
  getAll: vi.fn(),
  getById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  deletePage: vi.fn(),
}));

// Create express app and use the router
const app = express();
app.use(express.json());
app.use("/api/pages", pagesRouter);

describe("Pages Router", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Tests getting all pages
  it("GET / returns all pages", async () => {
    const mockPages = [
      { page_id: "1", title: "Page 1", content: "Content 1" },
      { page_id: "2", title: "Page 2", content: "Content 2" },
    ];

    (getAll as any).mockResolvedValue(mockPages);

    const response = await request(app).get("/api/pages").expect(200);

    expect(response.body).toEqual({ data: mockPages });
    expect(getAll).toHaveBeenCalledOnce();
  });

  // Tests getting a single page by ID
  it("GET /:pageId returns specific page", async () => {
    const mockPage = { page_id: "1", title: "Page 1", content: "Content 1" };
    (getById as any).mockResolvedValue(mockPage);

    const response = await request(app).get("/api/pages/1").expect(200);

    expect(response.body).toEqual({ data: mockPage });
    expect(getById).toHaveBeenCalledWith("1");
  });

  // Tests creating a new page
  describe("POST /", () => {
    it("creates new page with valid data", async () => {
      const newPage = { title: "New Page", content: "New Content" };
      const createdPage = { page_id: "3", ...newPage };
      (create as any).mockResolvedValue(createdPage);

      const response = await request(app)
        .post("/api/pages")
        .send(newPage)
        .expect(200);

      expect(response.body).toEqual(createdPage);
      expect(create).toHaveBeenCalledWith(newPage);
    });

    it("returns 400 when title is missing", async () => {
      await request(app)
        .post("/api/pages")
        .send({ content: "New Content" })
        .expect(400);

      expect(create).not.toHaveBeenCalled();
    });

    it("returns 400 when content is missing", async () => {
      await request(app)
        .post("/api/pages")
        .send({ title: "New Page" })
        .expect(400);

      expect(create).not.toHaveBeenCalled();
    });

    it("returns 500 when creation fails", async () => {
      const newPage = { title: "New Page", content: "New Content" };
      (create as any).mockRejectedValue(new Error("Database error"));

      await request(app).post("/api/pages").send(newPage).expect(500);
    });
  });

  // Tests updating an existing page
  describe("PUT /:id", () => {
    it("updates page with valid data", async () => {
      const updatedPage = {
        page_id: "1",
        title: "Updated Title",
        content: "Updated Content",
      };
      (update as any).mockResolvedValue(updatedPage);

      const response = await request(app)
        .put("/api/pages/1")
        .send({ title: "Updated Title", content: "Updated Content" })
        .expect(200);

      expect(response.body).toEqual(updatedPage);
      expect(update).toHaveBeenCalledWith({
        page_id: "1",
        title: "Updated Title",
        content: "Updated Content",
      });
    });

    it("returns 400 when title is missing", async () => {
      await request(app)
        .put("/api/pages/1")
        .send({ content: "Updated Content" })
        .expect(400);

      expect(update).not.toHaveBeenCalled();
    });

    it("returns 400 when content is missing", async () => {
      await request(app)
        .put("/api/pages/1")
        .send({ title: "Updated Title" })
        .expect(400);

      expect(update).not.toHaveBeenCalled();
    });

    it("returns 500 when update fails", async () => {
      (update as any).mockRejectedValue(new Error("Database error"));

      await request(app)
        .put("/api/pages/1")
        .send({ title: "Updated Title", content: "Updated Content" })
        .expect(500);
    });
  });

  // Tests deleting a page
  describe("DELETE /:id", () => {
    it("deletes existing page", async () => {
      (deletePage as any).mockResolvedValue(undefined);

      await request(app).delete("/api/pages/1").expect(204);

      expect(deletePage).toHaveBeenCalledWith("1");
    });

    it("returns 400 when id is not provided", async () => {
      await request(app).delete("/api/pages/").expect(404); // Express returns 404 for undefined routes

      expect(deletePage).not.toHaveBeenCalled();
    });

    it("returns 500 when deletion fails", async () => {
      (deletePage as any).mockRejectedValue(new Error("Database error"));

      await request(app).delete("/api/pages/1").expect(500);
    });
  });
});
