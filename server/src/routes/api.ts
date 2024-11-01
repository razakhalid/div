import express from "express";
import authRouter from "./auth";
import pageRouter from "./pages/controller";

const api = express.Router();

api.use("/auth", authRouter);
api.use("/pages", pageRouter);

export default api;
