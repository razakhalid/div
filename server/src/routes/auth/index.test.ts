import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import request from "supertest";
import express from "express";
import axios from "axios";
import authRouter from "./index";

// Mock axios
vi.mock("axios");

// Create express app and use the router
const app = express();
app.use("/api/v1/auth", authRouter);

// Store original env variables
const originalEnv = { ...process.env };

describe("Auth Router", () => {
  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks();

    // Set up environment variables for testing
    process.env.GITHUB_CLIENT_ID = "test-client-id";
    process.env.GITHUB_CLIENT_SECRET = "test-client-secret";
  });

  afterEach(() => {
    // Restore original env variables
    process.env = { ...originalEnv };
  });

  describe("GET /github/callback", () => {
    // Tests successful GitHub OAuth callback
    it("handles successful GitHub OAuth callback", async () => {
      const mockCode = "test-code";
      const mockAccessToken = "test-access-token";

      // Mock axios response
      (axios.get as any).mockResolvedValueOnce({
        data: { access_token: mockAccessToken },
      });

      const response = await request(app)
        .get("/api/v1/auth/github/callback")
        .query({ code: mockCode });

      // Verify axios was called with correct parameters
      expect(axios.get).toHaveBeenCalledWith(
        "https://github.com/login/oauth/access_token",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Accept-Encoding": "application/json",
          },
          params: {
            client_id: "test-client-id",
            client_secret: "test-client-secret",
            code: mockCode,
            redirect_uri: "http://localhost:8080/api/v1/auth/github/callback",
          },
        },
      );

      // Verify response
      expect(response.status).toBe(302); // Redirect status code
      expect(response.headers.location).toBe("http://localhost:5173");
      expect(response.headers["set-cookie"][0]).toContain(
        "github_access_token",
      );
      expect(response.headers["set-cookie"][0]).toContain(mockAccessToken);
    });
  });
});
