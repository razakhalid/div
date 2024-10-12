import express from "express";
import authRouter from "./auth";

const api = express.Router();

api.use("/auth", authRouter);

export default api;
