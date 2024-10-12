import express from "express";
import cors from "cors";
import path from "path";
// import morgan from "morgan";
import api from "./routes/api";

const clientPath = path.join(__dirname, "..", "..", "..", "client");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
// app.use(morgan("combined"));
app.use(express.json());
app.use(express.static(`${clientPath}/dist`));

app.use("/api/v1", api);

app.get("/*", (_, res) => {
  res.sendFile(`${clientPath}/dist/index.html`);
});

export default app;
